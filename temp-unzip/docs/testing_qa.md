# Testing and Quality Assurance

This section covers best practices for testing and quality assurance in the Figma-to-code conversion process, ensuring your implementations are robust, reliable, and match the original designs.

## Testing Strategy

Implement a comprehensive testing strategy that includes:

1. **Unit Testing**: Test individual components in isolation
2. **Integration Testing**: Test how components work together
3. **Visual Regression Testing**: Ensure visual consistency with designs
4. **Accessibility Testing**: Verify WCAG compliance
5. **Cross-Browser Testing**: Ensure compatibility across browsers
6. **Responsive Testing**: Verify behavior across device sizes

## Unit Testing Components

### React Testing with Jest and React Testing Library

```jsx
// Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button component', () => {
  test('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByText('Primary')).toHaveClass('btn-primary');
    
    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText('Secondary')).toHaveClass('btn-secondary');
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });
});
```

### Angular Testing with Jasmine and TestBed

```typescript
// button.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    component.text = 'Click me';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with correct text', () => {
    const buttonElement = fixture.debugElement.nativeElement.querySelector('button');
    expect(buttonElement.textContent).toContain('Click me');
  });

  it('should emit click event when clicked', () => {
    spyOn(component.clicked, 'emit');
    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.triggerEventHandler('click', null);
    expect(component.clicked.emit).toHaveBeenCalled();
  });

  it('should apply correct variant class', () => {
    component.variant = 'primary';
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.nativeElement.querySelector('button');
    expect(buttonElement.classList).toContain('btn-primary');
    
    component.variant = 'secondary';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('btn-secondary');
  });

  it('should be disabled when disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.nativeElement.querySelector('button');
    expect(buttonElement.disabled).toBe(true);
  });
});
```

## Visual Regression Testing

### Using Storybook and Chromatic

1. **Set up Storybook**:

```bash
npx sb init
```

2. **Create stories for your components**:

```jsx
// Button.stories.jsx
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select', options: ['primary', 'secondary', 'outlined'] }
    },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] }
    },
    disabled: { control: 'boolean' }
  }
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Primary Button'
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  children: 'Secondary Button'
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
  children: 'Outlined Button'
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  children: 'Small Button'
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  children: 'Disabled Button'
};
```

3. **Integrate with Chromatic**:

```bash
npx chromatic --project-token=your-project-token
```

### Using Jest Snapshot Testing

```jsx
// Button.test.jsx
import renderer from 'react-test-renderer';
import { Button } from './Button';

describe('Button snapshots', () => {
  test('primary button renders correctly', () => {
    const tree = renderer
      .create(<Button variant="primary">Primary</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('secondary button renders correctly', () => {
    const tree = renderer
      .create(<Button variant="secondary">Secondary</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('outlined button renders correctly', () => {
    const tree = renderer
      .create(<Button variant="outlined">Outlined</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('disabled button renders correctly', () => {
    const tree = renderer
      .create(<Button disabled>Disabled</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
```

## Design Fidelity Testing

### Pixel-Perfect Comparison

Use tools like Percy or Applitools to compare rendered components with Figma designs:

```javascript
// In your test file
import { percySnapshot } from '@percy/playwright';

test('Button matches Figma design', async ({ page }) => {
  await page.goto('http://localhost:6006/iframe.html?id=components-button--primary');
  await percySnapshot(page, 'Primary Button');
});
```

### Design Token Validation

Verify that design tokens match Figma variables:

```javascript
// designTokens.test.js
import { colors, typography, spacing } from '../src/theme/tokens';
import figmaTokens from './fixtures/figma-tokens.json';

describe('Design tokens', () => {
  test('color tokens match Figma colors', () => {
    expect(colors.primary[500]).toBe(figmaTokens.colors.primary[500]);
    expect(colors.secondary[500]).toBe(figmaTokens.colors.secondary[500]);
    // Test other colors
  });

  test('typography tokens match Figma typography', () => {
    expect(typography.fontFamily.sans).toBe(figmaTokens.typography.fontFamily.sans);
    expect(typography.fontSize.base).toBe(figmaTokens.typography.fontSize.base);
    // Test other typography values
  });

  test('spacing tokens match Figma spacing', () => {
    expect(spacing[4]).toBe(figmaTokens.spacing[4]);
    expect(spacing[8]).toBe(figmaTokens.spacing[8]);
    // Test other spacing values
  });
});
```

## Accessibility Testing

### Automated Accessibility Testing

```javascript
// Using jest-axe
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Button accessibility', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(<Button>Accessible Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Manual Accessibility Testing Checklist

Create a checklist for manual accessibility testing:

```javascript
// accessibilityChecklist.js
export const accessibilityChecklist = [
  {
    category: 'Keyboard Navigation',
    items: [
      'Component is focusable with Tab key',
      'Component can be activated with Enter/Space',
      'Focus order is logical',
      'Focus indicator is visible'
    ]
  },
  {
    category: 'Screen Readers',
    items: [
      'Component has appropriate role',
      'Component has accessible name',
      'Component state is announced',
      'Component updates are announced'
    ]
  },
  {
    category: 'Visual',
    items: [
      'Color contrast meets WCAG AA (4.5:1 for normal text)',
      'Information is not conveyed by color alone',
      'Text can be resized up to 200% without loss of content',
      'Component works in high contrast mode'
    ]
  }
];
```

## Cross-Browser Testing

### Using Playwright for Multi-Browser Testing

```javascript
// button.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Button component', () => {
  test('renders correctly across browsers', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-button--primary');
    
    // Check if button is visible
    const button = page.locator('button');
    await expect(button).toBeVisible();
    
    // Check text content
    await expect(button).toHaveText('Primary Button');
    
    // Check styles
    const buttonStyles = await button.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        borderRadius: styles.borderRadius,
        padding: `${styles.paddingTop} ${styles.paddingRight} ${styles.paddingBottom} ${styles.paddingLeft}`
      };
    });
    
    // Verify styles match design
    expect(buttonStyles.backgroundColor).toBe('rgb(124, 58, 237)'); // #7C3AED
    expect(buttonStyles.color).toBe('rgb(255, 255, 255)'); // white
    expect(buttonStyles.borderRadius).toBe('4px');
  });
  
  test('handles click events', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-button--primary');
    
    // Setup click handler
    await page.evaluate(() => {
      window.clicked = false;
      document.querySelector('button').addEventListener('click', () => {
        window.clicked = true;
      });
    });
    
    // Click the button
    await page.locator('button').click();
    
    // Verify click handler was called
    const clicked = await page.evaluate(() => window.clicked);
    expect(clicked).toBe(true);
  });
});
```

## Continuous Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run unit tests
      run: npm test
      
    - name: Run linting
      run: npm run lint
      
    - name: Build Storybook
      run: npm run build-storybook
      
    - name: Visual regression tests
      uses: chromaui/action@v1
      with:
        projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
        token: ${{ secrets.GITHUB_TOKEN }}
        
    - name: Run accessibility tests
      run: npm run test:a11y
      
    - name: Run E2E tests
      run: npm run test:e2e
```

## AI-Assisted Testing

Use GitHub Copilot to help generate tests:

```
// Example prompt for GitHub Copilot
/*
Generate comprehensive unit tests for a Button component with the following props:
- variant: 'primary' | 'secondary' | 'outlined' | 'text'
- size: 'small' | 'medium' | 'large'
- leftIcon?: ReactNode
- rightIcon?: ReactNode
- isLoading?: boolean
- isFullWidth?: boolean
- disabled?: boolean
- onClick?: () => void

Tests should cover:
1. Rendering with different variants and sizes
2. Click event handling
3. Disabled state behavior
4. Loading state rendering
5. Icon placement
*/
```

By implementing these testing and quality assurance practices, you'll ensure your Figma-to-code implementations are robust, reliable, and match the original designs with high fidelity.
