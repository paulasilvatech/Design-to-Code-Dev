# Visual Assets for Design-to-Code Enterprise Playbook

This directory contains visual assets used throughout the Design-to-Code Enterprise Playbook documentation.

## Required Diagrams

The following diagrams are referenced in the main documentation and should be created:

### Main Process Diagram
- **File**: `design-to-code-process-diagram.svg`
- **Description**: High-level overview of the design-to-code workflow
- **Dimensions**: 700px width, responsive height
- **Content**: Shows the flow from Figma → AI Analysis → Code Generation → Production

### AI Architecture Diagram
- **File**: `ai-design-to-code-architecture.svg`
- **Description**: Technical architecture showing AI integration layers
- **Dimensions**: 700px width, responsive height
- **Content**: Illustrates the integration between Figma API, GitHub Copilot, Azure AI, and output frameworks

## Diagram Creation Guidelines

### Style Guidelines
- **Color Scheme**: Use professional blue/teal palette consistent with tech documentation
- **Typography**: Clean, sans-serif fonts (Inter, Roboto, or similar)
- **Icons**: Modern, flat design style
- **Layout**: Left-to-right flow for processes, layered view for architectures

### Technical Requirements
- **Format**: SVG for scalability and small file size
- **Accessibility**: Include proper alt text and description elements
- **Responsive**: Should scale well from mobile to desktop
- **Theme Support**: Consider dark/light mode compatibility

### Content Requirements

#### Design-to-Code Process Diagram Should Include:
1. **Design Phase**: Figma logo/icon with "Component Design"
2. **Analysis Phase**: AI/brain icon with "Pattern Recognition"
3. **Generation Phase**: Code icon with "Framework Output"
4. **Integration Phase**: Gear icon with "Design System"
5. **Production Phase**: Deployment icon with "Live Application"

#### AI Architecture Diagram Should Include:
- **Design Layer**: Figma components, design tokens, Auto Layout
- **AI Processing Layer**: GitHub Copilot, Azure AI Foundry, MCP servers
- **Framework Layer**: React, Angular, Vue components
- **Output Layer**: Production applications, component libraries

## Placeholder Content

Until the actual diagrams are created, the documentation will gracefully handle missing images. The content is structured to be meaningful even without visual aids.

## Creating the Diagrams

### Recommended Tools
- **Figma**: For creating the initial designs
- **Lucidchart**: For technical architecture diagrams
- **Draw.io**: Free alternative for diagram creation
- **Adobe Illustrator**: For professional SVG creation

### Export Settings
- Format: SVG
- Optimize for web
- Include viewBox for responsiveness
- Minimize file size while maintaining quality

## Contributing Diagrams

If you'd like to contribute diagrams:

1. Follow the style guidelines above
2. Create SVG files with the specified names
3. Test on different screen sizes
4. Ensure accessibility compliance
5. Submit via pull request with preview images

## Usage in Documentation

The diagrams are referenced in markdown as:

```markdown
<div align="center">
  <img src="docs/images/design-to-code-process-diagram.svg" alt="Design-to-Code Process Diagram" width="700">
</div>
```

This ensures:
- Proper centering
- Alt text for accessibility
- Responsive sizing
- Consistent presentation across the documentation 