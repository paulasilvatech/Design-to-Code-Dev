# Ensuring Accessibility and Responsiveness

This section covers best practices for ensuring your Figma-to-code implementations are both accessible and responsive, providing an optimal experience for all users regardless of their abilities or devices.

## Accessibility Implementation

### WCAG Compliance

Ensure your components meet Web Content Accessibility Guidelines (WCAG) 2.1 AA standards:

1. **Perceivable**
   - Provide text alternatives for non-text content
   - Create content that can be presented in different ways
   - Make it easier for users to see and hear content

2. **Operable**
   - Make all functionality available from a keyboard
   - Give users enough time to read and use content
   - Do not use content that causes seizures or physical reactions
   - Help users navigate and find content

3. **Understandable**
   - Make text readable and understandable
   - Make content appear and operate in predictable ways
   - Help users avoid and correct mistakes

4. **Robust**
   - Maximize compatibility with current and future user tools

### Semantic HTML

Use proper semantic HTML elements for better accessibility:

```jsx
// ❌ Poor accessibility
<div className="button" onClick={handleClick}>
  Click Me
</div>

// ✅ Good accessibility
<button 
  className="button" 
  onClick={handleClick}
  aria-label="Submit form"
  disabled={isDisabled}
>
  Click Me
</button>
```

### ARIA Attributes

Implement ARIA (Accessible Rich Internet Applications) attributes when necessary:

```jsx
// Modal component example
<div 
  role="dialog"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
  aria-modal="true"
>
  <h2 id="modal-title">Confirmation</h2>
  <p id="modal-description">Are you sure you want to proceed?</p>
  <button onClick={onConfirm}>Confirm</button>
  <button onClick={onCancel}>Cancel</button>
</div>
```

### Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

```jsx
// Keyboard-accessible dropdown
const Dropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, options.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        if (selectedIndex >= 0) {
          onSelect(options[selectedIndex]);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };
  
  return (
    <div className="dropdown">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        Select an option
      </button>
      
      {isOpen && (
        <ul 
          role="listbox"
          tabIndex={-1}
          onKeyDown={handleKeyDown}
        >
          {options.map((option, index) => (
            <li
              key={option.id}
              role="option"
              aria-selected={index === selectedIndex}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

### Focus Management

Implement proper focus management for interactive components:

```jsx
// Modal with focus trap
const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      
      // Focus the modal when it opens
      if (modalRef.current) {
        modalRef.current.focus();
      }
      
      // Restore focus when modal closes
      return () => {
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      };
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div 
        ref={modalRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
```

### Color Contrast

Ensure sufficient color contrast for text and interactive elements:

```css
/* ❌ Poor contrast */
.button-low-contrast {
  background-color: #8B5CF6;
  color: #C4B5FD;
}

/* ✅ Good contrast (4.5:1 ratio for normal text) */
.button-good-contrast {
  background-color: #6D28D9;
  color: #FFFFFF;
}
```

## Responsive Design Implementation

### Flexible Layouts

Use CSS Flexbox and Grid for flexible layouts:

```css
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.card {
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-content {
  flex: 1;
}
```

### Media Queries

Implement responsive breakpoints with media queries:

```css
/* Base styles for mobile */
.container {
  padding: 1rem;
}

/* Tablet styles */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

### Responsive Typography

Use relative units for typography:

```css
:root {
  font-size: 16px;
}

h1 {
  font-size: 2rem; /* 32px */
}

h2 {
  font-size: 1.5rem; /* 24px */
}

p {
  font-size: 1rem; /* 16px */
}

@media (min-width: 768px) {
  h1 {
    font-size: 2.5rem; /* 40px */
  }
}
```

### Responsive Images

Implement responsive images:

```html
<img 
  src="image-small.jpg"
  srcset="image-small.jpg 400w, image-medium.jpg 800w, image-large.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1024px) 800px, 1200px"
  alt="Description of the image"
/>
```

### Container Queries

Use container queries for component-level responsiveness (with polyfill for older browsers):

```css
.card-container {
  container-type: inline-size;
}

.card {
  display: grid;
  grid-template-columns: 1fr;
}

@container (min-width: 400px) {
  .card {
    grid-template-columns: 200px 1fr;
  }
}
```

## Testing Accessibility and Responsiveness

### Accessibility Testing

1. **Automated Testing**

```javascript
// Using jest-axe for accessibility testing
import { axe } from 'jest-axe';

describe('Button component', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

2. **Screen Reader Testing**

Test your components with screen readers like:
- NVDA or JAWS (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)

3. **Keyboard Navigation Testing**

Test tab order, focus indicators, and keyboard shortcuts.

### Responsive Testing

1. **Visual Testing**

```javascript
// Using Storybook's viewport addon
export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
      defaultViewport: 'desktop',
    },
  },
};
```

2. **Browser Testing**

Test across different browsers and devices using:
- Browser DevTools device emulation
- BrowserStack or similar services
- Physical device testing

## AI-Assisted Accessibility and Responsiveness

Use GitHub Copilot to help implement accessible and responsive components:

```
// Example prompt for GitHub Copilot
/*
Create an accessible and responsive navigation menu component that:
1. Uses semantic HTML
2. Is keyboard navigable
3. Works with screen readers
4. Collapses to a hamburger menu on mobile
5. Has proper ARIA attributes
6. Manages focus correctly
7. Has sufficient color contrast
*/
```

By following these accessibility and responsiveness best practices, you'll ensure your Figma-to-code implementations provide an optimal experience for all users across all devices.
