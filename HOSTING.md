# Website hosting

The site is **Aasritha’s World — DevOps Lab**. GitHub Pages publishes the files in `dist/`; the public Markdown source is `Aasritha-Musunuri/Devops`, under `DevOps-Learning-Journey`. The deployment checks out the current notes and runs `node build-lessons.cjs .lesson-source/DevOps-Learning-Journey dist/lessons.json`. The generated JSON is part of the Pages artifact, not a second editable copy of the notes.

Keep the existing Pages deployment and all `aasrithasworld.in` DNS records and Worker routes intact. The workflow deploys the reviewed website code and does not manage Cloudflare routes.

The repository is `Aasritha-Musunuri/aasrithasworld-devops-lab`. Its GitHub Pages address is https://aasritha-musunuri.github.io/aasrithasworld-devops-lab/ . A deployment after the repository rename publishes at that address. The old Pages project URL does not automatically redirect.

If the existing `aasrithasworld.in` Worker proxies the previous Pages project path, preserve its domain routes and update only its upstream repository path to `/aasrithasworld-devops-lab/`. Do not change the domain’s DNS or delete its Worker routes.

Remove only the old `asymytric.com` route patterns listed in [DISCONNECT.md](DISCONNECT.md). Do not unpublish Pages or delete a Worker used by the current website.
