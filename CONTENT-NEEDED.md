# Content still needed (kept off the live page on purpose)

A recruiter should never see a placeholder, so these are tracked here instead of rendered.

## Verify before relying on
- [ ] `srikalahastikalamkari.in` is the live site for the CV entry "Shri Kalahasti Kalamkari". Linked on that assumption.
- [ ] `motors.zonesso.com` is the Next.js site you built or maintain (CV says Next.js website and admin dashboard).

## Case study depth (CV has no more detail than what is already shown)
- [ ] Keys On Rent: how you solved the shared-domain problem across three apps (architecture, shared package, API shape). Your role label is "delivered all three applications"; confirm if sole engineer.
- [ ] Keys On Rent: tenant installs figure is 1,000+ (CV). Landlord and KOR Manager install counts if you have them.
- [ ] Eco Crew: your exact role and employer context (CV says "supported" the app). What was hard and how you solved it.
- [ ] Zonesso: which datastore sits behind the API. Not claimed anywhere on the page right now.
- [ ] Zonesso: any store rating or user numbers you are allowed to publish (none used).
- [ ] Short outcome line per project: what changed for the business after release.

## Assets
- [ ] GitHub link, once you pin repos (none shown).
- [ ] Resume PDF (CV PDF includes your phone number, so it is not published by default).
- [ ] Custom domain, then update `og:url` and `canonical` in all four HTML files.
- [ ] Screens for KOR Manager and JIFFL (no store frames used).
- [ ] Admin dashboard screenshots with fake data (real admin data must not be published).

## Added with the Mantiqh client work
- [ ] QPlease: the page now says you built the mobile app solo (confirmed 2026-10-05). The CV does not list QPlease; add it there too.
- [ ] Numbers disagree between sources. The page uses the CV. Mantiqh's site says: Eco Crew 150K+ downloads (CV: over 50,000), Keys On Rent 500+ downloads, 4.8 stars, 1K+ listings (CV: 1,000+ tenant installs), JIFFL +25% placement rate (CV: about 30% engagement). Decide which are yours to claim.
- [ ] Cone and QPlease dates and your involvement period (Mantiqh lists both as 2024, JIFFL as 2023; the CV dates JIFFL as June 2024 to February 2025).
- [ ] Hero art for JIFFL, Cone and QPlease comes from mantiqh.com. Confirm you are allowed to reuse it publicly, or swap in your own captures.

## After the 2026-10-05 critique
- [ ] Eco Crew: the page now says you "built the geolocation pickup flows and cut the app size by about 30%" (your answer). The CV line says "Supported an application with over 50,000 downloads"; make the CV match.
- [ ] Keys On Rent, Eco Crew, QPlease galleries are App Store listing art (labelled as such). Raw device captures or a short screen recording of each app would replace them and settle the "is this his screen?" question.
- [ ] A resume PDF without your phone number and a GitHub link (or one open-source snippet) would give a CTO code evidence. Neither is on the page.
- [ ] A one-line reference from Zonesso or Mantiqh, if anyone will give one.

## Team size (confirmed by you, 2026-10-05)
Zonesso and QPlease are the apps where you were the sole engineer. Keys On Rent, Eco Crew, Cone and JIFFL were two-person teams, and the page now says so. QPlease was also solo. Still to confirm:
- [ ] Who led technically on each two-person app, if it was not you. JIFFL says you led it (from your CV: project lead). Cone, QPlease, Keys On Rent and Eco Crew only say "two-person team" and what you built.
- [ ] Your CV bullet for Mantiqh says you "owned the mobile team" and "mentored junior developers". Adjust it so the CV and the page do not contradict each other.

## JIFFL and QPlease are UK projects at Mantiqh (owner, 2026-10-05)
They are not "client work": they are UK-based projects from your previous company, Mantiqh. JIFFL is a large app with two sides (employer and job seeker). The page now says so, and the section is titled "More shipped work".
- [ ] Your CV calls JIFFL "client communication"; reword it to match ("stakeholder"), or tell me who the stakeholder was.
- [ ] Cone is still described as a client product (from your CV). Confirm.

## JIFFL screens (2026-10-05)
The JIFFL case page now shows five screens from its Google Play listing (job seeker side only: sign-up, bio-video apply, job matching, availability, offers). Nothing on the page shows the employer side.
- [ ] If you have store or press screens of the JIFFL employer side, send them and I will add them so both sides of the app are visible.
- [ ] Cone has no store listing (confirmed): the page links only getcone.io and shows Mantiqh's design art, never store badges.

## CV synced (2026-10-05)
career-ops/cv.md now matches the site: JIFFL (two-sided UK app, two-person team, stakeholder communication), Keys On Rent, Eco Crew and Cone (two-person teams; Eco Crew says "built the pickup flows", not "supported"), and QPlease added (sole mobile developer).
- [ ] cv.md still says you "ran code reviews and mentored junior React Native developers" (Mantiqh Project Lead role). The site does not claim it. Keep it only if true for the wider company.
- [ ] QPlease has no tech stack line in the CV because I did not want to guess. Add it (React Native?).
- [ ] The per-job tailored PDFs in career-ops/output/ were generated from the old cv.md. Regenerate any you still send.

## Story pass (2026-10-13): what is verified and what needs your eyes
Zonesso's story is built from the repos (ARCHITECTURE.md, Fastfile, bitbucket-pipelines.yml, test files, commit history): state split, optimistic UI, payment boundary, guided add-post, upgrade numbers, notification race fix, iOS 18 IAP patch, App Store rejection (ATT and IAP discoverability, May 2026), Samsung Pay ProGuard rules. No latency numbers are claimed because none are recorded in the repos.
Written from your CV only, so the reasoning wording is a draft. Correct anything that is not how you thought about it:
- [ ] Keys On Rent "How I read it": the shared-meaning-of-tenancy/payment/ticket framing, and "each app launched with the core of its own job".
- [ ] Eco Crew "How I read it": location-first framing; how you actually got the 30% size cut (one concrete line would be strong).
- [ ] JIFFL "How I led it": reviews and mentoring come from your CV. Keep only if true.
- [ ] Cone and QPlease: the briefs and "trust chain" mapping are my wording.
- [ ] Hero facts: "5 years in production", "5 apps on the stores", "2 apps built solo".
- [ ] Contact "First week / First month / After that" is an offer, not a record. Edit to how you really start.
For each project, a real story needs 3 things from you: what the client first asked for versus what they needed, one decision you made that you would defend, and one thing that went wrong and how you fixed it.

## First-glance and problems pass (2026-10-13)
Hero now states Shipped / Decides / Owns / Solves; "Problems from production" replaced the four-habits section (habits kept as one line under it).
- [ ] 16 KB page-size story: the repo pins NDK 28.2 and target SDK 36, but has no commit naming the 16 KB work. Page says "moved the Android build to NDK 28 and target SDK 36". Tell me what you actually did (dependency upgrades, alignment checks, a rejected upload?) and when.
- [ ] Socket-logout story is from commit 405aaf0 (June 2026). "Network drops and backgrounding" is its wording.
- [ ] Add 2 or 3 more stories in your own words (what was asked, what went wrong, what you changed). Image upload speed-up (docs/plans, June 2026) needs a measured result before it goes on the page.

## Mantiqh assets and attribution (2026-10-13)
- [ ] Owner chose to use Mantiqh thumbnails for JIFFL and My Phone Book. Mantiqh's Terms (Intellectual Property) bar copying or republishing their images and case studies without written consent, and the footer says (c) 2021-2026 Mantiqh. Email hello@mantiqh.com for written OK, or swap in your own captures.
- [ ] Every Mantiqh project on the page must say "Built at Mantiqh" plus your own part. Mantiqh's site never names you.
- [ ] My Phone Book: no store or website link found. Send the link, your exact part and any real numbers.
- [ ] Mantiqh figures that disagree with the CV (Eco Crew 150K+ vs 50,000+, KOR 500+ Q1 downloads vs 1,000+ installs, KOR 4.8 stars vs 2.75 from 8 ratings on the India App Store). Not used on the page.

## Evolve pass shipped locally (2026-10-13)
- [ ] My Phone Book card says "Helped build the local search and listings app" and "No public store listing at the moment" (your words: "we built it", "not on the store now, I think"). Confirm your exact part and whether it is really off the stores.
- [ ] Admin panel tile has no screenshot. Send one with fake data.
- [ ] Consent for Mantiqh thumbnails skipped by owner's decision (JIFFL, My Phone Book).

## Motion and 3D pass (2026-10-13)
- [ ] Hero 3D phone loads three.js (about 190 KB gzipped, self-hosted in assets/vendor/three) after first paint, desktop mouse only. Test on a real mid-range laptop and a real phone before deploying; if scroll feels heavy, delete the `<script type="module" src="/phone3d.js">` line and the CSS phones take over.

## Focused UX pass (2026-10-13)
- [ ] "More shipped work" now shows only Cone; JIFFL and QPlease live in the "Six products" cards and their case pages. The old block's "job-seeker engagement up about 30%" claim is no longer on the home page (still on the JIFFL case page; Mantiqh publishes no such figure).
- [ ] Contact "First week / First month / After that" is still an unconfirmed offer; edit to how you really start.

## Critique pass (2026-10-13)
- Home page cut from 22,400px to about 12,300px desktop. Removed from the home page: the pinned Zonesso, Keys On Rent and Eco Crew scenes with the Keys On Rent and Eco Crew story bands, and both pinned web scenes. Their copy and stats still live on the case pages (work/*). The Zonesso numbers band stays after the Teardown. The unused CSS for removed scenes is still in style.css.
- [ ] Problems table: rows 3 and 4 were expanded with plain-language lines taken from commits and the case page ("Apple's review rejected a build", "react-native-iap v13"). Confirm the wording is how you would tell it.
- [ ] Admin panel tile is now a labelled wireframe (abstract bars, no data). Replace it with a real screenshot with fake data when you have one.

## Hero wall and icon shelf (2026-10-13)
- Hero: the 3D phones and three.js (about 790 KB) are gone. The hero is now a flat wall of real app screens drifting in three columns, plus the headline, one line and two buttons. The Shipped / Decides / Owns / Solves rows were removed from the hero.
- Shipped: the six text-heavy cards became an icon shelf plus one big screen (auto-advances every 6 s until touched). Per-project Problem / What I did / Result rows are gone from the home page; the case pages and the Problems table carry them.
- [ ] JIFFL and QPlease now show their store-listing screens (jiffl-3/4, qplease-3/4) instead of Mantiqh thumbnails. Only My Phone Book still uses a Mantiqh thumbnail (no other art exists). Its shelf icon is a crop of that thumbnail.
- [ ] A short screen recording per app would let the wall and shelf play real motion instead of crossfading stills.
- Removed the tech ticker (it repeated the Teardown and ghosted through the header).

## Founder / hiring manager / engineer pass (2026-10-13)
- Hero now has an "I'm a Founder / Hiring manager / Engineer" switch. Each shows one honest line: Founder "idea to both app stores, then keep it running", Hiring manager "Senior React Native engineer, sole mobile owner at Zonesso, open to relocating", Engineer "server state apart from app state, five payment methods, releases that are one command". Edit if any line over-claims.
- Hero numbers: 7 products shipped (Zonesso, Keys On Rent, Eco Crew, QPlease, JIFFL, Cone, My Phone Book; Keys On Rent counts as one), 50,000+ downloads (Eco Crew, CV figure), 39% less code (Zonesso rebuild, repo). Mantiqh's 150K+ Eco Crew figure still not used.
- Shelf now tells Problem / Approach / Result for each of 7 products. Most lines come from the CV, repo and earlier confirmed answers; "planned one app per role" and "split the build with one other developer" for Keys On Rent, and Cone's approach line, are paraphrases of CV text: please correct anything you would not say.
- Removed the Process and Also built sections (Cone moved into the shelf); Teardown pin shortened. Home is about 8,700px desktop.

## Adaptive hero (2026-10-13)
- Hero is three scenes, one per reader (auto-cycles every 8 s until clicked; remembers the choice). Founder: "Your idea, live in both stores." (7 products, 3 apps in 3-4 months, 50,000+ downloads, store-linked app tiles, "Your app next" tile that opens an email). Hiring manager: "Senior. Owns it end to end." (2 apps solo, 1 team led, open to relocate; release checks lint, type checks, unit tests, end-to-end, store release). Engineer: "Clean state. One checkout." (39% less code, 57 dependencies removed, 5 payment rails; the real Zonesso layers).
- [ ] Check every line is how you would say it, especially "Senior. Owns it end to end." and the founder line "Alone or in a small team".
- [ ] "Start a project" opens an email with the subject "New project". If you want a booking link or a scoping call, tell me where it should go.
- [ ] There is no CV download on the hiring scene because no public resume PDF exists yet. Add one without your phone number and I will add a "Download CV" button.
- Colour: buttons and nav stay vermilion (research found no evidence that a different brand colour per audience helps and it hurts recognition). Only the hero glow, scene details and dot grid shift tone: gold, vermilion, blue.

## Hero v4: one flat phone (2026-10-13)
- The hero is now one flat, straight-on phone with six real Zonesso screens scrolling inside (20 s loop) and four proof callouts that change per reader. The three card scenes and the numbers row are gone.
- Callouts (all from CV, repo or your confirmed answers): hiring "Sole mobile engineer at Zonesso / Led a team of two on JIFFL / Open to relocating anywhere / 7 products shipped"; founder "Live on both stores / 50,000+ downloads on one app / 3 apps in 3-4 months / Alone or in a small team"; engineer "Server state kept apart / 5 payment methods, 1 checkout / 39% less code after a rebuild / Releases are one command". Edit any that does not sound like you.
- [ ] A short screen recording of a Zonesso flow (browse, filter, post an ad) would replace the still-screenshot reel with real motion.
