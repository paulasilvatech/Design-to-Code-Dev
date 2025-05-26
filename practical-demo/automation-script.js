#!/usr/bin/env node

/**
 * Figma to Code Automation Script
 * This script automates the process of converting Figma designs to code
 * using GitHub Copilot and MCP Server
 * 
 * Usage: node figma-to-code.js <figma-url> [options]
 */

const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

// Configuration
const CONFIG = {
  outputDir: './generated',
  templatesDir: './templates',
  mcpConfig: './mcp.json',
  frameworks: ['html', 'react', 'nextjs', 'vue'],
  defaultFramework: 'react'
};

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

// Utility functions
const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  step: (msg) => console.log(`${colors.cyan}▶${colors.reset} ${msg}`)
};

// Parse command line arguments
function parseArgs(args) {
  const options = {
    figmaUrl: args[2],
    framework: 'react',
    outputPath: CONFIG.outputDir,
    componentName: 'GeneratedComponent',
    typescript: true,
    styling: 'tailwind',
    animations: true,
    responsive: true
  };

  for (let i = 3; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case '--framework':
      case '-f':
        options.framework = args[++i];
        break;
      case '--output':
      case '-o':
        options.outputPath = args[++i];
        break;
      case '--name':
      case '-n':
        options.componentName = args[++i];
        break;
      case '--no-typescript':
        options.typescript = false;
        break;
      case '--styling':
      case '-s':
        options.styling = args[++i];
        break;
      case '--no-animations':
        options.animations = false;
        break;
      case '--no-responsive':
        options.responsive = false;
        break;
      case '--help':
      case '-h':
        showHelp();
        process.exit(0);
    }
  }

  return options;
}

// Show help message
function showHelp() {
  console.log(`
${colors.bright}Figma to Code Automation Script${colors.reset}

Usage: node figma-to-code.js <figma-url> [options]

Options:
  -f, --framework <name>    Framework to use (react, nextjs, vue, html) [default: react]
  -o, --output <path>       Output directory [default: ./generated]
  -n, --name <name>         Component name [default: GeneratedComponent]
  -s, --styling <type>      Styling approach (tailwind, css, styled) [default: tailwind]
  --no-typescript           Generate JavaScript instead of TypeScript
  --no-animations           Skip animations and transitions
  --no-responsive           Skip responsive design
  -h, --help               Show this help message

Examples:
  node figma-to-code.js https://figma.com/file/abc123 -f nextjs -n ProductCard
  node figma-to-code.js https://figma.com/file/xyz789 -f html -o ./dist
  `);
}

// Validate Figma URL
function validateFigmaUrl(url) {
  const figmaRegex = /^https:\/\/(www\.)?figma\.com\/(file|design)\/([a-zA-Z0-9]+)/;
  return figmaRegex.test(url);
}

// Check if MCP server is configured
async function checkMcpConfig() {
  try {
    const config = await fs.readFile(CONFIG.mcpConfig, 'utf8');
    const mcpData = JSON.parse(config);
    return mcpData.servers && mcpData.servers.figma;
  } catch (error) {
    return false;
  }
}

// Generate prompt based on options
function generatePrompt(options) {
  const { figmaUrl, framework, componentName, typescript, styling, animations, responsive } = options;
  
  let prompt = `Convert this Figma design to code: ${figmaUrl}\n\n`;
  
  // Framework-specific requirements
  switch (framework) {
    case 'react':
      prompt += `Create a React ${typescript ? 'TypeScript' : 'JavaScript'} component named ${componentName}.\n`;
      prompt += `Requirements:\n`;
      prompt += `- Functional component with hooks\n`;
      prompt += `- ${styling} for styling\n`;
      prompt += `- Props for customization\n`;
      break;
    
    case 'nextjs':
      prompt += `Create a Next.js 14 component using App Router.\n`;
      prompt += `Component name: ${componentName}\n`;
      prompt += `Requirements:\n`;
      prompt += `- ${typescript ? 'TypeScript' : 'JavaScript'}\n`;
      prompt += `- Server component where possible\n`;
      prompt += `- ${styling} for styling\n`;
      prompt += `- Image optimization with next/image\n`;
      break;
    
    case 'vue':
      prompt += `Create a Vue 3 component named ${componentName}.vue.\n`;
      prompt += `Requirements:\n`;
      prompt += `- Composition API\n`;
      prompt += `- ${typescript ? 'TypeScript' : 'JavaScript'}\n`;
      prompt += `- ${styling} for styling\n`;
      break;
    
    case 'html':
      prompt += `Create a complete HTML page with:\n`;
      prompt += `- Semantic HTML5\n`;
      prompt += `- Modern CSS3\n`;
      prompt += `- Vanilla JavaScript\n`;
      break;
  }
  
  // Common requirements
  prompt += `\nAdditional requirements:\n`;
  if (responsive) prompt += `- Fully responsive design (mobile, tablet, desktop)\n`;
  if (animations) prompt += `- Smooth animations and transitions\n`;
  prompt += `- Accessible (WCAG 2.1 AA)\n`;
  prompt += `- SEO optimized\n`;
  prompt += `- Download and organize all images\n`;
  prompt += `- Performance optimized\n`;
  
  return prompt;
}

// Create project structure
async function createProjectStructure(options) {
  const { outputPath, framework, componentName } = options;
  
  log.step('Creating project structure...');
  
  const dirs = {
    react: [
      `${outputPath}/components/${componentName}`,
      `${outputPath}/assets/images`,
      `${outputPath}/styles`,
      `${outputPath}/hooks`,
      `${outputPath}/utils`
    ],
    nextjs: [
      `${outputPath}/app/components/${componentName}`,
      `${outputPath}/public/images`,
      `${outputPath}/lib`,
      `${outputPath}/types`
    ],
    vue: [
      `${outputPath}/components`,
      `${outputPath}/assets/images`,
      `${outputPath}/composables`,
      `${outputPath}/utils`
    ],
    html: [
      `${outputPath}/css`,
      `${outputPath}/js`,
      `${outputPath}/images`,
      `${outputPath}/fonts`
    ]
  };
  
  const dirsToCreate = dirs[framework] || dirs.react;
  
  for (const dir of dirsToCreate) {
    await fs.mkdir(dir, { recursive: true });
  }
  
  log.success('Project structure created');
}

// Save generated code to files
async function saveGeneratedCode(code, options) {
  const { outputPath, framework, componentName, typescript } = options;
  
  log.step('Saving generated code...');
  
  // Parse the generated code (this is a simplified version)
  // In a real implementation, you would parse the AI response properly
  const files = {
    react: [
      {
        path: `${outputPath}/components/${componentName}/${componentName}.${typescript ? 'tsx' : 'jsx'}`,
        content: code.component || code
      },
      {
        path: `${outputPath}/components/${componentName}/${componentName}.styles.${typescript ? 'ts' : 'js'}`,
        content: code.styles || ''
      },
      {
        path: `${outputPath}/components/${componentName}/index.${typescript ? 'ts' : 'js'}`,
        content: `export { default } from './${componentName}';\n`
      }
    ],
    html: [
      {
        path: `${outputPath}/index.html`,
        content: code.html || code
      },
      {
        path: `${outputPath}/css/styles.css`,
        content: code.css || ''
      },
      {
        path: `${outputPath}/js/main.js`,
        content: code.js || ''
      }
    ]
  };
  
  const filesToSave = files[framework] || files.react;
  
  for (const file of filesToSave) {
    if (file.content) {
      await fs.writeFile(file.path, file.content);
      log.success(`Saved: ${path.basename(file.path)}`);
    }
  }
}

// Generate README file
async function generateReadme(options) {
  const { outputPath, framework, componentName, figmaUrl } = options;
  
  const readme = `# ${componentName}

Generated from Figma design: ${figmaUrl}

## Framework
${framework.toUpperCase()}

## Installation

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

## Usage

${framework === 'react' ? `
\`\`\`jsx
import ${componentName} from './components/${componentName}';

function App() {
  return <${componentName} />;
}
\`\`\`
` : ''}

## Structure

\`\`\`
${outputPath}/
${framework === 'react' ? `├── components/
│   └── ${componentName}/
│       ├── ${componentName}.tsx
│       ├── ${componentName}.styles.ts
│       └── index.ts` : ''}
${framework === 'html' ? `├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js` : ''}
└── images/
\`\`\`

## Features

- ✅ Responsive design
- ✅ Accessible (WCAG 2.1 AA)
- ✅ SEO optimized
- ✅ Performance optimized
- ✅ Cross-browser compatible

## Generated on
${new Date().toISOString()}
`;
  
  await fs.writeFile(`${outputPath}/README.md`, readme);
  log.success('README.md generated');
}

// Main execution function
async function main() {
  console.log(`\n${colors.bright}🎨 Figma to Code Converter${colors.reset}\n`);
  
  const options = parseArgs(process.argv);
  
  // Validate inputs
  if (!options.figmaUrl) {
    log.error('Please provide a Figma URL');
    showHelp();
    process.exit(1);
  }
  
  if (!validateFigmaUrl(options.figmaUrl)) {
    log.error('Invalid Figma URL format');
    process.exit(1);
  }
  
  if (!CONFIG.frameworks.includes(options.framework)) {
    log.error(`Invalid framework. Choose from: ${CONFIG.frameworks.join(', ')}`);
    process.exit(1);
  }
  
  // Check MCP configuration
  log.step('Checking MCP configuration...');
  const hasMcp = await checkMcpConfig();
  if (!hasMcp) {
    log.warning('MCP server not configured. Please run: MCP: Add Server... in VS Code');
    log.info('Continuing with manual prompt generation...');
  } else {
    log.success('MCP server configured');
  }
  
  // Create project structure
  await createProjectStructure(options);
  
  // Generate prompt
  log.step('Generating conversion prompt...');
  const prompt = generatePrompt(options);
  
  // Save prompt for manual use
  await fs.writeFile(`${options.outputPath}/prompt.txt`, prompt);
  log.success('Prompt saved to prompt.txt');
  
  // Show prompt to user
  console.log(`\n${colors.bright}Generated Prompt:${colors.reset}`);
  console.log('─'.repeat(50));
  console.log(prompt);
  console.log('─'.repeat(50));
  
  // Instructions for user
  console.log(`\n${colors.bright}Next Steps:${colors.reset}`);
  console.log('1. Copy the prompt above');
  console.log('2. Open VS Code Insiders');
  console.log('3. Open GitHub Copilot Chat (Ctrl+Shift+I)');
  console.log('4. Paste the prompt and wait for generation');
  console.log('5. Copy the generated code to the output directory');
  
  // Generate README
  await generateReadme(options);
  
  // Create package.json for React/Next.js projects
  if (['react', 'nextjs', 'vue'].includes(options.framework)) {
    const packageJson = {
      name: options.componentName.toLowerCase(),
      version: '1.0.0',
      private: true,
      scripts: {
        dev: options.framework === 'nextjs' ? 'next dev' : 'vite',
        build: options.framework === 'nextjs' ? 'next build' : 'vite build',
        preview: 'vite preview'
      },
      dependencies: {
        react: options.framework !== 'vue' ? '^18.2.0' : undefined,
        'react-dom': options.framework !== 'vue' ? '^18.2.0' : undefined,
        next: options.framework === 'nextjs' ? '^14.0.0' : undefined,
        vue: options.framework === 'vue' ? '^3.3.0' : undefined
      },
      devDependencies: {
        typescript: options.typescript ? '^5.0.0' : undefined,
        '@types/react': options.framework === 'react' && options.typescript ? '^18.2.0' : undefined,
        '@types/node': options.typescript ? '^20.0.0' : undefined,
        tailwindcss: options.styling === 'tailwind' ? '^3.3.0' : undefined,
        vite: options.framework !== 'nextjs' ? '^5.0.0' : undefined
      }
    };
    
    // Remove undefined values
    Object.keys(packageJson.dependencies).forEach(key => 
      packageJson.dependencies[key] === undefined && delete packageJson.dependencies[key]
    );
    Object.keys(packageJson.devDependencies).forEach(key => 
      packageJson.devDependencies[key] === undefined && delete packageJson.devDependencies[key]
    );
    
    await fs.writeFile(
      `${options.outputPath}/package.json`,
      JSON.stringify(packageJson, null, 2)
    );
    log.success('package.json created');
  }
  
  console.log(`\n${colors.green}✨ Setup complete!${colors.reset}`);
  console.log(`Output directory: ${colors.cyan}${path.resolve(options.outputPath)}${colors.reset}\n`);
}

// Run the script
main().catch((error) => {
  log.error(`Error: ${error.message}`);
  process.exit(1);
});