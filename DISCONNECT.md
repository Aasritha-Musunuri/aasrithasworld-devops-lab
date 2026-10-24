# Disconnect only the retired Asymytric domain

The learning website is **Aasritha’s World — DevOps Lab**. Keep the GitHub Pages site and every existing `aasrithasworld.in` connection in place.

## Source changes

The old Asymytric Worker source and route configuration have been removed. The reader refuses to fetch lesson content when opened on `asymytric.com` or its subdomains. Public lesson loading remains enabled on GitHub Pages and the current website domain.

These code changes do not remove live Cloudflare routes.

## Remove only these live routes

In the Cloudflare account that owns **asymytric.com**, open the domain’s **Workers Routes** or the relevant Worker’s **Domains & Routes**. Remove only:

```text
asymytric.com/devops-learning
asymytric.com/devops-learning/*
```

Preserve every route for `aasrithasworld.in` and `www.aasrithasworld.in`. Do not delete a Worker that may also serve the current domain. Do not unpublish GitHub Pages, change nameservers, or remove website/email DNS records.

If the old Hostinger website has a DevOps menu link, remove that particular link separately.

## Verification

After the dashboard edit, confirm that the old domain’s route list no longer includes those two patterns and that the existing Aasritha’s World learning URL still works. The live route removal has not been performed by the source update alone.
