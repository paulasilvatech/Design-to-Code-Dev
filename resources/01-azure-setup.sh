#!/bin/bash

# Design-to-Code Workshop - Azure Resources Setup Script
# This script creates all necessary Azure resources for the workshop
# Usage: ./01-azure-setup.sh [SUBSCRIPTION_ID]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default configuration
DEFAULT_LOCATION="eastus"
DEFAULT_RESOURCE_GROUP="design-to-code-workshop"
DEFAULT_KEYVAULT_NAME="dtc-keyvault-$(date +%s)"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Azure CLI is installed and logged in
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check if Azure CLI is installed
    if ! command -v az &> /dev/null; then
        print_error "Azure CLI is not installed. Please install it first."
        print_status "Install from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
        exit 1
    fi
    
    # Check if logged in
    if ! az account show &> /dev/null; then
        print_error "You are not logged in to Azure CLI."
        print_status "Please run: az login"
        exit 1
    fi
    
    print_success "Prerequisites check passed"
}

# Function to set subscription
set_subscription() {
    local subscription_id=$1
    
    if [ -n "$subscription_id" ]; then
        print_status "Setting subscription to: $subscription_id"
        az account set --subscription "$subscription_id"
        if [ $? -ne 0 ]; then
            print_error "Failed to set subscription. Please check the subscription ID."
            exit 1
        fi
    fi
    
    # Display current subscription
    local current_sub=$(az account show --query "name" -o tsv)
    local current_id=$(az account show --query "id" -o tsv)
    print_success "Using subscription: $current_sub ($current_id)"
}

# Function to create resource group
create_resource_group() {
    print_status "Creating resource group: $DEFAULT_RESOURCE_GROUP"
    
    az group create \
        --name "$DEFAULT_RESOURCE_GROUP" \
        --location "$DEFAULT_LOCATION" \
        --tags "workshop=design-to-code" "environment=workshop" "created=$(date -u +%Y-%m-%dT%H:%M:%SZ)"
    
    if [ $? -eq 0 ]; then
        print_success "Resource group created: $DEFAULT_RESOURCE_GROUP"
    else
        print_error "Failed to create resource group"
        exit 1
    fi
}

# Function to create Computer Vision service
create_computer_vision() {
    local service_name="design-vision-service"
    
    print_status "Creating Computer Vision service: $service_name"
    
    az cognitiveservices account create \
        --name "$service_name" \
        --resource-group "$DEFAULT_RESOURCE_GROUP" \
        --kind "ComputerVision" \
        --sku "S1" \
        --location "$DEFAULT_LOCATION" \
        --tags "service=computer-vision" "workshop=design-to-code" \
        --yes
    
    if [ $? -eq 0 ]; then
        print_success "Computer Vision service created: $service_name"
        
        # Get endpoint and key
        local endpoint=$(az cognitiveservices account show \
            --name "$service_name" \
            --resource-group "$DEFAULT_RESOURCE_GROUP" \
            --query "properties.endpoint" \
            --output tsv)
        
        local key=$(az cognitiveservices account keys list \
            --name "$service_name" \
            --resource-group "$DEFAULT_RESOURCE_GROUP" \
            --query "key1" \
            --output tsv)
        
        echo "CV_ENDPOINT=$endpoint" >> .env
        echo "CV_KEY=$key" >> .env
        
        print_success "Computer Vision credentials saved to .env file"
    else
        print_error "Failed to create Computer Vision service"
        exit 1
    fi
}

# Function to create Form Recognizer service
create_form_recognizer() {
    local service_name="design-form-recognizer"
    
    print_status "Creating Form Recognizer service: $service_name"
    
    az cognitiveservices account create \
        --name "$service_name" \
        --resource-group "$DEFAULT_RESOURCE_GROUP" \
        --kind "FormRecognizer" \
        --sku "S0" \
        --location "$DEFAULT_LOCATION" \
        --tags "service=form-recognizer" "workshop=design-to-code" \
        --yes
    
    if [ $? -eq 0 ]; then
        print_success "Form Recognizer service created: $service_name"
        
        # Get endpoint and key
        local endpoint=$(az cognitiveservices account show \
            --name "$service_name" \
            --resource-group "$DEFAULT_RESOURCE_GROUP" \
            --query "properties.endpoint" \
            --output tsv)
        
        local key=$(az cognitiveservices account keys list \
            --name "$service_name" \
            --resource-group "$DEFAULT_RESOURCE_GROUP" \
            --query "key1" \
            --output tsv)
        
        echo "FR_ENDPOINT=$endpoint" >> .env
        echo "FR_KEY=$key" >> .env
        
        print_success "Form Recognizer credentials saved to .env file"
    else
        print_error "Failed to create Form Recognizer service"
        exit 1
    fi
}

# Function to create Azure OpenAI service
create_openai_service() {
    local service_name="design-openai-service"
    
    print_status "Creating Azure OpenAI service: $service_name"
    
    # Note: Azure OpenAI has limited availability and requires special access
    print_warning "Azure OpenAI requires special access approval."
    print_status "If you don't have access, the script will continue with other services."
    
    az cognitiveservices account create \
        --name "$service_name" \
        --resource-group "$DEFAULT_RESOURCE_GROUP" \
        --kind "OpenAI" \
        --sku "S0" \
        --location "$DEFAULT_LOCATION" \
        --tags "service=openai" "workshop=design-to-code" \
        --yes 2>/dev/null
    
    if [ $? -eq 0 ]; then
        print_success "Azure OpenAI service created: $service_name"
        
        # Get endpoint and key
        local endpoint=$(az cognitiveservices account show \
            --name "$service_name" \
            --resource-group "$DEFAULT_RESOURCE_GROUP" \
            --query "properties.endpoint" \
            --output tsv)
        
        local key=$(az cognitiveservices account keys list \
            --name "$service_name" \
            --resource-group "$DEFAULT_RESOURCE_GROUP" \
            --query "key1" \
            --output tsv)
        
        echo "OPENAI_ENDPOINT=$endpoint" >> .env
        echo "OPENAI_KEY=$key" >> .env
        
        print_success "Azure OpenAI credentials saved to .env file"
        
        # Deploy GPT-4 Vision model
        deploy_gpt4_vision "$service_name"
    else
        print_warning "Azure OpenAI service creation failed - this is expected if you don't have access"
        print_status "You can use OpenAI API directly instead"
        echo "# OPENAI_ENDPOINT=<your-azure-openai-endpoint>" >> .env
        echo "# OPENAI_KEY=<your-azure-openai-key>" >> .env
        echo "# OPENAI_API_KEY=<your-openai-api-key-as-alternative>" >> .env
    fi
}

# Function to deploy GPT-4 Vision model
deploy_gpt4_vision() {
    local service_name=$1
    local deployment_name="gpt-4-vision-preview"
    
    print_status "Deploying GPT-4 Vision model: $deployment_name"
    
    az cognitiveservices account deployment create \
        --name "$service_name" \
        --resource-group "$DEFAULT_RESOURCE_GROUP" \
        --deployment-name "$deployment_name" \
        --model-name "gpt-4-vision-preview" \
        --model-version "vision-preview" \
        --model-format "OpenAI" \
        --sku-capacity 1 \
        --sku-name "Standard"
    
    if [ $? -eq 0 ]; then
        print_success "GPT-4 Vision model deployed: $deployment_name"
        echo "OPENAI_DEPLOYMENT_NAME=$deployment_name" >> .env
    else
        print_warning "GPT-4 Vision deployment failed - you may need to deploy manually"
    fi
}

# Function to create Key Vault for secure credential storage
create_key_vault() {
    print_status "Creating Key Vault: $DEFAULT_KEYVAULT_NAME"
    
    az keyvault create \
        --name "$DEFAULT_KEYVAULT_NAME" \
        --resource-group "$DEFAULT_RESOURCE_GROUP" \
        --location "$DEFAULT_LOCATION" \
        --tags "service=keyvault" "workshop=design-to-code"
    
    if [ $? -eq 0 ]; then
        print_success "Key Vault created: $DEFAULT_KEYVAULT_NAME"
        echo "KEYVAULT_NAME=$DEFAULT_KEYVAULT_NAME" >> .env
        
        # Store secrets in Key Vault (if .env file exists)
        if [ -f ".env" ]; then
            store_secrets_in_keyvault
        fi
    else
        print_error "Failed to create Key Vault"
        exit 1
    fi
}

# Function to store secrets in Key Vault
store_secrets_in_keyvault() {
    print_status "Storing credentials in Key Vault..."
    
    # Read .env file and store secrets
    while IFS='=' read -r key value; do
        # Skip empty lines and comments
        [[ -z "$key" || "$key" =~ ^#.*$ ]] && continue
        
        # Store secret in Key Vault
        if [[ "$key" =~ _KEY$ ]] || [[ "$key" =~ _ENDPOINT$ ]]; then
            az keyvault secret set \
                --vault-name "$DEFAULT_KEYVAULT_NAME" \
                --name "$key" \
                --value "$value" > /dev/null
            
            if [ $? -eq 0 ]; then
                print_success "Stored $key in Key Vault"
            fi
        fi
    done < .env
}

# Function to create environment configuration files
create_config_files() {
    print_status "Creating configuration files..."
    
    # Create .env.template
    cat > .env.template << EOF
# Azure AI Services Configuration
# Copy this file to .env and fill in your values

# Azure Computer Vision
AZURE_CV_ENDPOINT=https://your-computer-vision.cognitiveservices.azure.com/
AZURE_CV_KEY=your-computer-vision-key

# Azure Form Recognizer
AZURE_FR_ENDPOINT=https://your-form-recognizer.cognitiveservices.azure.com/
AZURE_FR_KEY=your-form-recognizer-key

# Azure OpenAI (or regular OpenAI as fallback)
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
AZURE_OPENAI_KEY=your-azure-openai-key
OPENAI_DEPLOYMENT_NAME=gpt-4-vision-preview
# Alternative: Use OpenAI API directly
# OPENAI_API_KEY=your-openai-api-key

# Azure Key Vault
KEYVAULT_NAME=your-keyvault-name

# Workshop Configuration
RESOURCE_GROUP=$DEFAULT_RESOURCE_GROUP
LOCATION=$DEFAULT_LOCATION
EOF

    # Create azure-config.json
    cat > azure-config.json << EOF
{
  "resourceGroup": "$DEFAULT_RESOURCE_GROUP",
  "location": "$DEFAULT_LOCATION",
  "services": {
    "computerVision": {
      "name": "design-vision-service",
      "sku": "S1",
      "kind": "ComputerVision"
    },
    "formRecognizer": {
      "name": "design-form-recognizer",
      "sku": "S0",
      "kind": "FormRecognizer"
    },
    "openai": {
      "name": "design-openai-service",
      "sku": "S0",
      "kind": "OpenAI",
      "deployments": [
        {
          "name": "gpt-4-vision-preview",
          "model": "gpt-4-vision-preview",
          "version": "vision-preview"
        }
      ]
    },
    "keyVault": {
      "name": "$DEFAULT_KEYVAULT_NAME"
    }
  },
  "tags": {
    "workshop": "design-to-code",
    "environment": "workshop",
    "created": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  }
}
EOF

    print_success "Configuration files created"
}

# Function to test connections
test_connections() {
    print_status "Testing Azure service connections..."
    
    if [ -f ".env" ]; then
        source .env
        
        # Test Computer Vision
        if [ -n "$CV_ENDPOINT" ] && [ -n "$CV_KEY" ]; then
            print_status "Testing Computer Vision connection..."
            curl -s -X GET "$CV_ENDPOINT" \
                -H "Ocp-Apim-Subscription-Key: $CV_KEY" > /dev/null
            
            if [ $? -eq 0 ]; then
                print_success "Computer Vision: Connected ✓"
            else
                print_warning "Computer Vision: Connection test failed"
            fi
        fi
        
        # Test Form Recognizer
        if [ -n "$FR_ENDPOINT" ] && [ -n "$FR_KEY" ]; then
            print_status "Testing Form Recognizer connection..."
            curl -s -X GET "$FR_ENDPOINT" \
                -H "Ocp-Apim-Subscription-Key: $FR_KEY" > /dev/null
            
            if [ $? -eq 0 ]; then
                print_success "Form Recognizer: Connected ✓"
            else
                print_warning "Form Recognizer: Connection test failed"
            fi
        fi
    fi
}

# Function to display summary
display_summary() {
    echo ""
    echo "=========================================="
    echo "  Azure Resources Setup Complete!"
    echo "=========================================="
    echo ""
    echo "✅ Created Resources:"
    echo "   • Resource Group: $DEFAULT_RESOURCE_GROUP"
    echo "   • Computer Vision: design-vision-service"
    echo "   • Form Recognizer: design-form-recognizer"
    echo "   • Azure OpenAI: design-openai-service (if available)"
    echo "   • Key Vault: $DEFAULT_KEYVAULT_NAME"
    echo ""
    echo "📁 Generated Files:"
    echo "   • .env - Your service credentials"
    echo "   • .env.template - Template for future use"
    echo "   • azure-config.json - Service configuration"
    echo ""
    echo "🔑 Security:"
    echo "   • Credentials stored in Azure Key Vault"
    echo "   • Local .env file for development"
    echo ""
    echo "🚀 Next Steps:"
    echo "   1. Review your .env file"
    echo "   2. Run the connection test: ./02-test-connections.sh"
    echo "   3. Continue with Part 5 of the workshop"
    echo ""
    print_warning "Important: Keep your .env file secure and never commit it to git!"
}

# Main execution function
main() {
    local subscription_id=$1
    
    echo "=========================================="
    echo "  Design-to-Code Workshop Azure Setup"
    echo "=========================================="
    echo ""
    
    # Initialize .env file
    echo "# Design-to-Code Workshop - Azure Credentials" > .env
    echo "# Generated on $(date)" >> .env
    echo "" >> .env
    
    check_prerequisites
    set_subscription "$subscription_id"
    create_resource_group
    create_computer_vision
    create_form_recognizer
    create_openai_service
    create_key_vault
    create_config_files
    test_connections
    display_summary
}

# Check if script is being sourced or executed
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi