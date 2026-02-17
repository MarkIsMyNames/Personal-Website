# CLAUDE.md

Guidance for Claude Code when working with this repository.

## Project Overview

Personal portfolio website for Mark Drohan, built with React + TypeScript. Static single-page site showcasing skills, projects, and experience. Deployed to Vercel at https://markdrohan.vercel.app (auto-deploys on push to `main`).

**Stack:** React 19 | TypeScript (strict) | styled-components 6 | Vite 7 | Vitest 4 | Vercel

---

## Quick Start

```bash
npm install
npm start          # Dev server at http://localhost:3000
```

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
| `npm run build` | Production build (prebuild manifest + tsc + vite build to `build/`) |
| `npm run preview` | Preview production build locally |

### Before Completing Any Task

**ALWAYS run all quality checks before considering a task complete:**

```bash
npm test && npm run format:check && npm run lint && npm run build
```

If any check fails, fix the issues (use `npm run format` for auto-fixing formatting), re-run all checks, and only consider the task complete when ALL checks pass. All PRs require these checks to pass in GitHub Actions.

---

## Codebase Structure

```
Mark.github.io/
├── CLAUDE.md                          # This file - AI assistant guidance
├── package.json                       # Dependencies & scripts
├── tsconfig.json                      # TypeScript config (strict mode + extra flags)
├── vite.config.ts                     # Vite + Vitest config (port 3000, build → build/)
├── .eslintrc.json                     # ESLint rules (very strict)
├── .prettierrc.json                   # Prettier config (single quotes, 100 char width)
│
├── src/
│   ├── index.tsx                      # React entry point (StrictMode)
│   ├── App.tsx                        # Root: ThemeProvider → GlobalStyles → Nav → Sections
│   ├── App.test.tsx                   # App-level tests
│   ├── setupTests.ts                  # Imports @testing-library/jest-dom
│   ├── styled.d.ts                    # Augments DefaultTheme for styled-components typing
│   │
│   ├── types/
│   │   └── index.ts                   # Shared types: Profile, Skill, Project, ProjectHighlight
│   │
│   ├── data/
│   │   ├── portfolioData.ts           # ALL site content: profile, skills[], projects[]
│   │   └── portfolioData.test.ts      # Data validation tests
│   │
│   ├── components/                    # Each component = .tsx + .styles.tsx + .test.tsx
│   │   ├── Navigation.tsx             # Fixed nav bar, scroll-aware show/hide, smooth scroll
│   │   ├── Navigation.styles.tsx
│   │   ├── Navigation.test.tsx
│   │   ├── Bio.tsx                    # Hero section: profile image, name, title, bio, education
│   │   ├── Bio.styles.tsx
│   │   ├── Bio.test.tsx
│   │   ├── Skills.tsx                 # Responsive grid of skill cards with icons
│   │   ├── Skills.styles.tsx
│   │   ├── Skills.test.tsx
│   │   ├── Projects.tsx               # Project cards with image gallery + lightbox trigger
│   │   ├── Projects.styles.tsx
│   │   ├── Projects.test.tsx
│   │   ├── ImageModal.tsx             # Full-screen lightbox (keyboard + swipe navigation)
│   │   ├── ImageModal.styles.tsx
│   │   ├── ImageModal.test.tsx
│   │   ├── Contact.tsx                # Email + GitHub contact links
│   │   ├── Contact.styles.tsx
│   │   └── Contact.test.tsx
│   │
│   ├── styles/
│   │   ├── theme.ts                   # Theme: colors, gradients, shadows, breakpoints
│   │   ├── GlobalStyles.tsx           # CSS reset, body styles, system font stack
│   │   ├── App.styles.tsx             # AppContainer (max-width: 1240px, responsive padding)
│   │   ├── SharedComponents.tsx       # Reusable SectionTitle styled component
│   │   └── SharedComponents.test.tsx
│   │
│   └── utils/
│       └── iconMapper.tsx             # Maps icon name strings → react-icons components
│
├── scripts/
│   └── generateManifest.ts            # Prebuild: generates public/manifest.json from profile
│
├── public/                            # Static assets (served at root URL)
│   ├── Personal Profile.jpg           # Profile photo
│   ├── Intercom.png                   # Project images...
│   ├── Ganzy.png
│   ├── NASA1.jpg, NASA2.jpg, NASA3.jpg
│   ├── Hult 1.jpg, Hult 2.png, Hult 3.jpg
│   ├── HackJunction1.jpg, HackJunction2.jpg, HackJunction3.jpg
│   ├── AWSHACK1.jpg, AWSHACK2.png, AWSHACK3.jpg
│   ├── manifest.json                  # Auto-generated (do NOT edit manually)
│   └── robots.txt
│
└── .github/workflows/                 # PR checks (all required for merge)
    ├── frontend-tests.yml             # npm test
    ├── frontend-lint.yml              # npm run lint
    ├── frontend-format.yml            # npm run format:check
    └── frontend-build.yml             # npm run build
```

---

## Data Flow & Architecture

### How the App Renders

```
index.tsx → App.tsx → ThemeProvider(theme)
                        ├── GlobalStyles (CSS reset)
                        ├── Navigation (fixed, full-width, outside AppContainer)
                        └── AppContainer (max-width: 1240px)
                              ├── <div id="about">  → Bio(profile)
                              ├── <div id="skills"> → Skills(skills)
                              ├── <div id="projects"> → Projects(projects)
                              ├── <div id="contact"> → Contact(profile)
                              ├── <Analytics />
                              └── <SpeedInsights />
```

### Data Model (src/types/index.ts)

| Type | Fields | Used By |
|------|--------|---------|
| `Profile` | name, title, bio, image, email, github, university, graduationYear | Bio, Contact, Navigation |
| `SkillCategory` (enum) | `Language`, `Framework`, `Concept`, `Technology` | Skill |
| `Skill` | name, iconName, category (`SkillCategory`) | Skills |
| `Project` | title, role, description, highlights[], images[], tags[] | Projects |
| `ProjectHighlight` | text | Projects (nested in Project) |

All content lives in `src/data/portfolioData.ts` as exported arrays/objects. Data flows: `portfolioData.ts` → `App.tsx` → components via props. Navigation also imports `profile` directly for the brand logo.

### Icon System (src/utils/iconMapper.tsx)

Maps string names to `react-icons` components via a lookup table. To add a new icon:
1. Import from `react-icons` (e.g., `import { FaDocker } from 'react-icons/fa'`)
2. Add to `iconMap`: `FaDocker,`
3. Use in `portfolioData.ts`: `iconName: 'FaDocker'`

Unknown icon names render a `?` fallback.

### Image References

Project images and profile photo are stored as filenames (e.g., `'NASA1.jpg'`) in `portfolioData.ts`. Files live in `public/` and are served at the root URL. Vite serves them in dev, copies to `build/` for production.

---

## Code Conventions

### TypeScript (Strict Mode)

Strict mode is fully enabled in `tsconfig.json` with extra flags:
- `noUncheckedIndexedAccess` — index access returns `T | undefined`, must be guarded
- `exactOptionalPropertyTypes` — optional props can't be set to `undefined`
- `noImplicitReturns` — all code paths must return
- `noUnusedLocals` / `noUnusedParameters` — no dead code
- `noPropertyAccessFromIndexSignature` — must use bracket notation for index signatures

**Rules:**
- No `any` types, no non-null assertions (`!`)
- Unused variables must be prefixed with `_`
- Use `import type { ... }` for type-only imports
- Use function declarations for components: `export function Component() {}`
- Naming: `camelCase`/`PascalCase`/`UPPER_CASE` for variables, `camelCase`/`PascalCase` for functions, `PascalCase` for types

### ESLint (Strict)

Key rules beyond TypeScript:
- `no-console: error` — no console.log
- `curly: all` — always use braces for if/else/for/while
- `eqeqeq: always` — use `===`/`!==`
- `prefer-template` — template literals over concatenation
- `object-shorthand` — `{ foo }` not `{ foo: foo }`
- `prefer-destructuring` — `const { x } = obj` (objects only)
- `no-nested-ternary` — no chained ternaries
- `react-hooks/exhaustive-deps: error` — hook deps must be complete
- `@typescript-eslint/no-unnecessary-condition` — no redundant boolean checks

### Prettier

Config in `.prettierrc.json`: single quotes, 100 char print width, trailing commas, 2-space indent, single attribute per line in JSX.

---

## Styling Patterns

All styling uses **styled-components** (CSS-in-JS). No separate CSS files.

### File Pairing

Every component has a paired `.styles.tsx` file:
- `Component.tsx` — logic, state, event handlers, JSX
- `Component.styles.tsx` — all styled-components for that component

### Theme (src/styles/theme.ts)

Provided via `<ThemeProvider>` in App.tsx, typed via `src/styled.d.ts`.

```typescript
// Access in styled-components:
color: ${({ theme }) => theme.colors.accentPrimary};
background: ${({ theme }) => theme.gradients.accent};
```

**Design tokens:**
- **Dark theme** — cyan (`#00d9ff`) to purple (`#7b2cbf`) gradient accents
- **Backgrounds:** `bgPrimary` (#0a0e27) > `bgSecondary` (#151934) > `bgCard` (#1a1f3a)
- **Text:** `textPrimary` (#e4e6eb) for headings, `textSecondary` (#b0b3b8) for body
- **Border:** `borderColor` (#2a2f4a)
- **Gradient:** `linear-gradient(135deg, #00d9ff 0%, #7b2cbf 100%)` — used on section titles via `background-clip: text`
- **Shadows:** `small` (cards), `large` (elevated), `hover` (interactive states)

### Transient Props

Use `$` prefix for props that should not forward to the DOM (e.g., `$isOpen`, `$isSingle`, `$compact`). This avoids React DOM warnings.

### Animations

- CSS transitions for hover states (transform, opacity, border-color) with `0.3s ease`
- Keyframe animations for modal open (`fadeIn`, `zoomIn`) and nav button (`fadeInNav`)
- Nav show/hide uses `transform: translateY()` with CSS transition

---

## Responsive Design

Three breakpoints defined in `theme.ts`:
- **Mobile:** 480px
- **Tablet:** 768px
- **Desktop:** 1200px

```typescript
@media (max-width: ${({ theme }) => theme.breakpoints.tablet}) { ... }
@media (max-width: ${({ theme }) => theme.breakpoints.mobile}) { ... }
```

**Conventions:**
- Font sizes MUST scale at both tablet AND mobile breakpoints
- Image galleries: horizontal scroll with `scroll-snap` on mobile (not vertical stacking)
- Skills grid: 4 cols (desktop) → 3 cols (tablet) → 2 cols (mobile)
- Minimum touch target: 44x44px
- Hidden scrollbar on mobile galleries
- Navigation hides brand logo on mobile, centers nav links

---

## Testing Patterns

**Vitest** + **jsdom** + **React Testing Library**. Globals (`describe`, `it`, `expect`, `vi`) available without imports.

**Conventions:**
- `renderWithTheme()` helper wraps components in `<ThemeProvider>` (all styled-components need theme)
- Prefer accessible queries: `screen.getByRole`, `screen.getByText`, `screen.getByAltText`
- Mock with `vi.fn()`, clear with `mockClear()` in `beforeEach`
- DOM events: `fireEvent.click()`, `fireEvent.keyDown()`, `fireEvent.touchStart()`
- Touch events dispatched on `document` (ImageModal attaches listeners there)
- Tests co-located with components (e.g., `Bio.test.tsx` next to `Bio.tsx`)

---

## Component Details

### Navigation
Fixed nav bar with backdrop blur. Hides on scroll-down, shows on scroll-up (tracks `lastScrollY` via ref). Uses `isNavClickScrollRef` to pause hide behavior during smooth-scroll navigation (1-second delay). Brand logo hidden on mobile. Four links: About, Skills, Projects, Contact.

### Bio
Hero section. Splits `profile.bio` by `. ` to render each sentence on its own line via `<Fragment>` with `<br />`. Shows circular profile image, gradient name, title, bio text, education.

### Skills
CSS Grid of skill cards. Each card renders an icon via the `iconMapper` `Icon` component. Responsive columns: 4 → 3 → 2.

### Projects
Card layout with image galleries. Manages lightbox state (`modalOpen`, `selectedImage`, `currentImageIndex`, `currentProjectImages`). Multi-image projects use horizontal scrollable gallery with scroll-snap. Single-image projects centered. Click opens ImageModal. Keyboard accessible (tabIndex, Enter/Space).

### ImageModal
Full-screen overlay lightbox. Navigation: Escape to close, Arrow keys prev/next, touch swipe prev/next (50px threshold, ignores vertical). Uses refs for callback props to avoid effect dependency churn. Locks body scroll when open.

### Contact
Email and GitHub links using the `Icon` component.

---

## Accessibility

- Semantic HTML: `<nav>`, `<section>`, `<ul>`/`<li>` with `role="list"`/`role="listitem"`
- ARIA labels on all interactive elements and sections
- ARIA roles: `role="dialog"` + `aria-modal="true"` on ImageModal, `role="navigation"`, `role="menu"`/`role="menuitem"`
- Keyboard: clickable images have `tabIndex={0}` + `onKeyDown` (Enter/Space)
- Alt text with context (e.g., `"NASA Space Apps Challenge screenshot 1 of 3"`)
- Modal supports keyboard (Escape, Arrows) and touch swipe

---

## Adding New Content

### New Skill
1. Add entry to `skills[]` in `src/data/portfolioData.ts`
2. If the icon doesn't exist in `iconMapper.tsx`, import from `react-icons` and add to `iconMap`

### New Project
1. Add entry to `projects[]` in `src/data/portfolioData.ts`
2. Place image files in `public/`

### New Section
1. Create `SectionName.tsx` + `SectionName.styles.tsx` + `SectionName.test.tsx` in `src/components/`
2. Import and render in `App.tsx` wrapped in `<div id="sectionname">`
3. Add nav link in `Navigation.tsx`

### New Contact Method
1. Add `<ContactLink>` in `Contact.tsx`
2. Add any needed icon to `iconMapper.tsx`

---

## Build & Deployment

**Build process:**
1. `prebuild`: `tsx scripts/generateManifest.ts` generates `public/manifest.json` from profile data
2. `build`: `tsc` (type checking) then `vite build` (bundling to `build/` with sourcemaps)
3. `vite-plugin-html` injects `profile.name` and `profile.title` into HTML meta tags

**CI/CD:** Four GitHub Actions workflows run on PRs to `main` (Node.js 20, ubuntu-latest). They only trigger when relevant files change (src/, public/, package.json, config files).

**Deployment:** Vercel auto-deploys on push to `main`. No manual deployment needed.
