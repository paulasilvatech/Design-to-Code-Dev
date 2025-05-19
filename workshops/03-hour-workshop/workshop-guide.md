# 🧪 3-Hour Figma to Code Workshop Guide

Welcome to the Figma to Code workshop! This guide will walk you through converting Figma designs into production-ready code using VS Code, GitHub Copilot, and Azure AI.

## Workshop Objectives

By the end of this 3-hour workshop, you will:
- Extract design tokens from Figma designs
- Build a small component library with proper architecture
- Implement responsive and accessible components
- Use GitHub Copilot to accelerate development
- Add interactivity and state management
- Test and validate your implementation

## Prerequisites Check

Before starting, ensure you have:
- [ ] A GitHub account with Copilot access
- [ ] VS Code with GitHub Copilot extension installed
- [ ] Node.js (v14+) and npm installed
- [ ] The workshop repository cloned locally
- [ ] Access to the workshop Figma file
- [ ] Completed the starter code setup

## Workshop Agenda

### Part 1: Introduction and Setup (15 minutes)
- Workshop overview and introductions
- Environment verification
- Project structure overview
- Figma file walkthrough

### Part 2: Figma Design Analysis (30 minutes)
- Examining the Figma design system
- Identifying components and variants
- Analyzing responsive behavior
- Planning the component architecture
- Extracting design tokens

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

## Getting Started

1. Navigate to the workshop directory:
   ```bash
   cd workshops/03-hour-workshop
   ```

2. Install dependencies:
   ```bash
   cd starter-code
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open the project in VS Code:
   ```bash
   code .
   ```

5. Open the Figma file provided by your instructor

## Exercises

### Exercise 1: Setting Up the Design Token System

**Objective**: Extract design tokens from Figma and create a maintainable token system.

**Steps**:
1. Open the Figma file and examine the design system page
2. Identify colors, typography, spacing, and other design tokens
3. Create a `tokens` directory in your project
4. Create separate files for different token categories:
   - `colors.js`
   - `typography.js`
   - `spacing.js`
   - `breakpoints.js`
5. Export all tokens through an index.js file

**Example**:
```javascript
// tokens/colors.js
export const colors = {
  primary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    500: '#2196F3',
    700: '#1976D2',
    900: '#0D47A1',
  },
  // other color tokens
};

// tokens/index.js
export * from './colors';
export * from './typography';
export * from './spacing';
export * from './breakpoints';
```

### Exercise 2: Creating the Button Component

**Objective**: Build a flexible Button component based on Figma designs.

**Steps**:
1. Analyze the Button component in Figma
2. Identify variants, states, and properties
3. Create a Button component with appropriate props
4. Implement styling using design tokens
5. Add hover, focus, and active states
6. Test with different variants and states

**Hints**:
- Use GitHub Copilot to help with component structure
- Comment on what you want to achieve before letting Copilot suggest code
- Consider accessibility from the beginning

### Exercise 3: Building the Card Component

**Objective**: Create a responsive Card component with different variants.

**Steps**:
1. Analyze the Card component in Figma
2. Create the component structure with proper props
3. Implement styling for different variants
4. Add responsive behavior
5. Use the Button component inside the Card

**Hints**:
- Consider content projection patterns
- Use semantic HTML elements
- Ensure proper spacing and alignment

### Exercise 4: Implementing Form Elements

**Objective**: Build form input components that match the design system.

**Steps**:
1. Create an Input component
2. Add validation states (success, error)
3. Implement a label and helper text
4. Ensure proper accessibility attributes
5. Test with different input types

### Exercise 5: Implementing Component Styles

**Objective**: Apply consistent styling across components.

**Steps**:
1. Choose a styling approach (CSS, CSS-in-JS, CSS Modules)
2. Implement component styles using design tokens
3. Ensure consistent visual appearance
4. Check alignment with Figma designs

### Exercise 6: Adding Responsive Behavior

**Objective**: Make components adapt to different screen sizes.

**Steps**:
1. Implement responsive layouts using CSS Grid or Flexbox
2. Add media queries for breakpoints
3. Test on different screen sizes
4. Ensure touch-friendly interactions for mobile

### Exercise 7: Creating Theme Variations

**Objective**: Implement light and dark themes.

**Steps**:
1. Create a theme provider component
2. Define light and dark theme variations
3. Update components to use theme values
4. Add a theme toggle feature

### Exercise 8: Optimizing for Different Devices

**Objective**: Ensure consistent experience across devices.

**Steps**:
1. Implement device-specific optimizations
2. Test on different viewports
3. Add touch-specific interactions
4. Ensure appropriate text sizes and spacing

### Exercise 9: Adding Component Interactions

**Objective**: Implement interactive behaviors.

**Steps**:
1. Add hover, focus, and active states
2. Implement transitions and animations
3. Ensure keyboard accessibility
4. Test interaction behavior

### Exercise 10: Implementing State Management

**Objective**: Manage component state effectively.

**Steps**:
1. Implement local state with useState
2. Create controlled components for form elements
3. Handle loading and error states
4. Ensure proper state transitions

### Exercise 11: Handling User Input

**Objective**: Create robust input handling.

**Steps**:
1. Implement form validation
2. Add error messages and feedback
3. Create a form submission process
4. Handle different input scenarios

### Exercise 12: Creating Interactive Patterns

**Objective**: Build complex interactive patterns.

**Steps**:
1. Implement a dropdown or select component
2. Create a modal or dialog
3. Add a toggle or switch component
4. Ensure all interactions are accessible

## Completion Checklist

After completing the workshop, you should have:

- [ ] A design token system extracted from Figma
- [ ] At least 5 components implemented from the design
- [ ] Responsive behavior across different screen sizes
- [ ] Theme support with light and dark modes
- [ ] Interactive components with proper state management
- [ ] Accessible components that follow best practices

## Additional Resources

- [Design-to-Code Playbook](../../README.md) - Comprehensive guide on Figma to code conversion
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot) - Official documentation for GitHub Copilot
- [React Documentation](https://react.dev/) - Official React documentation
- [WCAG Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/) - Web Content Accessibility Guidelines

## Need Help?

If you get stuck or have questions:
1. Ask the workshop facilitator for help
2. Check the solution code for reference
3. Pair with another participant to troubleshoot
4. Refer to the Design-to-Code Playbook for guidance 