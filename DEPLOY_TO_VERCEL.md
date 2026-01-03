# Deploy to Vercel - Quick Guide

## Prerequisites
- GitHub account
- Notion database set up with your blog posts
- Notion integration token (get from https://www.notion.so/my-integrations)

## Step 1: Prepare Your Repository

1. Make sure your code is pushed to a GitHub repository
2. Ensure `.env.local` is in `.gitignore` (it already is)
3. Your environment variables should NOT be committed to git

## Step 2: Get Your Notion Credentials

### Notion Page ID:
1. Open your Notion database page
2. Click "Share" → "Copy link"
3. The URL looks like: `https://notion.so/username/PAGE_ID?v=...`
4. Extract the `PAGE_ID` part (32 character string)

### Notion Token (if required):
1. Go to https://www.notion.so/my-integrations
2. Create a new integration
3. Copy the "Internal Integration Token"
4. Share your database with this integration

## Step 3: Deploy to Vercel

### Option A: Using Vercel Dashboard (Easiest)

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure Environment Variables:
   ```
   NOTION_PAGE_ID=your_page_id_here
   ```
6. Click "Deploy"

### Option B: Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from project root:
   ```bash
   vercel
   ```

4. Follow the prompts and add environment variables when asked

5. For production deployment:
   ```bash
   vercel --prod
   ```

## Step 4: Configure Environment Variables in Vercel

After deploying, you can add/edit environment variables:

1. Go to your project in Vercel Dashboard
2. Navigate to Settings → Environment Variables
3. Add these variables:
   - `NOTION_PAGE_ID`: Your Notion database page ID
   - (Add any other variables from your `.env.local`)

4. Redeploy to apply changes:
   ```bash
   vercel --prod
   ```

## Step 5: Custom Domain (Optional)

1. In Vercel Dashboard, go to your project
2. Navigate to Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions

## Automatic Deployments

Once connected to GitHub:
- Every push to `main` branch = Production deployment
- Every push to other branches = Preview deployment
- Pull requests get automatic preview deployments

## Troubleshooting

### Build Fails
- Check build logs in Vercel Dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Notion Data Not Loading
- Verify `NOTION_PAGE_ID` is correct
- Check Notion integration has access to the database
- Review browser console for API errors

### Environment Variables Not Working
- Ensure variables are added in Vercel Dashboard
- Redeploy after adding/changing variables
- Check variable names match exactly (case-sensitive)

## Local Development

To run locally before deploying:

```bash
# Install dependencies
yarn install

# Create .env.local file
cp .env.example .env.local

# Add your Notion credentials to .env.local
# Edit .env.local and add:
# NOTION_PAGE_ID=your_page_id_here

# Run development server
yarn dev
```

Open http://localhost:3000 to view

## Production Build Test

Test production build locally:

```bash
# Build
yarn build

# Start production server
yarn start
```

## Important Files

- `vercel.json` - Vercel configuration
- `next.config.js` - Next.js configuration
- `site.config.js` - Your blog configuration
- `.env.local` - Local environment variables (not committed)
- `.env.example` - Template for environment variables

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Notion API: https://developers.notion.com

---

**That's it! Your blog should now be live on Vercel.** 🚀

Default Vercel URL: `https://your-project-name.vercel.app`
