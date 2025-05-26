# 🚀 Extra Module: Practical Design-to-Code Demo

[![Extra Module](https://img.shields.io/badge/module-extra-purple.svg)](#)
[![Hands-On](https://img.shields.io/badge/type-hands--on-orange.svg)](#)
[![All Levels](https://img.shields.io/badge/level-all-green.svg)](#)

## 📋 Module Overview

This Extra Module provides practical, hands-on demonstrations of the design-to-code workflow. It includes real-world examples, templates, and automation scripts that complement the main workshop modules.

### What's Included

- **Complete HTML Landing Page** - Production-ready responsive design
- **React Component Examples** - Product card and dashboard implementations
- **Automation Scripts** - Streamline your design-to-code workflow
- **Prompt Templates** - Optimized AI prompts for component generation
- **Configuration Examples** - MCP server setup and Copilot instructions

## 🎯 Learning Objectives

By completing this extra module, you will:
- ✅ Build a complete landing page from Figma design
- ✅ Create production-ready React components
- ✅ Implement automated design-to-code workflows
- ✅ Master AI prompt engineering for component generation
- ✅ Configure advanced tooling for enterprise projects

## 📁 Module Structure

```
practical-demo/ (Extra Module)
├── README.md                    # This file
├── landing-page-html.html       # Complete landing page example
├── react-product-card.tsx       # React component with TypeScript
├── dashboard-example.tsx        # Complex dashboard component
├── automation-script.js         # Design-to-code automation
├── mcp-config-example.json      # MCP server configuration
├── prompt-templates.md          # AI prompt templates
├── copilot-instructions.md      # GitHub Copilot best practices
└── figma-to-code-guide.md       # Step-by-step conversion guide
```

## 🛠️ Prerequisites

Before starting this module, ensure you have:

1. **Completed Module 1** - Basic setup and accounts
2. **Node.js 18+** installed
3. **VS Code** with GitHub Copilot
4. **Git** configured
5. **Figma** account with Dev Mode

## 🚀 Quick Start

### ⚠️ Important: Initial Setup

The TypeScript and Vite configuration files may show errors before installing dependencies. This is normal! The errors will be resolved after running `npm install`.

### Step 1: Clone or Copy the Module

```bash
# If in workshop root directory
cd practical-demo

# Or create a new project
mkdir design-to-code-extra-module
cd design-to-code-extra-module
cp -r /path/to/practical-demo/* .
```

### Alternative: Use the Setup Script

For the easiest setup experience:

```bash
# On macOS/Linux
./setup.sh

# On Windows
setup.bat
```

This will automatically create the project structure and install dependencies.

### Step 2: Install Dependencies

```bash
# Initialize package.json if not exists
npm init -y

# Install required dependencies
npm install react react-dom typescript @types/react @types/react-dom
npm install -D vite @vitejs/plugin-react

# Install additional tools
npm install -D prettier eslint @typescript-eslint/parser
npm install styled-components @types/styled-components
```

### Step 3: Create Project Structure

```bash
# Create necessary directories
mkdir -p src/{components,pages,styles,utils}
mkdir -p public/assets/{images,icons}

# Move example files to appropriate locations
mv react-product-card.tsx src/components/ProductCard.tsx
mv dashboard-example.tsx src/pages/Dashboard.tsx
mv landing-page-html.html public/index.html
```

### Step 4: Configure Vite

Create `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
```

### Step 5: Create Entry Point

Create `src/main.tsx`:
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

Create `src/App.tsx`:
```typescript
import React from 'react'
import ProductCard from './components/ProductCard'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="app">
      <h1>Design-to-Code Extra Module</h1>
      <ProductCard />
      {/* <Dashboard /> */}
    </div>
  )
}

export default App
```

## 📚 Module Exercises

### Exercise 1: Landing Page Implementation (30 minutes)

**Objective**: Convert the provided HTML landing page to a React component

1. **Open** `landing-page-html.html` in your browser
2. **Analyze** the structure and styling
3. **Create** React components for each section:
   ```bash
   touch src/components/{Header,Hero,Features,Testimonials,Footer}.tsx
   ```
4. **Convert** HTML to JSX following the guide in `figma-to-code-guide.md`
5. **Test** responsiveness on different screen sizes

**Success Criteria**:
- ✅ All sections converted to React components
- ✅ Responsive design maintained
- ✅ Interactive elements functional
- ✅ Performance optimized (Lighthouse score > 90)

### Exercise 2: Product Card Enhancement (20 minutes)

**Objective**: Enhance the product card with additional features

1. **Review** `src/components/ProductCard.tsx`
2. **Add** these features:
   - Image lazy loading
   - Skeleton loading state
   - Add to cart animation
   - Wishlist toggle
3. **Implement** using the prompts from `prompt-templates.md`
4. **Test** all interactive states

**Code to Add**:
```typescript
// Add to ProductCard.tsx
const [isLoading, setIsLoading] = useState(true)
const [isInWishlist, setIsInWishlist] = useState(false)
const [cartAnimation, setCartAnimation] = useState(false)

// Implement features following the component pattern
```

### Exercise 3: Dashboard Integration (45 minutes)

**Objective**: Build a complete dashboard from components

1. **Study** `dashboard-example.tsx` structure
2. **Create** individual widget components
3. **Implement** data fetching with mock API
4. **Add** real-time updates simulation
5. **Apply** responsive grid layout

**Implementation Steps**:
```bash
# Create widget components
mkdir src/components/dashboard
touch src/components/dashboard/{StatsCard,Chart,ActivityFeed,UserList}.tsx

# Create mock data
touch src/utils/mockData.ts

# Create dashboard layout
touch src/layouts/DashboardLayout.tsx
```

### Exercise 4: Automation Setup (15 minutes)

**Objective**: Configure and run the automation script

1. **Review** `automation-script.js`
2. **Configure** for your project:
   ```javascript
   // Update paths in automation-script.js
   const CONFIG = {
     figmaToken: process.env.FIGMA_TOKEN,
     outputDir: './src/components/generated',
     templateDir: './templates'
   }
   ```
3. **Create** `.env` file:
   ```bash
   FIGMA_TOKEN=your_figma_token_here
   FIGMA_FILE_ID=your_file_id_here
   ```
4. **Run** the automation:
   ```bash
   node automation-script.js
   ```

### Exercise 5: MCP Server Configuration (20 minutes)

**Objective**: Set up MCP server for advanced features

1. **Copy** configuration:
   ```bash
   cp mcp-config-example.json mcp-config.json
   ```
2. **Update** settings for your environment
3. **Install** MCP server (if available):
   ```bash
   npm install -g @modelcontextprotocol/server
   ```
4. **Start** the server:
   ```bash
   mcp-server start --config mcp-config.json
   ```

## 🎨 Working with Figma Designs

### Extracting Design Tokens

Follow the guide in `figma-to-code-guide.md` for detailed instructions on:
- Accessing Figma Dev Mode
- Extracting colors, typography, and spacing
- Converting to CSS/JS variables
- Creating a design system

### Using AI Effectively

Refer to `copilot-instructions.md` and `prompt-templates.md` for:
- Optimal prompt structures
- Context-aware code generation
- Component pattern recognition
- Accessibility implementation

## 🧪 Testing Your Implementation

### Run Development Server

```bash
# Start Vite dev server
npm run dev

# Or if using the HTML file directly
npx serve public
```

### Run Tests

```bash
# Install testing dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Create test file
touch src/components/ProductCard.test.tsx

# Run tests
npm run test
```

### Check Code Quality

```bash
# Run linter
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

## 📊 Performance Optimization

### Lighthouse Audit

1. Build the project: `npm run build`
2. Serve production build: `npm run preview`
3. Run Lighthouse audit in Chrome DevTools
4. Target scores:
   - Performance: > 90
   - Accessibility: > 95
   - Best Practices: > 90
   - SEO: > 90

### Bundle Analysis

```bash
# Install analyzer
npm install -D rollup-plugin-visualizer

# Add to vite.config.ts and build
npm run build

# Open stats.html to view bundle
```

## 🚨 Troubleshooting

### Common Issues and Solutions

1. **TypeScript/Vite errors before npm install**
   
   **Issue**: You see errors like "Cannot find module 'vite'" in vite.config.ts
   
   **Solution**: This is expected! Run `npm install` first:
   ```bash
   npm install
   ```
   
   **Alternative**: Use the setup script which handles everything automatically:
   ```bash
   ./setup.sh  # macOS/Linux
   setup.bat   # Windows
   ```

2. **Module not found errors after installation**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **TypeScript errors**
   ```bash
   # Ensure tsconfig.json exists
   npx tsc --init
   
   # Update module resolution
   # In tsconfig.json, set:
   "moduleResolution": "node"
   ```

3. **Vite not starting**
   ```bash
   # Check port availability
   lsof -i :3000
   
   # Use different port
   vite --port 3001
   ```

4. **Figma token issues**
   - Verify token in Figma settings
   - Check token permissions
   - Ensure .env file is loaded

## 📚 Additional Resources

### Documentation
- [Vite Documentation](https://vitejs.dev/)
- [React TypeScript Guide](https://react-typescript-cheatsheet.netlify.app/)
- [Figma API Documentation](https://www.figma.com/developers/api)

### Workshop Materials
- Main workshop modules: `../docs/`
- Resource files: `../resources/`
- Solutions: `../resources/solutions/`

### Community
- Workshop Discord: [Join here](#)
- GitHub Discussions: [Ask questions](#)
- Office Hours: Thursdays 2-3 PM EST

## ✅ Module Completion Checklist

- [ ] Landing page fully converted to React
- [ ] Product card with all enhancements
- [ ] Dashboard with working widgets
- [ ] Automation script configured and tested
- [ ] MCP server running (optional)
- [ ] All tests passing
- [ ] Performance targets met
- [ ] Code review completed

## 🎉 Congratulations!

You've completed the Extra Module! This hands-on experience has given you:
- Real-world design-to-code implementation
- Production-ready component patterns
- Automated workflow setup
- Advanced tooling configuration

### Next Steps
1. Apply these techniques to your own projects
2. Share your implementations with the community
3. Contribute improvements back to the workshop
4. Explore advanced workshop modules 4-8

---

**Need Help?** Check the [troubleshooting guide](../docs/advanced-troubleshooting-guide.md) or ask in the workshop Discord channel.

**Found an Issue?** Please [open an issue](https://github.com/your-repo/issues) or submit a PR.

Happy coding! 🚀 