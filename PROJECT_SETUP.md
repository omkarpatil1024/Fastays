# Fastays - Project Setup Guide

## Overview
Fastays is a React Native application built with TypeScript, featuring a modern architecture with TanStack Query for data fetching and state management.

## Tech Stack
- **React Native** (0.79.0)
- **TypeScript** (5.0.4)
- **React Navigation** (Native Stack)
- **TanStack Query** (React Query) - API state management
- **AsyncStorage** - Local storage
- **React Native Vector Icons** - Icons

## Project Structure

```
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Reusable UI components
├── hooks/           # Custom React hooks
│   └── useApi.ts    # TanStack Query wrapper
├── navigation/      # Navigation configuration
│   └── RootNavigator.tsx
├── pages/           # Screen components
│   ├── Splash/
│   │   ├── Splash.tsx      # UI layer
│   │   └── useSplash.ts    # Business logic
│   ├── Login/
│   │   ├── Login.tsx
│   │   └── useLogin.ts
│   └── Home/
│       ├── Home.tsx
│       └── useHome.ts
├── services/        # API services
│   ├── api.config.ts
│   ├── auth.service.ts
│   └── home.service.ts
├── theme/           # Global theming
│   └── theme.ts
├── types/           # TypeScript type definitions
│   ├── api.types.ts
│   └── navigation.types.ts
└── utils/           # Helper functions
```

## Architecture Principles

### 1. Separation of Concerns
Each page follows a strict separation pattern:
- **`Page.tsx`**: Presentation layer (UI components)
- **`usePage.ts`**: Business logic (hooks, state management, API calls)

Example:
```typescript
// Login/useLogin.ts - Business Logic
export const useLogin = ({navigation}) => {
  const [email, setEmail] = useState('');
  // ... business logic
  return { email, setEmail, handleLogin };
};

// Login/Login.tsx - Presentation
export const LoginScreen = (props) => {
  const { email, setEmail, handleLogin } = useLogin(props);
  return <View>...</View>;
};
```

### 2. API Management with TanStack Query
All API calls use TanStack Query for:
- Automatic caching
- Background refetching
- Loading and error states
- Request deduplication

```typescript
// Using the custom useApi hook
const { data, isLoading, error } = useApi.useQuery(
  ['homeData'],
  () => homeService.getHomeData()
);
```

### 3. Theming
Global theme configuration in `src/theme/theme.ts`:
- Typography (fonts, sizes, weights)
- Colors (primary, secondary, text, etc.)
- Spacing (consistent padding/margins)
- Border radius
- Shadows (platform-specific)

Usage:
```typescript
import THEME from '../../theme/theme';

const styles = StyleSheet.create({
  container: {
    padding: THEME.spacing.medium,
    backgroundColor: THEME.colors.background,
  },
});
```

## Current Features

### 1. Splash Screen
- Auto-checks authentication status
- Redirects to Login or Home based on auth state
- 2-second delay for branding

### 2. Login Screen
- Email/password authentication
- Form validation
- Loading states
- Demo credentials provided
- Secure password toggle

**Demo Credentials:**
- Email: `demo@fastays.com`
- Password: `password123`

### 3. Home Screen
- Welcome message
- Statistics cards (bookings, active stays, completed)
- Recent stays list with images
- Pull-to-refresh functionality
- Logout functionality

## API Services

### Current Implementation
The app uses **dummy API services** that simulate real API calls with delays. This allows for:
- Testing UI/UX without backend
- Demonstrating loading states
- Prototyping features

### Switching to Real API
To use real APIs, update the service files:

1. Set the API base URL in `src/services/api.config.ts`:
```typescript
export const API_CONFIG = {
  BASE_URL: 'https://your-api.com',
  // ...
};
```

2. Uncomment the real API implementations in:
   - `src/services/auth.service.ts`
   - `src/services/home.service.ts`

3. The `ApiClient` class handles:
   - Authentication headers
   - Request/response interceptors
   - Error handling
   - Timeout management

## Running the App

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

### Start Metro
```bash
npm start
```

## Development Guidelines

### Adding a New Page
1. Create folder in `src/pages/[PageName]/`
2. Create `[PageName].tsx` for UI
3. Create `use[PageName].ts` for business logic
4. Add route to `src/types/navigation.types.ts`
5. Add screen to `src/navigation/RootNavigator.tsx`

### Adding a New API Service
1. Define types in `src/types/api.types.ts`
2. Create service in `src/services/[service].service.ts`
3. Use TanStack Query in page hooks

### Styling Guidelines
- Always use theme values from `THEME`
- Use `as any` for font weights to avoid React Native type issues
- Follow existing component patterns
- Use StyleSheet.create for performance

## Type Safety
The project uses TypeScript for:
- API response types
- Navigation types
- Component props
- Service interfaces

## State Management
- **Local State**: React hooks (useState, useReducer)
- **Server State**: TanStack Query
- **Navigation State**: React Navigation
- **Persistent Storage**: AsyncStorage

## Next Steps
1. Add more screens (Profile, Bookings, etc.)
2. Implement real API integration
3. Add form validation library (e.g., react-hook-form)
4. Add error boundary
5. Implement deep linking
6. Add analytics
7. Add push notifications

## Troubleshooting

### Common Issues
1. **Font weight errors**: Use `as any` type assertion
2. **Navigation errors**: Ensure all routes are defined in types
3. **API errors**: Check network connectivity and API endpoints

### Clearing Cache
```bash
npm start -- --reset-cache
```

## Resources
- [React Native Docs](https://reactnative.dev/)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [React Navigation Docs](https://reactnavigation.org/)
