# 🤖 Using GitHub Copilot for Code Generation

This guide provides detailed instructions for effectively using GitHub Copilot to convert Figma designs into high-quality code.

## Table of Contents
- [Understanding GitHub Copilot](#understanding-github-copilot)
- [Setting Up Copilot in VS Code](#setting-up-copilot-in-vs-code)
- [Creating Effective Custom Instructions](#creating-effective-custom-instructions)
- [Crafting Powerful Prompts](#crafting-powerful-prompts)
- [Using Copilot Chat](#using-copilot-chat)
- [Converting Figma Components to Code](#converting-figma-components-to-code)
- [Common Challenges and Solutions](#common-challenges-and-solutions)
- [Advanced Techniques](#advanced-techniques)

## Understanding GitHub Copilot

GitHub Copilot is an AI-powered code completion tool that can help you write code faster and more efficiently. When working with Figma designs, it can be an invaluable tool for quickly converting design concepts into functional code.

### How Copilot Works

1. **Context-aware suggestions**: Copilot analyzes your code, comments, and even imported files to provide relevant suggestions.
2. **Whole line and multi-line completion**: It can suggest single lines or entire functions based on context.
3. **Multiple suggestions**: It can provide alternative suggestions that you can cycle through.
4. **Learning from your code**: It adapts to your coding style and patterns over time.

### Copilot's Capabilities for Design-to-Code

- Generating component structures from descriptions
- Creating CSS/SCSS based on design specifications
- Implementing interactions and animations
- Building responsive layouts
- Setting up theme systems based on design tokens

## Setting Up Copilot in VS Code

### Installation and Configuration

1. **Install the GitHub Copilot extension**:
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X / ⌘+Shift+X)
   - Search for "GitHub Copilot"
   - Click "Install"

2. **Set up your GitHub account**:
   - Sign in to your GitHub account when prompted
   - Ensure you have an active GitHub Copilot subscription

3. **Configure Copilot settings**:
   - Open Settings (Ctrl+, / ⌘+,)
   - Search for "Copilot"
   - Adjust settings according to your preferences:
     - Enable/disable auto-suggestions
     - Set keyboard shortcuts
     - Configure suggestion behavior

### Enabling Copilot Agent Mode

Agent mode provides enhanced capabilities for design-to-code workflows:

1. **Open the Command Palette**: Press Ctrl+Shift+P (Windows/Linux) or Cmd+Shift+P (macOS)
2. **Type "GitHub Copilot: Enable Agent Mode"** and select it
3. **Confirm the enabling** of agent mode when prompted

## Creating Effective Custom Instructions

Custom instructions help Copilot understand project requirements and generate more accurate code. For design-to-code workflows, well-crafted instructions are crucial.

### Setting Up a Copilot Instructions File

Create a `.github/copilot-instructions.md` file in your project:

```markdown
# Figma to Code Conversion Guidelines

## Project Overview
This project involves converting Figma designs into high-quality, production-ready code using [React/Angular] with [styled-components/SCSS/Tailwind].

## Coding Standards
- Use TypeScript for all components
- Follow Atomic Design principles (atoms, molecules, organisms)
- Maintain consistent naming conventions:
  - PascalCase for components
  - camelCase for variables and functions
  - kebab-case for CSS classes

## Design System Implementation
- Implement design tokens from Figma as CSS variables or theme constants
- Create responsive components using flexbox and CSS Grid
- Ensure all components are accessible (WCAG AA compliant)
- Use color variables directly mapped from Figma

## Component Structure
- Each component should have its own directory
- Include index file for easy imports
- Separate styling from component logic
- Include TypeScript interfaces for props

## Responsive Design
- Use mobile-first approach
- Implement breakpoints at: 
  - Mobile: 375px
  - Tablet: 768px
  - Desktop: 1024px
  - Large Desktop: 1440px

## Accessibility Requirements
- Ensure proper contrast ratios
- Include appropriate ARIA attributes
- Support keyboard navigation
- Maintain focus management
```

### Component-Specific Instructions

For specific components, add detailed instructions:

```markdown
## Button Component Guidelines
- Implement variants: primary, secondary, outlined
- Support sizes: small, medium, large
- Include states: default, hover, active, disabled, loading
- Support for left/right icons
- Handle onClick events properly
- Ensure keyboard accessibility

## Form Component Guidelines
- Implement validation with error states
- Support for required fields
- Include label and help text options
- Maintain consistent spacing
- Support disabled states
```

## Crafting Powerful Prompts

The quality of your prompts determines the quality of Copilot's output. Here are strategies for crafting effective prompts.

### Basic Component Prompts

```javascript
/**
 * Create a Button component based on the following Figma design:
 * - Primary variant: #3B82F6 background, white text
 * - Secondary variant: #9CA3AF background, white text
 * - Outlined variant: transparent background, #3B82F6 border and text
 * - Sizes: small (8px 16px, 14px font), medium (12px 24px, 16px font), large (16px 32px, 18px font)
 * - States: default, hover (darken by 10%), active (darken by 15%), disabled (50% opacity)
 * - Support for left and right icons
 * - Loading state with spinner
 * - Use styled-components
 */
```

### Complex Component Prompts

```javascript
/**
 * Generate a DataTable component with the following features:
 * 
 * 1. Structure:
 *    - Header with column titles
 *    - Rows of data with alternating background colors
 *    - Footer with pagination
 * 
 * 2. Features:
 *    - Sortable columns (clicking header triggers sort)
 *    - Pagination (10 items per page default)
 *    - Selectable rows with checkboxes
 *    - Responsive behavior (horizontal scroll on mobile)
 * 
 * 3. Styling:
 *    - Header: #F3F4F6 background, font-weight: 600
 *    - Rows: white/#F9FAFB alternating backgrounds
 *    - Borders: 1px solid #E5E7EB
 *    - Hover state: #EFF6FF background
 *    - Selected state: #DBEAFE background
 * 
 * 4. Props:
 *    - data: array of objects to display
 *    - columns: configuration for each column
 *    - selectable: boolean to enable/disable selection
 *    - pagination: boolean to enable/disable pagination
 *    - onRowClick: function called when row is clicked
 *    - onSelectionChange: function called when selection changes
 */
```

### Layout Prompts

```javascript
/**
 * Create a responsive layout component based on the Figma design with:
 * 
 * 1. Structure:
 *    - Header with logo, navigation, and user menu
 *    - Sidebar (collapsible on mobile)
 *    - Main content area
 *    - Footer with 3 columns
 * 
 * 2. Responsive behavior:
 *    - Desktop (1024px+): Full layout with expanded sidebar
 *    - Tablet (768px-1023px): Collapsed sidebar, toggleable with button
 *    - Mobile (<768px): Hidden sidebar, accessible through hamburger menu
 * 
 * 3. Props:
 *    - children: content for the main area
 *    - navigationItems: array of navigation links
 *    - userMenuItems: array of user menu options
 *    - footerContent: object with footer column content
 */
```

### Component with Animation Prompts

```javascript
/**
 * Create a Modal component with entrance/exit animations:
 * 
 * 1. Behavior:
 *    - Appears with fade-in animation (300ms)
 *    - Background overlay darkens (opacity 0 to 0.5)
 *    - Modal slides in from top (transform: translateY(-20px) to translateY(0))
 *    - Exit animations reverse the entrance
 * 
 * 2. Structure:
 *    - Overlay background (position: fixed, covers entire viewport)
 *    - Modal container with max-width: 500px
 *    - Header with title and close button
 *    - Body content area
 *    - Footer with action buttons
 * 
 * 3. Props:
 *    - isOpen: boolean to control visibility
 *    - onClose: function to call when closing
 *    - title: string for the modal header
 *    - children: content for the modal body
 *    - footerActions: array of button configurations
 * 
 * 4. Animation:
 *    - Use framer-motion for animations
 */
```

## Using Copilot Chat

Copilot Chat provides a conversational interface for refining and enhancing your code. It's particularly useful for complex design-to-code conversions.

### Basic Chat Usage

1. **Open Copilot Chat**:
   - Press Ctrl+I (Windows/Linux) or Cmd+I (macOS)
   - Or click the Copilot Chat icon in the sidebar

2. **Ask questions about design implementation**:
   - "How would I implement this card component in React?"
   - "What's the best way to handle responsive images in this layout?"
   - "Can you help me convert this Figma color system to CSS variables?"

### Context-Aware Questions

You can select code and ask specific questions about it:

1. **Select component code**
2. **Open Copilot Chat**
3. **Ask focused questions**:
   - "How can I improve the accessibility of this component?"
   - "Can you refactor this to use styled-components instead of inline styles?"
   - "How would you optimize this for performance?"

### Multi-Turn Conversations

Build on previous answers with follow-up questions:

1. **Start with a general question** about implementing a design
2. **Ask for refinements** based on the initial response
3. **Request specific improvements** like adding animations or responsive behavior
4. **Ask for explanations** of the generated code

### Code Refinement Examples

1. **Styling Refinement**:
   ```
   I have this button component from Figma, but the hover states don't match 
   the design. The design shows a 10% darker background on hover, but my 
   implementation uses a different color. Can you help fix this?
   ```

2. **Accessibility Improvements**:
   ```
   This form component looks good, but can you add proper ARIA attributes
   and keyboard navigation support to make it more accessible?
   ```

3. **Responsive Behavior**:
   ```
   The layout works well on desktop, but on mobile the sidebar overlaps
   with the content. How can I modify this to create a proper responsive layout?
   ```

## Converting Figma Components to Code

Here's a step-by-step process for converting Figma components to code using GitHub Copilot.

### Step 1: Analyze the Design

1. **Examine the component** in Figma
2. **Note design tokens** like colors, typography, spacing
3. **Identify variants and states**
4. **Understand responsive behavior**

### Step 2: Create Component Structure

Use descriptive comments to prompt Copilot:

```javascript
/**
 * Card Component
 * 
 * From Figma design:
 * - Rounded corners: 8px
 * - Shadow: 0 2px 4px rgba(0,0,0,0.1)
 * - Padding: 24px
 * - Background: white
 * - Has header, body, and footer sections
 */
```

Let Copilot generate the initial structure:

```jsx
const Card = ({ 
  title, 
  children, 
  footer, 
  variant = 'default' 
}) => {
  return (
    <div className="card card--{variant}">
      {title && <div className="card__header">{title}</div>}
      <div className="card__body">{children}</div>
      {footer && <div className="card__footer">{footer}</div>}
    </div>
  );
};
```

### Step 3: Style the Component

Describe styles in comments:

```javascript
/**
 * Card Styles
 * 
 * Default variant:
 * - Background: white
 * - Border: 1px solid #E5E7EB
 * 
 * Elevated variant:
 * - Background: white
 * - Box-shadow: 0 4px 6px rgba(0,0,0,0.1)
 * 
 * Interactive variant:
 * - Same as default, but with hover state:
 *   - Transform: translateY(-2px)
 *   - Box-shadow: 0 4px 6px rgba(0,0,0,0.1)
 */
```

### Step 4: Implement Variants and States

Create a complete implementation by describing all variants and states:

```javascript
/**
 * Implement all card variants:
 * - default: as described above
 * - compact: smaller padding (16px), tighter spacing
 * - bordered: 2px solid border instead of shadow
 * - colorful: with background color from theme
 * 
 * States:
 * - default: as described
 * - hover: slight scale (1.02) and shadow increase
 * - disabled: 60% opacity, no hover effects
 */
```

## Common Challenges and Solutions

### Challenge: Style Mismatch

**Problem**: Generated styles don't match exactly with Figma designs.

**Solution**:
1. Provide exact color values, sizes, and spacing in your prompts
2. Include specific CSS properties like `letter-spacing`, `font-weight`
3. Specify units (px, rem, em) for measurements

Example prompt:
```
Create a heading component with exact Figma styling:
- Font: Inter, font-weight: 700
- Size: 24px (desktop), 20px (mobile)
- Line height: 32px (1.33)
- Letter spacing: -0.01em
- Color: #111827
- Margin: 0 0 16px 0
```

### Challenge: Complex Layouts

**Problem**: Multi-column or grid-based layouts are challenging to describe.

**Solution**:
1. Break down layouts into smaller sections
2. Describe each section precisely
3. Specify breakpoints and behavior at each one

Example prompt:
```
Create a product listing grid with:
- 3 columns on desktop (1024px+)
- 2 columns on tablet (768px-1023px)
- 1 column on mobile (<768px)
- 24px gap between items
- Items should maintain aspect ratio
- Each item has image (top), title, price, and action button
```

### Challenge: Interactive Behavior

**Problem**: Complex interactions are difficult to describe and implement.

**Solution**:
1. Break down interactions into distinct states
2. Describe transitions between states
3. Specify timing and easing functions

Example prompt:
```
Create a dropdown menu with the following interactions:
- Closed state: Only shows trigger button
- Opening animation: Menu fades in (150ms) and scales from 0.95 to 1 (200ms, ease-out)
- Open state: Menu displayed below trigger
- Hover state for menu items: Background changes to #F3F4F6
- Closing animation: Menu fades out (100ms) and scales down slightly
```

## Advanced Techniques

### Generating an Entire Component System

You can guide Copilot to generate a consistent set of components:

```
/**
 * Design System Components based on Figma
 * 
 * Create the following components with consistent styling and APIs:
 * 
 * 1. Button (primary, secondary, outlined variants)
 * 2. Input (text, number, password variants)
 * 3. Checkbox and Radio
 * 4. Select dropdown
 * 5. Card (default, elevated variants)
 * 6. Alert (info, success, warning, error variants)
 * 
 * All components should:
 * - Support dark/light themes
 * - Be fully accessible
 * - Use styled-components
 * - Include TypeScript interfaces
 * - Accept common HTML attributes as props
 */
```

### Creating Theme Implementation

To implement a complete theme system from Figma:

```
/**
 * Create a theme system based on Figma design tokens:
 * 
 * 1. Colors:
 *    - Primary: #3B82F6 (with 50, 100, ..., 900 shades)
 *    - Neutral: #1F2937 (with 50, 100, ..., 900 shades)
 *    - Success: #10B981
 *    - Warning: #F59E0B
 *    - Error: #EF4444
 * 
 * 2. Typography:
 *    - Font families: "Inter" (body), "Poppins" (headings)
 *    - Font sizes: 12, 14, 16, 20, 24, 32, 48, 64
 *    - Line heights: 1.2, 1.5, 1.8
 *    - Font weights: 400, 500, 600, 700
 * 
 * 3. Spacing:
 *    - Scale: 4, 8, 12, 16, 24, 32, 48, 64, 80, 96
 * 
 * 4. Breakpoints:
 *    - sm: 640px
 *    - md: 768px
 *    - lg: 1024px
 *    - xl: 1280px
 * 
 * 5. Create both light and dark themes
 */
```

## Next Steps

With your GitHub Copilot skills honed for design-to-code conversion, let's explore how to enhance this workflow with Azure AI Foundry integration. Proceed to the [Integrating with Azure AI Foundry](../04-azure-ai/README.md) guide for detailed instructions. 