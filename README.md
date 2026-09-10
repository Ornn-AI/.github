# Ornn GitHub Profile

This repository controls the public GitHub organization profile for
[Ornn-AI](https://github.com/Ornn-AI).

The organization landing page is rendered from
[profile/README.md](profile/README.md). Keep that file concise, public-facing,
and aligned with the current company positioning on [ornn.com](https://ornn.com).

## Local development

Install the tooling once, then lint, verify links, and preview the profile:

```bash
npm install        # install dev tooling
npm run check      # markdown lint + link check across all docs
npm run preview    # render profile/README.md at http://localhost:8080
```

`npm run check` runs `markdownlint-cli2` and `markdown-link-check`; run it
before opening a pull request. `npm run preview` serves a GitHub-styled
rendering of the profile for visual review.
