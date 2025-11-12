# Netlify Deployment Guide

## Quick Setup in Netlify Dashboard

### Option 1: Using Netlify UI (Recommended)

1. **Go to Netlify Dashboard** → Add new site → Import from Git
2. **Connect your repository** (GitHub/GitLab/Bitbucket)
3. **Build settings:**
   - **Base directory:** `project` (if your repo root contains the project folder)
   - **OR** Leave empty if you're deploying from the project folder directly
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `dist`

### Option 2: Using netlify.toml (Already Created)

The `netlify.toml` file is already configured. Just:
1. Push your code to Git
2. Connect to Netlify
3. Netlify will automatically detect the config file

## Manual Settings (if needed)

If you need to set manually in Netlify Dashboard:

- **Base directory:** `.` (dot - current directory) or leave empty
- **Build command:** `npm install && npm run build`
- **Publish directory:** `dist`
- **Node version:** 18.x or 20.x (set in Environment variables)

## Environment Variables (if needed)

If you're using Supabase or any API:
- Go to Site settings → Environment variables
- Add your variables there

## Important Notes

1. **Make sure** `couple-photo.jpeg` is in the `public` folder
2. **For music:** Add `wedding-song.mp3` to the `public` folder
3. **Build will create** a `dist` folder with all optimized files
4. **SPA Routing:** The netlify.toml already has redirect rules for React Router

## Troubleshooting

- If build fails, check Node version (use 18.x or 20.x)
- Make sure all dependencies are in package.json
- Check build logs in Netlify dashboard


