# 🧠 Integrating with Azure AI Foundry

This guide provides detailed instructions for leveraging Azure AI Foundry to enhance your design-to-code workflow.

## Table of Contents
- [Understanding Azure AI Foundry](#understanding-azure-ai-foundry)
- [Setting Up Azure AI Resources](#setting-up-azure-ai-resources)
- [Integrating with Your Development Environment](#integrating-with-your-development-environment)
- [Using Azure AI for Design Analysis](#using-azure-ai-for-design-analysis)
- [Image-to-Code Generation](#image-to-code-generation)
- [Creating Custom AI Workflows](#creating-custom-ai-workflows)
- [Performance and Cost Optimization](#performance-and-cost-optimization)
- [Real-World Examples](#real-world-examples)

## Understanding Azure AI Foundry

Azure AI Foundry is a comprehensive platform that provides AI capabilities for developers. In the context of design-to-code workflows, it offers powerful tools for analyzing designs, extracting information, and generating code.

### Key Capabilities for Design-to-Code

- **Computer Vision**: Analyze design images to identify UI elements
- **Visual Recognition**: Recognize patterns and components in designs
- **Code Generation**: Transform designs into framework-specific code
- **Accessibility Analysis**: Evaluate designs for accessibility compliance
- **Performance Optimization**: Suggest optimizations for generated code

### How It Complements GitHub Copilot

While GitHub Copilot excels at generating code based on natural language prompts, Azure AI Foundry adds the following advantages:

1. **Visual Understanding**: Direct analysis of design images
2. **Batch Processing**: Process multiple designs at once
3. **Advanced Recognition**: Identify complex patterns and relationships
4. **Specialized AI Models**: Access to domain-specific models for UI/UX
5. **End-to-End Automation**: Complete workflows from design to deployment

## Setting Up Azure AI Resources

### Creating an Azure Account

1. **Sign up for Azure**:
   - Visit [portal.azure.com](https://portal.azure.com)
   - Create a new account or sign in with an existing Microsoft account
   - Complete the verification process

2. **Set up a subscription**:
   - Go to Subscriptions in the Azure portal
   - Create a new subscription or use an existing one
   - Consider using the free tier for initial testing

### Setting Up Azure AI Foundry

1. **Create a new AI Foundry resource**:
   - In the Azure portal, click "Create a resource"
   - Search for "AI Foundry" or navigate to the AI section
   - Click "Create" to start the setup process

2. **Configure basic settings**:
   - Choose your subscription
   - Create or select a resource group
   - Name your AI Foundry resource
   - Select a region (choose one close to your location)
   - Select a pricing tier (start with Standard)

3. **Complete the setup**:
   - Review your configuration
   - Click "Create" to provision the resource
   - Wait for deployment to complete (typically a few minutes)

### Obtaining API Keys and Endpoints

1. **Access your AI Foundry resource**:
   - Go to your Azure dashboard
   - Navigate to the AI Foundry resource you created

2. **Get API keys**:
   - Go to "Keys and Endpoints" in the left menu
   - You'll see two keys (Key 1 and Key 2)
   - Copy one of these keys for use in your application
   - Note the endpoint URL

3. **Store securely**:
   - Add these credentials to your `.env` file:
   ```
   AZURE_AI_FOUNDRY_KEY=your_key_here
   AZURE_AI_FOUNDRY_ENDPOINT=your_endpoint_here
   ```
   - Ensure this file is listed in `.gitignore` to prevent exposure

## Integrating with Your Development Environment

### Installing the Azure SDK

#### For JavaScript/TypeScript Projects:

```bash
# Install the Azure AI Foundry SDK
npm install @azure/ai-foundry

# Additional packages for image processing (if needed)
npm install axios sharp
```

#### For Python Projects:

```bash
# Install the Azure AI Foundry SDK
pip install azure-ai-foundry

# Additional packages for image processing (if needed)
pip install pillow requests
```

### Basic Integration Code

#### JavaScript/TypeScript:

```typescript
import { AzureAIFoundryClient } from '@azure/ai-foundry';
import axios from 'axios';
import * as fs from 'fs';

// Create a client
const client = new AzureAIFoundryClient({
  endpoint: process.env.AZURE_AI_FOUNDRY_ENDPOINT,
  apiKey: process.env.AZURE_AI_FOUNDRY_KEY
});

// Function to analyze a design image
async function analyzeDesign(imagePath) {
  // Read the image file
  const imageData = fs.readFileSync(imagePath);
  
  // Analyze the image
  const result = await client.analyzeImage({
    image: imageData,
    features: [
      'componentDetection',
      'accessibilityCheck',
      'colorAnalysis'
    ]
  });
  
  return result;
}

// Function to generate code from a design specification
async function generateCode(designSpec, framework) {
  const result = await client.generateCode({
    specification: designSpec,
    framework: framework, // 'react', 'angular', etc.
    optimizationLevel: 'production'
  });
  
  return result.code;
}

// Example usage
async function processDesign(imagePath, framework) {
  try {
    // Analyze the design
    const analysisResult = await analyzeDesign(imagePath);
    
    // Generate code based on the analysis
    const generatedCode = await generateCode(analysisResult, framework);
    
    // Save the generated code
    fs.writeFileSync('generated-component.jsx', generatedCode);
    
    console.log('Code generation complete!');
  } catch (error) {
    console.error('Error processing design:', error);
  }
}
```

#### Python:

```python
from azure.ai.foundry import AzureAIFoundryClient
from azure.core.credentials import AzureKeyCredential
import os
import requests
from PIL import Image
import io

# Create a client
endpoint = os.environ["AZURE_AI_FOUNDRY_ENDPOINT"]
key = os.environ["AZURE_AI_FOUNDRY_KEY"]
client = AzureAIFoundryClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(key)
)

# Function to analyze a design image
def analyze_design(image_path):
    # Read the image file
    with open(image_path, "rb") as f:
        image_data = f.read()
    
    # Analyze the image
    result = client.analyze_image(
        image=image_data,
        features=["componentDetection", "accessibilityCheck", "colorAnalysis"]
    )
    
    return result

# Function to generate code from a design specification
def generate_code(design_spec, framework):
    result = client.generate_code(
        specification=design_spec,
        framework=framework,  # 'react', 'angular', etc.
        optimization_level="production"
    )
    
    return result.code

# Example usage
def process_design(image_path, framework):
    try:
        # Analyze the design
        analysis_result = analyze_design(image_path)
        
        # Generate code based on the analysis
        generated_code = generate_code(analysis_result, framework)
        
        # Save the generated code
        with open("generated-component.jsx", "w") as f:
            f.write(generated_code)
        
        print("Code generation complete!")
    except Exception as e:
        print(f"Error processing design: {e}")
```

### Setting Up VS Code Extension

1. **Install the Azure Tools extension**:
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X or Cmd+Shift+X)
   - Search for "Azure Tools"
   - Click "Install"

2. **Configure the extension**:
   - Sign in to your Azure account
   - Access your AI Foundry resources directly from VS Code
   - Set up snippets for common Azure AI operations

## Using Azure AI for Design Analysis

Azure AI Foundry provides several capabilities for analyzing Figma designs and extracting valuable information.

### Design Pattern Recognition

```typescript
async function detectDesignPatterns(imagePath) {
  const imageData = fs.readFileSync(imagePath);
  
  const result = await client.analyzeImage({
    image: imageData,
    features: ['patternRecognition']
  });
  
  console.log('Detected patterns:', result.patterns);
  
  // Identified patterns might include:
  // - Navigation bars
  // - Card layouts
  // - Form structures
  // - List views
  // - etc.
  
  return result.patterns;
}
```

### Accessibility Auditing

```typescript
async function checkAccessibility(imagePath) {
  const imageData = fs.readFileSync(imagePath);
  
  const result = await client.analyzeAccessibility({
    image: imageData,
    guidelines: 'wcag2.1'
  });
  
  console.log('Accessibility issues:', result.issues);
  
  // Issues might include:
  // - Color contrast problems
  // - Text size concerns
  // - Missing alternative text
  // - Input labeling issues
  // - etc.
  
  return result.issues;
}
```

### Design Token Extraction

```typescript
async function extractDesignTokens(imagePath) {
  const imageData = fs.readFileSync(imagePath);
  
  const result = await client.extractDesignTokens({
    image: imageData,
    tokenTypes: [
      'colors',
      'typography',
      'spacing',
      'radii'
    ]
  });
  
  console.log('Design tokens:', result.tokens);
  
  // Create a design tokens file
  const tokensJson = JSON.stringify(result.tokens, null, 2);
  fs.writeFileSync('design-tokens.json', tokensJson);
  
  return result.tokens;
}
```

## Image-to-Code Generation

Azure AI Foundry can convert Figma design images directly into code for different frameworks.

### Converting to React

```typescript
async function figmaToReact(imagePath, componentName) {
  const imageData = fs.readFileSync(imagePath);
  
  const result = await client.generateReactComponent({
    image: imageData,
    componentName: componentName,
    options: {
      styling: 'styled-components', // or 'css', 'tailwind', etc.
      typescript: true,
      responsiveness: true
    }
  });
  
  // Save the generated component
  fs.writeFileSync(`${componentName}.tsx`, result.componentCode);
  
  // Save styles if separate
  if (result.styleCode) {
    fs.writeFileSync(`${componentName}.styles.ts`, result.styleCode);
  }
  
  console.log(`React component ${componentName} generated successfully!`);
  
  return result;
}
```

### Converting to Angular

```typescript
async function figmaToAngular(imagePath, componentName) {
  const imageData = fs.readFileSync(imagePath);
  
  const result = await client.generateAngularComponent({
    image: imageData,
    componentName: componentName,
    options: {
      styling: 'scss',  // or 'css'
      typescript: true,
      responsive: true
    }
  });
  
  // Create a directory for the component
  if (!fs.existsSync(componentName)) {
    fs.mkdirSync(componentName);
  }
  
  // Save component files
  fs.writeFileSync(`${componentName}/${componentName}.component.ts`, result.componentCode);
  fs.writeFileSync(`${componentName}/${componentName}.component.html`, result.templateCode);
  fs.writeFileSync(`${componentName}/${componentName}.component.scss`, result.styleCode);
  
  console.log(`Angular component ${componentName} generated successfully!`);
  
  return result;
}
```

## Creating Custom AI Workflows

You can create complete workflows that combine multiple AI capabilities for end-to-end automation.

### Creating a Design Import Workflow

```typescript
// Define a workflow for processing multiple design screens
async function processDesignScreens(designFolder, outputFolder, framework) {
  // Get all image files in the design folder
  const files = fs.readdirSync(designFolder)
    .filter(file => file.endsWith('.png') || file.endsWith('.jpg'));
  
  // Create output folder if it doesn't exist
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }
  
  // Process each design file
  for (const file of files) {
    const imagePath = path.join(designFolder, file);
    const componentName = file.split('.')[0]; // Use filename as component name
    
    console.log(`Processing ${componentName}...`);
    
    try {
      // Step 1: Analyze the design
      const analysisResult = await analyzeDesign(imagePath);
      
      // Step 2: Extract design tokens
      const designTokens = await extractDesignTokens(imagePath);
      
      // Step 3: Check accessibility
      const accessibilityIssues = await checkAccessibility(imagePath);
      
      // Step 4: Generate code for the appropriate framework
      let generatedCode;
      if (framework === 'react') {
        generatedCode = await figmaToReact(imagePath, componentName);
      } else if (framework === 'angular') {
        generatedCode = await figmaToAngular(imagePath, componentName);
      }
      
      // Step 5: Save a report with analysis results
      const report = {
        componentName,
        analysis: analysisResult,
        designTokens,
        accessibilityIssues,
        timestamp: new Date().toISOString()
      };
      
      fs.writeFileSync(
        path.join(outputFolder, `${componentName}-report.json`),
        JSON.stringify(report, null, 2)
      );
      
      console.log(`Completed processing ${componentName}`);
    } catch (error) {
      console.error(`Error processing ${componentName}:`, error);
    }
  }
  
  console.log('Design processing workflow complete!');
}
```

### Code Generation Pipeline

```typescript
// Define a workflow for generating and optimizing code
async function codeGenerationPipeline(designSpec, framework, outputPath) {
  // Step 1: Generate initial code
  const initialCode = await generateCode(designSpec, framework);
  
  // Step 2: Analyze the generated code for quality
  const codeQualityAnalysis = await client.analyzeCodeQuality({
    code: initialCode,
    language: framework === 'react' ? 'typescript' : 'typescript',
    framework: framework
  });
  
  // Step 3: Optimize based on analysis
  const optimizedCode = await client.optimizeCode({
    code: initialCode,
    qualityAnalysis: codeQualityAnalysis,
    optimizationGoals: [
      'performance',
      'accessibility',
      'maintainability'
    ]
  });
  
  // Step 4: Generate unit tests
  const unitTests = await client.generateTests({
    code: optimizedCode,
    framework: framework,
    testingFramework: framework === 'react' ? 'jest' : 'jasmine'
  });
  
  // Step 5: Save the results
  fs.writeFileSync(`${outputPath}/component.${framework === 'react' ? 'tsx' : 'ts'}`, optimizedCode);
  fs.writeFileSync(`${outputPath}/component.test.${framework === 'react' ? 'tsx' : 'ts'}`, unitTests);
  fs.writeFileSync(`${outputPath}/quality-report.json`, JSON.stringify(codeQualityAnalysis, null, 2));
  
  console.log('Code generation pipeline complete!');
  return {
    code: optimizedCode,
    tests: unitTests,
    qualityReport: codeQualityAnalysis
  };
}
```

### Quality Check Process

```typescript
// Define a workflow for checking code quality
async function qualityCheckProcess(codeFolder, framework) {
  // Get all code files in the folder
  const filePattern = framework === 'react' 
    ? /\.tsx?$/ 
    : /\.component\.ts$/;
  
  const files = fs.readdirSync(codeFolder)
    .filter(file => filePattern.test(file));
  
  const qualityReports = [];
  
  // Process each code file
  for (const file of files) {
    const filePath = path.join(codeFolder, file);
    const code = fs.readFileSync(filePath, 'utf8');
    
    console.log(`Checking quality for ${file}...`);
    
    try {
      // Step 1: Analyze code quality
      const qualityAnalysis = await client.analyzeCodeQuality({
        code: code,
        language: 'typescript',
        framework: framework
      });
      
      // Step 2: Check for accessibility issues
      const accessibilityCheck = await client.checkAccessibility({
        code: code,
        framework: framework
      });
      
      // Step 3: Performance analysis
      const performanceAnalysis = await client.analyzePerformance({
        code: code,
        framework: framework
      });
      
      // Step 4: Combine reports
      const report = {
        file,
        quality: qualityAnalysis,
        accessibility: accessibilityCheck,
        performance: performanceAnalysis,
        timestamp: new Date().toISOString()
      };
      
      qualityReports.push(report);
      
      // Step 5: Save individual report
      fs.writeFileSync(
        path.join(codeFolder, `${file.split('.')[0]}-quality.json`),
        JSON.stringify(report, null, 2)
      );
      
      console.log(`Completed quality check for ${file}`);
    } catch (error) {
      console.error(`Error checking ${file}:`, error);
    }
  }
  
  // Save overall report
  fs.writeFileSync(
    path.join(codeFolder, 'quality-summary.json'),
    JSON.stringify({
      framework,
      totalFiles: files.length,
      reports: qualityReports,
      timestamp: new Date().toISOString()
    }, null, 2)
  );
  
  console.log('Quality check process complete!');
  return qualityReports;
}
```

## Performance and Cost Optimization

### Batch Processing for Efficiency

Instead of processing images one by one, use batch processing to improve performance and reduce costs:

```typescript
async function batchProcessDesigns(designFolder, outputFolder, framework) {
  // Get all image files
  const files = fs.readdirSync(designFolder)
    .filter(file => file.endsWith('.png') || file.endsWith('.jpg'));
  
  // Prepare batch request
  const batch = files.map(file => {
    const imagePath = path.join(designFolder, file);
    const imageData = fs.readFileSync(imagePath);
    
    return {
      id: file,
      image: imageData,
      features: ['componentDetection', 'accessibilityCheck', 'colorAnalysis']
    };
  });
  
  // Send batch request
  const results = await client.batchAnalyzeImages({
    images: batch
  });
  
  // Process batch results
  for (const result of results) {
    const componentName = result.id.split('.')[0];
    
    // Generate code based on analysis
    const generatedCode = await generateCode(result, framework);
    
    // Save the generated code
    fs.writeFileSync(
      path.join(outputFolder, `${componentName}.${framework === 'react' ? 'jsx' : 'component.ts'}`),
      generatedCode
    );
    
    console.log(`Generated code for ${componentName}`);
  }
  
  console.log('Batch processing complete!');
  return results;
}
```

### Caching Results for Repeated Operations

Implement caching to avoid redundant API calls:

```typescript
// Simple cache implementation
const cache = new Map();

async function cachedAnalyzeDesign(imagePath) {
  // Create a hash of the image for cache key
  const imageData = fs.readFileSync(imagePath);
  const hash = crypto.createHash('md5').update(imageData).digest('hex');
  
  // Check if we have a cached result
  if (cache.has(hash)) {
    console.log('Using cached result for', imagePath);
    return cache.get(hash);
  }
  
  // If not, call the API
  console.log('Calling API for', imagePath);
  const result = await client.analyzeImage({
    image: imageData,
    features: ['componentDetection', 'accessibilityCheck', 'colorAnalysis']
  });
  
  // Cache the result
  cache.set(hash, result);
  
  // Optionally save cache to disk for persistence
  fs.writeFileSync(
    'analysis-cache.json',
    JSON.stringify(Array.from(cache.entries()), null, 2)
  );
  
  return result;
}
```

### Cost Monitoring and Alerts

Set up monitoring to track your Azure AI usage and costs:

1. **Enable Cost Management**:
   - Go to your Azure portal
   - Navigate to "Cost Management + Billing"
   - Select your subscription
   - Click on "Cost analysis"

2. **Set up budget alerts**:
   - Click on "Budgets"
   - Create a new budget for your AI resources
   - Set a monthly limit
   - Configure alerts at different thresholds (e.g., 50%, 75%, 90%)

3. **Monitor usage programmatically**:
   ```typescript
   async function checkUsage() {
     // Get current usage statistics
     const usage = await client.getUsageStatistics();
     
     console.log('Current usage:', usage);
     
     // Check if approaching limits
     if (usage.percentageUsed > 80) {
       // Send notification
       console.warn('WARNING: API usage at over 80% of monthly quota!');
       
       // Implement notification logic (email, Slack, etc.)
     }
     
     return usage;
   }
   ```

## Real-World Examples

### Case Study: E-commerce Product Page

This example shows how to process an e-commerce product page design:

```typescript
async function processEcommerceProductPage(imagePath) {
  // Step 1: Analyze the design
  const analysis = await analyzeDesign(imagePath);
  
  // Step 2: Identify key components
  const components = analysis.components;
  
  // Step 3: Extract product information regions
  const productImageRegion = components.find(c => c.type === 'productImage');
  const productInfoRegion = components.find(c => c.type === 'productInfo');
  const pricingRegion = components.find(c => c.type === 'pricing');
  
  // Step 4: Generate React component for each region
  const productImageComponent = await generateRegionCode(productImageRegion, 'react', 'ProductGallery');
  const productInfoComponent = await generateRegionCode(productInfoRegion, 'react', 'ProductDetails');
  const pricingComponent = await generateRegionCode(pricingRegion, 'react', 'ProductPricing');
  
  // Step 5: Generate container component
  const productPageComponent = `
import React from 'react';
import ProductGallery from './ProductGallery';
import ProductDetails from './ProductDetails';
import ProductPricing from './ProductPricing';

const ProductPage = ({ product }) => {
  return (
    <div className="product-page">
      <div className="product-page__gallery">
        <ProductGallery images={product.images} />
      </div>
      <div className="product-page__info">
        <ProductDetails 
          title={product.title}
          description={product.description}
          features={product.features}
        />
        <ProductPricing 
          price={product.price}
          discount={product.discount}
          availability={product.availability}
        />
      </div>
    </div>
  );
};

export default ProductPage;
  `;
  
  // Step 6: Save all components
  const outputFolder = 'product-page-components';
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
  }
  
  fs.writeFileSync(`${outputFolder}/ProductGallery.jsx`, productImageComponent);
  fs.writeFileSync(`${outputFolder}/ProductDetails.jsx`, productInfoComponent);
  fs.writeFileSync(`${outputFolder}/ProductPricing.jsx`, pricingComponent);
  fs.writeFileSync(`${outputFolder}/ProductPage.jsx`, productPageComponent);
  
  console.log('Product page components generated successfully!');
}

// Helper function to generate code for a specific region
async function generateRegionCode(region, framework, componentName) {
  // Extract region as image
  const regionImage = extractRegionImage(region);
  
  // Generate code for this region
  const result = await client.generateComponentForRegion({
    image: regionImage,
    framework: framework,
    componentName: componentName
  });
  
  return result.code;
}
```

### Case Study: Dashboard Layout

This example shows how to process a dashboard layout design:

```typescript
async function processDashboardLayout(imagePath) {
  // Step 1: Analyze the layout
  const layoutAnalysis = await client.analyzeLayout({
    image: fs.readFileSync(imagePath),
    features: ['gridDetection', 'componentIdentification']
  });
  
  // Step 2: Extract layout structure
  const { grid, components } = layoutAnalysis;
  
  // Step 3: Generate layout container
  const layoutCode = await client.generateLayoutCode({
    layout: grid,
    framework: 'react',
    styling: 'tailwind',
    responsive: true
  });
  
  // Step 4: Generate individual widget components
  const widgetComponents = {};
  
  for (const component of components) {
    const componentName = `${capitalize(component.type)}Widget`;
    
    const componentCode = await client.generateWidgetCode({
      widget: component,
      framework: 'react',
      componentName: componentName,
      styling: 'tailwind'
    });
    
    widgetComponents[componentName] = componentCode;
  }
  
  // Step 5: Generate dashboard container component
  const imports = Object.keys(widgetComponents)
    .map(name => `import ${name} from './${name}';`)
    .join('\n');
  
  const dashboardComponent = `
import React from 'react';
${imports}

const Dashboard = ({ data }) => {
  return (
    ${layoutCode}
  );
};

export default Dashboard;
  `;
  
  // Step 6: Save all components
  const outputFolder = 'dashboard-components';
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
  }
  
  fs.writeFileSync(`${outputFolder}/Dashboard.jsx`, dashboardComponent);
  
  for (const [name, code] of Object.entries(widgetComponents)) {
    fs.writeFileSync(`${outputFolder}/${name}.jsx`, code);
  }
  
  console.log('Dashboard components generated successfully!');
}

// Helper function to capitalize first letter
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
```

## Next Steps

With Azure AI Foundry integrated into your workflow, you're ready to implement specific frameworks for your design-to-code conversion. Continue to the [Framework Implementation: React](../05-react/README.md) guide for detailed instructions on implementing React components. 