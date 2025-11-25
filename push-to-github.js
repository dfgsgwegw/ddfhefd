import { Octokit } from '@octokit/rest'

let connectionSettings;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

async function main() {
  try {
    const octokit = await getUncachableGitHubClient();
    
    // Get authenticated user
    const { data: user } = await octokit.users.getAuthenticated();
    console.log(`Authenticated as: ${user.login}`);
    
    // Create a new repository
    const repoName = process.argv[2] || 'gensyn-ai-assistant';
    const repoDescription = 'AI-powered chat assistant for Gensyn AI - decentralized machine learning compute protocol';
    
    console.log(`Creating repository: ${repoName}...`);
    
    let repo;
    try {
      const { data } = await octokit.repos.createForAuthenticatedUser({
        name: repoName,
        description: repoDescription,
        private: false,
        auto_init: false
      });
      repo = data;
      console.log(`✓ Repository created: ${repo.html_url}`);
    } catch (error) {
      if (error.status === 422) {
        // Repository already exists
        console.log(`Repository ${repoName} already exists, using existing repository`);
        const { data } = await octokit.repos.get({
          owner: user.login,
          repo: repoName
        });
        repo = data;
      } else {
        throw error;
      }
    }
    
    console.log(`\nRepository URL: ${repo.html_url}`);
    console.log(`Git URL: ${repo.clone_url}`);
    console.log(`\nNext steps:`);
    console.log(`1. Run: git remote add origin ${repo.clone_url}`);
    console.log(`2. Run: git add .`);
    console.log(`3. Run: git commit -m "Initial commit"`);
    console.log(`4. Run: git push -u origin main`);
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
