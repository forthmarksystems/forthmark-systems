# Forthmark Systems portfolio

The official Forthmark Systems portfolio: a static Astro site with one live client
case study, two clearly labelled concept demos, and a Netlify contact form.

## What is in this repository

- Seven main pages: Home, Services, Our Work, Industries, How We Work, About, Contact.
- Three case studies: Culia Autos (live client), Business Operations System
  (concept demo), Learning Management System (LMS) (concept demo).
- Two working demos at `/demos/operations/` and `/demos/programme/`.
- A thank you page and a custom 404 page.
- Netlify configuration, security headers, sitemap and robots file.

## Requirements

- Node.js 22 (see `.nvmrc`)
- npm

## Local development

```bash
npm install
npm run dev
```

Open the URL printed in the terminal, usually `http://localhost:4321`.

## Build

```bash
npm run build
npm run preview
```

The production output is written to `dist/`.

## Deployment

The site is prepared for Netlify from this GitHub repository. See
[docs/HOSTING.md](docs/HOSTING.md) for the exact settings and the form setup.

## Editing

See [docs/EDITING.md](docs/EDITING.md) for how to change copy, images, contact
details and demo data.

## Screenshot record

See [docs/SCREENSHOTS.md](docs/SCREENSHOTS.md) for every image used, where it came
from, and the rules for capturing replacements.

## Feature status

See [docs/FEATURE-STATUS.md](docs/FEATURE-STATUS.md) for what works now, what needs
action, and what is deliberately not included.

## Content and image licence

The code, copy, brand assets and screenshots in this repository are the property
of Forthmark Systems. They are published for the operation of the Forthmark
Systems website. They are not licensed for reuse in other projects.

Third party names and interfaces shown in the Culia Autos case study remain the
property of their respective owners.

## A note on public repositories

This repository contains no credentials, API keys, `.env` files or private
customer records. Do not add any. If a secret is ever committed, rotate it
immediately and remove it from Git history, not only from the latest commit.
