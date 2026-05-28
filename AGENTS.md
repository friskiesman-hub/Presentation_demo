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

## Operating Modes / режимы работы

Before starting any task, classify it as one of three modes.
If the user explicitly provides a mode, follow it.

### 1. Safe operation

Use this mode for tasks that do not require editing project files.

Examples:

* run the current project locally;
* inspect repository structure;
* check current slide count;
* review code;
* explain how something works;
* identify possible issues;
* prepare a plan.

Rules:

* do not edit files;
* do not create commits;
* do not create new dependencies;
* answer briefly and practically;
* if the task cannot be completed inside the current environment, explain what the user should run locally.

### 2. Targeted fix

Use this mode for small, localized improvements.

Examples:

* adjust text;
* improve spacing;
* fix mobile layout for one slide;
* replace one image;
* improve contrast;
* correct a small interaction bug.

Rules:

* change only the minimum necessary files;
* preserve the current 5-slide structure;
* do not touch loader, wheel/touch navigation, mobile Safari logic, progress indicator or global architecture unless the task directly requires it;
* do not rewrite the project to React / Next.js / Vite / TypeScript;
* briefly explain what will be changed before editing;
* after editing, summarize changed files and verification steps.

### 3. Experiment

Use this mode for creative or higher-risk work.

Examples:

* new motion concept;
* alternative visual composition;
* new slide design;
* stronger transition between slides;
* prototype of an additional section;
* major visual redesign.

Rules:

* keep the stable 5-slide version safe;
* prefer a separate branch, duplicate prototype, or isolated experiment;
* propose 2–3 concepts before implementation when the task is visually open-ended;
* clearly state risks before changing loader, navigation, slide count, responsive logic or animation architecture;
* optimize for premium visual quality, but do not sacrifice stability, readability or performance.

### Default mode

If the mode is not specified:

* use Safe operation for inspection, launch, explanation and planning tasks;
* use Targeted fix for small clear changes;
* use Experiment for open-ended creative requests.

Do not make simple tasks bureaucratic.
For simple safe operations, be concise and act directly.
For risky or architectural changes, slow down and show a plan first.

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
