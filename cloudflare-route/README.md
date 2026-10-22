# Study website under an existing domain path

Target address: **https://asymytric.com/devops-learning/**

The main website stays on Hostinger Website Builder. Cloudflare handles only the study path and fetches its pages from the existing GitHub Pages site. The website continues loading Markdown lessons directly from the `Devops` repository.

## Keep the current DNS

Keep the existing Hostinger A/AAAA records and their Cloudflare proxy enabled. Keep the `www` record and Google mail records as they are. No new DNS record is needed for a path.

Leave **Custom domain** empty in the GitHub Pages settings for `asymytric-devops-journey-web`. The Pages site must remain available at its `github.io` address for the Worker to fetch it.

## Set up in Cloudflare

1. Open **Workers & Pages**, create a Worker, and name it `asymytric-devops-path`. If offered a Hello World starter, use it to create the Worker.
2. Open the Worker's code editor. Replace the starter code with the contents of `worker.mjs`, then deploy it.
3. In the Worker's **Settings > Domains & Routes**, add a **Route**, not a Custom Domain. Select the `asymytric.com` zone.
4. Add these two route patterns:

```text
asymytric.com/devops-learning
asymytric.com/devops-learning/*
```

Do not add a route for the entire domain (`asymytric.com/*`). The first route handles the missing trailing slash; the second serves the study pages and their assets.

Cloudflare's dashboard labels may change; the routing type must be **Route** in front of the existing proxied domain.

## Verify after deployment

- `https://asymytric.com/` still displays the Hostinger site.
- `https://asymytric.com/devops-learning` redirects to `/devops-learning/`.
- The study path displays the reader, with working styles, images, and lesson navigation.
- Editing a published Markdown lesson appears after reloading the reader.

The route configuration above covers the bare domain only. If you also want `www.asymytric.com/devops-learning/`, add the equivalent two `www` routes to the same Worker after testing the primary address.

In Hostinger Website Builder, add a menu item called **DevOps Learning** that links to `https://asymytric.com/devops-learning/`, then publish that menu change.

## Limits and rollback

Cloudflare Workers Free currently includes up to 100,000 requests per day across the account's Workers. HTML, scripts, and images each make requests. The separate public GitHub API limits still apply to lesson loading.

If the study routing needs to be undone, remove these two Worker routes. This leaves the Hostinger DNS and website configuration in place.

The files prepare the integration; they do not themselves deploy a Worker or change the domain.

## Documentation

- [Cloudflare Worker routes](https://developers.cloudflare.com/workers/configuration/routing/routes/)
- [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/)
