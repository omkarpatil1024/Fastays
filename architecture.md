## Project Structure and Guidelines

### Directory Structure
- `src/assets/` - Contains static assets (images, fonts, etc.)
- `src/components/` - Houses reusable UI components
- `src/lib/` - Core utility functions and shared libraries
- `src/contexts/` - React Context providers for state management
- `src/hooks/` - Custom React hooks
  - Default hook: `useApi.ts` (API interceptor)
- `src/pages/` - Page-level components
- `src/services/` - API services using TanStack React Query
- `src/types/` - TypeScript type definitions
- `src/utils/` - Helper functions and utilities
- `src/layouts/` - Layout components and templates

### Architecture Principles
1. **Separation of Concerns**
   - Business logic and presentation are strictly separated
   - Each page has two files:
     - `usePage.ts`: Business logic implementation
     - `page.tsx`: Presentation layer
   - Example: `Login/useLogin.tsx` and `Login/Login.tsx`

2. **Styling Guidelines**
   - Use React Icons library for icons
   - Use comman styling from the theme.ts file

3. **Data Management**
   - TanStack React Query for all API calls
   - Custom hooks for complex component logic
     - Example: `ChatUi.tsx` uses `useChatUi.tsx`

4. **Development Standards**
   - Strict adherence to project structure
   - Consistent file naming conventions
   - Component logic extraction to custom hooks when complexity increases
   - Always check the code before updating it, don't assume it's correct