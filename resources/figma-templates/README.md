# Figma Component Templates

Este diretório contém templates JSON detalhados para componentes comuns de UI/UX no Figma. Estes templates servem como guias de referência para criar componentes consistentes e bem estruturados.

## Templates Disponíveis

### 1. Button Component (`button-component.template.json`)
Template completo para criação de botões com múltiplas variantes e estados.

**Características principais:**
- 5 variantes de estilo (Primary, Secondary, Tertiary, Danger, Ghost)
- 3 tamanhos (Small, Medium, Large)
- 5 estados (Default, Hover, Pressed, Disabled, Loading)
- Suporte para ícones (Leading, Trailing, Only)
- Tokens de design incluídos

### 2. Input Component (`input-component.template.json`)
Template para campos de entrada de dados com validação e estados.

**Características principais:**
- 6 tipos de input (Text, Email, Password, Number, Search, Textarea)
- 7 estados (Default, Hover, Focus, Filled, Disabled, Error, Success)
- Labels flutuantes opcionais
- Suporte para ícones e mensagens de ajuda
- Validação visual integrada

### 3. Card Component (`card-component.template.json`)
Template versátil para cards de conteúdo.

**Características principais:**
- 6 tipos (Basic, Media, Interactive, Product, Profile, Stats)
- 4 níveis de elevação
- Suporte para orientação vertical/horizontal
- Área de mídia opcional
- Sistema de badges

### 4. Navigation Component (`navigation-component.template.json`)
Template para barras de navegação responsivas.

**Características principais:**
- 5 tipos (Simple, Complex, Mega Menu, Mobile, Sidebar)
- 4 temas (Light, Dark, Transparent, Gradient)
- Mega menu suportado
- Navegação mobile com drawer
- Busca expansível

### 5. Modal Component (`modal-component.template.json`)
Template para modais e diálogos.

**Características principais:**
- 5 tipos (Alert, Confirm, Form, Full, Custom)
- 4 tamanhos incluindo tela cheia
- Animações de entrada/saída
- Overlay configurável
- Acessibilidade completa

### 6. Table Component (`table-component.template.json`)
Template avançado para tabelas de dados.

**Características principais:**
- Ordenação por coluna
- Filtros avançados
- Paginação integrada
- Seleção de linhas
- Virtualização para performance
- Layout responsivo (cards no mobile)

### 7. Form Component (`form-component.template.json`)
Template completo para formulários.

**Características principais:**
- Múltiplos tipos de campos
- Validação em tempo real
- Layouts flexíveis (Vertical, Grid, Inline)
- Agrupamento de campos
- Indicadores de progresso

### 8. Tabs Component (`tabs-component.template.json`)
Template para interfaces com abas.

**Características principais:**
- 5 estilos visuais
- Suporte para ícones e badges
- Layout vertical opcional
- Scroll horizontal automático
- Animações de transição

## Como Usar os Templates

### 1. Estrutura dos Templates

Cada template contém:
- **variants**: Diferentes variações do componente
- **properties**: Propriedades de layout e dimensionamento
- **colors**: Paleta de cores para temas light/dark
- **typography**: Especificações de fonte
- **states**: Estados interativos
- **accessibility**: Propriedades de acessibilidade

### 2. Implementação no Figma

1. **Criar Component Set**: Use a estrutura definida no template
2. **Aplicar Variantes**: Configure as propriedades de variantes
3. **Definir Auto Layout**: Siga as especificações de layout
4. **Adicionar Estados**: Implemente os estados interativos
5. **Configurar Cores**: Use os tokens de cor fornecidos

### 3. Integração com Código

Os templates são estruturados para facilitar a conversão para código:

```javascript
// Exemplo de uso dos tokens
const buttonStyles = {
  padding: template.properties.paddingX.medium,
  fontSize: template.properties.fontSize.medium,
  borderRadius: template.properties.borderRadius,
  // ...
};
```

### 4. Personalização

Todos os templates podem ser personalizados:
- Adicione novas variantes
- Modifique cores e tipografia
- Ajuste espaçamentos
- Estenda funcionalidades

## Convenções e Padrões

### Nomenclatura
- **Componentes**: PascalCase (ex: ButtonComponent)
- **Variantes**: PascalCase (ex: Primary, Secondary)
- **Estados**: PascalCase (ex: Default, Hover)
- **Propriedades**: camelCase (ex: fontSize, borderRadius)

### Cores
- Sempre incluir temas light e dark
- Usar notação hexadecimal para cores sólidas
- Usar rgba() para transparências

### Dimensionamento
- Tamanhos em pixels
- Usar múltiplos de 4 ou 8 para consistência
- Incluir valores responsivos quando aplicável

### Acessibilidade
- Incluir roles ARIA apropriados
- Definir labels descritivos
- Garantir contraste adequado
- Suportar navegação por teclado

## Workflow de Design para Código

1. **Design no Figma**: Use os templates como base
2. **Export Design Tokens**: Extraia cores, fontes e espaçamentos
3. **Gerar Componente**: Use ferramentas AI para converter
4. **Refinar Código**: Ajuste para seu framework específico
5. **Testar**: Valide responsividade e acessibilidade

## Manutenção

- Revise templates periodicamente
- Atualize com novos padrões de design
- Mantenha sincronização com design system
- Documente mudanças significativas

## Contribuindo

Para adicionar novos templates:
1. Siga a estrutura existente
2. Inclua todas as variantes comuns
3. Adicione propriedades de acessibilidade
4. Documente no README
5. Teste a conversão para código

## Recursos Adicionais

- [Figma Dev Mode Documentation](https://www.figma.com/dev-mode/)
- [Design Tokens Specification](https://www.w3.org/community/design-tokens/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) 