# ✅ Vercel Deployment Checklist

## Pre-Deployment

- [ ] Code is pushed to GitHub repository
- [ ] All changes are committed and synced
- [ ] Environment variables are ready:
  - [ ] GROQ_API_KEY obtained from [console.groq.com/keys](https://console.groq.com/keys)
  - [ ] DATABASE_URL from Neon or Vercel Postgres
  - [ ] SESSION_SECRET generated (use `openssl rand -base64 32`)

## Vercel Setup

- [ ] Vercel account created at [vercel.com](https://vercel.com)
- [ ] Project imported from GitHub
- [ ] Environment variables added in Vercel dashboard:
  - [ ] GROQ_API_KEY
  - [ ] DATABASE_URL
  - [ ] SESSION_SECRET
- [ ] Deployment initiated

## Post-Deployment

- [ ] Deployment completed successfully (check Vercel dashboard)
- [ ] Database schema initialized with `npm run db:push`
- [ ] Website loads at Vercel URL
- [ ] Chat widget appears in bottom-right corner
- [ ] Chat functionality tested (send a test message)
- [ ] AI responds correctly

## Post-Deployment Testing

- [ ] Visit deployment URL
- [ ] Check homepage loads
- [ ] Chat widget appears
- [ ] Send test message: "What is Gensyn?"
- [ ] Verify AI responds correctly
- [ ] Check browser console for errors (F12)
- [ ] Test on mobile device
- [ ] Verify all links work

## Optional Enhancements

- [ ] Custom domain configured
- [ ] Analytics enabled
- [ ] Error monitoring set up
- [ ] Performance monitoring enabled

## Maintenance

- [ ] Set up GitHub branch protection for `main`
- [ ] Enable Vercel deployment notifications
- [ ] Monitor Vercel function logs regularly
- [ ] Update Groq API key if needed
- [ ] Keep dependencies updated

---

## Quick Commands

```bash
# Test locally
npm run dev

# Build for production
npm run build

# Test production build locally
npm start

# Deploy to Vercel (after GitHub push)
# Automatic via Vercel GitHub integration
```

## Need Help?

- **Quick Start**: See [QUICKSTART.md](./QUICKSTART.md)
- **Full Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Vercel Docs**: https://vercel.com/docs
- **Groq Docs**: https://console.groq.com/docs

---

**Ready to deploy?** Follow [QUICKSTART.md](./QUICKSTART.md) for a 5-minute deployment! 🚀
