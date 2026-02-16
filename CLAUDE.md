# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website built with React and TypeScript. A static site designed to showcase accomplishments, skills, and experience, with plans to add a blog later. Deployed to Vercel at https://markdrohan.vercel.app

## Architecture

**Stack:**
- **Frontend**: React 19.2 with TypeScript in strict mode
- **Styling**: styled-components 6 (CSS-in-JS)
- **Build**: Vite 7 (dev server on port 3000, outputs to `build/`)
- **Testing**: Vitest 4 with jsdom + React Testing Library
- **Deployment**: Vercel (automated on push to main)
- **Analytics**: Vercel Analytics + Speed Insights

**Key Dependencies:**
- `react-icons` - Icon library (Fa, Si, Di, Io, Bi, Ai icon sets)
- `styled-components` - CSS-in-JS styling with theme support
- `vite-plugin-html` - Injects profile name/title into `index.html` meta tags at build time
- `tsx` - Runs the `scripts/generateManifest.ts` prebuild script

**Project Structure:**
```
src/
  App.tsx                        - Root: ThemeProvider, GlobalStyles, section layout with anchor IDs
  index.tsx                      - React entry point (StrictMode)
  styled.d.ts                    - Augments DefaultTheme for styled-components type safety
  types/
    index.ts                     - Shared types (Profile, Project, Skill, ProjectHighlight)
  data/
    portfolioData.ts             - All content: profile info, skills array, projects array
  components/
    Bio.tsx / Bio.styles.tsx      - Hero section: profile image, name, title, bio text, education
    Navigation.tsx / .styles.tsx  - Fixed nav bar, scroll-aware show/hide, smooth scroll to sections
    Skills.tsx / .styles.tsx      - Responsive grid of skill cards with icons
    Projects.tsx / .styles.tsx    - Project cards with image gallery + lightbox
    ImageModal.tsx / .styles.tsx  - Full-screen lightbox (keyboard + swipe nav)
    Contact.tsx / .styles.tsx     - Contact links (email, GitHub)
    *.test.tsx                    - Tests for each component (vitest + React Testing Library)
  styles/
    theme.ts                     - Theme object: colors, gradients, shadows, breakpoints
    GlobalStyles.tsx              - CSS reset, body styles, system font stack, line-height: 1.6
    App.styles.tsx                - AppContainer (max-width: 1240px, responsive padding)
    SharedComponents.tsx          - Reusable SectionTitle styled component
  utils/
    iconMapper.tsx                - Maps icon name strings to react-icons components via lookup table
scripts/
    generateManifest.ts          - Prebuild script: generates public/manifest.json from profile data
public/
  *.jpg, *.png                   - Profile photo + project images (referenced by filename in portfolioData)
  manifest.json                  - Auto-generated from profile data (do not edit manually)
  robots.txt                     - Search engine crawling rules
.github/workflows/
  frontend-tests.yml             - Runs `npm test` on PRs
  frontend-lint.yml              - Runs `npm run lint` on PRs
  frontend-format.yml            - Runs `npm run format:check` on PRs
  frontend-build.yml             - Runs `npm run build` on PRs
```

## Quick Start

Run locally:
```bash
npm install
npm start
```

Visit http://localhost:3000

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm start` | Dev server (Vite, port 3000, auto-opens browser) |
| `npm test` | Run all tests (vitest run) |
| `npm run test:watch` | Watch mode for tests |
| `npm run test:ui` | Vitest browser UI |
| `npm run lint` | ESLint check |
| `npm run lint:fix` | ESLint auto-fix |
| `npm run format` | Prettier auto-format |
| `npm run format:check` | Prettier check (CI) |
| `npm run build` | Production build (runs generateManifest.ts first, then tsc + vite build) |
| `npm run preview` | Preview production build locally |

## Code Quality Standards

### TypeScript

**Strict mode is fully enabled** with extra strictness flags in `tsconfig.json`:
- `strict: true` (enables all strict family flags)
- `noUncheckedIndexedAccess: true` - Array/object index access returns `T | undefined`, must be guarded
- `exactOptionalPropertyTypes: true` - Optional props can't be explicitly set to `undefined`
- `noImplicitReturns: true` - All code paths must return a value
- `noUnusedLocals: true` / `noUnusedParameters: true` - No dead code

**Code conventions:**
- No `any` types allowed
- No non-null assertions (`!`)
- Unused variables must be prefixed with `_`
- Use function declarations for components (e.g., `export function Component()`)
- Import React types with `import type { ... }` (enforced by `consistent-type-imports` rule)
- Variables: `camelCase`, `PascalCase`, or `UPPER_CASE`
- Functions: `camelCase` or `PascalCase`
- Types/interfaces: `PascalCase`

### Before Completing Any Task

**ALWAYS run all quality checks before considering a task complete:**

```bash
npm test                          # Tests must pass
npm run format:check              # Formatting must be correct
npm run lint                      # Linting must pass
npm run build                     # Build must succeed
```

If any check fails:
1. Fix the issues (use `npm run format` for auto-fixing formatting)
2. Re-run all checks
3. Only mark the task as complete when ALL checks pass

**Why this matters:** All PRs require these checks to pass in GitHub Actions. If your code fails locally, it will fail in CI/CD and block merging.

## Important Technical Details

### React Component Pattern

Use function declarations without explicit return types (TypeScript infers them):
```typescript
export function MyComponent({ prop }: Props) {
  return <div>{prop}</div>;
}
```

Import React types directly when needed:
```typescript
import type { MouseEvent, ComponentType } from 'react';
import { useState, useEffect, Fragment } from 'react';
```

### ESLint Configuration

The ESLint config (`.eslintrc.json`) is strict. Key rules to be aware of:
- `no-console: error` - No console.log (use proper error handling)
- `curly: ["error", "all"]` - Always use braces for if/else/for/while (no single-line shortcuts)
- `eqeqeq: ["error", "always"]` - Always use `===`/`!==`
- `prefer-template: error` - Use template literals over string concatenation
- `object-shorthand: error` - Use `{ foo }` not `{ foo: foo }`
- `prefer-destructuring: error` (objects only) - Use `const { x } = obj`
- `no-nested-ternary: error` - No chained ternaries
- `consistent-type-imports: error` - Use `import type` for type-only imports
- `react-hooks/exhaustive-deps: error` - Hook dependencies must be complete
- `no-unnecessary-condition: error` - No redundant boolean checks
- `naming-convention` - Enforced casing for variables, functions, and types

### Styling Patterns

All styling uses **styled-components** (CSS-in-JS). There are no separate CSS files.

**Component pairing**: Each component has a paired `.styles.tsx` file:
- `ComponentName.tsx` - Logic, state, event handlers, JSX
- `ComponentName.styles.tsx` - All styled-components for that component

**Theme**: The theme object in `src/styles/theme.ts` provides colors, gradients, shadows, and breakpoints. It is provided via `<ThemeProvider>` in `App.tsx` and typed via `src/styled.d.ts` (augments `DefaultTheme`). Access values via interpolation:
```typescript
color: ${({ theme }) => theme.colors.accentPrimary};
background: ${({ theme }) => theme.gradients.accent};
box-shadow: ${({ theme }) => theme.shadows.large};
```

**Design tokens:**
- Dark theme with cyan (`#00d9ff`) to purple (`#7b2cbf`) gradient accents
- Background layers: `bgPrimary` (`#0a0e27`, darkest) > `bgSecondary` (`#151934`) > `bgCard` (`#1a1f3a`, lightest)
- Text: `textPrimary` (`#e4e6eb`) for headings, `textSecondary` (`#b0b3b8`) for body text
- Border color: `#2a2f4a`
- Gradient accent: `linear-gradient(135deg, #00d9ff 0%, #7b2cbf 100%)` - used on section titles via `background-clip: text`
- Shadows: `small` (cards), `large` (elevated elements), `hover` (interactive hover states)

**Transient props**: Use `$` prefix for props that should not be forwarded to the DOM (e.g., `$isOpen`, `$isSingle`, `$isClickable`, `$isVisible`, `$compact`). This is a styled-components convention to avoid React DOM warnings.

**Animation patterns:**
- CSS transitions for hover states (transform, opacity, border-color) with `0.3s ease`
- Keyframe animations for modal open (`fadeIn`, `zoomIn`) and nav button appearance (`fadeInNav`)
- Navigation show/hide uses `transform: translateY()` with CSS transition

### Responsive Design

The site is optimised for desktop and mobile. Three breakpoints are defined in `src/styles/theme.ts`:
- **Mobile**: 480px
- **Tablet**: 768px
- **Desktop**: 1200px (max-width of AppContainer is 1240px)

**Media query pattern:**
```typescript
@media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
  font-size: 2rem;
}

@media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
  font-size: 1.75rem;
}
```

**Conventions:**
- Font sizes MUST scale at both tablet AND mobile breakpoints (not just tablet)
- Image galleries use horizontal scroll with CSS `scroll-snap` on mobile (not vertical stacking)
- ImageModal supports both keyboard (Esc, Arrow keys) and touch swipe navigation
- Navigation hides brand logo on mobile, centers nav links
- Skills grid: 4 columns (desktop) > 3 columns (tablet) > 2 columns (mobile)
- Minimum touch target size: 44x44px
- Hidden scrollbar on mobile galleries (`scrollbar-width: none` + `::-webkit-scrollbar { display: none }`)

**Mobile testing checklist for new features:**
- Test at 375px width (iPhone SE) and 390px width (iPhone 14)
- Verify text is readable without horizontal scrolling
- Ensure touch targets are at least 44x44px
- Check that horizontal scroll galleries show visual cues (peek of next image)
- Verify fixed navigation doesn't overlap content

### Component Architecture

Each component follows a consistent pattern:
- **`Component.tsx`** - Logic, state, event handlers, JSX structure
- **`Component.styles.tsx`** - All styled-components for that component
- **`Component.test.tsx`** - Unit tests using React Testing Library + vitest

**Key components:**

- **App** (`src/App.tsx`) - Root component. Wraps everything in `<ThemeProvider>`. Renders `GlobalStyles`, then `Navigation` (outside `AppContainer` since it's fixed/full-width), then all sections inside `AppContainer`. Each section is wrapped in a `<div id="...">` for anchor scroll navigation.

- **Navigation** (`src/components/Navigation.tsx`) - Fixed position nav bar with backdrop blur. Hides on scroll-down, shows on scroll-up (tracks `lastScrollY` via ref). Uses `isNavClickScrollRef` to prevent the hide behavior when the user clicks a nav link (smooth scrolls to section, pauses scroll detection for 1 second). Brand logo (profile image + name) hidden on mobile. Four nav links: About, Skills, Projects, Contact.

- **Bio** (`src/components/Bio.tsx`) - Profile hero section. Splits `profile.bio` by `. ` to display each sentence on its own line using `<Fragment>` with `<br />` tags. Shows profile image (circular, bordered), name (gradient text), title, bio text, and education line.

- **Skills** (`src/components/Skills.tsx`) - Responsive CSS Grid layout. Renders skill cards with icons from `react-icons`. The `iconName` string in portfolio data maps to actual icon components via the `Icon` component in `iconMapper.tsx`.

- **Projects** (`src/components/Projects.tsx`) - Card layout with image galleries. Manages lightbox state: `modalOpen`, `selectedImage`, `currentImageIndex`, `currentProjectImages`. Multi-image projects show a horizontal scrollable gallery with scroll-snap on mobile. Single-image projects are centered. Clicking an image opens the ImageModal. Keyboard accessible (`tabIndex={0}`, Enter/Space to open).

- **ImageModal** (`src/components/ImageModal.tsx`) - Full-screen overlay lightbox. Navigation: Escape to close, Arrow keys for prev/next, touch swipe for prev/next on mobile (50px threshold, ignores vertical swipes). Uses refs for all callback props to avoid effect dependency churn (a pattern to keep `useCallback` dependency arrays empty while still calling latest callbacks). Locks body scroll when open.

- **Contact** (`src/components/Contact.tsx`) - Email and GitHub links. Uses the `Icon` component for envelope and GitHub icons.

**Data flow**: `portfolioData.ts` > `App.tsx` > components via props. Navigation imports `profile` directly for the brand logo.

### Data Model

Types defined in `src/types/index.ts`. All data lives in `src/data/portfolioData.ts`, designed for easy future database migration (each entity has an `id` field).

- **`Profile`**: name, title, bio, image, email, github, university, graduationYear
- **`Skill`**: name, iconName (maps to react-icons via `iconMapper`), category (`language` | `framework` | `tool`)
- **`Project`**: title, role, description, highlights[], images[], tags[], orderIndex
- **`ProjectHighlight`**: text, orderIndex

**Image references**: Project images and the profile photo are stored as filenames (e.g., `'NASA1.jpg'`) in `portfolioData.ts`. These files live in `public/` and are served at the root URL. Vite serves them directly in dev and copies them to `build/` in production.

### Icon System

The `Icon` component in `src/utils/iconMapper.tsx` maps string names to `react-icons` components via a lookup table (`iconMap`). To add a new icon:

1. Import the icon from the relevant `react-icons` package (e.g., `import { FaDocker } from 'react-icons/fa'`)
2. Add it to the `iconMap` record: `FaDocker,`
3. Reference the string name in `portfolioData.ts`: `iconName: 'FaDocker'`

If an icon name is not found in the map, a `?` fallback is rendered. The component accepts `iconName`, optional `className`, and optional `size` props.

### Testing Patterns

Tests use **Vitest** with **jsdom** environment and **React Testing Library**. Global test imports (`describe`, `it`, `expect`, `vi`) are available without imports (configured via `vitest/globals` in `tsconfig.json`).

**Common patterns:**
- `renderWithTheme()` helper wraps components in `<ThemeProvider theme={theme}>` since all styled-components need theme access
- Tests use `screen.getByRole`, `screen.getByText`, `screen.getByAltText` for queries (prefer accessible selectors)
- Mock functions with `vi.fn()`, clear with `mockClear()` in `beforeEach`
- DOM events via `fireEvent.click()`, `fireEvent.keyDown()`, `fireEvent.touchStart()` etc.
- Touch events dispatched on `document` (since ImageModal attaches listeners to `document`)

**Test file location**: Co-located with components (e.g., `Bio.test.tsx` next to `Bio.tsx`).

### Accessibility

The codebase follows accessibility best practices consistently:
- Semantic HTML: `<nav>`, `<section>`, `<ul>`/`<li>` with `role="list"`/`role="listitem"`
- ARIA labels on all interactive elements and sections (`aria-label`)
- ARIA roles: `role="dialog"` and `aria-modal="true"` on ImageModal, `role="navigation"` on nav, `role="menu"`/`role="menuitem"` on nav links
- Keyboard support: all clickable images have `tabIndex={0}` and `onKeyDown` for Enter/Space
- Image alt text includes context (e.g., `"NASA Space Apps Challenge screenshot 1 of 3"`)
- Modal navigation via keyboard (Escape, Arrow keys) alongside touch swipe

### Adding New Content

- **New skill**: Add entry to `skills` array in `portfolioData.ts`. If the icon doesn't exist in `iconMapper.tsx`, import it from `react-icons` and add to `iconMap`.
- **New project**: Add entry to `projects` array in `portfolioData.ts`. Place image files in `public/`. Set `orderIndex` for display order (lower = appears first).
- **New section**: Create `SectionName.tsx` + `SectionName.styles.tsx` + `SectionName.test.tsx` in `src/components/`. Import and render in `App.tsx`, wrapping in `<div id="sectionname">` for nav anchor support. Add a nav link in `Navigation.tsx`.
- **New contact method**: Add a new `<ContactLink>` in `Contact.tsx`. Add any needed icon to `iconMapper.tsx`.

## Deployment

The site is deployed to Vercel at https://markdrohan.vercel.app and automatically redeploys when changes are pushed to the `main` branch. No manual deployment commands are needed.

The build process:
1. `prebuild`: Runs `tsx scripts/generateManifest.ts` to generate `public/manifest.json` from profile data
2. `build`: Runs `tsc` (type checking) then `vite build` (bundling to `build/` directory with sourcemaps)

Vite uses `vite-plugin-html` to inject `profile.name` and `profile.title` into the HTML template at build time for SEO meta tags.

## GitHub Actions Workflows

### PR Checks (Required for Merge)
- **Frontend Tests** (`frontend-tests.yml`) - Runs `npm test`
- **Frontend Linting** (`frontend-lint.yml`) - Runs `npm run lint`
- **Frontend Formatting** (`frontend-format.yml`) - Runs `npm run format:check`
- **Frontend Build** (`frontend-build.yml`) - Runs `npm run build`

All workflows use Node.js 20 on ubuntu-latest. They only trigger on PRs to `main` when relevant files change (src/, public/, package.json, config files) to save CI/CD minutes.

## Vercel Speed Insights

The site includes Vercel Analytics (`<Analytics />`) and Speed Insights (`<SpeedInsights />`). Both components are rendered in `App.tsx` and automatically track page views and performance metrics in production. They are no-ops in development.
