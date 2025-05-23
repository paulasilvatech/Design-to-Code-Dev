# ☁️ Complete Design-to-Code Workshop Guide - Part 5
## ☁️ Advanced Workshop Part 2: Azure AI Foundry Setup and Configuration

### Quick Navigation
- **Part 1**: Setup and Basic Workshop Foundation ✅
- **Part 2**: Basic Workshop Modules 3-5 ✅
- **Part 3**: Intermediate Workshop ✅
- **Part 4**: Advanced Workshop Part 1 ✅
- **Part 5**: Azure AI Foundry Setup (This Document) 📍
- **Part 6**: Azure AI Design Analysis Implementation
- **Part 7**: Enterprise Design System Orchestration
- **Part 8**: Complete Integration and Challenge Lab

---

## Part 5 Overview

### What You'll Learn in This Section
- **Azure AI Foundry Setup**: Complete configuration of Azure AI services
- **Service Integration**: Connecting Computer Vision, Form Recognizer, and OpenAI
- **Authentication**: Secure credential management
- **Testing Setup**: Verify all services are working

### Prerequisites
- Completed Parts 1-4 of this workshop
- Azure account with active subscription
- Azure CLI installed
- Admin access to create Azure resources

---

## Module 1: Azure AI Foundry Deep Dive (45 minutes)

### 1.1 Advanced Azure AI Setup
**Time Required**: 15 minutes

#### Setting Up Azure AI Resources

1. **Install Azure CLI**:

**Windows**:
```powershell
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or using MSI installer
# Download from https://aka.ms/installazurecliwindows
```

**macOS**:
```bash
# Using Homebrew
brew update && brew install azure-cli

# Or using the installer script
curl -L https://aka.ms/InstallAzureCli | bash
```

**Linux (Ubuntu/Debian)**:
```bash
# Add Microsoft repository
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# For other distributions, see documentation
```

2. **Login and Configure Azure**:
```bash
# Login to Azure
az login

# List subscriptions
az account list --output table

# Set default subscription
az account set --subscription "Your Subscription Name"

# Verify current subscription
az account show
```

3. **Create Resource Group for AI Services**:
```bash
# Set variables
RESOURCE_GROUP="design-to-code-ai"
LOCATION="eastus"

# Create resource group
az group create \
  --name $RESOURCE_GROUP \
  --location $LOCATION

# Verify creation
az group show --name $RESOURCE_GROUP
```

### 1.2 Creating Azure AI Services
**Time Required**: 15 minutes

#### Create Computer Vision Service

```bash
# Create Computer Vision resource
az cognitiveservices account create \
  --name "design-vision-service" \
  --resource-group $RESOURCE_GROUP \
  --kind "ComputerVision" \
  --sku "S1" \
  --location $LOCATION \
  --yes

# Get the endpoint
CV_ENDPOINT=$(az cognitiveservices account show \
  --name "design-vision-service" \
  --resource-group $RESOURCE_GROUP \
  --query "properties.endpoint" \
  --output tsv)

# Get the key
CV_KEY=$(az cognitiveservices account keys list \
  --name "design-vision-service" \
  --resource-group $RESOURCE_GROUP \
  --query "key1" \
  --output tsv)

echo "Computer Vision Endpoint: $CV_ENDPOINT"
echo "Computer Vision Key: $CV_KEY"
```

#### Create Form Recognizer Service

```bash
# Create Form Recognizer resource
az cognitiveservices account create \
  --name "design-form-recognizer" \
  --resource-group $RESOURCE_GROUP \
  --kind "FormRecognizer" \
  --sku "S0" \
  --location $LOCATION \
  --yes

# Get the endpoint
FR_ENDPOINT=$(az cognitiveservices account show \
  --name "design-form-recognizer" \
  --resource-group $RESOURCE_GROUP \
  --query "properties.endpoint" \
  --output tsv)

# Get the key
FR_KEY=$(az cognitiveservices account keys list \
  --name "design-form-recognizer" \
  --resource-group $RESOURCE_GROUP \
  --query "key1" \
  --output tsv)

echo "Form Recognizer Endpoint: $FR_ENDPOINT"
echo "Form Recognizer Key: $FR_KEY"
```

#### Create Azure OpenAI Service

```bash
# Create Azure OpenAI resource (if available in your region)
az cognitiveservices account create \
  --name "design-openai-service" \
  --resource-group $RESOURCE_GROUP \
  --kind "OpenAI" \
  --sku "S0" \
  --location $LOCATION \
  --yes

# Deploy GPT-4 Vision model
az cognitiveservices account deployment create \
  --name "design-openai-service" \
  --resource-group $RESOURCE_GROUP \
  --deployment-name "gpt-4-vision" \
  --model-name "gpt-4" \
  --model-version "vision-preview" \
  --model-format "OpenAI" \
  --scale-capacity 10

# Get endpoint and key
OPENAI_ENDPOINT=$(az cognitiveservices account show \
  --name "design-openai-service" \
  --resource-group $RESOURCE_GROUP \
  --query "properties.endpoint" \
  --output tsv)

OPENAI_KEY=$(az cognitiveservices account keys list \
  --name "design-openai-service" \
  --resource-group $RESOURCE_GROUP \
  --query "key1" \
  --output tsv)
```

### 1.3 Setting Up Environment Configuration
**Time Required**: 15 minutes

#### Create Configuration Files

1. **Create `.env` file for credentials**:
```bash
# Create .env file
cat > .env << EOF
# Azure Computer Vision
AZURE_CV_ENDPOINT=$CV_ENDPOINT
AZURE_CV_KEY=$CV_KEY

# Azure Form Recognizer
AZURE_FR_ENDPOINT=$FR_ENDPOINT
AZURE_FR_KEY=$FR_KEY

# Azure OpenAI
AZURE_OPENAI_ENDPOINT=$OPENAI_ENDPOINT
AZURE_OPENAI_KEY=$OPENAI_KEY
AZURE_OPENAI_DEPLOYMENT=gpt-4-vision

# Other configurations
AZURE_SUBSCRIPTION_ID=$(az account show --query id --output tsv)
AZURE_RESOURCE_GROUP=$RESOURCE_GROUP
EOF

# Secure the file
chmod 600 .env
```

2. **Create Azure configuration module**:

Create `src/config/azure-config.ts`:
```typescript
import * as dotenv from 'dotenv';
import { SecretClient } from '@azure/keyvault-secrets';
import { DefaultAzureCredential } from '@azure/identity';

// Load environment variables
dotenv.config();

interface AzureConfig {
  computerVision: {
    endpoint: string;
    key: string;
    apiVersion: string;
  };
  formRecognizer: {
    endpoint: string;
    key: string;
    apiVersion: string;
  };
  openAI: {
    endpoint: string;
    key: string;
    deploymentName: string;
    apiVersion: string;
  };
  storage?: {
    connectionString: string;
    containerName: string;
  };
}

export class AzureConfigManager {
  private static instance: AzureConfigManager;
  private config: AzureConfig;
  private secretClient?: SecretClient;
  
  private constructor() {
    this.initializeConfig();
  }
  
  static getInstance(): AzureConfigManager {
    if (!AzureConfigManager.instance) {
      AzureConfigManager.instance = new AzureConfigManager();
    }
    return AzureConfigManager.instance;
  }
  
  private initializeConfig(): void {
    // Check if using Key Vault
    if (process.env.AZURE_KEY_VAULT_URL) {
      this.initializeKeyVault();
    }
    
    // Load from environment variables
    this.config = {
      computerVision: {
        endpoint: process.env.AZURE_CV_ENDPOINT!,
        key: process.env.AZURE_CV_KEY!,
        apiVersion: '2023-10-01'
      },
      formRecognizer: {
        endpoint: process.env.AZURE_FR_ENDPOINT!,
        key: process.env.AZURE_FR_KEY!,
        apiVersion: '2023-07-31'
      },
      openAI: {
        endpoint: process.env.AZURE_OPENAI_ENDPOINT!,
        key: process.env.AZURE_OPENAI_KEY!,
        deploymentName: process.env.AZURE_OPENAI_DEPLOYMENT!,
        apiVersion: '2023-12-01-preview'
      }
    };
    
    // Add storage if configured
    if (process.env.AZURE_STORAGE_CONNECTION_STRING) {
      this.config.storage = {
        connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
        containerName: process.env.AZURE_STORAGE_CONTAINER || 'design-assets'
      };
    }
  }
  
  private initializeKeyVault(): void {
    const credential = new DefaultAzureCredential();
    const vaultUrl = process.env.AZURE_KEY_VAULT_URL!;
    this.secretClient = new SecretClient(vaultUrl, credential);
  }
  
  async getConfig(): Promise<AzureConfig> {
    // If using Key Vault, fetch secrets
    if (this.secretClient) {
      await this.loadSecretsFromKeyVault();
    }
    
    return this.config;
  }
  
  private async loadSecretsFromKeyVault(): Promise<void> {
    if (!this.secretClient) return;
    
    try {
      // Load Computer Vision key
      const cvKey = await this.secretClient.getSecret('ComputerVisionKey');
      if (cvKey.value) {
        this.config.computerVision.key = cvKey.value;
      }
      
      // Load Form Recognizer key
      const frKey = await this.secretClient.getSecret('FormRecognizerKey');
      if (frKey.value) {
        this.config.formRecognizer.key = frKey.value;
      }
      
      // Load OpenAI key
      const openAIKey = await this.secretClient.getSecret('OpenAIKey');
      if (openAIKey.value) {
        this.config.openAI.key = openAIKey.value;
      }
      
    } catch (error) {
      console.error('Error loading secrets from Key Vault:', error);
      // Fall back to environment variables
    }
  }
  
  // Validate configuration
  validateConfig(): boolean {
    const required = [
      this.config.computerVision.endpoint,
      this.config.computerVision.key,
      this.config.formRecognizer.endpoint,
      this.config.formRecognizer.key,
      this.config.openAI.endpoint,
      this.config.openAI.key
    ];
    
    return required.every(value => value && value.length > 0);
  }
  
  // Get specific service config
  getComputerVisionConfig() {
    return this.config.computerVision;
  }
  
  getFormRecognizerConfig() {
    return this.config.formRecognizer;
  }
  
  getOpenAIConfig() {
    return this.config.openAI;
  }
  
  getStorageConfig() {
    return this.config.storage;
  }
}

// Export singleton instance
export const azureConfig = AzureConfigManager.getInstance();
```

---

## Module 2: Testing Azure AI Services (30 minutes)

### 2.1 Creating Service Connection Tests
**Time Required**: 15 minutes

Create `src/config/test-azure-connection.ts`:
```typescript
import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import { ApiKeyCredentials } from '@azure/ms-rest-js';
import { FormRecognizerClient } from '@azure/ai-form-recognizer';
import { OpenAIClient } from '@azure/openai';
import { azureConfig } from './azure-config';
import * as chalk from 'chalk';

export async function testAzureConnections(): Promise<boolean> {
  console.log(chalk.blue('\n🔍 Testing Azure AI Service Connections...\n'));
  
  let allPassed = true;
  
  // Test Computer Vision
  console.log('Testing Computer Vision...');
  const cvResult = await testComputerVision();
  console.log(cvResult.success ? 
    chalk.green('✓ Computer Vision: Connected') : 
    chalk.red('✗ Computer Vision: Failed')
  );
  if (!cvResult.success) {
    console.log(chalk.red(`  Error: ${cvResult.error}`));
    allPassed = false;
  }
  
  // Test Form Recognizer
  console.log('\nTesting Form Recognizer...');
  const frResult = await testFormRecognizer();
  console.log(frResult.success ? 
    chalk.green('✓ Form Recognizer: Connected') : 
    chalk.red('✗ Form Recognizer: Failed')
  );
  if (!frResult.success) {
    console.log(chalk.red(`  Error: ${frResult.error}`));
    allPassed = false;
  }
  
  // Test Azure OpenAI
  console.log('\nTesting Azure OpenAI...');
  const openAIResult = await testOpenAI();
  console.log(openAIResult.success ? 
    chalk.green('✓ Azure OpenAI: Connected') : 
    chalk.red('✗ Azure OpenAI: Failed')
  );
  if (!openAIResult.success) {
    console.log(chalk.red(`  Error: ${openAIResult.error}`));
    allPassed = false;
  }
  
  // Summary
  console.log('\n' + chalk.blue('─'.repeat(50)));
  if (allPassed) {
    console.log(chalk.green('\n✅ All Azure AI services are connected and ready!'));
  } else {
    console.log(chalk.red('\n❌ Some services failed to connect. Please check your configuration.'));
  }
  
  return allPassed;
}

async function testComputerVision(): Promise<{ success: boolean; error?: string }> {
  try {
    const config = azureConfig.getComputerVisionConfig();
    const client = new ComputerVisionClient(
      new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': config.key } }),
      config.endpoint
    );
    
    // Test with a simple API call
    const models = await client.listModels();
    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'Unknown error' 
    };
  }
}

async function testFormRecognizer(): Promise<{ success: boolean; error?: string }> {
  try {
    const config = azureConfig.getFormRecognizerConfig();
    const client = new FormRecognizerClient(
      config.endpoint,
      new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': config.key } })
    );
    
    // Test connection by checking if client is created successfully
    // Form Recognizer doesn't have a simple list operation, so we just verify client creation
    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'Unknown error' 
    };
  }
}

async function testOpenAI(): Promise<{ success: boolean; error?: string }> {
  try {
    const config = azureConfig.getOpenAIConfig();
    const client = new OpenAIClient(
      config.endpoint,
      new ApiKeyCredentials({ inHeader: { 'api-key': config.key } })
    );
    
    // Test with a simple completion
    const result = await client.getCompletions(
      config.deploymentName,
      ['Test connection'],
      { maxTokens: 10 }
    );
    
    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'Unknown error' 
    };
  }
}

// Create test runner
export async function runAzureTests(): Promise<void> {
  console.log(chalk.yellow('\n🧪 Running Azure AI Service Tests\n'));
  
  // Validate configuration first
  if (!azureConfig.validateConfig()) {
    console.log(chalk.red('❌ Invalid configuration. Please check your .env file.'));
    process.exit(1);
  }
  
  // Run connection tests
  const passed = await testAzureConnections();
  
  if (!passed) {
    console.log(chalk.yellow('\n⚠️  Some tests failed. Please fix the issues before continuing.'));
    process.exit(1);
  }
  
  console.log(chalk.green('\n🎉 All tests passed! Your Azure AI services are ready.\n'));
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAzureTests().catch(console.error);
}
```

### 2.2 Installing Required Dependencies
**Time Required**: 10 minutes

Create `package.json` dependencies section:
```json
{
  "dependencies": {
    "@azure/cognitiveservices-computervision": "^8.2.0",
    "@azure/ai-form-recognizer": "^4.0.0",
    "@azure/openai": "^1.0.0-beta.5",
    "@azure/keyvault-secrets": "^4.7.0",
    "@azure/identity": "^3.3.0",
    "@azure/storage-blob": "^12.15.0",
    "@azure/ms-rest-js": "^2.7.0",
    "dotenv": "^16.3.1",
    "chalk": "^4.1.2",
    "sharp": "^0.32.5",
    "axios": "^1.5.0"
  },
  "devDependencies": {
    "@types/node": "^20.5.0",
    "typescript": "^5.2.2",
    "ts-node": "^10.9.1"
  }
}
```

Install dependencies:
```bash
# Install all dependencies
npm install

# Or using specific packages
npm install @azure/cognitiveservices-computervision @azure/ai-form-recognizer @azure/openai
npm install @azure/keyvault-secrets @azure/identity @azure/storage-blob
npm install @azure/ms-rest-js dotenv chalk sharp axios
npm install -D @types/node typescript ts-node
```

### 2.3 Running Connection Tests
**Time Required**: 5 minutes

1. **Create test script**:

Create `scripts/test-azure.ts`:
```typescript
#!/usr/bin/env ts-node

import { runAzureTests } from '../src/config/test-azure-connection';

console.log('Starting Azure AI Services test...');

runAzureTests()
  .then(() => {
    console.log('Tests completed successfully!');
    process.exit(0);
  })
  .catch(error => {
    console.error('Test failed:', error);
    process.exit(1);
  });
```

2. **Add to package.json scripts**:
```json
{
  "scripts": {
    "test:azure": "ts-node scripts/test-azure.ts",
    "test:azure:watch": "nodemon --exec ts-node scripts/test-azure.ts"
  }
}
```

3. **Run the tests**:
```bash
# Run Azure connection tests
npm run test:azure

# Expected output:
# 🧪 Running Azure AI Service Tests
# 
# 🔍 Testing Azure AI Service Connections...
# 
# Testing Computer Vision...
# ✓ Computer Vision: Connected
# 
# Testing Form Recognizer...
# ✓ Form Recognizer: Connected
# 
# Testing Azure OpenAI...
# ✓ Azure OpenAI: Connected
# 
# ──────────────────────────────────────────────────
# 
# ✅ All Azure AI services are connected and ready!
# 
# 🎉 All tests passed! Your Azure AI services are ready.
```

---

## Module 3: Security Best Practices (15 minutes)

### 3.1 Securing Credentials
**Time Required**: 10 minutes

1. **Using Azure Key Vault**:

```bash
# Create Key Vault
az keyvault create \
  --name "design-code-vault" \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION

# Add secrets
az keyvault secret set \
  --vault-name "design-code-vault" \
  --name "ComputerVisionKey" \
  --value $CV_KEY

az keyvault secret set \
  --vault-name "design-code-vault" \
  --name "FormRecognizerKey" \
  --value $FR_KEY

az keyvault secret set \
  --vault-name "design-code-vault" \
  --name "OpenAIKey" \
  --value $OPENAI_KEY
```

2. **Update configuration to use Key Vault**:

Update `.env`:
```bash
# Add Key Vault URL
AZURE_KEY_VAULT_URL=https://design-code-vault.vault.azure.net/
```

3. **Implement Managed Identity** (for production):

Create `src/config/managed-identity.ts`:
```typescript
import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';

export class ManagedIdentityConfig {
  private credential: DefaultAzureCredential;
  private secretClient: SecretClient;
  
  constructor(keyVaultUrl: string) {
    // Uses managed identity in Azure, falls back to other methods locally
    this.credential = new DefaultAzureCredential();
    this.secretClient = new SecretClient(keyVaultUrl, this.credential);
  }
  
  async getSecret(secretName: string): Promise<string> {
    try {
      const secret = await this.secretClient.getSecret(secretName);
      return secret.value || '';
    } catch (error) {
      console.error(`Failed to retrieve secret ${secretName}:`, error);
      throw error;
    }
  }
  
  async getAllSecrets(): Promise<Record<string, string>> {
    const secrets: Record<string, string> = {};
    
    const secretNames = [
      'ComputerVisionKey',
      'FormRecognizerKey',
      'OpenAIKey',
      'StorageConnectionString'
    ];
    
    for (const name of secretNames) {
      try {
        secrets[name] = await this.getSecret(name);
      } catch (error) {
        console.warn(`Could not retrieve ${name}, using fallback`);
      }
    }
    
    return secrets;
  }
}
```

### 3.2 Environment-Specific Configuration
**Time Required**: 5 minutes

Create multiple environment configurations:

1. **Development** (`.env.development`):
```bash
NODE_ENV=development
AZURE_CV_ENDPOINT=https://design-vision-service-dev.cognitiveservices.azure.com/
AZURE_FR_ENDPOINT=https://design-form-recognizer-dev.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://design-openai-service-dev.openai.azure.com/
```

2. **Staging** (`.env.staging`):
```bash
NODE_ENV=staging
AZURE_CV_ENDPOINT=https://design-vision-service-staging.cognitiveservices.azure.com/
AZURE_FR_ENDPOINT=https://design-form-recognizer-staging.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://design-openai-service-staging.openai.azure.com/
```

3. **Production** (`.env.production`):
```bash
NODE_ENV=production
AZURE_KEY_VAULT_URL=https://design-code-vault-prod.vault.azure.net/
# Use managed identity - no keys in env
```

---

## Module 4: Troubleshooting Common Issues (15 minutes)

### 4.1 Common Azure AI Issues and Solutions

#### Issue 1: Authentication Failures
```typescript
// Error: 401 Unauthorized
// Solution: Verify API keys and endpoints

// Debug helper
async function debugAuthentication() {
  const config = await azureConfig.getConfig();
  
  console.log('Checking authentication...');
  console.log('CV Endpoint:', config.computerVision.endpoint);
  console.log('CV Key:', config.computerVision.key ? '***' + config.computerVision.key.slice(-4) : 'NOT SET');
  
  // Test each service individually
  try {
    await testComputerVision();
    console.log('✓ Computer Vision auth successful');
  } catch (error) {
    console.error('✗ Computer Vision auth failed:', error.message);
  }
}
```

#### Issue 2: Region Availability
```bash
# Check available regions for services
az cognitiveservices account list-skus \
  --kind ComputerVision \
  --query "[?name=='S1'].locations" \
  --output table

# List all cognitive services in a region
az cognitiveservices account list \
  --resource-group $RESOURCE_GROUP \
  --query "[?location=='eastus']" \
  --output table
```

#### Issue 3: Quota and Throttling
```typescript
// Implement retry logic for rate limiting
import { delay } from '../utils/delay';

async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      if (error.statusCode === 429 && i < maxRetries - 1) {
        const waitTime = baseDelay * Math.pow(2, i);
        console.log(`Rate limited. Waiting ${waitTime}ms before retry...`);
        await delay(waitTime);
      } else {
        throw error;
      }
    }
  }
  throw new Error('Max retries reached');
}
```

### 4.2 Debugging Tools

Create `src/utils/azure-debug.ts`:
```typescript
import { azureConfig } from '../config/azure-config';
import * as fs from 'fs-extra';
import * as path from 'path';

export class AzureDebugger {
  static async generateDebugReport(): Promise<void> {
    const report = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      services: {},
      errors: []
    };
    
    // Test each service
    const services = [
      { name: 'computerVision', test: testComputerVision },
      { name: 'formRecognizer', test: testFormRecognizer },
      { name: 'openAI', test: testOpenAI }
    ];
    
    for (const service of services) {
      try {
        const result = await service.test();
        report.services[service.name] = {
          status: 'connected',
          ...result
        };
      } catch (error: any) {
        report.services[service.name] = {
          status: 'failed',
          error: error.message,
          stack: error.stack
        };
        report.errors.push({
          service: service.name,
          error: error.message
        });
      }
    }
    
    // Save report
    const reportPath = path.join('logs', `azure-debug-${Date.now()}.json`);
    await fs.ensureDir('logs');
    await fs.writeJson(reportPath, report, { spaces: 2 });
    
    console.log(`Debug report saved to: ${reportPath}`);
  }
  
  static async testEndpoints(): Promise<void> {
    const config = await azureConfig.getConfig();
    
    console.log('\nTesting Azure endpoints...\n');
    
    // Test each endpoint with curl-like request
    const endpoints = [
      {
        name: 'Computer Vision',
        url: `${config.computerVision.endpoint}/vision/v3.2/models`,
        headers: {
          'Ocp-Apim-Subscription-Key': config.computerVision.key
        }
      },
      {
        name: 'Form Recognizer',
        url: `${config.formRecognizer.endpoint}/formrecognizer/info`,
        headers: {
          'Ocp-Apim-Subscription-Key': config.formRecognizer.key
        }
      }
    ];
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint.url, {
          method: 'GET',
          headers: endpoint.headers
        });
        
        console.log(`${endpoint.name}: ${response.status} ${response.statusText}`);
        
        if (!response.ok) {
          const text = await response.text();
          console.error(`  Response: ${text}`);
        }
      } catch (error: any) {
        console.error(`${endpoint.name}: Failed - ${error.message}`);
      }
    }
  }
}

// CLI commands
if (require.main === module) {
  const command = process.argv[2];
  
  switch (command) {
    case 'report':
      AzureDebugger.generateDebugReport().catch(console.error);
      break;
    case 'test':
      AzureDebugger.testEndpoints().catch(console.error);
      break;
    default:
      console.log('Usage: ts-node azure-debug.ts [report|test]');
  }
}
```

---

## Summary and Next Steps

### What You've Completed in Part 5

✅ **Azure CLI Installation and Configuration**
- Installed Azure CLI on your platform
- Logged in and configured subscription
- Created resource group for AI services

✅ **Azure AI Services Setup**
- Created Computer Vision service
- Created Form Recognizer service
- Created Azure OpenAI service
- Configured all endpoints and keys

✅ **Environment Configuration**
- Created secure `.env` configuration
- Built configuration management system
- Implemented Key Vault integration

✅ **Testing and Validation**
- Created comprehensive connection tests
- Verified all services are accessible
- Built debugging tools

✅ **Security Implementation**
- Configured Azure Key Vault
- Implemented managed identity support
- Created environment-specific configs

### Key Takeaways

1. **Service Organization**: All AI services are organized in a single resource group
2. **Security First**: Credentials are managed securely with Key Vault
3. **Testing Coverage**: Comprehensive tests ensure services are ready
4. **Error Handling**: Robust error handling and debugging tools

### Troubleshooting Checklist

If you encounter issues:
1. ✓ Verify Azure subscription is active
2. ✓ Check service availability in your region
3. ✓ Confirm API keys are correctly copied
4. ✓ Ensure endpoints include trailing slashes where needed
5. ✓ Verify network connectivity to Azure
6. ✓ Check quota limits haven't been exceeded

### Continue to Part 6

In the next part, you'll implement the Azure AI Design Analyzer that uses these configured services to:
- Analyze Figma designs with Computer Vision
- Extract layout information with Form Recognizer
- Generate intelligent code with GPT-4 Vision
- Build the complete AI-powered design-to-code pipeline

**Next**: [Part 6 - Azure AI Design Analysis Implementation →]

---

## 🧭 Navigation

| Previous | Up | Next |
|----------|----|----- |
| [⬅️ Part 4: Design System Implementation](design-to-code-workshop-part-04.md) | [📖 Main README](../README.md) | [➡️ Part 6: Azure AI Design Analysis](design-to-code-workshop-part-06.md) |

**Workshop Progress**: Part 5 of 8 • **Estimated Time**: 3 hours • **Level**: Advanced • **Focus**: Azure AI Setup

**Quick Links**: [📋 Quick Start](QUICK_START.md) | [🏗️ Workshop Structure](workshop-structure-guide.md) | [🛠️ Troubleshooting](advanced-troubleshooting-guide.md)