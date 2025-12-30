# Deployment Guide for Demo App

## Netlify Deployment

The demo app is ready to be deployed to Netlify. Here's how to do it:

### Option 1: Deploy via Netlify Dashboard (Recommended)

1. **Push your code to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Prepare demo app for Netlify deployment"
   git push
   ```

2. **Go to Netlify**
   - Visit [https://www.netlify.com/](https://www.netlify.com/)
   - Sign up or log in

3. **Import your project**
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository

4. **Configure build settings**
   - **Base directory**: `demo`
   - **Build command**: `npm install && USE_LOCAL=false npm run build`
   - **Publish directory**: `demo/dist`

5. **Deploy**
   - Click "Deploy site"
   - Wait for the build to complete
   - Your site will be live at a URL like `https://your-site-name.netlify.app`

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Navigate to demo directory and deploy**
   ```bash
   cd demo
   netlify init
   ```
   - Follow the prompts to link your site
   - When asked for build command: `npm install && USE_LOCAL=false npm run build`
   - When asked for publish directory: `dist`

4. **Deploy to production**
   ```bash
   netlify deploy --prod
   ```

### Important Notes

- The demo app uses the published npm package (`@vk-develop/custom-ui@1.5.1`) for production builds
- The `USE_LOCAL=false` environment variable ensures the npm package is used instead of local source
- The `netlify.toml` file in the `demo` directory contains the build configuration
- All routes are configured to redirect to `index.html` for SPA routing

### Custom Domain (Optional)

After deployment, you can add a custom domain:
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the instructions to configure your domain

### Environment Variables

If you need to add environment variables:
1. Go to Site settings → Environment variables
2. Add any required variables
3. Redeploy the site

## Troubleshooting

### Build fails
- Make sure Node.js version is 18 or higher
- Check that all dependencies are in `package.json`
- Verify the build command is correct

### Components not loading
- Ensure `@vk-develop/custom-ui` is in `package.json` dependencies
- Check that the version matches the published version (1.5.1)

### Routing issues
- The `netlify.toml` includes redirect rules for SPA routing
- If pages don't load, check the redirect configuration

