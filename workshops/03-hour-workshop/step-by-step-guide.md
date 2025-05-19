# 📋 Comprehensive Guide: 3-Hour Figma to Code Workshop

This detailed guide provides step-by-step instructions for participants of the 3-hour Figma to Code workshop, including all prerequisites, free access options, and detailed instructions for each exercise.

## Prerequisites Checklist

### Required Software (All Free Options Available)
- **VS Code**: [Download](https://code.visualstudio.com/download) (Free)
- **Node.js**: [Download](https://nodejs.org/) (Version 14.x or higher recommended, Free)
- **Git**: [Download](https://git-scm.com/downloads) (Free)
- **Figma**: [Sign up](https://www.figma.com/signup) (Free tier sufficient)

### Required Accounts
- **GitHub Account**: [Sign up](https://github.com/signup) (Free)
- **GitHub Copilot Access**: 
  - Free options:
    - 30-day free trial for new users
    - Free for verified students through [GitHub Student Developer Pack](https://education.github.com/pack)
    - Free for verified teachers through [GitHub Campus Program](https://education.github.com/teachers)
  - Alternative (if Copilot isn't available): Use provided code snippets in the repository

### VS Code Extensions
- [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) (Requires subscription or free trial)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) (Free)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (Free)
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) (Free browser extension)

## Setup Instructions (Before Workshop)

### 1. Clone the Workshop Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/design-to-code-playbook.git
cd design-to-code-playbook/workshops/03-hour-workshop
```

### 2. Install Dependencies

```bash
# Navigate to starter code
cd starter-code

# Install dependencies
npm install
```

### 3. Verify the Setup

```bash
# Start the development server
npm start
```
The browser should open to `http://localhost:3000` showing a basic starter page.

### 4. Access the Figma File

1. Go to: [https://www.figma.com/community/file/1234567890/Design-System-Workshop](https://www.figma.com/community/file/1234567890/Design-System-Workshop)
2. Click "Duplicate" to create your own editable copy
3. If the link doesn't work, use the provided `assets/design-system.fig` file:
   - Open Figma
   - Click "Import file" and select the .fig file

## Workshop Structure Overview

### Part 1: Introduction and Setup (15 minutes)
- Workshop overview and objectives
- Environment verification
- Project structure overview
- Figma file walkthrough

### Part 2: Figma Design Analysis (30 minutes)
- Analyzing the design system
- Identifying components and variants
- Understanding responsive behavior
- Planning the component architecture
- Design token extraction strategy

### Part 3: Building Component Architecture (45 minutes)
- Exercise 1: Setting up the design token system
- Exercise 2: Creating the Button component
- Exercise 3: Building the Card component
- Exercise 4: Implementing form elements

### Part 4: Styling and Responsive Behavior (45 minutes)
- Exercise 5: Implementing component styles
- Exercise 6: Adding responsive behavior
- Exercise 7: Creating theme variations
- Exercise 8: Optimizing for different devices

### Part 5: Interactivity and State (30 minutes)
- Exercise 9: Adding component interactions
- Exercise 10: Implementing state management
- Exercise 11: Handling user input
- Exercise 12: Creating interactive patterns

### Part 6: Review and Next Steps (15 minutes)
- Code review and feedback
- Performance and accessibility considerations
- Additional resources and learning paths
- Q&A session

## Part 1: Introduction and Setup (00:00-00:15)

### Welcome and Overview

1. **Introduction to the Workshop**:
   - Purpose: Learn to convert Figma designs into a complete component library
   - Focus: Design system implementation with React and TypeScript
   - Outcome: A reusable component library with multiple components

2. **Technical Setup Verification**:
   - Ensure VS Code is open with the starter code
   - Verify all participants have the development server running
   - Confirm access to the Figma design file
   - Check GitHub Copilot functionality

3. **Project Structure Overview**:
   The starter code includes the following structure:

   ```
   starter-code/
   ├── public/
   ├── src/
   │   ├── components/  (Empty - where we'll build our components)
   │   ├── tokens/      (Empty - where we'll define design tokens)
   │   ├── App.js
   │   ├── index.js
   │   └── index.css
   ├── package.json
   └── README.md
   ```

4. **Workshop Goals**:
   - Extract and implement a design token system
   - Build 5+ components based on the Figma design
   - Create responsive and accessible components
   - Implement theme support (light/dark)
   - Learn efficient component development techniques

## Part 2: Figma Design Analysis (00:15-00:45)

### Analyzing the Design System

1. **Explore the Figma File**:
   - Open the workshop Figma file
   - Navigate to the "Design System" page
   - Review the component structure and organization

2. **Identify Design Patterns**:
   The design system includes the following components:
   - Typography system (headings, body text, etc.)
   - Color palette (primary, secondary, neutrals)
   - Spacing system
   - Buttons (multiple variants and states)
   - Cards (multiple variants)
   - Input fields (text, select, checkbox, radio)
   - Navigation components
   - Layout patterns

3. **Component Variants Analysis**:
   For each component, note:
   - Primary variants (e.g., primary, secondary, outlined buttons)
   - State variations (default, hover, active, disabled)
   - Responsive behavior

4. **Define Component Hierarchy**:
   Plan the component architecture:
   ```
   Design System
   ├── Tokens
   │   ├── Colors
   │   ├── Typography
   │   ├── Spacing
   │   └── Shadows
   ├── Atoms
   │   ├── Button
   │   ├── Input
   │   ├── Checkbox
   │   └── Radio
   ├── Molecules
   │   ├── Card
   │   ├── Form Field
   │   └── Navigation Item
   └── Organisms
       ├── Form
       ├── Navigation
       └── Header
   ```

5. **Design Token Extraction Plan**:
   - Identify all colors used in the design
   - Document typography styles (font families, sizes, weights)
   - Note spacing patterns and measurements
   - Document shadow styles and effects
   - Plan for theme variation support

## Part 3: Building Component Architecture (00:45-01:30)

### Exercise 1: Setting Up the Design Token System (15 minutes)

1. **Create Token Directory Structure**:
   ```bash
   # In VS Code terminal (in starter-code directory)
   mkdir -p src/tokens
   touch src/tokens/colors.ts src/tokens/typography.ts src/tokens/spacing.ts src/tokens/shadows.ts src/tokens/index.ts
   ```

2. **Extract Color Tokens**:
   - Open `src/tokens/colors.ts`
   - Add the following code:

   ```typescript
   // src/tokens/colors.ts
   export const colors = {
     primary: {
       50: '#E3F2FD',
       100: '#BBDEFB',
       200: '#90CAF9',
       300: '#64B5F6',
       400: '#42A5F5',
       500: '#2196F3',
       600: '#1E88E5',
       700: '#1976D2',
       800: '#1565C0',
       900: '#0D47A1',
     },
     secondary: {
       50: '#E8F5E9',
       100: '#C8E6C9',
       200: '#A5D6A7',
       300: '#81C784',
       400: '#66BB6A',
       500: '#4CAF50',
       600: '#43A047',
       700: '#388E3C',
       800: '#2E7D32',
       900: '#1B5E20',
     },
     neutral: {
       50: '#FAFAFA',
       100: '#F5F5F5',
       200: '#EEEEEE',
       300: '#E0E0E0',
       400: '#BDBDBD',
       500: '#9E9E9E',
       600: '#757575',
       700: '#616161',
       800: '#424242',
       900: '#212121',
     },
     feedback: {
       success: '#4CAF50',
       warning: '#FFC107',
       error: '#F44336',
       info: '#2196F3',
     },
   };
   ```

3. **Extract Typography Tokens**:
   - Open `src/tokens/typography.ts`
   - Add the following code:

   ```typescript
   // src/tokens/typography.ts
   export const typography = {
     fontFamily: {
       primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
       code: '"SF Mono", "Roboto Mono", Menlo, monospace',
     },
     fontWeight: {
       regular: 400,
       medium: 500,
       semibold: 600,
       bold: 700,
     },
     fontSize: {
       xs: '0.75rem',    // 12px
       sm: '0.875rem',   // 14px
       md: '1rem',       // 16px
       lg: '1.125rem',   // 18px
       xl: '1.25rem',    // 20px
       '2xl': '1.5rem',  // 24px
       '3xl': '1.875rem', // 30px
       '4xl': '2.25rem',  // 36px
       '5xl': '3rem',     // 48px
     },
     lineHeight: {
       tight: 1.25,
       normal: 1.5,
       relaxed: 1.75,
     },
     letterSpacing: {
       tighter: '-0.05em',
       tight: '-0.025em',
       normal: '0',
       wide: '0.025em',
       wider: '0.05em',
     },
   };
   ```

4. **Extract Spacing Tokens**:
   - Open `src/tokens/spacing.ts`
   - Add the following code:

   ```typescript
   // src/tokens/spacing.ts
   export const spacing = {
     '0': '0',
     '1': '0.25rem',  // 4px
     '2': '0.5rem',   // 8px
     '3': '0.75rem',  // 12px
     '4': '1rem',     // 16px
     '5': '1.25rem',  // 20px
     '6': '1.5rem',   // 24px
     '8': '2rem',     // 32px
     '10': '2.5rem',  // 40px
     '12': '3rem',    // 48px
     '16': '4rem',    // 64px
     '20': '5rem',    // 80px
     '24': '6rem',    // 96px
   };
   ```

5. **Extract Shadow Tokens**:
   - Open `src/tokens/shadows.ts`
   - Add the following code:

   ```typescript
   // src/tokens/shadows.ts
   export const shadows = {
     xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
     sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
     md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
     lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
     xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
     '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
     inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
     outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
     none: 'none',
   };
   ```

6. **Create Index File**:
   - Open `src/tokens/index.ts`
   - Add the following code:

   ```typescript
   // src/tokens/index.ts
   export * from './colors';
   export * from './typography';
   export * from './spacing';
   export * from './shadows';
   ```

7. **Create CSS Variables**:
   - Create a new file `src/tokens/variables.css`:
   ```bash
   touch src/tokens/variables.css
   ```
   
   - Add the following code:
   ```css
   /* src/tokens/variables.css */
   :root {
     /* Colors - Primary */
     --color-primary-50: #E3F2FD;
     --color-primary-100: #BBDEFB;
     --color-primary-200: #90CAF9;
     --color-primary-300: #64B5F6;
     --color-primary-400: #42A5F5;
     --color-primary-500: #2196F3;
     --color-primary-600: #1E88E5;
     --color-primary-700: #1976D2;
     --color-primary-800: #1565C0;
     --color-primary-900: #0D47A1;
     
     /* Colors - Secondary */
     --color-secondary-50: #E8F5E9;
     --color-secondary-100: #C8E6C9;
     --color-secondary-200: #A5D6A7;
     --color-secondary-300: #81C784;
     --color-secondary-400: #66BB6A;
     --color-secondary-500: #4CAF50;
     --color-secondary-600: #43A047;
     --color-secondary-700: #388E3C;
     --color-secondary-800: #2E7D32;
     --color-secondary-900: #1B5E20;
     
     /* Colors - Neutral */
     --color-neutral-50: #FAFAFA;
     --color-neutral-100: #F5F5F5;
     --color-neutral-200: #EEEEEE;
     --color-neutral-300: #E0E0E0;
     --color-neutral-400: #BDBDBD;
     --color-neutral-500: #9E9E9E;
     --color-neutral-600: #757575;
     --color-neutral-700: #616161;
     --color-neutral-800: #424242;
     --color-neutral-900: #212121;
     
     /* Colors - Feedback */
     --color-success: #4CAF50;
     --color-warning: #FFC107;
     --color-error: #F44336;
     --color-info: #2196F3;
     
     /* Typography */
     --font-family-primary: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
     --font-family-code: "SF Mono", "Roboto Mono", Menlo, monospace;
     
     /* Font Weights */
     --font-weight-regular: 400;
     --font-weight-medium: 500;
     --font-weight-semibold: 600;
     --font-weight-bold: 700;
     
     /* Font Sizes */
     --font-size-xs: 0.75rem;
     --font-size-sm: 0.875rem;
     --font-size-md: 1rem;
     --font-size-lg: 1.125rem;
     --font-size-xl: 1.25rem;
     --font-size-2xl: 1.5rem;
     --font-size-3xl: 1.875rem;
     --font-size-4xl: 2.25rem;
     --font-size-5xl: 3rem;
     
     /* Spacing */
     --spacing-0: 0;
     --spacing-1: 0.25rem;
     --spacing-2: 0.5rem;
     --spacing-3: 0.75rem;
     --spacing-4: 1rem;
     --spacing-5: 1.25rem;
     --spacing-6: 1.5rem;
     --spacing-8: 2rem;
     --spacing-10: 2.5rem;
     --spacing-12: 3rem;
     --spacing-16: 4rem;
     --spacing-20: 5rem;
     --spacing-24: 6rem;
     
     /* Shadows */
     --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
     --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
     --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
     --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
     --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
     --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
     --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
     --shadow-outline: 0 0 0 3px rgba(66, 153, 225, 0.5);
     --shadow-none: none;
   }
   ```

8. **Import CSS Variables**:
   - Open `src/index.js`
   - Add the import at the top:
   ```javascript
   import './tokens/variables.css';
   ```

### Exercise 2: Creating the Button Component (15 minutes)

1. **Create Component Files**:
   ```bash
   mkdir -p src/components/Button
   touch src/components/Button/Button.tsx src/components/Button/Button.css src/components/Button/index.ts
   ```

2. **Define the Button Component**:
   - Open `src/components/Button/Button.tsx`
   - Add the following code:

   ```tsx
   import React from 'react';
   import './Button.css';

   export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'text';
   export type ButtonSize = 'small' | 'medium' | 'large';

   export interface ButtonProps {
     /**
      * The content of the button
      */
     children: React.ReactNode;
     
     /**
      * The visual style of the button
      */
     variant?: ButtonVariant;
     
     /**
      * The size of the button
      */
     size?: ButtonSize;
     
     /**
      * Whether the button is disabled
      */
     disabled?: boolean;
     
     /**
      * Callback fired when the button is clicked
      */
     onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
     
     /**
      * The icon to display before the button text
      */
     startIcon?: React.ReactNode;
     
     /**
      * The icon to display after the button text
      */
     endIcon?: React.ReactNode;
     
     /**
      * Whether the button should take up the full width of its container
      */
     fullWidth?: boolean;
     
     /**
      * Additional CSS class for the button
      */
     className?: string;
     
     /**
      * Type of the button
      */
     type?: 'button' | 'submit' | 'reset';
   }

   export const Button: React.FC<ButtonProps> = ({
     children,
     variant = 'primary',
     size = 'medium',
     disabled = false,
     onClick,
     startIcon,
     endIcon,
     fullWidth = false,
     className = '',
     type = 'button',
     ...rest
   }) => {
     return (
       <button
         type={type}
         className={`
           button 
           button--${variant} 
           button--${size}
           ${fullWidth ? 'button--full-width' : ''}
           ${className}
         `}
         disabled={disabled}
         onClick={onClick}
         {...rest}
       >
         {startIcon && <span className="button__icon button__icon--start">{startIcon}</span>}
         <span className="button__text">{children}</span>
         {endIcon && <span className="button__icon button__icon--end">{endIcon}</span>}
       </button>
     );
   };
   ```

3. **Create Button Styles**:
   - Open `src/components/Button/Button.css`
   - Add the following code:

   ```css
   .button {
     display: inline-flex;
     align-items: center;
     justify-content: center;
     border-radius: 4px;
     font-family: var(--font-family-primary);
     font-weight: var(--font-weight-medium);
     cursor: pointer;
     transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
     border: none;
     outline: none;
     line-height: 1;
     text-decoration: none;
     user-select: none;
   }

   /* Size Variants */
   .button--small {
     padding: 0.5rem 1rem;
     font-size: var(--font-size-sm);
     gap: 0.25rem;
   }

   .button--medium {
     padding: 0.75rem 1.5rem;
     font-size: var(--font-size-md);
     gap: 0.5rem;
   }

   .button--large {
     padding: 1rem 2rem;
     font-size: var(--font-size-lg);
     gap: 0.5rem;
   }

   /* Style Variants */
   .button--primary {
     background-color: var(--color-primary-500);
     color: white;
   }

   .button--primary:hover:not(:disabled) {
     background-color: var(--color-primary-600);
   }

   .button--primary:active:not(:disabled) {
     background-color: var(--color-primary-700);
   }

   .button--secondary {
     background-color: var(--color-secondary-500);
     color: white;
   }

   .button--secondary:hover:not(:disabled) {
     background-color: var(--color-secondary-600);
   }

   .button--secondary:active:not(:disabled) {
     background-color: var(--color-secondary-700);
   }

   .button--outlined {
     background-color: transparent;
     color: var(--color-primary-500);
     border: 1px solid var(--color-primary-500);
   }

   .button--outlined:hover:not(:disabled) {
     background-color: rgba(33, 150, 243, 0.08);
   }

   .button--outlined:active:not(:disabled) {
     background-color: rgba(33, 150, 243, 0.16);
   }

   .button--text {
     background-color: transparent;
     color: var(--color-primary-500);
   }

   .button--text:hover:not(:disabled) {
     background-color: rgba(33, 150, 243, 0.08);
   }

   .button--text:active:not(:disabled) {
     background-color: rgba(33, 150, 243, 0.16);
   }

   /* States */
   .button:disabled {
     opacity: 0.6;
     cursor: not-allowed;
   }

   .button:focus-visible {
     box-shadow: var(--shadow-outline);
   }

   /* Width */
   .button--full-width {
     width: 100%;
   }

   /* Icons */
   .button__icon {
     display: inline-flex;
     align-items: center;
     justify-content: center;
   }

   .button__icon svg {
     width: 1em;
     height: 1em;
   }
   ```

4. **Create Export File**:
   - Open `src/components/Button/index.ts`
   - Add the following code:

   ```typescript
   export { Button } from './Button';
   export type { ButtonProps, ButtonVariant, ButtonSize } from './Button';
   ```

5. **Use Button in App**:
   - Open `src/App.js`
   - Update it to use the Button component:

   ```jsx
   import React from 'react';
   import { Button } from './components/Button';
   import './App.css';

   function App() {
     return (
       <div className="app">
         <h1>Design System Components</h1>
         
         <section className="component-section">
           <h2>Buttons</h2>
           
           <div className="component-demo">
             <h3>Variants</h3>
             <div className="component-row">
               <Button variant="primary">Primary</Button>
               <Button variant="secondary">Secondary</Button>
               <Button variant="outlined">Outlined</Button>
               <Button variant="text">Text</Button>
             </div>
             
             <h3>Sizes</h3>
             <div className="component-row">
               <Button size="small">Small</Button>
               <Button size="medium">Medium</Button>
               <Button size="large">Large</Button>
             </div>
             
             <h3>States</h3>
             <div className="component-row">
               <Button>Default</Button>
               <Button disabled>Disabled</Button>
             </div>
           </div>
         </section>
       </div>
     );
   }

   export default App;
   ```

6. **Add Basic App Styles**:
   - Create/update `src/App.css`:
   ```css
   .app {
     max-width: 1200px;
     margin: 0 auto;
     padding: 2rem;
     font-family: var(--font-family-primary);
   }

   h1 {
     margin-bottom: 2rem;
     font-weight: var(--font-weight-bold);
   }

   h2 {
     margin-bottom: 1.5rem;
     font-weight: var(--font-weight-semibold);
   }

   h3 {
     margin-bottom: 1rem;
     font-weight: var(--font-weight-medium);
   }

   .component-section {
     margin-bottom: 3rem;
   }

   .component-demo {
     padding: 1.5rem;
     border: 1px solid var(--color-neutral-200);
     border-radius: 8px;
   }

   .component-row {
     display: flex;
     flex-wrap: wrap;
     gap: 1rem;
     margin-bottom: 2rem;
   }
   ```

### Exercise 3: Building the Card Component (15 minutes)

1. **Create Card Component Files**:
   ```bash
   mkdir -p src/components/Card
   touch src/components/Card/Card.tsx src/components/Card/Card.css src/components/Card/index.ts
   ```

2. **Define the Card Component**:
   - Open `src/components/Card/Card.tsx`
   - Add the following code:

   ```tsx
   import React from 'react';
   import './Card.css';

   export type CardVariant = 'default' | 'elevated' | 'outlined';

   export interface CardProps {
     /**
      * The content of the card
      */
     children: React.ReactNode;
     
     /**
      * The title of the card
      */
     title?: string;
     
     /**
      * The visual style of the card
      */
     variant?: CardVariant;
     
     /**
      * Optional image URL to display at the top of the card
      */
     imageUrl?: string;
     
     /**
      * Optional alt text for the image
      */
     imageAlt?: string;
     
     /**
      * Optional footer content
      */
     footer?: React.ReactNode;
     
     /**
      * Additional CSS class for the card
      */
     className?: string;
     
     /**
      * Callback fired when the card is clicked
      */
     onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
   }

   export const Card: React.FC<CardProps> = ({
     children,
     title,
     variant = 'default',
     imageUrl,
     imageAlt = '',
     footer,
     className = '',
     onClick,
     ...rest
   }) => {
     const isClickable = !!onClick;
     
     return (
       <div
         className={`
           card 
           card--${variant} 
           ${isClickable ? 'card--clickable' : ''} 
           ${className}
         `}
         onClick={onClick}
         role={isClickable ? 'button' : undefined}
         tabIndex={isClickable ? 0 : undefined}
         {...rest}
       >
         {imageUrl && (
           <div className="card__image-container">
             <img src={imageUrl} alt={imageAlt} className="card__image" />
           </div>
         )}
         
         <div className="card__content">
           {title && <h3 className="card__title">{title}</h3>}
           <div className="card__body">{children}</div>
         </div>
         
         {footer && <div className="card__footer">{footer}</div>}
       </div>
     );
   };
   ```

3. **Create Card Styles**:
   - Open `src/components/Card/Card.css`
   - Add the following code:

   ```css
   .card {
     border-radius: 8px;
     overflow: hidden;
     background-color: white;
     transition: all 0.2s ease-in-out;
   }

   /* Variants */
   .card--default {
     border: 1px solid var(--color-neutral-300);
   }

   .card--elevated {
     box-shadow: var(--shadow-md);
     border: none;
   }

   .card--outlined {
     border: 2px solid var(--color-primary-500);
   }

   /* Image */
   .card__image-container {
     width: 100%;
     height: 200px;
     overflow: hidden;
   }

   .card__image {
     width: 100%;
     height: 100%;
     object-fit: cover;
   }

   /* Content */
   .card__content {
     padding: var(--spacing-6);
   }

   .card__title {
     margin: 0 0 var(--spacing-4) 0;
     font-family: var(--font-family-primary);
     font-size: var(--font-size-xl);
     font-weight: var(--font-weight-semibold);
     color: var(--color-neutral-900);
   }

   .card__body {
     color: var(--color-neutral-700);
     line-height: var(--line-height-normal);
   }

   /* Footer */
   .card__footer {
     padding: var(--spacing-4) var(--spacing-6);
     border-top: 1px solid var(--color-neutral-200);
     display: flex;
     justify-content: flex-end;
     gap: var(--spacing-2);
   }

   /* Clickable state */
   .card--clickable {
     cursor: pointer;
   }

   .card--clickable:hover {
     transform: translateY(-4px);
   }

   .card--default.card--clickable:hover {
     box-shadow: var(--shadow-sm);
   }

   .card--elevated.card--clickable:hover {
     box-shadow: var(--shadow-lg);
   }

   .card--outlined.card--clickable:hover {
     background-color: var(--color-primary-50);
   }

   /* Responsive behavior */
   @media (max-width: 768px) {
     .card__content {
       padding: var(--spacing-4);
     }
     
     .card__footer {
       padding: var(--spacing-3) var(--spacing-4);
     }
     
     .card__title {
       font-size: var(--font-size-lg);
     }
   }
   ```

4. **Create Export File**:
   - Open `src/components/Card/index.ts`
   - Add the following code:

   ```typescript
   export { Card } from './Card';
   export type { CardProps, CardVariant } from './Card';
   ```

5. **Update App to Add Card Examples**:
   - Open `src/App.js`
   - Add card examples:

   ```jsx
   import React from 'react';
   import { Button } from './components/Button';
   import { Card } from './components/Card';
   import './App.css';

   function App() {
     return (
       <div className="app">
         <h1>Design System Components</h1>
         
         <section className="component-section">
           <h2>Cards</h2>
           
           <div className="card-grid">
             <Card 
               title="Default Card" 
               variant="default"
               footer={<Button size="small">Learn More</Button>}
             >
               This is a default card with standard styling and a footer with a button.
             </Card>
             
             <Card 
               title="Elevated Card" 
               variant="elevated"
               imageUrl="https://via.placeholder.com/600x400"
               imageAlt="Placeholder image"
             >
               This elevated card has a shadow effect and includes an image.
             </Card>
             
             <Card 
               title="Outlined Card" 
               variant="outlined"
               onClick={() => alert('Card clicked!')}
             >
               This is an outlined card with a colored border. It's also clickable!
             </Card>
           </div>
         </section>
       </div>
     );
   }

   export default App;
   ```

6. **Add Card Grid Styles to App.css**:
   ```css
   .card-grid {
     display: grid;
     grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
     gap: var(--spacing-6);
   }

   @media (max-width: 768px) {
     .card-grid {
       grid-template-columns: 1fr;
     }
   }
   ```

## Part 4: Styling and Responsive Behavior (01:30-02:15)

### Exercise 5: Creating a Dark Theme (20 minutes)

1. **Create Theme Variables**:
   - Open `src/tokens/variables.css`
   - Add dark theme variables:

   ```css
   /* Add this to the existing variables.css file */
   
   /* Dark theme variables */
   [data-theme="dark"] {
     /* Colors - Background & Text */
     --background-primary: var(--color-neutral-900);
     --background-secondary: var(--color-neutral-800);
     --text-primary: var(--color-neutral-100);
     --text-secondary: var(--color-neutral-300);
     --border-color: var(--color-neutral-700);
     
     /* Component specific */
     --card-background: var(--color-neutral-800);
     --button-text-on-primary: white;
   }
   
   /* Light theme variables (default) */
   :root {
     /* Colors - Background & Text */
     --background-primary: white;
     --background-secondary: var(--color-neutral-100);
     --text-primary: var(--color-neutral-900);
     --text-secondary: var(--color-neutral-700);
     --border-color: var(--color-neutral-300);
     
     /* Component specific */
     --card-background: white;
     --button-text-on-primary: white;
   }
   ```

2. **Create Theme Toggle Component**:
   ```bash
   mkdir -p src/components/ThemeToggle
   touch src/components/ThemeToggle/ThemeToggle.tsx src/components/ThemeToggle/ThemeToggle.css src/components/ThemeToggle/index.ts
   ```

3. **Implement Theme Toggle**:
   - Open `src/components/ThemeToggle/ThemeToggle.tsx`
   - Add:

   ```tsx
   import React from 'react';
   import './ThemeToggle.css';

   export interface ThemeToggleProps {
     /**
      * Current theme
      */
     theme: 'light' | 'dark';
     
     /**
      * Callback to change theme
      */
     onToggle: () => void;
     
     /**
      * Additional CSS class
      */
     className?: string;
   }

   export const ThemeToggle: React.FC<ThemeToggleProps> = ({
     theme,
     onToggle,
     className = '',
   }) => {
     return (
       <button 
         className={`theme-toggle ${className}`}
         onClick={onToggle}
         aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
       >
         {theme === 'light' ? '🌙' : '☀️'}
       </button>
     );
   };
   ```

4. **Add Toggle Styles**:
   - Open `src/components/ThemeToggle/ThemeToggle.css`
   - Add:

   ```css
   .theme-toggle {
     background-color: transparent;
     border: 1px solid var(--border-color);
     border-radius: 50%;
     width: 40px;
     height: 40px;
     display: flex;
     align-items: center;
     justify-content: center;
     font-size: 20px;
     cursor: pointer;
     transition: background-color 0.2s;
   }

   .theme-toggle:hover {
     background-color: var(--background-secondary);
   }
   ```

5. **Create Export File**:
   - Open `src/components/ThemeToggle/index.ts`
   - Add:

   ```typescript
   export { ThemeToggle } from './ThemeToggle';
   export type { ThemeToggleProps } from './ThemeToggle';
   ```

6. **Update App to Support Themes**:
   - Open `src/App.js`
   - Update to include theme toggling:

   ```jsx
   import React, { useState, useEffect } from 'react';
   import { Button } from './components/Button';
   import { Card } from './components/Card';
   import { ThemeToggle } from './components/ThemeToggle';
   import './App.css';

   function App() {
     const [theme, setTheme] = useState('light');
     
     // Toggle theme function
     const toggleTheme = () => {
       const newTheme = theme === 'light' ? 'dark' : 'light';
       setTheme(newTheme);
       document.documentElement.setAttribute('data-theme', newTheme);
     };
     
     // Set initial theme
     useEffect(() => {
       document.documentElement.setAttribute('data-theme', theme);
     }, []);
     
     return (
       <div className="app">
         <header className="app-header">
           <h1>Design System Components</h1>
           <ThemeToggle theme={theme} onToggle={toggleTheme} />
         </header>
         
         <section className="component-section">
           <h2>Cards</h2>
           
           <div className="card-grid">
             <Card 
               title="Default Card" 
               variant="default"
               footer={<Button size="small">Learn More</Button>}
             >
               This is a default card with standard styling and a footer with a button.
             </Card>
             
             <Card 
               title="Elevated Card" 
               variant="elevated"
               imageUrl="https://via.placeholder.com/600x400"
               imageAlt="Placeholder image"
             >
               This elevated card has a shadow effect and includes an image.
             </Card>
             
             <Card 
               title="Outlined Card" 
               variant="outlined"
               onClick={() => alert('Card clicked!')}
             >
               This is an outlined card with a colored border. It's also clickable!
             </Card>
           </div>
         </section>
       </div>
     );
   }

   export default App;
   ```

7. **Update App.css for Theme Support**:
   ```css
   /* Add this to App.css */
   body {
     background-color: var(--background-primary);
     color: var(--text-primary);
     transition: background-color 0.3s ease, color 0.3s ease;
   }

   .app {
     max-width: 1200px;
     margin: 0 auto;
     padding: 2rem;
     font-family: var(--font-family-primary);
   }

   .app-header {
     display: flex;
     justify-content: space-between;
     align-items: center;
     margin-bottom: 2rem;
   }

   h1, h2, h3 {
     color: var(--text-primary);
     transition: color 0.3s ease;
   }

   .component-demo {
     background-color: var(--background-secondary);
     border: 1px solid var(--border-color);
     transition: background-color 0.3s ease, border-color 0.3s ease;
   }
   ```

8. **Update Component Styles for Theme Support**:
   - Open `src/components/Card/Card.css`
   - Update card styles:

   ```css
   /* Update these rules in Card.css */
   .card {
     border-radius: 8px;
     overflow: hidden;
     background-color: var(--card-background);
     transition: all 0.2s ease-in-out, background-color 0.3s ease;
   }

   .card--default {
     border: 1px solid var(--border-color);
   }

   .card__title {
     color: var(--text-primary);
   }

   .card__body {
     color: var(--text-secondary);
   }

   .card__footer {
     border-top: 1px solid var(--border-color);
   }
   ```

### Exercise 6: Creating Form Elements (25 minutes)

1. **Create Input Component**:
   ```bash
   mkdir -p src/components/Input
   touch src/components/Input/Input.tsx src/components/Input/Input.css src/components/Input/index.ts
   ```

2. **Implement Input Component**:
   - Build a text input component with label, error state, and helper text
   - Implement responsive behavior
   - Support dark/light theme

3. **Create Select Component**:
   ```bash
   mkdir -p src/components/Select
   touch src/components/Select/Select.tsx src/components/Select/Select.css src/components/Select/index.ts
   ```

4. **Implement Select Component**:
   - Build a select dropdown with similar features to the Input component
   - Support different states (default, disabled, error)
   - Implement responsive behavior

## Part 5: Interactivity and State (02:15-02:45)

### Exercise 9: Building a Complete Form

1. **Create Form Component**:
   ```bash
   mkdir -p src/components/Form
   touch src/components/Form/Form.tsx src/components/Form/Form.css src/components/Form/index.ts
   ```

2. **Implement Form with Validation**:
   - Build a contact form with multiple fields
   - Implement form validation
   - Show error states and messages
   - Create submit handling

### Exercise 10: Creating an Interactive Modal

1. **Create Modal Component**:
   ```bash
   mkdir -p src/components/Modal
   touch src/components/Modal/Modal.tsx src/components/Modal/Modal.css src/components/Modal/index.ts
   ```

2. **Implement Modal Component**:
   - Create a modal with open/close functionality
   - Add animations for enter/exit
   - Include backdrop and focus management
   - Make it accessible

## Part 6: Review and Next Steps (02:45-03:00)

### Workshop Completion

1. **Code Review**:
   - Review component implementation
   - Discuss best practices used
   - Identify areas for improvement

2. **Component Library Structure**:
   - Discuss organization of the library
   - Review export patterns
   - Consider documentation approaches

3. **Next Steps**:
   - Explore additional components to build
   - Learn about component testing
   - Consider publishing as an NPM package
   - Add Storybook documentation

4. **Additional Resources**:
   - React documentation: [https://react.dev/](https://react.dev/)
   - Design systems examples:
     - Material UI: [https://mui.com/](https://mui.com/)
     - Chakra UI: [https://chakra-ui.com/](https://chakra-ui.com/)
     - Ant Design: [https://ant.design/](https://ant.design/)
   - Component documentation with Storybook: [https://storybook.js.org/](https://storybook.js.org/)

## Troubleshooting Guide

### Common Setup Issues

1. **Node Version Incompatibility**:
   - Error: "The engine "node" is incompatible with this module."
   - Solution: Install Node.js version 14.x or higher
   - Command to check version: `node --version`

2. **Package Installation Failures**:
   - Solution 1: Check internet connection
   - Solution 2: Clear npm cache: `npm cache clean --force`
   - Solution 3: Try using a different npm registry:
     ```bash
     npm config set registry https://registry.npmjs.org/
     npm install
     ```

3. **TypeScript Compilation Errors**:
   - Solution 1: Check for missing type definitions
   - Solution 2: Verify TypeScript version compatibility
   - Solution 3: Run `npm install --save-dev @types/react @types/react-dom`

### Browser Compatibility Issues

1. **CSS Variables Not Working**:
   - Issue: Styles not applying correctly in older browsers
   - Solution: Consider adding a CSS variables polyfill for IE11 support
   - Alternative: Use a preprocessor like SCSS with fallbacks

2. **React Dev Tools Not Connecting**:
   - Issue: Component hierarchy not visible in browser extensions
   - Solution 1: Ensure React Developer Tools extension is installed and enabled
   - Solution 2: Check for any Content Security Policy (CSP) blocking extensions

## Conclusion

By completing this workshop, you've built a foundational design system with React components that are:
- Consistent with design tokens
- Responsive across devices
- Themable (light/dark)
- Accessible
- Reusable across projects

Continue expanding your component library by adding more components, improving accessibility, and creating comprehensive documentation.
   