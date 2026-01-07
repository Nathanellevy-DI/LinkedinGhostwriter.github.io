# 🚀 Vercel Deployment Guide

## Quick Deploy to Vercel

Your LinkedIn Ghostwriter is ready to deploy! Follow these simple steps:

### 1. Go to Vercel
Visit: https://vercel.com/new

### 2. Import Your Repository
- Click "Import Git Repository"
- Select: `Nathanellevy-DI/LinkedinGhostwriter.github.io`
- Click "Import"

### 3. Configure Environment Variables
Add this environment variable:

**Name**: `GLM_API_KEY`  
**Value**: `735d52a86e3a41efb71c5f1844a50dbe.6lQgeAbXDm25Jvi6`

### 4. Deploy!
Click "Deploy" and wait ~2 minutes

### 5. Your Live URL
You'll get a URL like: `https://your-app.vercel.app`

---

## That's It! 🎉

Your app will be live and anyone can use it!

## Troubleshooting

If deployment fails:
1. Check that `GLM_API_KEY` is set correctly
2. Make sure the repository is up to date
3. Check build logs for errors

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000
