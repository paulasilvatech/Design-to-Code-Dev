# ✅ Testing and Quality Assurance

This guide provides detailed instructions for implementing comprehensive testing and quality assurance processes for your design-to-code workflow.

## Table of Contents
- [Testing Fundamentals](#testing-fundamentals)
- [Unit Testing Components](#unit-testing-components)
- [Visual Regression Testing](#visual-regression-testing)
- [Accessibility Testing](#accessibility-testing)
- [End-to-End Testing](#end-to-end-testing)
- [Performance Testing](#performance-testing)
- [Continuous Integration](#continuous-integration)
- [Best Practices](#best-practices)

## Testing Fundamentals

Testing is a crucial part of the design-to-code workflow that ensures your components behave as expected, look as designed, and remain accessible to all users.

### Types of Tests

1. **Unit Tests**: Verify individual components work as expected
2. **Integration Tests**: Ensure components work together correctly
3. **Visual Regression Tests**: Detect unexpected visual changes
4. **Accessibility Tests**: Validate WCAG compliance
5. **End-to-End Tests**: Test the entire application flow
6. **Performance Tests**: Measure and optimize performance

### Testing Pyramid

The testing pyramid suggests emphasizing lower-level tests (unit tests) and having fewer higher-level tests (end-to-end tests):

```
    /\
   /  \
  /E2E \
 /------\
/        \
/ Integration \
/-------------\
/    Unit Tests \
/-----------------\
```

- **Unit Tests**: Fast, focused, and numerous
- **Integration Tests**: Test component interactions, fewer than unit tests
- **End-to-End Tests**: Comprehensive but slow and brittle, use sparingly

## Unit Testing Components

Unit tests verify that individual components work as expected in isolation.

### Testing React Components

#### Setting Up Jest and React Testing Library

```bash
# For Create React App projects
# These are included by default

# For other projects
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Configure Jest in your `package.json`:

```json
{
  "jest": {
    "testEnvironment": "jsdom",
    "setupFilesAfterEnv": [
      "@testing-library/jest-dom/extend-expect"
    ],
    "moduleNameMapper": {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js"
    }
  }
}
```

#### Testing a React Button Component

```jsx
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
  
  test('applies the correct class for primary variant', () => {
    render(<Button variant="primary">Primary Button</Button>);
    const button = screen.getByText('Primary Button');
    expect(button).toHaveClass('button--primary');
  });
  
  test('applies the correct class for secondary variant', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByText('Secondary Button');
    expect(button).toHaveClass('button--secondary');
  });
});
```

#### Testing with Providers

If your components use context or other providers:

```jsx
// test-utils.js
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../components/ThemeProvider';

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
```

Then use this in your tests:

```jsx
import { render, screen } from './test-utils';
import { ThemedButton } from './ThemedButton';

test('uses themed styles', () => {
  render(<ThemedButton>Themed Button</ThemedButton>);
  // assertions...
});
```

### Testing Angular Components

#### Setting Up Jasmine and Karma

```bash
# For Angular CLI projects
# These are included by default

# If needed, add specific packages
npm install --save-dev @types/jasmine jasmine-core karma karma-jasmine karma-chrome-launcher
```

#### Testing an Angular Button Component

```typescript
// button.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ButtonComponent } from './button.component';
import { MatIconModule } from '@angular/material/icon';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ],
      imports: [ MatIconModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should emit clicked event when clicked', () => {
    spyOn(component.clicked, 'emit');
    
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    
    expect(component.clicked.emit).toHaveBeenCalled();
  });
  
  it('should not emit clicked event when disabled', () => {
    component.disabled = true;
    spyOn(component.clicked, 'emit');
    fixture.detectChanges();
    
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    
    expect(component.clicked.emit).not.toHaveBeenCalled();
  });
  
  it('should have correct classes for primary variant', () => {
    component.variant = 'primary';
    fixture.detectChanges();
    
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList).toContain('app-button--primary');
  });
  
  it('should have correct classes for secondary variant', () => {
    component.variant = 'secondary';
    fixture.detectChanges();
    
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList).toContain('app-button--secondary');
  });
});
```

#### Testing with Host Components

For testing complex components with inputs and outputs:

```typescript
@Component({
  template: `
    <app-button
      [variant]="variant"
      [disabled]="disabled"
      (clicked)="handleClick()"
    >
      Test Button
    </app-button>
  `
})
class TestHostComponent {
  variant = 'primary';
  disabled = false;
  clickCount = 0;
  
  handleClick() {
    this.clickCount++;
  }
}

describe('ButtonComponent with host', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent, TestHostComponent ],
      imports: [ MatIconModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should increment click count when clicked', () => {
    const button = hostFixture.nativeElement.querySelector('button');
    button.click();
    expect(hostComponent.clickCount).toBe(1);
  });
  
  it('should not increment click count when disabled', () => {
    hostComponent.disabled = true;
    hostFixture.detectChanges();
    
    const button = hostFixture.nativeElement.querySelector('button');
    button.click();
    expect(hostComponent.clickCount).toBe(0);
  });
});
```

## Visual Regression Testing

Visual regression tests compare screenshots of your components to detect unexpected visual changes.

### Using Storybook and Chromatic

[Chromatic](https://www.chromatic.com/) is a visual testing tool that integrates with Storybook:

```bash
# Install Chromatic
npm install --save-dev chromatic

# Run Chromatic (replace with your project token)
npx chromatic --project-token=your-project-token
```

#### Setting Up Chromatic with GitHub Actions

```yaml
# .github/workflows/chromatic.yml
name: 'Chromatic'

on: push

jobs:
  chromatic-deployment:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0  # Required to retrieve git history
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm ci
      - name: Publish to Chromatic
        uses: chromaui/action@v1
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          buildScriptName: build-storybook
```

### Using Jest and Puppeteer

For custom visual testing:

```bash
npm install --save-dev jest-image-snapshot puppeteer
```

```javascript
// visual-regression.test.js
const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });

describe('Visual regression tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:6006/iframe.html?id=components-button--primary');
    await page.setViewport({ width: 1200, height: 800 });
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Primary button matches snapshot', async () => {
    const button = await page.$('.button--primary');
    const image = await button.screenshot();
    expect(image).toMatchImageSnapshot();
  });

  test('Secondary button matches snapshot', async () => {
    await page.goto('http://localhost:6006/iframe.html?id=components-button--secondary');
    const button = await page.$('.button--secondary');
    const image = await button.screenshot();
    expect(image).toMatchImageSnapshot();
  });
});
```

## Accessibility Testing

Accessibility testing ensures your components are usable by everyone, including people with disabilities.

### Using Jest-Axe for Automated Testing

```bash
npm install --save-dev jest-axe
```

#### React Example

```jsx
// accessibility.test.jsx
import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Accessibility tests', () => {
  test('Button has no accessibility violations', async () => {
    const { container } = render(<Button>Accessible Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  test('Disabled button has no accessibility violations', async () => {
    const { container } = render(<Button disabled>Disabled Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

#### Angular Example

```typescript
// accessibility.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ButtonComponent } from './button.component';

expect.extend(toHaveNoViolations);

describe('Accessibility tests', () => {
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonComponent);
    fixture.detectChanges();
  });

  it('Button should have no accessibility violations', async () => {
    const results = await axe(fixture.nativeElement);
    expect(results).toHaveNoViolations();
  });
});
```

### Using Storybook Accessibility Addon

```bash
npm install --save-dev @storybook/addon-a11y
```

Add to `.storybook/main.js`:

```javascript
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y' // Add this line
  ],
};
```

Now you'll see accessibility tests in the Storybook UI.

### Manual Accessibility Testing

While automated tests are helpful, manual testing is essential:

1. **Keyboard Navigation**:
   - Tab through all interactive elements
   - Use Space/Enter to activate controls
   - Check focus indicators are visible

2. **Screen Reader Testing**:
   - Test with VoiceOver (macOS), NVDA (Windows), or JAWS (Windows)
   - Verify all content is announced correctly
   - Check ARIA attributes function as expected

3. **High Contrast Mode**:
   - Test components in Windows High Contrast Mode
   - Ensure all elements remain visible and functional

## End-to-End Testing

End-to-end tests verify the entire application works correctly from a user's perspective.

### Using Cypress

```bash
npm install --save-dev cypress
```

Add scripts to `package.json`:

```json
{
  "scripts": {
    "cypress:open": "cypress open",
    "cypress:run": "cypress run"
  }
}
```

Initialize Cypress:

```bash
npx cypress open
```

#### Writing Cypress Tests

```javascript
// cypress/integration/button.spec.js
describe('Button Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should click the primary button', () => {
    cy.get('[data-testid="primary-button"]')
      .should('exist')
      .should('have.text', 'Click me')
      .click();
    
    cy.get('[data-testid="click-result"]')
      .should('exist')
      .should('have.text', 'Button clicked!');
  });

  it('should not trigger action when disabled button is clicked', () => {
    cy.get('[data-testid="disabled-button"]')
      .should('exist')
      .should('be.disabled')
      .should('have.text', 'Cannot click')
      .click({ force: true });
    
    cy.get('[data-testid="click-result"]')
      .should('not.exist');
  });
});
```

### Using Playwright

```bash
npm install --save-dev @playwright/test
```

Initialize Playwright:

```bash
npx playwright install
```

Add configuration in `playwright.config.ts`:

```typescript
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30 * 1000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
};

export default config;
```

#### Writing Playwright Tests

```typescript
// tests/button.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Button Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should click the primary button', async ({ page }) => {
    const button = page.locator('[data-testid="primary-button"]');
    
    await expect(button).toBeVisible();
    await expect(button).toHaveText('Click me');
    
    await button.click();
    
    const result = page.locator('[data-testid="click-result"]');
    await expect(result).toBeVisible();
    await expect(result).toHaveText('Button clicked!');
  });

  test('should not trigger action when disabled button is clicked', async ({ page }) => {
    const button = page.locator('[data-testid="disabled-button"]');
    
    await expect(button).toBeVisible();
    await expect(button).toBeDisabled();
    await expect(button).toHaveText('Cannot click');
    
    // Try to click anyway
    await button.click({ force: true });
    
    const result = page.locator('[data-testid="click-result"]');
    await expect(result).not.toBeVisible();
  });
});
```

## Performance Testing

Performance testing ensures your components and application are fast and responsive.

### Using Lighthouse for Page Performance

```bash
npm install --save-dev lighthouse
```

Create a script to run Lighthouse:

```javascript
// scripts/lighthouse.js
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runLighthouse() {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance', 'accessibility', 'best-practices'],
    port: chrome.port
  };
  
  const runnerResult = await lighthouse('http://localhost:3000', options);
  
  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;
  require('fs').writeFileSync('lighthouse-report.html', reportHtml);
  
  // `.lhr` is the Lighthouse Result as a JS object
  console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);
  
  await chrome.kill();
}

runLighthouse();
```

### Using React Profiler

For React applications, use the built-in Profiler:

```jsx
import React, { Profiler } from 'react';

const onRenderCallback = (
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // the Set of interactions belonging to this update
) => {
  console.log(`${id} rendered in ${actualDuration}ms`);
};

function MyComponent() {
  return (
    <Profiler id="MyComponent" onRender={onRenderCallback}>
      {/* Your component content */}
    </Profiler>
  );
}
```

### Measuring Bundle Size

Use tools like `webpack-bundle-analyzer` to analyze your bundle size:

```bash
npm install --save-dev webpack-bundle-analyzer
```

For Create React App:

```bash
npm run build -- --stats
npx webpack-bundle-analyzer build/bundle-stats.json
```

For Next.js:

```bash
ANALYZE=true npm run build
```

## Continuous Integration

Continuous Integration (CI) ensures that all tests run automatically on code changes.

### Setting Up GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Lint
      run: npm run lint
    
    - name: Unit tests
      run: npm test
    
    - name: Build
      run: npm run build
    
    - name: E2E tests
      run: npm run test:e2e
    
    - name: Visual regression tests
      run: npm run test:visual
    
    - name: Accessibility tests
      run: npm run test:a11y
```

### Using Code Coverage

Add coverage reporting to your tests:

```bash
# For Jest
npm test -- --coverage
```

Configure the threshold in `package.json`:

```json
{
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

## Best Practices

### Test Organization

1. **Test Folder Structure**:
   - Keep tests close to the code they test
   - Use a consistent naming convention (e.g., `*.test.js` or `*.spec.js`)
   - Group tests by type (unit, integration, e2e)

2. **Test Naming Conventions**:
   - Use descriptive test names
   - Follow a pattern: "should [expected behavior] when [condition]"
   - Group related tests in describe blocks

3. **Code Coverage Goals**:
   - Aim for 80%+ coverage for critical code
   - Focus on testing behavior, not implementation
   - Prioritize testing edge cases and error handling

### Testing Strategies

1. **Component Testing Strategy**:
   - Test props and their effects
   - Test user interactions
   - Test state changes
   - Test conditional rendering
   - Test accessibility
   
2. **Test-Driven Development (TDD)**:
   - Write tests before code
   - Follow the Red-Green-Refactor cycle
   - Start with simple tests, then add complexity

3. **Top-Down vs. Bottom-Up**:
   - Bottom-up: Build and test small components first
   - Top-down: Start with page layouts, then implement details
   - Choose based on your project's needs

### Common Pitfalls to Avoid

1. **Brittle Tests**:
   - Avoid testing implementation details
   - Use data-testid attributes instead of CSS selectors
   - Avoid unnecessary assertions

2. **Slow Tests**:
   - Minimize end-to-end tests
   - Use mocks for external services
   - Parallelize test execution when possible

3. **Flaky Tests**:
   - Add proper waiting and synchronization
   - Avoid time-dependent assertions
   - Isolate tests from each other

## 💡 Try It Yourself

1. Choose a component from your library (e.g., Button, Card, Form)
2. Write comprehensive unit tests for all props and behaviors
3. Add visual regression tests using Storybook and Chromatic
4. Implement accessibility tests with jest-axe
5. Create a simple end-to-end test with Cypress or Playwright
6. Set up GitHub Actions for continuous integration
7. Analyze your component's performance and bundle size

## 🔜 Next Steps

With comprehensive testing in place, let's explore how to automate your workflow with GitHub Actions. Continue to the [Workflow Automation with GitHub Actions](../09-github-actions/README.md) guide. 