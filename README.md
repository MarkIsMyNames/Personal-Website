# Personal Website

Portfolio website for Mark Drohan — skills, projects, and experience. Fully internationalised with five languages.

**Live site:** https://markdrohan.vercel.app

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI | React 19 + TypeScript (strict mode) |
| Styling | styled-components 6 |
| i18n | react-i18next (en, fr, de, es, ga) |
| Build | Vite 7 |
| Tests | Vitest 4, Playwright, Storybook 10 |
| Deployment | Vercel (auto-deploy on push to `main`) |

## Quick Start

```bash
npm install
npm start        # Dev server at http://localhost:5173
```

## Commands

### Development
| Command | Purpose |
|---------|---------|
| `npm start` | Dev server (port 5173) |
| `npm run build` | Production build to `build/` |
| `npm run preview` | Preview production build |
| `npm run storybook` | Storybook dev server (port 6006) |

### Testing
| Command | Purpose |
|---------|---------|
| `npm test` | Unit tests (Vitest) |
| `npm run test:watch` | Unit tests in watch mode |
| `npm run test:ui` | Unit tests with browser UI |
| `npm run test-storybook` | Storybook a11y tests (Vitest) |
| `npm run test:storybook-visual` | Visual regression tests (see below) |
| `npm run test:e2e` | End-to-end tests (Playwright) |

### Code Quality
| Command | Purpose |
|---------|---------|
| `npm run lint` | ESLint check |
| `npm run lint:fix` | ESLint auto-fix |
| `npm run format` | Prettier auto-format |
| `npm run format:check` | Prettier check (used in CI) |

### Before merging a PR

All four checks must pass:

```bash
npm test && npm run format:check && npm run lint && npm run build
```

## Visual Regression Tests

The visual regression tests (`npm run test:storybook-visual`) start Storybook, render every story in isolation, and compare the output pixel-by-pixel against baseline screenshots stored in `storybook-tests/__snapshots__/`.

**The baseline is the current `main` branch.** Tests fail if any story's visual output differs from its baseline.

### Approving visual changes

When you intentionally change a component's appearance, the PR visual test will fail. Review the diff images uploaded as artifacts in the failing CI run. If the change looks correct, merge the PR — the **Update Visual Baselines** workflow runs automatically on merge and commits updated baselines for the next PR.

### How diffs are reported

When a test fails, Playwright writes three images to `test-results/`:

- `*-expected.png` — the stored baseline
- `*-actual.png` — what was rendered
- `*-diff.png` — highlighted pixel differences

Open the diff image to see exactly what changed before deciding whether to approve.

## Deployment

Vercel auto-deploys on push to `main`. No manual steps needed.
