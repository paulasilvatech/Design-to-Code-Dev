# 📋 Step-by-Step Guide: 1-Hour Figma to Code Demo Session

This comprehensive guide provides detailed instructions for participants to follow along with the 1-hour Figma to Code demo session, including all prerequisites, free access options, and step-by-step instructions.

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
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (Free)

## Setup Instructions (Before Demo)

### 1. Clone the Demo Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/design-to-code-playbook.git
cd design-to-code-playbook/demos/01-hour-session
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

1. Go to: [https://www.figma.com/community/file/1234567890/Design-to-Code-Demo](https://www.figma.com/community/file/1234567890/Design-to-Code-Demo)
2. Click "Duplicate" to create your own editable copy
3. If the link doesn't work, use the provided `figma-assets/card-component.fig` file:
   - Open Figma
   - Click "Import file" and select the .fig file

## Step-by-Step Demo Guide

### 00:00-05:00: Introduction

1. **Start the presentation**:
   - Open `slides/intro.pdf` to show introduction slides
   - Alternatively, use the key points below:

2. **Key Introduction Points**:
   - Purpose: Convert Figma designs to production-ready React components
   - Focus: Card component with variants and states
   - Tools: Figma, VS Code, GitHub Copilot
   - Outcome: Functional, responsive, accessible component

3. **Technical Setup Check**:
   - VS Code is open with the starter-code folder
   - Terminal is ready with development server running
   - Figma file is open with the Card component design

### 05:00-15:00: Figma Design Analysis

1. **Open the Figma File**:
   - Navigate to the "Card Component" page
   - Click on the Card component to see variants

2. **Analyze Component Structure**:
   ```
   Card Component
   ├── Header (optional)
   │   ├── Image (optional)
   │   └── Title
   ├── Body
   │   └── Content
   └── Footer (optional)
       └── Actions
   ```

3. **Identify Variants**:
   - Default: simple border, white background
   - Elevated: box shadow, white background
   - Outlined: colored border, white background

4. **Note Responsive Behavior**:
   - Desktop (>1024px): Normal padding (24px)
   - Tablet (768px-1024px): Medium padding (16px)
   - Mobile (<768px): Small padding (12px)

5. **Use Figma Inspection Tools**:
   - Right-click on the Card > "Inspect"
   - Note CSS properties, colors, typography, spacing
   - Click different variants to see their properties

### 15:00-25:00: Design Token Extraction

1. **Create Token Directory Structure**:
   ```bash
   # In VS Code terminal (in starter-code directory)
   mkdir -p src/tokens
   touch src/tokens/colors.js src/tokens/typography.js src/tokens/spacing.js src/tokens/shadows.js src/tokens/index.js
   ```

2. **Extract Color Tokens**:
   - Open `src/tokens/colors.js`
   - Add the following code:

   ```javascript
   // src/tokens/colors.js
   export const colors = {
     primary: {
       50: '#E3F2FD',
       100: '#BBDEFB',
       500: '#2196F3',
       700: '#1976D2',
       900: '#0D47A1',
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
     success: '#4CAF50',
     warning: '#FFC107',
     error: '#F44336',
   };
   ```

3. **Extract Typography Tokens**:
   - Open `src/tokens/typography.js`
   - Add the following code:

   ```javascript
   // src/tokens/typography.js
   export const typography = {
     fontFamily: {
       primary: '"Inter", sans-serif',
       secondary: '"Roboto", sans-serif',
     },
     fontWeight: {
       regular: 400,
       medium: 500,
       semiBold: 600,
       bold: 700,
     },
     fontSize: {
       xs: '0.75rem',    // 12px
       sm: '0.875rem',   // 14px
       md: '1rem',       // 16px
       lg: '1.125rem',   // 18px
       xl: '1.25rem',    // 20px
       '2xl': '1.5rem',  // 24px
     },
     lineHeight: {
       tight: 1.25,
       normal: 1.5,
       relaxed: 1.75,
     },
   };
   ```

4. **Extract Spacing Tokens**:
   - Open `src/tokens/spacing.js`
   - Add the following code:

   ```javascript
   // src/tokens/spacing.js
   export const spacing = {
     xs: '0.25rem',  // 4px
     sm: '0.5rem',   // 8px
     md: '1rem',     // 16px
     lg: '1.5rem',   // 24px
     xl: '2rem',     // 32px
   };
   ```

5. **Extract Shadow Tokens**:
   - Open `src/tokens/shadows.js`
   - Add the following code:

   ```javascript
   // src/tokens/shadows.js
   export const shadows = {
     sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
     md: '0 4px 6px rgba(0, 0, 0, 0.1)',
     lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
   };
   ```

6. **Create Index File**:
   - Open `src/tokens/index.js`
   - Add the following code:

   ```javascript
   // src/tokens/index.js
   export * from './colors';
   export * from './typography';
   export * from './spacing';
   export * from './shadows';
   ```

### 25:00-35:00: Component Structure with Copilot

1. **Create Component Files**:
   ```bash
   # In VS Code terminal
   mkdir -p src/components/Card
   touch src/components/Card/Card.jsx src/components/Card/Card.css src/components/Card/index.js
   ```

2. **Use GitHub Copilot for Component Structure**:
   - Open `src/components/Card/Card.jsx`
   - Write the following comment and let Copilot generate code:

   ```jsx
   /**
    * Card Component based on Figma design
    * Props:
    * - title: string - The card title
    * - content: string - The card content/description
    * - image?: string - Optional image URL
    * - footer?: React.ReactNode - Optional footer content (typically actions)
    * - variant?: 'default' | 'elevated' | 'outlined' - Visual variant (default is 'default')
    * - className?: string - Additional CSS class
    */
   ```

3. **Expected Copilot Output** (if Copilot doesn't generate similar code, use this):
   ```jsx
   import React from 'react';
   import './Card.css';

   export const Card = ({ 
     title, 
     content, 
     image, 
     footer, 
     variant = 'default',
     className = ''
   }) => {
     return (
       <div className={`card card--${variant} ${className}`}>
         {image && (
           <div className="card__image-container">
             <img src={image} alt={title} className="card__image" />
           </div>
         )}
         <div className="card__content">
           <h3 className="card__title">{title}</h3>
           <p className="card__description">{content}</p>
         </div>
         {footer && (
           <div className="card__footer">
             {footer}
           </div>
         )}
       </div>
     );
   };
   ```

4. **Create Component Index File**:
   - Open `src/components/Card/index.js`
   - Add:
   ```javascript
   export { Card } from './Card';
   ```

### 35:00-45:00: Styling Implementation

1. **Add CSS for the Card Component**:
   - Open `src/components/Card/Card.css`
   - Write this comment for Copilot:
   ```css
   /* 
    * Card component styles based on Figma design
    * - Uses BEM methodology
    * - Includes styles for variants: default, elevated, outlined
    * - Includes responsive behavior for desktop, tablet, and mobile
    */
   ```

2. **Expected Copilot Output** (use if needed):
   ```css
   .card {
     border-radius: 8px;
     overflow: hidden;
     width: 100%;
     transition: all 0.2s ease-in-out;
   }

   /* Variants */
   .card--default {
     border: 1px solid #E0E0E0;
     background-color: #FFFFFF;
   }

   .card--elevated {
     border: none;
     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
     background-color: #FFFFFF;
   }

   .card--outlined {
     border: 2px solid #2196F3;
     background-color: #FFFFFF;
   }

   /* Card image */
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

   /* Card content */
   .card__content {
     padding: 1.5rem;
   }

   .card__title {
     margin: 0 0 0.5rem 0;
     font-size: 1.25rem;
     font-weight: 600;
     color: #212121;
   }

   .card__description {
     margin: 0;
     font-size: 1rem;
     color: #616161;
     line-height: 1.5;
   }

   /* Card footer */
   .card__footer {
     padding: 1rem 1.5rem;
     border-top: 1px solid #EEEEEE;
     display: flex;
     justify-content: flex-end;
     gap: 0.5rem;
   }

   /* Responsive behavior */
   @media (max-width: 1024px) {
     .card__content {
       padding: 1rem;
     }
     
     .card__footer {
       padding: 0.75rem 1rem;
     }
   }

   @media (max-width: 768px) {
     .card__content {
       padding: 0.75rem;
     }
     
     .card__footer {
       padding: 0.5rem 0.75rem;
     }
     
     .card__title {
       font-size: 1.125rem;
     }
     
     .card__description {
       font-size: 0.875rem;
     }
   }
   ```

3. **Update CSS with Design Tokens**:
   - Replace hard-coded values with token references
   - Import tokens in Card.jsx:
   ```jsx
   import React from 'react';
   import { colors, typography, spacing, shadows } from '../../tokens';
   import './Card.css';
   ```

   - Create a new file `src/tokens/css-variables.css`:
   ```css
   /* src/tokens/css-variables.css */
   :root {
     /* Colors */
     --color-primary-50: #E3F2FD;
     --color-primary-100: #BBDEFB;
     --color-primary-500: #2196F3;
     --color-primary-700: #1976D2;
     --color-primary-900: #0D47A1;
     
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
     
     --color-success: #4CAF50;
     --color-warning: #FFC107;
     --color-error: #F44336;
     
     /* Spacing */
     --spacing-xs: 0.25rem;
     --spacing-sm: 0.5rem;
     --spacing-md: 1rem;
     --spacing-lg: 1.5rem;
     --spacing-xl: 2rem;
     
     /* Shadows */
     --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
     --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
     --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
   }
   ```

   - Import CSS variables in `src/index.js`:
   ```javascript
   import './tokens/css-variables.css';
   ```

   - Update Card.css to use variables:
   ```css
   .card--default {
     border: 1px solid var(--color-neutral-300);
     background-color: #FFFFFF;
   }

   .card--elevated {
     border: none;
     box-shadow: var(--shadow-md);
     background-color: #FFFFFF;
   }

   .card--outlined {
     border: 2px solid var(--color-primary-500);
     background-color: #FFFFFF;
   }
   ```

### 45:00-55:00: Interactivity and State

1. **Add State Management**:
   - Update Card.jsx to include state:
   ```jsx
   import React, { useState } from 'react';
   import './Card.css';

   export const Card = ({ 
     title, 
     content, 
     image, 
     footer, 
     variant = 'default',
     className = '',
     onClick
   }) => {
     const [isHovered, setIsHovered] = useState(false);
     
     const handleMouseEnter = () => {
       setIsHovered(true);
     };
     
     const handleMouseLeave = () => {
       setIsHovered(false);
     };
     
     return (
       <div 
         className={`card card--${variant} ${isHovered ? 'card--hovered' : ''} ${className}`}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
         onClick={onClick}
         tabIndex={onClick ? 0 : undefined}
         role={onClick ? 'button' : undefined}
       >
         {image && (
           <div className="card__image-container">
             <img src={image} alt={title} className="card__image" />
           </div>
         )}
         <div className="card__content">
           <h3 className="card__title">{title}</h3>
           <p className="card__description">{content}</p>
         </div>
         {footer && (
           <div className="card__footer">
             {footer}
           </div>
         )}
       </div>
     );
   };
   ```

2. **Add Hover State Styles**:
   - Update Card.css:
   ```css
   /* Add hover state */
   .card--hovered {
     transform: translateY(-2px);
   }

   .card--default.card--hovered {
     box-shadow: var(--shadow-sm);
   }

   .card--elevated.card--hovered {
     box-shadow: var(--shadow-lg);
   }

   .card--outlined.card--hovered {
     background-color: var(--color-primary-50);
   }
   ```

3. **Add Loading State**:
   - Update Card.jsx:
   ```jsx
   export const Card = ({ 
     title, 
     content, 
     image, 
     footer, 
     variant = 'default',
     loading = false,
     className = '',
     onClick
   }) => {
     // ...existing code...
     
     return (
       <div 
         className={`card card--${variant} ${isHovered ? 'card--hovered' : ''} ${loading ? 'card--loading' : ''} ${className}`}
         // ...existing attributes...
       >
         {/* ...existing content... */}
         
         {loading && (
           <div className="card__loading-overlay">
             <div className="card__loading-spinner"></div>
           </div>
         )}
       </div>
     );
   };
   ```

4. **Add Loading State Styles**:
   ```css
   /* Loading state */
   .card--loading {
     position: relative;
   }

   .card__loading-overlay {
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     display: flex;
     justify-content: center;
     align-items: center;
     background-color: rgba(255, 255, 255, 0.7);
     border-radius: 8px;
   }

   .card__loading-spinner {
     width: 40px;
     height: 40px;
     border: 4px solid rgba(0, 0, 0, 0.1);
     border-left-color: var(--color-primary-500);
     border-radius: 50%;
     animation: spin 1s linear infinite;
   }

   @keyframes spin {
     to { transform: rotate(360deg); }
   }
   ```

5. **Add Component to App**:
   - Open `src/App.js`
   - Update:
   ```jsx
   import React from 'react';
   import { Card } from './components/Card';
   import './App.css';

   function App() {
     return (
       <div className="app">
         <h1>Card Component Demo</h1>
         
         <div className="card-container">
           <Card
             title="Default Card"
             content="This is a default card with standard styling."
             variant="default"
           />
           
           <Card
             title="Elevated Card"
             content="This card has elevated styling with a shadow."
             variant="elevated"
             image="https://picsum.photos/id/237/500/300"
           />
           
           <Card
             title="Outlined Card"
             content="This card has an outlined style with a colored border."
             variant="outlined"
             footer={
               <button className="button button--primary">Learn More</button>
             }
           />
           
           <Card
             title="Loading Card"
             content="This card is in a loading state."
             variant="default"
             loading={true}
           />
         </div>
       </div>
     );
   }

   export default App;
   ```

6. **Add App Styles**:
   - Create/update `src/App.css`:
   ```css
   .app {
     max-width: 1200px;
     margin: 0 auto;
     padding: 2rem;
   }

   h1 {
     text-align: center;
     margin-bottom: 2rem;
   }

   .card-container {
     display: grid;
     grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
     gap: 2rem;
   }

   .button {
     padding: 0.5rem 1rem;
     border-radius: 4px;
     border: none;
     font-weight: 500;
     cursor: pointer;
   }

   .button--primary {
     background-color: var(--color-primary-500);
     color: white;
   }

   /* Responsive behavior */
   @media (max-width: 768px) {
     .card-container {
       grid-template-columns: 1fr;
     }
   }
   ```

### 55:00-60:00: Recap and Q&A

1. **Showcase Final Component**:
   - Run the app if it's not already running:
   ```bash
   npm start
   ```
   
   - Demonstrate:
     - All variants side by side
     - Hover effects
     - Loading state
     - Responsive behavior (by resizing browser)

2. **Summarize Key Points**:
   - Design token extraction process
   - Component structure creation with Copilot
   - Styling with CSS variables
   - State management for interactivity
   - Accessibility considerations

3. **Suggest Next Steps**:
   - Explore the full Design-to-Code Playbook
   - Try the 3-Hour Workshop for deeper learning
   - Apply these concepts to your own projects

## Troubleshooting Common Issues

### GitHub Copilot Not Generating Code
- **Solution 1**: Try writing more detailed comments
- **Solution 2**: Break down the request into smaller pieces
- **Solution 3**: Use the provided code examples in this guide

### Package Installation Failures
- **Solution 1**: Check your internet connection
- **Solution 2**: Try using a different npm registry:
  ```bash
  npm config set registry https://registry.npmjs.org/
  npm install
  ```
- **Solution 3**: Clear npm cache:
  ```bash
  npm cache clean --force
  npm install
  ```

### Node.js Version Issues
- **Solution**: Install a compatible Node.js version (14.x or higher):
  ```bash
  # Using nvm (Node Version Manager)
  nvm install 16
  nvm use 16
  ```

### Figma Access Issues
- **Solution 1**: Use the provided static designs in figma-assets folder
- **Solution 2**: Create a simple design in Figma (free account) following the descriptions

## Additional Resources

- [Complete Design-to-Code Playbook](../../README.md)
- [3-Hour Workshop](../../workshops/03-hour-workshop/README.md)
- [Figma Documentation](https://help.figma.com/)
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [React Documentation](https://react.dev/) 