#!/usr/bin/env node

const { MCPClient } = require('@modelcontextprotocol/client');
const { GitHubAgent } = require('@github/copilot-agent-sdk');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');

class DesignToCodeGenerator {
  constructor(config) {
    this.mcp = new MCPClient({
      serverUrl: config.mcpServerUrl,
      authToken: config.mcpAuthToken
    });
    
    this.agent = new GitHubAgent({
      token: config.githubToken,
      mode: 'autonomous'
    });
    
    this.config = config;
  }
  
  async generateComponent(fileKey, nodeId, componentName) {
    const spinner = ora('Starting component generation...').start();
    
    try {
      // Step 1: Connect to MCP and fetch design
      spinner.text = 'Connecting to MCP Server...';
      await this.mcp.connect();
      
      spinner.text = 'Fetching design from Figma...';
      const design = await this.mcp.request('figma.getComponent', {
        fileKey,
        nodeId,
        includeStyles: true,
        includeVariants: true
      });
      
      // Step 2: Analyze design
      spinner.text = 'Analyzing design...';
      const analysis = await this.analyzeDesign(design);
      
      // Step 3: Plan component structure
      spinner.text = 'Planning component structure...';
      const plan = await this.agent.plan({
        task: 'Create React component from design',
        context: {
          design: analysis,
          componentName,
          designSystem: await this.loadDesignSystemContext()
        }
      });
      
      // Step 4: Generate files
      spinner.text = 'Generating component files...';
      const files = await this.generateFiles(plan, analysis);
      
      // Step 5: Write files
      spinner.text = 'Writing files...';
      await this.writeFiles(files, componentName);
      
      // Step 6: Update exports
      spinner.text = 'Updating exports...';
      await this.updateExports(componentName);
      
      spinner.succeed(chalk.green('Component generation complete!'));
      
      // Print summary
      console.log('\n' + chalk.blue('Generated files:'));
      Object.keys(files).forEach(filename => {
        console.log(chalk.gray('  - ') + filename.replace('Component', componentName));
      });
      
      return { success: true, files };
      
    } catch (error) {
      spinner.fail(chalk.red('Component generation failed!'));
      console.error(chalk.red('\nError:'), error.message);
      
      if (this.config.debug) {
        console.error(chalk.gray('\nStack trace:'));
        console.error(error.stack);
      }
      
      throw error;
    } finally {
      await this.mcp.disconnect();
    }
  }
  
  async analyzeDesign(design) {
    return {
      name: design.name,
      type: design.type,
      properties: {
        dimensions: {
          width: design.absoluteBoundingBox.width,
          height: design.absoluteBoundingBox.height
        },
        styles: this.extractStyles(design),
        layout: this.extractLayout(design),
        variants: design.variants || [],
        interactions: design.interactions || []
      }
    };
  }
  
  extractStyles(node) {
    const styles = {};
    
    // Extract fills (background colors)
    if (node.fills && node.fills.length > 0) {
      const fill = node.fills[0];
      if (fill.type === 'SOLID') {
        styles.backgroundColor = this.rgbToHex(fill.color);
      }
    }
    
    // Extract typography
    if (node.style) {
      styles.typography = {
        fontFamily: node.style.fontFamily,
        fontSize: node.style.fontSize,
        fontWeight: node.style.fontWeight,
        lineHeight: node.style.lineHeightPx,
        letterSpacing: node.style.letterSpacing
      };
    }
    
    // Extract effects (shadows, etc.)
    if (node.effects && node.effects.length > 0) {
      styles.effects = node.effects.map(effect => ({
        type: effect.type,
        color: this.rgbToHex(effect.color),
        offset: effect.offset,
        radius: effect.radius
      }));
    }
    
    // Extract borders
    if (node.strokes && node.strokes.length > 0) {
      styles.border = {
        color: this.rgbToHex(node.strokes[0].color),
        width: node.strokeWeight
      };
    }
    
    return styles;
  }
  
  extractLayout(node) {
    const layout = {
      type: node.layoutMode || 'NONE',
      padding: {
        top: node.paddingTop || 0,
        right: node.paddingRight || 0,
        bottom: node.paddingBottom || 0,
        left: node.paddingLeft || 0
      },
      gap: node.itemSpacing || 0,
      alignment: {
        primary: node.primaryAxisAlignItems,
        counter: node.counterAxisAlignItems
      }
    };
    
    if (node.layoutMode === 'HORIZONTAL' || node.layoutMode === 'VERTICAL') {
      layout.direction = node.layoutMode.toLowerCase();
    }
    
    return layout;
  }
  
  async generateFiles(plan, analysis) {
    const files = {};
    
    // Generate component file
    files['Component.tsx'] = await this.agent.generate({
      template: 'react-component',
      context: {
        name: plan.componentName,
        props: plan.props,
        analysis,
        framework: this.config.framework || 'react',
        language: this.config.language || 'typescript',
        styling: this.config.styling || 'styled-components'
      }
    });
    
    // Generate styles
    files['Component.styles.ts'] = await this.agent.generate({
      template: 'styled-components',
      context: {
        name: plan.componentName,
        styles: analysis.properties.styles,
        variants: plan.variants,
        theme: this.config.useTheme
      }
    });
    
    // Generate tests
    files['Component.test.tsx'] = await this.agent.generate({
      template: 'react-test',
      context: {
        name: plan.componentName,
        props: plan.props,
        testCases: plan.testCases,
        accessibility: true
      }
    });
    
    // Generate story
    files['Component.stories.tsx'] = await this.agent.generate({
      template: 'storybook-story',
      context: {
        name: plan.componentName,
        props: plan.props,
        variants: plan.variants,
        docs: true
      }
    });
    
    // Generate types if needed
    if (this.config.generateTypes) {
      files['Component.types.ts'] = await this.agent.generate({
        template: 'typescript-types',
        context: {
          name: plan.componentName,
          props: plan.props
        }
      });
    }
    
    return files;
  }
  
  async writeFiles(files, componentName) {
    const componentDir = path.join(
      this.config.targetDirectory,
      componentName
    );
    
    await fs.ensureDir(componentDir);
    
    for (const [filename, content] of Object.entries(files)) {
      const filePath = path.join(
        componentDir,
        filename.replace('Component', componentName)
      );
      
      await fs.writeFile(filePath, content);
      
      if (this.config.verbose) {
        console.log(chalk.gray(`  Created: ${filePath}`));
      }
    }
    
    // Create index file
    const indexContent = `export { default as ${componentName} } from './${componentName}';\nexport * from './${componentName}.types';\n`;
    await fs.writeFile(path.join(componentDir, 'index.ts'), indexContent);
  }
  
  rgbToHex(color) {
    const toHex = (n) => {
      const hex = Math.round(n * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
  }
  
  async loadDesignSystemContext() {
    // Load existing design system configuration
    const tokenPath = path.join(process.cwd(), 'src/lib/styles/tokens');
    
    try {
      const tokens = await fs.readJson(path.join(tokenPath, 'tokens.json'));
      
      return {
        tokens,
        componentPatterns: await this.detectComponentPatterns(),
        namingConventions: this.config.namingConventions
      };
    } catch (error) {
      console.warn(chalk.yellow('Warning: Could not load design system context'));
      return {
        tokens: {},
        componentPatterns: {},
        namingConventions: this.config.namingConventions
      };
    }
  }
  
  async detectComponentPatterns() {
    // Analyze existing components for patterns
    const componentsDir = path.join(process.cwd(), 'src/lib/components');
    
    try {
      const components = await fs.readdir(componentsDir);
      
      return {
        structure: 'atomic',
        styling: 'styled-components',
        testing: 'jest + react-testing-library',
        stateManagement: 'hooks'
      };
    } catch (error) {
      return {
        structure: 'flat',
        styling: 'css-modules',
        testing: 'jest',
        stateManagement: 'props'
      };
    }
  }
  
  async updateExports(componentName) {
    const indexPath = path.join(
      this.config.targetDirectory,
      'index.ts'
    );
    
    try {
      const currentContent = await fs.readFile(indexPath, 'utf-8');
      const exportLine = `export * from './${componentName}';`;
      
      if (!currentContent.includes(exportLine)) {
        await fs.appendFile(indexPath, `${exportLine}\n`);
      }
    } catch (error) {
      // Create index file if it doesn't exist
      const exportLine = `export * from './${componentName}';`;
      await fs.writeFile(indexPath, `${exportLine}\n`);
    }
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 3) {
    console.log(chalk.red('Usage: generate-component <fileKey> <nodeId> <componentName> [targetDir]'));
    console.log(chalk.gray('\nExample:'));
    console.log(chalk.gray('  generate-component abc123 1:23 Button src/components'));
    process.exit(1);
  }
  
  const [fileKey, nodeId, componentName, targetDirectory] = args;
  
  const generator = new DesignToCodeGenerator({
    mcpServerUrl: process.env.MCP_SERVER_URL || 'http://localhost:3000',
    mcpAuthToken: process.env.MCP_AUTH_TOKEN,
    githubToken: process.env.GITHUB_TOKEN,
    targetDirectory: targetDirectory || 'src/lib/components',
    namingConventions: {
      components: 'PascalCase',
      files: 'PascalCase',
      directories: 'PascalCase'
    },
    framework: 'react',
    language: 'typescript',
    styling: 'styled-components',
    useTheme: true,
    generateTypes: true,
    verbose: process.env.VERBOSE === 'true',
    debug: process.env.DEBUG === 'true'
  });
  
  generator.generateComponent(fileKey, nodeId, componentName)
    .then(() => {
      console.log(chalk.green(`\n✅ Successfully generated ${componentName} component!`));
      process.exit(0);
    })
    .catch(error => {
      console.error(chalk.red('\n❌ Generation failed:'), error.message);
      process.exit(1);
    });
}

module.exports = { DesignToCodeGenerator }; 