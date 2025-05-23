#!/bin/bash

# Design-to-Code Workshop - Azure Connection Testing Script
# This script tests all Azure service connections
# Usage: ./02-test-connections.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

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

# Function to check if .env file exists and load it
load_environment() {
    if [ ! -f ".env" ]; then
        print_error ".env file not found!"
        print_status "Please run ./01-azure-setup.sh first"
        exit 1
    fi
    
    print_status "Loading environment variables from .env file..."
    source .env
    print_success "Environment variables loaded"
}

# Function to test Computer Vision service
test_computer_vision() {
    local test_image_url="https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/ComputerVision/Images/landmark.jpg"
    
    print_status "Testing Computer Vision service..."
    
    if [ -z "$CV_ENDPOINT" ] || [ -z "$CV_KEY" ]; then
        print_error "Computer Vision credentials not found in .env file"
        return 1
    fi
    
    # Test with a simple image analysis
    local response=$(curl -s -w "%{http_code}" -o /tmp/cv_test_response.json \
        -X POST "$CV_ENDPOINT/vision/v3.2/analyze?visualFeatures=Description,Objects" \
        -H "Ocp-Apim-Subscription-Key: $CV_KEY" \
        -H "Content-Type: application/json" \
        -d "{\"url\":\"$test_image_url\"}")
    
    local http_code="${response: -3}"
    
    if [ "$http_code" -eq 200 ]; then
        print_success "Computer Vision: Connected and working ✓"
        
        # Display some results
        if command -v jq &> /dev/null; then
            local description=$(jq -r '.description.captions[0].text' /tmp/cv_test_response.json 2>/dev/null)
            if [ "$description" != "null" ] && [ -n "$description" ]; then
                print_status "Sample analysis: $description"
            fi
        fi
        return 0
    else
        print_error "Computer Vision: Connection failed (HTTP: $http_code)"
        if [ -f "/tmp/cv_test_response.json" ]; then
            print_error "Response: $(cat /tmp/cv_test_response.json)"
        fi
        return 1
    fi
}

# Function to test Form Recognizer service
test_form_recognizer() {
    local test_document_url="https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/sample-layout.pdf"
    
    print_status "Testing Form Recognizer service..."
    
    if [ -z "$FR_ENDPOINT" ] || [ -z "$FR_KEY" ]; then
        print_error "Form Recognizer credentials not found in .env file"
        return 1
    fi
    
    # Test with document analysis
    local response=$(curl -s -w "%{http_code}" -o /tmp/fr_test_response.json \
        -X POST "$FR_ENDPOINT/formrecognizer/documentModels/prebuilt-layout:analyze?api-version=2022-08-31" \
        -H "Ocp-Apim-Subscription-Key: $FR_KEY" \
        -H "Content-Type: application/json" \
        -d "{\"urlSource\":\"$test_document_url\"}")
    
    local http_code="${response: -3}"
    
    if [ "$http_code" -eq 202 ]; then
        print_success "Form Recognizer: Connected and working ✓"
        
        # Get operation location for checking status
        if command -v jq &> /dev/null && [ -f "/tmp/fr_test_response.json" ]; then
            local operation_location=$(curl -s -I \
                -X POST "$FR_ENDPOINT/formrecognizer/documentModels/prebuilt-layout:analyze?api-version=2022-08-31" \
                -H "Ocp-Apim-Subscription-Key: $FR_KEY" \
                -H "Content-Type: application/json" \
                -d "{\"urlSource\":\"$test_document_url\"}" | grep -i "operation-location" | cut -d' ' -f2 | tr -d '\r')
            
            if [ -n "$operation_location" ]; then
                print_status "Analysis started successfully"
            fi
        fi
        return 0
    else
        print_error "Form Recognizer: Connection failed (HTTP: $http_code)"
        if [ -f "/tmp/fr_test_response.json" ]; then
            print_error "Response: $(cat /tmp/fr_test_response.json)"
        fi
        return 1
    fi
}

# Function to test Azure OpenAI service
test_openai_service() {
    print_status "Testing Azure OpenAI service..."
    
    if [ -z "$OPENAI_ENDPOINT" ] || [ -z "$OPENAI_KEY" ]; then
        print_warning "Azure OpenAI credentials not found - checking for OpenAI API key..."
        test_openai_api
        return $?
    fi
    
    # Test with a simple completion
    local response=$(curl -s -w "%{http_code}" -o /tmp/openai_test_response.json \
        -X POST "$OPENAI_ENDPOINT/openai/deployments/${OPENAI_DEPLOYMENT_NAME:-gpt-4-vision-preview}/chat/completions?api-version=2024-02-15-preview" \
        -H "api-key: $OPENAI_KEY" \
        -H "Content-Type: application/json" \
        -d '{
            "messages": [
                {
                    "role": "user",
                    "content": "Hello, this is a test. Please respond with just \"Connection successful\""
                }
            ],
            "max_tokens": 10
        }')
    
    local http_code="${response: -3}"
    
    if [ "$http_code" -eq 200 ]; then
        print_success "Azure OpenAI: Connected and working ✓"
        
        # Display response
        if command -v jq &> /dev/null; then
            local content=$(jq -r '.choices[0].message.content' /tmp/openai_test_response.json 2>/dev/null)
            if [ "$content" != "null" ] && [ -n "$content" ]; then
                print_status "Response: $content"
            fi
        fi
        return 0
    else
        print_error "Azure OpenAI: Connection failed (HTTP: $http_code)"
        if [ -f "/tmp/openai_test_response.json" ]; then
            print_error "Response: $(cat /tmp/openai_test_response.json)"
        fi
        print_warning "Falling back to OpenAI API test..."
        test_openai_api
        return $?
    fi
}

# Function to test regular OpenAI API as fallback
test_openai_api() {
    if [ -z "$OPENAI_API_KEY" ]; then
        print_warning "OpenAI API key not found either"
        print_status "You can add OPENAI_API_KEY to your .env file as an alternative"
        return 1
    fi
    
    print_status "Testing OpenAI API..."
    
    local response=$(curl -s -w "%{http_code}" -o /tmp/openai_api_test_response.json \
        -X POST "https://api.openai.com/v1/chat/completions" \
        -H "Authorization: Bearer $OPENAI_API_KEY" \
        -H "Content-Type: application/json" \
        -d '{
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "user",
                    "content": "Hello, this is a test. Please respond with just \"Connection successful\""
                }
            ],
            "max_tokens": 10
        }')
    
    local http_code="${response: -3}"
    
    if [ "$http_code" -eq 200 ]; then
        print_success "OpenAI API: Connected and working ✓"
        return 0
    else
        print_error "OpenAI API: Connection failed (HTTP: $http_code)"
        return 1
    fi
}

# Function to test Key Vault access
test_key_vault() {
    print_status "Testing Key Vault access..."
    
    if [ -z "$KEYVAULT_NAME" ]; then
        print_warning "Key Vault name not found in .env file"
        return 1
    fi
    
    # Test Key Vault access
    local vault_url="https://$KEYVAULT_NAME.vault.azure.net/"
    
    # Check if we can list secrets (requires authentication)
    az keyvault secret list --vault-name "$KEYVAULT_NAME" --output none 2>/dev/null
    
    if [ $? -eq 0 ]; then
        print_success "Key Vault: Access confirmed ✓"
        
        # Count stored secrets
        local secret_count=$(az keyvault secret list --vault-name "$KEYVAULT_NAME" --query "length(@)" -o tsv 2>/dev/null)
        if [ -n "$secret_count" ]; then
            print_status "Stored secrets: $secret_count"
        fi
        return 0
    else
        print_warning "Key Vault: Access test failed - authentication may be required"
        print_status "Try: az login"
        return 1
    fi
}

# Function to test workshop-specific functionality
test_workshop_functionality() {
    print_status "Testing workshop-specific functionality..."
    
    # Test if we can create a simple analysis request
    local test_passed=true
    
    # Create a simple test image analysis
    if [ -n "$CV_ENDPOINT" ] && [ -n "$CV_KEY" ]; then
        print_status "Testing design analysis workflow..."
        
        # Test image URL - a simple button design
        local test_design="https://via.placeholder.com/300x100/4285f4/ffffff?text=Button"
        
        local response=$(curl -s -w "%{http_code}" -o /tmp/workshop_test.json \
            -X POST "$CV_ENDPOINT/vision/v3.2/analyze?visualFeatures=Objects,Tags,Color" \
            -H "Ocp-Apim-Subscription-Key: $CV_KEY" \
            -H "Content-Type: application/json" \
            -d "{\"url\":\"$test_design\"}")
        
        local http_code="${response: -3}"
        
        if [ "$http_code" -eq 200 ]; then
            print_success "Design analysis workflow: Working ✓"
            
            # Extract some meaningful data
            if command -v jq &> /dev/null; then
                local tags=$(jq -r '.tags[].name' /tmp/workshop_test.json 2>/dev/null | head -3 | tr '\n' ', ' | sed 's/,$//')
                if [ -n "$tags" ]; then
                    print_status "Detected elements: $tags"
                fi
            fi
        else
            print_warning "Design analysis workflow: Issues detected"
            test_passed=false
        fi
    fi
    
    if [ "$test_passed" = true ]; then
        print_success "Workshop functionality: Ready ✓"
        return 0
    else
        print_warning "Workshop functionality: Some issues detected"
        return 1
    fi
}

# Function to generate connection report
generate_report() {
    local cv_status=$1
    local fr_status=$2
    local openai_status=$3
    local kv_status=$4
    local workshop_status=$5
    
    echo ""
    echo "=========================================="
    echo "  Azure Services Connection Report"
    echo "=========================================="
    echo ""
    
    echo "Service Status:"
    [ $cv_status -eq 0 ] && echo "  ✅ Computer Vision: Ready" || echo "  ❌ Computer Vision: Failed"
    [ $fr_status -eq 0 ] && echo "  ✅ Form Recognizer: Ready" || echo "  ❌ Form Recognizer: Failed"
    [ $openai_status -eq 0 ] && echo "  ✅ OpenAI/Azure OpenAI: Ready" || echo "  ❌ OpenAI/Azure OpenAI: Failed"
    [ $kv_status -eq 0 ] && echo "  ✅ Key Vault: Ready" || echo "  ⚠️  Key Vault: Limited access"
    [ $workshop_status -eq 0 ] && echo "  ✅ Workshop functionality: Ready" || echo "  ⚠️  Workshop functionality: Issues"
    
    echo ""
    echo "Configuration Files:"
    [ -f ".env" ] && echo "  ✅ .env file: Present" || echo "  ❌ .env file: Missing"
    [ -f "azure-config.json" ] && echo "  ✅ azure-config.json: Present" || echo "  ❌ azure-config.json: Missing"
    
    echo ""
    local ready_count=0
    [ $cv_status -eq 0 ] && ((ready_count++))
    [ $fr_status -eq 0 ] && ((ready_count++))
    [ $openai_status -eq 0 ] && ((ready_count++))
    
    if [ $ready_count -eq 3 ]; then
        echo "🎉 All core services are ready! You can proceed with the workshop."
    elif [ $ready_count -eq 2 ]; then
        echo "⚠️  Most services are ready. Check the failed service above."
    else
        echo "❌ Multiple services failed. Please check your configuration."
        echo ""
        echo "Troubleshooting tips:"
        echo "  1. Verify your Azure subscription has sufficient quota"
        echo "  2. Check that all services were created successfully"
        echo "  3. Ensure your .env file has correct endpoints and keys"
        echo "  4. Run 'az login' to refresh authentication"
    fi
    
    echo ""
}

# Function to cleanup test files
cleanup() {
    rm -f /tmp/cv_test_response.json
    rm -f /tmp/fr_test_response.json
    rm -f /tmp/openai_test_response.json
    rm -f /tmp/openai_api_test_response.json
    rm -f /tmp/workshop_test.json
}

# Main execution function
main() {
    echo "=========================================="
    echo "  Design-to-Code Workshop Connection Test"
    echo "=========================================="
    echo ""
    
    load_environment
    
    echo "Testing Azure AI services..."
    echo ""
    
    # Run all tests
    test_computer_vision
    cv_result=$?
    
    test_form_recognizer
    fr_result=$?
    
    test_openai_service
    openai_result=$?
    
    test_key_vault
    kv_result=$?
    
    test_workshop_functionality
    workshop_result=$?
    
    # Generate report
    generate_report $cv_result $fr_result $openai_result $kv_result $workshop_result
    
    # Cleanup
    cleanup
    
    # Exit with error if critical services failed
    if [ $cv_result -ne 0 ] || [ $fr_result -ne 0 ]; then
        exit 1
    fi
}

# Check if script is being sourced or executed
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi