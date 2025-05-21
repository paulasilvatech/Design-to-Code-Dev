# Angular Implementation

This section covers how to implement Figma designs in Angular using AI-assisted development tools. We'll focus on component architecture, styling approaches, and best practices for Angular projects.

## Angular Component Architecture

Organize Angular components following a modular structure:

```
src/
├── app/
│   ├── core/
│   │   ├── services/
│   │   ├── models/
│   │   └── guards/
│   ├── shared/
│   │   ├── components/
│   │   │   ├── button/
│   │   │   ├── input/
│   │   │   └── card/
│   │   ├── directives/
│   │   └── pipes/
│   ├── features/
│   │   ├── dashboard/
│   │   ├── profile/
│   │   └── settings/
│   └── layout/
│       ├── header/
│       ├── sidebar/
│       └── footer/
└── assets/
    ├── styles/
    │   ├── _variables.scss
    │   └── _mixins.scss
    └── images/
```

## Styling Approaches for Angular

### 1. SCSS with Angular Material

```scss
// styles/_variables.scss
$primary: #7C3AED;
$primary-light: #A78BFA;
$primary-dark: #6D28D9;
$secondary: #10B981;
$gray-100: #F3F4F6;
$gray-500: #6B7280;
$gray-900: #111827;

// component styles
@import '~@angular/material/theming';

.custom-button {
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: 500;
  
  &.primary {
    background-color: $primary;
    color: white;
    
    &:hover {
      background-color: $primary-dark;
    }
  }
  
  &.secondary {
    background-color: transparent;
    color: $primary;
    border: 1px solid $primary;
    
    &:hover {
      background-color: $gray-100;
    }
  }
  
  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

### 2. Angular Material Theming

```typescript
// theme.scss
@import '~@angular/material/theming';
@include mat-core();

// Define custom Figma palette
$figma-primary: (
  50: #F5F3FF,
  100: #EDE9FE,
  200: #DDD6FE,
  300: #C4B5FD,
  400: #A78BFA,
  500: #8B5CF6,
  600: #7C3AED,
  700: #6D28D9,
  800: #5B21B6,
  900: #4C1D95,
  contrast: (
    50: $dark-primary-text,
    100: $dark-primary-text,
    200: $dark-primary-text,
    300: $dark-primary-text,
    400: $dark-primary-text,
    500: $light-primary-text,
    600: $light-primary-text,
    700: $light-primary-text,
    800: $light-primary-text,
    900: $light-primary-text,
  )
);

// Define theme
$primary: mat-palette($figma-primary);
$accent: mat-palette($mat-teal, 500, 300, 700);
$warn: mat-palette($mat-red);

$theme: mat-light-theme($primary, $accent, $warn);

@include angular-material-theme($theme);
```

## Using GitHub Copilot for Angular Components

### Example: Converting a Card Component

1. Analyze the Figma design
2. Prompt GitHub Copilot with:

```
Create an Angular Card component based on the Figma design with:
- Image at the top
- Title and subtitle
- Description text
- Action buttons at the bottom
- Support for different sizes (small, medium, large)
- Optional badge in the corner
- Hover and focus states
```

3. Review and refine the generated code

## Component Implementation

```typescript
// card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title: string;
  @Input() subtitle?: string;
  @Input() description: string;
  @Input() imageUrl?: string;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() badge?: string;
  @Input() actions: {label: string, type: 'primary' | 'secondary'}[] = [];
  
  @Output() actionClick = new EventEmitter<number>();
  
  onActionClick(index: number): void {
    this.actionClick.emit(index);
  }
}
```

```html
<!-- card.component.html -->
<div class="card" [ngClass]="size">
  <div class="card-badge" *ngIf="badge">{{ badge }}</div>
  
  <img *ngIf="imageUrl" [src]="imageUrl" alt="Card image" class="card-image">
  
  <div class="card-content">
    <h3 class="card-title">{{ title }}</h3>
    <h4 class="card-subtitle" *ngIf="subtitle">{{ subtitle }}</h4>
    <p class="card-description">{{ description }}</p>
  </div>
  
  <div class="card-actions" *ngIf="actions.length > 0">
    <button 
      *ngFor="let action of actions; let i = index" 
      class="btn" 
      [ngClass]="action.type"
      (click)="onActionClick(i)">
      {{ action.label }}
    </button>
  </div>
</div>
```

```scss
// card.component.scss
@import 'src/assets/styles/variables';

.card {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  background-color: white;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  &.small {
    max-width: 240px;
  }
  
  &.medium {
    max-width: 320px;
  }
  
  &.large {
    max-width: 400px;
  }
}

.card-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 8px;
  background-color: $primary;
  color: white;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.card-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.card-content {
  padding: 16px;
  flex-grow: 1;
}

.card-title {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
  color: $gray-900;
}

.card-subtitle {
  margin: 0 0 12px;
  font-size: 14px;
  font-weight: 400;
  color: $gray-500;
}

.card-description {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: $gray-700;
}

.card-actions {
  display: flex;
  padding: 16px;
  gap: 8px;
  border-top: 1px solid $gray-100;
}
```

## Angular Material Integration

For more complex components, integrate with Angular Material:

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { CardComponent } from './shared/components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Component Testing

Set up testing for your Angular components:

```typescript
// card.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.title = 'Test Card';
    component.description = 'This is a test description';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title and description', () => {
    const titleEl = fixture.debugElement.query(By.css('.card-title'));
    const descEl = fixture.debugElement.query(By.css('.card-description'));
    
    expect(titleEl.nativeElement.textContent).toContain('Test Card');
    expect(descEl.nativeElement.textContent).toContain('This is a test description');
  });

  it('should apply correct size class', () => {
    component.size = 'large';
    fixture.detectChanges();
    
    const cardEl = fixture.debugElement.query(By.css('.card'));
    expect(cardEl.nativeElement.classList).toContain('large');
  });

  it('should emit action click event', () => {
    spyOn(component.actionClick, 'emit');
    component.actions = [{ label: 'Click me', type: 'primary' }];
    fixture.detectChanges();
    
    const buttonEl = fixture.debugElement.query(By.css('.btn'));
    buttonEl.triggerEventHandler('click', null);
    
    expect(component.actionClick.emit).toHaveBeenCalledWith(0);
  });
});
```

By following these Angular implementation guidelines, you'll be able to efficiently convert your Figma designs into high-quality, maintainable Angular components.
