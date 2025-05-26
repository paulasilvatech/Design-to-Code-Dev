# GitHub Copilot Prompt Templates for Figma to Code

## 🎯 Basic Templates

### 1. Simple HTML/CSS Page
```
Create a complete HTML5, CSS, and JavaScript structure using this Figma design: [FIGMA_LINK]

Requirements:
- Semantic HTML with proper tags
- Mobile-first responsive CSS
- Download and organize all images in /images folder
- Basic JavaScript for interactions
- Use CSS Grid/Flexbox for layout
```

### 2. React Component
```
Analyze this Figma component: [FIGMA_LINK]

Generate a React functional component with:
- TypeScript interfaces
- Styled-components
- Props for all customizable elements
- Proper event handlers
- Accessibility attributes (ARIA)
- Export all required images
```

### 3. Next.js Page
```
Transform this Figma design into a Next.js 14 page: [FIGMA_LINK]

Requirements:
- App Router structure
- Server Components where possible
- Client Components for interactivity
- Tailwind CSS for styling
- SEO metadata
- Image optimization with next/image
- Loading and error states
```

## 🚀 Advanced Templates

### 4. Full E-commerce Product Page
```
Using this Figma design: [FIGMA_LINK]

Create a complete e-commerce product page with:

Tech Stack:
- Next.js 14 with TypeScript
- Tailwind CSS
- Framer Motion for animations
- React Query for data fetching

Components:
1. ProductGallery with zoom and thumbnails
2. ProductInfo with variants and pricing
3. AddToCart with quantity selector
4. Reviews section with ratings
5. Related products carousel

Features:
- Responsive design (mobile, tablet, desktop)
- Loading skeletons
- Error boundaries
- Optimistic UI updates
```

### 5. Dashboard with Charts
```
Convert this Figma dashboard: [FIGMA_LINK]

Create an interactive dashboard with:

Stack:
- React 18 + TypeScript
- Recharts for visualizations
- Tailwind CSS
- Tanstack Query

Components:
- KPI cards with animated counters
- Line chart (trends)
- Bar chart (comparisons)
- Pie chart (distribution)
- Data table with sorting/filtering
- Date range picker

Requirements:
- Real-time data updates
- Export to CSV/PDF
- Dark mode support
- Responsive layout
```

### 6. Landing Page with Animations
```
Transform this Figma landing page: [FIGMA_LINK]

Build a modern landing page with:

Features:
- Parallax scrolling effects
- Intersection Observer animations
- Smooth scroll navigation
- Video background support
- Form with validation
- Newsletter signup
- Testimonials carousel

Tech:
- HTML5/CSS3/Vanilla JS
- GSAP for complex animations
- CSS custom properties
- Progressive enhancement
```

## 🏗️ Enterprise Templates

### 7. Design System Components
```
Extract design system from Figma: [FIGMA_LINK]

Create a component library with:

Structure:
components/
  Button/
    Button.tsx
    Button.styles.ts
    Button.test.tsx
    Button.stories.tsx
  Card/
  Input/
  Modal/

Requirements:
- Storybook documentation
- Unit tests with Jest
- Accessibility tests
- Theme support
- TypeScript strict mode
- Published to npm
```

### 8. Multi-platform App
```
Using this Figma design: [FIGMA_LINK]

Generate code for multiple platforms:

1. Web (React):
   - Responsive web app
   - PWA capabilities
   - Offline support

2. Mobile (React Native):
   - iOS/Android components
   - Native navigation
   - Platform-specific styles

3. Desktop (Electron):
   - Native menus
   - System tray integration
   - Auto-updates

Shared:
- Business logic
- API services
- State management
```

## 📝 Specialized Templates

### 9. Form-Heavy Application
```
Convert this Figma form design: [FIGMA_LINK]

Create a complex form with:
- Multi-step wizard
- Field validation (Yup/Zod)
- Conditional fields
- File uploads with preview
- Auto-save functionality
- Progress indicators
- Error recovery
- Accessibility compliance
```

### 10. Data Visualization Dashboard
```
Transform this analytics Figma design: [FIGMA_LINK]

Build a data-heavy dashboard:
- Real-time WebSocket updates
- 10+ chart types (D3.js)
- Drill-down functionality
- Custom tooltips
- Export capabilities
- Responsive charts
- Performance optimization
- Virtual scrolling for tables
```

## 💡 Pro Tips for Prompts

### 1. Be Specific About Technology
```
Bad: "Convert this design to code"
Good: "Convert this design to React 18 with TypeScript, Tailwind CSS, and Framer Motion"
```

### 2. Define Component Structure
```
Bad: "Make it responsive"
Good: "Create responsive breakpoints: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)"
```

### 3. Specify State Management
```
Bad: "Add interactivity"
Good: "Use Zustand for global state, React Hook Form for forms, and React Query for server state"
```

### 4. Include Performance Requirements
```
Bad: "Make it fast"
Good: "Optimize with lazy loading, code splitting, image optimization, and achieve 90+ Lighthouse score"
```

### 5. Request Folder Structure
```
Bad: "Organize the code"
Good: "Use this structure:
src/
  components/
  hooks/
  utils/
  styles/
  types/
  services/"
```

## 🔧 Troubleshooting Prompts

### When Results Are Incomplete
```
The previous generation was incomplete. Please continue from where you left off and:
1. Complete the [COMPONENT_NAME] component
2. Add the missing styles
3. Include all image exports
4. Finish the responsive breakpoints
```

### When Code Needs Optimization
```
Optimize the generated code for:
- Performance (lazy loading, memoization)
- Bundle size (tree shaking, dynamic imports)
- SEO (meta tags, structured data)
- Accessibility (WCAG 2.1 AA compliance)
```

### When Styling Doesn't Match
```
The styling doesn't match the Figma design. Please:
1. Use exact colors from Figma: [LIST_COLORS]
2. Match spacing/padding precisely
3. Implement the exact border radius
4. Use the correct font weights
5. Add missing hover states
```

## 🎨 Design-Specific Prompts

### For Complex Layouts
```
This Figma design has a complex grid layout. Generate CSS Grid code that:
- Handles all breakpoints
- Maintains aspect ratios
- Uses named grid areas
- Includes fallbacks for older browsers
```

### For Micro-interactions
```
Add these micro-interactions from the Figma prototype:
1. Button hover effects with scale
2. Card lift on hover
3. Smooth color transitions
4. Loading state animations
5. Success/error state feedback
```

### For Dark Mode
```
The Figma file includes dark mode designs. Implement:
- CSS custom properties for theming
- System preference detection
- Smooth theme transitions
- Persistent theme selection
- Proper contrast ratios
```

Remember: The more specific and structured your prompt, the better the generated code will match your Figma design!