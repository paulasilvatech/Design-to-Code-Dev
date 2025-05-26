# Landing Page Deployment Guide

## 📋 Prerequisites Checklist

✅ **Project Structure**
- React + TypeScript + Vite setup
- Tailwind CSS for styling
- Lucide React for icons
- All dependencies installed

✅ **Build Configuration**
- `vite.config.ts` configured with base path `/Design-to-Code-Dev/`
- TypeScript configuration ready
- Build outputs to `dist` directory

✅ **GitHub Actions Workflow**
- Workflow file: `.github/workflows/deploy-landing-page.yml`
- Triggers on:
  - Push to main branch (when Landing Page files change)
  - Manual workflow dispatch
- Uses GitHub Pages deployment action

## 🚀 Deployment Steps

### 1. Enable GitHub Pages

1. Go to your repository settings
2. Navigate to **Pages** section
3. Under **Source**, select **GitHub Actions**

### 2. Push Changes

```bash
git add .
git commit -m "Add landing page with GitHub Pages deployment"
git push origin main
```

### 3. Monitor Deployment

1. Go to **Actions** tab in your repository
2. Watch the "Deploy Landing Page to GitHub Pages" workflow
3. Once completed, your site will be available at:
   ```
   https://[your-username].github.io/Design-to-Code-Dev/
   ```

## 📁 Project Structure

```
Landing Page/
├── src/
│   ├── App.tsx
│   ├── LandingPage.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── .gitignore
```

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🐛 Troubleshooting

### Build Fails
- Check Node.js version (should be 18+)
- Run `npm install` to ensure all dependencies are installed
- Check for TypeScript errors with `npx tsc --noEmit`

### GitHub Pages Not Working
- Ensure GitHub Pages is enabled in repository settings
- Check that the workflow has the correct permissions
- Verify the base path in `vite.config.ts` matches your repository name

### Styling Issues
- Ensure Tailwind CSS is properly configured
- Check that all CSS classes are included in the build

## 📝 Notes

- The landing page uses Tailwind CSS for styling
- Animations are defined in `index.css`
- The site is fully responsive
- All external links open in new tabs 