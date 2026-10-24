# My Portfolio

A premium, animated developer portfolio built with **React + TypeScript + Vite + Tailwind CSS v4 + Motion + Lucide**.

> **All content is fictional sample data** (name "Alex Morgan", companies, dates, projects, URLs). Nothing here belongs to a real person. Replace it with your own before publishing.

All editable content lives in **one file: `src/data/portfolio.ts`**.

---

## Project structure

```text
my-portfolio/
├── public/
│   ├── favicon.svg
│   ├── README-resume-instructions.txt   ← where to put resume.pdf
│   └── resume.pdf                       ← YOU add this (not included)
├── src/
│   ├── data/portfolio.ts      ← ALL your content (edit this)
│   ├── types/portfolio.ts     ← TypeScript shapes for that content
│   ├── sections/              ← Hero, About, Skills, Projects, Experience, Education, Process, Contact
│   ├── components/            ← Navbar, ProjectCard, AddProjectGuide, Footer, ...
│   ├── hooks/                 ← small reusable behaviours (tilt, dialog focus, copy...)
│   ├── lib/                   ← helpers (mailto builder, accent colours, motion presets)
│   ├── App.tsx                ← order of sections on the page
│   ├── main.tsx               ← entry point
│   └── index.css              ← design tokens (colours, fonts, animations)
├── index.html                 ← page title, description, social preview tags
├── vite.config.ts
├── package.json
└── README.md
```

Tailwind v4 needs **no** `tailwind.config.js` or PostCSS file. It is wired in through `@tailwindcss/vite` (see `vite.config.ts`) and configured inside `src/index.css`.

---

## A. Local setup

1. Install **Node.js LTS** from <https://nodejs.org> (check with `node -v`).
2. Open the project folder in **VS Code** (File → Open Folder).
3. Open the integrated terminal (Terminal → New Terminal).
4. Install dependencies (downloads packages into `node_modules/`):
   ```bash
   npm install
   ```
5. Start the dev server (live-reloads when you save a file):
   ```bash
   npm run dev
   ```
6. Open the local URL printed in the terminal (usually `http://localhost:5173`).
7. Check the production build (type-checks, then bundles into `dist/`):
   ```bash
   npm run build
   ```
   Optional: `npm run preview` serves that `dist/` build locally, and `npm run lint` checks code style.

---

## B. How to customise

Everything below is in **`src/data/portfolio.ts`** unless another path is shown.

| # | I want to… | Edit |
|---|---|---|
| 1 | Change my name | `name` (and `monogram`, the two letters in the logo) |
| 2 | Change role / hero headline | `role`, and `hero.headline` (`hero.highlight` is the phrase shown in gradient; it must appear inside the headline text) |
| 3 | Edit intro and About | `hero.intro`, `about.bio`, `about.philosophy`, `about.strengths`, `about.enjoyBuilding`, `about.stats` |
| 4 | Update skills | `skills[].items` (add/remove strings), or add a whole category object |
| 5 | Add a project | See section C below |
| 6 | Remove a project | Delete its object from `projects`. The card disappears automatically |
| 7 | Change titles / descriptions | `projects[].title`, `problem`, `description` |
| 8 | Change technology labels | `projects[].technologies` |
| 9 | Replace a GitHub URL | `projects[].githubUrl` |
| 10 | Replace a Live Demo URL | `projects[].liveUrl` |
| 11 | Feature / unfeature | `projects[].featured` (`true` = wide card) |
| 12 | Update experience | `experience[]` |
| 13 | Update education / certifications | `education[]`, `certifications[]` (add `url` only if you have a real credential link) |
| 14 | Change email | `email`. All "email" buttons and the mailto subject/body (`contact.emailSubject`, `contact.emailBody`) follow it |
| 15 | LinkedIn / GitHub | `socialLinks.github`, `socialLinks.linkedin` |
| 16 | Resume PDF | Section D below (`resumeUrl`, `resumeFileName`) |
| 17 | Colours and fonts | `src/index.css` → the `@theme { … }` block (`--color-accent`, `--font-display`…). Project accent colours: `src/lib/accents.ts`. Fonts load from the Google Fonts `<link>` in `index.html` |
| 18 | Animations | Entrance timing: `src/lib/motion.ts`. Scroll reveal: `src/components/AnimatedSection.tsx`. Card tilt strength: `useTilt(…)` in `ProjectCard.tsx`. CSS loops (orbit, float): `--animate-*` in `src/index.css` |
| 19 | Add/remove optional sections | Delete or add a line in `src/App.tsx`. `Education` and `Process` also hide themselves if their data arrays are empty. If you remove a section that has a nav link, remove its entry from `navLinks` too |

Also edit the `<title>` and description in **`index.html`**, because search engines and link previews read that file, not the TypeScript data.

Each project's `visual` (built-in artwork) is one of `bars`, `waves`, `nodes`, `grid`, `orbit`; `accent` is one of `violet`, `cyan`, `mint`, `amber`, `rose`.

---

## C. Add a project (example)

Open `src/data/portfolio.ts`, find the `projects: [ … ]` array and paste a new object **inside it** (before the closing `]`, after a comma):

```ts
{
  id: "my-new-project",
  title: "My New Project",
  problem: "One sentence about the problem it solves.",
  description: "Two sentences about what you built and how it works.",
  technologies: ["React", "TypeScript"],
  category: "Web Application",
  featured: false,
  visual: "grid",
  accent: "violet",
  githubUrl: "https://github.com/YOUR-USERNAME/my-new-project",
  liveUrl: "https://my-new-project.vercel.app",
  caseStudyUrl: "https://your-site.com/case-study", // optional
},
```

- **`id`** must be unique across all projects (lowercase-with-dashes). It is used as the React key.
- **`githubUrl`**, **`liveUrl`** and **`caseStudyUrl`** are optional. Delete a line (or set `""`) and the matching button is hidden. A card with no links shows a short note instead.
- Save the file. With `npm run dev` running, the page reloads and the new card appears. No other file needs changing.
- The **"Add a project"** tile on the site shows these same steps. It is a guide only: it saves nothing, and nothing done in the browser persists. (A real admin dashboard would need a backend and could be added separately later.)

---

## D. Add the resume PDF

This project does **not** include your resume.

1. Export your own resume as a PDF.
2. Name it `resume.pdf` and put it in the **`public/`** folder (same level as `favicon.svg`).
   Different name? Set `resumeUrl: "/your-file.pdf"` in `src/data/portfolio.ts`.
3. Set `resumeFileName` to what visitors should get when they download it.
4. Verify locally: with `npm run dev` running, open `http://localhost:5173/resume.pdf`. Your PDF should display.
5. Reload the site and click **Download Resume** in the hero, navbar, contact area and footer.

Until the PDF exists, those buttons read **"Resume unavailable"** instead of offering a broken download. After you add the file (and reload), they become normal download buttons.

---

## E. Publish to GitHub

1. On <https://github.com/new> create an **empty** repository (no README, no .gitignore). Copy its URL.
2. Check whether Git is already set up here: `git status`. If it says "not a git repository", continue; if a remote already exists (`git remote -v`), skip `init` and `remote add`.
3. In the project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPOSITORY_URL
   git push -u origin main
   ```
   Replace `YOUR_GITHUB_REPOSITORY_URL` with the URL from step 1.

`.gitignore` already excludes `node_modules`, `dist`, `.env` files and editor folders. Do not commit secrets. (This site needs none.) Note that `public/resume.pdf` **will** be committed and become public. That is intended.

---

## F. Deploy to Vercel

1. Sign in at <https://vercel.com> (using "Continue with GitHub" is easiest).
2. **Add New… → Project**, then import your portfolio repository.
3. Vercel detects **Vite** automatically. Confirm:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
4. No environment variables are needed.
5. Click **Deploy**. After about a minute you get a public URL like `https://your-project.vercel.app`.
6. Verify the live site: scroll through every section, open `…/resume.pdf`, and click every project, GitHub, LinkedIn and email link.
7. **Updating later:** edit files → `git add .` → `git commit -m "Update portfolio"` → `git push`. Vercel rebuilds and redeploys automatically.

---

## G. Troubleshooting

| Problem | What to do |
|---|---|
| `npm install` fails | Check `node -v` (use the LTS version). Delete `node_modules` and `package-lock.json`, then run `npm install` again. Corporate proxy? Check `npm config get registry`. |
| Dependency conflict (`ERESOLVE`) | Don't mix in extra packages casually. Re-run on a clean install; as a last resort `npm install --legacy-peer-deps`. |
| `npm run dev` won't start / port busy | Vite prints another port, or run `npm run dev -- --port 3000`. Stop old servers with Ctrl+C. |
| TypeScript error in `portfolio.ts` | The message names the field. Compare with the types in `src/types/portfolio.ts` (e.g. `visual` or `accent` must be one of the allowed words; a missing comma between objects is common). |
| "Cannot find module" / missing import | Check the file name and capitalisation (`ProjectCard.tsx` ≠ `projectcard.tsx`) and the relative path. Restart the dev server after adding files. |
| Page is unstyled / Tailwind classes ignored | Make sure `src/index.css` starts with `@import "tailwindcss";`, `vite.config.ts` includes `tailwindcss()` from `@tailwindcss/vite`, and `main.tsx` imports `./index.css`. Do not add a v3-style `tailwind.config.js`. |
| Animations missing | Your OS may have "reduce motion" turned on. That is intended. Otherwise check the browser console for errors and that `motion` is installed (`npm ls motion`). |
| A project link is broken | Check the URL in `portfolio.ts`. Sample URLs (`your-username`, `example.com`) are placeholders and will not work until replaced. |
| "Resume unavailable" shows | `public/resume.pdf` is missing or named differently. See section D. |
| `npm run build` fails | Read the first error. It is almost always a TypeScript error (the build type-checks first). Fix it, rerun. |
| Vercel deploy fails | Open the deployment log. Confirm build command `npm run build`, output `dist`, and that `npm run build` passes on your machine first. |
| `git push` rejected / remote errors | `git remote -v` to inspect the remote; `git remote set-url origin NEW_URL` to fix it. "Authentication failed": sign in via GitHub Desktop / Git Credential Manager or use a personal access token. "Updates were rejected": the remote has commits you lack, so run `git pull --rebase origin main`, then push. |

---

## Notes

- Fonts (Space Grotesk, Inter, JetBrains Mono) load from Google Fonts. If blocked, the site falls back to system fonts.
- Contact is a `mailto:` link: it opens the visitor's email app and sends nothing by itself. A real contact form would need a backend or a form service.
- Open Graph tags are included without an image; to add one, put an image in `public/` and add an `og:image` tag in `index.html`.
