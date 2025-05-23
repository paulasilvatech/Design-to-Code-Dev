// Design-to-Code Workshop - Azure AI Configuration Template
// This TypeScript configuration file manages Azure AI service connections
// Copy this file and update with your actual credentials

import { SecretClient } from '@azure/keyvault-secrets';
import { DefaultAzureCredential } from '@azure/identity';

export interface AzureAIConfig {
  computerVision: {
    endpoint: string;
    key: string;
    region: string;
  };
  formRecognizer: {
    endpoint: string;
    key: string;
    region: string;
  };
  openai: {
    endpoint: string;
    key: string;
    deploymentName: string;
    apiVersion: string;
  };
  keyVault?: {
    vaultUrl: string;
    secretClient?: SecretClient;
  };
}

export class AzureConfigManager {
  private config: AzureAIConfig;
  private secretClient?: SecretClient;

  constructor() {
    this.config = this.loadFromEnvironment();
    this.initializeKeyVault();
  }

  /**
   * Load configuration from environment variables
   */
  private loadFromEnvironment(): AzureAIConfig {
    const config: AzureAIConfig = {
      computerVision: {
        endpoint: process.env.AZURE_CV_ENDPOINT || process.env.CV_ENDPOINT || '',
        key: process.env.AZURE_CV_KEY || process.env.CV_KEY || '',
        region: process.env.AZURE_CV_REGION || 'eastus',
      },
      formRecognizer: {
        endpoint: process.env.AZURE_FR_ENDPOINT || process.env.FR_ENDPOINT || '',
        key: process.env.AZURE_FR_KEY || process.env.FR_KEY || '',
        region: process.env.AZURE_FR_REGION || 'eastus',
      },
      openai: {
        endpoint: process.env.AZURE_OPENAI_ENDPOINT || process.env.OPENAI_ENDPOINT || '',
        key: process.env.AZURE_OPENAI_KEY || process.env.OPENAI_KEY || process.env.OPENAI_API_KEY || '',
        deploymentName: process.env.OPENAI_DEPLOYMENT_NAME || 'gpt-4-vision-preview',
        apiVersion: process.env.AZURE_OPENAI_API_VERSION || '2024-02-15-preview',
      },
    };

    // Add Key Vault configuration if available
    if (process.env.KEYVAULT_NAME) {
      config.keyVault = {
        vaultUrl: `https://${process.env.KEYVAULT_NAME}.vault.azure.net/`,
      };
    }

    return config;
  }

  /**
   * Initialize Key Vault client for secure credential management
   */
  private async initializeKeyVault(): Promise<void> {
    if (this.config.keyVault?.vaultUrl) {
      try {
        const credential = new DefaultAzureCredential();
        this.secretClient = new SecretClient(this.config.keyVault.vaultUrl, credential);
        this.config.keyVault.secretClient = this.secretClient;
        
        // Load secrets from Key Vault if available
        await this.loadSecretsFromKeyVault();
      } catch (error) {
        console.warn('Failed to initialize Key Vault:', error);
        // Continue with environment variables
      }
    }
  }

  /**
   * Load secrets from Azure Key Vault
   */
  private async loadSecretsFromKeyVault(): Promise<void> {
    if (!this.secretClient) return;
    
    try {
      // Load Computer Vision key
      const cvKey = await this.secretClient.getSecret('CV-KEY');
      if (cvKey.value) {
        this.config.computerVision.key = cvKey.value;
      }
      
      // Load Form Recognizer key
      const frKey = await this.secretClient.getSecret('FR-KEY');
      if (frKey.value) {
        this.config.formRecognizer.key = frKey.value;
      }
      
      // Load OpenAI key
      const openaiKey = await this.secretClient.getSecret('OPENAI-KEY');
      if (openaiKey.value) {
        this.config.openai.key = openaiKey.value;
      }
      
      console.log('Successfully loaded credentials from Key Vault');
    } catch (error) {
      console.warn('Failed to load some secrets from Key Vault:', error);
      // Continue with environment variables
    }
  }

  /**
   * Get the current configuration
   */
  public async getConfig(): Promise<AzureAIConfig> {
    return this.config;
  }

  /**
   * Validate that all required configuration is present
   */
  public async validateConfig(): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = [];

    // Check Computer Vision
    if (!this.config.computerVision.endpoint) {
      errors.push('Computer Vision endpoint is missing');
    }
    if (!this.config.computerVision.key) {
      errors.push('Computer Vision key is missing');
    }

    // Check Form Recognizer
    if (!this.config.formRecognizer.endpoint) {
      errors.push('Form Recognizer endpoint is missing');
    }
    if (!this.config.formRecognizer.key) {
      errors.push('Form Recognizer key is missing');
    }

    // Check OpenAI (either Azure OpenAI or regular OpenAI)
    if (!this.config.openai.endpoint && !this.config.openai.key) {
      errors.push('OpenAI configuration is missing (either Azure OpenAI or OpenAI API key required)');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Get configuration for a specific service
   */
  public getServiceConfig(service: 'computerVision' | 'formRecognizer' | 'openai') {
    return this.config[service];
  }

  /**
   * Update configuration at runtime
   */
  public updateConfig(updates: Partial<AzureAIConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  /**
   * Test connection to a specific service
   */
  public async testConnection(service: 'computerVision' | 'formRecognizer' | 'openai'): Promise<boolean> {
    const serviceConfig = this.getServiceConfig(service);
    
    try {
      switch (service) {
        case 'computerVision':
          return await this.testComputerVision(serviceConfig);
        case 'formRecognizer':
          return await this.testFormRecognizer(serviceConfig);
        case 'openai':
          return await this.testOpenAI(serviceConfig);
        default:
          return false;
      }
    } catch (error) {
      console.error(`Failed to test ${service} connection:`, error);
      return false;
    }
  }

  /**
   * Test Computer Vision connection
   */
  private async testComputerVision(config: AzureAIConfig['computerVision']): Promise<boolean> {
    const response = await fetch(`${config.endpoint}/vision/v3.2/analyze?visualFeatures=Description`, {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': config.key,
      },
    });
    
    return response.status === 400; // 400 is expected for GET without image
  }

  /**
   * Test Form Recognizer connection
   */
  private async testFormRecognizer(config: AzureAIConfig['formRecognizer']): Promise<boolean> {
    const response = await fetch(`${config.endpoint}/formrecognizer/documentModels?api-version=2022-08-31`, {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': config.key,
      },
    });
    
    return response.ok;
  }

  /**
   * Test OpenAI connection
   */
  private async testOpenAI(config: AzureAIConfig['openai']): Promise<boolean> {
    if (config.endpoint) {
      // Test Azure OpenAI
      const response = await fetch(`${config.endpoint}/openai/deployments?api-version=${config.apiVersion}`, {
        method: 'GET',
        headers: {
          'api-key': config.key,
        },
      });
      return response.ok;
    } else {
      // Test regular OpenAI API
      const response = await fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${config.key}`,
        },
      });
      return response.ok;
    }
  }
}

// Export singleton instance
export const azureConfig = new AzureConfigManager();

// Export default configuration template
export const defaultAzureConfig: AzureAIConfig = {
  computerVision: {
    endpoint: 'https://design-vision-service.cognitiveservices.azure.com/',
    key: 'your-computer-vision-key',
    region: 'eastus',
  },
  formRecognizer: {
    endpoint: 'https://design-form-recognizer.cognitiveservices.azure.com/',
    key: 'your-form-recognizer-key',
    region: 'eastus',
  },
  openai: {
    endpoint: 'https://design-openai-service.openai.azure.com/',
    key: 'your-azure-openai-key',
    deploymentName: 'gpt-4-vision-preview',
    apiVersion: '2024-02-15-preview',
  },
  keyVault: {
    vaultUrl: 'https://your-keyvault-name.vault.azure.net/',
  },
};

// Configuration validation utilities
export const validateEnvironmentVariables = (): { valid: boolean; missing: string[] } => {
  const required = [
    'AZURE_CV_ENDPOINT',
    'AZURE_CV_KEY', 
    'AZURE_FR_ENDPOINT',
    'AZURE_FR_KEY',
  ];
  
  const optional = [
    'AZURE_OPENAI_ENDPOINT',
    'AZURE_OPENAI_KEY',
    'OPENAI_API_KEY',
    'KEYVAULT_NAME',
  ];
  
  const missing = required.filter(key => !process.env[key]);
  const hasOpenAI = process.env.AZURE_OPENAI_KEY || process.env.OPENAI_API_KEY;
  
  if (!hasOpenAI) {
    missing.push('AZURE_OPENAI_KEY or OPENAI_API_KEY');
  }
  
  return {
    valid: missing.length === 0,
    missing,
  };
};

// Environment setup helper
export const setupEnvironment = () => {
  const validation = validateEnvironmentVariables();
  
  if (!validation.valid) {
    console.error('❌ Missing required environment variables:');
    validation.missing.forEach(key => console.error(`   - ${key}`));
    console.error('\n💡 Please check your .env file or run the setup script');
    process.exit(1);
  }
  
  console.log('✅ Environment variables validated successfully');
};