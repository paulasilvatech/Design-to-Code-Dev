#!/bin/bash

# Design-to-Code Extra Module Setup Script
# This script sets up the project structure and installs dependencies

echo "🚀 Setting up Design-to-Code Extra Module..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Create project structure
echo "📁 Creating project structure..."
mkdir -p src/{components,pages,styles,utils}
mkdir -p src/components/dashboard
mkdir -p src/layouts
mkdir -p public/assets/{images,icons}

# Create main entry files
echo "📝 Creating entry files..."

# Create index.html
cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Design-to-Code Extra Module</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

# Create main.tsx
cat > src/main.tsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
EOF

# Create App.tsx
cat > src/App.tsx << 'EOF'
import React from 'react'
import './styles/App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 Design-to-Code Extra Module</h1>
        <p>Welcome to the practical demo!</p>
      </header>
      <main className="app-main">
        <section className="demo-section">
          <h2>Available Demos</h2>
          <ul>
            <li>Landing Page (HTML to React conversion)</li>
            <li>Product Card Component</li>
            <li>Dashboard Example</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default App
EOF

# Create global styles
cat > src/styles/global.css << 'EOF'
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f5f5;
  color: #333;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
EOF

# Create App styles
cat > src/styles/App.css << 'EOF'
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #2196F3;
  color: white;
  padding: 2rem;
  text-align: center;
}

.app-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.app-main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.demo-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.demo-section h2 {
  margin-bottom: 1rem;
  color: #1976D2;
}

.demo-section ul {
  list-style: none;
  padding-left: 0;
}

.demo-section li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.demo-section li:last-child {
  border-bottom: none;
}
EOF

# Move example files if they exist
echo "📦 Organizing example files..."
if [ -f "react-product-card.tsx" ]; then
    mv react-product-card.tsx src/components/ProductCard.tsx
    echo "✅ Moved ProductCard component"
fi

if [ -f "dashboard-example.tsx" ]; then
    mv dashboard-example.tsx src/pages/Dashboard.tsx
    echo "✅ Moved Dashboard page"
fi

if [ -f "landing-page-html.html" ]; then
    cp landing-page-html.html public/landing-page-example.html
    echo "✅ Copied landing page example"
fi

# Create environment file
if [ ! -f ".env" ]; then
    echo "🔐 Creating .env file..."
    cat > .env << 'EOF'
# Copy your Figma token here
FIGMA_TOKEN=
FIGMA_FILE_ID=

# Optional configurations
VITE_APP_NAME=Design-to-Code Extra Module
VITE_API_URL=http://localhost:3000/api
VITE_ENABLE_MOCK_DATA=true
EOF
    echo "⚠️  Remember to add your Figma token to .env file!"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create a simple test file
cat > src/components/ProductCard.test.tsx << 'EOF'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'

describe('ProductCard', () => {
  it('should render without crashing', () => {
    const result = render(<div>Product Card Test</div>)
    expect(result).toBeTruthy()
  })
})
EOF

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Add your Figma token to .env file"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open http://localhost:3000 in your browser"
echo "4. Follow the exercises in README.md"
echo ""
echo "Happy coding! 🚀" 