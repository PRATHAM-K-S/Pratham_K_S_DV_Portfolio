# Pratham K S — Design & Verification Portfolio

Personal portfolio of **Pratham K S**, a Design & Verification (DV) Engineer and 2026 Electronics and Communication Engineering graduate from NMAMIT, Nitte.

**Live site:** [pratham-k-s-dv-portfolio.vercel.app](https://pratham-k-s-dv-portfolio.vercel.app)

The site is styled after a waveform viewer (GTKWave / Verdi). Its timing diagrams are real SVG waveforms generated from signal data, not images.

## Highlights

- **Waveform renderer:** `components/Waveform.tsx` draws clocks, single-bit signals, and multi-bit buses with a time ruler, markers, and a sweeping simulation cursor.
- **Protocol waveforms:** the hero shows APB back-to-back writes and a read with wait states. The project cards show an APB `PSLVERR` error response and AXI4-Lite channel independence.
- **Testbench hierarchy trees:** each project shows its testbench structure, like the hierarchy pane of a waveform viewer.
- **Skills as buses:** each skill category is rendered as a named bus (for example `hdl_verif[5:0]`) with hexagonal value segments.
- **Details:** scroll-triggered reveal and trace-drawing animations, an active-section indicator in the navbar, dark theme, responsive layout, and support for reduced-motion settings.

## Sections

| Section | Content |
| --- | --- |
| Hero | Name, role, headline, and an animated APB waveform viewer |
| About | Background, focus areas, and quick stats |
| Skills | HDLs and verification frameworks, languages and scripting, protocols, tools |
| Projects | APB (class-based SystemVerilog) and AXI4-Lite (UVM) verification |
| Experience | Full-time DV engineer, DV internship, B.Tech in ECE |
| Contact | Email, LinkedIn, GitHub, and location |

## Featured projects

**APB Protocol Verification.** A layered, class-based SystemVerilog testbench (no UVM) for an APB slave written in Verilog. It has a transaction, generator, driver, monitor, scoreboard, and coverage model. Targeted and constrained-random stimulus covers single and burst read/write transfers, wait states, and `PSLVERR` responses, reaching 100% functional and code coverage.

**AXI4-Lite Protocol Verification.** A UVM environment for an AXI4-Lite slave written in Verilog. It verifies read/write channel independence, VALID/READY handshakes, address-decoder boundaries, and back-to-back transfers. SVA checkers enforce the handshake timing rules, and regressions produce automated test and coverage reports.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, statically prerendered)
- [React 19](https://react.dev) and TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) (CSS-first configuration in `app/globals.css`)
- [Lucide](https://lucide.dev) icons, with inline SVGs for the GitHub and LinkedIn marks
- [Geist Sans and Geist Mono](https://vercel.com/font) via `next/font`

## Project structure

```
dv-portfolio/
├── app/
│   ├── globals.css        # Theme tokens, utilities, waveform animations
│   ├── layout.tsx         # Fonts and page metadata
│   └── page.tsx           # Assembles all sections
├── components/
│   ├── Navbar.tsx         # Sticky glass navbar with active-section indicator
│   ├── Hero.tsx           # Headline, CTAs, waveform viewer, wafer-map backdrop
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx       # Project cards with hierarchy tree and waveform
│   ├── Experience.tsx     # Timeline (work and education)
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Waveform.tsx       # SVG waveform renderer
│   ├── ViewerWindow.tsx   # Waveform-viewer window chrome
│   ├── SectionHeading.tsx
│   ├── Reveal.tsx         # Scroll-reveal wrapper (also starts trace animations)
│   └── icons.tsx          # Clock glyph, GitHub and LinkedIn icons
└── lib/
    ├── data.ts            # All site content: profile, skills, projects, experience
    └── waveform.ts        # Signal types and clock/bit/bus helpers
```

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

> **Windows note:** if PowerShell says `npm.ps1 cannot be loaded because running scripts is disabled`, run
> `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` once, then open a new terminal.

## Editing content

All text, links, and waveform data live in [`lib/data.ts`](lib/data.ts), so most updates never touch the components.

- **Profile:** `profile` holds the name, email, GitHub, LinkedIn, and location.
- **Skills:** `skillCategories` sets each bus name, title, and skill list.
- **Projects:** each entry in `projects` has its description, highlights, tech tags, hierarchy tree, waveform, and links (`architectureUrl`, `githubUrl`).
- **Experience:** `experience` holds the timeline entries. The optional `org` field shows an organization line.

Waveforms are written with the helpers in `lib/waveform.ts`, one character or run per clock cycle:

```ts
import { bit, bus, clock } from "./waveform";

const wave = {
  file: "sim/example.vcd",
  cycles: 8,
  signals: [
    clock("PCLK"),
    bit("PSEL", "01110000"),
    bit("PENABLE", "00110000"),
    bus("PADDR[31:0]", ["", 1], ["0x40", 3], ["", 4]), // "" = idle
  ],
  markers: [{ at: 3.5, label: "DONE" }],
};
```

## Deployment

The site is hosted on [Vercel](https://vercel.com). It is fully static, so it needs no extra configuration. To publish a new production build from this folder:

```bash
npx vercel deploy --prod
```

## Contact

- Email: [prathamks2302@gmail.com](mailto:prathamks2302@gmail.com)
- LinkedIn: [pratham-k-s](https://www.linkedin.com/in/pratham-k-s-69118524b/)
- GitHub: [PRATHAM-K-S](https://github.com/PRATHAM-K-S)

---

© 2026 Pratham K S
