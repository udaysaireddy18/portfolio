# Portfolio — Medapati Uday Sai Reddy

**Building with code. Capturing with creativity.**

A production-ready personal portfolio for a 2nd-year B.Tech CSE student at Aditya
University who is both an aspiring software developer and a photographer.

Dark-first, blue/cyan, glassmorphic, fully responsive, keyboard accessible and
built on React 19 + TypeScript + Vite. No fake projects, no fake achievements,
no fake photography, no invented skill percentages.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script              | What it does                                        |
| ------------------- | --------------------------------------------------- |
| `npm run dev`       | Dev server with hot reload                          |
| `npm run build`     | Type-check + production build into `dist/`          |
| `npm run preview`   | Serve the production build locally                  |
| `npm run lint`      | Lint (oxlint)                                       |
| `npm run typecheck` | TypeScript only                                     |
| `npm run build:gh`  | Build with the GitHub Pages base path               |

---

## Everything you edit lives in one file

**`src/data/portfolio.ts` is the single source of truth.** Nothing else needs to
change when you add content.

### 1. Name, tagline, bio, contact

```ts
export const profile = {
  name: "Medapati Uday Sai Reddy",
  brandLines: ["Building with code.", "Capturing with creativity."],
  heroLead: "…",
  about: ["…", "…"],
  email: "udaysaireddy181@gmail.com",
};
```

### 2. Social links

Edit `socials`. Add, remove or reorder — the nav, hero and footer all read from
it, so each entry appears everywhere at once.

### 3. Navigation

Edit `navLinks`. Each `id` must match the `id` of a section in `src/App.tsx`.

### 4. Skills

Add or remove entries inside `skillCategories`. Categories are rendered
automatically; the "N categories · N skills" counter updates itself. Skills are
listed only — no percentages are invented anywhere.

### 5. Education

Append to `education`. Each item takes a degree, field, institution, period,
status (`"current" | "completed"`) and a list of highlights.

### 6. Projects

Append to `projects` (featured) or `moreProjects` (secondary grid).

```ts
{
  id: "my-next-app",                       // used for the media folder name
  name: "My Next App",
  tagline: "One line that sells the project",
  summary: "What it does and why it exists.",
  highlights: ["Secure file sharing", "…"], // shown on hover
  technologies: ["React", "Node.js"],      // only confirmed technologies
  features: ["Full sentences describing each capability."],
  github: "https://github.com/…",
  demo: "https://…",                       // omit until it is live
  screenshots: ["/projects/my-next-app/1.png"],
  architecture: {
    nodes: [{ label: "Client", detail: "…" }],
    flow: [{ from: "Client", to: "API" }],
  },
  futureImprovements: ["…"],
  featured: true,
  year: "2026",
}
```

Screenshots live in `public/projects/<id>/` — see the README in that folder.
The showcase modal handles missing pieces gracefully: no `demo` shows a
"Live demo — coming soon" button, no `screenshots` shows a placeholder panel.

### 7. Photography

Put images in `public/photography/` and list them in `photos`. While the array
is empty the gallery shows elegant viewfinder placeholders and never fake
photographs. See `public/photography/README.md`.

### 8. Certifications & achievements

Append to `certifications` (name, organization, date, description, optional
`link`). The section stays an honest "coming soon" panel while it is empty.

### 9. Contact form backend

Open `src/utils/contact.ts` and set `endpoint`:

```ts
const endpoint: string | null = "https://formspree.io/f/xxxxxxx";
```

Formspree, Web3Forms, Getform, a custom API — anything that accepts a JSON
`POST` of `{ name, email, message }`. While `endpoint` is `null` the form still
validates input and then opens the visitor's mail client with the message
pre-filled, and it says so honestly instead of faking a success state.

---

## Project structure

```
public/
  favicon.svg            monogram icon
  og-cover.svg           social share image
  projects/<id>/         project screenshots
  photography/           your photographs
src/
  data/
    portfolio.ts         ← ALL editable content
    types.ts             content type definitions
  hooks/
    useTheme.ts          dark/light with localStorage + system preference
    useScrollSpy.ts      active navigation item
    useScrollReveal.ts   IntersectionObserver scroll reveals
    useReducedMotion.ts  live prefers-reduced-motion
  components/
    Navbar, Footer, ThemeToggle, ProjectCard, ProjectModal,
    TiltCard, MagneticButton, ParticleField, SocialLinks,
    SectionHeading, icons
  sections/
    Hero, About, Skills, Education, Projects,
    Photography, Achievements, Contact
  styles/
    tokens.css           design tokens + both themes
    base.css             reset, layout primitives, utilities
    animations.css       reveal/keyframes + reduced-motion rules
    app.css              app-level layout
  utils/
    contact.ts           form validation + endpoint wiring
```

---

## Design system

- **Themes** — dark first, light available. Toggle in the navbar; the choice is
  stored in `localStorage` and the first paint restores it before React mounts,
  so there is no flash of the wrong theme. With nothing stored, the system
  preference wins.
- **Accent** — blue → cyan gradients (`--grad-accent`) on `#2f81f7` / `#35e0f2`.
  Deeper blues (`--grad-fill`) sit behind white text so buttons and the logo
  keep AA contrast in both themes.
- **Surfaces** — glassmorphism: translucent panels, thin 1px borders, soft
  shadows, `backdrop-filter` blur.
- **Motion** — scroll reveals, magnetic buttons, 3D tilt cards, animated
  gradients, canvas particles, a sliding nav indicator. Everything collapses
  under `prefers-reduced-motion: reduce`, and the particle canvas renders a
  single static frame instead of animating.

---

## Accessibility

- Semantic landmarks: one `h1`, ordered `h2`/`h3` headings, `nav`, `main`,
  `article`, `footer`.
- Skip-to-content link and a logical tab order.
- Visible 2px focus rings on every interactive element.
- The project modal is a real `role="dialog" aria-modal="true"` with focus
  trapping, Escape to close and focus restoration.
- Form fields use labels, `aria-invalid` and `aria-describedby`, and status
  messages announce through `role="status" aria-live="polite"`.
- Text contrast meets WCAG AA in both themes (light: 4.9:1 minimum on sampled
  text; dark: 5.7:1 on the faintest label).
- Decorative canvases, glows and icons are hidden from assistive technology.

## SEO

`index.html` carries the title, meta description, canonical link, Open Graph and
Twitter card metadata, a theme-color meta tag and JSON-LD `Person` structured
data. Update the `https://udaysaireddy18.github.io/` URLs there if you deploy
somewhere else.

## Performance

- No UI libraries, no icon fonts — inline SVG and hand-written CSS only.
- Canvas particles pause when the tab is hidden and cap at 74 particles.
- Bundle: ~82 KB gzipped JS, ~10 KB gzipped CSS.
- Fonts load from Google Fonts with `preconnect` and `display=swap`.

## Deployment

- **Vercel / Netlify / Render** — import the repo, framework auto-detects, build
  `npm run build`, output `dist`. No configuration needed.
- **GitHub Pages** — `npm run build:gh`, then publish `dist/` to the `gh-pages`
  branch (or use the `actions/deploy-pages` workflow).

---

## Content honesty

Anything not yet available is a clearly marked placeholder, never invented
content. The site ships with:

- one real project (ShareX) with a repository-verified technology list,
- no photographs (framed placeholders instead),
- no certifications (an empty-state panel instead),
- no skill percentages.

Update `src/data/portfolio.ts` as real work lands.