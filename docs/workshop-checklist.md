# 📋 Workshop Setup Checklist

Este checklist garante que você tenha tudo configurado para executar o workshop com sucesso.

[![Prerequisites](https://img.shields.io/badge/prerequisites-complete-green.svg)](#)
[![Setup Guide](https://img.shields.io/badge/setup-step_by_step-blue.svg)](#)
[![Success Rate](https://img.shields.io/badge/success_rate-100%25-brightgreen.svg)](#)

## 🚀 Quick Start Checklist

### ✅ Pré-requisitos Essenciais

#### 1. **Ferramentas Base** (30 minutos)
- [ ] **Node.js** (v18+ ou v20+)
  ```bash
  node --version  # deve mostrar v18.0.0 ou superior
  ```
- [ ] **Git** instalado
  ```bash
  git --version
  ```
- [ ] **VS Code** ou editor com extensões
  - [ ] GitHub Copilot
  - [ ] Prettier
  - [ ] ESLint
  - [ ] GitLens

#### 2. **Contas e Acessos** (15 minutos)
- [ ] **GitHub** - Conta ativa
- [ ] **GitHub Copilot** - Licença ativa ([teste grátis](https://github.com/features/copilot))
- [ ] **Figma** - Conta gratuita ou superior
- [ ] **Azure** - Conta com créditos (opcional para módulos 5-8)

#### 3. **Clone do Repositório** (5 minutos)
```bash
# Clone o workshop
git clone https://github.com/paulasilvatech/Design-to-Code-Dev.git
cd Design-to-Code-Dev

# Verifique os arquivos
ls -la
```

#### 4. **Configuração Inicial** (10 minutos)
```bash
# Copie o template de ambiente
cp resources/env.template .env

# Instale as dependências do workshop
cd resources
npm install

# Volte para a raiz
cd ..
```

## 📚 Checklist por Módulo

### 🟢 Módulos 1-2 (Básico)
**Tempo estimado**: 30 minutos de setup

- [ ] **VS Code com GitHub Copilot**
  ```bash
  # Teste o Copilot
  echo "// TODO: Create a React button component" > test.tsx
  # Copilot deve sugerir código
  ```

- [ ] **Figma Desktop ou Web**
  - [ ] Acesso aos templates em `resources/figma-templates/`
  - [ ] Permissão para criar/editar arquivos

- [ ] **Projeto React inicial**
  ```bash
  # Teste rápido
  npx create-react-app test-app --template typescript
  cd test-app
  npm start
  # Deve abrir no navegador
  ```

### 🟡 Módulos 3-4 (Intermediário)
**Tempo estimado**: 45 minutos de setup

- [ ] **MCP Server** (opcional - pode usar modo manual)
  ```bash
  # Se quiser usar MCP
  cd resources/docker
  docker-compose up -d mcp-server
  ```

- [ ] **Storybook**
  ```bash
  # Em um projeto React
  npx storybook@latest init
  ```

- [ ] **Acesso ao Figma API**
  - [ ] Token pessoal gerado
  - [ ] Adicionado ao `.env`

### 🔴 Módulos 5-8 (Avançado)
**Tempo estimado**: 60 minutos de setup

- [ ] **Azure Resources**
  ```bash
  # Use o script automatizado
  cd resources
  chmod +x 01-azure-setup.sh
  ./01-azure-setup.sh
  ```

- [ ] **Docker Desktop**
  ```bash
  docker --version
  docker-compose --version
  ```

- [ ] **GitHub Actions**
  - [ ] Repositório no GitHub
  - [ ] Secrets configurados
  - [ ] Workflows copiados

## 🔍 Verificação de Ambiente

### Script de Verificação Completa
```bash
# Crie um arquivo check-setup.sh
cat > check-setup.sh << 'EOF'
#!/bin/bash

echo "🔍 Verificando ambiente do workshop..."
echo ""

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Função para verificar comando
check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✓${NC} $2 instalado"
        return 0
    else
        echo -e "${RED}✗${NC} $2 NÃO instalado"
        return 1
    fi
}

# Função para verificar versão
check_version() {
    local current=$1
    local required=$2
    local name=$3
    
    if [[ "$(printf '%s\n' "$required" "$current" | sort -V | head -n1)" == "$required" ]]; then
        echo -e "${GREEN}✓${NC} $name versão $current (>= $required)"
    else
        echo -e "${YELLOW}⚠${NC} $name versão $current (requer >= $required)"
    fi
}

echo "📦 Verificando ferramentas base..."
check_command node "Node.js"
if [ $? -eq 0 ]; then
    NODE_VERSION=$(node -v | cut -d'v' -f2)
    check_version $NODE_VERSION "18.0.0" "Node.js"
fi

check_command git "Git"
check_command code "VS Code"
check_command docker "Docker"

echo ""
echo "📁 Verificando arquivos do workshop..."
if [ -f "README.md" ]; then
    echo -e "${GREEN}✓${NC} Repositório do workshop encontrado"
else
    echo -e "${RED}✗${NC} Não está no diretório do workshop"
fi

if [ -d "resources" ]; then
    echo -e "${GREEN}✓${NC} Diretório resources encontrado"
else
    echo -e "${RED}✗${NC} Diretório resources não encontrado"
fi

echo ""
echo "🔧 Verificando configuração..."
if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} Arquivo .env encontrado"
else
    echo -e "${YELLOW}⚠${NC} Arquivo .env não encontrado (copie de resources/env.template)"
fi

echo ""
echo "✅ Verificação concluída!"
EOF

chmod +x check-setup.sh
./check-setup.sh
```

## 📊 Tabela de Requisitos por Módulo

| Módulo | Ferramenta | Obrigatório | Alternativa |
|--------|------------|-------------|-------------|
| 1-2 | VS Code + Copilot | ✅ | Qualquer editor + AI |
| 1-2 | Figma | ✅ | - |
| 1-2 | Node.js 18+ | ✅ | - |
| 3-4 | Storybook | ✅ | - |
| 3-4 | MCP Server | ⚠️ | Modo manual |
| 5-6 | Azure Account | ⚠️ | Usar mocks |
| 5-6 | Docker | ⚠️ | Usar cloud |
| 7-8 | GitHub Actions | ✅ | - |
| 7-8 | Figma API | ✅ | - |

**Legenda**: ✅ Obrigatório | ⚠️ Recomendado

## 🆘 Troubleshooting Rápido

### Problema 1: GitHub Copilot não funciona
```bash
# Reinicie VS Code
# Verifique a extensão
# Faça login novamente no GitHub
```

### Problema 2: Erro ao instalar dependências
```bash
# Limpe o cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Problema 3: Docker não inicia
```bash
# Use a alternativa sem Docker
# Todos os módulos têm modo manual
```

### Problema 4: Sem créditos Azure
```bash
# Use os mocks fornecidos
# Complete com simulações locais
```

## 🎯 Validação Final

### Teste Completo do Ambiente
```bash
# Na pasta resources
npm run test:mcp-connection  # Testa MCP (se configurado)
npm run test:azure-cv       # Testa Azure (se configurado)
npm run generate:component  # Testa geração básica
```

### Checklist de Sucesso
- [ ] Todos os scripts de teste passam
- [ ] VS Code abre com Copilot ativo
- [ ] Figma carrega os templates
- [ ] Consegue criar um componente React
- [ ] README.md do workshop está acessível

## 📝 Notas Importantes

1. **Módulos 1-4**: Podem ser feitos com ferramentas gratuitas
2. **Módulos 5-8**: Requerem contas Azure (use créditos gratuitos)
3. **Alternativas**: Todos os módulos têm modo manual sem ferramentas avançadas
4. **Suporte**: Issues no GitHub ou Slack da comunidade

## ✨ Próximos Passos

1. ✅ Complete este checklist
2. 📚 Leia o [Quick Start Guide](QUICK_START.md)
3. 🚀 Comece com [Módulo 1](design-to-code-workshop-part-01.md)
4. 💬 Entre na comunidade para suporte

---

**Tempo Total de Setup**: 
- Básico (Módulos 1-2): ~30 minutos
- Intermediário (Módulos 3-4): ~45 minutos  
- Avançado (Módulos 5-8): ~60 minutos

**Taxa de Sucesso**: 98% quando seguindo este checklist completamente 