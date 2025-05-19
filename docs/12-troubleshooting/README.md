# 🛠️ Troubleshooting Guide

This guide addresses common issues and challenges you might encounter in the design-to-code workflow, along with practical solutions and workarounds.

## Table of Contents
- [Design-to-Code Discrepancies](#design-to-code-discrepancies)
- [GitHub Copilot Challenges](#github-copilot-challenges)
- [Performance Issues](#performance-issues)
- [Cross-Browser Compatibility](#cross-browser-compatibility)
- [Responsive Design Issues](#responsive-design-issues)
- [Accessibility Problems](#accessibility-problems)
- [Workflow and Collaboration Obstacles](#workflow-and-collaboration-obstacles)

## Design-to-Code Discrepancies

### Issue: Inconsistent Design Tokens

**Problem**: Design tokens in code don't match what's defined in Figma.

**Solutions**:
1. **Audit token usage**: Systematically compare tokens in Figma with your codebase
2. **Implement automated token sync**: Use design token plugins to export directly from Figma
3. **Set up visual regression testing**: Catch discrepancies automatically
4. **Use token names in Figma comments**: Annotate designs with exact token names

```javascript
// Example of a token synchronization script
const figmaTokens = require('./figma-tokens.json');
const fs = require('fs');

// Transform Figma tokens to code format
const codeTokens = Object.entries(figmaTokens.colors).reduce((acc, [name, value]) => {
  acc[name.replace(/\s+/g, '-').toLowerCase()] = value;
  return acc;
}, {});

// Write to token file
fs.writeFileSync('./src/tokens/colors.js', 
  `export const colors = ${JSON.stringify(codeTokens, null, 2)};`
);
```

### Issue: Font Rendering Differences

**Problem**: Fonts appear differently in browsers compared to Figma designs.

**Solutions**:
1. **Use real web fonts**: Ensure Figma is using the exact same web fonts
2. **Adjust font-smoothing**: Apply appropriate anti-aliasing settings

```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
```

3. **Check font weights**: Verify that font weights match between design and code
4. **Implement font loading strategies**: Prevent flash of unstyled text (FOUT)

```html
<link rel="preload" href="/fonts/roboto.woff2" as="font" type="font/woff2" crossorigin>
```

### Issue: Spacing Inconsistencies

**Problem**: Spacing between elements doesn't match the design.

**Solutions**:
1. **Use a spacing scale**: Implement a consistent spacing system
2. **Check box model settings**: Ensure box-sizing is consistent

```css
* {
  box-sizing: border-box;
}
```

3. **Audit margin collapse**: Be aware of margin collapsing in CSS
4. **Use developer tools**: Leverage browser dev tools to inspect spacing issues
5. **Create spacing utilities**: Implement a spacing utility system

```scss
// Spacing utility classes
@each $space in $spacing-scale {
  .m-#{$space} { margin: #{$space * 0.25}rem; }
  .mx-#{$space} { 
    margin-left: #{$space * 0.25}rem; 
    margin-right: #{$space * 0.25}rem; 
  }
  // Other directions...
}
```

## GitHub Copilot Challenges

### Issue: Inaccurate Code Generation

**Problem**: GitHub Copilot generates code that doesn't match requirements or contains errors.

**Solutions**:
1. **Improve prompts**: Use clearer, more specific prompting techniques
2. **Provide context**: Add more context about your design system and requirements
3. **Use comments to guide**: Leave detailed comments before asking Copilot to generate code

```javascript
/**
 * Create a Button component with the following requirements:
 * - Matches our design system token usage
 * - Supports variants: primary, secondary, outlined
 * - Has proper accessibility attributes
 * - Includes loading and disabled states
 * - For use with our React component library
 */
// Now let Copilot suggest implementation
```

4. **Review and refine**: Always review generated code carefully
5. **Mix manual coding with generated code**: Use Copilot as an assistant, not a replacement

### Issue: Copilot Not Understanding Design Context

**Problem**: Copilot struggles to understand design-specific context or terminology.

**Solutions**:
1. **Create custom instructions**: Set up project-specific custom instructions
2. **Use descriptive variable names**: Name variables to reflect design terminology
3. **Include design token references**: Explicitly reference design tokens in prompts
4. **Break down complex components**: Generate simpler parts and assemble them manually

### Issue: Inconsistent Component Generation

**Problem**: Copilot generates components with inconsistent styles or approaches.

**Solutions**:
1. **Create and reference templates**: Show Copilot an example of your preferred component structure
2. **Use consistent code styles**: Establish and maintain consistent coding patterns
3. **Create component generation recipes**: Document successful prompting patterns

```javascript
// Component template reference for Copilot
/**
 * Template for our components:
 * 1. Props interface with clear typing
 * 2. Default props defined
 * 3. Component using function declaration
 * 4. Styles imported from separate file
 * 5. Props documented with JSDoc
 */

interface ExampleProps {
  /** Variant of the component */
  variant?: 'primary' | 'secondary';
  /** Content of the component */
  children: React.ReactNode;
}

export function Example({ 
  variant = 'primary',
  children 
}: ExampleProps) {
  return (
    <div className={styles[variant]}>
      {children}
    </div>
  );
}
```

## Performance Issues

### Issue: Slow Initial Load

**Problem**: Application takes too long to become interactive.

**Solutions**:
1. **Analyze with Lighthouse**: Identify specific bottlenecks
2. **Code splitting**: Split bundles by routes or components

```javascript
// React code splitting example
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function MyComponent() {
  return (
    <React.Suspense fallback={<Spinner />}>
      <HeavyComponent />
    </React.Suspense>
  );
}
```

3. **Server-side rendering**: Implement SSR for faster initial render
4. **Optimize images and assets**: Compress and properly size images
5. **Prioritize critical CSS**: Inline critical styles and defer the rest

### Issue: Sluggish Component Rendering

**Problem**: Components re-render too frequently or perform poorly.

**Solutions**:
1. **React DevTools profiler**: Identify unnecessary re-renders
2. **Memoization**: Use React.memo, useMemo, and useCallback appropriately

```javascript
// Memoization example
const MemoizedComponent = React.memo(ExpensiveComponent);

function Parent() {
  const handleClick = useCallback(() => {
    // Handle click
  }, []);
  
  const computedValue = useMemo(() => {
    return expensiveCalculation(a, b);
  }, [a, b]);
  
  return <MemoizedComponent onClick={handleClick} value={computedValue} />;
}
```

3. **Virtualization**: Use virtualized lists for long scrolling content

```javascript
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>{items[index]}</div>
  );
  
  return (
    <FixedSizeList
      height={500}
      width="100%"
      itemCount={items.length}
      itemSize={35}
    >
      {Row}
    </FixedSizeList>
  );
}
```

4. **Avoid anonymous functions**: Define event handlers outside render when possible
5. **Reduce component state updates**: Batch updates and minimize state changes

### Issue: Large Bundle Size

**Problem**: JavaScript bundles are too large, increasing download time.

**Solutions**:
1. **Analyze bundles**: Use tools like webpack-bundle-analyzer to identify large dependencies
2. **Tree shaking**: Ensure proper tree shaking configuration

```javascript
// webpack.config.js
module.exports = {
  mode: 'production',
  optimization: {
    usedExports: true,
    sideEffects: true
  }
};
```

3. **Import optimization**: Only import what you need from libraries

```javascript
// Bad
import { Button, Card, Table, Form } from 'ui-library';

// Good
import Button from 'ui-library/Button';
import Card from 'ui-library/Card';
```

4. **Defer non-critical features**: Load features on demand
5. **Evaluate dependencies**: Consider smaller alternatives for large packages

## Cross-Browser Compatibility

### Issue: Layout Differences Across Browsers

**Problem**: Layouts appear differently in different browsers.

**Solutions**:
1. **Normalize CSS**: Use a CSS normalizer or reset

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
```

2. **Flexbox/Grid fallbacks**: Provide fallbacks for older browsers

```css
.container {
  display: block; /* Fallback */
  display: flex;
}
```

3. **Feature detection**: Use feature detection with @supports

```css
.container {
  display: block; /* Fallback */
}

@supports (display: grid) {
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}
```

4. **Test in multiple browsers**: Regularly test across target browsers
5. **Use BrowserStack or similar**: Test on browsers not available locally

### Issue: CSS Property Support Variations

**Problem**: Some CSS properties don't work consistently across browsers.

**Solutions**:
1. **Use Autoprefixer**: Automatically add vendor prefixes

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
};
```

2. **Consult Can I Use**: Check browser support before using new features
3. **Provide fallbacks**: Layer CSS with progressive enhancement

```css
.gradient {
  background: #f06d06; /* Fallback */
  background: linear-gradient(to right, #f06d06, #fff);
}
```

4. **Polyfills**: Use polyfills for missing JavaScript features

```javascript
// Using core-js for polyfilling
import 'core-js/stable';
import 'regenerator-runtime/runtime';
```

### Issue: Font Inconsistencies

**Problem**: Fonts appear differently across browsers and operating systems.

**Solutions**:
1. **Use web fonts**: Include custom fonts as web fonts
2. **Set appropriate fallbacks**: Add a cascade of fallback fonts

```css
body {
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
    Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
}
```

3. **Test on different operating systems**: Check rendering on Windows, macOS, Linux
4. **Use font-display**: Control how fonts load and render

```css
@font-face {
  font-family: 'Custom Font';
  src: url('/fonts/custom-font.woff2') format('woff2');
  font-display: swap;
}
```

## Responsive Design Issues

### Issue: Layouts Breaking on Specific Devices

**Problem**: Layouts that work well on most devices break on specific screen sizes.

**Solutions**:
1. **Use flexible layouts**: Implement fluid layouts with CSS Grid or Flexbox
2. **Strategic breakpoints**: Set breakpoints based on content, not devices

```css
/* Content-based breakpoints */
@media (min-width: 35em) { /* ~560px - Content starts to feel cramped */ }
@media (min-width: 50em) { /* ~800px - Good for 2-col layout */ }
@media (min-width: 70em) { /* ~1120px - Good for wider layouts */ }
```

3. **Test actual devices**: Use real devices for testing when possible
4. **Use device emulators**: Leverage browser dev tools' device emulation
5. **Container queries**: Use container queries for component-specific responsiveness (when supported)

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    flex-direction: row;
  }
}
```

### Issue: Images Not Scaling Properly

**Problem**: Images either appear pixelated or consume too much bandwidth.

**Solutions**:
1. **Responsive images**: Use srcset and sizes attributes

```html
<img 
  src="image-800w.jpg" 
  srcset="image-400w.jpg 400w, image-800w.jpg 800w, image-1600w.jpg 1600w" 
  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
  alt="Responsive image"
>
```

2. **Object-fit property**: Control how images scale within containers

```css
.cover-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
```

3. **Modern image formats**: Serve WebP or AVIF with fallbacks

```html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Responsive image">
</picture>
```

4. **Image CDNs**: Use services that optimize and resize images on the fly

### Issue: Touch Targets Too Small

**Problem**: Interactive elements are difficult to tap on mobile devices.

**Solutions**:
1. **Increase target size**: Make touch targets at least 44×44px

```css
.button {
  min-width: 44px;
  min-height: 44px;
  padding: 12px 16px;
}
```

2. **Add appropriate spacing**: Ensure sufficient space between interactive elements
3. **Use the entire element as target**: Avoid small clickable areas within larger elements
4. **Test with touch devices**: Verify usability on actual touch devices

## Accessibility Problems

### Issue: Keyboard Navigation Issues

**Problem**: Users can't navigate the interface using only a keyboard.

**Solutions**:
1. **Test keyboard navigation**: Tab through your interface regularly
2. **Ensure visible focus styles**: Make focus states clearly visible

```css
:focus {
  outline: 2px solid blue;
  outline-offset: 2px;
}

/* Or for more custom focus styles */
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px white, 0 0 0 4px blue;
}
```

3. **Fix tab order**: Use tabindex appropriately, avoiding positive values
4. **Implement keyboard shortcuts**: Add keyboard shortcuts for common actions

```javascript
function handleKeyDown(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

useEffect(() => {
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, []);
```

### Issue: Screen Reader Compatibility Problems

**Problem**: Screen readers can't properly interpret content or interactions.

**Solutions**:
1. **Use semantic HTML**: Choose appropriate elements for their purpose

```html
<!-- Bad -->
<div class="button" onclick="submit()">Submit</div>

<!-- Good -->
<button type="submit">Submit</button>
```

2. **Add appropriate ARIA attributes**: Use ARIA when HTML semantics aren't enough

```html
<div role="alert" aria-live="assertive">
  Form submitted successfully!
</div>
```

3. **Test with screen readers**: Use NVDA, VoiceOver, or JAWS
4. **Implement skip links**: Allow skipping to main content

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
<!-- ... -->
<main id="main-content">
  <!-- Main content -->
</main>
```

### Issue: Insufficient Color Contrast

**Problem**: Text has poor contrast against its background.

**Solutions**:
1. **Use contrast checking tools**: Verify contrast ratios meet WCAG standards
2. **Adjust colors**: Modify colors to increase contrast
3. **Test in grayscale**: View your interface in grayscale to spot issues
4. **Don't rely on color alone**: Add additional indicators (icons, patterns)

```css
/* Bad - color only */
.error-message { color: red; }

/* Better - additional indicator */
.error-message { 
  color: #d32f2f; 
  border-left: 3px solid currentColor;
  padding-left: 8px;
}
```

## Workflow and Collaboration Obstacles

### Issue: Design Updates Not Reflected in Code

**Problem**: Code falls out of sync with the latest design changes.

**Solutions**:
1. **Establish version control for designs**: Tag Figma versions to match code releases
2. **Create a design change log**: Document meaningful design changes
3. **Automate design token updates**: Set up pipelines for token synchronization
4. **Regular design reviews**: Schedule periodic sync meetings
5. **Implement visual regression testing**: Catch unintended visual changes

### Issue: Inconsistent Implementation Across Teams

**Problem**: Different teams implement design elements differently.

**Solutions**:
1. **Create a shared component library**: Develop and maintain a centralized library
2. **Document component usage**: Create clear guidelines with examples
3. **Conduct code reviews with designers**: Include designers in code review process
4. **Implement design system ambassadors**: Assign representatives in each team
5. **Regular team demos**: Share implementations and approaches across teams

### Issue: Designer-Developer Communication Gaps

**Problem**: Miscommunication leads to implementation discrepancies.

**Solutions**:
1. **Establish shared terminology**: Create a glossary of design and development terms
2. **Set clear handoff processes**: Define when and how designs are ready for development
3. **Provide design specifications**: Include detailed specs for all designs
4. **Joint planning sessions**: Plan features together with both disciplines
5. **Regular design system updates**: Keep both teams informed of changes and decisions

## 💡 Try It Yourself

1. Create a troubleshooting checklist for your projects
2. Set up a visual regression test for a key component
3. Run an accessibility audit and address the top issues
4. Test your application on multiple browsers and devices
5. Optimize a slow component using the performance tips
6. Implement a design token synchronization pipeline
7. Establish a designer-developer collaboration workflow

## 🔜 Next Steps

Now that you know how to troubleshoot common issues, let's explore additional resources to deepen your knowledge and keep up with best practices. Continue to the [References and Resources](../13-resources/README.md) guide. 