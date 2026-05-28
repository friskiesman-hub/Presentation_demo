# QA_CHECKLIST.md

Manual QA checklist for BORK Internet Boutique Q2 2026 web-presentation.

Use this checklist after any change to `index.html`, `styles.css`, `script.js`, assets, navigation, loader, layout or motion.

## 1. Structural checks

Run or verify manually:

- [ ] `index.html` contains exactly 5 `.PresentationSection` elements.
- [ ] `data-index` values are `0`, `1`, `2`, `3`, `4`.
- [ ] There are exactly 5 `.progress-dot` buttons.
- [ ] Each `.progress-dot` has a correct `data-target` from `0` to `4`.
- [ ] Page count starts as `01 / 05`.
- [ ] Final slide contains the button `Вернуться в начало`.
- [ ] `styles.css` is connected.
- [ ] `script.js` is connected.
- [ ] Key assets exist in `assets/`.

Useful quick commands:

```bash
grep -o 'class="[^"]*PresentationSection' index.html | wc -l
grep -o 'class="progress-dot' index.html | wc -l
grep 'data-index=' index.html
grep 'data-target=' index.html
grep 'Вернуться в начало' index.html
```

Expected:

```text
PresentationSection count: 5
progress-dot count: 5
data-index: 0..4
```

## 2. Local launch

Recommended:

```bash
cd /Users/alexanderchernomorets/Documents/Codex/2026-05-22/web-5-bork-senior-web-designer/Presentation_demo
npx serve .
```

Alternative:

```bash
python3 -m http.server 8000
```

Open:

```text
http://localhost:8000
```

## 3. Desktop Chrome

- [ ] Loader appears correctly.
- [ ] Loader pattern is visible.
- [ ] Loader clock/date are visible.
- [ ] First wheel/keyboard interaction dismisses loader.
- [ ] Slides transition smoothly.
- [ ] Progress indicator updates.
- [ ] Page count updates.
- [ ] Timeline updates.
- [ ] All text is readable.
- [ ] Charts/KPI blocks are visible and not clipped.
- [ ] Final button returns to the first slide.
- [ ] No horizontal scroll.

## 4. Desktop Safari

- [ ] Loader dismisses correctly.
- [ ] Wheel/touchpad does not cause jitter.
- [ ] SVG pattern fallback works.
- [ ] Scroll-snap behavior is stable.
- [ ] Typography reveal is smooth.
- [ ] No broken assets.

## 5. iPhone Safari portrait

- [ ] Loader fits the viewport.
- [ ] No horizontal overflow.
- [ ] Main headline is readable.
- [ ] KPI blocks do not overlap.
- [ ] Charts are readable enough.
- [ ] Progress/navigation UI does not cover critical text.
- [ ] Touch swipe works.
- [ ] Final button is visible and tappable.

## 6. iPhone Safari landscape

- [ ] Content fits vertically.
- [ ] CTA/final button remains visible.
- [ ] No important text is cropped.
- [ ] Progress indicator does not overlap content.
- [ ] Touch navigation works.
- [ ] No horizontal overflow.

## 7. Safari `aA` scale check

On iPhone Safari:

- [ ] Change page scale via `aA`.
- [ ] Reload page.
- [ ] Check loader.
- [ ] Check all 5 slides.
- [ ] Check portrait and landscape if possible.
- [ ] Confirm no content jumps outside viewport.

## 8. Motion checks

- [ ] Motion is smooth, not noisy.
- [ ] No bounce/elastic/fly-in effects.
- [ ] Typography reveal does not distract from content.
- [ ] Chart animations are readable.
- [ ] No heavy animation causes visible performance drop.

## 9. Git checks before commit

```bash
git status --short
```

Confirm:

- [ ] only intended files are modified;
- [ ] `.DS_Store` is not staged;
- [ ] experimental `assets/bork-infographic-06.png` ... `15.png` are not staged unless intentionally archived;
- [ ] no unrelated files are included.

Use explicit staging:

```bash
git add PROJECT_CONTEXT.md AGENTS.md QA_CHECKLIST.md DEPLOY.md
```

Never stage blindly with `git add .`.
