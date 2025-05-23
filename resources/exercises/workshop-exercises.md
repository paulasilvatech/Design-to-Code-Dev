# Design-to-Code Workshop Exercises

## Module 1: Introduction Exercises

### Exercise 1.1: Environment Verification
**Objective**: Verify all tools are properly installed

1. Check Node.js version:
   ```bash
   node --version  # Should be 18.x or higher
   ```

2. Verify npm/yarn:
   ```bash
   npm --version
   yarn --version
   ```

3. Test Git installation:
   ```bash
   git --version
   ```

4. Verify VS Code extensions:
   - GitHub Copilot
   - Figma for VS Code
   - Prettier
   - ESLint

### Exercise 1.2: Create Your First Project
**Objective**: Set up a basic project structure

1. Create a new React + TypeScript project:
   ```bash
   npm create vite@latest my-design-system -- --template react-ts
   cd my-design-system
   npm install
   ```

2. Install design-to-code dependencies:
   ```bash
   npm install styled-components @types/styled-components
   npm install -D @storybook/react @storybook/addon-essentials
   ```

3. Initialize Storybook:
   ```bash
   npx storybook@latest init
   ```

## Module 2: Environment Setup Exercises

### Exercise 2.1: Configure MCP Connection
**Objective**: Set up MCP server connection

1. Create `.env` file from template
2. Add your Figma API token
3. Test connection:
   ```bash
   npm run test:mcp-connection
   ```

### Exercise 2.2: First Component Generation
**Objective**: Generate a simple button component

1. Use the Figma file: `workshop-example-123`
2. Find the Button component (nodeId: `1:100`)
3. Run generation command:
   ```bash
   npm run generate:component -- workshop-example-123 1:100 Button
   ```

4. Verify generated files:
   - `src/components/Button/Button.tsx`
   - `src/components/Button/Button.styles.ts`
   - `src/components/Button/Button.test.tsx`
   - `src/components/Button/Button.stories.tsx`

## Module 3: Figma Analysis Exercises

### Exercise 3.1: Extract Design Tokens
**Objective**: Extract colors and typography from Figma

1. Open Figma Dev Mode
2. Select the example design system
3. Use the extraction script:
   ```bash
   npm run extract:tokens -- workshop-example-123
   ```

4. Verify `src/styles/tokens.json` contains:
   - Color palette
   - Typography scales
   - Spacing values

### Exercise 3.2: Analyze Component Structure
**Objective**: Understand component hierarchy

1. Select the Card component in Figma
2. Identify:
   - Layout structure (vertical/horizontal)
   - Nested components
   - Interactive states
   - Responsive behavior

3. Document findings in `docs/component-analysis.md`

### Exercise 3.3: Map Design Variants
**Objective**: Map Figma variants to code

1. Find a component with variants (Button)
2. List all variants:
   - Size: small, medium, large
   - Type: primary, secondary, danger
   - State: default, hover, disabled

3. Create TypeScript interface:
   ```typescript
   interface ButtonProps {
     size?: 'small' | 'medium' | 'large';
     variant?: 'primary' | 'secondary' | 'danger';
     disabled?: boolean;
   }
   ```

## Module 4: AI-Powered Generation Exercises

### Exercise 4.1: Generate Complex Component
**Objective**: Generate a Card component with AI assistance

1. Select Card component (nodeId: `1:300`)
2. Use AI-enhanced generation:
   ```bash
   npm run generate:component -- workshop-example-123 1:300 Card --ai-enhanced
   ```

3. Review generated code for:
   - Proper TypeScript types
   - Responsive design
   - Accessibility features
   - Performance optimizations

### Exercise 4.2: Batch Component Generation
**Objective**: Generate multiple related components

1. Create a component list file:
   ```json
   {
     "components": [
       { "nodeId": "1:100", "name": "Button" },
       { "nodeId": "1:200", "name": "Input" },
       { "nodeId": "1:300", "name": "Card" }
     ]
   }
   ```

2. Run batch generation:
   ```bash
   npm run generate:batch -- component-list.json
   ```

3. Verify all components generated correctly

### Exercise 4.3: Custom Prompt Engineering
**Objective**: Create custom generation prompts

1. Create a custom prompt for form generation
2. Include specific requirements:
   - Validation logic
   - Error handling
   - Accessibility features
   - Form state management

3. Test with Input component

## Module 5: Azure AI Integration Exercises

### Exercise 5.1: Configure Azure Services
**Objective**: Set up Azure AI services

1. Update `.env` with Azure credentials
2. Test Computer Vision API:
   ```bash
   npm run test:azure-cv
   ```

3. Test Form Recognizer:
   ```bash
   npm run test:azure-fr
   ```

### Exercise 5.2: Design Analysis with AI
**Objective**: Use AI to analyze design patterns

1. Export a Figma frame as PNG
2. Run AI analysis:
   ```bash
   npm run analyze:design -- design-export.png
   ```

3. Review analysis results:
   - Component detection
   - Layout analysis
   - Color extraction
   - Accessibility suggestions

### Exercise 5.3: Generate from Screenshot
**Objective**: Generate component from design screenshot

1. Take screenshot of a web component
2. Run screenshot-to-code:
   ```bash
   npm run generate:from-image -- screenshot.png Button
   ```

3. Compare with original design

## Module 6: Advanced Workflows Exercises

### Exercise 6.1: Create CI/CD Pipeline
**Objective**: Automate component generation

1. Create GitHub Action workflow
2. Set up triggers:
   - On Figma webhook
   - On manual dispatch
   - On schedule

3. Test pipeline with small change

### Exercise 6.2: Design System Integration
**Objective**: Integrate with existing design system

1. Import existing design tokens
2. Map Figma components to system components
3. Generate adapter layer
4. Test compatibility

### Exercise 6.3: Performance Optimization
**Objective**: Optimize generated components

1. Run performance audit:
   ```bash
   npm run audit:performance
   ```

2. Identify optimization opportunities:
   - Bundle size
   - Render performance
   - Code splitting

3. Apply optimizations and re-test

## Module 7: Testing & Quality Exercises

### Exercise 7.1: Unit Testing
**Objective**: Test generated components

1. Review generated tests
2. Add custom test cases:
   - Edge cases
   - Error states
   - Accessibility

3. Run test coverage:
   ```bash
   npm run test:coverage
   ```

### Exercise 7.2: Visual Regression Testing
**Objective**: Set up visual testing

1. Configure Chromatic
2. Create baseline snapshots
3. Make design change
4. Review visual diff

### Exercise 7.3: Accessibility Audit
**Objective**: Ensure components are accessible

1. Run accessibility tests:
   ```bash
   npm run test:a11y
   ```

2. Fix any issues found
3. Add ARIA attributes
4. Test with screen reader

## Module 8: Production Deployment Exercises

### Exercise 8.1: Build Component Library
**Objective**: Package components for distribution

1. Configure build process
2. Create package.json exports
3. Build library:
   ```bash
   npm run build:lib
   ```

4. Test in separate project

### Exercise 8.2: Documentation Site
**Objective**: Deploy Storybook documentation

1. Build Storybook:
   ```bash
   npm run build:storybook
   ```

2. Deploy to GitHub Pages
3. Configure custom domain
4. Add analytics

### Exercise 8.3: Monitoring & Analytics
**Objective**: Track component usage

1. Add telemetry to components
2. Set up dashboard
3. Monitor:
   - Component usage
   - Performance metrics
   - Error rates

## Bonus Exercises

### Bonus 1: Custom Framework Support
**Objective**: Generate for different frameworks

1. Modify generator for Vue.js
2. Test with Button component
3. Compare output quality

### Bonus 2: Design System Migration
**Objective**: Migrate existing components

1. Select legacy component
2. Extract design from screenshot
3. Generate modern version
4. Create migration guide

### Bonus 3: AI Model Fine-tuning
**Objective**: Improve generation quality

1. Collect generation examples
2. Create training dataset
3. Fine-tune prompts
4. Measure improvement

## Exercise Solutions

Solutions for all exercises are available in the `resources/solutions/` directory. Try to complete exercises independently before checking solutions.

## Tips for Success

1. **Start Simple**: Begin with basic components before moving to complex ones
2. **Iterate Often**: Generate, test, refine, repeat
3. **Document Everything**: Keep notes on what works and what doesn't
4. **Collaborate**: Share findings with other workshop participants
5. **Ask Questions**: No question is too simple
6. **Experiment**: Try different approaches and compare results

## Troubleshooting Guide

### Common Issues and Solutions

1. **MCP Connection Failed**
   - Check firewall settings
   - Verify auth token
   - Restart MCP server

2. **Component Generation Errors**
   - Validate Figma permissions
   - Check node ID format
   - Review error logs

3. **Azure AI Timeout**
   - Check API quotas
   - Verify network connection
   - Try smaller images

4. **Build Failures**
   - Clear node_modules
   - Update dependencies
   - Check TypeScript errors

For additional help, see `docs/advanced-troubleshooting-guide.md` 