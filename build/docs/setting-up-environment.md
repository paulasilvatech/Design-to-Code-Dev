# Setting Up the Development Environment

A properly configured development environment is essential for efficient Figma-to-code conversion. This section covers the tools, extensions, and configurations needed to optimize your workflow.

## VS Code Configuration

Install the following extensions:
- GitHub Copilot and GitHub Copilot Chat
- Figma for VS Code
- Azure Tools Extension

### Extension Settings

Configure GitHub Copilot in VS Code settings:
```json
{
  "github.copilot.enable": {
    "*": true,
    "plaintext": true,
    "markdown": true,
    "javascript": true,
    "typescript": true,
    "html": true,
    "css": true
  },
  "github.copilot.advanced": {
    "inlineSuggest.enable": true
  }
}
```

## Required Node Modules

### For React Projects
```bash
# Create a new React project
npx create-react-app my-figma-project
# or with TypeScript
npx create-react-app my-figma-project --template typescript

# Install additional dependencies
npm install styled-components tailwindcss
npm install -D @types/styled-components
```

### For Angular Projects
```bash
# Install Angular CLI
npm install -g @angular/cli

# Create a new Angular project
ng new my-figma-project --style=scss

# Add Angular Material
ng add @angular/material
```

## Setting Up MCP Configuration

Create an `.mcp.json` file in your project root:

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
    },
    "github": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${env:GITHUB_TOKEN}"
      }
    }
  }
}
```

## Environment Setup

Create a `.env` file with necessary API keys:

```
FIGMA_API_KEY=your_figma_api_key
GITHUB_TOKEN=your_github_token
AZURE_AI_FOUNDRY_KEY=your_azure_key
AZURE_AI_FOUNDRY_ENDPOINT=your_azure_endpoint
```

## Project Structure

Set up a recommended project structure for Figma-to-code conversion:

```
my-figma-project/
├── .env                    # Environment variables
├── .mcp.json               # MCP configuration
├── .github/
│   └── copilot-instructions.md  # Custom instructions for GitHub Copilot
├── src/
│   ├── components/         # Component library
│   │   ├── atoms/          # Basic UI elements
│   │   ├── molecules/      # Composite components
│   │   └── organisms/      # Complex UI sections
│   ├── pages/              # Page components
│   ├── styles/             # Global styles and themes
│   │   └── tokens.js       # Design tokens from Figma
│   └── utils/              # Utility functions
└── figma/                  # Figma exports and assets
```

By following this setup guide, you'll have a development environment optimized for AI-assisted Figma-to-code conversion, enabling faster and more accurate implementation of your designs.
