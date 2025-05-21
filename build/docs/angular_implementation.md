# Framework-Specific Implementation: Angular

This section provides detailed guidance on implementing Figma designs as Angular components using GitHub Agent, Copilot, and other AI tools. We'll cover component architecture, styling approaches, state management, and performance optimization specifically for Angular projects.

## Angular Component Architecture

When converting Figma designs to Angular code, organizing your components using a modular architecture creates a scalable and maintainable codebase:

```
src/
├── app/
│   ├── core/
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   └── api.service.ts
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   └── interceptors/
│   │       └── http-error.interceptor.ts
│   ├── shared/
│   │   ├── components/
│   │   │   ├── button/
│   │   │   │   ├── button.component.ts
│   │   │   │   ├── button.component.html
│   │   │   │   ├── button.component.scss
│   │   │   │   └── button.component.spec.ts
│   │   │   ├── input/
│   │   │   └── card/
│   │   ├── directives/
│   │   ├── pipes/
│   │   └── models/
│   ├── features/
│   │   ├── dashboard/
│   │   ├── profile/
│   │   └── settings/
│   └── theme/
│       ├── _variables.scss
│       └── _mixins.scss
```

This structure allows AI tools to understand component relationships and generate code that fits into your existing architecture.

## Angular Component Implementation

When implementing Figma designs in Angular, you'll typically create components with separate template, style, and logic files. Here's how to implement components with AI assistance:

### Basic Component Implementation

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
  @Input() leftIcon?: string;
  @Input() rightIcon?: string;
  
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
  <mat-icon *ngIf="leftIcon && !loading" class="app-button__icon-left">{{leftIcon}}</mat-icon>
  <mat-spinner *ngIf="loading" diameter="20"></mat-spinner>
  <span class="app-button__content">
    <ng-content></ng-content>
  </span>
  <mat-icon *ngIf="rightIcon && !loading" class="app-button__icon-right">{{rightIcon}}</mat-icon>
</button>
```

```scss
// button.component.scss
@import '../../theme/variables';

:host {
  display: inline-block;
}

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
  
  &__icon-left {
    margin-right: 0.5rem;
  }
  
  &__icon-right {
    margin-left: 0.5rem;
  }
  
  // Variants
  &--primary {
    background-color: var(--color-primary);
    color: var(--color-white);
    
    &:hover:not(:disabled) {
      background-color: var(--color-primary-dark);
    }
  }
  
  &--secondary {
    background-color: var(--color-secondary);
    color: var(--color-white);
    
    &:hover:not(:disabled) {
      background-color: var(--color-secondary-dark);
    }
  }
  
  &--outlined {
    background-color: transparent;
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    
    &:hover:not(:disabled) {
      background-color: var(--color-primary-light);
    }
  }
  
  // Sizes
  &--small {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
  
  &--medium {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
  
  &--large {
    padding: 1rem 2rem;
    font-size: 1.125rem;
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

**Prompting GitHub Copilot Agent for Angular Components:**
```
/agent Create an Angular Button component based on this Figma design:
https://www.figma.com/file/abc123/Design-System?node-id=123-456

The button should:
1. Support primary, secondary, and outlined variants
2. Have small, medium, and large sizes
3. Support disabled and loading states
4. Allow for left and right icons using Material icons
5. Use SCSS with BEM methodology
6. Follow Angular best practices with separate template, style, and logic files
```

### Advanced Component Implementation

#### Data Table Component

```typescript
// data-table.component.ts
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

export interface Column {
  key: string;
  title: string;
  sortable?: boolean;
}

export interface SortEvent {
  column: string;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() columns: Column[] = [];
  @Input() sortable = true;
  @Input() selectable = false;
  @Input() pagination = true;
  @Input() itemsPerPage = 10;
  
  @Output() rowSelected = new EventEmitter<any[]>();
  @Output() sortChanged = new EventEmitter<SortEvent>();
  @Output() pageChanged = new EventEmitter<number>();
  
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedRows: any[] = [];
  currentPage = 1;
  totalPages = 1;
  displayData: any[] = [];
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['itemsPerPage']) {
      this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
      this.updateDisplayData();
    }
  }
  
  updateDisplayData(): void {
    // Apply sorting
    let processedData = [...this.data];
    if (this.sortColumn) {
      processedData.sort((a, b) => {
        const aValue = a[this.sortColumn as string];
        const bValue = b[this.sortColumn as string];
        
        if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    // Apply pagination
    if (this.pagination) {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.displayData = processedData.slice(startIndex, startIndex + this.itemsPerPage);
    } else {
      this.displayData = processedData;
    }
  }
  
  onSort(column: Column): void {
    if (!this.sortable || !column.sortable) return;
    
    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }
    
    this.updateDisplayData();
    this.sortChanged.emit({
      column: this.sortColumn,
      direction: this.sortDirection
    });
  }
  
  onSelectRow(row: any): void {
    if (!this.selectable) return;
    
    const index = this.selectedRows.findIndex(r => r.id === row.id);
    if (index > -1) {
      this.selectedRows.splice(index, 1);
    } else {
      this.selectedRows.push(row);
    }
    
    this.rowSelected.emit([...this.selectedRows]);
  }
  
  isSelected(row: any): boolean {
    return this.selectedRows.some(r => r.id === row.id);
  }
  
  onSelectAll(): void {
    if (this.selectedRows.length === this.displayData.length) {
      this.selectedRows = [];
    } else {
      this.selectedRows = [...this.displayData];
    }
    
    this.rowSelected.emit([...this.selectedRows]);
  }
  
  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateDisplayData();
    this.pageChanged.emit(page);
  }
  
  get allSelected(): boolean {
    return this.displayData.length > 0 && this.selectedRows.length === this.displayData.length;
  }
  
  get indeterminate(): boolean {
    return this.selectedRows.length > 0 && this.selectedRows.length < this.displayData.length;
  }
}
```

```html
<!-- data-table.component.html -->
<div class="data-table">
  <table class="data-table__table">
    <thead>
      <tr>
        <th *ngIf="selectable" class="data-table__header data-table__header--checkbox">
          <mat-checkbox
            [checked]="allSelected"
            [indeterminate]="indeterminate"
            (change)="onSelectAll()"
          ></mat-checkbox>
        </th>
        <th 
          *ngFor="let column of columns" 
          class="data-table__header"
          [class.data-table__header--sortable]="sortable && column.sortable"
          (click)="onSort(column)"
        >
          {{ column.title }}
          <span *ngIf="sortColumn === column.key" class="data-table__sort-icon">
            {{ sortDirection === 'asc' ? '↑' : '↓' }}
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr 
        *ngFor="let row of displayData" 
        class="data-table__row"
        [class.data-table__row--selected]="isSelected(row)"
        (click)="onSelectRow(row)"
      >
        <td *ngIf="selectable" class="data-table__cell data-table__cell--checkbox">
          <mat-checkbox
            [checked]="isSelected(row)"
            (click)="$event.stopPropagation()"
            (change)="onSelectRow(row)"
          ></mat-checkbox>
        </td>
        <td *ngFor="let column of columns" class="data-table__cell">
          {{ row[column.key] }}
        </td>
      </tr>
    </tbody>
  </table>
  
  <div *ngIf="pagination && totalPages > 1" class="data-table__pagination">
    <button 
      class="data-table__pagination-button"
      [disabled]="currentPage === 1"
      (click)="onPageChange(currentPage - 1)"
    >
      Previous
    </button>
    <span class="data-table__pagination-info">
      Page {{ currentPage }} of {{ totalPages }}
    </span>
    <button 
      class="data-table__pagination-button"
      [disabled]="currentPage === totalPages"
      (click)="onPageChange(currentPage + 1)"
    >
      Next
    </button>
  </div>
</div>
```

```scss
// data-table.component.scss
@import '../../theme/variables';

.data-table {
  width: 100%;
  
  &__table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    font-family: var(--font-family);
  }
  
  &__header {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: var(--color-text);
    background-color: var(--color-background);
    border-bottom: 2px solid var(--color-border);
    
    &--sortable {
      cursor: pointer;
      
      &:hover {
        background-color: var(--color-background-hover);
      }
    }
    
    &--checkbox {
      width: 48px;
    }
  }
  
  &__row {
    &:nth-child(even) {
      background-color: var(--color-background-alt);
    }
    
    &:hover {
      background-color: var(--color-background-hover);
    }
    
    &--selected {
      background-color: var(--color-primary-light) !important;
    }
  }
  
  &__cell {
    padding: 1rem;
    border-bottom: 1px solid var(--color-border);
    
    &--checkbox {
      width: 48px;
    }
  }
  
  &__sort-icon {
    margin-left: 0.5rem;
  }
  
  &__pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    padding: 0.5rem 0;
  }
  
  &__pagination-button {
    padding: 0.5rem 1rem;
    background-color: var(--color-primary);
    color: var(--color-white);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover:not(:disabled) {
      background-color: var(--color-primary-dark);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  &__pagination-info {
    font-size: 0.875rem;
  }
}
```

**Prompting GitHub Copilot Agent for Advanced Angular Components:**
```
/agent Create an Angular DataTable component based on this Figma design:
https://www.figma.com/file/abc123/Design-System?node-id=789-012

The DataTable should:
1. Support sorting by column
2. Allow row selection with checkboxes
3. Include pagination with configurable items per page
4. Support dynamic columns configuration
5. Emit events for selection, sorting, and pagination changes
6. Use Angular Material for checkboxes
7. Follow Angular best practices with separate template, style, and logic files
```

## Angular Styling Approaches

When converting Figma designs to Angular, you have several styling options. Here's how to implement each with AI assistance:

### 1. Component-Scoped SCSS

Angular's default approach uses component-scoped SCSS files:

```scss
// button.component.scss
:host {
  display: inline-block;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family);
  font-weight: 500;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  // Variants, sizes, and states...
}
```

### 2. Angular Material Theming

For projects using Angular Material, you can leverage its theming system:

```scss
// theme.scss
@use '@angular/material' as mat;

// Define your custom typography
$custom-typography: mat.define-typography-config(
  $font-family: 'Roboto, sans-serif',
  $headline-1: mat.define-typography-level(96px, 96px, 300),
  $headline-2: mat.define-typography-level(60px, 60px, 300),
  // ... other levels
);

// Define your custom palette
$primary-palette: (
  50: #e3f2fd,
  100: #bbdefb,
  // ... other shades
  500: #2196f3, // Primary color
  // ... other shades
  contrast: (
    50: rgba(black, 0.87),
    // ... other contrasts
    500: white,
    // ... other contrasts
  )
);

// Create the palettes
$app-primary: mat.define-palette($primary-palette);
$app-accent: mat.define-palette(mat.$pink-palette, A200, A100, A400);
$app-warn: mat.define-palette(mat.$red-palette);

// Create the theme
$app-theme: mat.define-light-theme((
  color: (
    primary: $app-primary,
    accent: $app-accent,
    warn: $app-warn,
  ),
  typography: $custom-typography,
  density: 0,
));

// Apply the theme
@include mat.all-component-themes($app-theme);
```

### 3. CSS Variables for Design Tokens

For design tokens extracted from Figma, CSS variables provide a flexible approach:

```scss
// variables.scss
:root {
  // Colors
  --color-primary: #2196f3;
  --color-primary-light: #bbdefb;
  --color-primary-dark: #1976d2;
  --color-secondary: #ff4081;
  --color-secondary-light: #ff80ab;
  --color-secondary-dark: #c51162;
  --color-text: #212121;
  --color-text-secondary: #757575;
  --color-background: #ffffff;
  --color-background-alt: #f5f5f5;
  --color-background-hover: #eeeeee;
  --color-border: #e0e0e0;
  --color-white: #ffffff;
  --color-black: #000000;
  
  // Typography
  --font-family: 'Roboto, sans-serif';
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  
  // Spacing
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  // Border radius
  --border-radius-sm: 2px;
  --border-radius-md: 4px;
  --border-radius-lg: 8px;
  --border-radius-full: 9999px;
  
  // Shadows
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  --shadow-md: 0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10);
  
  // Transitions
  --transition-fast: 0.15s ease;
  --transition-normal: 0.25s ease;

(Content truncated due to size limit. Use line ranges to read in chunks)