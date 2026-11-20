# Yuhao-Fu.github.io

Personal site for **EEEE3134 Coursework Part I — Personal Webpage Development**.

The same person and the same facts, published twice, with opposite development
processes.

| | Page | Process |
|---|---|---|
| **V1** | [`ai-generated-page.html`](ai-generated-page.html) | One 74-word instruction to Codex. The agent held design authority. File kept unmodified. |
| **V2** | [`me-designed-page.html`](me-designed-page.html) | A written design specification (concept, IA, type, colour, grid, behaviours). I held design authority. |

Live at:

- https://Yuhao-Fu.github.io/ai-generated-page.html
- https://Yuhao-Fu.github.io/me-designed-page.html

`index.html` is a small landing page linking both.

---

## Repository layout

```
index.html                  landing page linking the two versions
ai-generated-page.html      V1 — single file, unmodified agent output
me-designed-page.html       V2 — semantic markup
assets/site.css             V2 — layered stylesheet, tokens first
assets/site.js              V2 — theme toggle + scroll spy (~70 lines)
.nojekyll                   serve files verbatim, skip Jekyll processing
```

V2 is deliberately three files rather than one: the CSS is long enough that
inlining it would obscure the layering, and splitting it lets the browser cache
it separately. V1 is one file because that is what the agent produced, and the
comparison depends on leaving it that way.

## Publishing

The repository is named `<username>.github.io`, so GitHub Pages serves it at the
account root with no path prefix, and both files land at the URLs the coursework
requires.

```bash
git init
git add .
git commit -m "Add both coursework pages"
git branch -M main
git remote add origin https://github.com/Yuhao-Fu/Yuhao-Fu.github.io.git
git push -u origin main
```

Then: **Settings → Pages → Source: Deploy from a branch → Branch: main / (root)**.
The first build takes about a minute.

## V2 design notes

The page is a *technical specification sheet*, not a landing page. Structure is
drawn with hairlines rather than cards and shadows; the type system separates
serif (reading), monospace (labels) and sans (interface chrome); all colour
values are declared as custom properties and the dark theme overrides seven of
them rather than duplicating rules.

Constraints it was built to satisfy:

- no frameworks, no build step, no third-party requests;
- one `<h1>`, correct heading order, real landmarks;
- every text/background pair ≥ 4.5:1 (measured, not estimated);
- `prefers-reduced-motion` honoured;
- usable and printable with JavaScript disabled.

## Editing content

All copy lives in `me-designed-page.html`. The parts most likely to need
updating are:

- the five rows of the `<dl class="spec">` block (discipline, institution, location, status, contact);
- the four `<li class="work__item">` entries (year, tag, title, description, hardest part);
- the capability matrix rows;
- the `<ol class="timeline">` entries.

V1's copy is in `ai-generated-page.html` and should stay as it is for the
comparison to remain valid.

## Licence

Text and images © 2026 Yuhao Fu. Code released under the MIT licence.
