# 🎬 1-Hour Figma to Code Demo Script

## Demo Overview

This script provides a step-by-step guide for presenting a 1-hour demonstration of the Figma to code workflow using VS Code, GitHub Copilot, and Azure AI.

## Timeline

- **00:00-05:00** - Introduction and setup
- **05:00-15:00** - Figma design analysis and token extraction
- **15:00-30:00** - Creating the component structure with GitHub Copilot
- **30:00-45:00** - Styling and responsive behavior
- **45:00-55:00** - Adding interactivity and state
- **55:00-60:00** - Q&A and next steps

## Detailed Script

### 00:00-05:00 - Introduction and Setup

1. **Welcome participants**
   - Introduce yourself and the session
   - Explain the objectives of the demonstration
   - Outline what participants will learn

2. **Verify setup**
   - Ensure VS Code and GitHub Copilot are working
   - Open the starter code project
   - Show the Figma design we'll be implementing

### 05:00-15:00 - Figma Design Analysis and Token Extraction

1. **Examine the Figma design**
   - Open the Figma file
   - Analyze the component structure, variants, and states
   - Show how to use the Inspect panel to view properties

2. **Extract design tokens**
   - Demonstrate how to identify colors, typography, spacing, and other tokens
   - Show how to extract these values using Figma plugins or manual extraction
   - Create a tokens.js file in the project with the extracted values

```javascript
// Example of extracted tokens
export const tokens = {
  colors: {
    primary: '#3B82F6',
    secondary: '#10B981',
    background: '#F9FAFB',
    text: '#1F2937',
    // ... more colors
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      // ... more sizes
    },
    // ... more typography tokens
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    // ... more spacing values
  },
  // ... other token categories
};
```

### 15:00-30:00 - Creating the Component Structure with GitHub Copilot

1. **Define the component API**
   - Analyze what props the component needs based on the design
   - Create the component file structure
   - Use GitHub Copilot to help define the TypeScript interface

2. **Create the base component**
   - Use Copilot to generate the initial component structure
   - Show how to prompt Copilot effectively with detailed comments
   - Refine the generated code to match requirements

```jsx
/**
 * Create a Card component based on the Figma design
 * Props:
 * - title: string
 * - description: string
 * - image?: string
 * - variant: 'default' | 'elevated' | 'outlined'
 * - actions?: React.ReactNode
 * - onActionClick?: () => void
 */

import React from 'react';
import { tokens } from '../tokens';
import './Card.css';

export interface CardProps {
  title: string;
  description: string;
  image?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  actions?: React.ReactNode;
  onActionClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  variant = 'default',
  actions,
  onActionClick,
}) => {
  return (
    <div className={`card card--${variant}`}>
      {image && (
        <div className="card__image-container">
          <img src={image} alt={title} className="card__image" />
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
    </div>
  );
};
```

### 30:00-45:00 - Styling and Responsive Behavior

1. **Implement component styling**
   - Create CSS styles based on the Figma design
   - Use the extracted design tokens
   - Demonstrate different styling approaches (CSS, CSS-in-JS, etc.)

2. **Add responsive behavior**
   - Implement media queries
   - Show how to adapt the component for different screen sizes
   - Demonstrate testing responsive behavior

```css
/* Example CSS with responsive behavior */
.card {
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  transition: all 0.2s ease-in-out;
}

.card--default {
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
}

.card--elevated {
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: var(--background-color);
}

.card--outlined {
  border: 2px solid var(--primary-color);
  background-color: var(--background-color);
}

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

.card__content {
  padding: var(--spacing-lg);
}

.card__title {
  margin: 0 0 var(--spacing-sm) 0;
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-color);
}

.card__description {
  margin: 0;
  font-size: var(--font-size-md);
  color: var(--text-color-secondary);
}

.card__actions {
  padding: var(--spacing-md) var(--spacing-lg);
  border-top: 1px solid var(--border-color-light);
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
}

/* Responsive behavior */
@media (max-width: 768px) {
  .card__image-container {
    height: 150px;
  }
  
  .card__content {
    padding: var(--spacing-md);
  }
  
  .card__actions {
    padding: var(--spacing-sm) var(--spacing-md);
  }
}
```

### 45:00-55:00 - Adding Interactivity and State

1. **Implement interactive behaviors**
   - Add state management using useState
   - Implement interactions from the Figma prototype
   - Show how to handle hover, focus, and active states

2. **Enhance with additional features**
   - Add loading states
   - Implement error handling
   - Demonstrate accessibility considerations

```jsx
import React, { useState } from 'react';
import { tokens } from '../tokens';
import './Card.css';

export interface CardProps {
  // ... previous props
  loading?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  // ... previous props
  loading = false,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  const handleClick = () => {
    if (onClick && !loading) {
      onClick();
    }
  };
  
  return (
    <div 
      className={`card card--${variant} ${isHovered ? 'card--hovered' : ''} ${loading ? 'card--loading' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
    >
      {/* ... previous content */}
      
      {loading && (
        <div className="card__loading-overlay">
          <div className="card__loading-spinner"></div>
        </div>
      )}
    </div>
  );
};
```

### 55:00-60:00 - Q&A and Next Steps

1. **Recap what was built**
   - Review the completed component
   - Highlight key techniques demonstrated
   - Show the final result compared to the Figma design

2. **Direct participants to additional resources**
   - Point to the full Design-to-Code Playbook
   - Mention the 3-hour workshop for hands-on practice
   - Share additional learning resources

3. **Answer questions**
   - Address any questions from participants
   - Provide clarification on techniques demonstrated
   - Suggest ways to apply these concepts to their own projects

## Presenter Notes

- Practice the demo thoroughly before presenting
- Have the Figma file and code project open before starting
- Prepare fallback options in case of technical issues
- Speak clearly and explain each step
- Highlight GitHub Copilot prompts and techniques
- Emphasize design token implementation for consistency
- Show both the "ideal" way and practical shortcuts when appropriate
- Remember that the goal is to demonstrate the workflow, not to build a perfect component 