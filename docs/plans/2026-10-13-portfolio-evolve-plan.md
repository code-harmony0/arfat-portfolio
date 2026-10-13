# Portfolio "Evolve" Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the home page readable by non-technical visitors in 10 seconds: plain hero, six story cards (including My Phone Book), a visible "also a web developer" block, shorter consistent motion, honest "Built at Mantiqh" attribution.

**Architecture:** Static site, no build. Edit `index.html` and `style.css` in place, reusing existing tokens (`--sec`, `--ease`, `--fs-sec`, `--line`, `--sig`). New sections are plain HTML plus a small CSS block each. Verify with `agent-browser` (desktop 1440x900 and phone 390x844), not unit tests.

**Tech Stack:** HTML, CSS (scroll-driven `animation-timeline`, CSS 3D), Geist fonts, `cwebp`/`sips` for images, `agent-browser` for checks.

Design: `docs/plans/2026-10-13-portfolio-evolve-design.md`. Truth rules: CV or repo-verified numbers only, no em-dashes, never "client" for Mantiqh projects, never claim a role the owner has not confirmed.

---

### Task 1: Import the two Mantiqh thumbnails

**Files:**
- Create: `assets/shots/mq-jiffl.webp`, `assets/shots/mq-phonebook.webp`
- Source: `/private/tmp/claude-501/-Users-codeaura-Projects-arfat-portfolio/66ca5c27-8960-4f62-9943-715b67aa4441/scratchpad/mq/img/jiffl/mantiqh_thumb_Jiffel.webp`, `.../img/myphonebook/mantiqh_thumb_MyPhoneBook.webp`

**Step 1:** `cp` both files to the new names above.
**Step 2:** Run `sips -g pixelWidth -g pixelHeight assets/shots/mq-*.webp`. Expected: about 1420x684 each.
**Step 3:** Commit `git add assets/shots/mq-*.webp && git commit -m "assets: Mantiqh thumbnails for JIFFL and My Phone Book"`.

### Task 2: Plain-language hero

**Files:** Modify `index.html` (hero block, `<h1>` through `.glance`), `style.css` only if a line wraps badly.

**Step 1:** Replace the hero copy:
- `<h1>`: line 1 `Arfat Rozewale.`, line 2 (class dim) `I build mobile apps and web stores.`
- `.hero-sub`: `People use them every day. I plan them, build them, and keep them running. Open to relocating anywhere.`
- `.glance` rows in plain words: Shipped `6 products people use, on the App Store, Google Play and the web.` / Decides `How an app is organised, so it stays fast and easy to change.` / Owns `Design to store release at Zonesso, on my own.` / Solves `Real problems: users logged out, a store rejection, new Android rules.`
**Step 2:** Run `agent-browser set viewport 1440 900 && agent-browser open http://localhost:4173/ && agent-browser screenshot` (start `python3 -m http.server 4173` first). Expected: heading on at most 2 lines, no overlap with the phones, Email me visible above the fold.
**Step 3:** Repeat at 390x844. Expected: no horizontal scroll, `Email me` button visible without scrolling past the glance list.
**Step 4:** Commit `hero: plain-language headline and glance rows`.

### Task 3: "Everything I've shipped" story cards

**Files:** Modify `index.html` (new `<section id="shipped">` after `.proof`, before `#cases`; add nav link "Shipped"), `style.css` (new block after the `.cases` block).

**Step 1:** Add the section. Six `<article class="ship">` cards, each with: image (existing store art or Mantiqh thumbnail), `h3` name, one line "what it is" in plain words, `<small>` attribution line, then three labelled lines Problem / What I did / Result, and a link to its case page or store.

Card content (only confirmed facts):
- Zonesso: "Buy and sell cars in Dubai." Problem: many ways to pay, one messy checkout. Did: one checkout for five payment methods. Result: live on both stores. Attribution: "Sole mobile engineer."
- Keys On Rent: "Rent a home from your phone." Attribution: "Built at Mantiqh, two-person team." Result: three apps, one per role, live on both stores.
- Eco Crew: "Sell your recycling and book a pickup." Attribution: "Built at Mantiqh, two-person team. I built the pickup flows." Result: app about 30% smaller.
- QPlease: "Scan a QR code and join a queue from your phone." Attribution: "Built at Mantiqh. I built the mobile app on my own."
- JIFFL: "A hiring app for employers and job seekers, UK." Attribution: "Built at Mantiqh. I led a two-person team." Image: `/assets/shots/mq-jiffl.webp`.
- My Phone Book: "Find nearby shops, services and utilities." Image: `/assets/shots/mq-phonebook.webp`. Attribution: "Built at Mantiqh." **Do not state a role or result until the owner confirms his part** (tracked in CONTENT-NEEDED.md); use only Mantiqh's description of the product for Problem.

**Step 2:** CSS: `.ship-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--sec-sm) clamp(20px,3vw,48px)}`, image `aspect-ratio:2/1;object-fit:cover;border-radius:var(--r)`, labels in `.mono` size with `--sig` for "What I did", 2 columns at max-width 1020px, 1 column at 700px. No equal icon-heading-text cards: the image leads, text is a short labelled list.
**Step 3:** Verify with `agent-browser` at both sizes: all six cards render, no text clipped, every image loads (`agent-browser eval "[...document.images].filter(i=>!i.complete||!i.naturalWidth).length"` returns 0).
**Step 4:** Commit `home: everything I've shipped, six story cards`.

### Task 4: "Also a web developer" block

**Files:** Modify `index.html` (retitle the existing `#web` intro; add three-tile row above the two pinned web scenes), `style.css`.

**Step 1:** Retitle `#web` heading to `I build for the web too.` and lede to `A store I built end to end, the Zonesso website, and the admin panel behind it.`
**Step 2:** Add three browser-framed tiles using existing images: `web-kalamkari-home.webp` (store), `web-zonesso-home.webp` (marketplace site). Admin panel has no safe screenshot: render it as a text tile (name, "Manage listings, users and payments", stack) and add the missing screenshot to CONTENT-NEEDED.md.
**Step 3:** Verify at both sizes; the block must be visible within one scroll after the shipped section.
**Step 4:** Commit `home: web developer block`.

### Task 5: Calm the motion

**Files:** Modify `style.css` (`--pin-h`, pinned scene ranges), `site.js` only if a scene needs it.

**Step 1:** Measure: `agent-browser eval "document.documentElement.scrollHeight"` and count `.pin` elements. Record in the commit message.
**Step 2:** Lower `--pin-h` from 300svh to 240svh and confirm each scene's captions still fit (scrub through with `agent-browser scroll down 600` and screenshot at three points per scene).
**Step 3:** Confirm `html.static` fallback still renders every section (`agent-browser eval "document.documentElement.classList.add('static')"` then screenshot).
**Step 4:** Commit `motion: shorter pinned scenes`.

### Task 6: Verify and record

**Step 1:** One batched round: desktop and mobile screenshots of hero, shipped, web, cases. Fix everything in one batch, then one confirm round.
**Step 2:** `node /Users/codeaura/.claude/skills/impeccable/scripts/detect.mjs --json index.html style.css`. Only the Geist font warning is acceptable.
**Step 3:** Update `CONTENT-NEEDED.md` (My Phone Book role and link, admin screenshot with fake data) and memory `arfat-portfolio-state.md`.
**Step 4:** Commit `portfolio: Evolve pass verified`. Do not deploy until the owner says so.
