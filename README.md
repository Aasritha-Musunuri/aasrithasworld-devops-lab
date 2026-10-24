# Aasritha’s World — DevOps Lab

A visual reader for the [DevOps Learning Journey](https://github.com/Aasritha-Musunuri/Devops/tree/main/DevOps-Learning-Journey). Lesson Markdown stays in that repository; this repository contains the website code and illustrations.

Run `start.cmd`, then open http://127.0.0.1:4173 for local preview. Local lessons are read from the adjacent `DevOps-Learning-Journey` folder, grouped under `Foundations/` and `Linux/`. New day folders belong inside their module folder.

The reader includes light and dark themes, supplied topic diagrams, search, saved lessons, reading progress, and named previous/next lesson links. It does not require readers to upload images. Progress and bookmarks stay in the current browser.

Each deployment generates `lessons.json` from the original public Markdown and serves it alongside the website. Readers can open all lessons even if their network cannot reach GitHub’s API or raw-file servers. No second set of Markdown files is maintained here.

When GitHub is reachable, the browser checks for newer notes in the background. Added and removed lesson files then update the learning path. Scheduled deployments also refresh the generated lesson data twice an hour; actual run times depend on GitHub’s scheduler. The existing GitHub Pages endpoint is retained so current website routes continue working.

Only the retired Asymytric integration is being removed. Preserve all `aasrithasworld.in` connections. See [DISCONNECT.md](DISCONNECT.md) and [HOSTING.md](HOSTING.md).
