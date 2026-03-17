# Enterprise Dashboard with Real-time Analytics

Production-style React dashboard scaffold built for Week 10 (Advanced React + Modern Frontend Architecture) with TypeScript strict mode, Redux Toolkit, React Router v6 nested routes/loaders/guards, React Query, Recharts, and WebSocket-driven live updates.

## Tech Stack
- React 19 + TypeScript (strict)
- Vite 8
- Redux Toolkit + Redux Persist
- React Router v6 (nested routes, loader prefetch, route guards)
- React Query (server state pattern)
- Material UI
- Recharts
- i18next
- PWA baseline (manifest + service worker)

## Quick Start
```bash
npm install
npm run dev
```

## Scripts
```bash
npm run dev         # Start local development server
npm run build       # Type-check + production build
npm run lint        # ESLint
npm run preview     # Preview production build
npm run type-check  # TS type check only
npm run test        # Placeholder (Jest files are scaffolded)
```

## Folder Structure
```text
src/
  app/
    hooks/
    providers/
    router/
    store/
  features/
    auth/
    dashboard/
    notifications/
  components/
    atoms/
    molecules/
    organisms/
    templates/
  hooks/
  pages/
  services/
  styles/
  types/
  utils/
```

## Implemented Architecture Highlights
- Feature-based Redux slices:
  - `auth`
  - `dashboard`
  - `notifications`
- Custom middleware chain (`apiMiddleware`, `loggerMiddleware`)
- Persisted auth state with `redux-persist`
- Route protection:
  - `ProtectedRoute` for authentication
  - `RoleRoute` for role-based access (`settings`)
- Loader-based prefetch:
  - `dashboardLoader` dispatches `fetchDashboardData` before render
- Route-based code splitting with `React.lazy` + `Suspense`
- Real-time pattern:
  - `WebSocketService` with reconnect logic
  - `useWebSocket` hook dispatches live dashboard + notifications
- Atomic component system:
  - `atoms`, `molecules`, `organisms`, `templates`

## Auth Demo Credentials
```text
email: admin@enterprise.io
password: password123
```

## PWA Baseline
- `public/manifest.webmanifest`
- `public/sw.js`
- Service worker registration in `src/main.tsx`

## Testing / Storybook / Cypress Notes
Test files, Storybook config, and Cypress scaffold files are included, but this environment currently does not have those dev dependencies installed from registry cache. Install the following to run them fully:
- Jest stack: `jest`, `ts-jest`, `@types/jest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jest-environment-jsdom`
- Storybook stack: `storybook`, `@storybook/react-vite`, `@storybook/addon-essentials`
- Cypress: `cypress`

## Build Verification
Validated locally:
- `npm run lint` passes
- `npm run build` passes and emits route chunks
