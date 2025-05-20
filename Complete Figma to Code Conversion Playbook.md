

# 🎯 Complete Figma to Code Conversion Playbook

*A comprehensive guide to converting Figma designs to production-ready code using GitHub Agent, GitHub Copilot, GitHub Code Agent, and other AI-powered tools*

# 📑 Table of Contents

1. [📖 Introduction](#introduction)
2. [🗂️ Preparing Figma Designs for Optimal Conversion](#preparing-figma-designs-for-optimal-conversion)
3. [🛠️ Setting Up the Development Environment](#setting-up-the-development-environment)
4. [🤖 GitHub Copilot and GitHub Copilot Agent](#github-copilot-and-github-copilot-agent)
5. [🔗 Figma MCP Server Integration](#figma-mcp-server-integration)
6. [🧭 Visual Copilot and Cursor: Specialized Alternatives](#visual-copilot-and-cursor-specialized-alternatives)
7. [💡 Azure AI Foundry for Design Analysis](#azure-ai-foundry-for-design-analysis)
8. [⚛️ Framework-Specific Implementation: React](#framework-specific-implementation-react)
9. [🅰️ Framework-Specific Implementation: Angular](#framework-specific-implementation-angular)
10. [📦 Component Library Implementation](#component-library-implementation)
11. [♿ Ensuring Accessibility and Responsiveness](#ensuring-accessibility-and-responsiveness)
12. [✅ Testing and Quality Assurance](#testing-and-quality-assurance)
13. [🔄 Optimized Workflows and Continuous Integration](#optimized-workflows-and-continuous-integration)
14. [🎓 Practical Workshop Guide](#practical-workshop-guide)
15. [🛟 Troubleshooting Guide](#troubleshooting-guide)
16. [🔗 Resources and References](#resources-and-references)

# 🎉 Complete Figma to Code Conversion Playbook with GitHub Agent, Copilot and Code Agent

## 📖 Introduction

Converting Figma designs into production-quality code has always been a significant challenge in modern software development. Designers create visually impressive interfaces, but transforming these designs into functional, responsive, and high-quality code requires time, expertise, and meticulous attention to detail.

Fortunately, we are experiencing a revolution in frontend development automation, driven by advances in artificial intelligence and specialized tools. This comprehensive playbook provides a systematic and updated approach to converting Figma designs into production code using the latest technologies from the GitHub ecosystem - GitHub Agent, GitHub Copilot, and GitHub Code Agent - as well as complementary solutions such as Visual Copilot, Cursor, and Figma MCP Server.

By following this guide, you will establish an optimized workflow that leverages AI tools to dramatically reduce development time while maintaining high fidelity to original designs. We'll cover everything from properly preparing Figma files to implementing complex and interactive components, testing, quality assurance, and continuous integration.

This playbook has been specifically developed for teams working with React and Angular, but the principles and many of the techniques can be adapted to other frameworks and libraries. Our goal is to provide a complete resource that helps developers and teams establish an efficient and reproducible process for transforming designs into functional code.

Let's explore how the latest innovations in generative AI and autonomous agents are transforming the frontend development process, allowing you to focus more on business logic and user experience, and less on the manual implementation of layouts and visual components.
# 🎨 Preparing Figma Designs for Optimal Conversion

The quality and efficiency of converting Figma designs to code significantly depend on how Figma files are organized and structured. With modern AI and automation tools, proper preparation can make all the difference between generated code that needs extensive manual revisions and code that is nearly production-ready.

## 📁 Organizing Figma Files for AI-Powered Code Generation

The ideal structure of Figma files for working with GitHub Agent, Copilot, and other AI tools follows a clear and logical hierarchy:

```
Project/
├── 📄 Design System
│   ├── 🎨 Colors and Typography
│   ├── 🧩 Components
│   │   ├── Atoms (buttons, inputs, icons)
│   │   ├── Molecules (cards, forms)
│   │   └── Organisms (headers, sidebars)
│   └── 📐 Spacing and Grid System
├── 📄 Pages
│   ├── 🖼️ Homepage
│   ├── 🖼️ User Dashboard
│   └── 🖼️ Settings
└── 📄 Development-Ready Screens
    ├── 🖼️ Homepage (✅ Ready for Dev)
    ├── 🖼️ Dashboard (✅ Ready for Dev)
    └── 🖼️ Settings (✅ Ready for Dev)
```

This structure facilitates information extraction by AI agents, allowing them to understand the component hierarchy and the relationship between design elements.

## 🔧 Essential Figma Features for Optimizing Conversion

### 📏 Auto Layout

Auto Layout in Figma is fundamental for generating responsive and well-structured code. It translates directly into flexbox or grid in CSS:

Auto Layout in Figma | Generated Code
--- | ---
Vertical Auto Layout | `display: flex; flex-direction: column;`
Horizontal Auto Layout | `display: flex; flex-direction: row;`
Space Between Items | `gap: 16px;`
Padding | `padding: 16px;`

**Best Practices for Auto Layout:**

1. Use vertical or horizontal Auto Layout for all component containers
2. Set consistent spacing with "Space Between Items"
3. Utilize "Fill Container" for responsive elements
4. Group related elements in frames with Auto Layout
5. Maintain a clear Auto Layout hierarchy (don't exceed 3-4 levels of nesting)

### 🧩 Component Variants and Properties

Component variants in Figma create a direct mapping to component props in code:

```
Button (Component)
├── Primary (Variant)
├── Secondary (Variant)
├── Outlined (Variant)
└── Text (Variant)
```

**Properties to Define:**
- State: Default, Hover, Pressed, Disabled, Loading
- Size: Small, Medium, Large
- Icon Position: Left, Right, Icon Only
- Theme: Light, Dark

GitHub Copilot Agent and other AI tools can analyze these variants and automatically generate components with corresponding props.

### 🔄 Design Tokens and Variables

Using variables in Figma is crucial for maintaining consistency between design and code:

**Variables to Define in Figma:**
- Color values (primary, secondary, neutral, semantic)
- Typography styles (family, weight, size, line height)
- Spacing values (4px, 8px, 16px, etc.)
- Border radii (2px, 4px, 8px, etc.)
- Shadow styles (light, medium, heavy)

These variables are easily mapped to CSS variables, design tokens, or theme configurations in code.

### 🏷️ Naming and Organization for AI Agents

To maximize the efficiency of AI agents in converting design to code, adopt these naming practices:

1. **Descriptive and Consistent Names:**
   - Use names that describe function, not appearance (e.g., "PrimaryButton" instead of "BlueButton")
   - Maintain a consistent pattern (camelCase or kebab-case)

2. **Clear Hierarchy:**
   - Prefix related components (e.g., "Button/Primary", "Button/Secondary")
   - Use numbering to indicate order (e.g., "01-Header", "02-MainContent")

3. **Metadata for Agents:**
   - Add prefixes that agents can recognize (e.g., "component:", "page:", "atom:")
   - Include state suffixes when relevant (e.g., "Button:hover", "Input:focus")

## 📝 Development-Specific Documentation

Add annotations directly in Figma to assist AI agents in code generation:

1. **Behavior Descriptions:**
   - Add notes about expected interactions and behaviors
   - Describe transitions and animations with technical details

2. **Responsiveness Information:**
   - Document breakpoints and responsive behaviors
   - Specify which elements should adapt and how

3. **Technical Specifications:**
   - Include references to specific libraries when necessary
   - Document accessibility requirements (WCAG AA/AAA)

4. **Instructions for Agents:**
   - Add specific comments for AI agents (e.g., "// Agent: Implement this as a React functional component")
   - Include references to existing code patterns

## 🔌 Preparation for Extraction with MCP Server

To optimize information extraction by the Figma MCP Server, follow these additional steps:

1. **Enable Dev Mode in Figma:**
   - Activate Dev Mode to expose additional properties to agents
   - Organize components on a dedicated handoff page

2. **Prepare IDs for Extraction:**
   - Ensure all important components have unique IDs
   - Use a naming system that facilitates API reference

3. **Organize Assets for Download:**
   - Prepare icons and images for export
   - Define appropriate export formats (SVG for icons, WebP for images)

4. **Create a Documentation Page:**
   - Add a specific page with instructions for AI agents
   - Include preferred code examples and patterns to follow

## ✅ Pre-Conversion Validation

Before starting the conversion process with AI agents, run this validation checklist:

1. **Design Consistency:**
   - Check if all components use consistent variables and styles
   - Confirm there are no hardcoded values for colors, fonts, or spacing

2. **Auto Layout Structure:**
   - Verify that all frames use Auto Layout appropriately
   - Confirm that the Auto Layout hierarchy is optimized

3. **Components and Variants:**
   - Verify that all repeated components are instances of components
   - Confirm that variants are correctly configured

4. **Responsiveness:**
   - Check if layouts work on different screen sizes
   - Confirm that constraints are properly configured

5. **Documentation:**
   - Verify that all necessary annotations are present
   - Confirm that instructions for agents are clear and complete

By following these preparation practices, you will maximize the efficiency and quality of code generated by AI agents, significantly reducing the time needed for manual adjustments and post-generation refinements.
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
# GitHub Copilot and GitHub Copilot Agent

GitHub Copilot has evolved significantly from its initial release as a code completion tool to become a powerful AI assistant capable of handling complex tasks in the design-to-code workflow. This section explores how to leverage GitHub Copilot and the newer GitHub Copilot Agent specifically for Figma-to-code conversion.

## Understanding GitHub Copilot for Design-to-Code

GitHub Copilot is an AI pair programmer that can assist with various coding tasks, including converting Figma designs to code. The latest version includes:

1. **Inline Code Suggestions**: Automatically suggests code as you type
2. **Chat Interface**: Allows natural language conversations about code
3. **Agent Mode**: Enables autonomous task execution
4. **MCP Integration**: Connects with external tools like Figma

For Figma-to-code conversion, GitHub Copilot can dramatically reduce development time by:

- Generating component structures based on Figma designs
- Creating CSS/SCSS styles that match design specifications
- Implementing responsive behaviors
- Suggesting accessibility improvements

## GitHub Copilot Agent: The Next Evolution

The GitHub Copilot Agent represents a significant advancement in AI-assisted development. Unlike the standard Copilot, which primarily offers suggestions, the Agent can:

1. **Execute Complex Tasks**: Implement entire features autonomously
2. **Integrate with External Tools**: Connect directly with Figma via MCP
3. **Run in Background**: Complete tasks asynchronously with GitHub Actions
4. **Understand Project Context**: Consider your codebase, style, and patterns

### Enabling and Configuring GitHub Copilot Agent

To use GitHub Copilot Agent for Figma-to-code conversion:

1. **Enable Agent Mode**:
   ```
   Command Palette (Ctrl+Shift+P) > GitHub Copilot: Enable Agent Mode
   ```

2. **Access the Agent**:
   - Via Copilot Chat panel: `/agent`
   - Via command palette: "GitHub Copilot: Start Agent Task"

3. **Configure Agent Behavior**:
   Create a `.github/copilot-agent-config.json` file:
   ```json
   {
     "figmaIntegration": {
       "enabled": true,
       "preferredExtractionMethod": "mcp",
       "componentNamingStrategy": "figmaToCode"
     },
     "codeGeneration": {
       "framework": "react", // or "angular"
       "styling": "styled-components", // or "scss", "tailwind"
       "typescript": true,
       "accessibility": "wcagAA"
     },
     "agentBehavior": {
       "autonomyLevel": "high",
       "feedbackFrequency": "milestone",
       "errorHandling": "suggestFixes"
     }
   }
   ```

## Effective Prompting Techniques for Figma-to-Code

The quality of code generated by GitHub Copilot Agent depends significantly on how you structure your prompts. Here are effective prompting strategies specifically for Figma-to-code conversion:

### Basic Component Request

```
/agent Generate a Button component based on this Figma design: 
https://www.figma.com/file/abc123/Design-System?node-id=123-456

Requirements:
- Support primary, secondary, and outlined variants
- Include small, medium, and large sizes
- Support left and right icons
- Handle disabled and loading states
- Follow our project's TypeScript and styled-components patterns
```

### Complex Component Request

```
/agent Create a DataTable component based on this Figma design:
https://www.figma.com/file/abc123/Design-System?node-id=789-012

Requirements:
1. Support sorting by column
2. Include pagination with configurable items per page
3. Allow row selection (single and multiple)
4. Implement responsive behavior for mobile devices
5. Include search/filter functionality
6. Match the Figma design's visual styling exactly
7. Ensure WCAG AA compliance
8. Include comprehensive unit tests
```

### Page Layout Request

```
/agent Analyze and implement the dashboard layout from this Figma design:
https://www.figma.com/file/abc123/Dashboard?node-id=345-678

Please:
1. Create a component hierarchy diagram first
2. Generate all necessary component files
3. Implement the responsive layout structure
4. Connect components with proper props
5. Use our existing navigation and card components
6. Ensure the layout works on mobile, tablet, and desktop
```

### Design System Implementation

```
/agent Extract the design system from this Figma file and implement it as a code library:
https://www.figma.com/file/abc123/Design-System

Please:
1. Create a theme configuration with all colors, typography, and spacing
2. Generate base components for all atoms in the design system
3. Implement the component variants as shown in Figma
4. Create a documentation page showcasing all components
5. Set up Storybook stories for each component
```

## Using GitHub Copilot Agent with Figma MCP Server

When GitHub Copilot Agent is connected to a Figma MCP Server, it gains powerful capabilities for design-to-code conversion:

### Available Tools Through MCP

Once configured, GitHub Copilot Agent can use these Figma-specific tools:

1. **get_figma_file**: Retrieve comprehensive information about a Figma file
   ```
   /agent Use get_figma_file to analyze the structure of https://www.figma.com/file/abc123/Design-System
   ```

2. **get_figma_node**: Get detailed information about a specific component or frame
   ```
   /agent Use get_figma_node to extract the Button component from https://www.figma.com/file/abc123/Design-System?node-id=123-456
   ```

3. **download_figma_images**: Extract images and icons from a Figma file
   ```
   /agent Use download_figma_images to get all icons from https://www.figma.com/file/abc123/Design-System?node-id=789-012
   ```

### Example Workflow: Complete Component Library Generation

Here's an example of a complete workflow using GitHub Copilot Agent with Figma MCP Server:

```
/agent I need to convert our entire design system from Figma to a React component library.

Figma file: https://www.figma.com/file/abc123/Design-System

Please:
1. Analyze the design system structure
2. Extract all design tokens (colors, typography, spacing)
3. Generate a theme configuration file
4. Create base components for all atoms (buttons, inputs, etc.)
5. Implement component variants as shown in Figma
6. Set up Storybook for documentation
7. Ensure all components are accessible and responsive
8. Add unit tests for each component
```

The agent will:
1. Use `get_figma_file` to analyze the overall structure
2. Extract design tokens and create a theme configuration
3. Use `get_figma_node` for each component to extract detailed properties
4. Generate component code based on the extracted information
5. Use `download_figma_images` for any icons or images
6. Create Storybook stories and unit tests
7. Organize everything into a coherent component library

## GitHub Copilot Agent for Continuous Design-Code Synchronization

One of the most powerful applications of GitHub Copilot Agent is maintaining synchronization between Figma designs and code as designs evolve:

### Setting Up Design-Code Sync

1. **Create a GitHub Action Workflow**:
   ```yaml
   # .github/workflows/figma-sync.yml
   name: Figma Design Sync
   
   on:
     schedule:
       - cron: '0 0 * * *'  # Daily at midnight
     workflow_dispatch:  # Manual trigger
   
   jobs:
     sync-design-system:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Set up Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'
             
         - name: Install dependencies
           run: npm ci
           
         - name: Run Figma sync script
           run: node scripts/figma-sync.js
           env:
             FIGMA_API_KEY: ${{ secrets.FIGMA_API_KEY }}
             GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
             FIGMA_FILE_ID: 'abc123'
   ```

2. **Create a Sync Script**:
   ```javascript
   // scripts/figma-sync.js
   const { execSync } = require('child_process');
   
   // This script uses GitHub Copilot Agent CLI to sync Figma designs
   async function syncDesigns() {
     // Use GitHub Copilot Agent to check for design changes
     execSync(`gh copilot agent run "Check for changes in Figma design https://www.figma.com/file/${process.env.FIGMA_FILE_ID} and update affected components"`);
   }
   
   syncDesigns().catch(console.error);
   ```

### Handling Design Changes

When designs change in Figma, GitHub Copilot Agent can:

1. **Identify Changed Components**: Compare current code with updated designs
2. **Update Component Code**: Modify only the affected components
3. **Preserve Custom Logic**: Keep business logic while updating visual aspects
4. **Create Pull Requests**: Submit changes for review rather than direct commits
5. **Document Changes**: Add comments explaining what was updated and why

## 🌟 Best Practices for GitHub Copilot Agent with Figma

To get the most out of GitHub Copilot Agent for Figma-to-code conversion:

1. **Start with Clear Component Boundaries**:
   - Have well-defined components in Figma
   - Use consistent naming conventions

2. **Provide Context in Prompts**:
   - Mention your tech stack and preferences
   - Reference existing patterns in your codebase

3. **Review and Refine**:
   - Treat generated code as a starting point
   - Review for edge cases and optimizations

4. **Iterative Approach**:
   - Start with simple components before complex ones
   - Build up your design system incrementally

5. **Maintain Documentation**:
   - Document the relationship between Figma components and code
   - Keep a mapping of Figma node IDs to component files

6. **Version Control**:
   - Commit generated code in logical chunks
   - Use meaningful commit messages referencing Figma versions

By leveraging GitHub Copilot Agent with these strategies, you can establish a highly efficient workflow for converting Figma designs to production-quality code, significantly reducing development time while maintaining high fidelity to the original designs.
# Figma MCP Server Integration

The Model Context Protocol (MCP) represents a significant advancement in how AI tools interact with design systems. For Figma-to-code workflows, the Figma MCP Server provides a standardized way for GitHub Copilot, Cursor, and other AI assistants to directly access and understand Figma design files. This section explores how to set up and leverage Figma MCP Server for efficient design-to-code conversion.

## Understanding MCP Servers

MCP (Model Context Protocol) servers provide a standardized interface for AI models to interact with external tools and services. In the context of Figma-to-code conversion:

1. **Figma MCP Server**: Provides design information directly to AI assistants
2. **GitHub MCP Server**: Enables repository operations through AI assistants

These servers allow AI tools to "see" and understand your designs at a deep level, extracting not just visual elements but also structural information, component relationships, and design tokens.

## Installing and Configuring Figma MCP Server

### Prerequisites

Before setting up the Figma MCP Server, ensure you have:

1. A Figma account with access to the designs you want to convert
2. A Figma API key (Personal Access Token)
3. Node.js installed on your system

### Installation Steps

```bash
# Install the Figma Developer MCP globally
npm install -g figma-developer-mcp

# Run the server with your API key
figma-developer-mcp --figma-api-key=YOUR_API_KEY
```

For persistent configuration in VS Code, add to your `settings.json`:

```json
{
  "mcp.servers": {
    "figma": {
      "type": "stdio",
      "command": "figma-developer-mcp",
      "args": ["--figma-api-key=${env:FIGMA_API_KEY}"]
    }
  }
}
```

Alternatively, create an `.mcp.json` file in your project root:

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

### Advanced Configuration Options

The Figma MCP Server supports several advanced configuration options:

```bash
figma-developer-mcp --figma-api-key=YOUR_API_KEY --cache-dir=./cache --log-level=info --port=3000
```

Options include:
- `--cache-dir`: Directory for caching Figma file data
- `--log-level`: Verbosity of logs (error, warn, info, debug)
- `--port`: Port for the server to listen on (when using HTTP mode)
- `--no-cache`: Disable caching (always fetch fresh data)

## Available MCP Tools for Figma

Once the Figma MCP Server is running, AI assistants like GitHub Copilot Agent gain access to these powerful tools:

### 1. get_figma_data

This tool retrieves comprehensive information about a Figma file or specific node:

**Parameters:**
- `file_url`: URL of the Figma file
- `node_id`: (Optional) ID of a specific node to retrieve

**Example Usage with GitHub Copilot Agent:**
```
/agent Use get_figma_data to analyze the structure of https://www.figma.com/file/abc123/Design-System
```

**What It Returns:**
- File metadata (name, last modified, etc.)
- Page structure
- Component definitions
- Style information (colors, typography, effects)
- Auto layout properties
- Constraints and positioning

### 2. download_figma_images

This tool extracts images and icons from a Figma file:

**Parameters:**
- `file_url`: URL of the Figma file
- `node_ids`: Array of node IDs to download as images
- `format`: (Optional) Image format (png, svg, jpg)
- `scale`: (Optional) Image scale factor

**Example Usage with GitHub Copilot Agent:**
```
/agent Use download_figma_images to get all icons from https://www.figma.com/file/abc123/Design-System?node-id=789-012 in SVG format
```

**What It Returns:**
- URLs to download the requested images
- Base64-encoded image data (for direct use)
- Image metadata (dimensions, format)

## Integration with Different AI Tools

The Figma MCP Server can be integrated with various AI tools for design-to-code conversion:

### GitHub Copilot Agent

After setting up the Figma MCP Server, GitHub Copilot Agent automatically detects it and makes the Figma tools available:

1. Open GitHub Copilot Chat in VS Code
2. Use the `/agent` command followed by a prompt that includes a Figma URL
3. The agent will use the MCP Server to extract design information

Example workflow:
```
/agent Generate a React component for the navigation bar in https://www.figma.com/file/abc123/Website?node-id=10-25 using styled-components and ensuring it's responsive
```

### Cursor

Cursor is an AI-powered code editor that can integrate with the Figma MCP Server:

1. Install Cursor (https://cursor.sh)
2. Configure the Figma MCP Server as described above
3. Use Cursor's AI commands to reference Figma designs

Example in Cursor:
```
/create a React component for the card design in https://www.figma.com/file/abc123/Design-System?node-id=45-67
```

### Visual Copilot

Visual Copilot by Builder.io can also leverage the Figma MCP Server for enhanced design understanding:

1. Install the Visual Copilot plugin in Figma
2. Configure the connection to your development environment
3. Use Visual Copilot's commands to generate code with MCP-enhanced context

## Practical Workflows with Figma MCP Server

### Complete Component Library Generation

This workflow demonstrates how to use the Figma MCP Server to generate an entire component library:

1. **Extract Design System Information:**
   ```
   /agent Use get_figma_data to analyze our design system at https://www.figma.com/file/abc123/Design-System and create a comprehensive report of all components, styles, and tokens
   ```

2. **Generate Theme Configuration:**
   ```
   /agent Based on the design system analysis, create a theme.ts file with all colors, typography, spacing, and other design tokens
   ```

3. **Generate Base Components:**
   ```
   /agent For each atomic component in the design system, generate a React component with TypeScript and styled-components. Start with Button, Input, and Typography components
   ```

4. **Extract and Optimize Icons:**
   ```
   /agent Use download_figma_images to extract all icons from the Icons page as SVG, then optimize them and create an icon component system
   ```

5. **Build Composite Components:**
   ```
   /agent Now that we have base components, generate the Card, Modal, and Form components based on their Figma definitions
   ```

### Single Component Deep Dive

This workflow shows a detailed process for converting a single complex component:

1. **Extract Component Details:**
   ```
   /agent Use get_figma_data to analyze the DataTable component at https://www.figma.com/file/abc123/Design-System?node-id=789-012
   ```

2. **Understand Component Variants:**
   ```
   /agent Analyze all variants of the DataTable component and create a comprehensive props interface that covers all possible configurations
   ```

3. **Generate Component Code:**
   ```
   /agent Generate the DataTable component with TypeScript, including all variants, responsive behavior, and accessibility features
   ```

4. **Extract Visual Assets:**
   ```
   /agent Use download_figma_images to get any icons or visual elements needed for the DataTable component
   ```

5. **Create Storybook Stories:**
   ```
   /agent Create Storybook stories that showcase all variants and states of the DataTable component
   ```

### Responsive Page Implementation

This workflow demonstrates converting a complete page design:

1. **Analyze Page Structure:**
   ```
   /agent Use get_figma_data to analyze the Dashboard page at https://www.figma.com/file/abc123/Website?node-id=123-456 and create a component hierarchy diagram
   ```

2. **Extract Layout Information:**
   ```
   /agent Analyze the responsive behavior of the Dashboard page across different breakpoints and create a responsive layout system
   ```

3. **Generate Page Components:**
   ```
   /agent Generate all components needed for the Dashboard page, starting with the layout structure
   ```

4. **Extract and Optimize Images:**
   ```
   /agent Use download_figma_images to extract all images and icons needed for the Dashboard page
   ```

5. **Assemble Complete Page:**
   ```
   /agent Create the final Dashboard page component that assembles all sub-components into a complete, responsive page
   ```

## Best Practices for Figma MCP Server

To get the most out of the Figma MCP Server integration:

### 1. Optimize Figma File Structure

- Organize components in a logical hierarchy
- Use consistent naming conventions
- Group related components on dedicated pages
- Ensure all components use Auto Layout
- Define all styles as variables/tokens

### 2. Manage API Rate Limits

- Implement caching to reduce API calls
- Batch related requests together
- Use node IDs rather than fetching entire files
- Consider premium Figma plans for higher rate limits

### 3. Secure API Keys

- Store API keys in environment variables
- Never commit API keys to version control
- Rotate API keys periodically
- Use scoped access tokens when possible

### 4. Enhance AI Understanding

- Add descriptive comments in Figma
- Use clear and consistent naming
- Group related elements logically
- Specify component behavior in Figma descriptions
- Include responsive behavior notes

### 5. Implement Versioning

- Reference specific Figma file versions in prompts
- Document which version of the design each code component implements
- Create a version mapping between Figma and code

## Troubleshooting Figma MCP Server

Common issues and their solutions:

### Authentication Failures

**Issue:** The MCP Server fails to authenticate with Figma API.
**Solution:**
- Verify your API key is correct and not expired
- Ensure the API key has appropriate permissions
- Check if you've reached Figma API rate limits

### Missing Design Information

**Issue:** The AI assistant can't access certain design elements.
**Solution:**
- Ensure the file is properly shared and accessible
- Check that node IDs are correct
- Verify that the design elements are on the correct page/frame

### Performance Issues

**Issue:** The MCP Server is slow or unresponsive.
**Solution:**
- Enable caching with `--cache-dir`
- Request specific nodes rather than entire files
- Optimize your Figma file (reduce unnecessary complexity)
- Increase server resources if running in production

By leveraging the Figma MCP Server effectively, you can create a seamless bridge between your design system and code, enabling AI assistants to generate high-fidelity implementations that closely match your original designs while maintaining code quality and best practices.
# Visual Copilot and Cursor: Specialized Alternatives

While GitHub Copilot and its Agent capabilities provide powerful tools for Figma-to-code conversion, there are specialized alternatives that focus specifically on design-to-code workflows. This section explores Visual Copilot by Builder.io and Cursor, two cutting-edge solutions that can complement or serve as alternatives to the GitHub ecosystem for converting Figma designs to production-ready code.

## Visual Copilot: AI-Powered Figma to Code

Visual Copilot is Builder.io's specialized AI solution for converting Figma designs directly into high-quality code. It's designed specifically for the design-to-code workflow, offering features tailored to this use case.

### Key Features of Visual Copilot

1. **Direct Figma Integration**: Works as a Figma plugin for seamless conversion
2. **Multi-Framework Support**: Generates code for React, Vue, Svelte, Angular, and more
3. **Design Token Extraction**: Automatically extracts and applies design tokens
4. **Component Reuse**: Can leverage your existing component library
5. **Real-Time Generation**: Converts designs to code in real-time
6. **High Fidelity**: Maintains visual accuracy to the original design

### Setting Up Visual Copilot

1. **Install the Plugin**:
   - Open Figma and navigate to the Community tab
   - Search for "Visual Copilot" by Builder.io
   - Click "Install"

2. **Configure Preferences**:
   - Open the plugin in Figma
   - Select your preferred framework (React, Vue, Angular, etc.)
   - Choose styling approach (styled-components, CSS modules, Tailwind, etc.)
   - Configure additional options (TypeScript, responsive behavior, etc.)

3. **Connect to Your Codebase** (Optional):
   - Link to your GitHub repository
   - Configure component mapping
   - Set up design token integration

### Using Visual Copilot for Figma-to-Code Conversion

Visual Copilot offers several workflows for converting designs to code:

#### Single Component Conversion

1. Select a component or frame in Figma
2. Open the Visual Copilot plugin
3. Click "Generate Code"
4. Review and copy the generated code
5. Paste into your project or export as a file

#### Complete Page Conversion

1. Select a page frame in Figma
2. Open the Visual Copilot plugin
3. Click "Generate Page"
4. Configure options (responsive breakpoints, SEO elements, etc.)
5. Export the complete page code

#### Design System Extraction

1. Select your design system page in Figma
2. Open the Visual Copilot plugin
3. Click "Extract Design System"
4. Configure token mapping
5. Export theme configuration and base components

### ⚙️ Configuration Rules for Visual Copilot

Visual Copilot supports a `.builderrules` file for customizing code generation:

```
// .builderrules
Use TypeScript for all components
Follow Atomic Design principles
Generate responsive components using flexbox
Ensure WCAG AA compliance
Use styled-components for styling
Follow our naming convention: PascalCase for components, camelCase for props
```

You can also create a `.builderignore` file to exclude certain elements from code generation:

```
// .builderignore
**/draft-*
**/prototype-*
**/.ignore-*
```

### Integration with Development Workflow

Visual Copilot can be integrated into your development workflow in several ways:

1. **Direct Export**: Generate code and export directly to your project
2. **GitHub Integration**: Push generated code to a GitHub repository
3. **CI/CD Pipeline**: Automate design-to-code conversion in your CI/CD process
4. **API Access**: Use the Builder.io API for programmatic conversion

## Cursor: AI-Enhanced Code Editor for Design Implementation

Cursor is an AI-powered code editor built on VS Code that offers enhanced capabilities for implementing designs as code. It combines the familiar VS Code experience with powerful AI features specifically useful for design-to-code workflows.

### Key Features of Cursor

1. **AI-Powered Coding**: Advanced code generation and editing capabilities
2. **Figma MCP Integration**: Direct connection to Figma design files
3. **Context-Aware Suggestions**: Understands your codebase and design context
4. **Chat Interface**: Natural language interaction for complex tasks
5. **Code Explanation**: Can explain and document generated code
6. **Refactoring Tools**: AI-assisted code refactoring and optimization

### Setting Up Cursor for Figma-to-Code

1. **Install Cursor**:
   - Download from https://cursor.sh
   - Install and set up with your GitHub account

2. **Configure Figma Integration**:
   - Set up Figma MCP Server as described in the previous section
   - Configure Cursor to use the MCP Server

3. **Set Up Project**:
   - Open your project in Cursor
   - Configure `.cursorrules` file for consistent code generation

### Using Cursor for Figma-to-Code Conversion

Cursor offers several powerful workflows for implementing Figma designs:

#### Direct Design Reference

```
// In Cursor's AI chat
/create a React component for the navigation bar in this Figma design: 
https://www.figma.com/file/abc123/Website?node-id=10-25

Use styled-components and make it responsive for mobile, tablet, and desktop.
```

#### Component Implementation with Context

```
// In Cursor's AI chat
/implement the DataTable component from our Figma design system:
https://www.figma.com/file/abc123/Design-System?node-id=45-67

It should:
1. Match our existing component patterns
2. Support sorting, filtering, and pagination
3. Use our theme tokens for styling
4. Be fully accessible
```

#### Design System Implementation

```
// In Cursor's AI chat
/help me implement our entire design system from Figma:
https://www.figma.com/file/abc123/Design-System

Let's start by:
1. Extracting all design tokens
2. Creating the theme configuration
3. Implementing base components
4. Then building more complex components
```

### Configuration Rules for Cursor

Create a `.cursorrules` file in your project root to guide Cursor's code generation:

```json
{
  "codeStyle": {
    "indentation": "spaces",
    "indentSize": 2,
    "lineLength": 80,
    "quoteStyle": "single"
  },
  "componentStyle": {
    "framework": "react",
    "styling": "styled-components",
    "typescript": true,
    "componentPattern": "functional",
    "propsInterface": true,
    "defaultExport": true
  },
  "naming": {
    "components": "PascalCase",
    "props": "camelCase",
    "files": "PascalCase",
    "styles": "camelCase"
  }
}
```

## Comparing Visual Copilot, Cursor, and GitHub Copilot

Each tool has its strengths for different aspects of the Figma-to-code workflow:

| Feature | Visual Copilot | Cursor | GitHub Copilot Agent |
|---------|---------------|--------|---------------------|
| **Primary Focus** | Design-to-code conversion | AI-enhanced coding | General code assistance |
| **Figma Integration** | Direct plugin | Via MCP Server | Via MCP Server |
| **Code Generation Quality** | High fidelity to design | High code quality | Balanced approach |
| **Framework Support** | Multiple frameworks | Multiple frameworks | Multiple frameworks |
| **Learning Curve** | Low (designer-friendly) | Medium | Medium-High |
| **Customization** | Good | Excellent | Good |
| **Team Collaboration** | Good | Limited | Excellent (GitHub) |
| **Pricing Model** | Subscription | Free/Subscription | Subscription |

### When to Use Each Tool

- **Visual Copilot**: Best for designers who want to generate code directly from Figma, or for initial conversion of designs to code
- **Cursor**: Ideal for developers implementing designs who want AI assistance throughout the coding process
- **GitHub Copilot Agent**: Best for teams already using GitHub ecosystem who want integrated design-to-code workflows

## 🔄 Combining Tools for an Optimal Workflow

For the most efficient Figma-to-code process, consider combining these tools:

1. **Initial Conversion**: Use Visual Copilot to generate the initial code structure directly from Figma
2. **Code Refinement**: Use Cursor to refine and optimize the generated code
3. **Integration and Testing**: Use GitHub Copilot Agent to help with integration, testing, and documentation

### Example Combined Workflow

1. **Design Preparation**:
   - Organize Figma files according to best practices
   - Define components, variants, and design tokens

2. **Initial Code Generation**:
   - Use Visual Copilot to generate base components and layouts
   - Export generated code to your project

3. **Code Refinement**:
   - Open the project in Cursor
   - Use Cursor's AI to refine and optimize the code
   - Implement additional functionality and interactions

4. **Integration and Testing**:
   - Use GitHub Copilot Agent to help with integration
   - Generate tests and documentation
   - Ensure accessibility and responsiveness

5. **Continuous Updates**:
   - When designs change, use Visual Copilot to regenerate affected components
   - Use Cursor to integrate changes with minimal disruption
   - Use GitHub Copilot Agent to update tests and documentation

## Best Practices for Specialized Tools

To get the most out of these specialized tools:

### For Visual Copilot

1. **Prepare Designs Properly**:
   - Use Auto Layout consistently
   - Define all styles as variables
   - Organize components logically

2. **Start Small**:
   - Begin with simple components
   - Gradually move to more complex ones
   - Build up to complete pages

3. **Review Generated Code**:
   - Check for accuracy and quality
   - Look for optimization opportunities
   - Ensure accessibility compliance

### For Cursor

1. **Provide Clear Context**:
   - Reference specific Figma nodes
   - Describe desired functionality clearly
   - Mention existing patterns to follow

2. **Iterative Refinement**:
   - Start with basic implementation
   - Refine with additional prompts
   - Use chat history for context

3. **Learn Prompt Patterns**:
   - Develop effective prompt templates
   - Save successful prompts for reuse
   - Share effective prompts with team

By leveraging these specialized tools alongside GitHub Copilot, you can create a powerful workflow that dramatically reduces the time and effort required to convert Figma designs into high-quality, production-ready code.
# Azure AI Foundry for Design Analysis

Azure AI Foundry provides powerful capabilities for analyzing and understanding design elements, which can significantly enhance the Figma-to-code conversion process. This section explores how to leverage Azure AI Foundry to improve the quality, accessibility, and performance of code generated from Figma designs.

## Understanding Azure AI Foundry

Azure AI Foundry is a comprehensive platform that combines various AI services to analyze visual content, extract information, and generate optimized code. For Figma-to-code workflows, it offers several key capabilities:

1. **Design Pattern Recognition**: Identifies common UI patterns and components
2. **Accessibility Analysis**: Evaluates designs for WCAG compliance
3. **Design Token Extraction**: Converts visual styles to code variables
4. **Performance Optimization**: Suggests code improvements for better performance
5. **Code Generation**: Creates optimized code for different frameworks

## Setting Up Azure AI Foundry

### Prerequisites

Before setting up Azure AI Foundry, ensure you have:

1. An Azure account with appropriate permissions
2. Basic familiarity with Azure services
3. Your Figma designs prepared according to best practices

### Creating an Azure AI Foundry Resource

1. **Access the Azure Portal**:
   - Navigate to [portal.azure.com](https://portal.azure.com)
   - Sign in with your Azure account

2. **Create a New Resource**:
   - Click "Create a resource"
   - Search for "AI Foundry"
   - Select "Azure AI Foundry" and click "Create"

3. **Configure the Resource**:
   - Select your subscription
   - Choose or create a resource group
   - Select a region close to your location
   - Choose a pricing tier (start with Standard for development)
   - Click "Review + create" and then "Create"

4. **Get API Credentials**:
   - Once the resource is created, navigate to it
   - Go to "Keys and Endpoint" in the left menu
   - Copy Key 1 and the Endpoint URL

### Configuring Environment Variables

Add your Azure AI Foundry credentials to your project's environment variables:

```
# .env file
AZURE_AI_FOUNDRY_KEY=your_key_here
AZURE_AI_FOUNDRY_ENDPOINT=your_endpoint_here
```

Remember to add this file to `.gitignore` to protect your credentials.

## Integrating Azure AI Foundry in Your Workflow

### Creating a Client Utility

Create a utility file to interact with Azure AI Foundry:

```typescript
// src/utils/azure-ai-foundry.ts
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
    features: ['componentDetection', 'accessibilityCheck', 'designTokenExtraction']
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

// Check accessibility
export async function checkAccessibility(figmaImage: string) {
  const result = await aiFoundryClient.analyzeAccessibility({
    image: figmaImage,
    standard: 'wcagAA'
  });
  
  return result.issues;
}

// Extract design tokens
export async function extractDesignTokens(figmaFile: string) {
  const result = await aiFoundryClient.extractDesignTokens({
    figmaFile: figmaFile,
    tokenFormat: 'css'
  });
  
  return result.tokens;
}
```

## Key Azure AI Foundry Features for Figma-to-Code

### Design Pattern Recognition

Azure AI Foundry can analyze Figma designs to identify common UI patterns and components:

```typescript
async function identifyUIPatterns(figmaImage: string) {
  const result = await aiFoundryClient.analyzeImage({
    image: figmaImage,
    features: ['componentDetection']
  });
  
  const patterns = result.components.map(component => ({
    type: component.type,
    confidence: component.confidence,
    boundingBox: component.boundingBox,
    properties: component.properties
  }));
  
  return patterns;
}
```

This helps in:
- Identifying standard components (buttons, cards, forms, etc.)
- Understanding component hierarchies
- Suggesting appropriate component implementations

### Accessibility Analysis

Azure AI Foundry can evaluate designs for accessibility issues:

```typescript
async function evaluateAccessibility(figmaImage: string) {
  const issues = await checkAccessibility(figmaImage);
  
  // Group issues by severity
  const criticalIssues = issues.filter(issue => issue.severity === 'critical');
  const majorIssues = issues.filter(issue => issue.severity === 'major');
  const minorIssues = issues.filter(issue => issue.severity === 'minor');
  
  return {
    criticalIssues,
    majorIssues,
    minorIssues,
    summary: {
      total: issues.length,
      critical: criticalIssues.length,
      major: majorIssues.length,
      minor: minorIssues.length
    }
  };
}
```

This helps in:
- Identifying color contrast issues
- Detecting missing alt text
- Finding keyboard navigation problems
- Suggesting ARIA attributes

### Design Token Extraction

Azure AI Foundry can extract design tokens from Figma files:

```typescript
async function getDesignSystem(figmaFile: string) {
  const tokens = await extractDesignTokens(figmaFile);
  
  // Organize tokens by type
  const colorTokens = tokens.filter(token => token.type === 'color');
  const typographyTokens = tokens.filter(token => token.type === 'typography');
  const spacingTokens = tokens.filter(token => token.type === 'spacing');
  const shadowTokens = tokens.filter(token => token.type === 'shadow');
  
  return {
    colors: colorTokens,
    typography: typographyTokens,
    spacing: spacingTokens,
    shadows: shadowTokens
  };
}
```

This helps in:
- Creating consistent design systems
- Generating theme files
- Ensuring visual consistency
- Facilitating dark mode implementation

### Performance Optimization

Azure AI Foundry can suggest optimizations for generated code:

```typescript
async function optimizeGeneratedCode(code: string, framework: 'react' | 'angular') {
  const result = await aiFoundryClient.optimizeCode({
    code: code,
    framework: framework,
    optimizationTargets: ['performance', 'accessibility', 'maintainability']
  });
  
  return {
    optimizedCode: result.code,
    improvements: result.improvements,
    performanceGain: result.metrics.performanceImprovement
  };
}
```

This helps in:
- Reducing bundle size
- Improving render performance
- Enhancing code maintainability
- Fixing potential memory leaks

## 🔄 Practical Workflows with Azure AI Foundry

### 🎯 Design System Analysis and Implementation

This workflow demonstrates how to analyze and implement a complete design system:

1. **Extract Design Tokens**:
   ```typescript
   const designSystem = await getDesignSystem('https://www.figma.com/file/abc123/Design-System');
   ```

2. **Generate Theme Configuration**:
   ```typescript
   // For React with styled-components
   const themeConfig = `
   export const theme = {
     colors: {
       ${designSystem.colors.map(color => `${color.name}: '${color.value}'`).join(',\n       ')}
     },
     typography: {
       ${designSystem.typography.map(type => `${type.name}: '${type.value}'`).join(',\n       ')}
     },
     spacing: {
       ${designSystem.spacing.map(space => `${space.name}: '${space.value}'`).join(',\n       ')}
     },
     shadows: {
       ${designSystem.shadows.map(shadow => `${shadow.name}: '${shadow.value}'`).join(',\n       ')}
     }
   };
   `;
   ```

3. **Generate Component Library**:
   ```typescript
   // For each component in the design system
   for (const component of designComponents) {
     const componentSpec = await aiFoundryClient.getComponentSpecification({
       figmaFile: 'https://www.figma.com/file/abc123/Design-System',
       componentId: component.id
     });
     
     const componentCode = await generateOptimizedCode(componentSpec, 'react');
     
     // Save component to file
     fs.writeFileSync(`src/components/${component.name}.tsx`, componentCode);
   }
   ```

### Accessibility-First Implementation

This workflow focuses on ensuring accessibility from the start:

1. **Analyze Design for Accessibility**:
   ```typescript
   const accessibilityReport = await evaluateAccessibility('https://www.figma.com/file/abc123/Website?node-id=10-25');
   ```

2. **Generate Accessible Code**:
   ```typescript
   const accessibleCode = await aiFoundryClient.generateAccessibleCode({
     figmaFile: 'https://www.figma.com/file/abc123/Website',
     nodeId: '10-25',
     framework: 'react',
     accessibilityLevel: 'wcagAA'
   });
   ```

3. **Verify Accessibility**:
   ```typescript
   const verificationResult = await aiFoundryClient.verifyAccessibility({
     code: accessibleCode,
     standard: 'wcagAA'
   });
   ```

### Performance-Optimized Implementation

This workflow focuses on generating high-performance code:

1. **Analyze Design Complexity**:
   ```typescript
   const complexityAnalysis = await aiFoundryClient.analyzeDesignComplexity({
     figmaFile: 'https://www.figma.com/file/abc123/Dashboard',
     nodeId: '45-67'
   });
   ```

2. **Generate Optimized Code**:
   ```typescript
   const optimizedCode = await aiFoundryClient.generateOptimizedCode({
     figmaFile: 'https://www.figma.com/file/abc123/Dashboard',
     nodeId: '45-67',
     framework: 'react',
     optimizationTarget: 'performance'
   });
   ```

3. **Measure Performance Metrics**:
   ```typescript
   const performanceMetrics = await aiFoundryClient.analyzeCodePerformance({
     code: optimizedCode,
     framework: 'react'
   });
   ```

## Azure AI Foundry Custom Workflows

Azure AI Foundry allows you to create custom workflows for your specific needs:

### Creating a Custom Workflow

1. **Access AI Foundry Studio**:
   - Navigate to your AI Foundry resource in Azure Portal
   - Click "Launch Studio"

2. **Create a New Project**:
   - Click "New Project"
   - Select "Design to Code" as the project type
   - Configure project settings

3. **Define Workflow Steps**:
   - Add "Design Import" step
   - Add "Accessibility Analysis" step
   - Add "Design Token Extraction" step
   - Add "Code Generation" step
   - Add "Performance Optimization" step

4. **Configure Step Parameters**:
   - Set framework preferences
   - Configure accessibility standards
   - Set optimization targets

5. **Deploy the Workflow**:
   - Click "Deploy"
   - Copy the workflow endpoint URL and key

### Using Custom Workflows

```typescript
async function runCustomWorkflow(figmaFile: string, nodeId: string) {
  const result = await fetch('https://your-workflow-endpoint.azurewebsites.net/api/run', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.WORKFLOW_API_KEY
    },
    body: JSON.stringify({
      figmaFile,
      nodeId,
      framework: 'react',
      styling: 'styled-components'
    })
  }).then(res => res.json());
  
  return result;
}
```

## Best Practices for Azure AI Foundry

To get the most out of Azure AI Foundry for Figma-to-code conversion:

### 1. Prepare Designs for Analysis

- Use clear component boundaries
- Apply consistent naming conventions
- Ensure proper contrast ratios
- Use Auto Layout for all components
- Define all styles as variables

### 2. Optimize API Usage

- Cache analysis results for reuse
- Batch related requests together
- Use appropriate service tiers for your needs
- Implement retry logic for API calls

### 🔗 3. Combine with Other Tools

- Use Azure AI Foundry for analysis and optimization
- Use GitHub Copilot for code refinement
- Use Figma MCP Server for design information
- Integrate with your CI/CD pipeline

### 4. Continuous Improvement

- Analyze generated code quality
- Collect metrics on conversion accuracy
- Refine workflows based on results
- Update custom instructions as needed

By leveraging Azure AI Foundry alongside other tools in your Figma-to-code workflow, you can significantly improve the quality, accessibility, and performance of your generated code while reducing development time and effort.
# Framework-Specific Implementation: React

This section provides detailed guidance on implementing Figma designs as React components using GitHub Agent, Copilot, and other AI tools. We'll cover component architecture, styling approaches, state management, and performance optimization specifically for React projects.

## React Component Architecture

When converting Figma designs to React code, organizing your components following Atomic Design principles creates a scalable and maintainable architecture:

```
src/
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.styles.ts
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   └── Typography/
│   ├── molecules/
│   │   ├── FormField/
│   │   ├── Card/
│   │   └── Modal/
│   └── organisms/
│       ├── Header/
│       ├── Sidebar/
│       └── DataTable/
├── pages/
│   ├── Dashboard/
│   ├── Profile/
│   └── Settings/
└── theme/
    ├── tokens.ts
    └── globalStyles.ts
```

This structure allows AI tools to understand component relationships and generate code that fits into your existing architecture.

## Styling Approaches for React

When converting Figma designs to React, you have several styling options. Here's how to implement each with AI assistance:

### 1. Styled Components

Styled Components is an excellent choice for direct Figma-to-code conversion because it allows encapsulated, component-specific styling:

```tsx
// Button.tsx
import styled from 'styled-components';
import { theme } from '../../theme/tokens';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  children: React.ReactNode;
}

const ButtonContainer = styled.button<{
  variant: string;
  size: string;
  disabled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.typography.fontFamily};
  font-weight: ${theme.typography.fontWeightMedium};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  
  /* Size styles */
  padding: ${props => {
    switch (props.size) {
      case 'small': return '8px 16px';
      case 'large': return '16px 32px';
      default: return '12px 24px';
    }
  }};
  font-size: ${props => {
    switch (props.size) {
      case 'small': return theme.typography.fontSize.sm;
      case 'large': return theme.typography.fontSize.lg;
      default: return theme.typography.fontSize.md;
    }
  }};
  
  /* Variant styles */
  background-color: ${props => {
    switch (props.variant) {
      case 'primary': return theme.colors.primary;
      case 'secondary': return theme.colors.secondary;
      case 'outlined': return 'transparent';
      default: return theme.colors.primary;
    }
  }};
  color: ${props => {
    switch (props.variant) {
      case 'primary': return theme.colors.white;
      case 'secondary': return theme.colors.white;
      case 'outlined': return theme.colors.primary;
      default: return theme.colors.white;
    }
  }};
  border: ${props => 
    props.variant === 'outlined' 
      ? `1px solid ${theme.colors.primary}` 
      : 'none'
  };
  
  /* State styles */
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  
  &:hover {
    background-color: ${props => {
      if (props.disabled) return;
      switch (props.variant) {
        case 'primary': return theme.colors.primaryDark;
        case 'secondary': return theme.colors.secondaryDark;
        case 'outlined': return theme.colors.primaryLight;
        default: return theme.colors.primaryDark;
      }
    }};
  }
  
  .icon-left {
    margin-right: 8px;
  }
  
  .icon-right {
    margin-left: 8px;
  }
  
  .spinner {
    margin-right: 8px;
  }
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
  children,
  ...props
}) => {
  return (
    <ButtonContainer 
      variant={variant} 
      size={size} 
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="spinner">⟳</span>}
      {!loading && leftIcon && <span className="icon-left">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="icon-right">{rightIcon}</span>}
    </ButtonContainer>
  );
};
```

**Prompting GitHub Copilot Agent for Styled Components:**
```
/agent Create a Button component using styled-components based on this Figma design:
https://www.figma.com/file/abc123/Design-System?node-id=123-456

The button should:
1. Support primary, secondary, and outlined variants
2. Have small, medium, and large sizes
3. Support disabled and loading states
4. Allow for left and right icons
5. Use our theme tokens from src/theme/tokens.ts
```

### 2. Tailwind CSS

Tailwind CSS is another excellent option for Figma-to-code conversion, especially for rapid development:

```tsx
// Button.tsx
import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
  className,
  children,
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outlined: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50'
  };
  
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };
  
  return (
    <button 
      className={clsx(
        'flex items-center justify-center font-medium rounded transition-all duration-200',
        variantClasses[variant],
        sizeClasses[size],
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="animate-spin mr-2">⟳</span>}
      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};
```

**Prompting GitHub Copilot Agent for Tailwind CSS:**
```
/agent Create a Button component using Tailwind CSS based on this Figma design:
https://www.figma.com/file/abc123/Design-System?node-id=123-456

The button should:
1. Support primary, secondary, and outlined variants
2. Have small, medium, and large sizes
3. Support disabled and loading states
4. Allow for left and right icons
5. Use our Tailwind configuration from tailwind.config.js
```

### 3. CSS Modules

CSS Modules provide a more traditional approach with good encapsulation:

```tsx
// Button.module.css
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family);
  font-weight: 500;
  border-radius: 4px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Sizes */
.small {
  padding: 8px 16px;
  font-size: 14px;
}

.medium {
  padding: 12px 24px;
  font-size: 16px;
}

.large {
  padding: 16px 32px;
  font-size: 18px;
}

/* Variants */
.primary {
  background-color: var(--color-primary);
  color: white;
  border: none;
}

.primary:hover:not(:disabled) {
  background-color: var(--color-primary-dark);
}

.secondary {
  background-color: var(--color-secondary);
  color: white;
  border: none;
}

.secondary:hover:not(:disabled) {
  background-color: var(--color-secondary-dark);
}

.outlined {
  background-color: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

.outlined:hover:not(:disabled) {
  background-color: var(--color-primary-light);
}

/* Icons */
.iconLeft {
  margin-right: 8px;
}

.iconRight {
  margin-left: 8px;
}

.spinner {
  margin-right: 8px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

// Button.tsx
import React from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
  className,
  children,
  ...props
}) => {
  return (
    <button 
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        className
      )}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className={styles.spinner}>⟳</span>}
      {!loading && leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
    </button>
  );
};
```

## React State Management

When implementing complex Figma designs, proper state management is crucial. Here are approaches that work well with AI-assisted code generation:

### Context API for Theme and Global State

```tsx
// ThemeContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { lightTheme, darkTheme, Theme } from '../theme/tokens';

interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;
  
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };
  
  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

**Prompting GitHub Copilot Agent for Context API:**
```
/agent Create a ThemeContext using React Context API that:
1. Provides light and dark theme options
2. Allows toggling between themes
3. Uses our theme tokens from src/theme/tokens.ts
4. Includes a custom hook for easy access
```

### React Query for API State

```tsx
// UserProfile.tsx
import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchUserProfile, updateUserProfile } from '../api/userApi';
import { Spinner, ErrorMessage, ProfileForm } from '../components';

interface UserProfileProps {
  userId: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const queryClient = useQueryClient();
  
  const { data: user, isLoading, error } = useQuery(
    ['user', userId], 
    () => fetchUserProfile(userId)
  );
  
  const updateMutation = useMutation(
    (userData) => updateUserProfile(userId, userData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user', userId]);
      }
    }
  );
  
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return (
    <ProfileForm 
      user={user} 
      onSubmit={updateMutation.mutate}
      isSubmitting={updateMutation.isLoading}
    />
  );
};
```

**Prompting GitHub Copilot Agent for React Query:**
```
/agent Create a UserProfile component that:
1. Fetches user data using React Query
2. Displays a loading state while fetching
3. Shows an error message if the fetch fails
4. Renders a profile form with the user data
5. Handles form submission to update the user profile
6. Uses our existing components from src/components
```

## Advanced React Components

When converting complex Figma designs to React, you'll often need to implement advanced components. Here's an example of a DataTable component that can be generated with AI assistance:

```tsx
// DataTable.tsx
import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/tokens';

interface Column<T> {
  key: string;
  title: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  sortable?: boolean;
  selectable?: boolean;
  pagination?: boolean;
  itemsPerPage?: number;
  onRowSelect?: (selectedRows: T[]) => void;
}

// Styled components for the DataTable
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  font-family: ${theme.typography.fontFamily};
`;

const TableHeader = styled.th<{ sortable?: boolean }>`
  padding: 16px;
  text-align: left;
  font-weight: ${theme.typography.fontWeightBold};
  color: ${theme.colors.text};
  background-color: ${theme.colors.background};
  border-bottom: 2px solid ${theme.colors.border};
  cursor: ${props => props.sortable ? 'pointer' : 'default'};
  
  &:hover {
    ${props => props.sortable && `background-color: ${theme.colors.backgroundHover};`}
  }
`;

const TableRow = styled.tr<{ selected?: boolean }>`
  &:nth-child(even) {
    background-color: ${theme.colors.backgroundAlt};
  }
  
  &:hover {
    background-color: ${theme.colors.backgroundHover};
  }
  
  ${props => props.selected && `
    background-color: ${theme.colors.primaryLight} !important;
  `}
`;

const TableCell = styled.td`
  padding: 16px;
  border-bottom: 1px solid ${theme.colors.border};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding: 8px 0;
`;

const PaginationButton = styled.button<{ disabled?: boolean }>`
  padding: 8px 16px;
  background-color: ${props => props.disabled ? theme.colors.disabled : theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.sm};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  
  &:hover:not(:disabled) {
    background-color: ${theme.colors.primaryDark};
  }
`;

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  sortable = true,
  selectable = false,
  pagination = true,
  itemsPerPage = 10,
  onRowSelect
}: DataTableProps<T>) {
  // State for sorting
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // State for selection
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  
  // Handle column sort
  const handleSort = (column: Column<T>) => {
    if (!sortable || !column.sortable) return;
    
    if (sortColumn === column.key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column.key);
      setSortDirection('asc');
    }
  };
  
  // Handle row selection
  const handleRowSelection = (row: T) => {
    if (!selectable) return;
    
    setSelectedRows(prev => {
      const rowId = row.id;
      if (prev.includes(rowId)) {
        const newSelected = prev.filter(id => id !== rowId);
        onRowSelect?.(data.filter(item => newSelected.includes(item.id)));
        return newSelected;
      } else {
        const newSelected = [...prev, rowId];
        onRowSelect?.(data.filter(item => newSelected.includes(item.id)));
        return newSelected;
      }
    });
  };
  
  // Handle select all
  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
      onRowSelect?.([]);
    } else {
      const allIds = data.map(row => row.id);
      setSelectedRows(allIds);
      onRowSelect?.(data);
    }
  };
  
  // Sort data
  const sortedData = useMemo(() => {
    if (!sortColumn) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortColumn as keyof T];
      const bValue = b[sortColumn as keyof T];
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortColumn, sortDirection]);
  
  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, pagination, currentPage, itemsPerPage]);
  
  // Calculate total pages
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  
  return (
    <div>
      <Table>
        <thead>
          <tr>
            {selectable && (
              <TableHeader>
                <input 
                  type="checkbox" 
                  checked={selectedRows.length === data.length && data.length > 0}
                  indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                  onChange={handleSelectAll}
                />
              </TableHeader>
            )}
            {columns.map(column => (
              <TableHeader 
                key={column.key}
                sortable={sortable && column.sortable}
                onClick={() => handleSort(column)}
              >
                {column.title}
                {sortColumn === column.key && (
                  <span>{sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>
                )}
              </TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map(row => (
            <TableRow 
              key={row.id}
              selected={selectedRows.includes(row.id)}
              onClick={() => handleRowSelection(row)}
            >
              {selectable && (
                <TableCell>
                  <input 
                    type="checkbox" 
                    checked={selectedRows.includes(row.id)}
                    onChange={() => {}} // Controlled component
                  />
                </TableCell>
              )}
              {columns.map(column => (
                <TableCell key={`${row.id}-${column.key}`}>
                  {column.render 
                    ? column.render(row) 
                    : row[column.key as keyof T]
                  }
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>
      
      {pagination && totalPages > 1 && (
        <Pagination>
          <PaginationButton 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            Previous
          </PaginationButton>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <PaginationButton 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          >
            Next
          </PaginationButton>
        </Pagination>
      )}
    </div>
  );
}
```

**Prompting GitHub Copilot Agent for Advanced Components:**
```
/agent Create a DataTable component based on this Figma design:
https://www.figma.com/file/abc123/Design-System?node-id=789-012

The DataTable should:
1. Support sorting by column
2. Allow row selection with checkboxes
3. Include pagination with configurable items per page
4. Support custom cell rendering
5. Be fully typed with TypeScript
6. Use styled-components with our theme
7. Be optimized for performance with useMemo
```

## Performance Optimization in React

When converting complex Figma designs to React, performance optimization is crucial. Here are techniques that can be implemented with AI assistance:

### 1. Memoization with React.memo

```tsx
// UserAvatar.tsx
import React from 'react';

interface UserAvatarProps {
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  size?: 'small' | 'medium' | 'large';
}

const getSizeInPixels = (size: string): number => {
  switch (size) {
    case 'small': return 32;
    case 'large': return 64;
    default: return 48;
  }
};

export const UserAvatar: React.FC<UserAvatarProps> = React.memo(({ 
  user, 
  size = 'medium' 
}) => {
  const sizeInPixels = getSizeInPixels(size);
  
  return (
    <img 
      src={user.avatar} 
      alt={`${user.name}'s avatar`}
      style={{
        width: sizeInPixels,
        height: sizeInPixels,
        borderRadius: '50%',
        objectFit: 'cover'
      }}
    />
  );
});
```

### 2. useCallback for Event Handlers

```tsx
// SearchForm.tsx
import React, { useState, useCallback } from 'react';

interface SearchFormProps {
  onSearch: (query: string) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  }, [query, onSearch]);
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={query} 
        onChange={handleChange} 
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  );
};
```

### 3. useMemo for Expensive Calculations

```tsx
// FilteredList.tsx
import React, { useMemo } from 'react';

interface Item {
  id: string;
  name: string;
  category: string;
  price: number;
}

interface FilteredListProps {
  items: Item[];
  category: string;
  minPrice: number;
  maxPrice: number;
}

export const FilteredList: React.FC<FilteredListProps> = ({
  items,
  category,
  minPrice,
  maxPrice
}) => {
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = category === 'all' || item.category === category;
      const matchesPrice = item.price >= minPrice && item.price <= maxPrice;
      return matchesCategory && matchesPrice;
    });
  }, [items, category, minPrice, maxPrice]);
  
  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>
          {item.name} - ${item.price}
        </li>
      ))}
    </ul>
  );
};
```

### 4. Virtualization for Large Lists

```tsx
// VirtualizedList.tsx
import React from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

interface Item {
  id: string;
  name: string;
}

interface VirtualizedListProps {
  items: Item[];
  onItemClick: (item: Item) => void;
}

export const VirtualizedList: React.FC<VirtualizedListProps> = ({
  items,
  onItemClick
}) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const item = items[index];
    return (
      <div 
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          borderBottom: '1px solid #eee',
          cursor: 'pointer'
        }}
        onClick={() => onItemClick(item)}
      >
        {item.name}
      </div>
    );
  };
  
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            height={height}
            width={width}
            itemCount={items.length}
            itemSize={50}
          >
            {Row}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
};
```

**Prompting GitHub Copilot Agent for Performance Optimization:**
```
/agent Optimize this React component for performance:

[paste your component code here]

Please:
1. Add memoization with React.memo where appropriate
2. Use useCallback for event handlers
3. Implement useMemo for expensive calculations
4. Add virtualization if it's a list component
5. Explain the optimizations you've made
```

By leveraging these React-specific implementation techniques with GitHub Copilot Agent and other AI tools, you can efficiently convert Figma designs into high-quality, performant React components that maintain fidelity to the original design while following best practices for React development.
# 🅰️ Framework-Specific Implementation: Angular

This section provides detailed guidance on implementing Figma designs as Angular components using GitHub Agent, Copilot, and other AI tools. We'll cover component architecture, styling approaches, state management, and performance optimization specifically for Angular projects.

## Angular Component Architecture

When converting Figma designs to Angular code, organizing your components using a modular architecture creates a scalable and maintainable codebase:

```
src/
├── app/
│   ├── core/
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   └── api.service.ts
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   └── interceptors/
│   │       └── http-error.interceptor.ts
│   ├── shared/
│   │   ├── components/
│   │   │   ├── button/
│   │   │   │   ├── button.component.ts
│   │   │   │   ├── button.component.html
│   │   │   │   ├── button.component.scss
│   │   │   │   └── button.component.spec.ts
│   │   │   ├── input/
│   │   │   └── card/
│   │   ├── directives/
│   │   ├── pipes/
│   │   └── models/
│   ├── features/
│   │   ├── dashboard/
│   │   ├── profile/
│   │   └── settings/
│   └── theme/
│       ├── _variables.scss
│       └── _mixins.scss
```

This structure allows AI tools to understand component relationships and generate code that fits into your existing architecture.

## Angular Component Implementation

When implementing Figma designs in Angular, you'll typically create components with separate template, style, and logic files. Here's how to implement components with AI assistance:

### Basic Component Implementation

#### Button Component

```typescript
// button.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'outlined' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() leftIcon?: string;
  @Input() rightIcon?: string;
  
  @Output() clicked = new EventEmitter<void>();
  
  handleClick(): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }
}
```

```html
<!-- button.component.html -->
<button 
  [ngClass]="[
    'app-button', 
    'app-button--' + variant,
    'app-button--' + size,
    disabled ? 'app-button--disabled' : '',
    loading ? 'app-button--loading' : ''
  ]"
  [disabled]="disabled || loading"
  (click)="handleClick()"
>
  <mat-icon *ngIf="leftIcon && !loading" class="app-button__icon-left">{{leftIcon}}</mat-icon>
  <mat-spinner *ngIf="loading" diameter="20"></mat-spinner>
  <span class="app-button__content">
    <ng-content></ng-content>
  </span>
  <mat-icon *ngIf="rightIcon && !loading" class="app-button__icon-right">{{rightIcon}}</mat-icon>
</button>
```

```scss
// button.component.scss
@import '../../theme/variables';

:host {
  display: inline-block;
}

.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family);
  font-weight: 500;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &__content {
    margin: 0 0.5rem;
  }
  
  &__icon-left {
    margin-right: 0.5rem;
  }
  
  &__icon-right {
    margin-left: 0.5rem;
  }
  
  // Variants
  &--primary {
    background-color: var(--color-primary);
    color: var(--color-white);
    
    &:hover:not(:disabled) {
      background-color: var(--color-primary-dark);
    }
  }
  
  &--secondary {
    background-color: var(--color-secondary);
    color: var(--color-white);
    
    &:hover:not(:disabled) {
      background-color: var(--color-secondary-dark);
    }
  }
  
  &--outlined {
    background-color: transparent;
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    
    &:hover:not(:disabled) {
      background-color: var(--color-primary-light);
    }
  }
  
  // Sizes
  &--small {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
  
  &--medium {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
  
  &--large {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }
  
  // States
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &--loading {
    cursor: wait;
  }
}
```

**Prompting GitHub Copilot Agent for Angular Components:**
```
/agent Create an Angular Button component based on this Figma design:
https://www.figma.com/file/abc123/Design-System?node-id=123-456

The button should:
1. Support primary, secondary, and outlined variants
2. Have small, medium, and large sizes
3. Support disabled and loading states
4. Allow for left and right icons using Material icons
5. Use SCSS with BEM methodology
6. Follow Angular best practices with separate template, style, and logic files
```

### Advanced Component Implementation

#### Data Table Component

```typescript
// data-table.component.ts
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

export interface Column {
  key: string;
  title: string;
  sortable?: boolean;
}

export interface SortEvent {
  column: string;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() columns: Column[] = [];
  @Input() sortable = true;
  @Input() selectable = false;
  @Input() pagination = true;
  @Input() itemsPerPage = 10;
  
  @Output() rowSelected = new EventEmitter<any[]>();
  @Output() sortChanged = new EventEmitter<SortEvent>();
  @Output() pageChanged = new EventEmitter<number>();
  
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedRows: any[] = [];
  currentPage = 1;
  totalPages = 1;
  displayData: any[] = [];
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['itemsPerPage']) {
      this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
      this.updateDisplayData();
    }
  }
  
  updateDisplayData(): void {
    // Apply sorting
    let processedData = [...this.data];
    if (this.sortColumn) {
      processedData.sort((a, b) => {
        const aValue = a[this.sortColumn as string];
        const bValue = b[this.sortColumn as string];
        
        if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    // Apply pagination
    if (this.pagination) {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.displayData = processedData.slice(startIndex, startIndex + this.itemsPerPage);
    } else {
      this.displayData = processedData;
    }
  }
  
  onSort(column: Column): void {
    if (!this.sortable || !column.sortable) return;
    
    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }
    
    this.updateDisplayData();
    this.sortChanged.emit({
      column: this.sortColumn,
      direction: this.sortDirection
    });
  }
  
  onSelectRow(row: any): void {
    if (!this.selectable) return;
    
    const index = this.selectedRows.findIndex(r => r.id === row.id);
    if (index > -1) {
      this.selectedRows.splice(index, 1);
    } else {
      this.selectedRows.push(row);
    }
    
    this.rowSelected.emit([...this.selectedRows]);
  }
  
  isSelected(row: any): boolean {
    return this.selectedRows.some(r => r.id === row.id);
  }
  
  onSelectAll(): void {
    if (this.selectedRows.length === this.displayData.length) {
      this.selectedRows = [];
    } else {
      this.selectedRows = [...this.displayData];
    }
    
    this.rowSelected.emit([...this.selectedRows]);
  }
  
  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateDisplayData();
    this.pageChanged.emit(page);
  }
  
  get allSelected(): boolean {
    return this.displayData.length > 0 && this.selectedRows.length === this.displayData.length;
  }
  
  get indeterminate(): boolean {
    return this.selectedRows.length > 0 && this.selectedRows.length < this.displayData.length;
  }
}
```

```html
<!-- data-table.component.html -->
<div class="data-table">
  <table class="data-table__table">
    <thead>
      <tr>
        <th *ngIf="selectable" class="data-table__header data-table__header--checkbox">
          <mat-checkbox
            [checked]="allSelected"
            [indeterminate]="indeterminate"
            (change)="onSelectAll()"
          ></mat-checkbox>
        </th>
        <th 
          *ngFor="let column of columns" 
          class="data-table__header"
          [class.data-table__header--sortable]="sortable && column.sortable"
          (click)="onSort(column)"
        >
          {{ column.title }}
          <span *ngIf="sortColumn === column.key" class="data-table__sort-icon">
            {{ sortDirection === 'asc' ? '↑' : '↓' }}
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr 
        *ngFor="let row of displayData" 
        class="data-table__row"
        [class.data-table__row--selected]="isSelected(row)"
        (click)="onSelectRow(row)"
      >
        <td *ngIf="selectable" class="data-table__cell data-table__cell--checkbox">
          <mat-checkbox
            [checked]="isSelected(row)"
            (click)="$event.stopPropagation()"
            (change)="onSelectRow(row)"
          ></mat-checkbox>
        </td>
        <td *ngFor="let column of columns" class="data-table__cell">
          {{ row[column.key] }}
        </td>
      </tr>
    </tbody>
  </table>
  
  <div *ngIf="pagination && totalPages > 1" class="data-table__pagination">
    <button 
      class="data-table__pagination-button"
      [disabled]="currentPage === 1"
      (click)="onPageChange(currentPage - 1)"
    >
      Previous
    </button>
    <span class="data-table__pagination-info">
      Page {{ currentPage }} of {{ totalPages }}
    </span>
    <button 
      class="data-table__pagination-button"
      [disabled]="currentPage === totalPages"
      (click)="onPageChange(currentPage + 1)"
    >
      Next
    </button>
  </div>
</div>
```

```scss
// data-table.component.scss
@import '../../theme/variables';

.data-table {
  width: 100%;
  
  &__table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    font-family: var(--font-family);
  }
  
  &__header {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: var(--color-text);
    background-color: var(--color-background);
    border-bottom: 2px solid var(--color-border);
    
    &--sortable {
      cursor: pointer;
      
      &:hover {
        background-color: var(--color-background-hover);
      }
    }
    
    &--checkbox {
      width: 48px;
    }
  }
  
  &__row {
    &:nth-child(even) {
      background-color: var(--color-background-alt);
    }
    
    &:hover {
      background-color: var(--color-background-hover);
    }
    
    &--selected {
      background-color: var(--color-primary-light) !important;
    }
  }
  
  &__cell {
    padding: 1rem;
    border-bottom: 1px solid var(--color-border);
    
    &--checkbox {
      width: 48px;
    }
  }
  
  &__sort-icon {
    margin-left: 0.5rem;
  }
  
  &__pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    padding: 0.5rem 0;
  }
  
  &__pagination-button {
    padding: 0.5rem 1rem;
    background-color: var(--color-primary);
    color: var(--color-white);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover:not(:disabled) {
      background-color: var(--color-primary-dark);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  &__pagination-info {
    font-size: 0.875rem;
  }
}
```

**Prompting GitHub Copilot Agent for Advanced Angular Components:**
```
/agent Create an Angular DataTable component based on this Figma design:
https://www.figma.com/file/abc123/Design-System?node-id=789-012

The DataTable should:
1. Support sorting by column
2. Allow row selection with checkboxes
3. Include pagination with configurable items per page
4. Support dynamic columns configuration
5. Emit events for selection, sorting, and pagination changes
6. Use Angular Material for checkboxes
7. Follow Angular best practices with separate template, style, and logic files
```

## Angular Styling Approaches

When converting Figma designs to Angular, you have several styling options. Here's how to implement each with AI assistance:

### 1. Component-Scoped SCSS

Angular's default approach uses component-scoped SCSS files:

```scss
// button.component.scss
:host {
  display: inline-block;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family);
  font-weight: 500;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  // Variants, sizes, and states...
}
```

### 2. Angular Material Theming

For projects using Angular Material, you can leverage its theming system:

```scss
// theme.scss
@use '@angular/material' as mat;

// Define your custom typography
$custom-typography: mat.define-typography-config(
  $font-family: 'Roboto, sans-serif',
  $headline-1: mat.define-typography-level(96px, 96px, 300),
  $headline-2: mat.define-typography-level(60px, 60px, 300),
  // ... other levels
);

// Define your custom palette
$primary-palette: (
  50: #e3f2fd,
  100: #bbdefb,
  // ... other shades
  500: #2196f3, // Primary color
  // ... other shades
  contrast: (
    50: rgba(black, 0.87),
    // ... other contrasts
    500: white,
    // ... other contrasts
  )
);

// Create the palettes
$app-primary: mat.define-palette($primary-palette);
$app-accent: mat.define-palette(mat.$pink-palette, A200, A100, A400);
$app-warn: mat.define-palette(mat.$red-palette);

// Create the theme
$app-theme: mat.define-light-theme((
  color: (
    primary: $app-primary,
    accent: $app-accent,
    warn: $app-warn,
  ),
  typography: $custom-typography,
  density: 0,
));

// Apply the theme
@include mat.all-component-themes($app-theme);
```

### 3. CSS Variables for Design Tokens

For design tokens extracted from Figma, CSS variables provide a flexible approach:

```scss
// variables.scss
:root {
  // Colors
  --color-primary: #2196f3;
  --color-primary-light: #bbdefb;
  --color-primary-dark: #1976d2;
  --color-secondary: #ff4081;
  --color-secondary-light: #ff80ab;
  --color-secondary-dark: #c51162;
  --color-text: #212121;
  --color-text-secondary: #757575;
  --color-background: #ffffff;
  --color-background-alt: #f5f5f5;
  --color-background-hover: #eeeeee;
  --color-border: #e0e0e0;
  --color-white: #ffffff;
  --color-black: #000000;
  
  // Typography
  --font-family: 'Roboto, sans-serif';
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  
  // Spacing
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  // Border radius
  --border-radius-sm: 2px;
  --border-radius-md: 4px;
  --border-radius-lg: 8px;
  --border-radius-full: 9999px;
  
  // Shadows
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  --shadow-md: 0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10);
  
  // Transitions
  --transition-fast: 0.15s ease;
  --transition-normal: 0.25s ease;
  --transition-slow: 0.35s ease;
}

// Dark theme
.dark-theme {
  --color-primary: #90caf9;
  --color-primary-light: #e3f2fd;
  --color-primary-dark: #42a5f5;
  // ... other dark theme variables
}
```

## Angular State Management

When implementing complex Figma designs, proper state management is crucial. Here are approaches that work well with AI-assisted code generation:

### 1. Services for Component Communication

```typescript
// theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<Theme>('light');
  
  get theme$(): Observable<Theme> {
    return this.themeSubject.asObservable();
  }
  
  get currentTheme(): Theme {
    return this.themeSubject.getValue();
  }
  
  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    document.body.classList.toggle('dark-theme', theme === 'dark');
  }
  
  toggleTheme(): void {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}
```

**Prompting GitHub Copilot Agent for Angular Services:**
```
/agent Create an Angular ThemeService that:
1. Manages light and dark theme states
2. Provides an Observable for theme changes
3. Includes methods to set and toggle themes
4. Applies theme classes to the document body
5. Follows Angular best practices for services
```

### 2. NgRx for Complex State Management

```typescript
// theme.actions.ts
import { createAction } from '@ngrx/store';

export const setLightTheme = createAction('[Theme] Set Light Theme');
export const setDarkTheme = createAction('[Theme] Set Dark Theme');
export const toggleTheme = createAction('[Theme] Toggle Theme');

// theme.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as ThemeActions from './theme.actions';

export interface ThemeState {
  theme: 'light' | 'dark';
}

export const initialState: ThemeState = {
  theme: 'light'
};

export const themeReducer = createReducer(
  initialState,
  on(ThemeActions.setLightTheme, state => ({ ...state, theme: 'light' })),
  on(ThemeActions.setDarkTheme, state => ({ ...state, theme: 'dark' })),
  on(ThemeActions.toggleTheme, state => ({
    ...state,
    theme: state.theme === 'light' ? 'dark' : 'light'
  }))
);

// theme.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as ThemeActions from './theme.actions';

@Injectable()
export class ThemeEffects {
  updateBodyClass$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ThemeActions.setLightTheme, ThemeActions.setDarkTheme, ThemeActions.toggleTheme),
      tap(() => {
        // Get the current state from the store
        const theme = this.store.select(state => state.theme.theme);
        
        // Update the body class
        theme.subscribe(currentTheme => {
          document.body.classList.toggle('dark-theme', currentTheme === 'dark');
        });
      })
    ),
    { dispatch: false }
  );
  
  constructor(
    private actions$: Actions,
    private store: Store<{ theme: ThemeState }>
  ) {}
}
```

**Prompting GitHub Copilot Agent for NgRx Implementation:**
```
/agent Create an NgRx implementation for theme management that:
1. Includes actions for setting light theme, dark theme, and toggling
2. Implements a reducer to handle theme state
3. Creates effects to apply theme classes to the document body
4. Follows NgRx best practices
```

## Performance Optimization in Angular

When converting complex Figma designs to Angular, performance optimization is crucial. Here are techniques that can be implemented with AI assistance:

### 1. OnPush Change Detection

```typescript
// user-avatar.component.ts
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

interface User {
  id: string;
  name: string;
  avatar: string;
}

@Component({
  selector: 'app-user-avatar',
  template: `
    <img 
      [src]="user.avatar" 
      [alt]="user.name + '\'s avatar'" 
      [style.width.px]="sizeInPixels"
      [style.height.px]="sizeInPixels"
      class="avatar"
    >
  `,
  styles: [`
    .avatar {
      border-radius: 50%;
      object-fit: cover;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAvatarComponent {
  @Input() user!: User;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  
  get sizeInPixels(): number {
    switch (this.size) {
      case 'small': return 32;
      case 'large': return 64;
      default: return 48;
    }
  }
}
```

### 2. Trackby Function for ngFor

```typescript
// user-list.component.ts
import { Component, Input } from '@angular/core';

interface User {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-list',
  template: `
    <div class="user-list">
      <div 
        *ngFor="let user of users; trackBy: trackByUserId" 
        class="user-item"
      >
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Input() users: User[] = [];
  
  trackByUserId(index: number, user: User): string {
    return user.id;
  }
}
```

### 3. Lazy Loading Modules

```typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### 4. Virtual Scrolling

```typescript
// virtual-scroll-list.component.ts
import { Component, Input } from '@angular/core';

interface ListItem {
  id: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-virtual-scroll-list',
  template: `
    <cdk-virtual-scroll-viewport 
      class="viewport" 
      [itemSize]="72"
      [minBufferPx]="288"
      [maxBufferPx]="576"
    >
      <div 
        *cdkVirtualFor="let item of items; trackBy: trackById" 
        class="item"
      >
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </cdk-virtual-scroll-viewport>
  `,
  styles: [`
    .viewport {
      height: 400px;
      width: 100%;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
    }
    
    .item {
      height: 72px;
      padding: 16px;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .item:last-child {
      border-bottom: none;
    }
  `]
})
export class VirtualScrollListComponent {
  @Input() items: ListItem[] = [];
  
  trackById(index: number, item: ListItem): string {
    return item.id;
  }
}
```

**Prompting GitHub Copilot Agent for Angular Performance Optimization:**
```
/agent Optimize this Angular component for performance:

[paste your component code here]

Please:
1. Implement OnPush change detection
2. Add trackBy functions for any ngFor directives
3. Optimize template expressions
4. Add virtual scrolling if it's a list component
5. Explain the optimizations you've made
```

By leveraging these Angular-specific implementation techniques with GitHub Copilot Agent and other AI tools, you can efficiently convert Figma designs into high-quality, performant Angular components that maintain fidelity to the original design while following best practices for Angular development.
# Component Library Implementation

This section explores how to implement a comprehensive component library from Figma designs using GitHub Agent, Copilot, and other AI tools. A well-structured component library ensures consistency, reusability, and maintainability across your application.

## Planning Your Component Library

Before diving into implementation, it's essential to plan your component library structure based on your Figma design system:

### Component Hierarchy

Organize your components following the Atomic Design methodology:

1. **Atoms**: Basic building blocks (buttons, inputs, icons, typography)
2. **Molecules**: Simple combinations of atoms (form fields, cards, alerts)
3. **Organisms**: Complex UI sections (headers, footers, navigation)
4. **Templates**: Page layouts without specific content
5. **Pages**: Specific implementations of templates

### Directory Structure

For a well-organized component library:

```
src/
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Typography/
│   │   └── Icon/
│   ├── molecules/
│   │   ├── FormField/
│   │   ├── Card/
│   │   └── Alert/
│   └── organisms/
│       ├── Header/
│       ├── Footer/
│       └── Navigation/
├── theme/
│   ├── tokens.ts
│   ├── global.css
│   └── mixins.ts
└── utils/
    ├── types.ts
    └── helpers.ts
```

## Extracting Design Tokens from Figma

Design tokens are the foundation of your component library. Here's how to extract and implement them:

### Using GitHub Copilot Agent with Figma MCP

```
/agent Extract all design tokens from this Figma file:
https://www.figma.com/file/abc123/Design-System

Create a comprehensive tokens.ts file with:
1. Colors (primary, secondary, neutrals, semantics)
2. Typography (font families, sizes, weights, line heights)
3. Spacing values
4. Border radii
5. Shadows
6. Transitions
7. Breakpoints

Format it as a TypeScript file with proper typing.
```

### Example Design Tokens Implementation

```typescript
// tokens.ts
export const colors = {
  // Primary colors
  primary: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3', // Base primary
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
  },
  
  // Secondary colors
  secondary: {
    50: '#fce4ec',
    100: '#f8bbd0',
    200: '#f48fb1',
    300: '#f06292',
    400: '#ec407a',
    500: '#e91e63', // Base secondary
    600: '#d81b60',
    700: '#c2185b',
    800: '#ad1457',
    900: '#880e4f',
  },
  
  // Neutral colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  
  // Semantic colors
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#2196f3',
  
  // Base colors
  white: '#ffffff',
  black: '#000000',
};

export const typography = {
  fontFamily: {
    primary: "'Roboto', sans-serif",
    secondary: "'Playfair Display', serif",
    mono: "'Roboto Mono', monospace",
  },
  
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    md: '1rem',       // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
  },
  
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

export const spacing = {
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem',  // 40px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
  20: '5rem',    // 80px
  24: '6rem',    // 96px
  32: '8rem',    // 128px
  40: '10rem',   // 160px
  48: '12rem',   // 192px
  56: '14rem',   // 224px
  64: '16rem',   // 256px
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem',  // 2px
  md: '0.25rem',   // 4px
  lg: '0.5rem',    // 8px
  xl: '0.75rem',   // 12px
  '2xl': '1rem',   // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px',
};

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};

export const transitions = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  timing: {
    ease: 'ease',
    linear: 'linear',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};

export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Combined theme object
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  breakpoints,
};

export type Theme = typeof theme;
```

## Implementing Base Components

With design tokens in place, you can now implement base components:

### Button Component Implementation

```typescript
// Button.tsx (React)
import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../theme/tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${theme.colors.primary[500]};
        color: ${theme.colors.white};
        border: none;
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary[600]};
        }
        
        &:active:not(:disabled) {
          background-color: ${theme.colors.primary[700]};
        }
      `;
    case 'secondary':
      return css`
        background-color: ${theme.colors.secondary[500]};
        color: ${theme.colors.white};
        border: none;
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.secondary[600]};
        }
        
        &:active:not(:disabled) {
          background-color: ${theme.colors.secondary[700]};
        }
      `;
    case 'outlined':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary[500]};
        border: 1px solid ${theme.colors.primary[500]};
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary[50]};
        }
        
        &:active:not(:disabled) {
          background-color: ${theme.colors.primary[100]};
        }
      `;
    case 'text':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary[500]};
        border: none;
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary[50]};
        }
        
        &:active:not(:disabled) {
          background-color: ${theme.colors.primary[100]};
        }
      `;
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        padding: ${theme.spacing[2]} ${theme.spacing[3]};
        font-size: ${theme.typography.fontSize.sm};
      `;
    case 'large':
      return css`
        padding: ${theme.spacing[4]} ${theme.spacing[6]};
        font-size: ${theme.typography.fontSize.lg};
      `;
    default:
      return css`
        padding: ${theme.spacing[3]} ${theme.spacing[4]};
        font-size: ${theme.typography.fontSize.md};
      `;
  }
};

const ButtonContainer = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.medium};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all ${theme.transitions.duration.fast} ${theme.transitions.timing.easeInOut};
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  ${props => getVariantStyles(props.$variant)}
  ${props => getSizeStyles(props.$size)}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .icon-left {
    margin-right: ${theme.spacing[2]};
  }
  
  .icon-right {
    margin-left: ${theme.spacing[2]};
  }
  
  .spinner {
    animation: spin 1s linear infinite;
    margin-right: ${theme.spacing[2]};
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onClick,
  children,
  className,
  ...props
}) => {
  return (
    <ButtonContainer
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      className={className}
      {...props}
    >
      {loading && <span className="spinner">⟳</span>}
      {!loading && leftIcon && <span className="icon-left">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="icon-right">{rightIcon}</span>}
    </ButtonContainer>
  );
};
```

## Creating Component Documentation

Documentation is crucial for a component library. Here's how to generate it with AI assistance:

### Using GitHub Copilot Agent for Documentation

```
/agent Create comprehensive documentation for our Button component including:
1. Component description and purpose
2. Props API table with types and descriptions
3. Usage examples for all variants and sizes
4. Accessibility considerations
5. Design guidelines
```

### Example Component Documentation

```markdown
# Button Component

The Button component is a versatile interactive element used for triggering actions throughout the application. It supports multiple variants, sizes, and states to accommodate different UI needs.

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outlined' \| 'text'` | `'primary'` | Visual style of the button |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the button |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `loading` | `boolean` | `false` | Whether to show a loading spinner |
| `fullWidth` | `boolean` | `false` | Whether the button should take full width |
| `leftIcon` | `React.ReactNode` | - | Icon to display before the button text |
| `rightIcon` | `React.ReactNode` | - | Icon to display after the button text |
| `onClick` | `() => void` | - | Function called when button is clicked |
| `children` | `React.ReactNode` | - | Button content |
| `className` | `string` | - | Additional CSS class |

## Usage Examples

### Basic Button

```jsx
<Button onClick={() => alert('Clicked!')}>Click Me</Button>
```

### Button Variants

```jsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="text">Text</Button>
```

### Button Sizes

```jsx
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>
```

### Button States

```jsx
<Button disabled>Disabled</Button>
<Button loading>Loading</Button>
```

### With Icons

```jsx
<Button leftIcon={<Icon name="arrow-left" />}>Back</Button>
<Button rightIcon={<Icon name="arrow-right" />}>Next</Button>
```

## Accessibility

- The Button component uses the native `<button>` element, ensuring keyboard accessibility
- Disabled state is properly conveyed to assistive technology
- Loading state includes a visual indicator and prevents multiple clicks
- Color contrast meets WCAG AA standards for all variants
- Focus states are clearly visible

## Design Guidelines

- Use Primary buttons for main actions
- Use Secondary buttons for alternative actions
- Use Outlined buttons for less prominent actions
- Use Text buttons for the least prominent actions
- Limit the number of primary buttons on a page to avoid confusion
- Maintain consistent button usage patterns throughout the application
- Button text should be concise and action-oriented (e.g., "Save" instead of "Save Data")
```

## Building a Storybook for Your Component Library

Storybook provides an interactive environment to develop and test your components:

### Setting Up Storybook

```bash
# Install Storybook
npx storybook init

# Start Storybook
npm run storybook
```

### Creating Stories with GitHub Copilot Agent

```
/agent Create a comprehensive Storybook story for our Button component including:
1. Default story
2. Stories for all variants
3. Stories for all sizes
4. Interactive controls for all props
5. Documentation from our existing markdown
```

### Example Button.stories.tsx

```typescript
// Button.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonProps } from './Button';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof Button> = {
  title: 'Components/Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
          The Button component is a versatile interactive element used for triggering actions 
          throughout the application. It supports multiple variants, sizes, and states to 
          accommodate different UI needs.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outlined', 'text'],
      description: 'Visual style of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show a loading spinner',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take full width',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    leftIcon: {
      control: 'select',
      options: [undefined, 'arrow-left', 'check', 'close'],
      mapping: {
        undefined: undefined,
        'arrow-left': <Icon name="arrow-left" />,
        'check': <Icon name="check" />,
        'close': <Icon name="close" />,
      },
      description: 'Icon to display before the button text',
    },
    rightIcon: {
      control: 'select',
      options: [undefined, 'arrow-right', 'check', 'close'],
      mapping: {
        undefined: undefined,
        'arrow-right': <Icon name="arrow-right" />,
        'check': <Icon name="check" />,
        'close': <Icon name="close" />,
      },
      description: 'Icon to display after the button text',
    },
    onClick: { action: 'clicked' },
    children: {
      control: 'text',
      description: 'Button content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Outlined Button',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    children: 'Text Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading Button',
  },
};

export const WithLeftIcon: Story = {
  args: {
    leftIcon: <Icon name="arrow-left" />,
    children: 'Back',
  },
};

export const WithRightIcon: Story = {
  args: {
    rightIcon: <Icon name="arrow-right" />,
    children: 'Next',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
};
```

## Testing Your Component Library

Comprehensive testing ensures your components work as expected:

### Setting Up Testing with Jest and React Testing Library

```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### Creating Tests with GitHub Copilot Agent

```
/agent Create comprehensive tests for our Button component including:
1. Rendering tests for all variants and sizes
2. Interaction tests for click events
3. Disabled state tests
4. Loading state tests
5. Icon rendering tests
```

### Example Button.test.tsx

```typescript
// Button.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';

describe('Button Component', () => {
  // Rendering tests
  test('renders button with children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });
  
  test('renders primary variant by default', () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole('button');
    // Check for primary styling (this will depend on your implementation)
    expect(button).toHaveStyle('background-color: rgb(33, 150, 243)'); // Primary color
  });
  
  test('renders secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('background-color: rgb(233, 30, 99)'); // Secondary color
  });
  
  test('renders outlined variant', () => {
    render(<Button variant="outlined">Outlined</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('background-color: transparent');
    expect(button).toHaveStyle('border: 1px solid');
  });
  
  test('renders text variant', () => {
    render(<Button variant="text">Text</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('background-color: transparent');
    expect(button).toHaveStyle('border: none');
  });
  
  test('renders small size', () => {
    render(<Button size="small">Small</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('font-size: 0.875rem');
  });
  
  test('renders medium size by default', () => {
    render(<Button>Medium</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('font-size: 1rem');
  });
  
  test('renders large size', () => {
    render(<Button size="large">Large</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('font-size: 1.125rem');
  });
  
  // Interaction tests
  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  // Disabled state tests
  test('has disabled attribute when disabled', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
  
  test('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
  
  // Loading state tests
  test('shows loading spinner when loading', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByText('⟳')).toBeInTheDocument(); // Assuming spinner is represented by this character
  });
  
  test('is disabled when loading', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
  
  // Icon tests
  test('renders left icon', () => {
    render(<Button leftIcon={<span data-testid="left-icon" />}>With Left Icon</Button>);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });
  
  test('renders right icon', () => {
    render(<Button rightIcon={<span data-testid="right-icon" />}>With Right Icon</Button>);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });
  
  test('does not render icons when loading', () => {
    render(
      <Button 
        loading 
        leftIcon={<span data-testid="left-icon" />}
        rightIcon={<span data-testid="right-icon" />}
      >
        Loading
      </Button>
    );
    expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument();
  });
  
  // Full width test
  test('takes full width when fullWidth is true', () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole('button')).toHaveStyle('width: 100%');
  });
});
```

## Publishing Your Component Library

Once your component library is ready, you can publish it for use in other projects:

### Preparing for Publication

1. **Create a Package.json**:
   ```json
   {
     "name": "your-component-library",
     "version": "1.0.0",
     "description": "A component library built from Figma designs",
     "main": "dist/index.js",
     "module": "dist/index.esm.js",
     "types": "dist/index.d.ts",
     "files": [
       "dist"
     ],
     "scripts": {
       "build": "rollup -c",
       "test": "jest",
       "storybook": "start-storybook -p 6006",
       "build-storybook": "build-storybook"
     },
     "peerDependencies": {
       "react": "^17.0.0 || ^18.0.0",
       "react-dom": "^17.0.0 || ^18.0.0"
     }
   }
   ```

2. **Configure Rollup for Building**:
   ```javascript
   // rollup.config.js
   import typescript from 'rollup-plugin-typescript2';
   import commonjs from '@rollup/plugin-commonjs';
   import resolve from '@rollup/plugin-node-resolve';
   import peerDepsExternal from 'rollup-plugin-peer-deps-external';
   import { terser } from 'rollup-plugin-terser';
   
   export default {
     input: 'src/index.ts',
     output: [
       {
         file: 'dist/index.js',
         format: 'cjs',
         sourcemap: true,
       },
       {
         file: 'dist/index.esm.js',
         format: 'esm',
         sourcemap: true,
       },
     ],
     plugins: [
       peerDepsExternal(),
       resolve(),
       commonjs(),
       typescript({
         tsconfig: './tsconfig.json',
         useTsconfigDeclarationDir: true,
       }),
       terser(),
     ],
   };
   ```

3. **Create an Index File**:
   ```typescript
   // src/index.ts
   // Export all components
   export * from './components/atoms/Button/Button';
   export * from './components/atoms/Input/Input';
   // ... other components
   
   // Export theme
   export * from './theme/tokens';
   ```

### Publishing to npm

```bash
# Build the library
npm run build

# Publish to npm
npm publish
```

## Best Practices for Component Libraries

To ensure your component library is maintainable and user-friendly:

1. **Consistent API Design**:
   - Use similar prop patterns across components
   - Follow naming conventions consistently
   - Document all props thoroughly

2. **Accessibility First**:
   - Ensure all components meet WCAG AA standards
   - Include keyboard navigation support
   - Test with screen readers

3. **Performance Optimization**:
   - Keep bundle size small
   - Implement code splitting where appropriate
   - Optimize render performance

4. **Versioning Strategy**:
   - Follow semantic versioning (MAJOR.MINOR.PATCH)
   - Document breaking changes clearly
   - Provide migration guides for major versions

5. **Comprehensive Testing**:
   - Unit tests for all components
   - Visual regression tests
   - Accessibility tests
   - Performance tests

By following these guidelines and leveraging AI tools like GitHub Copilot Agent, you can efficiently create a comprehensive component library from your Figma designs that ensures consistency, accessibility, and maintainability across your applications.
# Ensuring Accessibility and Responsiveness

Creating accessible and responsive implementations from Figma designs is essential for modern web applications. This section explores how to leverage GitHub Agent, Copilot, and other AI tools to ensure your code meets accessibility standards and works seamlessly across all devices.

## Accessibility Implementation

### Understanding Accessibility Requirements

When converting Figma designs to code, ensure your implementation meets these key accessibility standards:

1. **WCAG Compliance**: Web Content Accessibility Guidelines (WCAG) 2.1 AA is the recommended minimum standard
2. **Semantic HTML**: Using appropriate HTML elements for their intended purpose
3. **Keyboard Navigation**: Ensuring all interactive elements are accessible via keyboard
4. **Screen Reader Support**: Providing appropriate text alternatives and ARIA attributes
5. **Focus Management**: Implementing visible focus states and logical focus order
6. **Color Contrast**: Ensuring sufficient contrast between text and background colors
7. **Text Resizing**: Supporting text resizing without loss of content or functionality

### Using GitHub Copilot Agent for Accessibility

GitHub Copilot Agent can help implement accessible components with proper prompting:

```
/agent Enhance this Button component for accessibility:

[paste your component code here]

Please:
1. Add appropriate ARIA attributes
2. Ensure keyboard accessibility
3. Implement visible focus states
4. Add screen reader support
5. Ensure color contrast meets WCAG AA standards
6. Document accessibility features
```

### Implementing Accessible Components

#### Accessible Button Example

```jsx
// AccessibleButton.jsx (React)
import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/tokens';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const StyledButton = styled.button<{
  $variant: string;
  $size: string;
  $fullWidth: boolean;
}>`
  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.medium};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all ${theme.transitions.duration.fast} ${theme.transitions.timing.easeInOut};
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  position: relative;
  
  /* Variant styles */
  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background-color: ${theme.colors.primary[500]};
          color: ${theme.colors.white};
          border: none;
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary[600]};
          }
          
          &:active:not(:disabled) {
            background-color: ${theme.colors.primary[700]};
          }
        `;
      case 'secondary':
        return `
          background-color: ${theme.colors.secondary[500]};
          color: ${theme.colors.white};
          border: none;
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.secondary[600]};
          }
          
          &:active:not(:disabled) {
            background-color: ${theme.colors.secondary[700]};
          }
        `;
      case 'outlined':
        return `
          background-color: transparent;
          color: ${theme.colors.primary[500]};
          border: 1px solid ${theme.colors.primary[500]};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary[50]};
          }
          
          &:active:not(:disabled) {
            background-color: ${theme.colors.primary[100]};
          }
        `;
      case 'text':
        return `
          background-color: transparent;
          color: ${theme.colors.primary[500]};
          border: none;
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary[50]};
          }
          
          &:active:not(:disabled) {
            background-color: ${theme.colors.primary[100]};
          }
        `;
    }
  }}
  
  /* Size styles */
  ${props => {
    switch (props.$size) {
      case 'small':
        return `
          padding: ${theme.spacing[2]} ${theme.spacing[3]};
          font-size: ${theme.typography.fontSize.sm};
        `;
      case 'large':
        return `
          padding: ${theme.spacing[4]} ${theme.spacing[6]};
          font-size: ${theme.typography.fontSize.lg};
        `;
      default:
        return `
          padding: ${theme.spacing[3]} ${theme.spacing[4]};
          font-size: ${theme.typography.fontSize.md};
        `;
    }
  }}
  
  /* State styles */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* Focus styles - enhanced for accessibility */
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${theme.colors.primary[300]};
  }
  
  &:focus:not(:focus-visible) {
    box-shadow: none;
  }
  
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${theme.colors.primary[300]};
  }
  
  /* Icon styles */
  .icon-left {
    margin-right: ${theme.spacing[2]};
  }
  
  .icon-right {
    margin-left: ${theme.spacing[2]};
  }
  
  /* Loading spinner */
  .spinner {
    animation: spin 1s linear infinite;
    margin-right: ${theme.spacing[2]};
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export const AccessibleButton = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  onClick,
  type = 'button',
  ...props
}, ref) => {
  // Determine ARIA attributes based on state
  const ariaProps = {
    'aria-disabled': disabled || loading,
    'aria-busy': loading,
  };
  
  // Handle click with loading state protection
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) {
      e.preventDefault();
      return;
    }
    
    onClick?.(e);
  };
  
  return (
    <StyledButton
      ref={ref}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={handleClick}
      type={type}
      {...ariaProps}
      {...props}
    >
      {loading && (
        <span className="spinner" aria-hidden="true">
          ⟳
        </span>
      )}
      {!loading && leftIcon && (
        <span className="icon-left" aria-hidden="true">
          {leftIcon}
        </span>
      )}
      <span>{children}</span>
      {!loading && rightIcon && (
        <span className="icon-right" aria-hidden="true">
          {rightIcon}
        </span>
      )}
      {loading && <span className="sr-only">Loading</span>}
    </StyledButton>
  );
});

AccessibleButton.displayName = 'AccessibleButton';
```

#### Accessible Form Field Example

```jsx
// FormField.jsx (React)
import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/tokens';

export interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${theme.spacing[4]};
  width: 100%;
`;

const Label = styled.label<{ $hasError: boolean }>`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  margin-bottom: ${theme.spacing[2]};
  color: ${props => props.$hasError ? theme.colors.error : theme.colors.neutral[800]};
`;

const Input = styled.input<{ $hasError: boolean }>`
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.md};
  padding: ${theme.spacing[3]};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${props => props.$hasError ? theme.colors.error : theme.colors.neutral[300]};
  background-color: ${theme.colors.white};
  transition: all ${theme.transitions.duration.fast} ${theme.transitions.timing.easeInOut};
  width: 100%;
  
  &:hover:not(:disabled) {
    border-color: ${props => props.$hasError ? theme.colors.error : theme.colors.primary[300]};
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? theme.colors.error : theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${props => props.$hasError ? `${theme.colors.error}33` : `${theme.colors.primary[300]}33`};
  }
  
  &:disabled {
    background-color: ${theme.colors.neutral[100]};
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  &::placeholder {
    color: ${theme.colors.neutral[400]};
  }
`;

const HelperText = styled.div<{ $isError: boolean }>`
  font-size: ${theme.typography.fontSize.xs};
  margin-top: ${theme.spacing[1]};
  color: ${props => props.$isError ? theme.colors.error : theme.colors.neutral[600]};
`;

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(({
  id,
  label,
  type = 'text',
  placeholder,
  helperText,
  error,
  required = false,
  disabled = false,
  value,
  onChange,
  ...props
}, ref) => {
  const hasError = !!error;
  const fieldId = id;
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  
  return (
    <FormFieldContainer>
      <Label 
        htmlFor={fieldId} 
        $hasError={hasError}
      >
        {label}
        {required && <span aria-hidden="true"> *</span>}
        {required && <span className="sr-only"> (required)</span>}
      </Label>
      
      <Input
        ref={ref}
        id={fieldId}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-invalid={hasError}
        aria-describedby={`${helperText ? helperId : ''} ${error ? errorId : ''}`}
        $hasError={hasError}
        value={value}
        onChange={onChange}
        {...props}
      />
      
      {(helperText || error) && (
        <HelperText 
          id={hasError ? errorId : helperId}
          $isError={hasError}
          role={hasError ? 'alert' : undefined}
        >
          {hasError ? error : helperText}
        </HelperText>
      )}
    </FormFieldContainer>
  );
});

FormField.displayName = 'FormField';
```

### Accessibility Testing with AI Assistance

GitHub Copilot Agent can help generate accessibility tests:

```
/agent Create accessibility tests for our Button component including:
1. Tests for keyboard navigation
2. Tests for screen reader compatibility
3. Tests for ARIA attributes
4. Tests for focus management
```

Example accessibility tests:

```jsx
// Button.accessibility.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  test('should have no accessibility violations', async () => {
    const { container } = render(<Button>Accessible Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  test('should be focusable with keyboard', () => {
    render(<Button>Focusable Button</Button>);
    const button = screen.getByRole('button', { name: /focusable button/i });
    button.focus();
    expect(button).toHaveFocus();
  });
  
  test('should show visible focus indicator when focused', () => {
    render(<Button>Focus Visible Button</Button>);
    const button = screen.getByRole('button', { name: /focus visible button/i });
    button.focus();
    // Check for focus styles (implementation-specific)
    expect(window.getComputedStyle(button).boxShadow).not.toBe('none');
  });
  
  test('should be activatable with keyboard', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Keyboard Button</Button>);
    const button = screen.getByRole('button', { name: /keyboard button/i });
    button.focus();
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    handleClick.mockClear();
    fireEvent.keyDown(button, { key: ' ', code: 'Space' });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  test('should have correct ARIA attributes when disabled', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });
  
  test('should have correct ARIA attributes when loading', () => {
    render(<Button loading>Loading Button</Button>);
    const button = screen.getByRole('button', { name: /loading button/i });
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });
  
  test('should mark decorative icons as aria-hidden', () => {
    render(
      <Button 
        leftIcon={<span data-testid="left-icon">←</span>}
        rightIcon={<span data-testid="right-icon">→</span>}
      >
        Icon Button
      </Button>
    );
    
    const leftIcon = screen.getByTestId('left-icon');
    const rightIcon = screen.getByTestId('right-icon');
    
    expect(leftIcon).toHaveAttribute('aria-hidden', 'true');
    expect(rightIcon).toHaveAttribute('aria-hidden', 'true');
  });
});
```

## Responsive Implementation

### Understanding Responsive Design Requirements

When converting Figma designs to responsive code, consider these key aspects:

1. **Flexible Layouts**: Using CSS Grid and Flexbox for adaptable layouts
2. **Responsive Units**: Using relative units (%, em, rem) instead of fixed pixels
3. **Media Queries**: Implementing breakpoints for different screen sizes
4. **Mobile-First Approach**: Starting with mobile design and scaling up
5. **Viewport Settings**: Ensuring proper viewport configuration
6. **Touch Targets**: Making interactive elements large enough for touch devices
7. **Content Adaptation**: Adjusting content display for different screen sizes

### Using GitHub Copilot Agent for Responsive Design

GitHub Copilot Agent can help implement responsive components:

```
/agent Make this component fully responsive:

[paste your component code here]

Please:
1. Implement a mobile-first approach
2. Add appropriate media queries for tablet and desktop
3. Use relative units instead of fixed pixels
4. Ensure touch targets are at least 44x44px
5. Optimize layout for different screen sizes
```

### Implementing Responsive Components

#### Responsive Card Component Example

```jsx
// ResponsiveCard.jsx (React)
import React from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/tokens';

export interface CardProps {
  title: string;
  description: string;
  image?: string;
  actions?: React.ReactNode;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

const CardContainer = styled.div<{ $variant: string }>`
  display: flex;
  flex-direction: column;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  background-color: ${theme.colors.white};
  box-shadow: ${theme.shadows.md};
  transition: transform ${theme.transitions.duration.normal} ${theme.transitions.timing.easeInOut},
              box-shadow ${theme.transitions.duration.normal} ${theme.transitions.timing.easeInOut};
  width: 100%;
  
  /* Variant styles */
  ${props => props.$variant === 'featured' && `
    box-shadow: ${theme.shadows.lg};
  `}
  
  /* Hover effect */
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.$variant === 'featured' ? theme.shadows.xl : theme.shadows.lg};
  }
  
  /* Responsive styles - mobile first */
  @media (min-width: ${theme.breakpoints.sm}) {
    ${props => props.$variant === 'compact' ? `
      flex-direction: row;
      align-items: center;
    ` : ''}
  }
  
  @media (min-width: ${theme.breakpoints.lg}) {
    max-width: ${props => props.$variant === 'featured' ? '100%' : '400px'};
  }
`;

const ImageContainer = styled.div<{ $variant: string }>`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  
  @media (min-width: ${theme.breakpoints.sm}) {
    ${props => props.$variant === 'compact' ? `
      width: 30%;
      min-width: 120px;
      padding-bottom: 0;
      height: 100%;
      min-height: 100%;
    ` : ''}
  }
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContentContainer = styled.div<{ $variant: string }>`
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing[4]};
  flex: 1;
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${props => props.$variant === 'featured' ? theme.spacing[6] : theme.spacing[4]};
  }
`;

const Title = styled.h3<{ $variant: string }>`
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${props => props.$variant === 'featured' ? theme.typography.fontSize.xl : theme.typography.fontSize.lg};
  margin: 0 0 ${theme.spacing[2]};
  color: ${theme.colors.neutral[900]};
  
  @media (min-width: ${theme.breakpoints.md}) {
    font-size: ${props => props.$variant === 'featured' ? theme.typography.fontSize['2xl'] : theme.typography.fontSize.xl};
  }
`;

const Description = styled.p<{ $variant: string }>`
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.md};
  line-height: ${theme.typography.lineHeight.relaxed};
  color: ${theme.colors.neutral[700]};
  margin: 0 0 ${theme.spacing[4]};
  
  /* Truncate text for compact variant */
  ${props => props.$variant === 'compact' && `
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `}
  
  @media (min-width: ${theme.breakpoints.md}) {
    font-size: ${props => props.$variant === 'featured' ? theme.typography.fontSize.lg : theme.typography.fontSize.md};
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[2]};
  margin-top: auto;
`;

export const ResponsiveCard: React.FC<CardProps> = ({
  title,
  description,
  image,
  actions,
  variant = 'default',
  className,
}) => {
  return (
    <CardContainer $variant={variant} className={className}>
      {image && (
        <ImageContainer $variant={variant}>
          <Image src={image} alt="" aria-hidden="true" />
        </ImageContainer>
      )}
      
      <ContentContainer $variant={variant}>
        <Title $variant={variant}>{title}</Title>
        <Description $variant={variant}>{description}</Description>
        
        {actions && (
          <ActionsContainer>
            {actions}
          </ActionsContainer>
        )}
      </ContentContainer>
    </CardContainer>
  );
};
```

#### Responsive Layout Component Example

```jsx
// ResponsiveLayout.jsx (React)
import React from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/tokens';

export interface LayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebarPosition?: 'left' | 'right';
  className?: string;
}

const LayoutContainer = styled.div`
  display: grid;
  min-height: 100vh;
  width: 100%;
  
  /* Mobile layout (stacked) */
  grid-template-areas:
    "header"
    "main"
    "sidebar"
    "footer";
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto auto;
  
  /* Tablet layout */
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-areas:
      "header header"
      "sidebar main"
      "footer footer";
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr auto;
  }
  
  /* Desktop layout */
  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 300px 1fr;
  }
`;

const Header = styled.header`
  grid-area: header;
  background-color: ${theme.colors.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: ${theme.spacing[4]};
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Sidebar = styled.aside<{ $position: 'left' | 'right' }>`
  grid-area: sidebar;
  background-color: ${theme.colors.neutral[100]};
  padding: ${theme.spacing[4]};
  overflow-y: auto;
  
  /* Tablet and desktop layout */
  @media (min-width: ${theme.breakpoints.md}) {
    position: sticky;
    top: 0;
    height: 100vh;
    padding-top: ${theme.spacing[6]};
  }
  
  /* Right sidebar position (desktop only) */
  @media (min-width: ${theme.breakpoints.md}) {
    ${props => props.$position === 'right' && `
      grid-area: main;
      display: grid;
      grid-template-areas:
        "content sidebar";
      grid-template-columns: 1fr 300px;
      padding: 0;
      
      > * {
        grid-area: sidebar;
        padding: ${theme.spacing[4]};
        padding-top: ${theme.spacing[6]};
      }
    `}
  }
`;

const Main = styled.main<{ $hasSidebar: boolean; $sidebarPosition: 'left' | 'right' }>`
  grid-area: main;
  padding: ${theme.spacing[4]};
  
  /* Right sidebar position (desktop only) */
  @media (min-width: ${theme.breakpoints.md}) {
    ${props => props.$hasSidebar && props.$sidebarPosition === 'right' && `
      grid-area: content;
    `}
  }
  
  /* Desktop layout */
  @media (min-width: ${theme.breakpoints.lg}) {
    padding: ${theme.spacing[6]};
  }
`;

const Footer = styled.footer`
  grid-area: footer;
  background-color: ${theme.colors.neutral[800]};
  color: ${theme.colors.white};
  padding: ${theme.spacing[4]};
  
  /* Desktop layout */
  @media (min-width: ${theme.breakpoints.lg}) {
    padding: ${theme.spacing[6]};
  }
`;

export const ResponsiveLayout: React.FC<LayoutProps> = ({
  children,
  sidebar,
  header,
  footer,
  sidebarPosition = 'left',
  className,
}) => {
  const hasSidebar = !!sidebar;
  
  return (
    <LayoutContainer className={className}>
      {header && <Header>{header}</Header>}
      
      {sidebar && (
        <Sidebar $position={sidebarPosition}>
          {sidebar}
        </Sidebar>
      )}
      
      <Main $hasSidebar={hasSidebar} $sidebarPosition={sidebarPosition}>
        {children}
      </Main>
      
      {footer && <Footer>{footer}</Footer>}
    </LayoutContainer>
  );
};
```

### Responsive Testing with AI Assistance

GitHub Copilot Agent can help generate responsive tests:

```
/agent Create responsive tests for our Card component including:
1. Tests for different viewport sizes
2. Tests for layout changes at breakpoints
3. Tests for image aspect ratio
4. Tests for touch target sizes
```

Example responsive tests:

```jsx
// Card.responsive.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ResponsiveCard } from './ResponsiveCard';

// Mock window.matchMedia for testing media queries
function mockMatchMedia(width) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: width >= parseInt(query.match(/\d+/)[0], 10),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  
  // Also set innerWidth
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    value: width,
  });
}

describe('ResponsiveCard Component', () => {
  const mockProps = {
    title: 'Card Title',
    description: 'Card description text for testing responsive behavior',
    image: 'https://example.com/image.jpg',
    actions: <button>Action Button</button>,
  };
  
  // Test mobile viewport
  describe('Mobile Viewport (320px)', () => {
    beforeEach(() => {
      mockMatchMedia(320);
    });
    
    test('renders in vertical layout', () => {
      const { container } = render(<ResponsiveCard {...mockProps} />);
      const cardStyles = window.getComputedStyle(container.firstChild);
      
      expect(cardStyles.flexDirection).toBe('column');
    });
    
    test('image has correct aspect ratio', () => {
      render(<ResponsiveCard {...mockProps} />);
      const imageContainer = screen.getByRole('img').parentElement;
      const imageContainerStyles = window.getComputedStyle(imageContainer);
      
      // Check for 16:9 aspect ratio using padding-bottom
      expect(imageContainerStyles.paddingBottom).toBe('56.25%');
    });
    
    test('action buttons have adequate touch target size', () => {
      render(<ResponsiveCard {...mockProps} />);
      const actionButton = screen.getByRole('button');
      const buttonRect = actionButton.getBoundingClientRect();
      
      // Touch targets should be at least 44x44px
      expect(buttonRect.height).toBeGreaterThanOrEqual(44);
      expect(buttonRect.width).toBeGreaterThanOrEqual(44);
    });
  });
  
  // Test tablet viewport
  describe('Tablet Viewport (768px)', () => {
    beforeEach(() => {
      mockMatchMedia(768);
    });
    
    test('compact variant renders in horizontal layout', () => {
      const { container } = render(<ResponsiveCard {...mockProps} variant="compact" />);
      const cardStyles = window.getComputedStyle(container.firstChild);
      
      expect(cardStyles.flexDirection).toBe('row');
    });
    
    test('default variant maintains vertical layout', () => {
      const { container } = render(<ResponsiveCard {...mockProps} />);
      const cardStyles = window.getComputedStyle(container.firstChild);
      
      expect(cardStyles.flexDirection).toBe('column');
    });
    
    test('compact variant truncates description text', () => {
      render(<ResponsiveCard {...mockProps} variant="compact" />);
      const description = screen.getByText(mockProps.description);
      const descriptionStyles = window.getComputedStyle(description);
      
      expect(descriptionStyles.overflow).toBe('hidden');
      expect(descriptionStyles.webkitLineClamp).toBe('2');
    });
  });
  
  // Test desktop viewport
  describe('Desktop Viewport (1024px)', () => {
    beforeEach(() => {
      mockMatchMedia(1024);
    });
    
    test('has maximum width constraint', () => {
      const { container } = render(<ResponsiveCard {...mockProps} />);
      const cardStyles = window.getComputedStyle(container.firstChild);
      
      expect(cardStyles.maxWidth).toBe('400px');
    });
    
    test('featured variant spans full width', () => {
      const { container } = render(<ResponsiveCard {...mockProps} variant="featured" />);
      const cardStyles = window.getComputedStyle(container.firstChild);
      
      expect(cardStyles.maxWidth).toBe('100%');
    });
    
    test('featured variant has larger typography', () => {
      render(
        <>
          <ResponsiveCard {...mockProps} />
          <ResponsiveCard {...mockProps} variant="featured" />
        </>
      );
      
      const defaultTitle = screen.getAllByText(mockProps.title)[0];
      const featuredTitle = screen.getAllByText(mockProps.title)[1];
      
      const defaultTitleStyles = window.getComputedStyle(defaultTitle);
      const featuredTitleStyles = window.getComputedStyle(featuredTitle);
      
      // Featured title should be larger
      expect(parseInt(featuredTitleStyles.fontSize)).toBeGreaterThan(
        parseInt(defaultTitleStyles.fontSize)
      );
    });
  });
});
```

## Best Practices for Accessibility and Responsiveness

### Accessibility Best Practices

1. **Start with Semantic HTML**:
   - Use appropriate elements (`<button>`, `<a>`, `<input>`, etc.)
   - Use heading levels correctly (`<h1>` through `<h6>`)
   - Use lists (`<ul>`, `<ol>`) for list content

2. **Implement Keyboard Navigation**:
   - Ensure all interactive elements are keyboard accessible
   - Maintain a logical tab order
   - Provide visible focus indicators
   - Implement keyboard shortcuts where appropriate

3. **Add ARIA When Necessary**:
   - Use ARIA roles, states, and properties to enhance accessibility
   - Follow the "First Rule of ARIA": don't use ARIA if native HTML can do the job
   - Test ARIA implementations with screen readers

4. **Manage Focus**:
   - Trap focus in modals and dialogs
   - Return focus to trigger elements after closing modals
   - Provide skip links for keyboard users

5. **Ensure Color Contrast**:
   - Maintain at least 4.5:1 contrast ratio for normal text (WCAG AA)
   - Maintain at least 3:1 contrast ratio for large text (WCAG AA)
   - Don't rely on color alone to convey information

### Responsiveness Best Practices

1. **Use Mobile-First Approach**:
   - Start with mobile layout and progressively enhance
   - Use min-width media queries to add complexity for larger screens
   - Test on real devices when possible

2. **Implement Flexible Layouts**:
   - Use CSS Grid for two-dimensional layouts
   - Use Flexbox for one-dimensional layouts
   - Avoid fixed widths that can cause overflow

3. **Use Relative Units**:
   - Prefer rem for font sizes (relative to root font size)
   - Use em for spacing related to text (padding, margins)
   - Use percentages for container widths
   - Use vh/vw for viewport-relative sizing

4. **Optimize Images**:
   - Use responsive images with `srcset` and `sizes`
   - Consider using the `<picture>` element for art direction
   - Implement lazy loading for images

5. **Consider Touch Interactions**:
   - Make touch targets at least 44x44px
   - Provide adequate spacing between interactive elements
   - Implement touch-friendly interactions (swipe, pinch, etc.)

By following these best practices and leveraging AI tools like GitHub Copilot Agent, you can ensure your implementations from Figma designs are both accessible and responsive, providing an optimal experience for all users across all devices.
# Testing and Quality Assurance

This section explores how to implement comprehensive testing and quality assurance processes for code generated from Figma designs using GitHub Agent, Copilot, and other AI tools. Proper testing ensures that your implementation matches the design specifications and functions correctly across all scenarios.

## Testing Strategy Overview

When converting Figma designs to code, a comprehensive testing strategy should include:

1. **Visual Testing**: Ensuring the implementation visually matches the design
2. **Functional Testing**: Verifying that all interactive elements work as expected
3. **Accessibility Testing**: Confirming compliance with accessibility standards
4. **Responsive Testing**: Checking behavior across different screen sizes
5. **Cross-Browser Testing**: Ensuring compatibility across browsers
6. **Performance Testing**: Measuring load times and interaction performance

## Visual Testing

### Visual Regression Testing

Visual regression testing compares screenshots of your implementation against a baseline to detect visual changes:

```javascript
// visual-regression.test.js
const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });

describe('Visual Regression Tests', () => {
  let browser;
  let page;
  
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
  });
  
  afterAll(async () => {
    await browser.close();
  });
  
  test('Button component matches design', async () => {
    await page.goto('http://localhost:6006/iframe.html?id=components-atoms-button--primary');
    await page.waitForSelector('.button');
    
    // Take screenshot
    const image = await page.screenshot();
    
    // Compare with baseline
    expect(image).toMatchImageSnapshot();
  });
  
  test('Card component matches design', async () => {
    await page.goto('http://localhost:6006/iframe.html?id=components-molecules-card--default');
    await page.waitForSelector('.card');
    
    // Take screenshot
    const image = await page.screenshot();
    
    // Compare with baseline
    expect(image).toMatchImageSnapshot();
  });
  
  // Test different states
  test('Button hover state matches design', async () => {
    await page.goto('http://localhost:6006/iframe.html?id=components-atoms-button--primary');
    await page.waitForSelector('.button');
    
    // Hover over button
    await page.hover('.button');
    
    // Take screenshot
    const image = await page.screenshot();
    
    // Compare with baseline
    expect(image).toMatchImageSnapshot();
  });
});
```

### Using GitHub Copilot Agent for Visual Testing

```
/agent Create visual regression tests for our Button component using Puppeteer and jest-image-snapshot. Include tests for:
1. Default state
2. Hover state
3. Active state
4. Disabled state
5. Different variants (primary, secondary, outlined)
6. Different sizes (small, medium, large)
```

### Storybook Integration for Visual Testing

Storybook provides a great environment for visual testing:

```javascript
// .storybook/main.js
module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y', // Accessibility addon
    'storybook-addon-designs', // Figma integration
  ],
};
```

```javascript
// Button.stories.jsx with Figma design integration
import React from 'react';
import { Button } from './Button';

export default {
  title: 'Components/Atoms/Button',
  component: Button,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/abc123/Design-System?node-id=123-456',
    },
  },
};

export const Primary = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

// More stories...
```

## Functional Testing

### Unit Testing Components

Unit tests verify that individual components function correctly:

```javascript
// Button.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  test('renders children correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });
  
  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  test('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).not.toHaveBeenCalled();
  });
  
  test('applies correct class for primary variant', () => {
    const { container } = render(<Button variant="primary">Primary</Button>);
    expect(container.firstChild).toHaveClass('button--primary');
  });
  
  // More tests...
});
```

### Using GitHub Copilot Agent for Functional Testing

```
/agent Create comprehensive unit tests for our FormField component using React Testing Library. Include tests for:
1. Rendering with different props
2. Input change handling
3. Error state display
4. Required field validation
5. Helper text display
6. Disabled state behavior
```

### Integration Testing

Integration tests verify that components work together correctly:

```javascript
// LoginForm.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from './LoginForm';
import { AuthContext } from '../../contexts/AuthContext';

describe('LoginForm Integration', () => {
  const mockLogin = jest.fn();
  
  beforeEach(() => {
    mockLogin.mockClear();
  });
  
  test('submits form with correct values', async () => {
    render(
      <AuthContext.Provider value={{ login: mockLogin }}>
        <LoginForm />
      </AuthContext.Provider>
    );
    
    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));
    
    // Verify login was called with correct values
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
  
  test('displays validation errors', async () => {
    render(
      <AuthContext.Provider value={{ login: mockLogin }}>
        <LoginForm />
      </AuthContext.Provider>
    );
    
    // Submit form without filling fields
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));
    
    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
    
    // Verify login was not called
    expect(mockLogin).not.toHaveBeenCalled();
  });
  
  // More tests...
});
```

## Accessibility Testing

### Automated Accessibility Testing

Automated tools can catch many accessibility issues:

```javascript
// Button.a11y.test.jsx
import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(<Button>Accessible Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  test('disabled button has no accessibility violations', async () => {
    const { container } = render(<Button disabled>Disabled Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  // More tests...
});
```

### Using GitHub Copilot Agent for Accessibility Testing

```
/agent Create comprehensive accessibility tests for our Modal component using jest-axe. Include tests for:
1. Basic accessibility compliance
2. Keyboard navigation
3. Focus management
4. ARIA attributes
5. Screen reader announcements
```

### Manual Accessibility Testing Checklist

Automated tests can't catch everything. Use this checklist for manual testing:

1. **Keyboard Navigation**:
   - Tab through all interactive elements
   - Verify focus order is logical
   - Ensure focus is visible at all times
   - Test keyboard shortcuts

2. **Screen Reader Testing**:
   - Test with NVDA, JAWS, or VoiceOver
   - Verify all content is announced correctly
   - Check that interactive elements have proper roles
   - Ensure form fields have proper labels

3. **Color and Contrast**:
   - Verify text meets contrast requirements
   - Check that color is not the only means of conveying information
   - Test with color blindness simulators

4. **Zoom and Magnification**:
   - Test at 200% zoom
   - Ensure content remains readable and usable
   - Check that no content is cut off

## Responsive Testing

### Testing Different Viewport Sizes

Test your implementation across different screen sizes:

```javascript
// Card.responsive.test.jsx
import React from 'react';
import { render } from '@testing-library/react';
import { Card } from './Card';

// Mock window.matchMedia for testing media queries
function mockMatchMedia(width) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: width >= parseInt(query.match(/\d+/)[0], 10),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  
  // Also set innerWidth
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    value: width,
  });
}

describe('Card Responsive Behavior', () => {
  const mockProps = {
    title: 'Card Title',
    description: 'Card description text',
    image: 'https://example.com/image.jpg',
  };
  
  test('renders correctly on mobile (320px)', () => {
    mockMatchMedia(320);
    const { container } = render(<Card {...mockProps} />);
    expect(container.firstChild).toHaveStyle('flex-direction: column');
  });
  
  test('renders correctly on tablet (768px)', () => {
    mockMatchMedia(768);
    const { container } = render(<Card {...mockProps} variant="horizontal" />);
    expect(container.firstChild).toHaveStyle('flex-direction: row');
  });
  
  test('renders correctly on desktop (1200px)', () => {
    mockMatchMedia(1200);
    const { container } = render(<Card {...mockProps} />);
    expect(container.firstChild).toHaveStyle('max-width: 400px');
  });
  
  // More tests...
});
```

### Using GitHub Copilot Agent for Responsive Testing

```
/agent Create responsive tests for our Navigation component using React Testing Library. Include tests for:
1. Mobile menu behavior (hamburger menu)
2. Tablet layout changes
3. Desktop layout
4. Different viewport sizes
5. Touch interactions vs mouse interactions
```

## Cross-Browser Testing

### Setting Up Cross-Browser Testing

Use tools like Playwright to test across multiple browsers:

```javascript
// cross-browser.test.js
const { chromium, firefox, webkit } = require('playwright');

describe('Cross-Browser Tests', () => {
  for (const browserType of [chromium, firefox, webkit]) {
    describe(`${browserType.name()} browser`, () => {
      let browser;
      let page;
      
      beforeAll(async () => {
        browser = await browserType.launch();
        page = await browser.newPage();
      });
      
      afterAll(async () => {
        await browser.close();
      });
      
      test('Button renders correctly', async () => {
        await page.goto('http://localhost:6006/iframe.html?id=components-atoms-button--primary');
        await page.waitForSelector('.button');
        
        const buttonVisible = await page.isVisible('.button');
        expect(buttonVisible).toBe(true);
        
        // Take screenshot for visual comparison
        const screenshot = await page.screenshot();
        expect(screenshot).toMatchImageSnapshot({
          customSnapshotIdentifier: `button-${browserType.name()}`,
        });
      });
      
      test('Form submission works', async () => {
        await page.goto('http://localhost:3000/login');
        
        // Fill form
        await page.fill('input[name="email"]', 'test@example.com');
        await page.fill('input[name="password"]', 'password123');
        
        // Submit form
        await Promise.all([
          page.waitForNavigation(),
          page.click('button[type="submit"]'),
        ]);
        
        // Check for success message
        const successMessage = await page.textContent('.success-message');
        expect(successMessage).toContain('Login successful');
      });
      
      // More tests...
    });
  }
});
```

### Using GitHub Copilot Agent for Cross-Browser Testing

```
/agent Create cross-browser tests for our Dropdown component using Playwright. Include tests for:
1. Chrome, Firefox, and Safari
2. Rendering consistency
3. Interaction behavior
4. Animation performance
5. Focus and keyboard behavior
```

## Performance Testing

### Measuring Component Performance

Measure the performance of your components:

```javascript
// Button.perf.test.jsx
import React from 'react';
import { render } from '@testing-library/react';
import { Button } from './Button';

describe('Button Performance', () => {
  test('renders efficiently', () => {
    const start = performance.now();
    
    for (let i = 0; i < 1000; i++) {
      render(<Button>Performance Test</Button>);
    }
    
    const end = performance.now();
    const duration = end - start;
    
    console.log(`Rendered 1000 Button components in ${duration}ms`);
    expect(duration).toBeLessThan(1000); // Should render 1000 buttons in less than 1 second
  });
  
  // More tests...
});
```

### Using GitHub Copilot Agent for Performance Testing

```
/agent Create performance tests for our DataTable component. Include tests for:
1. Rendering large datasets
2. Sorting performance
3. Filtering performance
4. Pagination performance
5. Memory usage
```

## Continuous Integration Setup

### Setting Up GitHub Actions for Testing

Automate your testing with GitHub Actions:

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run unit tests
      run: npm test
      
    - name: Run visual regression tests
      run: npm run test:visual
      
    - name: Run accessibility tests
      run: npm run test:a11y
      
    - name: Run end-to-end tests
      run: npm run test:e2e
      
    - name: Upload test artifacts
      uses: actions/upload-artifact@v2
      with:
        name: test-results
        path: |
          coverage/
          screenshots/
```

### Using GitHub Copilot Agent for CI Setup

```
/agent Create a GitHub Actions workflow for our component library that includes:
1. Unit testing
2. Visual regression testing
3. Accessibility testing
4. Cross-browser testing
5. Performance benchmarking
6. Storybook deployment
```

## Quality Assurance Checklist

Use this comprehensive checklist to ensure your implementation meets quality standards:

### Visual Quality
- [ ] Implementation visually matches Figma design
- [ ] All states (hover, active, disabled) match design
- [ ] Spacing and alignment are consistent with design
- [ ] Typography matches design specifications
- [ ] Colors match design system tokens
- [ ] Icons and images are crisp and properly sized

### Functional Quality
- [ ] All interactive elements function as expected
- [ ] Form validation works correctly
- [ ] Error states display properly
- [ ] Loading states are implemented
- [ ] Data is displayed correctly
- [ ] All user flows work as designed

### Accessibility Quality
- [ ] WCAG AA compliance is achieved
- [ ] Keyboard navigation works properly
- [ ] Screen reader compatibility is verified
- [ ] Color contrast meets requirements
- [ ] Focus states are visible
- [ ] ARIA attributes are correctly implemented

### Responsive Quality
- [ ] Layout adapts appropriately to all screen sizes
- [ ] Touch targets are adequately sized
- [ ] Content remains readable at all sizes
- [ ] No horizontal scrolling on mobile
- [ ] Images scale appropriately
- [ ] Forms are usable on mobile devices

### Browser Compatibility
- [ ] Works in latest Chrome, Firefox, Safari, and Edge
- [ ] Works in IE11 (if required)
- [ ] Works on iOS Safari and Android Chrome
- [ ] No visual inconsistencies between browsers
- [ ] No functional inconsistencies between browsers

### Performance Quality
- [ ] Initial load time is acceptable
- [ ] Interaction response time is smooth
- [ ] Animations run at 60fps
- [ ] No memory leaks
- [ ] Bundle size is optimized
- [ ] Images are optimized

By implementing a comprehensive testing and quality assurance process, you can ensure that your code generated from Figma designs meets high standards for visual fidelity, functionality, accessibility, responsiveness, and performance.
# Conclusion and References

## Conclusion

The Figma-to-code conversion process has evolved significantly with the introduction of AI-powered tools like GitHub Agent, GitHub Copilot, and GitHub Code Agent. These tools, along with specialized alternatives like Visual Copilot and Cursor, have transformed how designers and developers collaborate to bring designs to life.

### Key Takeaways

1. **AI-Assisted Workflows**: The integration of AI tools into the design-to-code workflow dramatically reduces development time while maintaining high-quality output. GitHub Copilot Agent and similar tools can understand design context, generate appropriate code, and help implement complex components.

2. **Standardized Communication**: The Model Context Protocol (MCP) provides a standardized way for AI tools to interact with design systems, enabling deeper integration between Figma and development environments.

3. **Framework Flexibility**: Modern AI tools support multiple frameworks and styling approaches, allowing teams to use their preferred technology stack while still benefiting from automated code generation.

4. **Component-Based Architecture**: Organizing implementations using component-based architecture principles ensures maintainability, reusability, and consistency across projects.

5. **Accessibility and Responsiveness**: AI tools can now assist in implementing accessible and responsive designs, ensuring that generated code meets modern web standards.

6. **Testing and Quality Assurance**: Comprehensive testing strategies, including visual regression, functional, accessibility, and performance testing, ensure that implementations match design specifications and function correctly.

### Future Directions

As AI tools continue to evolve, we can expect:

1. **Increased Design Understanding**: Future AI tools will have even deeper understanding of design principles, patterns, and intentions.

2. **More Accurate Code Generation**: Code quality and fidelity to designs will continue to improve as models are trained on more examples.

3. **End-to-End Workflows**: Complete pipelines from design to deployment will become more seamless and automated.

4. **Enhanced Collaboration**: Better integration between design and development tools will further bridge the gap between designers and developers.

5. **Specialized Domain Knowledge**: AI tools will incorporate more domain-specific knowledge for different types of applications and industries.

By adopting the practices outlined in this playbook, teams can leverage the latest AI-powered tools to streamline their Figma-to-code workflow, resulting in faster development cycles, higher quality implementations, and better collaboration between designers and developers.

## References

### Official Documentation

1. [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
2. [GitHub Copilot Agent Documentation](https://docs.github.com/en/copilot/github-copilot-chat/about-github-copilot-chat)
3. [Figma Developer API Documentation](https://www.figma.com/developers/api)
4. [Figma Plugin API Documentation](https://www.figma.com/plugin-docs/)
5. [Azure AI Foundry Documentation](https://learn.microsoft.com/en-us/azure/ai-services/)
6. [Visual Copilot Documentation](https://www.builder.io/c/docs/visual-copilot)
7. [Cursor Documentation](https://cursor.sh/docs)

### Articles and Tutorials

1. [From Figma to Code: The Evolution of Design Handoff](https://www.smashingmagazine.com/2023/05/figma-code-evolution-design-handoff/)
2. [Building a Component Library with GitHub Copilot](https://dev.to/github/building-a-component-library-with-github-copilot-4j3p)
3. [Accessibility-First Development with AI Assistance](https://web.dev/articles/accessibility-first-development)
4. [Responsive Design Patterns for Modern Web Applications](https://www.patterns.dev/posts/responsive-design-patterns)
5. [Testing Component Libraries: A Comprehensive Guide](https://storybook.js.org/blog/testing-component-libraries/)
6. [The Future of Design Systems in the Age of AI](https://uxdesign.cc/the-future-of-design-systems-in-the-age-of-ai-7d5c910ffc0a)
7. [Optimizing Performance in React Applications](https://reactjs.org/docs/optimizing-performance.html)
8. [Angular Performance Best Practices](https://angular.io/guide/performance)

### Books

1. "Design Systems Handbook" by Marco Suarez, Jina Anne, Katie Sylor-Miller, Diana Mounter, and Roy Stanfield
2. "Atomic Design" by Brad Frost
3. "Inclusive Components" by Heydon Pickering
4. "Refactoring UI" by Adam Wathan and Steve Schoger
5. "Web Component Architecture & Development with Angular" by Bogdan Luca

### Tools and Resources

1. [Storybook](https://storybook.js.org/) - UI component explorer and documentation
2. [Chromatic](https://www.chromatic.com/) - Visual testing and review platform
3. [Axe](https://www.deque.com/axe/) - Accessibility testing tools
4. [Playwright](https://playwright.dev/) - Cross-browser testing framework
5. [Jest](https://jestjs.io/) - JavaScript testing framework
6. [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - React component testing
7. [Angular Testing Utilities](https://angular.io/guide/testing) - Angular component testing
8. [Figma Community Plugins](https://www.figma.com/community/plugins) - Plugins for extending Figma functionality

### Community Resources

1. [GitHub Copilot Community](https://github.com/community/community/discussions/categories/copilot)
2. [Figma Community Forum](https://forum.figma.com/)
3. [React Community](https://reactjs.org/community/support.html)
4. [Angular Community](https://angular.io/community)
5. [Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/)
6. [A11Y Project](https://www.a11yproject.com/)
7. [CSS-Tricks](https://css-tricks.com/) - Web development tutorials and articles
8. [Smashing Magazine](https://www.smashingmagazine.com/) - Web development and design articles

These references provide additional information, tutorials, and resources to help you further explore and implement the concepts discussed in this playbook.
