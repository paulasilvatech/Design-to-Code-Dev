# React Implementation

This section covers how to implement Figma designs in React using AI-assisted development tools. We'll focus on component architecture, styling approaches, and best practices for React projects.

## React Component Architecture

Organize React components following Atomic Design principles:

```
src/
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Typography/
│   ├── molecules/
│   │   ├── FormField/
│   │   ├── Card/
│   │   └── Modal/
│   └── organisms/
│       ├── Header/
│       ├── Sidebar/
│       └── DataTable/
├── pages/
│   ├── Dashboard/
│   ├── Profile/
│   └── Settings/
└── themes/
    ├── tokens.js
    └── globalStyles.js
```

## Styling Approaches for React

### 1. Styled Components

```jsx
import styled from 'styled-components';

const ButtonContainer = styled.button`
  padding: ${props => props.size === 'small' ? '8px 16px' : '12px 24px'};
  background-color: ${props => props.variant === 'primary' ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.variant === 'primary' ? 'white' : 'var(--primary-color)'};
  border: ${props => props.variant === 'outlined' ? '1px solid var(--primary-color)' : 'none'};
  border-radius: 4px;
  font-weight: 500;
  
  &:hover {
    background-color: ${props => props.variant === 'primary' ? 'var(--primary-dark)' : 'var(--gray-100)'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Button = ({ variant = 'primary', size = 'medium', children, ...props }) => (
  <ButtonContainer variant={variant} size={size} {...props}>
    {children}
  </ButtonContainer>
);
```

### 2. Tailwind CSS

```jsx
const Button = ({ variant = 'primary', size = 'medium', children, ...props }) => {
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outlined: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50'
  };
  
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };
  
  return (
    <button 
      className={`rounded-md font-medium focus:outline-none focus:ring-2 ${variantClasses[variant]} ${sizeClasses[size]} ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

## Using GitHub Copilot for React Components

### Example: Converting a Card Component

1. Analyze the Figma design
2. Prompt GitHub Copilot with:

```
Create a React Card component based on the Figma design with:
- Image at the top
- Title and subtitle
- Description text
- Action buttons at the bottom
- Support for different sizes (small, medium, large)
- Optional badge in the corner
- Hover and focus states
```

3. Review and refine the generated code

## Implementing Design Tokens

Convert Figma variables to React design tokens:

```jsx
// src/themes/tokens.js
export const colors = {
  primary: {
    main: '#7C3AED',
    light: '#A78BFA',
    dark: '#6D28D9',
  },
  secondary: {
    main: '#10B981',
    light: '#6EE7B7',
    dark: '#059669',
  },
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  // Additional colors from Figma
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
  // Additional typography from Figma
};

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  // Additional spacing from Figma
};

// Additional tokens from Figma
```

## Component Testing

Set up testing for your React components:

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button component', () => {
  test('renders with primary variant by default', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('bg-blue-600');
  });

  test('renders with correct size classes', () => {
    render(<Button size="large">Large Button</Button>);
    const button = screen.getByText('Large Button');
    expect(button).toHaveClass('px-8 py-4 text-lg');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });
});
```

## Performance Optimization

Optimize your React components for performance:

1. Use React.memo for pure components
2. Implement useMemo and useCallback for expensive calculations and callbacks
3. Use React.lazy and Suspense for code splitting
4. Implement virtualization for long lists with react-window or react-virtualized

By following these React implementation guidelines, you'll be able to efficiently convert your Figma designs into high-quality, maintainable React components.
