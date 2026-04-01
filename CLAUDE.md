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
| `npm run build` | Production build (tsc + vite build to `build/`) |
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
Personal-Website/
├── CLAUDE.md                          # This file
├── package.json                       # Dependencies & scripts
├── tsconfig.json                      # TypeScript config (strict mode + extra flags)
├── vite.config.ts                     # Vite + Vitest config (port 3000, build → build/)
├── eslint.config.mjs                  # ESLint rules (very strict, flat config)
├── .prettierrc.json                   # Prettier config (single quotes, 100 char width)
│
├── src/
│   ├── index.tsx                      # React entry point (StrictMode)
│   ├── App.tsx                        # Root: ThemeProvider → GlobalStyles → Nav → Sections
│   ├── App.test.tsx
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
│   │   ├── Navigation.tsx/styles/test
│   │   ├── Bio.tsx/styles/test
│   │   ├── Skills.tsx/styles/test
│   │   ├── Projects.tsx/styles/test
│   │   ├── ImageModal.tsx/styles/test
│   │   └── Contact.tsx/styles/test
│   │
│   ├── styles/
│   │   ├── theme.ts                   # Design tokens: colors, gradients, shadows, breakpoints
│   │   ├── GlobalStyles.tsx           # CSS reset, body styles, system font stack
│   │   ├── App.styles.tsx             # AppContainer styled.main (max-width: 1240px)
│   │   ├── SharedComponents.tsx       # SectionTitle — shared gradient h2, used by Skills/Projects/Contact
│   │   └── SharedComponents.test.tsx
│   │
│   └── utils/
│       └── iconMapper.tsx             # Maps icon name strings → react-icons components
│
├── public/                            # Static assets (no spaces in filenames)
│   ├── favicon.svg                    # Gradient M icon
│   ├── robots.txt                     # Blocks AI crawlers, allows search engines
│   ├── PersonalProfile.jpg            # Profile photo (300px, only used in Bio + nav)
│   ├── Intercom.png, Ganzy.png        # Project images (full-size ~900px for lightbox)
│   ├── NASA1-3.jpg
│   ├── Hult1-3.jpg/png
│   ├── HackJunction1-3.jpg
│   ├── AWSHACK1-3.jpg/png
│   ├── HackEurope1.jpg, HackEurope2.svg, HackEurope3.jpg
│   └── *_sm.*                         # Responsive thumbnails (600px max, for gallery srcset)
│
└── .github/workflows/                 # PR checks (all required for merge)
    ├── frontend-tests.yml
    ├── frontend-lint.yml
    ├── frontend-format.yml
    └── frontend-build.yml
```

---

## Data Flow & Architecture

### How the App Renders

```
index.tsx → App.tsx → ThemeProvider(theme)
                        ├── GlobalStyles (CSS reset)
                        ├── Navigation (fixed, full-width, outside AppContainer)
                        └── AppContainer (styled.main, max-width: 1240px)
                              ├── <div id="about">    → Bio(profile)
                              ├── <div id="skills">   → Skills(skills)
                              ├── <div id="projects"> → Projects(projects)
                              ├── <div id="contact">  → Contact(profile)
                              ├── <Analytics />
                              └── <SpeedInsights />
```

### Data Model (src/types/index.ts)

| Name | Kind | Values | Purpose |
|------|------|--------|---------|
| `SkillCategory` | enum | `Language`, `Framework`, `Concept`, `Technology` | Skill grid categories |
| `SectionId` | enum | `About`, `Skills`, `Projects`, `Contact` | Anchor IDs |
| `KeyboardKey` | const object | `Enter`, `Space`, `Escape`, `ArrowLeft`, `ArrowRight` | DOM `e.key` values |

Use enums when both producer and consumer are our code. Use `as const` for values compared against external APIs (e.g., DOM `e.key`).

| Type | Fields |
|------|--------|
| `Profile` | name, title, bio, image, email, github, university, graduationYear |
| `Skill` | name, iconName, category |
| `Project` | title, role, description, highlights[], images[], tags[] |
| `ProjectHighlight` | text |

All content lives in `portfolioData.ts`. Data flows: `portfolioData.ts` → `App.tsx` → components via props. Navigation imports `profile` directly for the brand logo.

### Icon System (src/utils/iconMapper.tsx)

Maps string names to `react-icons` components via a lookup table. To add a new icon:
1. Import from `react-icons` (e.g., `import { FaDocker } from 'react-icons/fa'`)
2. Add to `iconMap`: `FaDocker,`
3. Use in `portfolioData.ts`: `iconName: 'FaDocker'`

Unknown icon names render a `?` fallback.

### Image System

**Filenames:** No spaces — use `CamelCase` or `PascalCase` (e.g., `NASA1.jpg`, `PersonalProfile.jpg`).

**Two sizes per project image:**
- `IMAGE.jpg` — full size (~900px), used by the lightbox (`ImageModal`)
- `IMAGE_sm.jpg` — 600px max, used by the gallery via `srcset`

The gallery `ProjectImage` uses:
```tsx
srcSet={`${smSrc} 600w, ${image} 900w`}
sizes="(max-width: 480px) 300px, (max-width: 768px) 400px, 450px"
```
This serves 600px on mobile (adequate at 2× DPR) and 900px on desktop (cached for lightbox). Generate `_sm` files with: `magick IMAGE -resize 600x600\> -quality 82 IMAGE_sm.EXT`

**Profile image** (`PersonalProfile.jpg`) is 300px — only used in Bio and nav, never in the lightbox.

The `PROJECT_IMAGE_HEIGHT = 300` constant in `Projects.styles.tsx` is used for the CSS `max-height` at responsive breakpoints and the HTML `height` attribute (CLS prevention).

---

## Performance & SEO

- `index.html` has `<link rel="preload" as="image" href="/PersonalProfile.jpg">` for LCP
- `ProfileImage` in `Bio.tsx` has `fetchPriority="high"` for LCP
- `AppContainer` uses `styled.main` for the `<main>` landmark
- `robots.txt` blocks AI training crawlers (GPTBot, CCBot, anthropic-ai, Claude-Web, Google-Extended, Amazonbot) while allowing search engines
- `vite-plugin-html` injects `profile.name` and `profile.bio` into `<title>` and `<meta name="description">`

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
- `curly: all` — always use braces
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

Every component has a paired `.styles.tsx` file:
- `Component.tsx` — logic, state, event handlers, JSX
- `Component.styles.tsx` — all styled-components for that component

**Shared styles:** `SectionTitle` (gradient h2) lives in `SharedComponents.tsx` and is imported by Skills, Projects, and Contact. Do not redefine it locally.

### Theme (src/styles/theme.ts)

```typescript
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

Use `$` prefix for props that should not forward to the DOM (e.g., `$isOpen`, `$isSingle`). This avoids React DOM warnings.

### Gradient text CSS (inline — no shared mixin)

WebStorm's CSS-in-JS parser errors on multi-property `css` interpolations. Inline these 4 lines wherever needed:
```css
background: ${({ theme }) => theme.gradients.accent};
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

---

## Responsive Design

Three breakpoints defined in `theme.ts`:
- **Mobile:** 480px
- **Tablet:** 768px
- **Desktop:** 1200px

**Conventions:**
- Font sizes MUST scale at both tablet AND mobile breakpoints
- Image galleries: horizontal scroll with `scroll-snap` on mobile
- Skills grid: 4 cols → 3 cols → 2 cols
- Minimum touch target: 44×44px
- Navigation hides brand logo on mobile, centers nav links

---

## Testing Patterns

**Vitest** + **jsdom** + **React Testing Library**. Globals (`describe`, `it`, `expect`, `vi`) available without imports.

- `renderWithTheme()` helper wraps components in `<ThemeProvider>`
- Prefer accessible queries: `screen.getByRole`, `screen.getByText`, `screen.getByAltText`
- Mock with `vi.fn()`, clear with `mockClear()` in `beforeEach`
- DOM events: `fireEvent.click()`, `fireEvent.keyDown()`, `fireEvent.touchStart()`
- Touch events dispatched on `document` (ImageModal attaches listeners there)
- Tests co-located with components

---

## Component Details

### Navigation
Fixed nav bar with backdrop blur. Hides on scroll-down, shows on scroll-up (tracks `lastScrollY` via ref). Uses `isNavClickScrollRef` to pause hide behavior during smooth-scroll navigation (1-second delay). Brand logo hidden on mobile.

### Bio
Hero section. Splits `profile.bio` by `. ` to render each sentence on its own line. Profile image has `fetchPriority="high"` (LCP optimisation).

### Skills
CSS Grid of skill cards with icons via `iconMapper`. Responsive columns: 4 → 3 → 2.

### Projects
Card layout with image galleries. `PROJECT_IMAGE_HEIGHT = 300` constant (defined in `Projects.styles.tsx`) drives both the CSS `max-height` at responsive breakpoints and the HTML `height` attribute for CLS prevention. Gallery uses `srcset` with `_sm` thumbnails for mobile performance; lightbox always receives the full-size `src`. Keyboard accessible (tabIndex, Enter/Space).

### ImageModal
Full-screen lightbox at `width: 75vw; height: 75vh; object-fit: contain`. Navigation: Escape to close, Arrow keys prev/next, touch swipe prev/next (50px threshold). Locks body scroll when open.

### Contact
Email and GitHub links using the `Icon` component.

---

## Accessibility

- Semantic HTML: `<nav>`, `<section>`, `<main>`, `<ul>`/`<li>` with `role="list"`/`role="listitem"`
- ARIA labels on all interactive elements and sections
- ARIA roles: `role="dialog"` + `aria-modal="true"` on ImageModal
- Keyboard: clickable images have `tabIndex={0}` + `onKeyDown` (Enter/Space)
- Alt text with context (e.g., `"NASA Space Apps Challenge screenshot 1 of 3"`)

---

## Adding New Content

### New Skill
1. Add entry to `skills[]` in `portfolioData.ts`
2. If the icon doesn't exist in `iconMapper.tsx`, import from `react-icons` and add to `iconMap`

### New Project
1. Add entry to `projects[]` in `portfolioData.ts`
2. Place full-size image(s) in `public/` (no spaces in filename)
3. Generate `_sm` thumbnails: `magick IMAGE -resize 600x600\> -quality 82 IMAGE_sm.EXT`

### New Section
1. Create `SectionName.tsx` + `SectionName.styles.tsx` + `SectionName.test.tsx` in `src/components/`
2. Import and render in `App.tsx` wrapped in `<div id="sectionname">`
3. Add nav link in `Navigation.tsx`
4. Import `SectionTitle` from `../styles/SharedComponents` — do not create a new one

---

## Build & Deployment

**Build process:** `tsc` (type checking) → `vite build` (bundling to `build/` with sourcemaps). `vite-plugin-html` injects `profile.name` and `profile.bio` into the HTML template at build time.

**CI/CD:** Four GitHub Actions workflows run on PRs to `main` (Node.js 20, ubuntu-latest). They only trigger when relevant files change.

**Deployment:** Vercel auto-deploys on push to `main`. No manual deployment needed.
