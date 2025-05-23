# 🚀 Design-to-Code Workshop Resources

This directory contains all the necessary scripts, templates, and configuration files to set up and run the Design-to-Code Workshop with Azure AI services.

## 📁 Directory Contents

### 🔧 Setup Scripts
- **`01-azure-setup.sh`** - Complete Azure resource creation script
- **`02-test-connections.sh`** - Connection testing and validation script  
- **`03-cleanup.sh`** - Resource cleanup and removal script

### 📄 Configuration Templates
- **`.env.template`** - Environment variables template
- **`azure-ai-config.template.ts`** - TypeScript configuration manager
- **`azure-ai-analyzer.template.ts`** - AI design analyzer implementation
- **`package.json`** - Node.js dependencies and scripts

## 🚀 Quick Start

### Prerequisites
- Azure subscription with sufficient credits
- Azure CLI installed and configured
- Node.js 18+ and npm 9+
- Bash shell (Linux/macOS/WSL)

### Setup Process

1. **Clone and Navigate**
   ```bash
   git clone https://github.com/YourUsername/Design-to-Code-Dev.git
   cd Design-to-Code-Dev/resources
   ```

2. **Run Azure Setup**
   ```bash
   chmod +x *.sh
   ./01-azure-setup.sh YOUR_SUBSCRIPTION_ID
   ```

3. **Test Connections**
   ```bash
   ./02-test-connections.sh
   ```

4. **Install Dependencies**
   ```bash
   npm install
   ```

## 🔑 Azure Resources Created

The setup script creates these Azure resources:

| Service | Resource Name | SKU | Purpose |
|---------|---------------|-----|---------|
| **Resource Group** | `design-to-code-workshop` | - | Container for all resources |
| **Computer Vision** | `design-vision-service` | S1 | Image analysis and object detection |
| **Form Recognizer** | `design-form-recognizer` | S0 | Layout and structure analysis |
| **Azure OpenAI** | `design-openai-service` | S0 | GPT-4 Vision for semantic analysis |
| **Key Vault** | `dtc-keyvault-{timestamp}` | Standard | Secure credential storage |

### 💰 Estimated Costs

| Service | Monthly Cost (USD) | Usage Pattern |
|---------|-------------------|---------------|
| Computer Vision S1 | ~$1-10 | 1,000-10,000 transactions |
| Form Recognizer S0 | ~$50-150 | 500-1,500 pages |
| Azure OpenAI S0 | ~$10-100 | 10k-100k tokens |
| Key Vault | ~$0.03 | 10,000 operations |

> **Note**: Azure OpenAI requires special access approval. The script will continue with other services if unavailable.

## 📋 Environment Configuration

### Required Variables
```bash
# Core Azure Services
AZURE_CV_ENDPOINT=https://design-vision-service.cognitiveservices.azure.com/
AZURE_CV_KEY=your-computer-vision-key
AZURE_FR_ENDPOINT=https://design-form-recognizer.cognitiveservices.azure.com/
AZURE_FR_KEY=your-form-recognizer-key

# AI/OpenAI Service
AZURE_OPENAI_ENDPOINT=https://design-openai-service.openai.azure.com/
AZURE_OPENAI_KEY=your-azure-openai-key
# OR as fallback:
OPENAI_API_KEY=your-openai-api-key

# Key Vault
KEYVAULT_NAME=dtc-keyvault-timestamp
```

### Optional Variables
```bash
# GitHub Integration
GITHUB_TOKEN=your-github-token
FIGMA_ACCESS_TOKEN=your-figma-token

# Development Settings
DEBUG=true
NODE_ENV=development
OUTPUT_FRAMEWORK=react
```

## 🧪 Testing and Validation

### Connection Testing
```bash
# Test all services
./02-test-connections.sh

# Expected output:
# ✅ Computer Vision: Connected and working
# ✅ Form Recognizer: Connected and working  
# ✅ Azure OpenAI: Connected and working
# ✅ Key Vault: Access confirmed
# ✅ Workshop functionality: Ready
```

### Manual Testing
```bash
# Test Computer Vision API
curl -X POST "$AZURE_CV_ENDPOINT/vision/v3.2/analyze?visualFeatures=Description" \
  -H "Ocp-Apim-Subscription-Key: $AZURE_CV_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com/test-image.jpg"}'

# Test Form Recognizer API  
curl -X POST "$AZURE_FR_ENDPOINT/formrecognizer/documentModels/prebuilt-layout:analyze?api-version=2022-08-31" \
  -H "Ocp-Apim-Subscription-Key: $AZURE_FR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"urlSource":"https://example.com/test-document.pdf"}'
```

## 🔒 Security Best Practices

### Credential Management
- ✅ All secrets stored in Azure Key Vault
- ✅ Local `.env` file for development only
- ✅ Environment variables never committed to git
- ✅ Regular key rotation recommended

### Access Control
- ✅ Least privilege access principles
- ✅ Service-specific resource groups
- ✅ Network access restrictions available
- ✅ Activity logging enabled

### .env File Security
```bash
# Add to .gitignore
echo ".env" >> .gitignore
echo "*.env" >> .gitignore

# Set secure permissions
chmod 600 .env
```

## 🧹 Cleanup and Resource Management

### Quick Cleanup
```bash
# Remove all workshop resources
./03-cleanup.sh

# Force cleanup (no confirmation)
./03-cleanup.sh --force
```

### Manual Cleanup
```bash
# Delete resource group and all resources
az group delete --name design-to-code-workshop --yes

# Purge soft-deleted Key Vault
az keyvault purge --name dtc-keyvault-timestamp
```

### Backup Before Cleanup
```bash
# The cleanup script automatically backs up configuration files
# Files backed up to: backup-YYYYMMDD-HHMMSS/
ls backup-*/
```

## 🛠️ Development Usage

### TypeScript Integration
```typescript
import { AzureAIDesignAnalyzer } from './azure-ai-analyzer.template';
import { azureConfig } from './azure-ai-config.template';

// Initialize analyzer
const analyzer = new AzureAIDesignAnalyzer();

// Analyze design
const result = await analyzer.analyzeDesign(imageData);

// Generate code
const reactCode = await analyzer.generateCode(result, 'react');
```

### Node.js Scripts
```bash
# Development mode with auto-reload
npm run dev

# Build TypeScript
npm run build

# Production mode
npm start

# Run tests
npm test
```

## 📊 Monitoring and Troubleshooting

### Common Issues

| Issue | Symptoms | Solution |
|-------|----------|----------|
| **Authentication Failed** | 401/403 errors | Run `az login` and check subscription |
| **Quota Exceeded** | 429 errors | Check Azure quotas and limits |
| **Service Unavailable** | Connection timeouts | Verify service regions and endpoints |
| **Invalid Keys** | Authorization errors | Regenerate keys in Azure portal |

### Diagnostic Commands
```bash
# Check Azure login status
az account show

# List available subscriptions
az account list --output table

# Check resource group resources
az resource list --resource-group design-to-code-workshop --output table

# Test specific service endpoints
curl -I $AZURE_CV_ENDPOINT
curl -I $AZURE_FR_ENDPOINT
```

### Debug Mode
```bash
# Enable detailed logging
export DEBUG=true
export LOG_LEVEL=debug

# Run with verbose output
./02-test-connections.sh
```

## 🔗 Integration Examples

### Workshop Integration
```bash
# Copy templates to your project
cp azure-ai-config.template.ts ../src/config/azure-ai-config.ts
cp azure-ai-analyzer.template.ts ../src/services/azure-ai-analyzer.ts

# Update import paths and customize as needed
```

### CI/CD Integration
```yaml
# Example GitHub Actions workflow
name: Workshop Setup
on: push
jobs:
  setup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Azure Resources
        run: |
          cd resources
          ./01-azure-setup.sh ${{ secrets.AZURE_SUBSCRIPTION_ID }}
        env:
          AZURE_CLIENT_ID: ${{ secrets.AZURE_CLIENT_ID }}
          AZURE_CLIENT_SECRET: ${{ secrets.AZURE_CLIENT_SECRET }}
          AZURE_TENANT_ID: ${{ secrets.AZURE_TENANT_ID }}
```

## 📚 Additional Resources

### Documentation Links
- [Azure Computer Vision API](https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/)
- [Azure Form Recognizer](https://docs.microsoft.com/en-us/azure/cognitive-services/form-recognizer/)
- [Azure OpenAI Service](https://docs.microsoft.com/en-us/azure/cognitive-services/openai/)
- [Azure Key Vault](https://docs.microsoft.com/en-us/azure/key-vault/)

### Community and Support
- [Workshop Issues](https://github.com/paulasilvatech/Design-to-Code-Dev/issues)
- [Azure Support](https://azure.microsoft.com/support/)
- [Design-to-Code Community](https://design-to-code.dev)

---

## 🎯 Next Steps

1. **Complete Setup**: Run all setup scripts successfully
2. **Test Connections**: Verify all Azure services are working
3. **Start Workshop**: Begin with [Part 1](../docs/design-to-code-workshop-part-01.md)
4. **Join Community**: Connect with other workshop participants

**Happy coding! 🚀**