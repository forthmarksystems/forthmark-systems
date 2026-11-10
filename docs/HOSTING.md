# Hosting on Netlify

The site is designed to deploy from GitHub to a new Forthmark Systems Netlify
account. The Culia Autos Netlify account is not used and must not be connected to
this repository.

## Accounts and repository

- GitHub repository: `https://github.com/forthmarksystems/forthmark-systems`
- Netlify account: the new Forthmark account, not the Culia Autos account.
- Netlify site name suggestion: `forthmark-systems` (availability is not guaranteed).

## Build settings

These are already in `netlify.toml`, so Netlify should read them automatically.

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | 22 |

If Netlify shows empty fields, enter the values above manually.

## First deployment

1. Sign in to the new Netlify account.
2. Choose **Add new site**, then **Import an existing project**.
3. Choose **Deploy with GitHub** and authorise Netlify for the new GitHub account.
4. When GitHub asks for repository access, choose **Only select repositories** and
   select `forthmarksystems/forthmark-systems` only.
5. Select the repository.
6. Confirm the build command and publish directory, then choose **Deploy site**.
7. Wait for the deploy log to finish. The first deploy usually takes under a minute.
8. Copy the generated URL, for example `random-name-123.netlify.app`.

After the first deploy, rename the site under **Site configuration**, then
**Change site name**. This changes only the Netlify address, not the repository.

## Contact form detection

The contact page contains a Netlify form named `project-enquiry`.

1. Open the site in Netlify.
2. Go to **Forms**.
3. Choose **Enable form detection** if it is not already on.
4. Go to **Deploys**, then **Trigger deploy**, then **Deploy site**.

Netlify scans the built HTML during a deploy. The form will not appear in the
Forms list until a deploy happens after detection is enabled.

Submissions appear under **Forms**, then `project-enquiry`. The form posts to
`/thank-you`, which is a static page in the build.

If the form does not appear:

- Confirm the built contact page contains `data-netlify="true"` and the hidden
  `form-name` field.
- Confirm forms are enabled.
- Trigger a fresh production deploy, not only a browser refresh.
- Check the deploy log for a form detection message.

## Free plan limits

As of November 2026, new Netlify accounts use credit based plans. The free plan
includes a monthly credit allowance, and usage is drawn from it. Figures can
change, so confirm the current limits in the Netlify dashboard before relying on
them.

At the time of building:

- 300 credits per month.
- A production deploy costs about 15 credits.
- Bandwidth costs about 20 credits per GB.
- Requests cost about 2 credits per 10,000.
- Form submissions are included.

If the monthly credits are exhausted, Netlify may pause all sites on the account
until the next cycle. This is a low traffic portfolio, but the dashboard should be
checked after busy periods or many deploys.

## Security headers

`netlify.toml` sets:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: SAMEORIGIN`
- Long cache for hashed build assets in `/_astro/*`
- Daily cache for images in `/images/*`

The demo pages are not framed by other sites, so `SAMEORIGIN` is safe.

## Custom domain

No domain has been purchased.

To connect one later:

1. Buy the domain from any registrar. This is the only likely recurring cost.
2. In Netlify, open **Domain management**, then **Add a domain**.
3. Follow the DNS instructions. Netlify can host DNS or you can point records from
   the current registrar.
4. Wait for DNS to propagate. Netlify issues an SSL certificate automatically.
5. Update `astro.config.mjs`, `public/robots.txt` and the canonical URL if the
   final domain differs from `https://forthmarksystems.com`.
6. Redeploy.

Until a domain exists, the canonical tags and sitemap point to
`https://forthmarksystems.com`. That is a placeholder. Search engines will see the
Netlify preview address as a different host. This is acceptable for a private
preview, but change it before promoting the site publicly.

## Deploys and rollbacks

- Every push to `main` triggers a production deploy.
- Pull requests can create deploy previews if enabled.
- Netlify keeps previous deploys. Use **Deploys**, then select an earlier deploy
  and choose **Publish deploy** to roll back.
- Avoid deploying more often than needed on the free plan. Batch edits.

## What stays outside Netlify

- The Culia Autos production application and its database are not part of this
  repository.
- The demos store data only in the visitor's browser. Netlify does not receive it.
- No payment provider, email provider or analytics service is connected.
