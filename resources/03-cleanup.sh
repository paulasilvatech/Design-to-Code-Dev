#!/bin/bash

# Design-to-Code Workshop - Cleanup Script
# This script removes all Azure resources created for the workshop
# Usage: ./03-cleanup.sh [--force]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default configuration
DEFAULT_RESOURCE_GROUP="design-to-code-workshop"

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
        print_error "Azure CLI is not installed."
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

# Function to load Key Vault name from .env if it exists
load_keyvault_name() {
    if [ -f ".env" ]; then
        source .env
        if [ -n "$KEYVAULT_NAME" ]; then
            print_status "Found Key Vault name in .env: $KEYVAULT_NAME"
        fi
    fi
}

# Function to confirm deletion
confirm_deletion() {
    local force_delete=$1
    
    if [ "$force_delete" != "--force" ]; then
        echo ""
        print_warning "This will delete ALL Azure resources created for the workshop!"
        echo ""
        echo "Resources to be deleted:"
        echo "  • Resource Group: $DEFAULT_RESOURCE_GROUP"
        echo "  • Computer Vision service"
        echo "  • Form Recognizer service"
        echo "  • Azure OpenAI service (if exists)"
        echo "  • Key Vault: $KEYVAULT_NAME (if exists)"
        echo "  • All associated data and configurations"
        echo ""
        print_warning "This action cannot be undone!"
        echo ""
        
        read -p "Are you sure you want to proceed? (type 'yes' to confirm): " -r
        if [[ ! $REPLY =~ ^yes$ ]]; then
            print_status "Cleanup cancelled by user"
            exit 0
        fi
    else
        print_warning "Force mode enabled - skipping confirmation"
    fi
}

# Function to list resources before deletion
list_resources() {
    print_status "Listing resources in resource group: $DEFAULT_RESOURCE_GROUP"
    
    # Check if resource group exists
    if ! az group show --name "$DEFAULT_RESOURCE_GROUP" &> /dev/null; then
        print_warning "Resource group '$DEFAULT_RESOURCE_GROUP' does not exist"
        return 1
    fi
    
    # List all resources
    echo ""
    echo "Resources found:"
    az resource list --resource-group "$DEFAULT_RESOURCE_GROUP" --output table
    echo ""
    
    return 0
}

# Function to delete Key Vault separately (soft delete protection)
delete_key_vault() {
    if [ -n "$KEYVAULT_NAME" ]; then
        print_status "Deleting Key Vault: $KEYVAULT_NAME"
        
        # Delete Key Vault
        az keyvault delete --name "$KEYVAULT_NAME" --resource-group "$DEFAULT_RESOURCE_GROUP" 2>/dev/null
        
        if [ $? -eq 0 ]; then
            print_success "Key Vault deleted: $KEYVAULT_NAME"
            
            # Purge Key Vault (permanent deletion)
            print_status "Purging Key Vault to ensure complete removal..."
            az keyvault purge --name "$KEYVAULT_NAME" 2>/dev/null
            
            if [ $? -eq 0 ]; then
                print_success "Key Vault purged successfully"
            else
                print_warning "Key Vault purge failed - it may need manual purging"
                print_status "You can purge it later with: az keyvault purge --name $KEYVAULT_NAME"
            fi
        else
            print_warning "Key Vault deletion failed or already deleted"
        fi
    fi
}

# Function to delete the resource group and all resources
delete_resource_group() {
    print_status "Deleting resource group: $DEFAULT_RESOURCE_GROUP"
    print_status "This may take several minutes..."
    
    # Delete resource group with all resources
    az group delete --name "$DEFAULT_RESOURCE_GROUP" --yes --no-wait
    
    if [ $? -eq 0 ]; then
        print_success "Resource group deletion initiated: $DEFAULT_RESOURCE_GROUP"
        print_status "Deletion is running in the background and may take several minutes to complete"
        
        # Optionally wait for completion
        print_status "Waiting for deletion to complete... (Press Ctrl+C to stop waiting)"
        az group wait --name "$DEFAULT_RESOURCE_GROUP" --deleted --timeout 1800 2>/dev/null
        
        if [ $? -eq 0 ]; then
            print_success "Resource group completely deleted: $DEFAULT_RESOURCE_GROUP"
        else
            print_warning "Deletion is still in progress or timed out"
            print_status "Check status with: az group show --name $DEFAULT_RESOURCE_GROUP"
        fi
    else
        print_error "Failed to delete resource group: $DEFAULT_RESOURCE_GROUP"
        exit 1
    fi
}

# Function to cleanup local files
cleanup_local_files() {
    print_status "Cleaning up local configuration files..."
    
    local files_to_remove=(".env" "azure-config.json")
    local backup_dir="backup-$(date +%Y%m%d-%H%M%S)"
    
    # Create backup directory
    mkdir -p "$backup_dir"
    
    for file in "${files_to_remove[@]}"; do
        if [ -f "$file" ]; then
            # Backup file first
            cp "$file" "$backup_dir/"
            print_status "Backed up $file to $backup_dir/"
            
            # Remove file
            rm "$file"
            print_success "Removed: $file"
        fi
    done
    
    # Remove template file if it exists
    if [ -f ".env.template" ]; then
        print_status "Keeping .env.template for future use"
    fi
    
    print_success "Local files cleaned up (backed up to $backup_dir/)"
}

# Function to check deletion status
check_deletion_status() {
    print_status "Checking deletion status..."
    
    # Check if resource group still exists
    if az group show --name "$DEFAULT_RESOURCE_GROUP" &> /dev/null; then
        print_warning "Resource group still exists - deletion may be in progress"
        
        # List remaining resources
        local remaining_count=$(az resource list --resource-group "$DEFAULT_RESOURCE_GROUP" --query "length(@)" -o tsv 2>/dev/null)
        if [ -n "$remaining_count" ] && [ "$remaining_count" -gt 0 ]; then
            print_status "Remaining resources: $remaining_count"
            print_status "Use 'az resource list --resource-group $DEFAULT_RESOURCE_GROUP' to see details"
        fi
    else
        print_success "Resource group successfully deleted"
    fi
    
    # Check Key Vault status
    if [ -n "$KEYVAULT_NAME" ]; then
        if az keyvault show --name "$KEYVAULT_NAME" &> /dev/null; then
            print_warning "Key Vault still exists"
        else
            # Check if it's in soft-deleted state
            if az keyvault list-deleted --query "[?name=='$KEYVAULT_NAME']" -o tsv | grep -q "$KEYVAULT_NAME"; then
                print_warning "Key Vault is in soft-deleted state"
                print_status "Purge with: az keyvault purge --name $KEYVAULT_NAME"
            else
                print_success "Key Vault completely removed"
            fi
        fi
    fi
}

# Function to display cleanup summary
display_summary() {
    echo ""
    echo "=========================================="
    echo "  Cleanup Summary"
    echo "=========================================="
    echo ""
    echo "✅ Actions Completed:"
    echo "   • Resource group deletion initiated"
    echo "   • Key Vault deletion and purge attempted"
    echo "   • Local configuration files backed up and removed"
    echo ""
    echo "📋 What was removed:"
    echo "   • All Azure AI services"
    echo "   • All service endpoints and keys"
    echo "   • Key Vault and stored secrets"
    echo "   • Local .env file (backed up)"
    echo ""
    echo "💡 Notes:"
    echo "   • Resource deletion may take several minutes to complete"
    echo "   • Configuration files were backed up before removal"
    echo "   • You can recreate resources by running ./01-azure-setup.sh"
    echo ""
    echo "🔍 To check status:"
    echo "   az group show --name $DEFAULT_RESOURCE_GROUP"
    echo ""
}

# Main execution function
main() {
    local force_mode=$1
    
    echo "=========================================="
    echo "  Design-to-Code Workshop Cleanup"
    echo "=========================================="
    echo ""
    
    check_prerequisites
    load_keyvault_name
    
    # List resources before deletion
    if list_resources; then
        confirm_deletion "$force_mode"
        
        # Perform cleanup
        delete_key_vault
        delete_resource_group
        cleanup_local_files
        
        # Check status
        sleep 5
        check_deletion_status
        
        display_summary
    else
        print_status "No resources found to clean up"
    fi
}

# Handle script interruption
trap 'print_warning "Cleanup interrupted by user"; exit 130' INT

# Check if script is being sourced or executed
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi