# Two repositories, one study website

## Lesson repository

Keep Markdown in `Aasritha-Musunuri/Devops`, under `DevOps-Learning-Journey`.

```text
DevOps-Learning-Journey/
  day-01-how-computers-talk/
    README.md
    01-bits-and-bytes.md
  day-02-os-basics/
    README.md
    01-kernel.md
```

Number each topic filename and use `.md`. A top-level `# Heading` supplies its title. A day README supplies the chapter title. Days with no topic files are hidden.

## Website repository

Copy the contents of `study-blog` into a separate repository, name `asymytric-devops-journey-web`. The website repository root must contain `dist/` and `.github/`, rather than an extra `study-blog/` wrapper.

The hosted website reads its source from `dist/config.js`. The configured lesson repository must be public. Do not put a GitHub access token into the website.

The local preview continues reading workspace files. This lets you review unpublished notes without publishing them.

## How updates appear

On each full page load, the hosted reader discovers the current files in the lesson repository and reads their contents from a consistent source revision. Add, edit, or delete a numbered Markdown topic, commit it to `main`, and reload the website. There is no website rebuild for lesson-only changes. Existing browser tabs do not update until reloaded.

GitHub caching can introduce a short delay. The loader uses two public GitHub API requests per page load, plus raw file downloads. Unauthenticated API limits apply (normally 60 API requests/hour per originating IP). Shared networks or repeated refreshes can reach the limit; the reader shows an error rather than silently serving deleted lessons.

This is browser-side dynamic content on a static website. GitHub Pages does not run `server.mjs`. A backend or cloud VM is not needed for this design. Browser progress and personally uploaded images remain browser-local; they do not synchronize between devices.

## Enable GitHub Pages

1. Create the website repository and upload this folder's contents.
2. In that repository, open **Settings > Pages**.
3. Select **GitHub Actions** as the build and deployment source.
4. Push the website code to `main`, or run **Publish study reader** from the Actions tab.
5. Open the successful deployment URL. With the chosen repository name, the expected default URL is `https://aasritha-musunuri.github.io/asymytric-devops-journey-web/`.

The URL above is a planned address, not confirmation of a deployed site.

## Custom domain

Your confirmed domain is **asymytric.com**. The proposed study hostname is **learn.asymytric.com**, so the main domain can remain independent. This hostname is not configured or live yet.

If you prefer the study site at the bare domain `asymytric.com`, its existing DNS must be reviewed before replacing anything.

1. Verify domain ownership in your GitHub account using the TXT record GitHub supplies.
2. Add the chosen hostname in the website repository's **Settings > Pages > Custom domain**.
3. For a subdomain, add a DNS CNAME pointing to `aasritha-musunuri.github.io` (no repository path).
4. For the bare/apex domain, use the A/AAAA or ALIAS/ANAME records in GitHub's current documentation instead of using a subdomain CNAME.
5. Once DNS validation and certificate provisioning finish, enable **Enforce HTTPS**.

For the proposed hostname, the DNS entry is:

```text
Type:   CNAME
Name:   learn
Target: aasritha-musunuri.github.io
```

Add `learn.asymytric.com` in GitHub Pages settings before adding this record. If DNS is managed through Cloudflare, start with the record set to DNS-only while GitHub validates the domain and issues its certificate.

No domain has been configured by these files. Domain registration remains separate from hosting.

## Documentation

- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Custom domain setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Public API request limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)
