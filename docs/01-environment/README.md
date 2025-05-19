# 🛠️ Setting Up Your Development Environment

This guide provides detailed instructions for setting up a complete development environment for Figma to code conversion using VS Code, GitHub Copilot, and Azure AI.

## Prerequisites

Before you begin, ensure you have the following:

- A computer with Windows, macOS, or Linux
- Administrative access to install software
- A stable internet connection
- Accounts with:
  - GitHub (with Copilot subscription)
  - Figma (Professional or Organization plan recommended)
  - Microsoft Azure (Free tier is sufficient to start)

## Installing Visual Studio Code

### For Windows
1. Visit [code.visualstudio.com](https://code.visualstudio.com/)
2. Download the Windows installer (.exe)
3. Run the installer and follow the prompts
4. Check the options to add "Open with Code" to Windows Explorer context menu
5. Complete the installation

### For macOS
1. Visit [code.visualstudio.com](https://code.visualstudio.com/)
2. Download the macOS version (.zip)
3. Extract the downloaded file
4. Drag Visual Studio Code.app to the Applications folder
5. Optional: Add VS Code to your dock

### For Linux
```bash
# For Debian/Ubuntu
sudo apt update
sudo apt install software-properties-common apt-transport-https wget
wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
sudo apt update
sudo apt install code

# For Red Hat/Fedora/SUSE
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'
sudo dnf check-update
sudo dnf install code
```

## Essential VS Code Extensions

Here's a detailed list of essential extensions and how to configure them:

### GitHub Copilot

1. Install the extension:
   - Open VS Code
   - Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (macOS)
   - Search for "GitHub Copilot"
   - Click "Install"

2. Authenticate with GitHub:
   - After installation, you'll be prompted to sign in
   - Click "Sign in to GitHub"
   - You'll be redirected to a browser to complete authentication
   - Once authenticated, return to VS Code

3. Verify installation:
   - Create a new file (e.g., test.js)
   - Type a comment like `// Create a function that adds two numbers`
   - Copilot should suggest code below your comment

### GitHub Copilot Chat

1. Install the extension:
   - Search for "GitHub Copilot Chat" in the extensions marketplace
   - Click "Install"

2. Access the chat:
   - Press `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Shift+I` (macOS)
   - The chat panel will open on the side
   - You can now ask questions about your code

### Figma for VS Code

1. Install the extension:
   - Search for "Figma for VS Code" in the extensions marketplace
   - Click "Install"

2. Connect to Figma:
   - Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
   - Type "Figma: Login" and press Enter
   - Follow the authentication prompts
   - Once connected, you can access your Figma files directly in VS Code

### Azure Tools Extension

1. Install the extension:
   - Search for "Azure Tools" in the extensions marketplace
   - Click "Install"

2. Sign in to Azure:
   - Open the Azure view from the activity bar
   - Click "Sign in to Azure"
   - Follow the authentication prompts in your browser
   - Once signed in, you can access your Azure resources

### ESLint & Prettier

1. Install ESLint:
   - Search for "ESLint" in the extensions marketplace
   - Click "Install"

2. Install Prettier:
   - Search for "Prettier - Code formatter" in the extensions marketplace
   - Click "Install"

3. Configure ESLint and Prettier:
   - Create an `.eslintrc.js` file in your project root:
   ```javascript
   module.exports = {
     extends: [
       'eslint:recommended',
       'plugin:react/recommended', // If using React
       'plugin:@typescript-eslint/recommended', // If using TypeScript
       'prettier' // Add Prettier to avoid conflicts
     ],
     plugins: [
       'react', // If using React
       '@typescript-eslint' // If using TypeScript
     ],
     rules: {
       // Your custom rules here
     }
   };
   ```

   - Create a `.prettierrc` file in your project root:
   ```json
   {
     "semi": true,
     "tabWidth": 2,
     "printWidth": 100,
     "singleQuote": true,
     "trailingComma": "es5",
     "jsxBracketSameLine": false
   }
   ```

4. Set up format on save:
   - Open VS Code settings (`Ctrl+,` or `Cmd+,`)
   - Search for "formatOnSave" and check the box
   - Search for "defaultFormatter" and set to "Prettier - Code formatter"

## Authentication Setup

### GitHub Authentication

1. Generate a Personal Access Token (PAT):
   - Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
   - Click "Generate new token"
   - Give it a descriptive name
   - Select the appropriate scopes (at minimum: `repo`, `read:org`)
   - Click "Generate token" and copy the token (you won't see it again!)

2. Configure VS Code with your token:
   - Open the terminal in VS Code
   - Enter the following command:
   ```bash
   git config --global credential.helper store
   ```
   - When you next push to GitHub, enter your username and the PAT as the password
   - VS Code will remember these credentials

### Figma Authentication

1. Generate a Figma API key:
   - Log in to Figma
   - Go to your account settings
   - Navigate to the "Personal access tokens" section
   - Create a new token with a descriptive name
   - Copy the token (you won't see it again!)

2. Store the token securely:
   - Create a .env file in your project root
   - Add the following line:
   ```
   FIGMA_API_KEY=your_figma_api_key
   ```
   - Ensure .env is in your .gitignore file to prevent committing secrets

### Azure Authentication

1. Register an application in Azure:
   - Sign in to the [Azure Portal](https://portal.azure.com/)
   - Navigate to "Azure Active Directory" > "App registrations"
   - Click "New registration"
   - Name your application
   - Select the appropriate supported account types
   - Click "Register"

2. Create API keys:
   - In your app registration, go to "Certificates & secrets"
   - Click "New client secret"
   - Add a description and choose an expiration
   - Click "Add" and copy the secret value (you won't see it again!)

3. Store Azure credentials:
   - Add the following lines to your .env file:
   ```
   AZURE_TENANT_ID=your_tenant_id
   AZURE_CLIENT_ID=your_client_id
   AZURE_CLIENT_SECRET=your_client_secret
   ```

## Environment Configuration

Create a comprehensive `.env` file to store all your secrets and configuration:

```
# GitHub
GITHUB_TOKEN=your_personal_access_token

# Figma
FIGMA_API_KEY=your_figma_api_key

# Azure
AZURE_TENANT_ID=your_tenant_id
AZURE_CLIENT_ID=your_client_id
AZURE_CLIENT_SECRET=your_client_secret
AZURE_AI_FOUNDRY_KEY=your_azure_ai_key
AZURE_AI_FOUNDRY_ENDPOINT=your_azure_ai_endpoint

# Project Configuration
NODE_ENV=development
```

Create a `.env.example` file with the same structure but without actual values to help other developers set up their environments.

## Setting Up Project Structure

### For React Projects

```bash
# Create a new React app with TypeScript
npx create-react-app my-design-app --template typescript

# Navigate to the project
cd my-design-app

# Install additional dependencies
npm install styled-components axios react-router-dom
npm install -D @types/styled-components

# Add Tailwind CSS (optional)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configure Tailwind CSS:

```js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // You'll add custom colors from Figma here
    },
  },
  plugins: [],
}
```

### For Next.js Projects

```bash
# Create a new Next.js app
npx create-next-app@latest my-design-app

# Navigate to the project
cd my-design-app

# Install additional dependencies
npm install styled-components axios
npm install -D @types/styled-components
```

### For Angular Projects

```bash
# Install Angular CLI
npm install -g @angular/cli

# Create a new Angular app
ng new my-design-app --style=scss --routing=true

# Navigate to the project
cd my-design-app

# Add Angular Material
ng add @angular/material

# Create core modules
ng generate module core
ng generate module shared
```

## Loading Environment Variables

### For React (Create React App)
Create React App automatically loads environment variables prefixed with `REACT_APP_`:

```
# .env
REACT_APP_FIGMA_API_KEY=your_figma_api_key
```

Access in code:
```javascript
const figmaApiKey = process.env.REACT_APP_FIGMA_API_KEY;
```

### For Next.js
Next.js automatically loads environment variables from `.env` files:

```javascript
// Access in code
const figmaApiKey = process.env.FIGMA_API_KEY;
```

### For Angular
Create an environment.ts file:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  figmaApiKey: 'your_figma_api_key',
  // other environment variables
};
```

Access in code:
```typescript
import { environment } from '../environments/environment';

const figmaApiKey = environment.figmaApiKey;
```

## Next Steps

With your development environment set up, you're ready to start preparing your Figma designs for code conversion. Check out the [Preparing Figma Designs](../02-figma-prep/README.md) guide for detailed instructions.

## Troubleshooting Common Setup Issues

### GitHub Copilot Not Working

1. Verify your GitHub account has an active Copilot subscription
2. Try signing out and signing back in
3. Check VS Code is up to date
4. Restart VS Code with the `--disable-extensions` flag, then re-enable only Copilot

### Figma API Connection Issues

1. Verify your API key hasn't expired
2. Check that you have the correct permissions in Figma
3. Ensure your .env file is properly formatted without quotes around values
4. Restart VS Code to ensure environment variables are loaded

### Azure Authentication Problems

1. Check that your Azure subscription is active
2. Verify the client ID and secret are correct
3. Ensure you've granted the appropriate permissions to your application
4. Check network connectivity to Azure endpoints 