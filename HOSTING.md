# Website hosting

The site is **Aasritha’s World — DevOps Lab**. GitHub Pages publishes the files in `dist/`; the public Markdown source is `Aasritha-Musunuri/Devops`, under `DevOps-Learning-Journey`.

Keep the existing Pages deployment and all `aasrithasworld.in` DNS records and Worker routes intact. The workflow deploys the reviewed website code and does not manage Cloudflare routes.

The requested repository name is `aasrithasworld-devops-lab`. Rename it through GitHub Settings only when the existing route’s Pages upstream can be updated together. GitHub Pages project URLs do not automatically redirect when a repository is renamed. Until then, retaining the existing repository URL preserves its endpoint; the visible site and README use the new branding.

Remove only the old `asymytric.com` route patterns listed in [DISCONNECT.md](DISCONNECT.md). Do not unpublish Pages or delete a Worker used by the current website.
