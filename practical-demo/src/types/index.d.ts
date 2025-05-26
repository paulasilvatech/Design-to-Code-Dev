// Type declarations for the project

// Declare module for CSS files
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Declare module for image files
declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

// Global type declarations
interface Window {
  // Add any global window properties here
} 