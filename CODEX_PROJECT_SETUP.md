# CODEX_PROJECT_SETUP.md

Step-by-step guide for turning the previous long Codex chat into a controlled Codex project workflow.

## 1. Go to the repository

```bash
cd /Users/alexanderchernomorets/Documents/Codex/2026-05-22/web-5-bork-senior-web-designer/Presentation_demo
```

## 2. Check the current state

```bash
git status --short
git branch --show-current
git log -1 --oneline
git remote -v
```

Expected:

- branch: `main` or a clearly named documentation branch;
- baseline corresponds to stable version `3.5`;
- no accidental staged files;
- experimental assets are visible and consciously handled.

## 3. Create a documentation branch

```bash
git switch main
git pull --ff-only
git switch -c docs/codex-handoff
```

## 4. Copy the handoff files into the repository root

Copy these files:

```text
PROJECT_CONTEXT.md
AGENTS.md
QA_CHECKLIST.md
DEPLOY.md
CODEX_START_PROMPT.md
CODEX_TASK_TEMPLATE.md
CODEX_PROJECT_SETUP.md
.gitignore
```

And archive file:

```text
docs/archive/ORIGINAL_START_PROMPT.md
```

## 5. Review what changed

```bash
git status --short
git diff -- PROJECT_CONTEXT.md AGENTS.md QA_CHECKLIST.md DEPLOY.md CODEX_START_PROMPT.md CODEX_TASK_TEMPLATE.md CODEX_PROJECT_SETUP.md .gitignore docs/archive/ORIGINAL_START_PROMPT.md
```

## 6. Stage files explicitly

Do not use `git add .`.

```bash
git add PROJECT_CONTEXT.md AGENTS.md QA_CHECKLIST.md DEPLOY.md CODEX_START_PROMPT.md CODEX_TASK_TEMPLATE.md CODEX_PROJECT_SETUP.md .gitignore docs/archive/ORIGINAL_START_PROMPT.md
```

## 7. Commit documentation handoff

```bash
git commit -m "docs: add Codex handoff context and workflow"
```

## 8. Decide what to do with experimental assets

Check:

```bash
git status --short
```

If these remain untracked:

```text
assets/bork-infographic-06.png ... assets/bork-infographic-15.png
```

Choose one option.

### Option A — delete if experiment is closed

```bash
rm assets/bork-infographic-{06..15}.png
```

### Option B — archive inside a separate branch

```bash
git switch -c archive/10-slide-infographics
mkdir -p docs/archive/10-slide-infographics
mv assets/bork-infographic-{06..15}.png docs/archive/10-slide-infographics/
git add docs/archive/10-slide-infographics
git commit -m "archive: preserve unused 10-slide infographic assets"
```

### Option C — keep untracked temporarily

Do nothing, but do not use `git add .`.

## 9. Merge or keep documentation branch

If the documentation is approved:

```bash
git switch main
git merge --no-ff docs/codex-handoff
git push origin main
```

Alternative: keep the docs branch and start future work from it.

## 10. Start a new Codex chat

Open a new Codex chat and paste the contents of `CODEX_START_PROMPT.md`.

The first Codex response should only read context, inspect git state and summarize understanding. It should not modify files.

## 11. Future work pattern

For every future task:

1. Create a branch from `main` or from the approved documentation branch.
2. Use `CODEX_TASK_TEMPLATE.md`.
3. Keep changes small.
4. Run QA checklist.
5. Commit only intended files.
6. Merge after review.
