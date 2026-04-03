# CLAUDE.md

Guidance for Claude Code when working with this repository.

## Project Overview

Personal portfolio website for Mark Drohan, built with React + TypeScript. Static single-page site showcasing skills, projects, and experience. Deployed to Vercel at https://markdrohan.vercel.app (auto-deploys on push to `main`).

**Stack:** React 19 | TypeScript (strict) | styled-components 6 | Vite 7 | Vitest 4 | Vercel

---

## Quick Start

```bash
npm install
npm start          # Dev server at http://localhost:5173
```

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm start` | Dev server (Vite, port 5173) |
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
├── CLAUDE.md                          # This file - AI assistant guidance
├── package.json                       # Dependencies & scripts
├── tsconfig.json                      # TypeScript config (strict mode + extra flags)
├── vite.config.ts                     # Vite + Vitest config (build → build/)
├── eslint.config.mjs                  # ESLint flat config (very strict)
├── .prettierrc.json                   # Prettier config (single quotes, 100 char width)
│
├── src/
│   ├── index.tsx                      # React entry point (StrictMode) — imports i18n first
│   ├── App.tsx                        # Root: ThemeProvider → GlobalStyles → Nav → Sections
│   ├── App.test.tsx                   # App-level integration tests
│   ├── setupTests.ts                  # jest-dom + global react-i18next mock
│   ├── styled.d.ts                    # Augments DefaultTheme for styled-components typing
│   ├── types.ts                       # Shared types: Profile, Skill, Project, SectionId, KeyboardKey
│   │
│   ├── i18n/
│   │   ├── i18n.ts                    # i18next init — LanguageDetector, fallback to en
│   │   ├── i18n.test.ts               # i18next initialisation + language switching tests
│   │   └── locales/
│   │       ├── en.json                # Single source of truth for ALL content + UI strings
│   │       ├── en.test.ts             # Structural validation + data integrity tests
│   │       └── locales.test.ts        # Completeness check for any future locale files
│   │
│   ├── components/                    # Each component: Component.tsx + Component.styles.tsx + Component.test.tsx
│   │   ├── Bio/
│   │   │   ├── Bio.tsx                # Hero section: profile image, name, title, bio, education
│   │   │   ├── Bio.styles.tsx         # CSS only
│   │   │   └── Bio.test.tsx
│   │   ├── Contact/
│   │   │   ├── Contact.tsx            # Email + GitHub contact links
│   │   │   ├── Contact.styles.tsx     # CSS only
│   │   │   └── Contact.test.tsx
│   │   ├── ImageModal/
│   │   │   ├── ImageModal.tsx         # Full-screen lightbox (keyboard + swipe navigation)
│   │   │   ├── ImageModal.styles.tsx  # CSS only
│   │   │   └── ImageModal.test.tsx
│   │   ├── Navigation/
│   │   │   ├── Navigation.tsx         # Fixed nav bar, scroll-aware show/hide, smooth scroll
│   │   │   ├── Navigation.styles.tsx  # CSS only
│   │   │   └── Navigation.test.tsx
│   │   ├── Projects/
│   │   │   ├── Projects.tsx           # Project cards with image gallery + lightbox trigger
│   │   │   ├── Projects.styles.tsx    # CSS only
│   │   │   └── Projects.test.tsx
│   │   └── Skills/
│   │       ├── Skills.tsx             # Responsive grid of skill cards with icons
│   │       ├── Skills.styles.tsx      # CSS only
│   │       └── Skills.test.tsx
│   │
│   ├── styles/
│   │   ├── theme.ts                   # Theme: colors, gradients, shadows, breakpoints
│   │   ├── Global.styles.tsx          # CSS only — CSS reset, body styles, system font stack
│   │   ├── App.styles.tsx             # CSS only — AppContainer (max-width: 1240px, responsive padding)
│   │   └── Shared.styles.tsx          # CSS only — Reusable styled components (SectionTitle)
│   │
│   └── utils/
│       └── iconMapper.tsx             # Maps icon name strings → react-icons components
│
├── scripts/
│   └── generateManifest.ts            # Prebuild: generates public/manifest.json from en.json profile data
│
├── public/                            # Static assets (served at root URL)
│   ├── PersonalProfile.jpg            # Profile photo
│   ├── Intercom.png                   # Project images...
│   ├── Ganzy.png
│   ├── NASA1.jpg, NASA2.jpg, NASA3.jpg
│   ├── Hult1.jpg, Hult2.png, Hult3.jpg
│   ├── Junction1.jpg, Junction2.jpg, Junction3.jpg
│   ├── AWSHACK1.jpg, AWSHACK2.png, AWSHACK3.jpg
│   ├── HackEurope1.jpg, HackEurope2.svg, HackEurope3.jpg
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
index.tsx (imports i18n first)
  → App.tsx → ThemeProvider(theme)
                ├── GlobalStyles (CSS reset)
                ├── Navigation (fixed, full-width — reads profile via t())
                └── AppContainer (max-width: 1240px)
                      ├── <div id="about">    → Bio(profile)
                      ├── <div id="skills">   → Skills(skills)
                      ├── <div id="projects"> → Projects(projects)
                      ├── <div id="contact">  → Contact(profile)
                      ├── <Analytics />
                      └── <SpeedInsights />
```

`App.tsx` uses `useTranslation()` to fetch `profile`, `skills`, and `projects` from i18next via `t('profile', { returnObjects: true })` etc., passing them as props to components. Navigation fetches profile the same way independently.

### Single Source of Truth: en.json

**All content lives in `src/i18n/locales/en.json`** — portfolio text (names, bios, project descriptions), non-translatable data (images, iconNames, email, github, graduationYear), and UI strings (aria-labels, section titles). There is no separate `portfolioData.ts`.

When adding a new language, copy `en.json` and translate only the human-readable strings. Leave images, `iconName`, `email`, `github`, and `graduationYear` unchanged.

### Data Model (src/types.ts)

**Enums and constants:**

| Name | Kind | Values | Purpose |
|------|------|--------|---------|
| `SectionId` | enum | `About`, `Skills`, `Projects`, `Contact` | Anchor IDs used in App.tsx and Navigation.tsx |
| `KeyboardKey` | const object | `Enter`, `Space`, `Escape`, `ArrowLeft`, `ArrowRight` | Keyboard event key values (const instead of enum because DOM `e.key` returns `string`) |

**Use enums for categorical values where both producer and consumer are in our code** (e.g., `SectionId`). Use `as const` objects for values compared against external APIs (e.g., `KeyboardKey` vs DOM `e.key`).

**Types:**

| Type | Fields | Used By |
|------|--------|---------|
| `Profile` | name, title, bio, image, email, github, university, graduationYear | Bio, Contact, Navigation |
| `Skill` | name, iconName | Skills |
| `Project` | title, role, description, highlights[], images[], tags[] | Projects |

### Icon System (src/utils/iconMapper.tsx)

Maps icon name strings to `react-icons` components via a lookup table. To add a new icon:
1. Import from `react-icons` (e.g., `import { FaDocker } from 'react-icons/fa'`)
2. Add to `iconMap`: `FaDocker,`
3. Set `iconName: 'FaDocker'` on the skill entry in `en.json`

Unknown icon names render a `?` fallback. `IconName` is exported as a utility type for hardcoding icon names directly in TypeScript.

### Image References

Image filenames (e.g., `'NASA1.jpg'`) are stored in `en.json` under each project's `images` array, and the profile photo under `profile.image`. Files live in `public/` and are served at the root URL.

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
- No `any` types, no non-null assertions (`!`), no `as` casts
- Unused variables must be prefixed with `_`
- Use `import type { ... }` for type-only imports
- Use function declarations for components: `export function Component() {}`
- Naming: `camelCase`/`PascalCase`/`UPPER_CASE` for variables, `camelCase`/`PascalCase` for functions, `PascalCase` for types

**Avoiding type casts:**
- Replace `as HTMLElement` (and similar DOM casts) with a null check: `if (!el) throw new Error('...')` — this narrows the type and fails loudly if the assumption is wrong
- Replace non-null assertions (`!`) in tests with `if (!value) throw new Error('...')` — same benefit: narrows type, gives a clear failure message
- For dynamic object traversal (e.g., JSON lookup by key path), a single `as Record<string, unknown>` is acceptable at the entry point only — avoid double casts (`as unknown as T`)
- Prefer `toHaveProperty('[0].field', value)` in tests over casting the result of `i18n.t()` with `returnObjects` — i18next types `t()` as `string` regardless, so casting the return value is misleading
- Replace `require()` with `readFileSync` + `JSON.parse` to avoid the `no-require-imports` lint rule and the cast that comes with it
- When assigning a mock to a browser global in tests, use `vi.stubGlobal('name', vi.fn())` instead of `mock as typeof window.name`

**Avoiding magic values:**
- All numeric literals must be named constants in `src/config.ts`. The `@typescript-eslint/no-magic-numbers` lint rule enforces this for all source files, including test files (`*.test.tsx`, `*.test.ts`)
- `KIB_CONVERSION_FACTOR = 1024` must be used for all byte-to-KiB conversions and size limits
- URL strings (`https://...`, `mailto:...`) and other non-obvious string literals used in logic must also live in `src/config.ts`. The `no-restricted-syntax` rule enforces URL/protocol literals specifically
- `src/config.ts` is excluded from ESLint entirely — literal values are intentional there
- Group constants in `config.ts` by purpose with a comment header (e.g. `// Navigation`, `// External links`)
- Constants explicitly for test files must be placed at the bottom of the file under a `// Test constants` header

### ESLint (Strict)

Key rules beyond TypeScript:
- Linting applies to ALL `.ts` and `.tsx` files in `src/`, including all tests
- `no-console: error` — no console.log
- `curly: all` — always use braces for if/else/for/while
- `eqeqeq: always` — use `===`/`!==`
- `prefer-template` — template literals over concatenation
- `object-shorthand` — `{ foo }` not `{ foo: foo }`
- `prefer-destructuring` — `const { x } = obj` (objects only)
- `no-nested-ternary` — no chained ternaries
- `react-hooks/exhaustive-deps: error` — hook deps must be complete
- `@typescript-eslint/no-unnecessary-condition` — no redundant boolean checks
- `i18next/no-literal-string` — no hardcoded strings in JSX or aria/alt/title attributes

### Prettier

Config in `.prettierrc.json`: single quotes, 100 char print width, trailing commas, 2-space indent, single attribute per line in JSX.

---

## Styling Patterns

All styling uses **styled-components** (CSS-in-JS). No separate CSS files.

### File Convention

Every component lives in its own folder under `src/components/ComponentName/` with three files:
- `Component.tsx` — logic, state, event handlers, JSX
- `Component.styles.tsx` — CSS only (styled-components). Any file containing only CSS must use the `.styles.tsx` suffix.
- `Component.test.tsx` — tests

Only mark props as optional (`?`) if they are genuinely optional — i.e., the component has a meaningful behaviour when the prop is absent. If a prop is always provided at every call site, it must be required.

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
- i18next is mocked globally in `setupTests.ts` — component tests do not initialise i18next. Import `en.json` directly in test files to reference expected values (e.g., `en.profile.name`, `en.navigation.sections.about`)
- **Do not write tests for CSS-only files** (`*.styles.tsx`). Vitest is configured to exclude `*.styles.test.*` files — do not test styling
- **Do not duplicate tests.** Before adding a test, check whether the same behaviour is already covered elsewhere. Component tests cover unit behaviour; `App.test.tsx` covers integration concerns only. A behaviour tested in `Bio.test.tsx` must not be re-tested in `App.test.tsx`
- **Do not test things TypeScript already enforces** (e.g. that a constant has type `number`) or things that are tautological (e.g. that a constant equals its own definition). Test structural constraints that aren't statically checkable — for example, that a URL ends with `/` for safe concatenation, or that a security header contains two required words

---

## i18n

**Library:** react-i18next + i18next. Initialised synchronously in `src/i18n/i18n.ts`, imported at the very top of `src/index.tsx` before React so translation resources are ready on first render.

### Structure

```
src/i18n/
├── i18n.ts              # i18next init — LanguageDetector, initReactI18next, fallback to en
├── i18n.test.ts         # Init, interpolation, language switching, fallback behaviour
└── locales/
    ├── en.json          # Single source of truth for all content and UI strings
    ├── en.test.ts       # Structural validation, placeholder checks, data integrity
    └── locales.test.ts  # Completeness check — any added locale must have all en.json keys
```

### Rules

- **All user-facing strings must go through `t()`** — no hardcoded text in JSX or aria/alt attributes
- All content lives in `en.json`: portfolio text, aria-labels, section titles, and non-translatable data (images, iconName, email, github, graduationYear)
- Use `useTranslation` from `react-i18next` directly — no wrapper hook
- ARIA role values (e.g., `role="dialog"`) are spec constants, not user-facing text — do not translate them
- Structured data (profile, skills, projects) is fetched via `t('key', { returnObjects: true })` in `App.tsx` and `Navigation.tsx`

### Key Naming Convention

| Pattern | Used for |
|---------|----------|
| `section.fieldName` | Content strings (e.g., `profile.title`, `bio.education`) |
| `section.ariaLabels.descriptor` | ARIA label strings (e.g., `imageModal.ariaLabels.close`) |
| `common.ariaLabels.section` | Shared `"{{title}} section"` template used by all section components |
| `navigation.sections.X` | Section names used for both nav link text and aria-label interpolation |
| `contact.githubUrl` | Display text for the GitHub link (`"github.com/{{username}}"`) — interpolated with `profile.github` |

### Adding a New Language

1. Copy `src/i18n/locales/en.json` → `src/i18n/locales/<locale>.json`
2. Translate all human-readable values — leave `images`, `iconName`, `email`, `github`, and `graduationYear` unchanged
3. Import the new locale file in `src/i18n/i18n.ts` and add it to the `resources` object
4. The `locales.test.ts` completeness test will fail if any keys are missing or extra

### Language Fallback

i18next is configured with `fallbackLng: 'en'`. If the browser language is unsupported, or if a key is missing from the active language's bundle, i18next automatically returns the English string.

### Testing with i18n

Component tests use the global mock in `setupTests.ts` which reads actual values from `en.json` (including interpolation and `returnObjects`). Import `en.json` in test files to build expected strings — never hardcode English text in assertions.

---

## Component Details

### Navigation
Fixed nav bar with backdrop blur. Hides on scroll-down, shows on scroll-up (tracks `lastScrollY` via ref). Uses `isNavClickScrollRef` to pause hide behavior during smooth-scroll navigation (1-second delay). Brand logo hidden on mobile. Fetches `profile` via `t('profile', { returnObjects: true })`. Four links using `navigation.sections.*` for text and `navigation.ariaLabels.link` template for aria-labels.

### Bio
Hero section. Splits `profile.bio` by `. ` to render each sentence on its own line via `<Fragment>` with `<br />`. Shows circular profile image, gradient name, title, bio text, education.

### Skills
CSS Grid of skill cards. Each card renders an icon via the `iconMapper` `Icon` component. Responsive columns: 4 → 3 → 2.

### Projects
Card layout with image galleries. Manages lightbox state (`modal: ModalState | null` with `images` and `index`). Multi-image projects use horizontal scrollable gallery with scroll-snap. Single-image projects centered. Click opens ImageModal. Keyboard accessible (tabIndex, Enter/Space).

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
1. Add an entry to `skillsData` in `src/i18n/locales/en.json` with `name` and `iconName`
2. If the icon doesn't exist in `iconMapper.tsx`, import from `react-icons` and add to `iconMap`

### New Project
1. Add an entry to `projectsData` in `src/i18n/locales/en.json` with all fields including `images`
2. Place image files in `public/`

### New Language
1. Copy `en.json` → `src/i18n/locales/<locale>.json`, translate human-readable strings
2. Add to `resources` in `src/i18n/i18n.ts`

### New Section
1. Create `src/components/SectionName/` with `SectionName.tsx`, `SectionName.styles.tsx`, `SectionName.test.tsx`
2. Add a `SectionId` enum value in `src/types.ts`
3. Add the section name to `navigation.sections` in `en.json`
4. Import and render in `App.tsx` wrapped in `<div id={SectionId.X}>`
5. Add a nav link in `Navigation/Navigation.tsx`

### New Contact Method
1. Add `<ContactLink>` in `Contact.tsx`
2. Add any needed icon to `iconMapper.tsx`

---

## Build & Deployment

**Build process:**
1. `build`: `tsc` (type checking) then `vite build` (bundling to `build/` with sourcemaps)
2. `vite-plugin-html` injects `profile.name` and `profile.bio` into HTML meta tags (reads directly from `en.json` at build time)

**CI/CD:** Four GitHub Actions workflows run on PRs to `main` (Node.js 20, ubuntu-latest). They only trigger when relevant files change (src/, public/, package.json, config files).

**Deployment:** Vercel auto-deploys on push to `main`. No manual deployment needed.
