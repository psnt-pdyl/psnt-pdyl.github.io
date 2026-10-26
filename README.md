# Prashant Paudyal Sharma — portfolio

Single-page portfolio built with [Astro](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com).

```sh
bun install
bun run dev      # http://localhost:4321
bun run build    # static site in dist/
```

## Where things live

| Path | What |
| --- | --- |
| `src/data/portfolio.ts` | All content: projects, figures, results, links, skills, publications, certificates |
| `src/components/PortfolioPage.astro` | The whole page: layout and the About / Education / Experience / Teaching / Certificates text |
| `src/pages/` | Routes: `/` (Academic tab), `/projects` (All), `/projects/academic`, `/projects/non-academic`, `/projects/other` — all render `PortfolioPage` |
| `src/components/` | Sidebar, project tile and pop-up, skills matrix, figure, certificate, CV rows, theme toggle |
| `src/scripts/portfolio.ts` | Tabs (and their URLs), skill filter, project pop-up, lightbox, active sidebar link |
| `src/styles/global.css` | Tailwind import, colour tokens (light/dark), fonts and breakpoints |
| `public/` | Images, videos, paper PDFs and the CV, served at the same paths as before |

To add a project figure, put the file in `public/img/` and replace a `{ placeholder: ... }` entry in
`src/data/portfolio.ts` with `{ src: 'img/file.png', alt: '...', caption: '...' }`.
A project's `skills` list drives its chips, the skill filter and the skills matrix.

Set `site` in `astro.config.mjs` to the deployed URL so the sitemap links are correct.
