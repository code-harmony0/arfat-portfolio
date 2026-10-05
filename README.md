# Arfat portfolio

Hand-built static site. No framework, no build step. Deploy: `npx vercel --prod` from this folder.
Content source of truth: `career-ops/cv.md`. Only facts and numbers that exist there go on the page.

## Direction: "The Teardown" (scan layer on home, depth in case studies)
Dark, one signal colour (vermilion `#ff5b2e`), Geist + Geist Mono (self-hosted). Mobile is about 60% of the scroll.

- `index.html` is the home page. `work/{zonesso,keys-on-rent,eco-crew,jiffl,cone,qplease}/` are the case studies (clean URLs via `vercel.json`).
- Case pages are generated from one template; edit the template, not six files. Keep the same facts-only rule.
- Everything animated is native CSS: scroll-driven animation (`animation-timeline`), a registered `--p` progress
  variable per pinned scene, 3D transforms, and cross-document view transitions for page changes.
- `html.static` (set by an inline script) is the fallback for reduced motion and browsers without scroll-driven
  animation (Firefox today). Pinned scenes become swipeable layouts instead of animations.
- `site.js` (about 60 lines, no libraries): one-time count-ups, pointer depth and magnetic buttons on desktop, and closing the mobile menu. The menu itself is the native `popover` attribute.
- Backgrounds behind each product are pre-blurred 360px images (`assets/shots/bg-*.webp`), not live `filter: blur()`, which was the cause of scroll jank.

## Images (`assets/shots/`)
All screens are real. They come from the public App Store listings of the apps (via the iTunes lookup API) and
screenshots of the live sites (`motors.zonesso.com`, `srikalahastikalamkari.in`).
- `zonesso-ui-1..7.webp`: raw in-phone screens, cropped out of the store frames (used inside CSS phones).
- `zonesso-store-*`, `kor-*`, `eco-*`: full App Store frames (they carry each product's own colour world).
- `web-*.webp`: full-page captures used inside the browser frames. Re-capture if those sites change.
- `banner-{jiffl,cone,qplease}.webp`: hero art from the Mantiqh case pages. `qplease-*`: App Store frames.
- `icon-*.webp`: app icons. `og.png`: 1200x630 share image.

## Rules
No em-dashes, no invented numbers, no placeholder text on the live page. Missing content is tracked in `CONTENT-NEEDED.md`.

## Content rule: the home page is the scan layer
A visitor decides in about ten seconds and reads roughly a quarter of any page. So the home page carries a headline, a visual and one short line per section, plus a few big numbers. Anything longer (what I owned, what was hard, how I solved it) lives in `work/*` for the people who click through. Do not add paragraphs, skill lists or role lists back to `index.html`; LinkedIn is the resume.
