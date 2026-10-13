# Graph Report - .  (2026-10-13)

## Corpus Check
- 73 files · ~163,011 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 62 nodes · 78 edges · 11 communities (7 shown, 4 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.87)
- Token cost: 1,420 input · 850 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Lenis Smooth Scroll Engine|Lenis Smooth Scroll Engine]]
- [[_COMMUNITY_Scroll Interpolation & Lifecycle|Scroll Interpolation & Lifecycle]]
- [[_COMMUNITY_Shipped Mobile Case Studies|Shipped Mobile Case Studies]]
- [[_COMMUNITY_Methodology & Project Leadership|Methodology & Project Leadership]]
- [[_COMMUNITY_Engineer Positioning & Strategy|Engineer Positioning & Strategy]]
- [[_COMMUNITY_Scroll State & Lock Control|Scroll State & Lock Control]]
- [[_COMMUNITY_Event Bus & Viewport Tracking|Event Bus & Viewport Tracking]]
- [[_COMMUNITY_Vercel Deployment & Edge Headers|Vercel Deployment & Edge Headers]]
- [[_COMMUNITY_Static Architecture & Scroll Effects|Static Architecture & Scroll Effects]]
- [[_COMMUNITY_DOM Lifecycle & Cleanup|DOM Lifecycle & Cleanup]]
- [[_COMMUNITY_Web E-commerce Experience|Web E-commerce Experience]]

## God Nodes (most connected - your core abstractions)
1. `scrollTo()` - 8 edges
2. `Zonesso Automotive Marketplace` - 7 edges
3. `updateClassName()` - 6 edges
4. `constructor()` - 4 edges
5. `reset()` - 4 edges
6. `t()` - 3 edges
7. `advance()` - 3 edges
8. `stop()` - 3 edges
9. `fromTo()` - 3 edges
10. `emit()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Motors Zonesso Next.js Web Experience` --shares_data_with--> `Zonesso Automotive Marketplace`  [INFERRED]
  index.html → work/zonesso/index.html
- `Arfat Rozewale` --implements--> `Zonesso Automotive Marketplace`  [EXTRACTED]
  PRODUCT.md → work/zonesso/index.html
- `Senior Mobile Engineer Positioning` --references--> `Cone Billing & Invoicing Platform`  [INFERRED]
  PRODUCT.md → work/cone/index.html
- `Senior Mobile Engineer Positioning` --references--> `QPlease Queue Management App`  [INFERRED]
  PRODUCT.md → work/qplease/index.html
- `4-Stage Engineering Method (Scope, Decide, Ship, Lead)` --references--> `Zonesso Automotive Marketplace`  [EXTRACTED]
  index.html → work/zonesso/index.html

## Hyperedges (group relationships)
- **Flagship Production Mobile Applications** — zonesso_zonesso_app, keys_on_rent_kor_platform, eco_crew_eco_crew_app, jiffl_jiffl_app, qplease_qplease_app [EXTRACTED 1.00]
- **Senior Mobile Engineering Core Disciplines** — zonesso_mobile_architecture, zonesso_payment_boundary, zonesso_release_pipeline, zonesso_codebase_reduction [EXTRACTED 1.00]

## Communities (11 total, 4 thin omitted)

### Community 1 - "Scroll Interpolation & Lifecycle"
Cohesion: 0.20
Nodes (11): advance(), fromTo(), h, n, preventNextNativeScrollEvent(), reset(), scrollTo(), setScroll() (+3 more)

### Community 2 - "Shipped Mobile Case Studies"
Cohesion: 0.18
Nodes (11): Eco Crew Recycling Pickup App, Eco Crew Geolocation Pickup Dispatch, Eco Crew 30% App Size Reduction, Keys On Rent Rental Platform, Keys On Rent Multi-App Domain Architecture, Motors Zonesso Next.js Web Experience, Zonesso 39% Codebase Reduction, Zonesso Clean Architecture & State Split (+3 more)

### Community 3 - "Methodology & Project Leadership"
Cohesion: 0.40
Nodes (5): 4-Stage Engineering Method (Scope, Decide, Ship, Lead), Portfolio Hero Scan Layer, JIFFL Flexible Staffing Platform, JIFFL Technical Leadership & Mentorship, The Teardown Direction

### Community 4 - "Engineer Positioning & Strategy"
Cohesion: 0.40
Nodes (5): Cone Billing & Invoicing Platform, Arfat Rozewale, Senior Mobile Engineer Positioning, Proof Before Claims Principle, QPlease Queue Management App

### Community 5 - "Scroll State & Lock Control"
Cohesion: 0.50
Nodes (4): isLocked(), isScrolling(), isStopped(), updateClassName()

### Community 6 - "Event Bus & Viewport Tracking"
Cohesion: 0.50
Nodes (4): constructor(), emit(), on(), resize()

### Community 7 - "Vercel Deployment & Edge Headers"
Cohesion: 0.50
Nodes (3): cleanUrls, headers, trailingSlash

## Knowledge Gaps
- **16 isolated node(s):** `cleanUrls`, `trailingSlash`, `headers`, `i`, `o` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Zonesso Automotive Marketplace` connect `Shipped Mobile Case Studies` to `Methodology & Project Leadership`, `Engineer Positioning & Strategy`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `4-Stage Engineering Method (Scope, Decide, Ship, Lead)` connect `Methodology & Project Leadership` to `Shipped Mobile Case Studies`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `Arfat Rozewale` connect `Engineer Positioning & Strategy` to `Shipped Mobile Case Studies`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **What connects `cleanUrls`, `trailingSlash`, `headers` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._