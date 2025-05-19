# 🔍 Preparing Figma Designs for Optimal Conversion

This guide provides detailed instructions for structuring and organizing your Figma designs to achieve the best results when converting them to code.

## Table of Contents
- [Design File Organization](#design-file-organization)
- [Using Auto Layout Effectively](#using-auto-layout-effectively)
- [Component Variants and Properties](#component-variants-and-properties)
- [Design Tokens and Variables](#design-tokens-and-variables)
- [Documentation for Developers](#documentation-for-developers)
- [Enabling Developer Handoff](#enabling-developer-handoff)
- [Advanced Figma Techniques](#advanced-figma-techniques)
- [Checklist Before Handoff](#checklist-before-handoff)

## Design File Organization

### Project Structure

A well-organized Figma file makes it significantly easier for AI tools to understand the design intent. Follow this structure:

```
Project/
├── 📄 Design System
│   ├── 🎨 Colors & Typography
│   │   ├── Color Styles
│   │   ├── Text Styles
│   │   └── Effect Styles (shadows, blurs)
│   ├── 🧩 Components
│   │   ├── Atoms (buttons, inputs, icons)
│   │   ├── Molecules (form fields, cards, alerts)
│   │   └── Organisms (headers, footers, complex widgets)
│   └── 📐 Layout & Grid System
│       ├── Spacing Tokens
│       ├── Breakpoints
│       └── Grid Configurations
├── 📄 Pages
│   ├── 🖼️ Homepage
│   ├── 🖼️ User Dashboard
│   └── 🖼️ Settings
└── 📄 Development-Ready Screens (✅ Ready for Dev)
    ├── Mobile Screens
    ├── Tablet Screens
    └── Desktop Screens
```

### Naming Conventions

Consistent naming helps AI tools identify components and their purpose:

1. **Frames and Groups**:
   - Use a prefix to indicate the type: `pg-` for pages, `sec-` for sections, `cmp-` for components
   - Example: `pg-Dashboard`, `sec-HeroSection`, `cmp-Button`

2. **Layers**:
   - Use descriptive names for semantics: `header`, `navigation`, `main-content`
   - For icons and images: `icon-home`, `img-profile`

3. **Components**:
   - Follow a pattern like `[Category]/[Component]`
   - Example: `Navigation/Navbar`, `Forms/Input`, `Feedback/Alert`

4. **Variants**:
   - Use consistent naming for variants: `primary`, `secondary`, `outlined`
   - For states: `default`, `hover`, `active`, `disabled`

## Using Auto Layout Effectively

Auto Layout in Figma directly translates to flexbox or grid in CSS. Follow these best practices for optimal conversion:

### Basic Auto Layout Setup

1. **Select elements to be included in the Auto Layout**
2. **Right-click and select "Add Auto Layout" or press Shift+A**
3. **Configure Direction**: 
   - Vertical for column layout (flexbox `flex-direction: column`)
   - Horizontal for row layout (flexbox `flex-direction: row`)

### Advanced Auto Layout Techniques

1. **Spacing Between Items**:
   - Use consistent spacing values (8px, 16px, 24px, etc.)
   - These will translate to CSS `gap` properties

2. **Padding**:
   - Set equal padding on all sides when possible
   - Use consistent values from your spacing system

3. **Alignment**:
   - "Align" settings translate to `justify-content` and `align-items` in CSS
   - Choose appropriate alignment based on content

4. **Resizing Behavior**:
   - "Hug contents" = `width: auto` or `height: auto`
   - "Fill container" = `width: 100%` or `height: 100%`
   - "Fixed size" = explicit width/height values

5. **Nested Auto Layouts**:
   - Create complex layouts with nested Auto Layout frames
   - This translates to nested flexbox containers in CSS

### Responsive Considerations

1. **Use "Fill container" for responsive elements**
2. **Set constraints properly**:
   - Left and Right = `width: 100%`
   - Top and Bottom = `height: 100%`
   - Scale = responsive scaling
3. **Consider min and max width/height constraints**:
   - Minimum width limits translate to `min-width` in CSS
   - Maximum width limits translate to `max-width` in CSS

## Component Variants and Properties

Components with variants in Figma translate directly to component props in code, making them easier to implement.

### Setting Up Component Variants

1. **Create a base component**:
   - Design the base version of your component
   - Right-click and select "Create component" or press Ctrl+Alt+K (Cmd+Opt+K on Mac)

2. **Add variants**:
   - Select the component
   - Click the "+" in the Properties panel under "Variants"
   - Name your property (e.g., "Variant", "Size", "State")
   - Add values for each property (e.g., "Primary", "Secondary", "Small", "Large")

3. **Customize each variant**:
   - Select each variant combination
   - Modify its appearance as needed

### Component Properties

Beyond variants, use component properties to make your components more flexible:

1. **Text properties**: For customizable text content
2. **Boolean properties**: For toggles like "Disabled" or "Loading"
3. **Instance swap properties**: For swappable elements like icons
4. **Variable properties**: To connect components to design variables

Example Button Component Structure:
```
Button (Main Component)
├── Variant
│   ├── Primary
│   ├── Secondary
│   └── Outlined
├── Size
│   ├── Small
│   ├── Medium
│   └── Large
├── State
│   ├── Default
│   ├── Hover
│   ├── Pressed
│   └── Disabled
└── Properties
    ├── Text (text): "Button"
    ├── Icon (instance swap): [icon options]
    ├── Icon Position (boolean): left/right
    └── Loading (boolean): true/false
```

### Interactive Components

Use interactive components to demonstrate transitions and states:

1. **Create variants for different states** (default, hover, pressed, disabled)
2. **Set up interactions** in Prototype mode:
   - Add hover interactions
   - Add click interactions
   - Create transitions between states

## Design Tokens and Variables

Using Figma Variables creates a direct mapping to CSS variables or theme configuration in code.

### Color Tokens

1. **Create a Local Variables collection**:
   - Go to the Variables panel (Menu > Variables)
   - Create a new collection named "Colors"

2. **Set up color categories**:
   - Primary colors
   - Secondary colors
   - Accent colors
   - Neutral/Gray colors
   - Semantic colors (success, warning, error, info)

3. **Create color variables**:
   ```
   colors.primary.500 = #0066FF
   colors.primary.400 = #3385FF
   colors.primary.600 = #0052CC
   
   colors.neutral.100 = #F5F5F5
   colors.neutral.200 = #E0E0E0
   colors.neutral.900 = #212121
   
   colors.semantic.error = #D32F2F
   colors.semantic.success = #388E3C
   ```

### Typography Tokens

1. **Create a "Typography" variable collection**:
   - Define font families
   - Define font weights
   - Define font sizes
   - Define line heights

2. **Example typography variables**:
   ```
   typography.fontFamily.primary = "Inter"
   typography.fontFamily.secondary = "Roboto"
   
   typography.fontSize.xs = 12px
   typography.fontSize.sm = 14px
   typography.fontSize.md = 16px
   typography.fontSize.lg = 20px
   typography.fontSize.xl = 24px
   
   typography.lineHeight.tight = 120%
   typography.lineHeight.normal = 150%
   typography.lineHeight.loose = 180%
   ```

### Spacing Tokens

1. **Create a "Spacing" variable collection**:
   - Define spacing increments
   - Use consistent spacing scale (e.g., 4, 8, 16, 24, 32, 48, 64)

2. **Example spacing variables**:
   ```
   spacing.xs = 4px
   spacing.sm = 8px
   spacing.md = 16px
   spacing.lg = 24px
   spacing.xl = 32px
   spacing.2xl = 48px
   spacing.3xl = 64px
   ```

### Border and Radius Tokens

1. **Create "Borders" and "Radius" variable collections**:
   - Define border widths
   - Define border radii

2. **Example variables**:
   ```
   borders.width.thin = 1px
   borders.width.medium = 2px
   borders.width.thick = 4px
   
   radius.none = 0px
   radius.sm = 4px
   radius.md = 8px
   radius.lg = 16px
   radius.pill = 999px
   ```

### Creating Light and Dark Themes

1. **Create theme modes**:
   - Add modes to your variable collections (Light/Dark)
   - Define color values for each mode

2. **Using theme variables in components**:
   - Apply variables to fills, strokes, effects
   - Test components in different modes

## Documentation for Developers

Adding clear documentation directly in Figma helps developers understand design intent.

### Component Documentation

1. **Add component descriptions**:
   - Select a component
   - Add description in the right sidebar
   - Include purpose, usage guidelines, and behavior notes

2. **Document variants and properties**:
   - Explain when to use each variant
   - Describe how properties affect the component

### Interactive State Documentation

1. **Create a dedicated documentation frame**:
   - Show all component states side by side
   - Label each state (Default, Hover, Active, Disabled)

2. **Add state transition notes**:
   - Explain timing and easing for animations
   - Note any special behaviors during transitions

### Responsive Behavior Notes

1. **Document breakpoints**:
   - Define standard breakpoints (Mobile, Tablet, Desktop)
   - Note pixel ranges for each breakpoint

2. **Component-specific behavior**:
   - Document how components should adapt at each breakpoint
   - Note when components should reflow, resize, or hide

### Animation Specifications

1. **Create animation documentation**:
   - Define standard durations and easings
   - Document when animations should be used

2. **Component-specific animations**:
   - Describe entrance/exit animations
   - Document interaction animations
   - Note timing and easing values

## Enabling Developer Handoff

Configure Figma's Dev Mode to streamline the handoff process and provide developers with valuable insights.

### Setting Up Dev Mode

1. **Enable Dev Mode**:
   - Open your file in Figma
   - Click on the "Dev Mode" tab in the right panel
   - If you don't see it, ensure Dev Mode is enabled for your team

2. **Organize components for inspection**:
   - Create a dedicated page titled "📱 Developer Handoff"
   - Organize components by category

### Component Inspection Setup

1. **Prepare components for inspection**:
   - Ensure all components use variables and Auto Layout
   - Group related components together
   - Include all states and variants

2. **Add code snippets (optional)**:
   - You can add example code in component descriptions
   - Include HTML structure or React/Angular component usage

### Creating a Development Status System

1. **Set up status badges**:
   - Create a component set for status badges
   - Include states like "Ready for Dev", "In Progress", "Needs Review"

2. **Apply status to screens and components**:
   - Add status badges to each screen or component
   - Update statuses as designs progress

### Exporting Assets

1. **Configure assets for export**:
   - Select layers that need to be exported
   - Set export settings (format, size, suffix)

2. **Organize exportable assets**:
   - Group icons in an Icons page
   - Group illustrations in an Illustrations page
   - Use consistent naming conventions

## Advanced Figma Techniques

These advanced techniques will make your designs even more developer-friendly.

### Create Interactive Prototypes

1. **Set up connections between screens**:
   - Define user flows
   - Create hotspots for interactive elements

2. **Configure interactions**:
   - Define transitions and animations
   - Add conditional logic if needed

### Use Figma Plugins for Developers

1. **Install helpful plugins**:
   - [Design Lint](https://www.figma.com/community/plugin/801195587640428208/Design-Lint) - Check for inconsistencies
   - [Contrast](https://www.figma.com/community/plugin/748533339900865323/Contrast) - Check accessibility
   - [HTML to Figma](https://www.figma.com/community/plugin/747985167520967365/HTML-To-Figma) - Import existing UI
   - [Inspect](https://www.figma.com/community/plugin/760351147138040099/Inspect) - Enhanced inspection

2. **Plugin for code generation**:
   - [Figma to React](https://www.figma.com/community/plugin/959795008371139220/Figma-to-React-Component)
   - [Figma to HTML, CSS, React & More](https://www.figma.com/community/plugin/1128581591270585971/Figma-to-HTML%2C-CSS%2C-React-%26-More)

### Create a Component Library

1. **Publish components as a library**:
   - Create a separate file for your design system
   - Publish it as a team library
   - Enable library for your project files

2. **Maintain version control**:
   - Document changes between versions
   - Use version numbering (e.g., v1.0, v1.1)

## Checklist Before Handoff

Use this checklist to ensure your Figma designs are fully prepared for development:

### Design System

- [ ] Colors are defined as variables
- [ ] Typography is defined as variables
- [ ] Spacing system is consistent
- [ ] Component variants are properly set up
- [ ] Light and dark themes are defined (if applicable)

### Components

- [ ] All components use Auto Layout
- [ ] Components have appropriate variants and properties
- [ ] Interactive states are defined (hover, active, disabled)
- [ ] Components are responsive and adapt to different screen sizes
- [ ] Components are properly named and organized

### Documentation

- [ ] Component descriptions are complete
- [ ] Interactive states are documented
- [ ] Responsive behavior is specified
- [ ] Animation specifications are provided
- [ ] Code examples are included (if possible)

### Developer Handoff

- [ ] Dev Mode is enabled
- [ ] Assets are prepared for export
- [ ] Development status is indicated
- [ ] Screens are organized logically
- [ ] Breakpoints are clearly defined

### Final Verification

- [ ] Design is consistent across all screens
- [ ] No detached instances or styles
- [ ] No conflicting component or layer names
- [ ] All text layers use text styles
- [ ] All colors use color variables

## Next Steps

With your Figma designs properly prepared for development, you're ready to start using GitHub Copilot for code generation. Check out the [Using GitHub Copilot for Code Generation](../03-copilot/README.md) guide for detailed instructions. 