# .github/copilot-instructions.md

## Project Context
This project converts Figma designs to production-ready code using modern web technologies.

## Technology Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v3
- **State Management**: Zustand
- **Data Fetching**: TanStack Query v5
- **Forms**: React Hook Form + Zod
- **Testing**: Jest + React Testing Library
- **Animation**: Framer Motion

## Code Style Guidelines

### TypeScript
- Use type inference where possible
- Prefer interfaces over types for objects
- Use strict null checks
- Export types from component files

```typescript
// Good
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

// Avoid
type ButtonProps = {
  variant?: string;
  size?: string;
  children: any;
  onClick?: Function;
}
```

### React Components
- Use functional components with hooks
- Implement proper error boundaries
- Include loading and error states
- Make components accessible by default

```typescript
// Component template
export const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
  // Hooks first
  const [state, setState] = useState();
  
  // Computed values
  const computedValue = useMemo(() => {}, []);
  
  // Effects
  useEffect(() => {}, []);
  
  // Handlers
  const handleClick = useCallback(() => {}, []);
  
  // Render
  return <div>{/* JSX */}</div>;
};
```

### Tailwind CSS
- Use semantic color names from our palette
- Prefer composition over custom CSS
- Group related utilities
- Use CSS variables for dynamic values

```typescript
// Good
<div className="flex items-center gap-4 p-6 bg-surface rounded-lg shadow-card">

// Avoid
<div style={{ display: 'flex', padding: '24px' }}>
```

## File Structure
```
src/
├── app/              # Next.js app router
├── components/       # Reusable components
│   ├── ui/          # Base UI components
│   └── features/    # Feature-specific components
├── hooks/           # Custom React hooks
├── lib/             # Utilities and helpers
├── services/        # API services
├── stores/          # Zustand stores
├── types/           # TypeScript types
└── styles/          # Global styles
```

## Figma Integration Guidelines

### When Converting Figma Designs
1. **Respect Design Tokens**: Use exact values from Figma
2. **Maintain Hierarchy**: Keep the same component structure
3. **Export Assets**: Download all images/icons as optimized formats
4. **Responsive Design**: Implement all breakpoints from Figma
5. **Interactions**: Include all hover/active states

### Image Handling
```typescript
// Always use Next.js Image component
import Image from 'next/image';

<Image
  src="/images/hero.jpg"
  alt="Descriptive alt text"
  width={1200}
  height={600}
  priority
  className="rounded-lg"
/>
```

## Component Patterns

### Data Fetching Pattern
```typescript
// Use React Query for data fetching
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

### Form Pattern
```typescript
// Use React Hook Form with Zod validation
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  
  const onSubmit = (data: FormData) => {
    // Handle submission
  };
  
  return <form onSubmit={form.handleSubmit(onSubmit)}>{/* fields */}</form>;
}
```

## Performance Guidelines
- Lazy load components below the fold
- Use dynamic imports for large dependencies
- Optimize images (WebP format, proper sizing)
- Implement proper caching strategies
- Minimize bundle size

## Accessibility Requirements
- All interactive elements must be keyboard accessible
- Include proper ARIA labels
- Maintain 4.5:1 color contrast ratio
- Support screen readers
- Test with axe-core

## Testing Standards
```typescript
// Test file naming: ComponentName.test.tsx
describe('ComponentName', () => {
  it('should render without crashing', () => {
    render(<ComponentName />);
  });
  
  it('should handle user interactions', async () => {
    const { getByRole } = render(<ComponentName />);
    const button = getByRole('button');
    
    await userEvent.click(button);
    
    expect(mockHandler).toHaveBeenCalled();
  });
});
```

## Git Commit Convention
```
feat: add new feature
fix: resolve bug
docs: update documentation
style: formatting changes
refactor: code restructuring
test: add tests
chore: maintenance tasks
```

## Common Utilities

### Classname Helper
```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### API Error Handler
```typescript
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
```

## Environment Variables
```env
# .env.local
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_SITE_URL=
FIGMA_API_KEY=
```

Remember: When generating code from Figma, always prioritize:
1. **Pixel-perfect accuracy**
2. **Performance optimization**
3. **Accessibility compliance**
4. **Type safety**
5. **Maintainability**