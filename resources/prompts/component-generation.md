# Component Generation Prompts

## Basic Component Generation

### Button Component
```
Generate a React Button component with TypeScript from this Figma design:
- Include all interactive states (default, hover, active, disabled)
- Use styled-components for styling
- Make it accessible with proper ARIA attributes
- Include all size variants (small, medium, large)
- Add support for icons (leading, trailing)
- Export proper TypeScript types
```

### Input Field Component
```
Create an Input component from this Figma design with:
- All states (default, focused, error, success, disabled)
- Label and helper text support
- Validation feedback
- Proper form integration
- Keyboard navigation support
- TypeScript interfaces for all props
```

## Advanced Component Generation

### Card Component with AI Analysis
```
Analyze this Figma card design and generate a React component that:
1. Automatically detects the layout structure (header, body, footer)
2. Identifies interactive elements and their states
3. Extracts design tokens (colors, spacing, typography)
4. Creates responsive variants based on the design
5. Implements proper semantic HTML
6. Includes hover effects and transitions
7. Generates corresponding Storybook stories
8. Creates unit tests for all interactions
```

### Navigation Component
```
From this Figma navigation design, create a responsive navigation component:
- Desktop and mobile variants
- Smooth transitions between states
- Dropdown/mega menu support if detected
- Accessibility features (keyboard navigation, ARIA)
- Integration with routing libraries
- Performance optimizations (lazy loading for mobile menu)
- Include documentation for all props and usage examples
```

## Design System Integration

### Component with Design Tokens
```
Generate a component that:
1. Uses existing design tokens from our system
2. Falls back to extracted values if tokens don't exist
3. Updates the design token file with any new values
4. Maintains consistency with existing components
5. Follows our naming conventions
6. Integrates with our theme provider
```

### Variant-based Component
```
Create a component with multiple variants from this Figma component set:
- Extract all variants automatically
- Generate a variant prop with TypeScript union types
- Create a variant mapping system
- Ensure smooth transitions between variants
- Generate Storybook stories for each variant
- Document variant use cases
```

## Accessibility-First Generation

### Accessible Form Component
```
Generate an accessible form component from this design:
- Proper label associations
- Error message announcements
- Keyboard navigation
- Screen reader friendly
- WCAG 2.1 AA compliant
- Include accessibility tests
- Document accessibility features
```

## Performance-Optimized Generation

### Large Data Table
```
From this table design, create a performance-optimized component:
- Virtual scrolling for large datasets
- Lazy loading of data
- Memoization of expensive operations
- Efficient re-render strategies
- Column sorting and filtering
- Responsive behavior
- Export data functionality
```

## AI-Enhanced Prompts

### Smart Component Analysis
```
Analyze this Figma design and:
1. Identify the component type automatically
2. Suggest the best implementation approach
3. Detect patterns from similar components in the codebase
4. Recommend performance optimizations
5. Identify potential accessibility issues
6. Suggest design system integration points
7. Generate comprehensive test cases
8. Create usage documentation
```

### Design-to-Code with Context
```
Generate a component considering:
- Existing component library patterns
- Current tech stack (React 18, TypeScript 5, Styled Components)
- Performance budget (< 50KB, < 100ms render)
- Accessibility requirements (WCAG 2.1 AA)
- Design system constraints
- Mobile-first approach
- SEO requirements if applicable
```

## Batch Processing Prompts

### Multiple Component Generation
```
From this Figma file containing multiple components:
1. Identify all unique components
2. Detect shared patterns and create base components
3. Generate a component hierarchy
4. Create an efficient import/export structure
5. Generate a component showcase page
6. Create integration tests
7. Update the component library index
```

## Custom Framework Prompts

### Vue.js Component
```
Generate a Vue 3 component with:
- Composition API
- TypeScript support
- Scoped styling
- Props validation
- Event emissions with types
- Lifecycle optimization
- Template refs where needed
```

### Angular Component
```
Create an Angular component from this design:
- Standalone component architecture
- OnPush change detection
- RxJS for state management
- Angular Material integration
- Proper dependency injection
- Unit tests with TestBed
```

## Documentation Generation

### Component Documentation
```
For this generated component, create:
1. README with usage examples
2. API documentation for all props
3. Storybook stories with controls
4. Integration guide
5. Migration guide from old version
6. Performance considerations
7. Accessibility notes
8. Design decisions explanation
``` 