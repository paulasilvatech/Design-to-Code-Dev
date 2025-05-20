# Framework-Specific Implementation: React

This section provides detailed guidance on implementing Figma designs as React components using GitHub Agent, Copilot, and other AI tools. We'll cover component architecture, styling approaches, state management, and performance optimization specifically for React projects.

## React Component Architecture

When converting Figma designs to React code, organizing your components following Atomic Design principles creates a scalable and maintainable architecture:

```
src/
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.styles.ts
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
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
└── theme/
    ├── tokens.ts
    └── globalStyles.ts
```

This structure allows AI tools to understand component relationships and generate code that fits into your existing architecture.

## Styling Approaches for React

When converting Figma designs to React, you have several styling options. Here's how to implement each with AI assistance:

### 1. Styled Components

Styled Components is an excellent choice for direct Figma-to-code conversion because it allows encapsulated, component-specific styling:

```tsx
// Button.tsx
import styled from 'styled-components';
import { theme } from '../../theme/tokens';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  children: React.ReactNode;
}

const ButtonContainer = styled.button<{
  variant: string;
  size: string;
  disabled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.typography.fontFamily};
  font-weight: ${theme.typography.fontWeightMedium};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  
  /* Size styles */
  padding: ${props => {
    switch (props.size) {
      case 'small': return '8px 16px';
      case 'large': return '16px 32px';
      default: return '12px 24px';
    }
  }};
  font-size: ${props => {
    switch (props.size) {
      case 'small': return theme.typography.fontSize.sm;
      case 'large': return theme.typography.fontSize.lg;
      default: return theme.typography.fontSize.md;
    }
  }};
  
  /* Variant styles */
  background-color: ${props => {
    switch (props.variant) {
      case 'primary': return theme.colors.primary;
      case 'secondary': return theme.colors.secondary;
      case 'outlined': return 'transparent';
      default: return theme.colors.primary;
    }
  }};
  color: ${props => {
    switch (props.variant) {
      case 'primary': return theme.colors.white;
      case 'secondary': return theme.colors.white;
      case 'outlined': return theme.colors.primary;
      default: return theme.colors.white;
    }
  }};
  border: ${props => 
    props.variant === 'outlined' 
      ? `1px solid ${theme.colors.primary}` 
      : 'none'
  };
  
  /* State styles */
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  
  &:hover {
    background-color: ${props => {
      if (props.disabled) return;
      switch (props.variant) {
        case 'primary': return theme.colors.primaryDark;
        case 'secondary': return theme.colors.secondaryDark;
        case 'outlined': return theme.colors.primaryLight;
        default: return theme.colors.primaryDark;
      }
    }};
  }
  
  .icon-left {
    margin-right: 8px;
  }
  
  .icon-right {
    margin-left: 8px;
  }
  
  .spinner {
    margin-right: 8px;
  }
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
  children,
  ...props
}) => {
  return (
    <ButtonContainer 
      variant={variant} 
      size={size} 
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="spinner">⟳</span>}
      {!loading && leftIcon && <span className="icon-left">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="icon-right">{rightIcon}</span>}
    </ButtonContainer>
  );
};
```

**Prompting GitHub Copilot Agent for Styled Components:**
```
/agent Create a Button component using styled-components based on this Figma design:
https://www.figma.com/file/abc123/Design-System?node-id=123-456

The button should:
1. Support primary, secondary, and outlined variants
2. Have small, medium, and large sizes
3. Support disabled and loading states
4. Allow for left and right icons
5. Use our theme tokens from src/theme/tokens.ts
```

### 2. Tailwind CSS

Tailwind CSS is another excellent option for Figma-to-code conversion, especially for rapid development:

```tsx
// Button.tsx
import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
  className,
  children,
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outlined: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50'
  };
  
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };
  
  return (
    <button 
      className={clsx(
        'flex items-center justify-center font-medium rounded transition-all duration-200',
        variantClasses[variant],
        sizeClasses[size],
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="animate-spin mr-2">⟳</span>}
      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};
```

**Prompting GitHub Copilot Agent for Tailwind CSS:**
```
/agent Create a Button component using Tailwind CSS based on this Figma design:
https://www.figma.com/file/abc123/Design-System?node-id=123-456

The button should:
1. Support primary, secondary, and outlined variants
2. Have small, medium, and large sizes
3. Support disabled and loading states
4. Allow for left and right icons
5. Use our Tailwind configuration from tailwind.config.js
```

### 3. CSS Modules

CSS Modules provide a more traditional approach with good encapsulation:

```tsx
// Button.module.css
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family);
  font-weight: 500;
  border-radius: 4px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Sizes */
.small {
  padding: 8px 16px;
  font-size: 14px;
}

.medium {
  padding: 12px 24px;
  font-size: 16px;
}

.large {
  padding: 16px 32px;
  font-size: 18px;
}

/* Variants */
.primary {
  background-color: var(--color-primary);
  color: white;
  border: none;
}

.primary:hover:not(:disabled) {
  background-color: var(--color-primary-dark);
}

.secondary {
  background-color: var(--color-secondary);
  color: white;
  border: none;
}

.secondary:hover:not(:disabled) {
  background-color: var(--color-secondary-dark);
}

.outlined {
  background-color: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

.outlined:hover:not(:disabled) {
  background-color: var(--color-primary-light);
}

/* Icons */
.iconLeft {
  margin-right: 8px;
}

.iconRight {
  margin-left: 8px;
}

.spinner {
  margin-right: 8px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

// Button.tsx
import React from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
  className,
  children,
  ...props
}) => {
  return (
    <button 
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        className
      )}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className={styles.spinner}>⟳</span>}
      {!loading && leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
    </button>
  );
};
```

## React State Management

When implementing complex Figma designs, proper state management is crucial. Here are approaches that work well with AI-assisted code generation:

### Context API for Theme and Global State

```tsx
// ThemeContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { lightTheme, darkTheme, Theme } from '../theme/tokens';

interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;
  
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };
  
  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
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

**Prompting GitHub Copilot Agent for Context API:**
```
/agent Create a ThemeContext using React Context API that:
1. Provides light and dark theme options
2. Allows toggling between themes
3. Uses our theme tokens from src/theme/tokens.ts
4. Includes a custom hook for easy access
```

### React Query for API State

```tsx
// UserProfile.tsx
import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchUserProfile, updateUserProfile } from '../api/userApi';
import { Spinner, ErrorMessage, ProfileForm } from '../components';

interface UserProfileProps {
  userId: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const queryClient = useQueryClient();
  
  const { data: user, isLoading, error } = useQuery(
    ['user', userId], 
    () => fetchUserProfile(userId)
  );
  
  const updateMutation = useMutation(
    (userData) => updateUserProfile(userId, userData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user', userId]);
      }
    }
  );
  
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return (
    <ProfileForm 
      user={user} 
      onSubmit={updateMutation.mutate}
      isSubmitting={updateMutation.isLoading}
    />
  );
};
```

**Prompting GitHub Copilot Agent for React Query:**
```
/agent Create a UserProfile component that:
1. Fetches user data using React Query
2. Displays a loading state while fetching
3. Shows an error message if the fetch fails
4. Renders a profile form with the user data
5. Handles form submission to update the user profile
6. Uses our existing components from src/components
```

## Advanced React Components

When converting complex Figma designs to React, you'll often need to implement advanced components. Here's an example of a DataTable component that can be generated with AI assistance:

```tsx
// DataTable.tsx
import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/tokens';

interface Column<T> {
  key: string;
  title: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  sortable?: boolean;
  selectable?: boolean;
  pagination?: boolean;
  itemsPerPage?: number;
  onRowSelect?: (selectedRows: T[]) => void;
}

// Styled components for the DataTable
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  font-family: ${theme.typography.fontFamily};
`;

const TableHeader = styled.th<{ sortable?: boolean }>`
  padding: 16px;
  text-align: left;
  font-weight: ${theme.typography.fontWeightBold};
  color: ${theme.colors.text};
  background-color: ${theme.colors.background};
  border-bottom: 2px solid ${theme.colors.border};
  cursor: ${props => props.sortable ? 'pointer' : 'default'};
  
  &:hover {
    ${props => props.sortable && `background-color: ${theme.colors.backgroundHover};`}
  }
`;

const TableRow = styled.tr<{ selected?: boolean }>`
  &:nth-child(even) {
    background-color: ${theme.colors.backgroundAlt};
  }
  
  &:hover {
    background-color: ${theme.colors.backgroundHover};
  }
  
  ${props => props.selected && `
    background-color: ${theme.colors.primaryLight} !important;
  `}
`;

const TableCell = styled.td`
  padding: 16px;
  border-bottom: 1px solid ${theme.colors.border};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding: 8px 0;
`;

const PaginationButton = styled.button<{ disabled?: boolean }>`
  padding: 8px 16px;
  background-color: ${props => props.disabled ? theme.colors.disabled : theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.sm};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  
  &:hover:not(:disabled) {
    background-color: ${theme.colors.primaryDark};
  }
`;

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  sortable = true,
  selectable = false,
  pagination = true,
  itemsPerPage = 10,
  onRowSelect
}: DataTableProps<T>) {
  // State for sorting
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // State for selection
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  
  // Handle column sort
  const handleSort = (column: Column<T>) => {
    if (!sortable || !column.sortable) return;
    
    if (sortColumn === column.key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column.key);
      setSortDirection('asc');
    }
  };
  
  // Handle row selection
  const handleRowSelection = (row: T) => {
    if (!selectable) return;
    
    setSelectedRows(prev => {
      const rowId = row.id;
      if (prev.includes(rowId)) {
        const newSelected = prev.filter
(Content truncated due to size limit. Use line ranges to read in chunks)