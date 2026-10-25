# Photography

Put your photographs here, then list them in `src/data/portfolio.ts` → `photos`:

```ts
export const photos: Photo[] = [
  {
    id: "campus-morning",
    src: "/photography/campus-morning.jpg",
    alt: "Morning light falling across the college campus walkway",
    caption: "Campus mornings",
  },
  {
    id: "portrait-window",
    src: "/photography/portrait-window.jpg",
    alt: "Portrait taken beside a window with soft backlight",
    caption: "Window light",
  },
];
```

Notes

- `alt` must describe the photo — it is read by screen readers.
- While `photos` is empty the page shows framed placeholders, never stock images.
- Landscape 3:2 and portrait 4:5 both fit the gallery rhythm; landscape works best
  for the first photo.
- Aim for under ~500 KB per image (export at ~2000px on the long edge, WebP if
  your tooling prefers it).