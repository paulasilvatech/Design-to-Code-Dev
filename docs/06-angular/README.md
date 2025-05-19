# 🅰️ Framework Implementation: Angular

This guide provides detailed instructions for implementing Figma designs in Angular, covering component architecture, styling approaches, and performance optimization techniques.

## Table of Contents
- [Component Architecture](#component-architecture)
- [Setting Up an Angular Project](#setting-up-an-angular-project)
- [Styling Approaches](#styling-approaches)
- [Managing State](#managing-state)
- [Converting Figma Components](#converting-figma-components)
- [Performance Optimization](#performance-optimization)
- [Testing Angular Components](#testing-angular-components)
- [Best Practices](#best-practices)

## Component Architecture

Angular applications should be structured using a modular architecture for better maintainability and reusability.

### Module and Component Structure

```
src/
├── app/
│   ├── core/                 // Core functionality, singleton services
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   └── api.service.ts
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   ├── interceptors/
│   │   │   └── http.interceptor.ts
│   │   └── core.module.ts
│   ├── shared/              // Shared components, directives, pipes
│   │   ├── components/
│   │   │   ├── button/
│   │   │   ├── input/
│   │   │   └── modal/
│   │   ├── directives/
│   │   ├── pipes/
│   │   └── shared.module.ts
│   ├── features/            // Feature modules
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   └── dashboard.module.ts
│   │   ├── profile/
│   │   └── settings/
│   ├── theme/               // Global styling
│   │   ├── _variables.scss
│   │   └── _mixins.scss
│   ├── app-routing.module.ts
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.scss
│   └── app.module.ts
```

### Component File Structure

For each component, use a consistent file structure:

```
button/
├── button.component.ts      // Component class
├── button.component.html    // Template
├── button.component.scss    // Styles
├── button.component.spec.ts // Tests
└── index.ts                 // Barrel file (optional)
```

## Setting Up an Angular Project

### Creating a New Angular Project

```bash
# Install Angular CLI globally
npm install -g @angular/cli

# Create a new Angular project
ng new my-design-app --style=scss --routing=true

# Navigate to the project
cd my-design-app
```

### Adding Angular Material

```bash
# Add Angular Material
ng add @angular/material

# Select a theme (e.g., Indigo/Pink)
# Select global typography: Yes
# Select animations: Yes
```

### Setting Up Core and Shared Modules

```bash
# Generate core module
ng generate module core

# Generate shared module
ng generate module shared

# Generate a button component in shared module
ng generate component shared/components/button
```

## Styling Approaches

Angular offers multiple approaches to styling components. Choose one that best fits your project.

### Component-Scoped SCSS

```scss
// button.component.scss
:host {
  display: inline-block;
}

.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.2s ease;
  
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
  
  // Variants
  &--primary {
    background-color: var(--primary-color);
    color: white;
    border: none;
    
    &:hover:not(:disabled) {
      background-color: var(--primary-dark);
    }
  }
  
  &--secondary {
    background-color: var(--secondary-color);
    color: white;
    border: none;
    
    &:hover:not(:disabled) {
      background-color: var(--secondary-dark);
    }
  }
  
  &--outlined {
    background-color: transparent;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    
    &:hover:not(:disabled) {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
  
  // States
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &__content {
    margin: 0 0.5rem;
  }
}
```

### Angular Material Theming

```scss
// src/theme/_variables.scss
@use '@angular/material' as mat;

// Define the theme colors
$primary-palette: (
  50: #e3f2fd,
  100: #bbdefb,
  200: #90caf9,
  300: #64b5f6,
  400: #42a5f5,
  500: #2196f3,  // Primary color
  600: #1e88e5,
  700: #1976d2,
  800: #1565c0,
  900: #0d47a1,
  contrast: (
    50: rgba(0, 0, 0, 0.87),
    100: rgba(0, 0, 0, 0.87),
    200: rgba(0, 0, 0, 0.87),
    300: rgba(0, 0, 0, 0.87),
    400: rgba(0, 0, 0, 0.87),
    500: white,
    600: white,
    700: white,
    800: white,
    900: white,
  )
);

// Create the palettes
$app-primary: mat.define-palette($primary-palette);
$app-accent: mat.define-palette(mat.$pink-palette, A200, A100, A400);
$app-warn: mat.define-palette(mat.$red-palette);

// Create the light theme
$app-light-theme: mat.define-light-theme((
  color: (
    primary: $app-primary,
    accent: $app-accent,
    warn: $app-warn,
  ),
  typography: mat.define-typography-config(),
  density: 0,
));

// Create the dark theme
$app-dark-theme: mat.define-dark-theme((
  color: (
    primary: $app-primary,
    accent: $app-accent,
    warn: $app-warn,
  ),
  typography: mat.define-typography-config(),
  density: 0,
));

// Create mixins to use these themes
@mixin app-color($theme) {
  // Extract color configs
  $color-config: mat.get-color-config($theme);
  $primary-palette: map-get($color-config, primary);
  $accent-palette: map-get($color-config, accent);
  $warn-palette: map-get($color-config, warn);
  
  // Define CSS variables
  :root {
    --primary-color: #{mat.get-color-from-palette($primary-palette, 500)};
    --primary-light: #{mat.get-color-from-palette($primary-palette, 300)};
    --primary-dark: #{mat.get-color-from-palette($primary-palette, 700)};
    
    --accent-color: #{mat.get-color-from-palette($accent-palette, 500)};
    --accent-light: #{mat.get-color-from-palette($accent-palette, 300)};
    --accent-dark: #{mat.get-color-from-palette($accent-palette, 700)};
    
    --warn-color: #{mat.get-color-from-palette($warn-palette, 500)};
  }
}

// Apply the theme to the entire application
@include mat.core();
@include mat.all-component-themes($app-light-theme);
@include app-color($app-light-theme);

// Dark theme class
.dark-theme {
  @include mat.all-component-colors($app-dark-theme);
  @include app-color($app-dark-theme);
}
```

### Using CSS Custom Properties

Add CSS variables to your global styles:

```scss
// src/styles.scss
:root {
  // Colors
  --primary-color: #2196f3;
  --primary-light: #64b5f6;
  --primary-dark: #1976d2;
  --secondary-color: #9c27b0;
  --secondary-light: #ba68c8;
  --secondary-dark: #7b1fa2;
  --text-color: #212121;
  --text-light: #757575;
  --background-color: #ffffff;
  --border-color: #e0e0e0;
  
  // Typography
  --font-family: 'Roboto', sans-serif;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  
  // Spacing
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  // Border radius
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 16px;
  
  // Transitions
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
}

.dark-theme {
  --primary-color: #90caf9;
  --primary-light: #c3fdff;
  --primary-dark: #5d99c6;
  --secondary-color: #ce93d8;
  --secondary-light: #ffc4ff;
  --secondary-dark: #9c64a6;
  --text-color: #ffffff;
  --text-light: #b0b0b0;
  --background-color: #121212;
  --border-color: #333333;
}
```

## Managing State

### Component-Level State

```typescript
// counter.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <div class="counter">
      <button (click)="decrement()">-</button>
      <span>{{ count }}</span>
      <button (click)="increment()">+</button>
    </div>
  `,
  styles: [`
    .counter {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
    }
    
    button {
      padding: var(--spacing-sm);
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: var(--border-radius-sm);
      cursor: pointer;
    }
    
    span {
      font-size: var(--font-size-lg);
      min-width: 40px;
      text-align: center;
    }
  `]
})
export class CounterComponent {
  count = 0;
  
  increment(): void {
    this.count++;
  }
  
  decrement(): void {
    this.count--;
  }
}
```

### Application State with Services

```typescript
// counter.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private countSubject = new BehaviorSubject<number>(0);
  count$: Observable<number> = this.countSubject.asObservable();
  
  increment(): void {
    this.countSubject.next(this.countSubject.value + 1);
  }
  
  decrement(): void {
    this.countSubject.next(this.countSubject.value - 1);
  }
  
  reset(): void {
    this.countSubject.next(0);
  }
}

// counter.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-counter',
  template: `
    <div class="counter">
      <button (click)="decrement()">-</button>
      <span>{{ count$ | async }}</span>
      <button (click)="increment()">+</button>
      <button (click)="reset()">Reset</button>
    </div>
  `,
  styles: [/* styles */]
})
export class CounterComponent implements OnInit {
  count$: Observable<number>;
  
  constructor(private counterService: CounterService) {}
  
  ngOnInit(): void {
    this.count$ = this.counterService.count$;
  }
  
  increment(): void {
    this.counterService.increment();
  }
  
  decrement(): void {
    this.counterService.decrement();
  }
  
  reset(): void {
    this.counterService.reset();
  }
}
```

### Application State with NgRx

```bash
# Install NgRx
npm install @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools
```

```typescript
// counter.actions.ts
import { createAction } from '@ngrx/store';

export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');

// counter.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as CounterActions from './counter.actions';

export interface CounterState {
  count: number;
}

export const initialState: CounterState = {
  count: 0
};

export const counterReducer = createReducer(
  initialState,
  on(CounterActions.increment, state => ({ ...state, count: state.count + 1 })),
  on(CounterActions.decrement, state => ({ ...state, count: state.count - 1 })),
  on(CounterActions.reset, state => ({ ...state, count: 0 }))
);

// counter.component.ts
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from './counter.actions';

@Component({
  selector: 'app-counter',
  template: `
    <div class="counter">
      <button (click)="decrement()">-</button>
      <span>{{ count$ | async }}</span>
      <button (click)="increment()">+</button>
      <button (click)="reset()">Reset</button>
    </div>
  `,
  styles: [/* styles */]
})
export class CounterComponent {
  count$: Observable<number>;
  
  constructor(private store: Store<{ counter: { count: number } }>) {
    this.count$ = this.store.select(state => state.counter.count);
  }
  
  increment(): void {
    this.store.dispatch(increment());
  }
  
  decrement(): void {
    this.store.dispatch(decrement());
  }
  
  reset(): void {
    this.store.dispatch(reset());
  }
}
```

## Converting Figma Components

### Basic Process

1. **Analyze the Figma component**:
   - Identify inputs/outputs
   - Note styling details
   - Understand responsive behavior
   - Check interactive states

2. **Create the Component Structure**:
   - Generate the component files
   - Define inputs and outputs
   - Set up component class
   - Create HTML template

3. **Implement Styling**:
   - Create SCSS based on Figma design
   - Implement responsive behavior
   - Add animations if needed

4. **Add Interaction Logic**:
   - Implement event handlers
   - Add state management
   - Connect to services if required

### Example: Button Component

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

### Example: Card Component

```typescript
// card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() variant: 'default' | 'elevated' | 'outlined' = 'default';
  @Input() padding: 'normal' | 'compact' | 'none' = 'normal';
  @Input() title: string;
  @Input() subtitle: string;
  @Input() showFooter = false;
  
  @Output() cardClick = new EventEmitter<void>();
  
  handleClick(): void {
    this.cardClick.emit();
  }
}
```

```html
<!-- card.component.html -->
<div 
  class="app-card"
  [ngClass]="[
    'app-card--' + variant,
    'app-card--padding-' + padding
  ]"
  (click)="handleClick()"
>
  <div class="app-card__header" *ngIf="title || subtitle">
    <h3 class="app-card__title" *ngIf="title">{{ title }}</h3>
    <p class="app-card__subtitle" *ngIf="subtitle">{{ subtitle }}</p>
  </div>
  
  <div class="app-card__content">
    <ng-content></ng-content>
  </div>
  
  <div class="app-card__footer" *ngIf="showFooter">
    <ng-content select="[card-footer]"></ng-content>
  </div>
</div>
```

```scss
// card.component.scss
.app-card {
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;
  
  // Variants
  &--default {
    background-color: white;
    border: 1px solid var(--border-color);
  }
  
  &--elevated {
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  &--outlined {
    background-color: white;
    border: 2px solid var(--primary-color);
  }
  
  // Padding
  &--padding-normal {
    padding: 24px;
  }
  
  &--padding-compact {
    padding: 16px;
  }
  
  &--padding-none {
    padding: 0;
  }
  
  // Structure
  &__header {
    margin-bottom: 16px;
  }
  
  &__title {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 4px 0;
  }
  
  &__subtitle {
    font-size: 14px;
    color: var(--text-light);
    margin: 0;
  }
  
  &__footer {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--border-color);
  }
}
```

## Performance Optimization

### OnPush Change Detection

```typescript
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

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

### Lazy Loading Modules

```typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### Using trackBy with ngFor

```html
<div *ngFor="let item of items; trackBy: trackByFn">
  {{ item.name }}
</div>
```

```typescript
trackByFn(index: number, item: any): any {
  return item.id; // Unique identifier
}
```

### Minimizing Subscriptions with async pipe

```html
<div *ngIf="userData$ | async as userData">
  <h2>{{ userData.name }}</h2>
  <p>{{ userData.email }}</p>
</div>
```

### Virtual Scrolling with CDK

```typescript
// app.module.ts or feature module
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    // other imports
    ScrollingModule
  ]
})
export class AppModule { }
```

```html
<cdk-virtual-scroll-viewport itemSize="50" class="viewport">
  <div *cdkVirtualFor="let item of items" class="item">
    {{ item.name }}
  </div>
</cdk-virtual-scroll-viewport>
```

```scss
.viewport {
  height: 500px;
  width: 100%;
  border: 1px solid black;
}

.item {
  height: 50px;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
}
```

## Testing Angular Components

### Unit Testing with Jasmine and Karma

```typescript
// button.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ],
      imports: [ MatIconModule, MatProgressSpinnerModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should emit clicked event when clicked and not disabled', () => {
    // Arrange
    spyOn(component.clicked, 'emit');
    component.disabled = false;
    
    // Act
    component.handleClick();
    
    // Assert
    expect(component.clicked.emit).toHaveBeenCalled();
  });
  
  it('should not emit clicked event when disabled', () => {
    // Arrange
    spyOn(component.clicked, 'emit');
    component.disabled = true;
    
    // Act
    component.handleClick();
    
    // Assert
    expect(component.clicked.emit).not.toHaveBeenCalled();
  });
  
  it('should not emit clicked event when loading', () => {
    // Arrange
    spyOn(component.clicked, 'emit');
    component.loading = true;
    
    // Act
    component.handleClick();
    
    // Assert
    expect(component.clicked.emit).not.toHaveBeenCalled();
  });
  
  it('should apply primary variant class when variant is primary', () => {
    // Arrange
    component.variant = 'primary';
    fixture.detectChanges();
    
    // Assert
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.classList).toContain('app-button--primary');
  });
});
```

## Best Practices

### Component Design Principles

1. **Smart and Presentation Components**:
   - Smart components: Handle data fetching and business logic
   - Presentation components: Focus on UI rendering

2. **Single Responsibility**:
   - Each component should do one thing well
   - Break complex components into smaller ones

3. **Consistent Input/Output API**:
   - Use consistent naming for inputs and outputs
   - Design intuitive component interfaces

4. **Self-contained Components**:
   - Encapsulate styles within components
   - Avoid style leakage with ViewEncapsulation

5. **Reusability**:
   - Design components for reuse
   - Use content projection with `<ng-content>` for flexibility

### Accessibility

1. **Use Semantic HTML**:
   - Choose appropriate HTML elements
   - Structure content with proper heading levels

2. **Add ARIA Attributes**:
   - Use `aria-*` attributes for non-standard controls
   - Set `aria-label` for buttons without visible text

3. **Keyboard Navigation**:
   - Ensure components are keyboard accessible
   - Add keyboard shortcuts for frequent actions

4. **Focus Management**:
   - Manage focus properly, especially in dialogs
   - Use `cdkFocusInitial` and `cdkTrapFocus`

5. **Color and Contrast**:
   - Ensure sufficient color contrast
   - Don't rely on color alone to convey information

### Performance Tips

1. **Use OnPush Change Detection**:
   - Implement `ChangeDetectionStrategy.OnPush` for most components
   - Update parent components when child components change

2. **Unsubscribe from Observables**:
   - Use `takeUntil`, `take(1)`, or `async` pipe
   - Create a destroy subject in components

3. **Lazy Load Modules**:
   - Load feature modules only when needed
   - Use preloading strategies for better UX

4. **Optimize for Mobile**:
   - Reduce bundle size
   - Use server-side rendering for initial load
   - Implement code splitting

5. **Limit DOM Manipulation**:
   - Use Angular's binding mechanisms
   - Avoid manual DOM manipulation

## 💡 Try It Yourself

1. Create a Card component based on a Figma design
2. Implement three variants: default, elevated, and outlined
3. Use content projection for the card content
4. Add a header with title and subtitle
5. Add a footer section with actions
6. Include proper accessibility attributes
7. Implement OnPush change detection for better performance

## 🔜 Next Steps

Now that you've learned how to implement components in both React and Angular, let's explore how to create a consistent component library. Continue to the [Component Library Implementation](../07-component-library/README.md) guide. 