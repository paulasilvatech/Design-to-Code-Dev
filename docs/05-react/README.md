# ⚛️ Framework Implementation: React

This guide provides detailed instructions for implementing Figma designs as React components, covering component architecture, styling approaches, and performance optimization.

## Table of Contents
- [Component Architecture](#component-architecture)
- [Setting Up a React Project](#setting-up-a-react-project)
- [Styling Approaches](#styling-approaches)
- [Managing State](#managing-state)
- [Converting Figma Components](#converting-figma-components)
- [Performance Optimization](#performance-optimization)
- [Testing React Components](#testing-react-components)
- [Best Practices](#best-practices)

## Component Architecture

React components should be organized following the Atomic Design methodology for better maintainability and reusability.

### Atomic Design Structure

```
src/
├── components/
│   ├── atoms/          // Basic building blocks
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Typography/
│   ├── molecules/      // Combinations of atoms
│   │   ├── FormField/
│   │   ├── Card/
│   │   └── Modal/
│   └── organisms/      // Complex UI sections
│       ├── Header/
│       ├── Sidebar/
│       └── DataTable/
├── pages/              // Full page components
│   ├── Dashboard/
│   ├── Profile/
│   └── Settings/
├── contexts/           // React Context definitions
├── hooks/              // Custom hooks
├── utils/              // Helper functions
└── theme/              // Design tokens and global styles
    ├── tokens.ts
    └── globalStyles.ts
```

### Component File Structure

For each component, use a consistent file structure:

```
Button/
├── Button.tsx          // Component implementation
├── Button.styles.ts    // Styled components or CSS
├── Button.test.tsx     // Component tests
├── Button.stories.tsx  // Storybook stories (optional)
└── index.ts            // Export file
```

The index.ts file simplifies imports:

```typescript
// index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

## Setting Up a React Project

### Using Create React App with TypeScript

```bash
npx create-react-app my-design-app --template typescript
cd my-design-app
```

### Using Next.js (for more complex projects)

```bash
npx create-next-app@latest my-design-app --typescript
cd my-design-app
```

### Installing Essential Dependencies

```bash
# UI and styling
npm install styled-components
npm install --save-dev @types/styled-components

# OR for Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# State management
npm install zustand  # or redux, jotai, recoil

# Forms
npm install react-hook-form zod

# Routing (for CRA)
npm install react-router-dom

# Utilities
npm install clsx lodash
npm install --save-dev @types/lodash
```

## Styling Approaches

React offers multiple approaches to styling components. Choose one that best fits your project.

### Styled Components

```tsx
// Button.styles.ts
import styled, { css } from 'styled-components';
import { ButtonProps } from './Button';

type StyledButtonProps = Pick<ButtonProps, 'variant' | 'size' | 'disabled'>;

export const ButtonContainer = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  /* Size variations */
  ${({ size }) => size === 'small' && css`
    padding: 8px 16px;
    font-size: 14px;
  `}
  
  ${({ size }) => size === 'medium' && css`
    padding: 12px 24px;
    font-size: 16px;
  `}
  
  ${({ size }) => size === 'large' && css`
    padding: 16px 32px;
    font-size: 18px;
  `}
  
  /* Variant variations */
  ${({ variant }) => variant === 'primary' && css`
    background-color: var(--primary-color);
    color: white;
    border: none;
    
    &:hover:not(:disabled) {
      background-color: var(--primary-dark);
    }
  `}
  
  ${({ variant }) => variant === 'secondary' && css`
    background-color: var(--secondary-color);
    color: white;
    border: none;
    
    &:hover:not(:disabled) {
      background-color: var(--secondary-dark);
    }
  `}
  
  ${({ variant }) => variant === 'outlined' && css`
    background-color: transparent;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    
    &:hover:not(:disabled) {
      background-color: rgba(0, 0, 0, 0.05);
    }
  `}
  
  /* Disabled state */
  ${({ disabled }) => disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
  `}
`;

// Button.tsx
import React from 'react';
import { ButtonContainer } from './Button.styles';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  children,
  onClick,
  ...props
}) => {
  return (
    <ButtonContainer
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {children}
    </ButtonContainer>
  );
};
```

### Tailwind CSS

```tsx
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4B91F7',
          DEFAULT: '#3B82F6',
          dark: '#1D4ED8',
        },
        secondary: {
          light: '#A8A8A8',
          DEFAULT: '#9CA3AF',
          dark: '#6B7280',
        },
      },
    },
  },
  plugins: [],
};

// Button.tsx
import React from 'react';
import clsx from 'clsx';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  children,
  onClick,
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark',
    outlined: 'bg-transparent text-primary border border-primary hover:bg-gray-50',
  };
  
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3',
    large: 'px-8 py-4 text-lg',
  };
  
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center font-medium rounded-md transition-all',
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {children}
    </button>
  );
};
```

### CSS Modules

```scss
// Button.module.scss
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  // Sizes
  &.small {
    padding: 8px 16px;
    font-size: 14px;
  }
  
  &.medium {
    padding: 12px 24px;
    font-size: 16px;
  }
  
  &.large {
    padding: 16px 32px;
    font-size: 18px;
  }
  
  // Variants
  &.primary {
    background-color: var(--primary-color);
    color: white;
    border: none;
    
    &:hover:not(:disabled) {
      background-color: var(--primary-dark);
    }
  }
  
  &.secondary {
    background-color: var(--secondary-color);
    color: white;
    border: none;
    
    &:hover:not(:disabled) {
      background-color: var(--secondary-dark);
    }
  }
  
  &.outlined {
    background-color: transparent;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    
    &:hover:not(:disabled) {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
  
  // States
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

// Button.tsx
import React from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  children,
  onClick,
  ...props
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
      )}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {children}
    </button>
  );
};
```

## Managing State

### Component-Level State with useState

```tsx
// Counter.tsx
import React, { useState } from 'react';
import { Button } from '../atoms/Button';

export const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  
  return (
    <div className="counter">
      <Button variant="outlined" onClick={decrement}>-</Button>
      <span className="counter-value">{count}</span>
      <Button variant="outlined" onClick={increment}>+</Button>
    </div>
  );
};
```

### Application State with Context API

```tsx
// ThemeContext.tsx
import React, { createContext, useState, useContext } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
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
```

### Application State with Zustand

```tsx
// store.ts
import create from 'zustand';

interface AppState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useStore = create<AppState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

// Counter.tsx
import React from 'react';
import { useStore } from '../../store';
import { Button } from '../atoms/Button';

export const Counter: React.FC = () => {
  const { count, increment, decrement } = useStore();
  
  return (
    <div className="counter">
      <Button variant="outlined" onClick={decrement}>-</Button>
      <span className="counter-value">{count}</span>
      <Button variant="outlined" onClick={increment}>+</Button>
    </div>
  );
};
```

## Converting Figma Components

### Basic Process

1. **Analyze the Figma component**:
   - Identify props/variants
   - Note styling details
   - Understand responsive behavior
   - Check interactive states

2. **Create the Component Structure**:
   - Define props interface
   - Create base component
   - Implement variants and states

3. **Implement Styling**:
   - Create styles based on Figma design
   - Implement responsive behavior
   - Add animations if needed

4. **Add Interaction Logic**:
   - Implement event handlers
   - Add state management
   - Connect to API/data if required

### Example: Card Component

```tsx
// Card.tsx
import React from 'react';
import styled from 'styled-components';

export interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'normal' | 'compact' | 'none';
  children: React.ReactNode;
  title?: string;
  footer?: React.ReactNode;
  onClick?: () => void;
}

const CardContainer = styled.div<Pick<CardProps, 'variant' | 'padding' | 'onClick'>>`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  
  /* Variant styles */
  ${({ variant }) => 
    variant === 'default' && `
      border: 1px solid #E5E7EB;
    `}
  
  ${({ variant }) => 
    variant === 'elevated' && `
      border: none;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    `}
  
  ${({ variant }) => 
    variant === 'outlined' && `
      border: 2px solid #3B82F6;
    `}
  
  /* Padding styles */
  ${({ padding }) => 
    padding === 'normal' && `
      padding: 24px;
    `}
  
  ${({ padding }) => 
    padding === 'compact' && `
      padding: 16px;
    `}
  
  ${({ padding }) => 
    padding === 'none' && `
      padding: 0;
    `}
  
  /* Interactive styles */
  ${({ onClick }) => 
    onClick && `
      cursor: pointer;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.1);
      }
    `}
`;

const CardTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 16px;
  color: #111827;
`;

const CardContent = styled.div`
  color: #374151;
`;

const CardFooter = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #E5E7EB;
`;

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'normal',
  children,
  title,
  footer,
  onClick,
  ...props
}) => {
  return (
    <CardContainer 
      variant={variant} 
      padding={padding} 
      onClick={onClick}
      {...props}
    >
      {title && <CardTitle>{title}</CardTitle>}
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardContainer>
  );
};
```

## Performance Optimization

### Memoization with React.memo

```tsx
import React from 'react';

interface UserAvatarProps {
  src: string;
  alt: string;
  size?: 'small' | 'medium' | 'large';
}

// Memoize component to prevent unnecessary re-renders
export const UserAvatar = React.memo<UserAvatarProps>(({ 
  src, 
  alt, 
  size = 'medium' 
}) => {
  const sizeMap = {
    small: 32,
    medium: 48,
    large: 64
  };
  
  return (
    <img 
      src={src} 
      alt={alt} 
      width={sizeMap[size]}
      height={sizeMap[size]}
      style={{ borderRadius: '50%' }}
    />
  );
});

UserAvatar.displayName = 'UserAvatar';
```

### Callback Memoization with useCallback

```tsx
import React, { useState, useCallback } from 'react';

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState('');
  
  // Memoize the add function to prevent unnecessary re-renders
  const handleAdd = useCallback(() => {
    if (input.trim()) {
      setTodos(prev => [...prev, input.trim()]);
      setInput('');
    }
  }, [input]);
  
  return (
    <div>
      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add todo..."
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};
```

### Value Memoization with useMemo

```tsx
import React, { useMemo, useState } from 'react';

interface User {
  id: number;
  name: string;
  role: string;
}

export const UserList: React.FC<{ users: User[] }> = ({ users }) => {
  const [filter, setFilter] = useState('');
  
  // Memoize filtered users to avoid recalculating on every render
  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [users, filter]);
  
  return (
    <div>
      <input 
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter users..."
      />
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>{user.name} - {user.role}</li>
        ))}
      </ul>
    </div>
  );
};
```

### Code Splitting with React.lazy

```tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Spinner } from './components/atoms/Spinner';

// Lazy-load components
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

export const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
```

## Testing React Components

### Unit Testing with Jest and React Testing Library

```tsx
// Button.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button component', () => {
  test('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  test('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).not.toHaveBeenCalled();
  });
  
  test('applies variant styles', () => {
    const { rerender } = render(<Button variant="primary">Button</Button>);
    expect(screen.getByText('Button')).toHaveStyle('background-color: var(--primary-color)');
    
    rerender(<Button variant="outlined">Button</Button>);
    expect(screen.getByText('Button')).toHaveStyle('background-color: transparent');
  });
});
```

## Best Practices

### Component Design Principles

1. **Single Responsibility**: Each component should do one thing well
2. **Controlled vs Uncontrolled**: Prefer controlled components for forms
3. **Composition over Inheritance**: Use composition to share code between components
4. **Container/Presentational Pattern**: Separate data fetching from presentation
5. **Consistent Props API**: Design consistent and intuitive props interfaces

### Accessibility

1. **Semantic HTML**: Use appropriate HTML elements
2. **ARIA Attributes**: Add aria-* attributes when necessary
3. **Keyboard Navigation**: Ensure components are keyboard accessible
4. **Focus Management**: Manage focus properly, especially in modals
5. **Color Contrast**: Ensure sufficient contrast between text and background

### Performance Tips

1. **Virtual Lists**: Use virtualization for long lists (react-window, react-virtualized)
2. **Avoiding Rerenders**: Use memoization techniques (memo, useMemo, useCallback)
3. **Bundle Size**: Keep an eye on bundle size with tools like webpack-bundle-analyzer
4. **Code Splitting**: Split code by routes or components to reduce initial load time
5. **Tree Shaking**: Use ES6 imports to enable tree shaking

## 💡 Try It Yourself

1. Create a Card component based on a Figma design
2. Implement three variants: default, elevated, and outlined
3. Make it responsive for mobile, tablet, and desktop
4. Add hover and focus states
5. Include a header, body, and footer section
6. Test all variants and states

## 🔜 Next Steps

Now that you've learned how to implement React components, let's explore how to implement Angular components. Continue to the [Framework Implementation: Angular](../06-angular/README.md) guide. 