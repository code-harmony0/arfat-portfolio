# Portfolio "Evolve" design (2026-10-13)

Direction chosen by the owner: keep the dark and vermilion world, real phones, CSS 3D; restructure for skimmers and non-technical readers.

## Goals
- A non-technical visitor understands in 10 seconds: he builds mobile apps AND web stores, has shipped many things, and solves real problems.
- Each project reads as Problem, What I did, Result, in plain words. Detail stays on case pages.
- Attribution is honest: every Mantiqh project says "Built at Mantiqh" and states his own part.

## Home order
1. Hero: plain sentence ("I build mobile apps and web stores that people use"), live CSS 3D phone, Shipped / Decides / Owns / Solves lines in plain words, Email me.
2. Store strip (kept).
3. Everything I've shipped: six story cards, same anatomy. Zonesso, Keys On Rent, Eco Crew, QPlease, JIFFL, My Phone Book. Phone Book and JIFFL use Mantiqh thumbnails (owner's decision, 2026-10-13; Mantiqh terms require written consent, tracked in CONTENT-NEEDED.md).
4. Also a web developer: Mobile + Web split, three browser-framed cards (Kalamkari store, Zonesso website, Zonesso admin panel with fake or no data).
5. Problems from production (exists).
6. Teardown: the one wow scene (exists).
7. Contact (exists, shortened).

## Motion rules
One signature scene (Teardown). Shorter pinned scenes on shared tokens (--pin-h, --ease-scrub). Animate transform and opacity only. Complete static fallback (`html.static`). No Lenis changes, no WebGL.

## Truth rules
Only CV or repo-verified numbers. Mantiqh numbers that disagree with the CV (Eco Crew 150K+, KOR 500+ downloads, KOR 4.8 stars, JIFFL 30% claims) stay off the page until the owner decides. Team-size rule and "Mantiqh, not client work" rule from memory still apply. No em-dashes.

## Out of scope
Rebuilding the visual world, WebGL, new case pages beyond Phone Book.
