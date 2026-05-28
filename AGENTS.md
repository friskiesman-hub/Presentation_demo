# AGENTS.md

This file contains mandatory instructions for Codex when working in this repository.

## Project type

This project is a static premium web-presentation for **BORK Internet Boutique Q2 2026**.

It is not:

- an e-commerce site;
- a dashboard;
- a full web application;
- a generic landing page;
- a React/Next.js project.

It is a 5-slide cinematic business review built with plain HTML, CSS and JavaScript.

## Source of truth

Read these files before making changes:

1. `PROJECT_CONTEXT.md`
2. `AGENTS.md`
3. `QA_CHECKLIST.md`
4. `DEPLOY.md` if the task touches deployment

`docs/archive/ORIGINAL_START_PROMPT.md` is only an archived creative reference. Do not treat it as current technical specification.

## Current stable baseline

- Stable version: `3.5`
- Current base: `main` / `origin/main`
- Expected slide count: exactly 5 `.PresentationSection` elements unless explicitly changed
- Main files: `index.html`, `styles.css`, `script.js`, `assets/`
- Published repo: `friskiesman-hub/Presentation_demo`

Current slide meanings:

```text
01 / Internet Boutique Q2
02 / Commercial Result
03 / Category Mix
04 / Digital Efficiency
05 / Q3 Focus
```

## Creative direction

The current creative frame is:

> A premium cinematic web-presentation of BORK Internet Boutique Q2 2026 business results in the aesthetic of a flagship BORK boutique.

Do not describe or rebuild the project as a literal “journey through five boutique halls”. That was part of the original creative prompt, but it is no longer an accurate description of the implementation.

Preserve:

- warm architectural minimalism;
- graphite, stone, wood, ivory and soft amber light;
- restrained cinematic motion;
- premium typography;
- clean executive-report logic;
- precise orange accents;
- calm, expensive, non-marketplace visual tone.

Avoid:

- marketplace aesthetics;
- discount badges;
- aggressive CTAs;
- cheap luxury/gold gradients;
- cyberpunk or cold blue glow;
- noisy animations;
- generic dashboard visuals;
- unnecessary rounded cards;
- excessive text.

## Development rules

Before changing files:

1. Inspect `git status`.
2. Identify the exact files to change.
3. Explain the intended change briefly.
4. Avoid broad refactoring unless explicitly requested.

Do not use:

```bash
git add .
```

Use explicit adds instead, for example:

```bash
git add PROJECT_CONTEXT.md AGENTS.md
```

Do not mix unrelated work in one change:

- no deploy changes together with visual changes;
- no mobile fixes together with new slide experiments;
- no architecture cleanup together with content edits;
- no loader refactor together with chart edits.

## Files requiring special care

Be especially careful with:

```text
index.html
styles.css
script.js
assets/bork-ginza-pattern-loader.svg
assets/bork-pattern-mono.svg
```

Reason:

- `index.html` defines the 5-slide structure and progress targets;
- `styles.css` contains layout, responsive rules, mobile landscape fixes and motion;
- `script.js` controls loader, navigation, wheel/keyboard/touch behavior and active slide state;
- SVG pattern files are used for loader and decorative brand layers.

## Navigation and motion rules

Preserve:

- wheel navigation;
- keyboard navigation;
- touch swipe navigation;
- progress indicator;
- page count;
- timeline;
- loader dismissal;
- final button returning to the first slide.

Do not overcomplicate motion. Stability, readability and smoothness are more important than decorative effects.

## Mobile and Safari rules

Every change that touches layout, motion, viewport, loader or navigation must be checked on:

- desktop Chrome;
- desktop Safari;
- iPhone Safari portrait;
- iPhone Safari landscape;
- iPhone Safari after changing scale via `aA`.

Avoid changes that can introduce horizontal overflow.

## Required checks after changes

Unless the task explicitly changes slide count, confirm:

- exactly 5 `.PresentationSection` elements;
- data indexes are `0`, `1`, `2`, `3`, `4`;
- there are 5 progress dots;
- page count displays `01 / 05` through `05 / 05`;
- the final slide has the `Вернуться в начало` button;
- `styles.css` and `script.js` are still connected;
- key assets still exist;
- no unintended files are staged.

## Response style for Codex

For each task, respond with:

1. brief understanding of the task;
2. files that will be changed;
3. concise plan;
4. implementation;
5. verification steps;
6. final summary.

Do not create new dependencies, build systems or frameworks unless explicitly requested.
