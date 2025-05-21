# Setting Up the Development Environment

A well-configured development environment is essential for maximizing the efficiency of converting Figma designs to code, especially when using AI-based tools like GitHub Copilot, GitHub Agent, and integrations with Figma MCP Server. This section details the ideal setup for a modern and productive workflow.

## VS Code Configuration

Visual Studio Code is the recommended environment for working with GitHub Copilot and Figma integrations. Configure your environment with the following extensions and settings:

### Essential Extensions

1. **GitHub Copilot and GitHub Copilot Chat**
   - Install the official GitHub Copilot extension
   - Activate GitHub Copilot Chat for more detailed interactions
   - Configure Copilot's agent mode through the command palette (`Ctrl+Shift+P` > "GitHub Copilot: Enable Agent Mode")

2. **Figma for VS Code**
   - Install the official Figma extension for VS Code
   - Configure authentication with your Figma account
   - Enable design preview directly in the editor

3. **Azure Tools Extension**
   - Required for integration with Azure AI Foundry
   - Facilitates the configuration of Azure resources for design analysis

4. **Framework-Specific Extensions**
   - For React: React Developer Tools, ESLint, Prettier
   - For Angular: Angular Language Service, Angular Snippets

### settings.json Configuration

Add the following configurations to your VS Code `settings.json` to optimize working with Figma and GitHub Copilot:

```json
{
  "editor.inlineSuggest.enabled": true,
  "github.copilot.enable": {
    "*": true,
    "plaintext": true,
    "markdown": true,
    "javascript": true,
    "typescript": true,
    "html": true,
    "css": true,
    "scss": true
  },
  "github.copilot.advanced": {
    "indentationMode": true,
    "listMode": true
  },
  "mcp.servers": {
    "figma": {
      "command": "npx",
      "args": [
        "figma-developer-mcp",
        "--figma-api-key=${env:FIGMA_API_KEY}"
      ]
    }
  },
  "figma.fileNodeCaching": true,
  "figma.assetFolder": "${workspaceFolder}/src/assets/figma"
}
```

## Installing Required Node Modules

Depending on the framework you're using, install the necessary packages:

### For React Projects

```bash
# Essential packages
npm install react react-dom

# Choose a styling option
npm install styled-components
# OR
npm install tailwindcss postcss autoprefixer
# OR
npm install @emotion/react @emotion/styled

# Development tools
npm install -D typescript @types/react @types/react-dom
npm install -D eslint eslint-plugin-react eslint-plugin-jsx-a11y

# Component libraries (optional)
npm install @mui/material @mui/icons-material
# OR
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

### For Angular Projects

```bash
# Create new Angular project
ng new my-project --style=scss

# Add Angular Material
ng add @angular/material

# Additional tools
npm install @ngrx/store @ngrx/effects @ngrx/entity
npm install ngx-skeleton-loader
```

## Figma MCP Server Configuration

The Figma MCP Server (Model Context Protocol) allows GitHub Copilot and other AI agents to directly access design information from Figma. Follow these steps to configure it:

### 1. Obtain a Figma API Token

1. Log in to your Figma account
2. Go to Settings > Account > Personal access tokens
3. Create a new token with a clear description (e.g., "MCP Server Integration")
4. Copy the generated token for use in the next steps

### 2. Install Figma Developer MCP

```bash
# Install globally
npm install -g figma-developer-mcp

# Or use npx for one-time execution
npx figma-developer-mcp --figma-api-key=YOUR_TOKEN_HERE
```

### 3. Configure the MCP Server in VS Code

Create a `.mcp.json` file in your project root:

```json
{
  "servers": {
    "figma": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "figma-developer-mcp",
        "--figma-api-key=${env:FIGMA_API_KEY}"
      ]
    }
  }
}
```

### 4. Configure Environment Variables

Create a `.env` file in your project root:

```
FIGMA_API_KEY=your_figma_token_here
GITHUB_TOKEN=your_github_token_here
AZURE_AI_FOUNDRY_KEY=your_azure_token_here
AZURE_AI_FOUNDRY_ENDPOINT=your_azure_endpoint_here
```

Add this file to `.gitignore` to protect your keys.

## GitHub Copilot Agent Configuration

GitHub Copilot Agent is an evolution of GitHub Copilot that allows for more complex and autonomous tasks. Configure it by following these steps:

### 1. Activate Agent Mode in VS Code

1. Open the command palette (`Ctrl+Shift+P`)
2. Type and select "GitHub Copilot: Enable Agent Mode"
3. Restart VS Code when prompted

### 2. Configure Custom Instructions for the Project

Create a `.github/copilot-instructions.md` file in your project root:

```markdown
## Figma-to-Code Conversion Instructions

### Code Standards
- Use TypeScript for all component development
- Follow Atomic Design principles (atoms, molecules, organisms)
- Implement responsive design using flexbox and CSS Grid
- Generate accessibility-compliant code (WCAG AA)
- Use styled-components for React / SCSS for Angular

### File Structure
- Create components in a consistent folder structure
- Include Storybook documentation
- Add appropriate unit tests
- Follow design tokens from Figma

### Figma Integration
- Use the Figma MCP Server to extract precise design information
- Maintain visual fidelity with the original design
- Preserve Figma component naming when appropriate
- Extract and use design variables as CSS tokens
```

### 3. Configure Rules for Code Generation

Create the following configuration files in your project root:

#### .cursorrules

```json
{
  "typescript": {
    "componentNaming": "PascalCase",
    "indentation": 2,
    "quoteStyle": "single",
    "componentPattern": "functional"
  },
  "css": {
    "preprocessor": "scss",
    "methodology": "BEM"
  }
}
```

#### .builderrules

```
Use TypeScript for all components
Follow Atomic Design principles
Implement responsive design with flexbox and CSS Grid
Generate WCAG AA compliant code
Extract design tokens from Figma as CSS variables
```

#### .builderignore

```
node_modules/
dist/
build/
.storybook/
__tests__/
*.test.ts
*.test.tsx
```

## Azure AI Foundry Configuration

Azure AI Foundry can be used for advanced design analysis and code optimization. Configure it by following these steps:

### 1. Create an Azure AI Foundry Resource

1. Access the Azure Portal
2. Create a new Azure AI Foundry resource
3. Obtain the API key and endpoint

### 2. Configure Integration in the Project

Create a `src/utils/azure-ai-foundry.ts` file:

```typescript
import { AzureAIFoundryClient } from '@azure/ai-foundry';

// Create a client
export const aiFoundryClient = new AzureAIFoundryClient({
  endpoint: process.env.AZURE_AI_FOUNDRY_ENDPOINT || '',
  apiKey: process.env.AZURE_AI_FOUNDRY_KEY || ''
});

// Analyze a design
export async function analyzeDesign(figmaImage: string) {
  const result = await aiFoundryClient.analyzeImage({
    image: figmaImage,
    features: ['componentDetection', 'accessibilityCheck']
  });
  
  return result;
}

// Generate optimized code
export async function generateOptimizedCode(designSpec: any, framework: 'react' | 'angular') {
  const result = await aiFoundryClient.generateCode({
    specification: designSpec,
    framework: framework,
    optimizationLevel: 'production'
  });
  
  return result.code;
}
```

## Complementary Tools Configuration

### Visual Copilot (Builder.io)

Visual Copilot by Builder.io is a specialized tool for Figma-to-code conversion that can complement GitHub Copilot:

1. Install the Visual Copilot plugin in Figma
2. Configure integration with your GitHub repository
3. Set code generation preferences (React, Vue, Angular, etc.)

### Cursor

Cursor is a VS Code-based editor with advanced AI features:

1. Download and install Cursor (https://cursor.sh)
2. Configure integration with Figma MCP Server
3. Set up keyboard shortcuts for code generation commands

## Configuration Verification

After configuring the entire environment, run this checklist to ensure everything is working correctly:

1. **Test GitHub Copilot Agent:**
   - Open a code file
   - Use the `/agent` command in the Copilot chat
   - Verify that the agent responds correctly

2. **Test Figma MCP Integration:**
   - Use the `/agent` command followed by a Figma link
   - Verify that the agent can access design information

3. **Test Code Generation:**
   - Ask the agent to generate a simple component
   - Verify that the generated code follows the configured rules

4. **Test Azure AI Foundry Integration:**
   - Run a simple design analysis
   - Verify that results are returned correctly

With this environment configured, you're ready to make the most of AI tools for converting Figma designs into high-quality code.
