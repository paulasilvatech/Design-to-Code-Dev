# Workshop Resources

This directory contains all the resources, templates, scripts, and tools needed for the Design-to-Code workshop.

## 📂 Directory Structure

```
resources/
├── docker/                  # Docker configurations
├── exercises/              # Hands-on workshop exercises
├── figma-examples/         # Example Figma components
├── figma-templates/        # Component templates for Figma
├── mcp-config/            # MCP server configurations
├── prompts/               # AI prompt templates
├── scripts/               # Automation scripts
├── solutions/             # Exercise solutions
├── workflows/             # GitHub Actions workflows
├── .env.template          # Environment variables template
├── *.sh                   # Setup and utility scripts
├── *.template.ts          # TypeScript templates
└── package.json           # Node.js dependencies
```

## 🚀 Quick Start

1. **Copy environment template**:
   ```bash
   cp .env.template ../.env
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run setup script**:
   ```bash
   ./01-azure-setup.sh
   ```

## 📋 Resource Categories

### 🔧 Setup Scripts
- **`01-azure-setup.sh`** - Azure AI services configuration
- **`02-test-connections.sh`** - Verify all connections work
- **`03-cleanup.sh`** - Clean up resources after workshop

### 📄 Configuration Templates
- **`.env.template`** - Environment variables template
- **`azure-ai-config.template.ts`** - TypeScript configuration manager
- **`azure-ai-analyzer.template.ts`** - AI design analyzer implementation
- **`package.json`** - Node.js dependencies and scripts

### 🎨 Figma Component Templates
Located in `figma-templates/`:
- **`button-component.template.json`** - Button with all states and variants
- **`input-component.template.json`** - Input fields with validation states
- **`card-component.template.json`** - Versatile card layouts
- **`navigation-component.template.json`** - Responsive navigation patterns
- **`modal-component.template.json`** - Modal dialogs and overlays
- **`table-component.template.json`** - Data tables with sorting/filtering
- **`form-component.template.json`** - Complete form components
- **`tabs-component.template.json`** - Tabbed interfaces

### 🤖 AI & Automation

#### MCP Configuration (`mcp-config/`)
- **`mcp.config.json`** - Complete MCP server configuration with:
  - Figma integration settings
  - AI prompt templates
  - GitHub integration
  - Quality rules and standards

#### Prompts (`prompts/`)
- **`component-generation.md`** - Comprehensive prompt templates for:
  - Basic component generation
  - Advanced AI-enhanced generation
  - Design system integration
  - Accessibility-first approaches
  - Performance optimization
  - Multi-framework support

#### Scripts (`scripts/`)
- **`generate-component.js`** - Complete component generation script with:
  - MCP integration
  - GitHub Copilot integration
  - Design analysis
  - File generation
  - Export management

### 🔄 GitHub Workflows (`workflows/`)
- **`design-to-code.yml`** - Automated design-to-code pipeline
- **`design-sync-pipeline.yml`** - Continuous design synchronization

### 🐳 Docker Configuration (`docker/`)
- **`Dockerfile.mcp-server`** - Production-ready MCP server image
- **`docker-compose.yml`** - Complete stack deployment including:
  - MCP Server
  - Redis cache
  - Design analyzer
  - Storybook
  - Nginx proxy

### 📚 Learning Materials

#### Exercises (`exercises/`)
- **`workshop-exercises.md`** - Hands-on exercises for each module:
  - Environment verification
  - Component generation
  - Figma analysis
  - AI integration
  - Testing strategies
  - Production deployment

#### Example Components (`figma-examples/`)
- **`example-components.json`** - Complete Figma component structures:
  - Button with variants
  - Input fields
  - Cards
  - Navigation
  - Complete design tokens

## 🎨 Figma Templates Usage

### Component Templates Overview
The `figma-templates/` directory contains detailed JSON templates for creating consistent UI components in Figma. These templates serve as a bridge between design and code.

### Using the Templates

1. **In Figma Design**
   ```json
   // Example: Using button template variants
   {
     "variant": "Primary",
     "size": "Medium", 
     "state": "Default"
   }
   ```

2. **For Code Generation**
   ```typescript
   // Import template data
   import buttonTemplate from './figma-templates/button-component.template.json';
   
   // Use with AI code generation
   const designTokens = {
     padding: buttonTemplate.properties.paddingX.medium,
     colors: buttonTemplate.colors.primary,
     states: buttonTemplate.states
   };
   ```

3. **Design System Mapping**
   - Templates include standard naming conventions
   - Tokens align with popular design systems
   - Variants follow industry best practices

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm/yarn
- Docker and Docker Compose
- Azure account with AI services
- Figma account with API access
- GitHub account with personal access token

### Initial Setup

1. **Environment Configuration**
   ```bash
   # Copy and fill environment variables
   cp .env.template ../.env
   # Edit ../.env with your credentials
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Azure Setup**
   ```bash
   # Make script executable
   chmod +x *.sh
   
   # Run Azure setup
   ./01-azure-setup.sh
   ```

4. **Test Connections**
   ```bash
   ./02-test-connections.sh
   ```

### Docker Deployment

1. **Build and Start Services**
   ```bash
   cd docker
   docker-compose up -d
   ```

2. **Verify Services**
   - MCP Server: http://localhost:3000
   - Storybook: http://localhost:6006
   - Main App: http://localhost:80

### Using the Scripts

1. **Generate Single Component**
   ```bash
   node scripts/generate-component.js <fileKey> <nodeId> <componentName>
   ```

2. **Run Workflows**
   ```bash
   # Trigger design-to-code workflow
   gh workflow run design-to-code.yml \
     -f figma_url="https://figma.com/file/..." \
     -f component_name="Button"
   ```

## 🎯 Workshop Flow

### Module 1-2: Setup
1. Use environment verification exercises
2. Set up MCP configuration
3. Test basic component generation

### Module 3-4: Figma & AI
1. Use example components for analysis
2. Apply prompt templates
3. Generate components with scripts

### Module 5: Azure AI
1. Configure Azure services
2. Test design analysis
3. Generate from screenshots

### Module 6-8: Advanced
1. Deploy with Docker
2. Set up CI/CD workflows
3. Build component library

## 🐛 Troubleshooting

### Common Issues

1. **MCP Connection Failed**
   - Check `mcp-config/mcp.config.json`
   - Verify auth tokens in `.env`
   - Check Docker logs: `docker logs design-to-code-mcp`

2. **Azure AI Errors**
   - Verify API keys and endpoints
   - Check service quotas
   - Test with smaller images

3. **Component Generation Failed**
   - Validate Figma node IDs
   - Check script permissions
   - Review error logs in `logs/`

## 📚 Additional Resources

- [Figma API Documentation](https://www.figma.com/developers/api)
- [MCP Protocol Spec](https://modelcontextprotocol.io)
- [Azure AI Services](https://azure.microsoft.com/services/cognitive-services/)
- [GitHub Actions](https://docs.github.com/actions)

## 🤝 Contributing

When adding new resources:
1. Follow existing naming conventions
2. Update this README
3. Add usage examples
4. Include in relevant module exercises

## 📝 License

All resources are part of the Design-to-Code workshop and follow the project's MIT license.