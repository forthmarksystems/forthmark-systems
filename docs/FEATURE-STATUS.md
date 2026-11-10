# Feature status

Last verified: 10 November 2026.

## Working now

| Area | Status | Evidence |
| --- | --- | --- |
| All main pages | Working | 14 pages build to `dist/` |
| Header and mobile menu | Working | Keyboard close on Escape, closes after navigation |
| Internal links and images | Working | 217 internal references checked, 0 missing |
| Culia Autos case study | Working | Public and admin screenshots, captions, limitations stated |
| Operations concept demo | Working | Search, filters, stock changes, order status, tasks, reports, CSV, reset |
| Programme concept demo | Working | Applications, acceptance, cohorts, sessions, attendance, certificates, reports, CSV, reset |
| Demo persistence | Working | localStorage, with reset controls |
| Contact form markup | Working | Netlify form attributes, honeypot, required fields, thank you page |
| Thank you page | Working | Static route |
| Custom 404 page | Working | `404.html` |
| SEO basics | Working | Titles, descriptions, canonical, Open Graph, sitemap, robots |
| Social image and icons | Working | 1200 by 630 OG image, favicon, Apple touch icon |
| Security headers | Working | Configured in `netlify.toml` |
| Responsive layout | Working | Checked at 390px and 1440px widths, no page overflow |
| No console errors | Working | Demo interactions tested in Chrome with no runtime errors |

## Needs action before public launch

These are account or content tasks, not code faults.

1. **Connect Netlify.** Import the GitHub repository into the new Forthmark Netlify
   account. See `docs/HOSTING.md`.
2. **Rename the Netlify site** to `forthmark-systems` if available.
3. **Enable form detection**, then trigger a new deploy. Submit a test enquiry and
   confirm it appears under Forms.
4. **Replace the contact email.** `hello@forthmarksystems.com` is a placeholder.
5. **Replace the domain.** `https://forthmarksystems.com` is a placeholder in
   `astro.config.mjs` and `robots.txt`.
6. **Confirm screenshot permissions.** Culia Autos is shown with real public
   screenshots and local admin demo records. Confirm the client is comfortable with
   the admin screens being public.
7. **Add a privacy notice if required.** The contact form collects a name, business,
   email, phone and project details. A short privacy page may be needed under NDPR
   or the policy of the operating jurisdiction.
8. **Decide on repository visibility.** The repository is currently public. It
   contains no secrets. If that changes, switch it to private before adding anything
   sensitive.

## Deliberately not included

These are not bugs or forgotten work. They are outside the scope of a portfolio
site and its concept demos.

- User accounts, login or role based access on the portfolio.
- A server, shared database or multi-user sync for the demos.
- Payment processing, invoicing or refunds.
- Email or SMS notifications.
- Appointment calendar sync.
- File uploads or document verification.
- PDF certificate generation. The demo records eligibility and an issue date only.
- Public application forms for the programme demo.
- Live chat or chatbot.
- Blog, news or insights section.
- Site search.
- Multiple languages.
- Analytics or advertising trackers. None are installed, so no cookie banner is
  currently required.
- A Git based CMS. Editing is done in files or on GitHub.

## Paid dependencies and costs

| Item | Cost | Needed now |
| --- | --- | --- |
| Netlify Free plan | 0 | Yes, with monthly credit limits |
| Custom domain | Usually annual | No, but recommended before public promotion |
| Netlify paid plan | Monthly | No, only if free credits are exhausted |
| Git based CMS | 0 to paid | No, optional convenience |
| Stock photography | 0 | Not used, and must not be presented as work |
| Email inbox | Depends on provider | Yes, for the published contact address |

No payment details are required for the current build. The only likely recurring
cost is the domain.

## Free plan risk

The Netlify free plan uses a monthly credit allowance. Production deploys,
bandwidth and requests all consume credits. If credits run out, the site can pause
until the next cycle. For a low traffic portfolio this is unlikely, but the Netlify
dashboard should be checked after busy periods or repeated deploys.

## Culia Autos production

Nothing in this repository connects to, modifies or exposes the Culia Autos
production application, database or admin credentials. The case study uses public
screenshots and a local admin copy with fictional records.

## Test record

| Test | Result |
| --- | --- |
| `npm run build` | Pass, 14 pages |
| Internal link and asset check | Pass, 0 missing of 217 references |
| Duplicate HTML ids | Pass, none found |
| Desktop layout at 1440px | Pass on all main pages |
| Mobile layout at 390px | Pass, no horizontal page overflow |
| Programme: open application | Pass |
| Programme: accept and enrol | Pass, participant created |
| Programme: mark attendance | Pass, saved and recalculated |
| Programme: issue certificate | Pass, issue date recorded |
| Programme: add application | Pass |
| Operations: adjust stock | Pass |
| Operations: change order status | Pass, persisted |
| Operations: update settings | Pass |
| Operations: reset | Pass after confirming the dialog |
| Browser console errors during tests | None |
| Contact form end to end | Not yet possible until Netlify form detection is enabled |
