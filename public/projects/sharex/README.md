# Project media

Drop screenshots for a project here, named to match the project's `id` folder,
then list them in `src/data/portfolio.ts`.

Example — for the project with `id: "sharex"`:

```ts
screenshots: [
  "/projects/sharex/dashboard.png",
  "/projects/sharex/ai-study.png",
  "/projects/sharex/share-file.png",
],
```

Until `screenshots` has at least one entry, the showcase shows an elegant
"Screenshots coming soon" placeholder instead of an empty gap.

Suggested image size: 1600×1000 (16:10) PNG or WebP, under ~300 KB each.