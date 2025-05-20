# Complete Figma to Code Conversion Playbook for React & Angular

## Introduction

This comprehensive playbook provides a systematic approach to converting Figma designs into production-quality code using GitHub Copilot, MCP servers, and Azure AI Foundry. We focus specifically on React and Angular frameworks, covering everything from basic components to complex interactive elements.

By following this guide, you'll establish a streamlined workflow that leverages AI tools to dramatically reduce development time while maintaining high fidelity to original designs.

## Table of Contents

1. [Preparing Figma Designs for Optimal Conversion](#1-preparing-figma-designs-for-optimal-conversion)
2. [Setting Up the Development Environment](#2-setting-up-the-development-environment)
3. [GitHub Copilot Integration](#3-github-copilot-integration)
4. [MCP Servers for Figma and GitHub](#4-mcp-servers-for-figma-and-github)
5. [Azure AI Foundry Integration](#5-azure-ai-foundry-integration)
6. [Framework-Specific Implementation: React](#6-framework-specific-implementation-react)
7. [Framework-Specific Implementation: Angular](#7-framework-specific-implementation-angular)
8. [Component Library Implementation](#8-component-library-implementation)
9. [Testing and Quality Assurance](#9-testing-and-quality-assurance)
10. [Hands-On Workshop Guide](#10-hands-on-workshop-guide)
11. [Demonstration Workshop Guide](#11-demonstration-workshop-guide)
12. [Troubleshooting Guide](#12-troubleshooting-guide)

---

## 1. Preparing Figma Designs for Optimal Conversion

### Organizing Figma Files

Structure your Figma files to optimize for AI-powered code generation:

```
Project/
├── 📄 Design System
│   ├── 🎨 Colors & Typography
│   ├── 🧩 Components
│   └── 📐 Spacing & Grid System
├── 📄 Pages
│   ├── 🖼️ Homepage
│   ├── 🖼️ User Dashboard
│   └── 🖼️ Settings
└── 📄 Development-Ready Screens (✅ Ready for Dev)
```

### Key Figma Features to Leverage

#### Auto Layout

Auto Layout in Figma directly translates to flexbox or grid in CSS, making it essential for responsive designs:

![Auto Layout Structure](https://example.com/auto-layout.png)

**Best Practices:**
- Use vertical or horizontal Auto Layout for all component containers
- Set consistent spacing with "Space Between Items"
- Utilize "Fill Container" for responsive elements

#### Component Variants and Properties

Component variants in Figma create a direct mapping to component props in code:

```
Button (Component)
├── Primary (Variant)
├── Secondary (Variant)
├── Outlined (Variant)
└── Text (Variant)
```

**Properties to Define:**
- State: Default, Hover, Pressed, Disabled
- Size: Small, Medium, Large
- Icon Position: Left, Right, Icon Only

#### Design Tokens and Variables

Use Figma Variables for all:
- Color values
- Typography styles
- Spacing values
- Border radii
- Shadow styles

This creates a direct mapping to CSS variables or theme configuration.

### Documentation for Developers

Add developer-specific annotations directly in Figma:
- Component behavior descriptions
- Interactive state information
- Responsive behavior notes
- Animation specifications

### Preparing for Export

1. Enable Dev Mode in Figma
2. Create a dedicated handoff page with all components
3. Organize components by type (Navigation, Forms, Cards, etc.)
4. Use the "Ready for Development" status flag

---

## 2. Setting Up the Development Environment

### VS Code Configuration

Install the following extensions:
- GitHub Copilot and GitHub Copilot Chat
- Figma for VS Code
- Azure Tools Extension

### Required Node Modules

```bash
# For React projects
npm install react react-dom styled-components tailwindcss

# For Angular projects
ng new my-project --style=scss
ng add @angular/material
```

### Setting Up MCP Configuration

Create an `.mcp.json` file in your project root:

```json
{
  "servers": {
    "figma": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "figma-developer-mcp",
        "--figma-api-key=${env:FIGMA_API_KEY}"
      ]
    },
    "github": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${env:GITHUB_TOKEN}"
      }
    }
  }
}
```

### Environment Setup

Create a `.env` file with necessary API keys:

```
FIGMA_API_KEY=your_figma_api_key
GITHUB_TOKEN=your_github_token
AZURE_AI_FOUNDRY_KEY=your_azure_key
AZURE_AI_FOUNDRY_ENDPOINT=your_azure_endpoint
```

---

## 3. GitHub Copilot Integration

### Enabling GitHub Copilot in VS Code

1. Install GitHub Copilot extension
2. Sign in with your GitHub account
3. Enable Copilot agent mode (through Command Palette)
4. Configure custom instructions for your project

### Custom Instructions for Figma-to-Code

Create a `.github/copilot-instructions.md` file in your project:

```markdown
## Design-to-Code Guidelines
- Use TypeScript for all component development
- Follow Atomic Design principles (atoms, molecules, organisms)
- Implement responsive design using flexbox and CSS Grid
- Generate accessibility-compliant code (WCAG AA)
- Use styled-components for React / SCSS for Angular

## Structure
- Create components in a consistent folder structure
- Include storybook documentation
- Add appropriate unit tests
- Follow design tokens from Figma
```

### Effective Prompting Techniques

**Simple Component Request:**
```
Create a Button component based on the Figma design with:
- Primary, secondary, and outlined variants
- Small, medium, and large sizes
- Support for left and right icons
- Disabled state styling
- Loading state with spinner
```

**Complex Component Request:**
```
Generate a DataTable component that:
1. Supports sorting by column
2. Includes pagination
3. Allows row selection
4. Implements responsive behavior for mobile
5. Has a search/filter function
6. Matches the Figma design's visual styling
```

**For Component Tree Generation:**
```
Analyze the main dashboard layout from the Figma design and:
1. Create a component hierarchy diagram
2. Generate the necessary component files
3. Implement the layout structure
4. Connect components with proper props drilling
```

---

## 4. MCP Servers for Figma and GitHub

### What are MCP Servers?

MCP (Model Context Protocol) servers provide a standardized way for AI assistants to interact with external tools and services. In our workflow, we use:

1. **Figma MCP Server**: Provides design information directly to GitHub Copilot
2. **GitHub MCP Server**: Enables repository operations through Copilot

### Installing and Configuring Figma MCP Server

```bash
# Install the Figma Developer MCP globally
npm install -g figma-developer-mcp

# Run the server
figma-developer-mcp --figma-api-key=YOUR_API_KEY
```

For persistent configuration, add to VS Code settings.json:

```json
{
  "mcp.servers": {
    "figma": {
      "command": "figma-developer-mcp",
      "args": ["--figma-api-key=${env:FIGMA_API_KEY}"]
    }
  }
}
```

### Installing and Configuring GitHub MCP Server

Using Docker:

```bash
docker run -i --rm \
  -e GITHUB_PERSONAL_ACCESS_TOKEN=YOUR_TOKEN \
  ghcr.io/github/github-mcp-server
```

### Using MCP Servers with GitHub Copilot

Once configured, you'll have access to new tools in GitHub Copilot:

**Figma MCP Tools:**
- `get_figma_file`: Retrieve entire Figma file information
- `get_figma_node`: Get details about specific components
- `download_figma_images`: Extract images and icons

**GitHub MCP Tools:**
- `create_repository`: Create new GitHub repositories
- `create_branch`: Create branches for component development
- `push_files`: Push generated code directly to GitHub

Example workflow integrating both tools:

```
# In GitHub Copilot Chat
/agent Generate React components from the Figma design at https://www.figma.com/file/abc123, 
create a new GitHub repository called "design-system", and push the components there.
```

---

## 5. Azure AI Foundry Integration

### Setting Up Azure AI Foundry

1. Create an Azure AI Foundry resource in Azure Portal
2. Generate API keys and endpoints
3. Configure the connection in your development environment

### Azure AI Foundry for Design Analysis

Azure AI Foundry can enhance the design-to-code workflow by:

1. **Design Pattern Recognition**: Identifying common UI patterns
2. **Accessibility Auditing**: Ensuring WCAG compliance
3. **Design Token Extraction**: Converting colors, typography, and spacing to code
4. **Performance Optimization**: Suggesting code improvements

### Integration Code Example

```typescript
import { AzureAIFoundryClient } from '@azure/ai-foundry';

// Create a client
const client = new AzureAIFoundryClient({
  endpoint: process.env.AZURE_AI_FOUNDRY_ENDPOINT,
  apiKey: process.env.AZURE_AI_FOUNDRY_KEY
});

// Analyze a design 
async function analyzeDesign(figmaImage) {
  const result = await client.analyzeImage({
    image: figmaImage,
    features: ['componentDetection', 'accessibilityCheck']
  });
  
  return result;
}

// Generate optimized code
async function generateOptimizedCode(designSpec, framework) {
  const result = await client.generateCode({
    specification: designSpec,
    framework: framework, // 'react' or 'angular'
    optimizationLevel: 'production'
  });
  
  return result.code;
}
```

### Azure AI Foundry Custom Workflows

Create an AI Foundry project to define custom workflows:

1. **Design Import Workflow**: Automatically import Figma designs
2. **Code Generation Pipeline**: Generate framework-specific code
3. **Quality Check Process**: Validate generated code against best practices
4. **Version Control Integration**: Commit changes to repositories

---

## 6. Framework-Specific Implementation: React

### React Component Architecture

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

### Styling Approaches for React

#### 1. Styled Components

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

#### 2. Tailwind CSS

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

### Advanced React Components

#### Data Table Component

```jsx
import React, { useState } from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px;
  border-bottom: 2px solid var(--border-color);
  cursor: ${props => props.sortable ? 'pointer' : 'default'};
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: var(--bg-secondary);
  }
  
  &:hover {
    background-color: var(--hover-color);
  }
  
  ${props => props.selected && `
    background-color: var(--selected-color) !important;
  `}
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid var(--border-color);
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

export const DataTable = ({ 
  data, 
  columns, 
  sortable = true,
  selectable = false,
  pagination = true,
  itemsPerPage = 10
}) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const handleSort = (column) => {
    if (!sortable || !column.sortable) return;
    
    if (sortColumn === column.key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column.key);
      setSortDirection('asc');
    }
  };
  
  const handleRowSelection = (rowId) => {
    if (!selectable) return;
    
    setSelectedRows(prev => {
      if (prev.includes(rowId)) {
        return prev.filter(id => id !== rowId);
      } else {
        return [...prev, rowId];
      }
    });
  };
  
  // Sort data
  let sortedData = [...data];
  if (sortColumn) {
    sortedData.sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
  
  // Paginate data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = pagination 
    ? sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : sortedData;
  
  return (
    <div>
      <Table>
        <thead>
          <tr>
            {selectable && (
              <TableHeader>
                <input 
                  type="checkbox" 
                  onChange={() => {/* Handle select all */}}
                />
              </TableHeader>
            )}
            {columns.map(column => (
              <TableHeader 
                key={column.key}
                sortable={sortable && column.sortable}
                onClick={() => handleSort(column)}
              >
                {column.title}
                {sortColumn === column.key && (
                  <span>{sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>
                )}
              </TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <TableRow 
              key={row.id || index}
              selected={selectedRows.includes(row.id)}
              onClick={() => handleRowSelection(row.id)}
            >
              {selectable && (
                <TableCell>
                  <input 
                    type="checkbox" 
                    checked={selectedRows.includes(row.id)}
                    onChange={() => {/* For controlled component */}}
                  />
                </TableCell>
              )}
              {columns.map(column => (
                <TableCell key={column.key}>
                  {column.render ? column.render(row) : row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>
      
      {pagination && totalPages > 1 && (
        <Pagination>
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          >
            Next
          </button>
        </Pagination>
      )}
    </div>
  );
};
```

### React State Management

#### Using Context API

```jsx
// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

#### Using React Query for API State

```jsx
import { useQuery, useMutation, QueryClient, QueryClientProvider } from 'react-query';

// Setup
const queryClient = new QueryClient();

// Wrap your app
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>

// In components
const UserProfile = ({ userId }) => {
  const { data, isLoading, error } = useQuery(['user', userId], 
    () => fetch(`/api/users/${userId}`).then(res => res.json())
  );
  
  const updateMutation = useMutation(
    (userData) => fetch(`/api/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    }).then(res => res.json()),
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
      user={data} 
      onSubmit={updateMutation.mutate}
      isSubmitting={updateMutation.isLoading}
    />
  );
};
```

### Performance Optimization in React

1. **Memoizing Components with React.memo**:
```jsx
const UserAvatar = React.memo(({ user }) => (
  <img src={user.avatar} alt={user.name} />
));
```

2. **Using useCallback for Event Handlers**:
```jsx
const handleSubmit = useCallback((formData) => {
  submitForm(formData);
}, [submitForm]);
```

3. **Using useMemo for Expensive Calculations**:
```jsx
const sortedItems = useMemo(() => {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}, [items]);
```

4. **Implementing Virtualization for Large Lists**:
```jsx
import { FixedSizeList } from 'react-window';

const VirtualizedList = ({ items }) => (
  <FixedSizeList
    height={500}
    width="100%"
    itemCount={items.length}
    itemSize={50}
  >
    {({ index, style }) => (
      <div style={style}>
        {items[index].name}
      </div>
    )}
  </FixedSizeList>
);
```

5. **Using Code Splitting with React.lazy**:
```jsx
const Dashboard = React.lazy(() => import('./Dashboard'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Dashboard />
    </Suspense>
  );
}
```

---

## 7. Framework-Specific Implementation: Angular

### Angular Component Architecture

Organize Angular components using feature modules:

```
src/
├── app/
│   ├── core/
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   └── api.service.ts
│   │   └── guards/
│   │       └── auth.guard.ts
│   ├── shared/
│   │   ├── components/
│   │   │   ├── button/
│   │   │   ├── input/
│   │   │   └── modal/
│   │   ├── directives/
│   │   └── pipes/
│   ├── features/
│   │   ├── dashboard/
│   │   ├── profile/
│   │   └── settings/
│   └── theme/
│       ├── _variables.scss
│       └── _mixins.scss
```

### Angular Component Implementation

#### Button Component

```typescript
// button.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'outlined' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() leftIcon: string;
  @Input() rightIcon: string;
  
  @Output() clicked = new EventEmitter<void>();
  
  handleClick(): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }
}
```

```html
<!-- button.component.html -->
<button 
  [ngClass]="[
    'app-button', 
    'app-button--' + variant,
    'app-button--' + size,
    disabled ? 'app-button--disabled' : '',
    loading ? 'app-button--loading' : ''
  ]"
  [disabled]="disabled || loading"
  (click)="handleClick()"
>
  <mat-icon *ngIf="leftIcon && !loading">{{leftIcon}}</mat-icon>
  <mat-spinner *ngIf="loading" diameter="20"></mat-spinner>
  <span class="app-button__content">
    <ng-content></ng-content>
  </span>
  <mat-icon *ngIf="rightIcon && !loading">{{rightIcon}}</mat-icon>
</button>
```

```scss
// button.component.scss
@import '../../theme/variables';

.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family);
  font-weight: 500;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &__content {
    margin: 0 0.5rem;
  }
  
  // Variants
  &--primary {
    background-color: var(--primary-color);
    color: white;
    
    &:hover:not(.app-button--disabled) {
      background-color: var(--primary-dark);
    }
  }
  
  &--secondary {
    background-color: var(--secondary-color);
    color: var(--text-on-secondary);
    
    &:hover:not(.app-button--disabled) {
      background-color: var(--secondary-dark);
    }
  }
  
  &--outlined {
    background-color: transparent;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    
    &:hover:not(.app-button--disabled) {
      background-color: rgba(var(--primary-color-rgb), 0.05);
    }
  }
  
  // Sizes
  &--small {
    padding: 8px 16px;
    font-size: 14px;
  }
  
  &--medium {
    padding: 12px 24px;
    font-size: 16px;
  }
  
  &--large {
    padding: 16px 32px;
    font-size: 18px;
  }
  
  // States
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &--loading {
    cursor: wait;
  }
}
```

### Angular Material Integration

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
// Other Material imports

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    // Other Material modules
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Advanced Angular Components

#### Data Table Component

```typescript
// data-table.component.ts
import { Component, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

export interface TableColumn {
  key: string;
  title: string;
  sortable?: boolean;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() selectable = false;
  @Input() pagination = true;
  @Input() pageSize = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50];
  
  @Output() rowSelected = new EventEmitter<any[]>();
  @Output() rowClicked = new EventEmitter<any>();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = [];
  
  ngOnChanges(): void {
    this.dataSource.data = this.data;
    this.updateDisplayedColumns();
    
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  updateDisplayedColumns(): void {
    this.displayedColumns = this.columns.map(column => column.key);
    
    if (this.selectable) {
      this.displayedColumns.unshift('select');
    }
  }
  
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  
  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
    
    this.rowSelected.emit(this.selection.selected);
  }
  
  rowSelectionToggle(row: any): void {
    this.selection.toggle(row);
    this.rowSelected.emit(this.selection.selected);
  }
  
  onRowClick(row: any): void {
    this.rowClicked.emit(row);
  }
  
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
```

```html
<!-- data-table.component.html -->
<div class="data-table-container">
  <mat-form-field appearance="outline" class="filter-field">
    <mat-label>Filter</mat-label>
    <input matInput (keyup)="applyFilter($event)" placeholder="Search...">
    <mat-icon matSuffix>search</mat-icon>
  </mat-form-field>

  <div class="table-wrapper">
    <table mat-table [dataSource]="dataSource" matSort>
      <!-- Checkbox Column -->
      <ng-container matColumnDef="select" *ngIf="selectable">
        <th mat-header-cell *matHeaderCellDef>
          <mat-checkbox 
            (change)="masterToggle()"
            [checked]="selection.hasValue() && isAllSelected()"
            [indeterminate]="selection.hasValue() && !isAllSelected()">
          </mat-checkbox>
        </th>
        <td mat-cell *matCellDef="let row">
          <mat-checkbox 
            (click)="$event.stopPropagation()"
            (change)="rowSelectionToggle(row)"
            [checked]="selection.isSelected(row)">
          </mat-checkbox>
        </td>
      </ng-container>

      <!-- Dynamic Columns -->
      <ng-container *ngFor="let column of columns" [matColumnDef]="column.key">
        <th mat-header-cell *matHeaderCellDef [mat-sort-header]="column.sortable ? column.key : null">
          {{ column.title }}
        </th>
        <td mat-cell *matCellDef="let element" (click)="onRowClick(element)">
          {{ element[column.key] }}
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
      <tr 
        mat-row 
        *matRowDef="let row; columns: displayedColumns;"
        [class.selected-row]="selection.isSelected(row)"
      ></tr>

      <!-- No Data Row -->
      <tr class="mat-row" *matNoDataRow>
        <td class="mat-cell no-data" [attr.colspan]="displayedColumns.length">
          No data matching the filter
        </td>
      </tr>
    </table>
  </div>

  <mat-paginator 
    *ngIf="pagination"
    [pageSize]="pageSize"
    [pageSizeOptions]="pageSizeOptions"
    showFirstLastButtons>
  </mat-paginator>
</div>
```

```scss
// data-table.component.scss
.data-table-container {
  width: 100%;
  
  .filter-field {
    width: 100%;
    margin-bottom: 16px;
  }
  
  .table-wrapper {
    overflow-x: auto;
    
    table {
      width: 100%;
      
      .mat-row {
        &:hover {
          background-color: rgba(0, 0, 0, 0.04);
        }
        
        &.selected-row {
          background-color: rgba(0, 0, 0, 0.08);
        }
      }
      
      .no-data {
        text-align: center;
        padding: 16px;
        font-style: italic;
      }
    }
  }
}
```

### Angular State Management

#### Using NGRX Store

```typescript
// user.actions.ts
import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const loadUser = createAction(
  '[User] Load User',
  props<{ id: string }>()
);

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: any }>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{ user: User }>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: User }>()
);

export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: any }>()
);
```

```typescript
// user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from '../models/user.model';

export interface UserState {
  user: User | null;
  loading: boolean;
  error: any;
}

export const initialState: UserState = {
  user: null,
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUser, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false
  })),
  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(UserActions.updateUser, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false
  })),
  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
```

```typescript
// user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loadUser),
    switchMap(({ id }) => 
      this.userService.getUser(id).pipe(
        map(user => UserActions.loadUserSuccess({ user })),
        catchError(error => of(UserActions.loadUserFailure({ error })))
      )
    )
  ));
  
  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.updateUser),
    switchMap(({ user }) => 
      this.userService.updateUser(user).pipe(
        map(updatedUser => UserActions.updateUserSuccess({ user: updatedUser })),
        catchError(error => of(UserActions.updateUserFailure({ error })))
      )
    )
  ));
  
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
```

```typescript
// user.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  selectUserState,
  state => state.user
);

export const selectUserLoading = createSelector(
  selectUserState,
  state => state.loading
);

export const selectUserError = createSelector(
  selectUserState,
  state => state.error
);
```

### Angular Performance Optimization

1. **OnPush Change Detection Strategy**:
```typescript
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  @Input() user: User;
}
```

2. **Lazy Loading Modules**:
```typescript
// app-routing.module.ts
const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule)
  }
];
```

3. **Using TrackBy with ngFor**:
```html
<div *ngFor="let item of items; trackBy: trackByFn">
  {{ item.name }}
</div>
```

```typescript
trackByFn(index: number, item: any): any {
  return item.id;
}
```

4. **Virtual Scrolling with CDK**:
```html
<cdk-virtual-scroll-viewport itemSize="50" class="viewport">
  <div *cdkVirtualFor="let item of items" class="item">
    {{ item.name }}
  </div>
</cdk-virtual-scroll-viewport>
```

5. **Pure Pipes**:
```typescript
@Pipe({
  name: 'filter',
  pure: true
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }
    
    return items.filter(item => 
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
```

---

## 8. Component Library Implementation

### Creating a Unified Design System

A comprehensive component library should include:

1. **Design Tokens**: Colors, typography, spacing, shadows
2. **Basic Components**: Buttons, inputs, selects, checkboxes
3. **Complex Components**: Forms, tables, modals, navigation
4. **Layouts**: Grids, containers, responsive utilities

### React Component Library Structure

```
design-system/
├── src/
│   ├── tokens/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── index.ts
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.styles.ts
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   ├── Input.styles.ts
│   │   │   ├── Input.test.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   └── index.ts
├── .storybook/
│   ├── main.js
│   └── preview.js
├── package.json
└── README.md
```

### Angular Component Library Structure

```
design-system/
├── projects/
│   └── design-system/
│       ├── src/
│       │   ├── lib/
│       │   │   ├── tokens/
│       │   │   ├── components/
│       │   │   │   ├── button/
│       │   │   │   ├── input/
│       │   │   │   └── ...
│       │   │   └── design-system.module.ts
│       │   ├── public-api.ts
│       │   └── index.ts
│       └── ng-package.json
├── .storybook/
│   ├── main.js
│   └── preview.js
├── angular.json
└── package.json
```

### Documenting Components with Storybook

1. **Set up Storybook for React**:
```bash
npx storybook init
```

2. **Create Component Stories**:
```jsx
// Button.stories.jsx
import React from 'react';
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select', options: ['primary', 'secondary', 'outlined'] },
      defaultValue: 'primary'
    },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
      defaultValue: 'medium'
    },
    disabled: {
      control: 'boolean',
      defaultValue: false
    }
  }
};

const Template = (args) => <Button {...args}>Button Text</Button>;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary'
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined'
};

export const Small = Template.bind({});
Small.args = {
  size: 'small'
};

export const Large = Template.bind({});
Large.args = {
  size: 'large'
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true
};
```

### Testing Component Library

1. **Unit Tests with Jest and React Testing Library**:
```jsx
// Button.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  test('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  test('applies variant styles', () => {
    const { rerender } = render(<Button variant="primary">Button</Button>);
    expect(screen.getByText('Button')).toHaveClass('button--primary');
    
    rerender(<Button variant="secondary">Button</Button>);
    expect(screen.getByText('Button')).toHaveClass('button--secondary');
  });
  
  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Button</Button>);
    expect(screen.getByText('Button')).toBeDisabled();
  });
});
```

2. **Visual Regression Testing with Storybook and Chromatic**:
```bash
npx chromatic --project-token=your-project-token
```

3. **Accessibility Testing with Storybook Addon**:
```javascript
// .storybook/main.js
module.exports = {
  addons: [
    '@storybook/addon-a11y',
    // other addons
  ],
};
```

---

## 9. Testing and Quality Assurance

### Testing Strategy

Implement a comprehensive testing approach:

1. **Unit Tests**: Test individual components and functions
2. **Integration Tests**: Test component interactions
3. **Visual Tests**: Ensure design fidelity
4. **Accessibility Tests**: Ensure WCAG compliance
5. **Performance Tests**: Check rendering speed and efficiency

### Automated Testing Setup

**For React**:
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-axe
```

**For Angular**:
```bash
ng test --code-coverage
```

### Visual Regression Testing

```javascript
// Example with Percy
import { percySnapshot } from '@percy/playwright';

test('visual regression test', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await percySnapshot(page, 'Homepage');
  
  await page.click('button.login');
  await percySnapshot(page, 'Login Form');
});
```

### Accessibility Testing

```javascript
// Example with jest-axe
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

test('button has no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Code Quality Checks

Set up linting and formatting:

**.eslintrc.js (React)**:
```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier'
  ],
  plugins: ['react', '@typescript-eslint', 'jsx-a11y'],
  rules: {
    // Custom rules
  }
};
```

**.eslintrc.json (Angular)**:
```json
{
  "root": true,
  "ignorePatterns": ["projects/**/*"],
  "overrides": [
    {
      "files": ["*.ts"],
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates"
      ],
      "rules": {
        // Custom rules
      }
    },
    {
      "files": ["*.html"],
      "extends": [
        "plugin:@angular-eslint/template/recommended"
      ],
      "rules": {
        // Custom rules
      }
    }
  ]
}
```

---

## 10. Hands-On Workshop Guide

### Workshop Title: Build a Design System from Figma to Code

**Duration**: 3 hours

**Prerequisites**:
- VS Code with GitHub Copilot extension
- Node.js installed
- Basic knowledge of React or Angular
- Figma account
- GitHub account

### Workshop Structure

#### 1. Introduction (15 minutes)
- Overview of the design-to-code workflow
- Explanation of tools: GitHub Copilot, MCP servers, Azure AI Foundry
- Introduction to the Figma design we'll be implementing

#### 2. Environment Setup (30 minutes)
- Install necessary tools and extensions
- Configure GitHub Copilot
- Set up Figma MCP server
- Initialize project structure

#### 3. Implementing Core Components (60 minutes)

**Exercise 1: Button Component (20 minutes)**
1. Analyze the Button component in Figma
2. Use GitHub Copilot to generate the base component
3. Implement variants and states
4. Test the component

**Exercise 2: Form Components (20 minutes)**
1. Analyze form components in Figma (Input, Select, Checkbox)
2. Generate components with GitHub Copilot
3. Apply styling and behavior
4. Combine into a form

**Exercise 3: Card Component (20 minutes)**
1. Analyze the Card component in Figma
2. Generate the component with GitHub Copilot
3. Implement responsive behavior
4. Add interactivity

#### 4. Advanced Components (45 minutes)

**Exercise 4: Data Table Component (25 minutes)**
1. Analyze the data table design in Figma
2. Generate the component structure
3. Implement sorting and pagination
4. Add row selection

**Exercise 5: Modal Component (20 minutes)**
1. Analyze the modal design in Figma
2. Create the component with GitHub Copilot
3. Implement open/close animations
4. Add accessibility features

#### 5. Integrating with Backend (30 minutes)
1. Set up mock API service
2. Integrate components with data fetching
3. Implement loading and error states
4. Create a complete page

#### 6. Wrap-up and Q&A (15 minutes)
- Review what we've learned
- Discuss next steps
- Q&A session

### Exercise Examples

**Exercise 1: Button Component**

1. Analyze the Figma design:
   - Note the variants: primary, secondary, outlined
   - Identify states: default, hover, active, disabled
   - Note sizing: small, medium, large

2. Create the Button component using GitHub Copilot:
   
   ***For React:***
   
   Prompt:
   ```
   Create a Button component in React with TypeScript that:
   - Has primary, secondary, and outlined variants
   - Supports small, medium, and large sizes
   - Has default, hover, active, and disabled states
   - Can include left and right icons
   - Has a loading state with a spinner
   - Is fully accessible with proper ARIA attributes
   - Uses styled-components for styling
   ```
   
   ***For Angular:***
   
   Prompt:
   ```
   Create a Button component in Angular that:
   - Has primary, secondary, and outlined variants as @Input
   - Supports small, medium, and large sizes as @Input
   - Has default, hover, active, and disabled states
   - Can include left and right icons as @Input
   - Has a loading state with a spinner as @Input
   - Is fully accessible with proper ARIA attributes
   - Uses SCSS for styling
   ```

3. Test the Button component:
   - Create simple test cases for each variant
   - Test click behavior, disabled state, and loading state

---

## 11. Demonstration Workshop Guide

### Workshop Title: From Pixels to Production: AI-Powered Design-to-Code

**Duration**: 1 hour

**Description**: This demonstration workshop showcases how to transform Figma designs into production-ready code using AI-powered tools. Participants will observe a complete workflow from design analysis to code generation and refinement.

### Workshop Structure

#### 1. Introduction (5 minutes)
- Overview of the design-to-code challenge
- Introduction to the tools: Figma, GitHub Copilot, MCP, Azure AI
- Showcase of the final result we'll be building

#### 2. Design Analysis (10 minutes)
- Walk through the Figma design file
- Analyze component structure and hierarchy
- Identify design tokens and patterns
- Discuss how AI tools "see" design elements

#### 3. Setup Demonstration (5 minutes)
- Show VS Code configuration
- Demonstrate GitHub Copilot setup
- Configure MCP servers
- Connect to Azure AI Foundry

#### 4. Live Coding Demonstrations (30 minutes)

**Demo 1: Basic Components (10 minutes)**
- Generate Button, Input, and Card components
- Show how AI handles different variants and states
- Demonstrate styling approach
- Show testing and accessibility considerations

**Demo 2: Complex Component (10 minutes)**
- Generate a Data Table component
- Show how AI handles complex interaction patterns
- Demonstrate performance optimization
- Showcase responsive behavior

**Demo 3: Full Page Implementation (10 minutes)**
- Combine components into a complete page
- Demonstrate state management
- Show API integration
- Highlight how AI can refactor and optimize

#### 5. Best Practices (5 minutes)
- Tips for optimal Figma organization
- Effective prompting strategies
- Quality assurance process
- Collaboration workflow

#### 6. Q&A (5 minutes)
- Answer participant questions
- Provide additional resources
- Share access to sample code

### Example Demos

**Demo 1: Basic Components**

1. Start with the Figma design of a Button component
2. Show the design specifications in Dev Mode
3. Write a prompt for GitHub Copilot:

   ```
   Generate a Button component based on this Figma design:
   - It should support primary (blue), secondary (gray), and outlined variants
   - Sizes should be small (32px height), medium (40px height), and large (48px height)
   - Include hover and active states with color changes
   - Support disabled state with reduced opacity
   - Include optional left and right icons
   - Add a loading state with a spinner
   - Ensure it's fully accessible
   ```

4. Let GitHub Copilot generate the code
5. Review and refine the generated code
6. Demonstrate the component in different states

**Demo 3: Full Page Implementation**

1. Show the complete Figma design of a dashboard page
2. Analyze the layout and component structure
3. Write a prompt for GitHub Copilot:

   ```
   Generate a complete Dashboard page based on the Figma design with:
   - Responsive header with logo, navigation, and user menu
   - Sidebar with collapsible navigation
   - Main content area with statistics cards
   - Data table showing user transactions
   - Filter and search functionality
   - Use proper state management for data fetching
   - Implement responsive behavior for mobile, tablet, and desktop
   ```

4. Review and refine the generated layout
5. Connect to mock API for data
6. Demonstrate responsive behavior
7. Show performance optimization techniques

---

## 12. Troubleshooting Guide

### Common Issues with Figma Integration

| Issue | Solution |
|-------|----------|
| Figma API authentication fails | Check API key permissions and regenerate if necessary |
| Auto Layout not translating correctly | Ensure proper Auto Layout setup in Figma with consistent spacing |
| Component variants missing | Use proper variant setup in Figma with complete property sets |
| Color tokens not matching | Use Figma variables instead of direct color values |

### Common Issues with GitHub Copilot

| Issue | Solution |
|-------|----------|
| Generated code is incomplete | Break down requests into smaller, more specific prompts |
| Styling doesn't match design | Provide more detailed design specifications in prompts |
| Component behavior is incorrect | Clearly specify all interaction patterns and state transitions |
| MCP server connection issues | Check environment variables and server configuration |

### Common Issues with React Implementation

| Issue | Solution |
|-------|----------|
| Component re-rendering too often | Use React.memo, useCallback, and useMemo |
| Styling inconsistencies | Use a CSS-in-JS solution or strict CSS methodology |
| Prop drilling becoming unwieldy | Implement Context API or state management |
| Type errors in TypeScript | Define proper interfaces for all components and props |

### Common Issues with Angular Implementation

| Issue | Solution |
|-------|----------|
| Change detection performance | Use OnPush strategy and optimize templates |
| Component communication issues | Use proper @Input/@Output or state management |
| Module organization problems | Follow feature module pattern with proper imports |
| Form validation complexity | Use reactive forms with custom validators |

---

This playbook provides a comprehensive guide to implementing a design-to-code workflow using AI-powered tools. By following these guidelines, you can dramatically reduce development time while maintaining high-quality, accessible, and performant implementations in both React and Angular frameworks.
