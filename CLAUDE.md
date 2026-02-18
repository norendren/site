# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # TypeScript compile + Vite build
npm run lint     # Run ESLint
npm run preview  # Preview production build locally
```

There are no tests. Deployment is automated via GitHub Actions on push to `main`.

## Project Overview

This is a React + TypeScript + Vite site serving two purposes:
1. Personal portfolio (homepage)
2. **Athia RPG Builder** — a multi-step character creation wizard for a custom TTRPG, with PDF export

## Architecture

**Routing**: `HashRouter` in `App.tsx` with three routes: `/` (Home), `/athia-rpg-builder`, `/pdf-inspector`

**Character Creator flow**: `CharacterCreator.tsx` is the main container managing all wizard state. It orchestrates step-by-step character creation (race → class → attributes → talents → abilities → equipment) with automatic stat derivation. Child components handle each selection step.

**Data layer** (`src/data/`, `src/utils/`):
- `src/data/` — Static game data: abilities, class descriptions, race info
- `src/utils/athiaConstants.ts` — Core game constants (stat caps, level tables, etc.)
- `src/utils/derivedStats.ts` — Calculated character stats from base selections
- `src/utils/characterStats.ts` — Character stat computation logic
- `src/utils/classReference.ts`, `equipmentReference.ts` — Game reference tables
- `src/utils/pdfFiller.ts` — Fills the character sheet PDF using `pdf-lib`

**PDF tools**:
- `pdf-lib` for generating filled character sheet PDFs
- `pdfjs-dist` for the PDF Inspector dev tool (coordinate mapping for the sheet)
- `src/assets/pdfs/` contains the blank character sheet and reference PDFs

**Styling**: Each component has a matching `.css` file (e.g., `CharacterCreator.css`).

**`useDevMode` hook**: Toggles dev-only UI (e.g., the PDF Inspector link).

## TypeScript Config

Strict mode is on with `noUnusedLocals` and `noUnusedParameters` enforced — the build will fail if unused variables exist. Target is ES2022, JSX is `react-jsx` (no need to import React in every file).

## Key Constraints

- The `vite.config.ts` sets `base: '/'` for GitHub Pages deployment on a custom domain.
- ESLint uses the flat config format (`eslint.config.js`).
- No global state library — all state is local `useState` in `CharacterCreator.tsx` passed down as props.
