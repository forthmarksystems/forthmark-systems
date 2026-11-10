# Editing guide

This site is a static Astro build. Most edits are text or image replacements. There
is no database and no admin dashboard for the portfolio itself.

## Where things live

| What you want to change | File |
| --- | --- |
| Home page | `src/pages/index.astro` |
| Services | `src/pages/services.astro` |
| Our Work index | `src/pages/work/index.astro` |
| Culia Autos case study | `src/pages/work/culia-autos.astro` |
| Operations demo case study | `src/pages/work/operations-system.astro` |
| LMS demo case study | `src/pages/work/programme-platform.astro` |
| Industries | `src/pages/industries.astro` |
| How We Work | `src/pages/how-we-work.astro` |
| About | `src/pages/about.astro` |
| Contact and form | `src/pages/contact.astro` |
| Thank you page | `src/pages/thank-you.astro` |
| 404 page | `src/pages/404.astro` |
| Header and navigation | `src/components/Header.astro` |
| Footer | `src/components/Footer.astro` |
| Page titles and SEO defaults | `src/layouts/BaseLayout.astro` |
| Main styles | `src/styles/global.css` |
| Demo styles | `src/styles/demo.css` |
| Operations demo logic | `src/scripts/ops-demo.js` |
| LMS demo logic | `src/scripts/programme-demo.js` |
| Images | `public/images/` |
| Domain and sitemap settings | `astro.config.mjs` |

## Change the contact email

The published address is `forthmarksys@gmail.com`. It appears in:

- `src/components/Footer.astro`
- `src/layouts/BaseLayout.astro`
- `src/pages/contact.astro`
- `src/pages/thank-you.astro`

Search the project for `forthmarksys@gmail.com` and replace every occurrence.
Also update the contact block text on the contact page if the address changes.

After changing the address, update the Netlify form notification to the same
address under **Forms**, then **Submission notifications**. Form submissions are
emailed from Netlify, not from this repository.

Do not put an email password or SMTP credential in any file. The form is handled by
Netlify. The email address is only displayed as a link.

## Replace the domain

The domain `https://forthmarksystems.com` is also a placeholder. It appears in:

- `astro.config.mjs` (`site`)
- `public/robots.txt` (sitemap line)

After changing it, run a new build and redeploy. Canonical tags, Open Graph URLs
and the sitemap all derive from `astro.config.mjs`.

## Change page copy

Open the page file and edit the text between the HTML tags, or the arrays at the
top of the file where cards and repeated sections are defined.

Guidelines for this site:

- Do not add testimonials, client counts, awards or metrics unless they are true
  and can be evidenced.
- Keep the distinction between live client work and concept demonstrations.
- Use plain punctuation. The copy intentionally avoids long dashes.
- Keep headings in order. One `h1` per page.

## Add a service or industry card

Services and industries are arrays at the top of `src/pages/index.astro` and in
`src/pages/services.astro` or `src/pages/industries.astro`. Add an object with the
same shape as the existing entries.

## Replace an image

1. Prepare the image at 1400 by 900 pixels for screenshots, or the same aspect ratio
   as the current file.
2. Compress it. PNG is used for interface screenshots because text stays sharp.
3. Save it over the existing file in `public/images/work/`, keeping the same file
   name. This avoids editing page code.
4. If the subject changes, update the `alt` text and the caption in the page that
   uses it.
5. Run `npm run build` to verify nothing breaks.

Do not replace a real product screenshot with stock photography. Do not present a
concept demo screenshot as a client deployment.

## Add a case study

1. Copy an existing file in `src/pages/work/`, for example
   `operations-system.astro`.
2. Rename the file. The URL becomes the file name without `.astro`.
3. Update the title, description, headings, screenshots and captions.
4. Add a card to `src/pages/work/index.astro` and, if it should appear on the home
   page, to `src/pages/index.astro`.
5. Add any new images to `public/images/work/`.
6. Add the screenshot to `docs/SCREENSHOTS.md`.
7. Build and test.

## Edit demo data

The demos use sample records stored in the browser. The seed data is in the
`seedData()` function near the top of:

- `src/scripts/ops-demo.js`
- `src/scripts/programme-demo.js`

After changing the shape of the data, change the storage key version, for example
from `forthmark.ops.demo.v1` to `forthmark.ops.demo.v2`. Otherwise a visitor with
old data in their browser may see errors until they reset the demo.

The demo ribbon says the data is sample data. Keep that label visible. Do not connect
a demo to a real database, payment provider or client account.

## Publishing an edit

### Option A: edit on GitHub

1. Open the repository on GitHub.
2. Open the file.
3. Choose the pencil icon.
4. Make the change and commit it to `main`.
5. Netlify rebuilds and publishes automatically.

This is suitable for text changes. It is not suitable for replacing many images.

### Option B: edit locally

```bash
npm run dev
# make changes
npm run build
git add -A
git commit -m "Describe the change"
git push
```

Netlify publishes after the push.

## Before every publish

- Run `npm run build` and confirm it completes with no errors.
- Open the pages you changed on a phone width as well as desktop.
- Check that links still work.
- Check that no real customer data, password, token or `.env` file was added.
- If you changed the contact form, submit a test enquiry after the deploy and check
  that it appears under Netlify Forms.

## What not to edit

- Do not edit files in `dist/`. They are generated and will be overwritten.
- Do not edit `package-lock.json` by hand.
- Do not remove the hidden `form-name` input from the contact form.
- Do not remove `data-netlify="true"` from the form.
- Do not commit `node_modules/`, `.env` files or exported customer data.
