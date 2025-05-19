# 📚 Component Library Implementation

This guide provides detailed instructions for creating and managing a consistent component library based on your Figma designs.

## Table of Contents
- [Component Library Fundamentals](#component-library-fundamentals)
- [Setting Up a Component Library](#setting-up-a-component-library)
- [Component Design System](#component-design-system)
- [Documentation with Storybook](#documentation-with-storybook)
- [Publishing and Versioning](#publishing-and-versioning)
- [Consuming the Component Library](#consuming-the-component-library)
- [Maintenance and Evolution](#maintenance-and-evolution)
- [Best Practices](#best-practices)

## Component Library Fundamentals

A component library is a collection of reusable UI components that follow consistent design patterns and can be assembled to create user interfaces. Key benefits include:

1. **Consistency**: Unified UI across different applications
2. **Efficiency**: Faster development through reuse
3. **Maintainability**: Centralized updates and bug fixes
4. **Documentation**: Single source of truth for UI components
5. **Collaboration**: Improved communication between design and development

### Component Library Types

1. **Internal Library**: Used within a single organization
   - Shared across multiple projects
   - Customized for organization-specific needs

2. **Open Source Library**: Publicly available for anyone to use
   - Examples: Material UI, Chakra UI, Ant Design
   - Requires more extensive documentation and testing

3. **White-label Library**: Customizable for different brands
   - Supports theming and styling overrides
   - Used for products with multiple brand implementations

## Setting Up a Component Library

### For React Projects

#### Using Create React Library

```bash
# Install create-react-library globally
npm install -g create-react-library

# Create a new library
npx create-react-library my-component-library

# Navigate to the project
cd my-component-library

# Start the development environment
npm start
```

#### Using TSDX

```bash
# Create a new TypeScript library with TSDX
npx tsdx create my-component-library

# Choose "react" as the template

# Navigate to the project
cd my-component-library

# Start the development environment
npm start
```

#### Folder Structure

```
my-component-library/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.styles.ts
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   ├── Card/
│   │   │   └── ...
│   │   └── index.ts
│   ├── themes/
│   │   ├── default.ts
│   │   └── index.ts
│   ├── utils/
│   │   └── index.ts
│   └── index.ts
├── .storybook/
│   ├── main.js
│   └── preview.js
├── package.json
└── tsconfig.json
```

### For Angular Projects

#### Using Angular CLI Library Generation

```bash
# Create a new workspace if you don't have one
ng new my-component-workspace --create-application=false

# Navigate to the workspace
cd my-component-workspace

# Generate a library
ng generate library my-component-library

# Start the development server with a test application
ng generate application test-app
ng serve test-app
```

#### Folder Structure

```
my-component-workspace/
├── projects/
│   ├── my-component-library/
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── components/
│   │   │   │   │   ├── button/
│   │   │   │   │   └── card/
│   │   │   │   ├── directives/
│   │   │   │   ├── pipes/
│   │   │   │   └── my-component-library.module.ts
│   │   │   ├── public-api.ts
│   │   │   └── index.ts
│   │   ├── karma.conf.js
│   │   ├── ng-package.json
│   │   ├── package.json
│   │   └── tsconfig.lib.json
│   └── test-app/
│       └── ...
├── angular.json
└── package.json
```

## Component Design System

### Defining Design Tokens

Design tokens are the visual design atoms of the design system - they define colors, typography, spacing, and other visual properties.

#### Example Design Tokens (TypeScript)

```typescript
// src/tokens/colors.ts
export const colors = {
  primary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3', // Main primary color
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',
};

// src/tokens/typography.ts
export const typography = {
  fontFamily: {
    body: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
    heading: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
    monospace: '"SF Mono", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", monospace',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    md: '1rem',       // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    loose: 1.75,
  },
};

// src/tokens/spacing.ts
export const spacing = {
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem',  // 40px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
  20: '5rem',    // 80px
  24: '6rem',    // 96px
};

// src/tokens/index.ts
export * from './colors';
export * from './typography';
export * from './spacing';
```

### Creating a Theme System

A theme system allows for consistent styling and supports multiple themes (e.g., light and dark modes).

#### React Theme Example with Styled Components

```typescript
// src/themes/ThemeProvider.tsx
import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './themes';

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// src/themes/themes.ts
import { colors, typography, spacing } from '../tokens';

export const lightTheme = {
  colors: {
    background: colors.neutral[50],
    surface: '#FFFFFF',
    text: {
      primary: colors.neutral[900],
      secondary: colors.neutral[700],
      disabled: colors.neutral[500],
    },
    primary: colors.primary[500],
    primaryLight: colors.primary[300],
    primaryDark: colors.primary[700],
    // ... other colors
  },
  typography,
  spacing,
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: colors.neutral[900],
    surface: colors.neutral[800],
    text: {
      primary: colors.neutral[50],
      secondary: colors.neutral[300],
      disabled: colors.neutral[500],
    },
    // ... other colors adjusted for dark mode
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.9)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.8), 0 2px 4px -1px rgba(0, 0, 0, 0.9)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.9), 0 4px 6px -2px rgba(0, 0, 0, 0.9)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.9), 0 10px 10px -5px rgba(0, 0, 0, 0.9)',
  },
};
```

#### Angular Theme Example

```scss
// projects/my-component-library/src/lib/styles/_variables.scss
@use 'sass:map';

// Create theme maps
$light-theme: (
  background: #FAFAFA,
  surface: #FFFFFF,
  text-primary: #212121,
  text-secondary: #616161,
  text-disabled: #9E9E9E,
  primary: #2196F3,
  primary-light: #64B5F6,
  primary-dark: #1976D2,
  // ... other colors
);

$dark-theme: (
  background: #212121,
  surface: #424242,
  text-primary: #FAFAFA,
  text-secondary: #E0E0E0,
  text-disabled: #9E9E9E,
  primary: #90CAF9,
  primary-light: #BBDEFB,
  primary-dark: #42A5F5,
  // ... other colors
);

// Typography variables
$font-family-body: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
$font-family-heading: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
$font-family-monospace: 'SF Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', monospace;

// Generate CSS variables from theme
@mixin generate-css-vars($theme) {
  @each $name, $value in $theme {
    --#{$name}: #{$value};
  }
}

// Define global styles
:root {
  // Apply light theme by default
  @include generate-css-vars($light-theme);
  
  // Typography
  --font-family-body: #{$font-family-body};
  --font-family-heading: #{$font-family-heading};
  --font-family-monospace: #{$font-family-monospace};
  
  // Font weights
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  // Font sizes
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;
  
  // Line heights
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-loose: 1.75;
  
  // ... other variables
}

// Dark theme class
.dark-theme {
  @include generate-css-vars($dark-theme);
}
```

## Documentation with Storybook

Storybook is an open-source tool for developing UI components in isolation and documenting them interactively.

### Setting Up Storybook

```bash
# For React
npx storybook init

# For Angular
npx storybook init --type angular
```

### Writing Component Stories

#### React Component Story

```tsx
// src/components/Button/Button.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outlined'],
      defaultValue: 'primary',
      description: 'The visual style of the button'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
      description: 'The size of the button'
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
      description: 'Whether the button is disabled'
    },
    onClick: { action: 'clicked' }
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Outlined Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};
```

#### Angular Component Story

```typescript
// projects/my-component-library/src/lib/components/button/button.stories.ts
import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [MatIconModule, MatProgressSpinnerModule],
    }),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outlined'],
      defaultValue: 'primary',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    loading: {
      control: 'boolean',
      defaultValue: false,
    },
    leftIcon: {
      control: 'text',
    },
    rightIcon: {
      control: 'text',
    },
    clicked: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: (args) => ({
    props: args,
    template: `<app-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [leftIcon]="leftIcon" [rightIcon]="rightIcon" (clicked)="clicked($event)">Primary Button</app-button>`,
  }),
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  render: (args) => ({
    props: args,
    template: `<app-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [leftIcon]="leftIcon" [rightIcon]="rightIcon" (clicked)="clicked($event)">Secondary Button</app-button>`,
  }),
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
  render: (args) => ({
    props: args,
    template: `<app-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [leftIcon]="leftIcon" [rightIcon]="rightIcon" (clicked)="clicked($event)">Outlined Button</app-button>`,
  }),
};

export const WithIcon: Story = {
  args: {
    leftIcon: 'star',
  },
  render: (args) => ({
    props: args,
    template: `<app-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" [leftIcon]="leftIcon" [rightIcon]="rightIcon" (clicked)="clicked($event)">Button with Icon</app-button>`,
  }),
};

export const Loading: Story = {
  args: {
    loading: true,
  },
  render: (args) => ({
    props: args,
    template: `<app-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading" (clicked)="clicked($event)">Loading Button</app-button>`,
  }),
};
```

### Adding Documentation

Storybook supports MDX for component documentation:

```jsx
// src/components/Button/Button.mdx
import { Meta, Story, Canvas, ArgsTable } from '@storybook/blocks';
import * as ButtonStories from './Button.stories';
import { Button } from './Button';

<Meta title="Components/Button/Documentation" />

# Button Component

Buttons are used to trigger actions or events, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation.

## Features

- Multiple variants: primary, secondary, outlined
- Different sizes: small, medium, large
- Support for icons
- Loading state
- Fully accessible

## Usage

```jsx
import { Button } from 'my-component-library';

function MyComponent() {
  return (
    <Button 
      variant="primary"
      size="medium"
      onClick={() => console.log('Button clicked!')}
    >
      Click Me
    </Button>
  );
}
```

## Examples

### Basic Button Variants

<Canvas>
  <Story of={ButtonStories.Primary} />
  <Story of={ButtonStories.Secondary} />
  <Story of={ButtonStories.Outlined} />
</Canvas>

### Sizes

<Canvas>
  <Story of={ButtonStories.Small} />
  <Story of={ButtonStories.Primary} />
  <Story of={ButtonStories.Large} />
</Canvas>

### States

<Canvas>
  <Story of={ButtonStories.Disabled} />
</Canvas>

## Props

<ArgsTable of={Button} />

## Accessibility

- Uses native `button` element
- Supports keyboard navigation
- Includes appropriate ARIA attributes
- Maintains proper contrast ratios for all variants
```

## Publishing and Versioning

### Preparing for Publishing

1. **Update package.json**:
```json
{
  "name": "my-component-library",
  "version": "1.0.0",
  "description": "A UI component library based on Figma designs",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0",
    "styled-components": ">=5.0.0"
  },
  "scripts": {
    "build": "tsdx build",
    "test": "tsdx test --passWithNoTests",
    "lint": "tsdx lint",
    "prepare": "tsdx build",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

2. **Create an .npmignore file**:
```
src/
.storybook/
stories/
.github/
.vscode/
.editorconfig
.gitignore
tsconfig.json
```

### Publishing to npm

```bash
# Login to npm
npm login

# Publish the package
npm publish
```

### Semantic Versioning

Follow semantic versioning (SemVer) for your library:

- **Major version (x.0.0)**: Breaking changes
- **Minor version (0.x.0)**: New features, no breaking changes
- **Patch version (0.0.x)**: Bug fixes, no new features or breaking changes

### Using GitHub Releases

1. Create a tag:
```bash
git tag -a v1.0.0 -m "Version 1.0.0"
git push origin v1.0.0
```

2. Create a release on GitHub with release notes

### Automating Releases with GitHub Actions

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
          
      - name: Create Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false
```

## Consuming the Component Library

### Installing the Library

```bash
# From npm
npm install my-component-library

# From GitHub Packages
npm install @organization/my-component-library

# From a local directory (during development)
npm install ../path/to/my-component-library
```

### Using Components in React

```jsx
import React from 'react';
import { Button, Card, ThemeProvider } from 'my-component-library';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Card title="Welcome">
          <p>This is a card component from our library.</p>
          <Button variant="primary" onClick={() => alert('Hello!')}>
            Click Me
          </Button>
        </Card>
      </div>
    </ThemeProvider>
  );
}
```

### Using Components in Angular

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MyComponentLibraryModule } from 'my-component-library';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MyComponentLibraryModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```html
<!-- app.component.html -->
<div class="app">
  <lib-card title="Welcome">
    <p>This is a card component from our library.</p>
    <lib-button variant="primary" (clicked)="sayHello()">
      Click Me
    </lib-button>
  </lib-card>
</div>
```

## Maintenance and Evolution

### Updating Components Based on Figma Changes

1. **Monitor Design Changes**:
   - Subscribe to Figma file updates
   - Regularly review designs for changes

2. **Version Control for Designs**:
   - Keep a history of design versions
   - Document design decisions and changes

3. **Automated Updates**:
   - Use Figma API to detect changes
   - Automate component updates where possible

### Managing Breaking Changes

1. **Deprecation Strategy**:
   - Mark components as deprecated before removal
   - Provide migration guides for breaking changes

2. **Codemods for Migrations**:
   - Create automated migration scripts
   - Help users update to new versions

3. **Parallel Versions**:
   - Support multiple major versions during transition periods
   - Gradually phase out older versions

### Gathering Feedback

1. **User Surveys**:
   - Collect feedback from library users
   - Identify pain points and opportunities

2. **Analytics**:
   - Track component usage
   - Identify popular and problematic components

3. **GitHub Issues**:
   - Encourage bug reports and feature requests
   - Prioritize fixes and enhancements

## Best Practices

### Component Design Principles

1. **API Consistency**:
   - Use consistent prop/input names across components
   - Follow platform conventions (React/Angular)

2. **Composition over Configuration**:
   - Prefer composable components over complex configuration
   - Use children/content projection for flexibility

3. **Controlled and Uncontrolled Components**:
   - Support both controlled and uncontrolled usage
   - Provide sensible defaults

4. **Progressive Enhancement**:
   - Ensure base functionality without JavaScript
   - Add enhanced features when available

### Documentation Guidelines

1. **Comprehensive Examples**:
   - Show all variants and states
   - Include code examples for common use cases

2. **Accessibility Documentation**:
   - Document accessibility features
   - Provide implementation guidance

3. **Performance Considerations**:
   - Document performance implications
   - Provide optimization tips

4. **API Reference**:
   - Document all props/inputs clearly
   - Include type information

### Quality Assurance

1. **Comprehensive Testing**:
   - Unit tests for functionality
   - Visual regression tests for appearance
   - Integration tests for component interactions

2. **Accessibility Audits**:
   - Regular accessibility testing
   - Compliance with WCAG standards

3. **Performance Benchmarks**:
   - Monitor component performance
   - Set performance budgets

4. **Cross-Browser Testing**:
   - Test across major browsers
   - Document browser support

## 💡 Try It Yourself

1. Create a basic component library with at least three components:
   - Button
   - Card
   - Input field
2. Set up Storybook for documentation
3. Implement a theming system with light and dark modes
4. Publish your library as a private npm package
5. Create a simple application that consumes your library
6. Add visual regression tests with Chromatic or another tool

## 🔜 Next Steps

Now that you've learned how to create and manage a component library, let's explore how to ensure the quality of your components with testing and quality assurance. Continue to the [Testing and Quality Assurance](../08-testing/README.md) guide. 