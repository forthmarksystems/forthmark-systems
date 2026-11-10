# Screenshot record and checklist

Every image below is a real capture of the interface it claims to show. No stock
imagery is used as evidence of work.

## Culia Autos: public pages

These are captures of the live production website at `https://www.culiaautos.com/`.

| File | Screen | Notes |
| --- | --- | --- |
| `culia-public-home.png` | Home page | Production content |
| `culia-public-inventory.png` | Browse Cars | Production content |
| `culia-public-car-detail-details.png` | Vehicle detail | Production content |
| `culia-public-saved.png` | Saved cars | Demo account, live catalogue |
| `culia-public-compare.png` | Comparison | Production content |
| `culia-public-consult.png` | Consultation booking | Production content |
| `culia-public-consult-calendar.png` | Consultation form and fee | Production content |

## Culia Autos: admin system

These are captures of a local copy of the real admin interface, populated with
sample records. Names, phone numbers, emails, booking references and amounts are
demo data. No production customer or payment data is shown.

| File | Screen | Notes |
| --- | --- | --- |
| `culia-admin-dashboard.png` | Admin dashboard | Sample totals and records |
| `culia-admin-vehicles.png` | Vehicle inventory list | Sample listings |
| `culia-admin-add-vehicle.png` | Add vehicle form | Empty form |
| `culia-admin-edit-vehicle.png` | Edit vehicle | Sample listing |
| `culia-admin-reorder.png` | Shop order | Sample listings |
| `culia-admin-bookings.png` | Bookings schedule | Sample customers, paid status |
| `culia-admin-interest.png` | Saved interest and abandoned bookings | Sample customers |
| `culia-admin-leads.png` | Leads list | Sample customers |

## Concept demos

These are captures of the demo builds in this repository. The businesses, people
and records are invented.

| File | Screen |
| --- | --- |
| `ops-preview.png` | Operations dashboard |
| `ops-inventory.png` | Operations inventory |
| `ops-orders.png` | Operations orders |
| `ops-reports.png` | Operations reports |
| `programme-preview.png` | LMS dashboard |
| `programme-applications.png` | LMS applications |
| `programme-cohorts.png` | LMS cohorts |
| `programme-attendance.png` | LMS attendance register |
| `programme-certificates.png` | LMS certificates |

## Brand and social assets

| File | Purpose |
| --- | --- |
| `public/images/og-image.png` | Social sharing image, 1200 by 630 |
| `public/favicon.png` | Browser icon, 64 by 64 |
| `public/apple-touch-icon.png` | Apple touch icon, 180 by 180 |
| `public/images/brand/forthmark-black.png` | Logo for light backgrounds |
| `public/images/brand/forthmark-white.png` | Logo for dark backgrounds |

## Capture checklist

Use this every time a screenshot is added or replaced.

### Before capturing

- [ ] Decide whether the screen is live client work, demo data, or a concept demo.
- [ ] Label it correctly in the page copy before publishing.
- [ ] Use a consistent viewport. Current screenshots use 1400 by 900.
- [ ] Set browser zoom to 100 percent.
- [ ] Close personal tabs, notifications and anything showing an account avatar or
      email address that should not be public.
- [ ] Sign in with a demo account, not a personal or client account.

### During capturing

- [ ] Capture the interface only. Avoid browser chrome unless the browser is part of
      the story.
- [ ] Ensure text is sharp and not cut off.
- [ ] Avoid showing real names, emails, phone numbers, payment references, card
      details, addresses or private notes.
- [ ] For admin screens, populate with clearly sample records.
- [ ] If a real name or reference appears, redact it before saving. Prefer replacing
      the record in the demo database over blurring the image.

### After capturing

- [ ] Crop to the same aspect ratio as the existing image.
- [ ] Compress the file. Keep PNG for interface text.
- [ ] Save into `public/images/work/` with a descriptive lowercase name.
- [ ] Update the `alt` text so it describes what the screen shows.
- [ ] Update the caption so it states the source and any demo data.
- [ ] Add the file to the tables above.
- [ ] Run `npm run build`.

### Rules

- Never use a stock photo and describe it as client work.
- Never show a concept demo without the concept label.
- Never publish a screenshot containing credentials, tokens, private customer data
  or payment references.
- Do not show a feature that is not present in the product.
- Do not crop an image in a way that changes what the interface appears to do.

## Current gaps

- The Culia admin screenshots come from a local demo copy, not the production admin.
  This is stated on the case study page.
- No screenshot shows a real payment reference or receipt. Only paid status and
  amount are shown, because that is what the admin displays.
- The demos are front end prototypes. Screenshots show implemented interactions, not
  planned features.
