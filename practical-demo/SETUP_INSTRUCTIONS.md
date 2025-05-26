# 🚀 Quick Setup Instructions

## Fastest Way to Get Started

### Option 1: Automatic Setup (Recommended)

**macOS/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

**Windows:**
```bash
setup.bat
```

This script will:
- ✅ Create all necessary directories
- ✅ Move example files to correct locations
- ✅ Install all dependencies
- ✅ Create initial configuration files
- ✅ Set up a basic React app structure

### Option 2: Manual Setup

If you prefer to set up manually or the script doesn't work:

1. **Install dependencies first** (this resolves all TypeScript/Vite errors):
   ```bash
   npm install
   ```

2. **Create the project structure**:
   ```bash
   mkdir -p src/components src/pages src/styles src/utils
   mkdir -p public/assets/images public/assets/icons
   ```

3. **Move the example files**:
   ```bash
   mv react-product-card.tsx src/components/ProductCard.tsx
   mv dashboard-example.tsx src/pages/Dashboard.tsx
   cp landing-page-html.html public/landing-page-example.html
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

## Common Issues

### "Cannot find module" errors in VS Code

**This is normal before running `npm install`!** The errors will disappear after installing dependencies.

### Port 3000 already in use

Change the port in `vite.config.ts`:
```typescript
server: {
  port: 3001,  // or any other available port
  open: true
}
```

### Permission denied when running setup.sh

Make the script executable:
```bash
chmod +x setup.sh
```

## Next Steps

After setup is complete:

1. Open http://localhost:3000 in your browser
2. Follow the exercises in README.md
3. Explore the example components
4. Build your own components!

Happy coding! 🎉 