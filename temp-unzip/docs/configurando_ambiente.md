# Configurando o Ambiente de Desenvolvimento

Um ambiente de desenvolvimento bem configurado é fundamental para maximizar a eficiência da conversão de designs Figma para código, especialmente quando utilizamos ferramentas baseadas em IA como GitHub Copilot, GitHub Agent e integrações com Figma MCP Server. Esta seção detalha a configuração ideal para um fluxo de trabalho moderno e produtivo.

## Configuração do VS Code

O Visual Studio Code é o ambiente recomendado para trabalhar com GitHub Copilot e integrações Figma. Configure seu ambiente com as seguintes extensões e configurações:

### Extensões Essenciais

1. **GitHub Copilot e GitHub Copilot Chat**
   - Instale a extensão oficial do GitHub Copilot
   - Ative o GitHub Copilot Chat para interações mais detalhadas
   - Configure o modo de agente do Copilot através da paleta de comandos (`Ctrl+Shift+P` > "GitHub Copilot: Enable Agent Mode")

2. **Figma para VS Code**
   - Instale a extensão oficial do Figma para VS Code
   - Configure a autenticação com sua conta Figma
   - Habilite a visualização de designs diretamente no editor

3. **Extensão Azure Tools**
   - Necessária para integração com Azure AI Foundry
   - Facilita a configuração de recursos Azure para análise de design

4. **Extensões Específicas para Framework**
   - Para React: React Developer Tools, ESLint, Prettier
   - Para Angular: Angular Language Service, Angular Snippets

### Configuração do settings.json

Adicione as seguintes configurações ao seu `settings.json` do VS Code para otimizar o trabalho com Figma e GitHub Copilot:

```json
{
  "editor.inlineSuggest.enabled": true,
  "github.copilot.enable": {
    "*": true,
    "plaintext": true,
    "markdown": true,
    "javascript": true,
    "typescript": true,
    "html": true,
    "css": true,
    "scss": true
  },
  "github.copilot.advanced": {
    "indentationMode": true,
    "listMode": true
  },
  "mcp.servers": {
    "figma": {
      "command": "npx",
      "args": [
        "figma-developer-mcp",
        "--figma-api-key=${env:FIGMA_API_KEY}"
      ]
    }
  },
  "figma.fileNodeCaching": true,
  "figma.assetFolder": "${workspaceFolder}/src/assets/figma"
}
```

## Instalação de Módulos Node Necessários

Dependendo do framework que você está utilizando, instale os pacotes necessários:

### Para Projetos React

```bash
# Pacotes essenciais
npm install react react-dom

# Escolha uma opção de estilização
npm install styled-components
# OU
npm install tailwindcss postcss autoprefixer
# OU
npm install @emotion/react @emotion/styled

# Ferramentas de desenvolvimento
npm install -D typescript @types/react @types/react-dom
npm install -D eslint eslint-plugin-react eslint-plugin-jsx-a11y

# Bibliotecas de componentes (opcional)
npm install @mui/material @mui/icons-material
# OU
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

### Para Projetos Angular

```bash
# Criar novo projeto Angular
ng new my-project --style=scss

# Adicionar Angular Material
ng add @angular/material

# Ferramentas adicionais
npm install @ngrx/store @ngrx/effects @ngrx/entity
npm install ngx-skeleton-loader
```

## Configuração do Figma MCP Server

O Figma MCP Server (Model Context Protocol) permite que o GitHub Copilot e outros agentes de IA acessem diretamente informações de design do Figma. Siga estas etapas para configurá-lo:

### 1. Obtenha um Token de API do Figma

1. Faça login na sua conta Figma
2. Vá para Configurações > Conta > Tokens de acesso pessoal
3. Crie um novo token com descrição clara (ex: "MCP Server Integration")
4. Copie o token gerado para uso nas próximas etapas

### 2. Instale o Figma Developer MCP

```bash
# Instale globalmente
npm install -g figma-developer-mcp

# Ou use npx para execução única
npx figma-developer-mcp --figma-api-key=SEU_TOKEN_AQUI
```

### 3. Configure o MCP Server no VS Code

Crie um arquivo `.mcp.json` na raiz do seu projeto:

```json
{
  "servers": {
    "figma": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "figma-developer-mcp",
        "--figma-api-key=${env:FIGMA_API_KEY}"
      ]
    }
  }
}
```

### 4. Configure Variáveis de Ambiente

Crie um arquivo `.env` na raiz do seu projeto:

```
FIGMA_API_KEY=seu_token_figma_aqui
GITHUB_TOKEN=seu_token_github_aqui
AZURE_AI_FOUNDRY_KEY=seu_token_azure_aqui
AZURE_AI_FOUNDRY_ENDPOINT=seu_endpoint_azure_aqui
```

Adicione este arquivo ao `.gitignore` para proteger suas chaves.

## Configuração do GitHub Copilot Agent

O GitHub Copilot Agent é uma evolução do GitHub Copilot que permite executar tarefas mais complexas e autônomas. Configure-o seguindo estas etapas:

### 1. Ative o Modo de Agente no VS Code

1. Abra a paleta de comandos (`Ctrl+Shift+P`)
2. Digite e selecione "GitHub Copilot: Enable Agent Mode"
3. Reinicie o VS Code quando solicitado

### 2. Configure Instruções Personalizadas para o Projeto

Crie um arquivo `.github/copilot-instructions.md` na raiz do seu projeto:

```markdown
## Instruções para Conversão Figma-para-Código

### Padrões de Código
- Use TypeScript para todo desenvolvimento de componentes
- Siga princípios de Design Atômico (átomos, moléculas, organismos)
- Implemente design responsivo usando flexbox e CSS Grid
- Gere código compatível com acessibilidade (WCAG AA)
- Use styled-components para React / SCSS para Angular

### Estrutura de Arquivos
- Crie componentes em uma estrutura de pastas consistente
- Inclua documentação Storybook
- Adicione testes unitários apropriados
- Siga tokens de design do Figma

### Integração com Figma
- Use o Figma MCP Server para extrair informações precisas de design
- Mantenha fidelidade visual com o design original
- Preserve nomenclatura de componentes do Figma quando apropriado
- Extraia e utilize variáveis de design como tokens CSS
```

### 3. Configure Regras para Geração de Código

Crie os seguintes arquivos de configuração na raiz do seu projeto:

#### .cursorrules

```json
{
  "typescript": {
    "componentNaming": "PascalCase",
    "indentation": 2,
    "quoteStyle": "single",
    "componentPattern": "functional"
  },
  "css": {
    "preprocessor": "scss",
    "methodology": "BEM"
  }
}
```

#### .builderrules

```
Use TypeScript para todos os componentes
Siga princípios de Design Atômico
Implemente design responsivo com flexbox e CSS Grid
Gere código compatível com WCAG AA
Extraia tokens de design do Figma como variáveis CSS
```

#### .builderignore

```
node_modules/
dist/
build/
.storybook/
__tests__/
*.test.ts
*.test.tsx
```

## Configuração do Azure AI Foundry

O Azure AI Foundry pode ser utilizado para análise avançada de design e otimização de código. Configure-o seguindo estas etapas:

### 1. Crie um Recurso Azure AI Foundry

1. Acesse o Portal Azure
2. Crie um novo recurso Azure AI Foundry
3. Obtenha a chave de API e o endpoint

### 2. Configure a Integração no Projeto

Crie um arquivo `src/utils/azure-ai-foundry.ts`:

```typescript
import { AzureAIFoundryClient } from '@azure/ai-foundry';

// Crie um cliente
export const aiFoundryClient = new AzureAIFoundryClient({
  endpoint: process.env.AZURE_AI_FOUNDRY_ENDPOINT || '',
  apiKey: process.env.AZURE_AI_FOUNDRY_KEY || ''
});

// Analisar um design
export async function analyzeDesign(figmaImage: string) {
  const result = await aiFoundryClient.analyzeImage({
    image: figmaImage,
    features: ['componentDetection', 'accessibilityCheck']
  });
  
  return result;
}

// Gerar código otimizado
export async function generateOptimizedCode(designSpec: any, framework: 'react' | 'angular') {
  const result = await aiFoundryClient.generateCode({
    specification: designSpec,
    framework: framework,
    optimizationLevel: 'production'
  });
  
  return result.code;
}
```

## Configuração de Ferramentas Complementares

### Visual Copilot (Builder.io)

O Visual Copilot da Builder.io é uma ferramenta especializada em conversão Figma-para-código que pode complementar o GitHub Copilot:

1. Instale o plugin do Visual Copilot no Figma
2. Configure a integração com seu repositório GitHub
3. Defina preferências de geração de código (React, Vue, Angular, etc.)

### Cursor

O Cursor é um editor baseado em VS Code com recursos avançados de IA:

1. Baixe e instale o Cursor (https://cursor.sh)
2. Configure a integração com Figma MCP Server
3. Configure atalhos de teclado para comandos de geração de código

## Verificação da Configuração

Após configurar todo o ambiente, execute esta checklist para garantir que tudo está funcionando corretamente:

1. **Teste o GitHub Copilot Agent:**
   - Abra um arquivo de código
   - Use o comando `/agent` no chat do Copilot
   - Verifique se o agente responde corretamente

2. **Teste a Integração com Figma MCP:**
   - Use o comando `/agent` seguido de um link do Figma
   - Verifique se o agente consegue acessar informações do design

3. **Teste a Geração de Código:**
   - Solicite ao agente para gerar um componente simples
   - Verifique se o código gerado segue as regras configuradas

4. **Teste a Integração com Azure AI Foundry:**
   - Execute uma análise de design simples
   - Verifique se os resultados são retornados corretamente

Com este ambiente configurado, você está pronto para aproveitar ao máximo as ferramentas de IA para conversão de designs Figma em código de alta qualidade.
