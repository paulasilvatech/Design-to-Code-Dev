# Complete Design-to-Code Workshop Guide - Part 3
## Intermediate Workshop: Advanced Figma and Component Libraries (2 hours)

### Quick Navigation
- **Part 1**: Setup and Basic Workshop Foundation ✅
- **Part 2**: Basic Workshop Modules 3-5 ✅
- **Part 3**: Intermediate Workshop (This Document) 📍
- **Part 4**: Advanced Workshop Part 1 (3 hours)
- **Part 5**: Advanced Workshop Part 2 (3 hours)

---

## Intermediate Workshop Overview

### What You'll Learn
- **Advanced Figma Features**: Master Auto Layout, Variants, and Component Properties
- **Component Library Architecture**: Build scalable, maintainable component systems
- **Design Systems Integration**: Connect design tokens to code systematically
- **Responsive Implementation**: Create truly responsive components with multiple breakpoints
- **Documentation**: Generate comprehensive component documentation

### Prerequisites
- Completed Parts 1 and 2 of this workshop
- Basic understanding of React and TypeScript
- Familiarity with CSS-in-JS or CSS Modules
- GitHub Copilot configured and working

---

## Module 1: Advanced Figma Features and Auto Layout (30 minutes)

### 1.1 Mastering Auto Layout for Complex Components
**Time Required**: 15 minutes

#### Understanding Auto Layout Depth

Auto Layout in Figma is more powerful than basic flexbox. Let's explore advanced features:

1. **Nested Auto Layouts**:
   - Create complex responsive behaviors
   - Mix horizontal and vertical layouts
   - Control spacing at each level

2. **Advanced Constraints**:
   - **Fixed**: Maintains exact size
   - **Hug Contents**: Shrinks to fit content
   - **Fill Container**: Expands to fill available space

3. **Absolute Positioning in Auto Layout**:
   - Position elements outside the flow
   - Create overlays and badges
   - Maintain responsive behavior

#### Practical Exercise: Advanced Card Component

1. **Open Figma and Create New Frame**:
   - Create a frame: 360×480px
   - Name it: "ProductCard/Advanced"

2. **Build the Structure**:
```
ProductCard (Vertical Auto Layout)
├── ImageContainer (Fixed Height: 240px)
│   ├── ProductImage (Fill)
│   ├── Badge (Absolute Position: Top Right)
│   └── FavoriteButton (Absolute Position: Top Left)
├── ContentArea (Vertical Auto Layout, Fill)
│   ├── Header (Horizontal Auto Layout)
│   │   ├── Title (Fill)
│   │   └── Price (Hug)
│   ├── Description (Fixed)
│   └── Actions (Horizontal Auto Layout)
│       ├── AddToCart (Fill)
│       └── QuickView (Hug)
```

3. **Apply Advanced Properties**:

**ImageContainer Setup**:
- Auto Layout: Disabled (for absolute positioning)
- Width: Fill container
- Height: Fixed 240px
- Clip content: Yes

**Badge Setup**:
- Position: Absolute
- Constraints: Top 12px, Right 12px
- Auto Layout: Horizontal
- Padding: 4px 8px
- Background: Semantic/Error (#F44336)
- Text: "SALE"

**ContentArea Setup**:
- Auto Layout: Vertical
- Padding: 16px
- Gap: 12px
- Fill container

**Responsive Behavior**:
- Card width: Fill container
- Min width: 280px
- Max width: 400px

4. **Create Component Properties**:

In Figma's right panel:
- **Boolean Properties**:
  - `showBadge` (controls badge visibility)
  - `isFavorite` (controls favorite button state)
  - `showQuickView` (controls quick view button)
  
- **Text Properties**:
  - `title` (product name)
  - `price` (product price)
  - `description` (product description)
  - `badgeText` (customizable badge text)

- **Instance Swap Properties**:
  - `productImage` (swap different product images)

### 1.2 Component Variants and Interactive States
**Time Required**: 15 minutes

#### Creating a Complete Input Component System

Let's build a comprehensive input component with all states and variants:

1. **Base Input Structure**:
```
InputField (Vertical Auto Layout)
├── Label (Optional)
├── InputWrapper (Horizontal Auto Layout)
│   ├── LeadingIcon (Optional)
│   ├── Input (Fill)
│   └── TrailingIcon (Optional)
├── HelperText (Optional)
└── ErrorMessage (Optional)
```

2. **Create Variants Grid**:

Create a component set with these variants:
- **Type**: `text`, `email`, `password`, `number`, `search`
- **State**: `default`, `hover`, `focus`, `disabled`, `error`, `success`
- **Size**: `small`, `medium`, `large`

3. **Variant Specifications**:

**Default State**:
- Border: 1px solid #E0E0E0
- Background: #FFFFFF
- Text: #212121

**Hover State**:
- Border: 1px solid #BDBDBD
- Background: #FAFAFA

**Focus State**:
- Border: 2px solid #2196F3
- Outline: 3px solid rgba(33, 150, 243, 0.2)
- Background: #FFFFFF

**Error State**:
- Border: 2px solid #F44336
- Background: #FFEBEE
- Helper text color: #F44336

**Size Variations**:
- Small: Height 36px, padding 8px 12px, font 14px
- Medium: Height 44px, padding 10px 16px, font 16px
- Large: Height 52px, padding 12px 20px, font 18px

4. **Advanced Interactions**:

Add Figma prototyping:
- **On Hover**: Change to hover state
- **On Click**: Change to focus state
- **While Typing**: Show character count
- **On Blur**: Validate and show error/success

5. **Export as Code-Ready Component**:

Switch to Dev Mode and note:
- CSS variables for each state
- Transition properties
- Accessibility attributes needed

**✅ Checkpoint**: You have created advanced Figma components with complex Auto Layout and comprehensive variants

---

## Module 2: Component Library Creation (30 minutes)

### 2.1 Setting Up a Scalable Component Library
**Time Required**: 15 minutes

#### Library Architecture

1. **Create Library Structure**:

```bash
# In your project directory
mkdir -p src/lib/{components,styles,utils,types,hooks}

# Create component categories
mkdir -p src/lib/components/{atoms,molecules,organisms,templates}

# Create theme structure
mkdir -p src/lib/styles/{themes,tokens,global}
```

2. **Set Up Component Development Environment**:

Create `src/lib/index.ts`:
```typescript
// Main library exports
export * from './components';
export * from './styles';
export * from './hooks';
export * from './types';
```

Create `src/lib/components/index.ts`:
```typescript
// Atoms
export { Button } from './atoms/Button';
export { Input } from './atoms/Input';
export { Badge } from './atoms/Badge';
export { Icon } from './atoms/Icon';

// Molecules
export { Card } from './molecules/Card';
export { FormField } from './molecules/FormField';
export { SearchBar } from './molecules/SearchBar';
export { Modal } from './molecules/Modal';

// Organisms
export { Header } from './organisms/Header';
export { ProductCard } from './organisms/ProductCard';
export { ContactForm } from './organisms/ContactForm';
```

3. **Create Styled Components Theme System**:

Install styled-components:
```bash
npm install styled-components
npm install -D @types/styled-components
```

Create `src/lib/styles/themes/defaultTheme.ts`:
```typescript
export const defaultTheme = {
  // Colors
  colors: {
    primary: {
      50: '#E3F2FD',
      100: '#BBDEFB',
      200: '#90CAF9',
      300: '#64B5F6',
      400: '#42A5F5',
      500: '#2196F3',
      600: '#1E88E5',
      700: '#1976D2',
      800: '#1565C0',
      900: '#0D47A1',
    },
    neutral: {
      0: '#FFFFFF',
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
      1000: '#000000',
    },
    semantic: {
      success: '#4CAF50',
      warning: '#FF9800',
      error: '#F44336',
      info: '#2196F3',
    },
  },
  
  // Typography
  typography: {
    fontFamily: {
      body: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      heading: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      mono: '"Fira Code", monospace',
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  // Spacing
  spacing: {
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
  },
  
  // Breakpoints
  breakpoints: {
    xs: '375px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  // Border radius
  radii: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  
  // Z-index
  zIndices: {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modalBackdrop: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
    notification: 1700,
  },
  
  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    base: '250ms ease-in-out',
    slow: '350ms ease-in-out',
    slower: '500ms ease-in-out',
  },
};

export type Theme = typeof defaultTheme;
```

### 2.2 Building Advanced Components
**Time Required**: 15 minutes

#### Create the Advanced Input Component

Create `src/lib/components/atoms/Input/Input.tsx`:
```typescript
import React, { forwardRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Icon } from '../Icon';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  success?: boolean;
  leadingIcon?: string;
  trailingIcon?: string;
  onTrailingIconClick?: () => void;
  variant?: 'outlined' | 'filled' | 'underlined';
  inputSize?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

const InputWrapper = styled.div<{ fullWidth?: boolean }>`
  display: inline-flex;
  flex-direction: column;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  position: relative;
`;

const Label = styled.label`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.neutral[700]};
  margin-bottom: ${props => props.theme.spacing[1]};
`;

const InputContainer = styled.div<{
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  variant: string;
  inputSize: string;
  isFocused: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: ${props => props.theme.radii.md};
  transition: all ${props => props.theme.transitions.fast};
  
  ${props => {
    const { error, success, variant, theme } = props;
    
    if (variant === 'outlined') {
      return css`
        border: 2px solid ${
          error ? theme.colors.semantic.error :
          success ? theme.colors.semantic.success :
          theme.colors.neutral[300]
        };
        background-color: ${theme.colors.neutral[0]};
        
        &:hover:not(:focus-within):not([disabled]) {
          border-color: ${theme.colors.neutral[400]};
          background-color: ${theme.colors.neutral[50]};
        }
        
        &:focus-within {
          border-color: ${
            error ? theme.colors.semantic.error :
            success ? theme.colors.semantic.success :
            theme.colors.primary[500]
          };
          box-shadow: 0 0 0 3px ${
            error ? `${theme.colors.semantic.error}20` :
            success ? `${theme.colors.semantic.success}20` :
            `${theme.colors.primary[500]}20`
          };
        }
      `;
    }
    
    // Add other variant styles (filled, underlined)
  }}
  
  ${props => props.disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  `}
  
  /* Size variations */
  ${props => {
    const { inputSize, theme } = props;
    const sizes = {
      small: css`
        height: 36px;
        padding: 0 ${theme.spacing[3]};
        font-size: ${theme.typography.fontSize.sm};
      `,
      medium: css`
        height: 44px;
        padding: 0 ${theme.spacing[4]};
        font-size: ${theme.typography.fontSize.base};
      `,
      large: css`
        height: 52px;
        padding: 0 ${theme.spacing[5]};
        font-size: ${theme.typography.fontSize.lg};
      `,
    };
    return sizes[inputSize as keyof typeof sizes];
  }}
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: ${props => props.theme.typography.fontFamily.body};
  color: ${props => props.theme.colors.neutral[900]};
  
  &::placeholder {
    color: ${props => props.theme.colors.neutral[400]};
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`;

const IconWrapper = styled.div<{ position: 'leading' | 'trailing'; clickable?: boolean }>`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.neutral[500]};
  ${props => props.position === 'leading' ? 'margin-right' : 'margin-left'}: ${props => props.theme.spacing[2]};
  ${props => props.clickable && css`
    cursor: pointer;
    &:hover {
      color: ${props.theme.colors.neutral[700]};
    }
  `}
`;

const HelperText = styled.span<{ error?: boolean; success?: boolean }>`
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-top: ${props => props.theme.spacing[1]};
  color: ${props => 
    props.error ? props.theme.colors.semantic.error :
    props.success ? props.theme.colors.semantic.success :
    props.theme.colors.neutral[600]
  };
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  error = false,
  errorMessage,
  success = false,
  leadingIcon,
  trailingIcon,
  onTrailingIconClick,
  variant = 'outlined',
  inputSize = 'medium',
  fullWidth = false,
  className,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };
  
  return (
    <InputWrapper fullWidth={fullWidth} className={className}>
      {label && <Label htmlFor={props.id}>{label}</Label>}
      
      <InputContainer
        error={error}
        success={success}
        disabled={props.disabled}
        variant={variant}
        inputSize={inputSize}
        isFocused={isFocused}
      >
        {leadingIcon && (
          <IconWrapper position="leading">
            <Icon name={leadingIcon} size={16} />
          </IconWrapper>
        )}
        
        <StyledInput
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        {trailingIcon && (
          <IconWrapper 
            position="trailing"
            clickable={!!onTrailingIconClick}
            onClick={onTrailingIconClick}
          >
            <Icon name={trailingIcon} size={16} />
          </IconWrapper>
        )}
      </InputContainer>
      
      {(helperText || errorMessage) && (
        <HelperText error={error} success={success}>
          {error && errorMessage ? errorMessage : helperText}
        </HelperText>
      )}
    </InputWrapper>
  );
});

Input.displayName = 'Input';
```

**✅ Checkpoint**: You have set up a scalable component library with a theme system and advanced input component

---

## Module 3: Design Systems Integration (30 minutes)

### 3.1 Automated Design Token Synchronization
**Time Required**: 15 minutes

#### Setting Up Design Token Pipeline

1. **Install Dependencies**:
```bash
npm install -D style-dictionary
npm install -D figma-api
```

2. **Create Token Extraction Script**:

Create `scripts/sync-design-tokens.js`:
```javascript
const Figma = require('figma-api');
const fs = require('fs');
const path = require('path');

// Initialize Figma API
const figma = new Figma.Api({
  personalAccessToken: process.env.FIGMA_TOKEN
});

const FILE_KEY = process.env.FIGMA_FILE_KEY;

async function extractTokens() {
  try {
    console.log('🎨 Fetching Figma file...');
    const file = await figma.getFile(FILE_KEY);
    
    // Extract color styles
    const colors = extractColors(file);
    const typography = extractTypography(file);
    const spacing = extractSpacing(file);
    const shadows = extractShadows(file);
    
    // Create tokens object
    const tokens = {
      color: colors,
      typography: typography,
      spacing: spacing,
      shadow: shadows,
    };
    
    // Save tokens
    const outputPath = path.join(__dirname, '../src/lib/styles/tokens/tokens.json');
    fs.writeFileSync(outputPath, JSON.stringify(tokens, null, 2));
    
    console.log('✅ Design tokens extracted successfully!');
    
    // Run Style Dictionary build
    await buildStyleDictionary();
    
  } catch (error) {
    console.error('❌ Error extracting tokens:', error);
    process.exit(1);
  }
}

function extractColors(file) {
  const colors = {};
  
  // Extract color styles from Figma
  Object.entries(file.styles).forEach(([id, style]) => {
    if (style.styleType === 'FILL') {
      const node = findNodeWithStyleId(file.document, id);
      if (node && node.fills && node.fills[0].type === 'SOLID') {
        const { r, g, b, a = 1 } = node.fills[0].color;
        const hex = rgbToHex(r, g, b);
        
        // Parse style name (e.g., "Primary/500" -> primary.500)
        const path = style.name.toLowerCase().replace('/', '.');
        setNestedProperty(colors, path, {
          value: hex,
          alpha: a,
        });
      }
    }
  });
  
  return colors;
}

function extractTypography(file) {
  const typography = {
    fontFamily: {},
    fontSize: {},
    fontWeight: {},
    lineHeight: {},
  };
  
  Object.entries(file.styles).forEach(([id, style]) => {
    if (style.styleType === 'TEXT') {
      const node = findNodeWithStyleId(file.document, id);
      if (node && node.style) {
        const { fontFamily, fontSize, fontWeight, lineHeightPx } = node.style;
        
        const name = style.name.toLowerCase().replace(/\s+/g, '-');
        
        if (!typography.fontFamily[fontFamily]) {
          typography.fontFamily[fontFamily.toLowerCase()] = { value: fontFamily };
        }
        
        typography.fontSize[name] = { value: `${fontSize}px` };
        typography.fontWeight[name] = { value: fontWeight };
        typography.lineHeight[name] = { value: `${lineHeightPx}px` };
      }
    }
  });
  
  return typography;
}

// Helper functions
function findNodeWithStyleId(node, styleId) {
  if (node.styles && Object.values(node.styles).includes(styleId)) {
    return node;
  }
  
  if (node.children) {
    for (const child of node.children) {
      const found = findNodeWithStyleId(child, styleId);
      if (found) return found;
    }
  }
  
  return null;
}

function rgbToHex(r, g, b) {
  const toHex = (n) => {
    const hex = Math.round(n * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function setNestedProperty(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  
  current[keys[keys.length - 1]] = value;
}

// Run extraction
extractTokens();
```

3. **Configure Style Dictionary**:

Create `style-dictionary.config.js`:
```javascript
module.exports = {
  source: ['src/lib/styles/tokens/tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/lib/styles/generated/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables',
        options: {
          showFileHeader: false,
        },
      }],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'src/lib/styles/generated/',
      files: [{
        destination: 'tokens.js',
        format: 'javascript/es6',
      }],
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'src/lib/styles/generated/',
      files: [{
        destination: 'tokens.d.ts',
        format: 'typescript/es6-declarations',
      }],
    },
  },
};
```

### 3.2 Component Documentation with Storybook
**Time Required**: 15 minutes

1. **Install and Configure Storybook**:
```bash
npx storybook@latest init
```

2. **Create Storybook Theme**:

Create `.storybook/theme.js`:
```javascript
import { create } from '@storybook/theming/create';

export default create({
  base: 'light',
  
  // Brand
  brandTitle: 'Design System',
  brandUrl: 'https://your-design-system.com',
  brandImage: '/logo.png',
  brandTarget: '_self',
  
  // Colors
  colorPrimary: '#2196F3',
  colorSecondary: '#1976D2',
  
  // UI
  appBg: '#F5F5F5',
  appContentBg: '#FFFFFF',
  appBorderColor: '#E0E0E0',
  appBorderRadius: 4,
  
  // Typography
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  fontCode: '"Fira Code", monospace',
  
  // Text colors
  textColor: '#212121',
  textInverseColor: '#FFFFFF',
  textMutedColor: '#616161',
  
  // Toolbar
  barTextColor: '#616161',
  barSelectedColor: '#2196F3',
  barBg: '#FFFFFF',
  
  // Form colors
  inputBg: '#FFFFFF',
  inputBorder: '#E0E0E0',
  inputTextColor: '#212121',
  inputBorderRadius: 4,
});
```

3. **Create Component Stories**:

Create `src/lib/components/atoms/Input/Input.stories.tsx`:
```typescript
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../../../styles/themes/defaultTheme';

// Decorator to provide theme
const withTheme = (Story: any) => (
  <ThemeProvider theme={defaultTheme}>
    <Story />
  </ThemeProvider>
);

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  decorators: [withTheme],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with multiple variants and states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'underlined'],
      description: 'The visual style variant of the input',
    },
    inputSize: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the input',
    },
    error: {
      control: 'boolean',
      description: 'Whether the input is in an error state',
    },
    success: {
      control: 'boolean',
      description: 'Whether the input is in a success state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the input should take full width of its container',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// Basic examples
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'your@email.com',
    type: 'email',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helperText: 'Must be at least 8 characters',
  },
};

// State examples
export const ErrorState: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    error: true,
    errorMessage: 'Username is already taken',
    defaultValue: 'existinguser',
  },
};

export const SuccessState: Story = {
  args: {
    label: 'Email',
    placeholder: 'your@email.com',
    success: true,
    helperText: 'Email is available',
    defaultValue: 'available@email.com',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit',
    disabled: true,
    defaultValue: 'Disabled value',
  },
};

// With icons
export const WithLeadingIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search for items...',
    leadingIcon: 'search',
  },
};

export const WithTrailingIcon: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    trailingIcon: 'eye',
    onTrailingIconClick: () => alert('Toggle password visibility'),
  },
};

// Size variations
export const Small: Story = {
  args: {
    inputSize: 'small',
    placeholder: 'Small input',
  },
};

export const Large: Story = {
  args: {
    inputSize: 'large',
    placeholder: 'Large input',
  },
};

// Full width
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    label: 'Full Width Input',
    placeholder: 'Takes full container width',
  },
};

// Interactive example
export const InteractiveValidation: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    
    const validateEmail = (email: string) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        setError(true);
        setErrorMessage('Email is required');
      } else if (!regex.test(email)) {
        setError(true);
        setErrorMessage('Please enter a valid email');
      } else {
        setError(false);
        setErrorMessage('');
      }
    };
    
    return (
      <Input
        label="Email Validation Example"
        type="email"
        placeholder="your@email.com"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => validateEmail(value)}
        error={error}
        errorMessage={errorMessage}
        helperText="We'll validate on blur"
      />
    );
  },
};
```

**✅ Checkpoint**: You have set up automated design token sync and comprehensive Storybook documentation

---

## Module 4: Responsive Design Implementation (30 minutes)

### 4.1 Building Truly Responsive Components
**Time Required**: 15 minutes

#### Advanced Responsive Techniques

1. **Create Responsive Utilities**:

Create `src/lib/utils/responsive.ts`:
```typescript
import { css } from 'styled-components';
import { Theme } from '../styles/themes/defaultTheme';

// Breakpoint helper
export const breakpoint = (size: keyof Theme['breakpoints']) => 
  (strings: TemplateStringsArray, ...values: any[]) => css`
    @media (min-width: ${props => props.theme.breakpoints[size]}) {
      ${css(strings, ...values)}
    }
  `;

// Responsive prop system
export type ResponsiveProp<T> = T | {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
};

export function getResponsiveValue<T>(
  prop: ResponsiveProp<T>,
  breakpoint: keyof Theme['breakpoints'],
  theme: Theme
): T | undefined {
  if (typeof prop !== 'object' || prop === null) {
    return prop as T;
  }
  
  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const currentIndex = breakpoints.indexOf(breakpoint);
  
  // Find the value for current or lower breakpoint
  for (let i = currentIndex; i >= 0; i--) {
    const bp = breakpoints[i] as keyof Theme['breakpoints'];
    if (bp in prop) {
      return prop[bp];
    }
  }
  
  return undefined;
}

// CSS generator for responsive props
export function responsiveStyle<T>(
  propName: string,
  prop: ResponsiveProp<T>,
  valueTransform?: (value: T) => string
) {
  if (typeof prop !== 'object' || prop === null) {
    const value = valueTransform ? valueTransform(prop as T) : prop;
    return css`${propName}: ${value};`;
  }
  
  return css`
    ${prop.xs && css`${propName}: ${valueTransform ? valueTransform(prop.xs) : prop.xs};`}
    ${prop.sm && breakpoint('sm')`${propName}: ${valueTransform ? valueTransform(prop.sm) : prop.sm};`}
    ${prop.md && breakpoint('md')`${propName}: ${valueTransform ? valueTransform(prop.md) : prop.md};`}
    ${prop.lg && breakpoint('lg')`${propName}: ${valueTransform ? valueTransform(prop.lg) : prop.lg};`}
    ${prop.xl && breakpoint('xl')`${propName}: ${valueTransform ? valueTransform(prop.xl) : prop.xl};`}
    ${prop['2xl'] && breakpoint('2xl')`${propName}: ${valueTransform ? valueTransform(prop['2xl']) : prop['2xl']};`}
  `;
}
```

2. **Create Responsive Grid Component**:

Create `src/lib/components/atoms/Grid/Grid.tsx`:
```typescript
import React from 'react';
import styled from 'styled-components';
import { ResponsiveProp, responsiveStyle } from '../../../utils/responsive';

interface GridProps {
  children: React.ReactNode;
  columns?: ResponsiveProp<number | string>;
  gap?: ResponsiveProp<string | number>;
  alignItems?: ResponsiveProp<string>;
  justifyContent?: ResponsiveProp<string>;
  className?: string;
}

const StyledGrid = styled.div<GridProps>`
  display: grid;
  ${props => responsiveStyle('grid-template-columns', props.columns, 
    (value) => typeof value === 'number' ? `repeat(${value}, 1fr)` : value
  )}
  ${props => responsiveStyle('gap', props.gap,
    (value) => typeof value === 'number' ? `${value}px` : value
  )}
  ${props => props.alignItems && responsiveStyle('align-items', props.alignItems)}
  ${props => props.justifyContent && responsiveStyle('justify-content', props.justifyContent)}
`;

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 1,
  gap = 16,
  alignItems,
  justifyContent,
  className,
}) => {
  return (
    <StyledGrid
      columns={columns}
      gap={gap}
      alignItems={alignItems}
      justifyContent={justifyContent}
      className={className}
    >
      {children}
    </StyledGrid>
  );
};

// Grid Item component
interface GridItemProps {
  children: React.ReactNode;
  span?: ResponsiveProp<number>;
  start?: ResponsiveProp<number>;
  end?: ResponsiveProp<number>;
  className?: string;
}

const StyledGridItem = styled.div<GridItemProps>`
  ${props => props.span && responsiveStyle('grid-column', props.span,
    (value) => `span ${value}`
  )}
  ${props => props.start && responsiveStyle('grid-column-start', props.start)}
  ${props => props.end && responsiveStyle('grid-column-end', props.end)}
`;

export const GridItem: React.FC<GridItemProps> = ({
  children,
  span,
  start,
  end,
  className,
}) => {
  return (
    <StyledGridItem
      span={span}
      start={start}
      end={end}
      className={className}
    >
      {children}
    </StyledGridItem>
  );
};
```

### 4.2 Building a Responsive Dashboard Layout
**Time Required**: 15 minutes

Create `src/lib/components/templates/DashboardLayout/DashboardLayout.tsx`:
```typescript
import React, { useState } from 'react';
import styled from 'styled-components';
import { breakpoint } from '../../../utils/responsive';
import { Icon } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarContent: React.ReactNode;
  headerContent: React.ReactNode;
  onMenuToggle?: () => void;
}

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.neutral[50]};
`;

const Sidebar = styled.aside<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${props => props.theme.zIndices.fixed};
  width: 280px;
  height: 100vh;
  background-color: ${props => props.theme.colors.neutral[0]};
  border-right: 1px solid ${props => props.theme.colors.neutral[200]};
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform ${props => props.theme.transitions.base};
  
  ${breakpoint('lg')`
    position: sticky;
    transform: translateX(0);
  `}
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  
  ${breakpoint('lg')`
    margin-left: 0;
  `}
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: ${props => props.theme.zIndices.sticky};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[4]};
  height: 64px;
  padding: 0 ${props => props.theme.spacing[4]};
  background-color: ${props => props.theme.colors.neutral[0]};
  border-bottom: 1px solid ${props => props.theme.colors.neutral[200]};
  
  ${breakpoint('lg')`
    padding: 0 ${props => props.theme.spacing[6]};
  `}
`;

const MenuButton = styled(Button)`
  ${breakpoint('lg')`
    display: none;
  `}
`;

const Content = styled.main`
  flex: 1;
  padding: ${props => props.theme.spacing[4]};
  
  ${breakpoint('md')`
    padding: ${props => props.theme.spacing[6]};
  `}
  
  ${breakpoint('lg')`
    padding: ${props => props.theme.spacing[8]};
  `}
`;

const Overlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${props => props.theme.zIndices.modalBackdrop};
  opacity: ${props => props.isVisible ? 1 : 0};
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
  transition: opacity ${props => props.theme.transitions.base},
              visibility ${props => props.theme.transitions.base};
  
  ${breakpoint('lg')`
    display: none;
  `}
`;

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  sidebarContent,
  headerContent,
  onMenuToggle,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    onMenuToggle?.();
  };
  
  const handleOverlayClick = () => {
    setIsSidebarOpen(false);
  };
  
  return (
    <LayoutContainer>
      <Overlay 
        isVisible={isSidebarOpen} 
        onClick={handleOverlayClick}
      />
      
      <Sidebar isOpen={isSidebarOpen}>
        {sidebarContent}
      </Sidebar>
      
      <MainContent>
        <Header>
          <MenuButton
            variant="outlined"
            size="small"
            onClick={handleMenuToggle}
            aria-label="Toggle menu"
          >
            <Icon name="menu" />
          </MenuButton>
          {headerContent}
        </Header>
        
        <Content>
          {children}
        </Content>
      </MainContent>
    </LayoutContainer>
  );
};
```

**✅ Final Checkpoint**: You have created a fully responsive component system with advanced layout capabilities

---

## Workshop Summary and Next Steps

### What You've Accomplished in the Intermediate Workshop

1. ✅ **Mastered Advanced Figma Features**:
   - Complex Auto Layout structures
   - Component variants and properties
   - Interactive prototyping

2. ✅ **Built a Scalable Component Library**:
   - Organized architecture
   - Theme system with styled-components
   - TypeScript support throughout

3. ✅ **Integrated Design Systems**:
   - Automated token extraction
   - Style Dictionary configuration
   - Storybook documentation

4. ✅ **Implemented Responsive Design**:
   - Responsive utilities and helpers
   - Grid system with breakpoints
   - Dashboard layout with mobile support

### Key Intermediate Skills Gained

- **Component Architecture**: Building scalable, maintainable component systems
- **Design Token Management**: Automating the design-to-code token pipeline
- **Documentation**: Creating comprehensive component documentation
- **Responsive Implementation**: Building truly responsive components
- **TypeScript Integration**: Type-safe component development

### Practice Challenges

1. **Extend the Component Library**:
   - Add Select, Checkbox, Radio components
   - Create a DataTable with sorting/filtering
   - Build a Toast notification system

2. **Enhance the Design System**:
   - Add dark mode support
   - Create animation utilities
   - Build a color palette generator

3. **Advanced Patterns**:
   - Implement compound components
   - Create a form builder system
   - Add internationalization support

### Preparation for Advanced Workshop

Before proceeding to Parts 4 and 5:

1. **Review Your Work**:
   - Ensure all components are working
   - Test responsive behavior thoroughly
   - Check TypeScript types are correct

2. **Set Up Additional Tools**:
   - Ensure Azure account is ready
   - Install Docker (for advanced deployments)
   - Set up a test repository on GitHub

3. **Familiarize Yourself With**:
   - MCP (Model Context Protocol) concepts
   - GitHub Actions basics
   - AI/ML terminology

---

## Continue Your Journey

You're now ready for the advanced workshops where you'll learn:

- **Part 4**: MCP Server integration, GitHub Agent Mode, and automated workflows
- **Part 5**: Azure AI Foundry integration and enterprise-scale design system automation

These advanced topics will transform your design-to-code workflow into a fully automated, AI-powered system capable of handling enterprise-scale projects.

---

## 🔙 Navigation

← [Back to Main README](../README.md) | [Workshop Structure Guide](workshop-structure-guide.md) | [Quick Start](QUICK_START.md) →