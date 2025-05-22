# Complete Design-to-Code Workshop Guide - Part 2
## Basic Workshop Modules 3-5: GitHub Copilot and Component Generation

### Quick Navigation
- **Part 1**: Setup and Basic Workshop Foundation ✅
- **Part 2**: Basic Workshop Modules 3-5 (This Document) 📍
- **Part 3**: Intermediate Workshop (2 hours)
- **Part 4**: Advanced Workshop Part 1 (3 hours)
- **Part 5**: Advanced Workshop Part 2 (3 hours)

---

## Module 3: GitHub Copilot for Component Generation (20 minutes)

### 3.1 Understanding GitHub Copilot's Design-to-Code Capabilities
**Time Required**: 5 minutes

#### What GitHub Copilot Can Do for Design-to-Code

1. **Pattern Recognition**:
   - Recognizes design patterns from comments
   - Understands component structure from descriptions
   - Suggests appropriate styling approaches

2. **Context Awareness**:
   - Uses surrounding code for consistency
   - Adapts to your project's patterns
   - Learns from your coding style

3. **Framework Knowledge**:
   - Knows React, Vue, Angular patterns
   - Understands CSS-in-JS libraries
   - Suggests accessibility best practices

#### Effective Prompting Strategies

**DO:**
- Provide specific design details in comments
- Include exact measurements and colors
- Describe component behavior and states
- Reference design system tokens

**DON'T:**
- Use vague descriptions
- Assume Copilot knows your design
- Skip accessibility requirements
- Ignore generated code review

### 3.2 Setting Up Copilot for Design Work
**Time Required**: 5 minutes

1. **Create Component Template File**:

Create `src/components/Button/Button.tsx`:
```typescript
// Import design tokens
import { colors, typography, spacing } from '../../design-system/tokens';

/**
 * Button Component from Figma Design
 * 
 * Design Specifications:
 * - Primary variant: #2196F3 background, white text
 * - Padding: 12px 24px (medium), 8px 16px (small), 16px 32px (large)
 * - Border radius: 8px
 * - Font: Inter Medium (500)
 * - States: default, hover, active, disabled
 * - Hover: darker background, subtle shadow
 * - Disabled: gray background (#E0E0E0), gray text (#9E9E9E)
 * 
 * Component should support:
 * - Three sizes: small, medium, large
 * - Three variants: primary, secondary, outlined
 * - Loading state with spinner
 * - Left and right icon support
 * - Full width option
 */

// Start typing here and let Copilot generate the component
```

2. **Trigger Copilot Suggestions**:
   - Place cursor after the comment
   - Press `Enter` to move to next line
   - Start typing `interface` or `type`
   - Copilot should suggest the component interface

3. **Review Initial Suggestions**:
```typescript
// Copilot will likely suggest something like:
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
```

### 3.3 Generating the Component with Copilot
**Time Required**: 10 minutes

1. **Accept and Continue Generation**:
   - Accept the interface suggestion
   - Press `Enter` and start typing `const Button`
   - Let Copilot generate the component

2. **Expected Component Structure**:
```typescript
import React from 'react';
import { colors, typography, spacing } from '../../design-system/tokens';
import './Button.css'; // or styled-components

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onClick,
  className = '',
}) => {
  // Copilot should generate the button classes logic
  const baseClasses = 'btn';
  const variantClasses = `btn--${variant}`;
  const sizeClasses = `btn--${size}`;
  const stateClasses = [
    disabled && 'btn--disabled',
    loading && 'btn--loading',
    fullWidth && 'btn--full-width',
  ].filter(Boolean).join(' ');

  const classes = [
    baseClasses,
    variantClasses,
    sizeClasses,
    stateClasses,
    className,
  ].filter(Boolean).join(' ');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  return (
    <button
      className={classes}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-disabled={disabled}
    >
      {loading && <span className="btn__spinner" aria-label="Loading" />}
      {!loading && leftIcon && <span className="btn__icon btn__icon--left">{leftIcon}</span>}
      <span className="btn__content">{children}</span>
      {!loading && rightIcon && <span className="btn__icon btn__icon--right">{rightIcon}</span>}
    </button>
  );
};

export default Button;
```

3. **Generate Styles with Copilot**:

Create `src/components/Button/Button.css`:
```css
/* Button Component Styles
 * Based on Figma design with design tokens
 * Copilot: Generate CSS for button component with:
 * - Base styles using flexbox
 * - Three variants: primary, secondary, outlined
 * - Three sizes: small, medium, large
 * - States: hover, active, disabled, loading
 * - Smooth transitions
 */

/* Copilot should generate: */
.btn {
  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
  outline: none;
}

/* Size variants */
.btn--small {
  padding: 8px 16px;
  font-size: 14px;
  min-height: 36px;
}

.btn--medium {
  padding: 12px 24px;
  font-size: 16px;
  min-height: 48px;
}

.btn--large {
  padding: 16px 32px;
  font-size: 18px;
  min-height: 56px;
}

/* Variant styles */
.btn--primary {
  background-color: #2196F3;
  color: white;
}

.btn--primary:hover:not(.btn--disabled) {
  background-color: #1E88E5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn--primary:active:not(.btn--disabled) {
  background-color: #1976D2;
}

.btn--secondary {
  background-color: #9CA3AF;
  color: white;
}

.btn--secondary:hover:not(.btn--disabled) {
  background-color: #6B7280;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn--outlined {
  background-color: transparent;
  color: #2196F3;
  border: 2px solid #2196F3;
}

.btn--outlined:hover:not(.btn--disabled) {
  background-color: rgba(33, 150, 243, 0.08);
}

/* State modifiers */
.btn--disabled {
  background-color: #E0E0E0 !important;
  color: #9E9E9E !important;
  cursor: not-allowed;
  border-color: #E0E0E0 !important;
}

.btn--loading {
  cursor: wait;
  color: transparent;
}

.btn--full-width {
  width: 100%;
}

/* Icon styles */
.btn__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn__icon--left {
  margin-right: 4px;
}

.btn__icon--right {
  margin-left: 4px;
}

/* Loading spinner */
.btn__spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

/* Focus styles for accessibility */
.btn:focus-visible {
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.5);
}
```

**✅ Checkpoint**: You have a complete Button component generated with Copilot assistance

---

## Module 4: Converting Your First Design (25 minutes)

### 4.1 Creating a Card Component from Figma
**Time Required**: 10 minutes

1. **Analyze the Card Design in Figma**:
   - Open your Figma file
   - Find the Card component
   - Note these properties:
     - Background: White (#FFFFFF)
     - Border radius: 12px
     - Shadow: 0 2px 8px rgba(0,0,0,0.1)
     - Padding: 24px
     - Image aspect ratio: 16:9
     - Title: 20px, semibold
     - Description: 16px, regular

2. **Create Card Component with Copilot**:

Create `src/components/Card/Card.tsx`:
```typescript
/**
 * Card Component from Figma Design
 * 
 * Design Specifications:
 * - Background: White with subtle shadow
 * - Border radius: 12px
 * - Padding: 24px
 * - Shadow: 0 2px 8px rgba(0,0,0,0.1)
 * - Image: 16:9 aspect ratio, border-radius 8px
 * - Title: 20px, Inter Semibold
 * - Description: 16px, Inter Regular, neutral-600
 * - Actions: Optional footer with buttons
 * 
 * Variants:
 * - Default: white background
 * - Elevated: stronger shadow
 * - Outlined: border instead of shadow
 * 
 * Props needed:
 * - image (optional)
 * - title
 * - description
 * - actions (optional)
 * - variant
 * - onClick (optional)
 */

// Let Copilot generate the component
```

3. **Expected Card Component**:
```typescript
import React from 'react';
import './Card.css';

interface CardProps {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  actions?: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  onClick?: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  imageAlt = '',
  actions,
  variant = 'default',
  onClick,
  className = '',
}) => {
  const cardClasses = [
    'card',
    `card--${variant}`,
    onClick && 'card--clickable',
    className,
  ].filter(Boolean).join(' ');

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <article
      className={cardClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `${title} - Click to view details` : undefined}
    >
      {image && (
        <div className="card__image-wrapper">
          <img
            src={image}
            alt={imageAlt || title}
            className="card__image"
            loading="lazy"
          />
        </div>
      )}
      <div className="card__content">
        <h3 className="card__title">{title}</h3>
        <p className="card__description">{description}</p>
      </div>
      {actions && (
        <div className="card__actions">
          {actions}
        </div>
      )}
    </article>
  );
};

export default Card;
```

### 4.2 Styling the Card Component
**Time Required**: 8 minutes

Create `src/components/Card/Card.css`:
```css
/* Card Component Styles */
.card {
  background-color: #FFFFFF;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
}

/* Variants */
.card--default {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card--elevated {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.card--elevated:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
}

.card--outlined {
  border: 1px solid #E0E0E0;
  box-shadow: none;
}

/* Clickable state */
.card--clickable {
  cursor: pointer;
}

.card--clickable:hover {
  transform: translateY(-2px);
}

.card--clickable:active {
  transform: translateY(0);
}

/* Image wrapper */
.card__image-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
}

.card__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Content */
.card__content {
  padding: 24px;
  flex: 1;
}

.card__title {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  color: #212121;
  margin: 0 0 8px 0;
}

.card__description {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: #616161;
  margin: 0;
}

/* Actions */
.card__actions {
  padding: 0 24px 24px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

/* Focus styles */
.card--clickable:focus-visible {
  outline: 3px solid #2196F3;
  outline-offset: 2px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .card__content {
    padding: 16px;
  }
  
  .card__actions {
    padding: 0 16px 16px;
  }
  
  .card__title {
    font-size: 18px;
  }
  
  .card__description {
    font-size: 14px;
  }
}
```

### 4.3 Testing Your Components
**Time Required**: 7 minutes

1. **Create a Test Page**:

Create `src/App.tsx`:
```tsx
import React from 'react';
import Button from './components/Button/Button';
import Card from './components/Card/Card';
import './App.css';

// Sample icon components
const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 12.173l-4.702 2.472.898-5.236L.392 5.705l5.257-.764L8 0l2.351 4.941 5.257.764-3.804 3.704.898 5.236z"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
  </svg>
);

function App() {
  return (
    <div className="app">
      <div className="container">
        <h1>Design-to-Code Workshop Components</h1>
        
        <section className="section">
          <h2>Button Components</h2>
          <div className="component-grid">
            {/* Primary Buttons */}
            <div className="component-group">
              <h3>Primary Variant</h3>
              <div className="button-row">
                <Button size="small">Small</Button>
                <Button size="medium">Medium</Button>
                <Button size="large">Large</Button>
              </div>
            </div>
            
            {/* Secondary Buttons */}
            <div className="component-group">
              <h3>Secondary Variant</h3>
              <div className="button-row">
                <Button variant="secondary" size="small">Small</Button>
                <Button variant="secondary" size="medium">Medium</Button>
                <Button variant="secondary" size="large">Large</Button>
              </div>
            </div>
            
            {/* Outlined Buttons */}
            <div className="component-group">
              <h3>Outlined Variant</h3>
              <div className="button-row">
                <Button variant="outlined" size="small">Small</Button>
                <Button variant="outlined" size="medium">Medium</Button>
                <Button variant="outlined" size="large">Large</Button>
              </div>
            </div>
            
            {/* Button States */}
            <div className="component-group">
              <h3>Button States</h3>
              <div className="button-row">
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
                <Button leftIcon={<StarIcon />}>With Icon</Button>
                <Button rightIcon={<ArrowIcon />}>Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="section">
          <h2>Card Components</h2>
          <div className="card-grid">
            <Card
              title="Beautiful Landscape"
              description="Discover breathtaking views and serene environments that inspire and rejuvenate your spirit."
              image="https://picsum.photos/400/225"
              actions={
                <>
                  <Button variant="outlined" size="small">Share</Button>
                  <Button size="small">View</Button>
                </>
              }
            />
            
            <Card
              variant="elevated"
              title="Modern Architecture"
              description="Explore innovative designs that push the boundaries of contemporary construction."
              image="https://picsum.photos/400/226"
              onClick={() => console.log('Card clicked!')}
            />
            
            <Card
              variant="outlined"
              title="Simple Card"
              description="This card demonstrates the outlined variant without an image, perfect for text-based content."
              actions={
                <Button variant="primary" size="small" fullWidth>
                  Get Started
                </Button>
              }
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
```

2. **Add App Styles**:

Create `src/App.css`:
```css
/* Reset and base styles */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #F5F5F5;
  color: #212121;
}

/* App container */
.app {
  min-height: 100vh;
  padding: 40px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
}

/* Sections */
.section {
  margin-bottom: 60px;
}

.section h2 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
}

/* Component groups */
.component-group {
  margin-bottom: 32px;
}

.component-group h3 {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 16px;
  color: #616161;
}

/* Button layout */
.button-row {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

/* Card grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .app {
    padding: 20px 16px;
  }
  
  h1 {
    font-size: 24px;
  }
  
  .card-grid {
    grid-template-columns: 1fr;
  }
}
```

3. **Run the Development Server**:
```bash
# Make sure you're in the project directory
cd design-to-code-workshop

# Install dependencies if not already done
npm install

# Create main.tsx entry point
cat > src/main.tsx << EOF
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

# Create index.html
cat > index.html << EOF
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Design-to-Code Workshop</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

# Start the dev server
npm run dev
```

4. **View Your Components**:
   - Open browser to `http://localhost:5173`
   - Test all button variants and states
   - Click on cards to test interactions
   - Verify responsive behavior

**✅ Checkpoint**: Your components are running in the browser and match the Figma design

---

## Module 5: Final Exercise - Complete Landing Page (25 minutes)

### 5.1 Analyzing the Landing Page Design
**Time Required**: 5 minutes

**Landing Page Structure**:
1. **Hero Section**:
   - Full-width background
   - Centered content
   - Headline + Subheadline
   - CTA buttons
   - Hero image

2. **Features Section**:
   - 3-column grid
   - Icon + Title + Description
   - Responsive to stack on mobile

3. **CTA Section**:
   - Background color
   - Centered content
   - Large CTA button

### 5.2 Building the Hero Section
**Time Required**: 10 minutes

Create `src/components/Hero/Hero.tsx`:
```tsx
/**
 * Hero Section Component
 * 
 * Figma Design Specs:
 * - Height: 600px desktop, auto on mobile
 * - Background: Linear gradient primary to primary-dark
 * - Content: Centered, max-width 800px
 * - Headline: 48px desktop, 32px mobile, bold
 * - Subheadline: 20px, regular, neutral-200
 * - Buttons: Primary and Outlined, large size
 * - Spacing: 32px between elements
 */

import React from 'react';
import Button from '../Button/Button';
import './Hero.css';

interface HeroProps {
  headline: string;
  subheadline: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  onPrimaryClick: () => void;
  onSecondaryClick?: () => void;
  backgroundImage?: string;
}

const Hero: React.FC<HeroProps> = ({
  headline,
  subheadline,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  backgroundImage,
}) => {
  return (
    <section 
      className="hero"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      <div className="hero__overlay" />
      <div className="hero__content">
        <h1 className="hero__headline">{headline}</h1>
        <p className="hero__subheadline">{subheadline}</p>
        <div className="hero__actions">
          <Button 
            size="large" 
            onClick={onPrimaryClick}
          >
            {primaryButtonText}
          </Button>
          {secondaryButtonText && (
            <Button 
              variant="outlined" 
              size="large" 
              onClick={onSecondaryClick}
            >
              {secondaryButtonText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
```

Create `src/components/Hero/Hero.css`:
```css
.hero {
  position: relative;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.hero__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.hero__content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
}

.hero__headline {
  font-size: 48px;
  font-weight: 700;
  color: white;
  margin: 0 0 16px 0;
  line-height: 1.2;
}

.hero__subheadline {
  font-size: 20px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 32px 0;
  line-height: 1.5;
}

.hero__actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .hero {
    min-height: 500px;
  }
  
  .hero__headline {
    font-size: 32px;
  }
  
  .hero__subheadline {
    font-size: 18px;
  }
  
  .hero__actions {
    flex-direction: column;
    align-items: center;
  }
}
```

### 5.3 Creating the Features Section
**Time Required**: 10 minutes

Create `src/components/Features/Features.tsx`:
```tsx
/**
 * Features Section
 * Grid of feature cards with icons
 */

import React from 'react';
import './Features.css';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesProps {
  title: string;
  subtitle?: string;
  features: Feature[];
}

const Features: React.FC<FeaturesProps> = ({ title, subtitle, features }) => {
  return (
    <section className="features">
      <div className="features__header">
        <h2 className="features__title">{title}</h2>
        {subtitle && <p className="features__subtitle">{subtitle}</p>}
      </div>
      <div className="features__grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-card__icon">{feature.icon}</div>
            <h3 className="feature-card__title">{feature.title}</h3>
            <p className="feature-card__description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
```

Create `src/components/Features/Features.css`:
```css
.features {
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.features__header {
  text-align: center;
  margin-bottom: 60px;
}

.features__title {
  font-size: 36px;
  font-weight: 700;
  color: #212121;
  margin: 0 0 16px 0;
}

.features__subtitle {
  font-size: 18px;
  color: #616161;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
}

.features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
}

.feature-card {
  text-align: center;
  padding: 20px;
}

.feature-card__icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #E3F2FD;
  border-radius: 16px;
  color: #2196F3;
}

.feature-card__title {
  font-size: 24px;
  font-weight: 600;
  color: #212121;
  margin: 0 0 12px 0;
}

.feature-card__description {
  font-size: 16px;
  color: #616161;
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .features {
    padding: 60px 20px;
  }
  
  .features__title {
    font-size: 28px;
  }
  
  .features__grid {
    gap: 30px;
  }
}
```

### 5.4 Final Landing Page Assembly

Update `src/App.tsx` to create the landing page:
```tsx
import React from 'react';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Card from './components/Card/Card';
import Button from './components/Button/Button';
import './App.css';

// Icon components for features
const CodeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
    <path d="M11 22L5 16l6-6 1.414 1.414L8.828 15H18v2H8.828l3.586 3.586L11 22z"/>
    <path d="M21 10l6 6-6 6-1.414-1.414L23.172 17H14v-2h9.172l-3.586-3.586L21 10z"/>
  </svg>
);

const DesignIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
    <path d="M26 2H6C3.8 2 2 3.8 2 6v20c0 2.2 1.8 4 4 4h20c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4zM6 4h20c1.1 0 2 .9 2 2v4H4V6c0-1.1.9-2 2-2zm20 24H6c-1.1 0-2-.9-2-2V12h24v14c0 1.1-.9 2-2 2z"/>
    <circle cx="8" cy="7" r="1"/>
    <circle cx="12" cy="7" r="1"/>
    <circle cx="16" cy="7" r="1"/>
  </svg>
);

const SpeedIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
    <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/>
    <path d="M16 8v8l5.7 5.7 1.4-1.4L18 15.2V8h-2z"/>
  </svg>
);

function App() {
  const features = [
    {
      icon: <DesignIcon />,
      title: "Pixel-Perfect Design",
      description: "Convert your Figma designs to code with precise accuracy and attention to detail."
    },
    {
      icon: <CodeIcon />,
      title: "Clean Code Output",
      description: "Generate maintainable, well-structured code following industry best practices."
    },
    {
      icon: <SpeedIcon />,
      title: "Lightning Fast",
      description: "Transform designs to production-ready code in minutes, not hours or days."
    }
  ];

  return (
    <div className="app">
      <Hero
        headline="Transform Figma Designs to Production Code"
        subheadline="Leverage AI-powered tools to convert your designs into clean, responsive, and accessible code in minutes."
        primaryButtonText="Get Started"
        secondaryButtonText="Learn More"
        onPrimaryClick={() => console.log('Get Started clicked')}
        onSecondaryClick={() => console.log('Learn More clicked')}
      />
      
      <Features
        title="Why Choose Our Design-to-Code Solution?"
        subtitle="Save time and maintain consistency with our AI-powered workflow"
        features={features}
      />
      
      <section className="showcase">
        <div className="container">
          <h2 className="showcase__title">See It In Action</h2>
          <div className="card-grid">
            <Card
              title="Component Library"
              description="Build a comprehensive component library directly from your design system."
              image="https://picsum.photos/400/225?random=1"
              variant="elevated"
              actions={
                <Button size="small">Explore</Button>
              }
            />
            <Card
              title="Responsive Layouts"
              description="Automatically generate responsive layouts that work across all devices."
              image="https://picsum.photos/400/225?random=2"
              variant="elevated"
              actions={
                <Button size="small">Explore</Button>
              }
            />
            <Card
              title="Design Systems"
              description="Maintain consistency with automated design token extraction and theming."
              image="https://picsum.photos/400/225?random=3"
              variant="elevated"
              actions={
                <Button size="small">Explore</Button>
              }
            />
          </div>
        </div>
      </section>
      
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Transform Your Workflow?</h2>
          <p className="cta-description">
            Join thousands of designers and developers who are already using our AI-powered tools.
          </p>
          <Button size="large" onClick={() => console.log('CTA clicked')}>
            Start Your Free Trial
          </Button>
        </div>
      </section>
    </div>
  );
}

export default App;
```

Add the additional styles to `src/App.css`:
```css
/* ... previous styles ... */

/* Showcase section */
.showcase {
  padding: 80px 20px;
  background-color: #FAFAFA;
}

.showcase__title {
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 60px;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
  padding: 100px 20px;
  text-align: center;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin: 0 0 16px 0;
}

.cta-description {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 32px 0;
  line-height: 1.5;
}

/* Remove default app padding for landing page */
.app {
  padding: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .showcase {
    padding: 60px 20px;
  }
  
  .showcase__title {
    font-size: 28px;
  }
  
  .cta-section {
    padding: 60px 20px;
  }
  
  .cta-title {
    font-size: 28px;
  }
  
  .cta-description {
    font-size: 18px;
  }
}
```

**✅ Final Checkpoint**: You have successfully created a complete landing page using the design-to-code workflow!

---

## Workshop Summary and Next Steps

### What You've Accomplished

In this basic workshop, you have:
1. ✅ Set up a complete design-to-code development environment
2. ✅ Created design tokens from Figma specifications
3. ✅ Used GitHub Copilot to generate production-ready components
4. ✅ Built responsive Button and Card components
5. ✅ Assembled a complete landing page from components
6. ✅ Implemented accessibility best practices
7. ✅ Applied responsive design principles

### Key Takeaways

1. **Design Preparation is Critical**:
   - Well-structured Figma files lead to better code
   - Consistent naming conventions save time
   - Design tokens create maintainable systems

2. **AI Augments, Not Replaces**:
   - Copilot speeds up development significantly
   - Human review and refinement is essential
   - Understanding the output is crucial

3. **Component-First Approach**:
   - Build reusable components
   - Think in terms of composition
   - Maintain consistency across the system

### Practice Exercises

1. **Create Additional Components**:
   - Navigation header
   - Footer component
   - Form elements (inputs, checkboxes)
   - Modal dialog

2. **Enhance Existing Components**:
   - Add more button variants
   - Create card loading states
   - Implement animation transitions

3. **Build Another Page**:
   - About page
   - Contact form
   - Product showcase

### Troubleshooting Guide

**Common Issues and Solutions**:

1. **Copilot Not Suggesting Code**:
   - Ensure extension is activated
   - Check internet connection
   - Try more specific comments
   - Restart VS Code

2. **Styles Not Matching Figma**:
   - Verify exact color values
   - Check unit measurements (px, rem)
   - Inspect computed styles in browser
   - Compare with Figma Dev Mode

3. **Components Not Rendering**:
   - Check import statements
   - Verify file paths
   - Look for console errors
   - Ensure props are passed correctly

4. **Responsive Issues**:
   - Test at exact breakpoints
   - Use browser dev tools
   - Check media query syntax
   - Verify viewport meta tag

### Resources for Continued Learning

1. **Documentation**:
   - [React Documentation](https://react.dev)
   - [GitHub Copilot Guide](https://docs.github.com/copilot)
   - [Figma Developer Documentation](https://www.figma.com/developers)

2. **Design Systems**:
   - [Material Design](https://material.io)
   - [Ant Design](https://ant.design)
   - [Chakra UI](https://chakra-ui.com)

3. **Community**:
   - [Dev.to Design Systems](https://dev.to/t/designsystems)
   - [Figma Community](https://www.figma.com/community)
   - [React Discord](https://discord.gg/react)

---

## Ready for More?

You've completed the Basic Workshop! To continue your journey:

- **Part 3**: Intermediate Workshop - Advanced Figma features, component libraries, and design systems
- **Part 4**: Advanced Workshop Part 1 - MCP Server integration and GitHub Agent automation
- **Part 5**: Advanced Workshop Part 2 - Azure AI Foundry and enterprise-scale automation

Each subsequent workshop builds on these foundations to create increasingly sophisticated design-to-code workflows.