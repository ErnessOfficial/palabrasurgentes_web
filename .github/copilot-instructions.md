# AI Agent Instructions for entrepalabrasurgentes-vite

## Project Overview
This is a React + TypeScript + Vite project for a bilingual (Spanish/English) website. The project uses a component-based architecture with centralized language management.

## Key Architecture Patterns

### Component Structure
- Main app layout is defined in `src/App.tsx`
- Components are organized in `src/components/`
- Core components: `Header`, `Footer`, `Navigation`, `MainContent`, `FlipCard`, `LanguageSelector`

### Internationalization (i18n)
- Language management using React Context (`src/hooks/useLanguage.tsx`)
- Translations in `src/translations/{en.ts,es.ts}`
- Default language is Spanish ('es')
- Language switching is handled via `LanguageSelector` component

### State Management
- Uses React's built-in state management (useState, useContext)
- Section navigation state managed at App level and passed down via props
- Language state managed globally through LanguageContext

## Development Workflow

### Setup and Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
- Development server runs on port 5173
- Auto-opens browser on start

### Production Build
```bash
npm run build
npm run preview
```

## Code Conventions

### TypeScript
- Use TypeScript for all new code
- React components should use `React.FC` type with explicit props interface
- Language type is strictly typed as `'en' | 'es'`

### Component Guidelines
- Keep components in dedicated files under `src/components/`
- Use functional components with hooks
- Props interfaces should be defined above component declarations

### Translation Pattern
When adding new text:
1. Add the text to both `src/translations/es.ts` and `src/translations/en.ts`
2. Access translations using the `useLanguage` hook:
```typescript
const { language } = useLanguage();
const text = translations[language].yourKey;
```

## Key Files and Entry Points
- `src/App.tsx` - Main application component
- `src/main.tsx` - Application entry point
- `src/hooks/useLanguage.tsx` - Language context and hook
- `vite.config.ts` - Build and dev server configuration

## API Integration
- API endpoints are in `api/` directory
- Uses `node-fetch` for API calls