import { 
  type Conversation, 
  type InsertConversation,
  type Newsletter,
  type InsertNewsletter,
  type Feedback,
  type InsertFeedback,
  type ChatMessage,
  type ContentUpdate,
  type InsertContentUpdate
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Conversations
  getConversation(sessionId: string): Promise<Conversation | undefined>;
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  updateConversation(sessionId: string, messages: ChatMessage[]): Promise<Conversation>;
  
  // Newsletter
  subscribeNewsletter(subscription: InsertNewsletter): Promise<Newsletter>;
  checkNewsletterSubscription(email: string): Promise<boolean>;
  
  // Feedback
  createFeedback(feedbackData: InsertFeedback): Promise<Feedback>;
  
  // Content Updates
  createContentUpdate(update: InsertContentUpdate): Promise<ContentUpdate>;
  getContentUpdates(limit?: number, source?: string): Promise<ContentUpdate[]>;
  getLatestUpdateBySource(source: string, type: string): Promise<ContentUpdate | undefined>;
  findContentUpdateByUrl(url: string): Promise<ContentUpdate | undefined>;
}

export class MemStorage implements IStorage {
  private conversations: Map<string, Conversation>;
  private newsletters: Map<string, Newsletter>;
  private feedbackList: Map<string, Feedback>;
  private contentUpdates: Map<string, ContentUpdate>;

  constructor() {
    this.conversations = new Map();
    this.newsletters = new Map();
    this.feedbackList = new Map();
    this.contentUpdates = new Map();
  }

  async getConversation(sessionId: string): Promise<Conversation | undefined> {
    return Array.from(this.conversations.values()).find(
      (conv) => conv.sessionId === sessionId,
    );
  }

  async createConversation(insertConv: InsertConversation): Promise<Conversation> {
    const id = randomUUID();
    const now = new Date();
    const conversation: Conversation = {
      ...insertConv,
      id,
      messages: insertConv.messages || [],
      createdAt: now,
      updatedAt: now,
    };
    this.conversations.set(id, conversation);
    return conversation;
  }

  async updateConversation(sessionId: string, messages: ChatMessage[]): Promise<Conversation> {
    const existing = await this.getConversation(sessionId);
    if (!existing) {
      throw new Error("Conversation not found");
    }
    
    const updated: Conversation = {
      ...existing,
      messages: messages as any,
      updatedAt: new Date(),
    };
    this.conversations.set(existing.id, updated);
    return updated;
  }

  async subscribeNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const id = randomUUID();
    const newsletter: Newsletter = {
      ...insertNewsletter,
      id,
      subscribedAt: new Date(),
    };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  async checkNewsletterSubscription(email: string): Promise<boolean> {
    return Array.from(this.newsletters.values()).some(
      (sub) => sub.email === email,
    );
  }

  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const id = randomUUID();
    const feedbackData: Feedback = {
      ...insertFeedback,
      id,
      name: insertFeedback.name ?? null,
      submittedAt: new Date(),
    };
    this.feedbackList.set(id, feedbackData);
    return feedbackData;
  }

  async createContentUpdate(insertUpdate: InsertContentUpdate): Promise<ContentUpdate> {
    const id = randomUUID();
    const update: ContentUpdate = {
      ...insertUpdate,
      id,
      title: insertUpdate.title ?? null,
      url: insertUpdate.url ?? null,
      authorName: insertUpdate.authorName ?? null,
      authorHandle: insertUpdate.authorHandle ?? null,
      metadata: insertUpdate.metadata ?? {},
      fetchedAt: new Date(),
    };
    this.contentUpdates.set(id, update);
    return update;
  }

  async getContentUpdates(limit: number = 50, source?: string): Promise<ContentUpdate[]> {
    let updates = Array.from(this.contentUpdates.values());
    
    if (source) {
      updates = updates.filter(u => u.source === source);
    }
    
    return updates
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, limit);
  }

  async getLatestUpdateBySource(source: string, type: string): Promise<ContentUpdate | undefined> {
    const updates = Array.from(this.contentUpdates.values())
      .filter(u => u.source === source && u.type === type)
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
    
    return updates[0];
  }

  async findContentUpdateByUrl(url: string): Promise<ContentUpdate | undefined> {
    return Array.from(this.contentUpdates.values()).find(u => u.url === url);
  }
}

// Database storage implementation for serverless
import { db } from "./db";
import { conversations, newsletterSubscriptions, feedback as feedbackTable, contentUpdates as contentUpdatesTable } from "@shared/schema";
import { eq, desc, and } from "drizzle-orm";

export class DbStorage implements IStorage {
  async getConversation(sessionId: string): Promise<Conversation | undefined> {
    const result = await db.select().from(conversations).where(eq(conversations.sessionId, sessionId));
    return result[0];
  }

  async createConversation(insertConv: InsertConversation): Promise<Conversation> {
    const result = await db.insert(conversations).values({
      ...insertConv,
      messages: insertConv.messages || [],
    }).returning();
    return result[0];
  }

  async updateConversation(sessionId: string, messages: ChatMessage[]): Promise<Conversation> {
    const existing = await this.getConversation(sessionId);
    if (!existing) {
      throw new Error("Conversation not found");
    }
    
    const result = await db.update(conversations)
      .set({ 
        messages: messages as any, 
        updatedAt: new Date() 
      })
      .where(eq(conversations.id, existing.id))
      .returning();
    return result[0];
  }

  async subscribeNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const result = await db.insert(newsletterSubscriptions)
      .values(insertNewsletter)
      .returning();
    return result[0];
  }

  async checkNewsletterSubscription(email: string): Promise<boolean> {
    const result = await db.select().from(newsletterSubscriptions)
      .where(eq(newsletterSubscriptions.email, email));
    return result.length > 0;
  }

  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const result = await db.insert(feedbackTable)
      .values(insertFeedback)
      .returning();
    return result[0];
  }

  async createContentUpdate(insertUpdate: InsertContentUpdate): Promise<ContentUpdate> {
    const result = await db.insert(contentUpdatesTable)
      .values(insertUpdate)
      .returning();
    return result[0];
  }

  async getContentUpdates(limit: number = 50, source?: string): Promise<ContentUpdate[]> {
    let query = db.select().from(contentUpdatesTable);
    
    if (source) {
      query = query.where(eq(contentUpdatesTable.source, source)) as any;
    }
    
    const result = await query.orderBy(desc(contentUpdatesTable.publishedAt)).limit(limit);
    return result;
  }

  async getLatestUpdateBySource(source: string, type: string): Promise<ContentUpdate | undefined> {
    const result = await db.select().from(contentUpdatesTable)
      .where(and(
        eq(contentUpdatesTable.source, source),
        eq(contentUpdatesTable.type, type)
      ))
      .orderBy(desc(contentUpdatesTable.publishedAt))
      .limit(1);
    return result[0];
  }

  async findContentUpdateByUrl(url: string): Promise<ContentUpdate | undefined> {
    const result = await db.select().from(contentUpdatesTable)
      .where(eq(contentUpdatesTable.url, url));
    return result[0];
  }
}

// Use database storage for production/serverless
export const storage = process.env.DATABASE_URL ? new DbStorage() : new MemStorage();
