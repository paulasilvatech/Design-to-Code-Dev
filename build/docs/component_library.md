# Component Library Implementation

This section covers how to implement a component library based on your Figma designs, ensuring consistency and reusability across your application.

## Component Library Structure

Organize your component library using a clear, hierarchical structure:

```
component-library/
├── src/
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.styles.ts
│   │   │   │   ├── Button.test.tsx
│   │   │   │   ├── Button.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   └── Typography/
│   │   ├── molecules/
│   │   │   ├── FormField/
│   │   │   ├── Card/
│   │   │   └── Modal/
│   │   └── organisms/
│   │       ├── Header/
│   │       ├── Sidebar/
│   │       └── DataTable/
│   ├── themes/
│   │   ├── tokens.ts
│   │   ├── light.ts
│   │   └── dark.ts
│   └── utils/
│       ├── spacing.ts
│       └── typography.ts
├── .storybook/
├── package.json
└── README.md
```

## Design Token Implementation

Convert Figma design tokens into code:

```typescript
// src/themes/tokens.ts
export const colors = {
  primary: {
    50: '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    300: '#C4B5FD',
    400: '#A78BFA',
    500: '#8B5CF6',
    600: '#7C3AED',
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95',
  },
  // Other color scales
};

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  // Additional spacing values
};

export const typography = {
  fontFamily: {
    sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"Roboto Mono", monospace',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  // Additional typography values
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};
```

## Component Implementation Example

### Button Component

```typescript
// src/components/atoms/Button/Button.tsx
import React from 'react';
import { ButtonContainer, IconWrapper } from './Button.styles';

export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  isFullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  leftIcon,
  rightIcon,
  isLoading = false,
  isFullWidth = false,
  disabled,
  ...props
}) => {
  return (
    <ButtonContainer
      variant={variant}
      size={size}
      isFullWidth={isFullWidth}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <span className="spinner" />}
      {!isLoading && leftIcon && <IconWrapper position="left">{leftIcon}</IconWrapper>}
      <span className="button-text">{children}</span>
      {!isLoading && rightIcon && <IconWrapper position="right">{rightIcon}</IconWrapper>}
    </ButtonContainer>
  );
};
```

```typescript
// src/components/atoms/Button/Button.styles.ts
import styled, { css } from 'styled-components';
import { ButtonProps, ButtonVariant, ButtonSize } from './Button';
import { colors, typography, spacing } from '../../../themes/tokens';

const variantStyles = {
  primary: css`
    background-color: ${colors.primary[600]};
    color: white;
    &:hover:not(:disabled) {
      background-color: ${colors.primary[700]};
    }
    &:active:not(:disabled) {
      background-color: ${colors.primary[800]};
    }
  `,
  secondary: css`
    background-color: ${colors.gray[200]};
    color: ${colors.gray[800]};
    &:hover:not(:disabled) {
      background-color: ${colors.gray[300]};
    }
    &:active:not(:disabled) {
      background-color: ${colors.gray[400]};
    }
  `,
  outlined: css`
    background-color: transparent;
    color: ${colors.primary[600]};
    border: 1px solid ${colors.primary[600]};
    &:hover:not(:disabled) {
      background-color: ${colors.primary[50]};
    }
    &:active:not(:disabled) {
      background-color: ${colors.primary[100]};
    }
  `,
  text: css`
    background-color: transparent;
    color: ${colors.primary[600]};
    &:hover:not(:disabled) {
      background-color: ${colors.primary[50]};
    }
    &:active:not(:disabled) {
      background-color: ${colors.primary[100]};
    }
  `,
};

const sizeStyles = {
  small: css`
    padding: ${spacing[1.5]} ${spacing[3]};
    font-size: ${typography.fontSize.sm};
  `,
  medium: css`
    padding: ${spacing[2]} ${spacing[4]};
    font-size: ${typography.fontSize.base};
  `,
  large: css`
    padding: ${spacing[2.5]} ${spacing[5]};
    font-size: ${typography.fontSize.lg};
  `,
};

export const ButtonContainer = styled.button<{
  variant: ButtonVariant;
  size: ButtonSize;
  isFullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  font-weight: ${typography.fontWeight.medium};
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  outline: none;
  width: ${props => (props.isFullWidth ? '100%' : 'auto')};
  
  ${props => variantStyles[props.variant]}
  ${props => sizeStyles[props.size]}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .spinner {
    display: inline-block;
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
    margin-right: ${spacing[2]};
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const IconWrapper = styled.span<{ position: 'left' | 'right' }>`
  display: inline-flex;
  align-items: center;
  margin-left: ${props => (props.position === 'right' ? spacing[2] : 0)};
  margin-right: ${props => (props.position === 'left' ? spacing[2] : 0)};
`;
```

## Storybook Integration

Document your components with Storybook:

```typescript
// src/components/atoms/Button/Button.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { FiArrowRight, FiPlus } from 'react-icons/fi';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outlined', 'text'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    isLoading: { control: 'boolean' },
    isFullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
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

export const Text: Story = {
  args: {
    variant: 'text',
    children: 'Text Button',
  },
};

export const WithLeftIcon: Story = {
  args: {
    variant: 'primary',
    children: 'Add Item',
    leftIcon: <FiPlus />,
  },
};

export const WithRightIcon: Story = {
  args: {
    variant: 'primary',
    children: 'Next Step',
    rightIcon: <FiArrowRight />,
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    children: 'Loading',
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Disabled',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    children: 'Full Width Button',
    isFullWidth: true,
  },
};
```

## Testing Components

Write comprehensive tests for your components:

```typescript
// src/components/atoms/Button/Button.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import { FiArrowRight } from 'react-icons/fi';

describe('Button component', () => {
  test('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('applies correct variant styles', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByText('Primary')).toHaveStyle('background-color: #7C3AED');
    
    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText('Secondary')).toHaveStyle('background-color: #E5E7EB');
    
    rerender(<Button variant="outlined">Outlined</Button>);
    expect(screen.getByText('Outlined')).toHaveStyle('border: 1px solid #7C3AED');
    
    rerender(<Button variant="text">Text</Button>);
    expect(screen.getByText('Text')).toHaveStyle('background-color: transparent');
  });

  test('applies correct size styles', () => {
    const { rerender } = render(<Button size="small">Small</Button>);
    const button = screen.getByText('Small');
    expect(button).toHaveStyle('padding: 0.375rem 0.75rem');
    
    rerender(<Button size="medium">Medium</Button>);
    expect(screen.getByText('Medium')).toHaveStyle('padding: 0.5rem 1rem');
    
    rerender(<Button size="large">Large</Button>);
    expect(screen.getByText('Large')).toHaveStyle('padding: 0.625rem 1.25rem');
  });

  test('renders with icons', () => {
    render(
      <Button leftIcon={<span data-testid="left-icon" />} rightIcon={<span data-testid="right-icon" />}>
        With Icons
      </Button>
    );
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  test('shows loading spinner when isLoading is true', () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(document.querySelector('.spinner')).toBeInTheDocument();
  });

  test('applies full width style when isFullWidth is true', () => {
    render(<Button isFullWidth>Full Width</Button>);
    expect(screen.getByText('Full Width')).toHaveStyle('width: 100%');
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    
    fireEvent.click(screen.getByText('Disabled'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

## Publishing Your Component Library

Set up your package.json for publishing:

```json
{
  "name": "figma-component-library",
  "version": "1.0.0",
  "description": "Component library based on Figma designs",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "rollup -c",
    "test": "jest",
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook",
    "prepublishOnly": "npm run build"
  },
  "peerDependencies": {
    "react": "^17.0.0 || ^18.0.0",
    "react-dom": "^17.0.0 || ^18.0.0",
    "styled-components": "^5.3.0"
  },
  "devDependencies": {
    // Development dependencies
  }
}
```

By following these guidelines, you'll create a robust component library that accurately reflects your Figma designs and provides a consistent user experience across your applications.
