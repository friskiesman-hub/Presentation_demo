# DEPLOY.md

Deployment notes for BORK Internet Boutique Q2 2026 web-presentation.

## Current known state

Repository:

```text
friskiesman-hub/Presentation_demo
```

Default branch:

```text
main
```

Public GitHub Pages URL:

```text
https://friskiesman-hub.github.io/Presentation_demo/
```

The project appears to be published from `main`, but the exact GitHub Pages settings must be verified in GitHub before changing the deploy flow.

## Before deploy

Run:

```bash
git status --short
git branch --show-current
git log -1 --oneline
```

Confirm:

- [ ] current branch is the intended branch;
- [ ] working tree contains only intended changes;
- [ ] no `.DS_Store` is staged;
- [ ] no experimental assets are staged accidentally;
- [ ] QA checklist has been completed.

## Recommended deploy flow

If GitHub Pages publishes directly from `main`:

```bash
git switch main
git pull --ff-only
# merge or cherry-pick approved branch if needed
git status --short
git push origin main
```

Then open:

```text
https://friskiesman-hub.github.io/Presentation_demo/
```

Check:

- [ ] page loads;
- [ ] assets load;
- [ ] loader works;
- [ ] navigation works;
- [ ] all 5 slides are available;
- [ ] no cache issue hides recent changes.

## GitHub Pages settings to verify

In GitHub repository settings:

```text
Settings → Pages
```

Record:

```text
Source: TBD
Branch: TBD
Folder: TBD
Custom domain: TBD
Build method: TBD
```

After verification, update this file with exact settings.

## SSH deploy key

Previous push/deploy may have used an SSH deploy key.

Do not assume the key path. Verify locally:

```bash
git remote -v
ssh -T git@github.com
```

If a custom key is used, document it locally but do not commit private key paths or secrets if they expose sensitive information.

## Rollback

If deployment breaks:

```bash
git log --oneline --max-count=10
git revert <bad_commit_sha>
git push origin main
```

If rollback should be done from a known stable snapshot, use the known stable commit or local `../stable-v3.5` snapshot only after verifying the diff.
