# 🧪 Workshop Guides: Hands-on Practice

This guide provides practical workshop exercises to apply the design-to-code concepts you've learned throughout this playbook.

## Table of Contents
- [Workshop Overview](#workshop-overview)
- [Workshop 1: Basic Button Component](#workshop-1-basic-button-component)
- [Workshop 2: Responsive Card Component](#workshop-2-responsive-card-component)
- [Workshop 3: Interactive Modal Component](#workshop-3-interactive-modal-component)
- [Workshop 4: Complete Design System Creation](#workshop-4-complete-design-system-creation)
- [Workshop 5: CI/CD Pipeline Setup](#workshop-5-cicd-pipeline-setup)

## Workshop Overview

These workshops are designed to be completed in sequence, with each workshop building upon the skills and components developed in previous exercises. Each workshop includes:

1. **Objectives**: What you'll learn and create
2. **Prerequisites**: Required tools and knowledge
3. **Step-by-step instructions**: Detailed guidance for completion
4. **Challenge tasks**: Optional extensions to test your skills
5. **Solution reference**: Example implementation to check your work

## Workshop 1: Basic Button Component

**Duration**: 1-2 hours

### Objectives
- Create a reusable Button component from a Figma design
- Implement multiple variants and states
- Set up proper TypeScript typing
- Add unit tests

### Prerequisites
- Node.js and npm installed
- VS Code with GitHub Copilot extension
- Basic knowledge of React/Angular

### Instructions

#### Step 1: Set up the Project

```bash
# For React
npx create-react-app button-workshop --template typescript
cd button-workshop

# For Angular
ng new button-workshop --style=scss
cd button-workshop
```

#### Step 2: Study the Button Design

Review the following design specifications:

```
Button Specifications:
- Variants: Primary, Secondary, Outlined
- Sizes: Small (8px 16px), Medium (12px 24px), Large (16px 32px)
- States: Default, Hover, Active, Disabled, Loading
- Colors:
  - Primary: #3B82F6 (hover: #2563EB)
  - Secondary: #9CA3AF (hover: #6B7280)
  - Text: white for Primary/Secondary, #3B82F6 for Outlined
- Typography: 14px medium for Small, 16px medium for Medium, 18px medium for Large
- Border radius: 4px
- Transitions: 0.2s ease-in-out for all state changes
```

#### Step 3: Create the Component

1. Create a Button component folder structure:

```
src/components/Button/
├── Button.tsx (or .ts for Angular)
├── Button.styles.ts (or .scss)
├── Button.test.tsx
└── index.ts
```

2. Use GitHub Copilot to help implement the component:

```jsx
// For React: Button.tsx prompt
/**
 * Create a Button component with the following features:
 * - Variants: Primary, Secondary, Outlined
 * - Sizes: Small, Medium, Large
 * - States: Default, Hover, Active, Disabled, Loading
 * - Props:
 *   - variant: 'primary' | 'secondary' | 'outlined'
 *   - size: 'small' | 'medium' | 'large'
 *   - disabled: boolean
 *   - loading: boolean
 *   - leftIcon?: React.ReactNode
 *   - rightIcon?: React.ReactNode
 *   - onClick: () => void
 *   - children: React.ReactNode
 * - Styling based on the provided specifications
 */
```

3. Implement the styling:

```jsx
// For React with styled-components
import styled, { css } from 'styled-components';

type ButtonStyledProps = {
  variant: 'primary' | 'secondary' | 'outlined';
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
};

export const ButtonStyled = styled.button<ButtonStyledProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  cursor: ${props => (props.disabled || props.loading ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  
  /* Add size styles based on the size prop */
  ${props => {
    switch (props.size) {
      case 'small':
        return css`
          padding: 8px 16px;
          font-size: 14px;
        `;
      case 'large':
        return css`
          padding: 16px 32px;
          font-size: 18px;
        `;
      default:
        return css`
          padding: 12px 24px;
          font-size: 16px;
        `;
    }
  }}
  
  /* Add variant styles based on the variant prop */
  ${props => {
    switch (props.variant) {
      case 'primary':
        return css`
          background-color: #3B82F6;
          color: white;
          border: none;
          
          &:hover:not(:disabled) {
            background-color: #2563EB;
          }
          
          &:active:not(:disabled) {
            background-color: #1D4ED8;
          }
        `;
      case 'secondary':
        return css`
          background-color: #9CA3AF;
          color: white;
          border: none;
          
          &:hover:not(:disabled) {
            background-color: #6B7280;
          }
          
          &:active:not(:disabled) {
            background-color: #4B5563;
          }
        `;
      case 'outlined':
        return css`
          background-color: transparent;
          color: #3B82F6;
          border: 1px solid #3B82F6;
          
          &:hover:not(:disabled) {
            background-color: rgba(59, 130, 246, 0.05);
          }
          
          &:active:not(:disabled) {
            background-color: rgba(59, 130, 246, 0.1);
          }
        `;
      default:
        return '';
    }
  }}
`;

export const IconContainer = styled.span`
  display: inline-flex;
  align-items: center;
  
  &:first-child {
    margin-right: 8px;
  }
  
  &:last-child {
    margin-left: 8px;
  }
`;
```

#### Step 4: Write Unit Tests

```jsx
// Button.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button component', () => {
  test('renders correctly', () => {
    render(<Button onClick={() => {}}>Click me</Button>);
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
    render(<Button onClick={handleClick} disabled>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

#### Step 5: Document the Component

Create a documentation file for the Button component:

```markdown
# Button Component

A reusable button component with multiple variants and states.

## Usage

```jsx
import { Button } from './components/Button';

function App() {
  return (
    <div>
      <Button variant="primary" onClick={() => alert('Clicked!')}>
        Primary Button
      </Button>
      
      <Button 
        variant="secondary" 
        size="small"
        leftIcon={<Icon name="star" />}
        onClick={() => console.log('Clicked!')}
      >
        With Icon
      </Button>
      
      <Button variant="outlined" disabled>
        Disabled Button
      </Button>
      
      <Button variant="primary" loading>
        Loading...
      </Button>
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'outlined' | 'primary' | The style variant of the button |
| size | 'small' \| 'medium' \| 'large' | 'medium' | The size of the button |
| disabled | boolean | false | Whether the button is disabled |
| loading | boolean | false | Whether to show a loading indicator |
| leftIcon | React.ReactNode | undefined | Icon element to show on the left |
| rightIcon | React.ReactNode | undefined | Icon element to show on the right |
| onClick | () => void | required | Function called when the button is clicked |
| children | React.ReactNode | required | The content of the button |
```

### Challenge Tasks

1. Add a `fullWidth` prop to make the button take 100% of the container width
2. Implement a `link` variant that looks like a text link but behaves like a button
3. Add keyboard accessibility for the button (focus states, etc.)
4. Create a Storybook story to showcase all variants and states

## Workshop 2: Responsive Card Component

**Duration**: 2-3 hours

### Objectives
- Create a responsive Card component with various content sections
- Implement different card variants
- Make the card adapt to different screen sizes
- Add interactive elements within the card

### Instructions

#### Step 1: Study the Card Design

```
Card Specifications:
- Variants: Default, Elevated, Outlined
- Sections: Header (optional), Body, Footer (optional)
- Properties:
  - title: string
  - subtitle: string (optional)
  - image: url (optional)
  - actions: array of action items
- Responsive behavior:
  - Desktop: 3 cards per row
  - Tablet: 2 cards per row
  - Mobile: 1 card per row
- Colors:
  - Background: white
  - Border: #E5E7EB (for default and outlined)
  - Shadow: 0 4px 6px rgba(0, 0, 0, 0.1) (for elevated)
  - Border radius: 8px
```

#### Step 2: Create the Component Structure

```tsx
// Card.tsx
interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined';
  title?: string;
  subtitle?: string;
  image?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}
```

#### Step 3: Implement Responsive Behavior

Use media queries or a responsive framework like Grid/Flexbox to handle different screen sizes.

#### Step 4: Add Interactive Elements

Implement hover states, click actions, and focus management.

### Challenge Tasks

1. Add a card expansion/collapse feature
2. Implement a skeleton loading state
3. Add an image gallery option with multiple images
4. Create a grid layout component to handle the responsive card arrangement

## Workshop 3: Interactive Modal Component

**Duration**: 2-3 hours

### Objectives
- Create a reusable Modal component with animations
- Implement backdrop and focus management
- Handle keyboard interactions (Escape to close)
- Create different modal sizes and variants

### Instructions

#### Step 1: Study the Modal Design

```
Modal Specifications:
- Sizes: Small (400px), Medium (600px), Large (800px)
- Sections: Header, Body, Footer
- Backdrop: Semi-transparent black overlay
- Animations:
  - Open: Fade in and scale up from 95% to 100%
  - Close: Fade out and scale down
- Accessibility:
  - Focus trap inside modal when open
  - Close on Escape key
  - Return focus to trigger element when closed
```

#### Step 2: Create the Component Structure

Implement the modal with proper accessibility attributes.

#### Step 3: Add Animations

Use CSS transitions or a library like Framer Motion.

#### Step 4: Implement Focus Management

Use techniques to trap focus within the modal.

### Challenge Tasks

1. Add different animation options
2. Create a confirm dialog variant with Yes/No buttons
3. Implement a stacked modal system for nested modals
4. Add draggable behavior to the modal

## Workshop 4: Complete Design System Creation

**Duration**: 4-6 hours

### Objectives
- Create a cohesive design system with multiple components
- Implement a theming system with light and dark modes
- Set up a Storybook documentation site
- Create a publishable package

### Instructions

#### Step 1: Define Design Tokens

Create color, typography, spacing, and other design tokens.

#### Step 2: Build Core Components

Implement 5-7 core components using your design tokens.

#### Step 3: Set Up a Theme Provider

Create a theme provider with light and dark mode support.

#### Step 4: Document with Storybook

Set up Storybook and document all components.

### Challenge Tasks

1. Add a custom theme builder tool
2. Implement responsive behavior for all components
3. Create a component playground demo site
4. Set up visual regression testing

## Workshop 5: CI/CD Pipeline Setup

**Duration**: 3-4 hours

### Objectives
- Set up GitHub Actions workflows for your design system
- Implement automated testing and linting
- Create a build pipeline for Storybook
- Set up versioning and package publishing

### Instructions

#### Step 1: Create Basic GitHub Workflows

Set up CI workflows for testing and linting.

#### Step 2: Implement Storybook Build

Create a workflow to build Storybook for testing and review.

#### Step 3: Set Up Visual Testing

Implement visual regression testing using Chromatic.

#### Step 4: Configure Package Publishing

Set up automated npm package publishing.

### Challenge Tasks

1. Add code quality reporting
2. Implement automatic version bumping
3. Set up deployment previews for pull requests
4. Create a custom GitHub Action for design token updates

## Next Steps

Now that you've gained practical experience with designing and implementing UI components, let's explore best practices and optimization techniques. Continue to the [Best Practices and Optimization Techniques](../11-best-practices/README.md) guide. 