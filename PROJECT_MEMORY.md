# SQA Builders — Project Memory

This document captures all the context, decisions, and content developed during the build of the SQA Builders Sdn Bhd website. Use it to brief any future Claude session, onboard a teammate, or draw from it for related outputs (LinkedIn profile, company deck, investor memo, tender intro, etc.).

---

## 1. Company identity

| Field | Value |
|---|---|
| Full name | **SQA Builders Sdn Bhd** |
| Meaning of "SQA" | **Speed, Quality & Assurance** |
| Parent group | **SQA Group** (established 1997) |
| Positioning | **Progressive Malaysian-Japanese contractor** |
| CIDB grade | **Grade G7** (highest — qualifies for construction works of unlimited value) |
| Primary brand tagline | "Built with speed. Delivered with quality. Assured by safety." |
| Brand palette | Primary blue `#337AB7`, accent navy `#2E6DA4`, deep blue `#1E4D8C`, gold accent `#B78E3F`, page background `#F3F4F8` |
| Logo character | Blue monogram / circular mark with "SQA" (actual company asset — see `logo.svg` placeholder in project) |
| Reference sites used | `sqa.com.my` (brand + palette reference), `tcsgroup.com.my/Awards.html` (awards page structure reference) |

---

## 2. Core positioning & brand story

- SQA Builders is a **turnkey Design & Build contractor** — Design & Build is the **core capability** and primary positioning.
- The firm is a **Malaysian-Japanese contractor**: Malaysian construction experience combined with Japanese project management discipline.
- Built reputation on:
  - **Speed** in execution
  - **Quality** workmanship
  - **Assurance** through systems, experience, and safety culture
  - **Turnkey / Design & Build** delivery
  - **Project and design management**
  - **Major renovation and extension works**
  - **Property &amp; industrial development readiness** (build-to-suit, JV, forward funding)
- Over 25 years of continuous operation (since 1997).

### Internal methodology
- **Japanese Project Management Methodology (PMM)** — monitor, align, resolve, report.
- **Weekly safety appraisal boards**, **daily morning exercise**, **daily toolbox meetings**.
- Core safety message: *"Everyone safe, every day. Safe projects are successful projects. All injuries are preventable."*

### Mission (as authored)
> We are committed to constantly improving our project delivery and operational efficiency, so that our clients can meet their commercial goals with confidence — and so that our people are equipped, empowered, and proud of the work we produce together.

### Vision (as authored)
> To be the contractor of choice for clients who value Speed, Quality, and Assurance.

### Five values
Fairness · Passion · Experience · Innovation · Relationships

---

## 3. Sectors & project types

| Sector | Project examples SQA is known for |
|---|---|
| **Industrial** | Factories, warehouses, logistics hubs, cold-storage / frozen food processing, manufacturing plants |
| **Commercial** | Corporate offices, showrooms, shop-offices, flagship automotive retail (principal-aligned fit-out) |
| **Residential** | Luxury bungalows, condominiums, staged residential developments |
| **Institutional** | Schools, academies, campus extensions, embassy / diplomatic chancery buildings |

### Current & completed projects (representative — kept in `data/projects.json`)
- Regional Distribution Warehouse & Ancillary Office (Shah Alam)
- Cold Storage & Frozen Food Processing Facility
- Flagship Automotive Showroom & Service Centre
- Embassy Chancery Building
- School Block Expansion
- Twin-tower residential (Skyline Apartments)
- Industrial Logistics Hub
- Manufacturing plant extensions

---

## 4. Property Development activities

- SQA is **selectively expanding into property development** through **co-development and joint-venture arrangements with landowners**.
- Target development types:
  1. **Shop-office** developments
  2. **Industrial Developments** (purpose-built warehouses, logistics hubs, factories)
  3. **Residential** projects
- JV / landowner enquiries channel: `development@sqabuilders.com`

### Design & Build for landowners
A key differentiator: SQA brings an **in-house Design & Build capability** to JV partnerships — removing the need for landowners to separately appoint architects, engineers, QS firms, and contractors.

Design & Build scope includes:
1. Concept & Feasibility (yield studies, cost plans)
2. Architectural Design
3. Engineering Coordination
4. Cost Planning & Control
5. Buildability &amp; Construction Methods
6. Construction & Handover

---

## 5. Website architecture (final state)

```
Home (index.html)
│
├── About Us (dropdown)
│   ├── Overview (about.html)
│   ├── Corporate Milestones (milestones.html)
│   ├── Our Leadership (leadership.html) — Board of Directors (Key Mgmt optional / hidden)
│   └── Vision & Mission (vision-mission.html)
│
├── Capabilities (capabilities.html) — leads with Design & Build
│     ↳ D&B services, sector capabilities, delivery models, PMM
│
├── Projects (dropdown)
│   ├── On-Going Projects (current-projects.html)
│   └── Completed Projects (completed-projects.html)
│
├── Property Development (property-development.html)
│     ↳ Shop-office, Industrial Developments, Residential + D&B scope
│
├── Awards & Accolades (awards.html) — tabs: ISO / QLASSIC / SHASSIC / Commendations
│
├── Careers (careers.html) — culture gallery + flip-card jobs + side CTA "View Job Openings"
│
└── Contact (contact.html) — form, address, phone, email, map, general-enquiry CTA
```

### Live hosting
- GitHub repo: `CK3-Maker/my-website`
- Live URL: `https://ck3-maker.github.io/my-website/`
- Deploys automatically on every `git push` to `main`

### Structured content (CMS-lite, all in `/data`)
| File | Purpose |
|---|---|
| `data/projects.json` | On-Going & Completed Projects (filterable by sector) |
| `data/leadership.json` | Board of Directors + optional Key Management (`showKeyManagement` toggle) |
| `data/milestones.json` | Corporate Milestones timeline |
| `data/jobs.json` | Careers flip-card data (title, dept, location, summary, responsibilities, requirements) |
| `data/awards.json` | Awards & Accolades tabs + items |

---

## 6. Contact channels (documented)

| Channel | Email |
|---|---|
| General enquiries | enquiry@sqabuilders.com |
| Tender / project opportunities | tender@sqabuilders.com |
| Careers / speculative applications | careers@sqabuilders.com |
| JV / landowner / property development | development@sqabuilders.com |

Placeholders still needing real data: head-office address (`[Address line 1]` / `[Address line 2]`), phone `+60 3 0000 0000`, fax, and director/management names (currently `[Executive Chairman Name]`, etc., in `data/leadership.json`).

---

## 7. Design system reference

- Typography: Inter (400–800 weights). Display headings use the same family with tighter letter-spacing.
- Key tokens (in `style.css` `:root`):
  - `--ink: #1f2d3d` (body headings)
  - `--navy: #2e6da4`, `--navy-dark: #1e4d7b`
  - `--blue: #337ab7`, `--blue-accent: #2e6da4`, `--blue-deep: #1e4d8c`, `--blue-bright: #4a8ac7`
  - `--gold: #b78e3f` (accent only — hero eyebrows, pillar numbers, side CTA)
  - `--bg-light: #f3f4f8` (SQA page background)
- Reusable components in the CSS: flip cards, leader cards, project cards, case studies, timeline, awards tabs, culture gallery, CTA band, pillars band, sector tiles, why cards.
- Side CTA on Careers page uses the `.side-cta` class (gold, fixed right, jumps to `#openings`).

---

## 8. Content voice

- Professional, grounded, confident, technically credible, client-facing.
- No startup slang, no "we're passionate about x", no emoji, no exclamation marks in body copy.
- Preserves Malaysian-Japanese operational tone.
- Claims are grounded in specific, verifiable capabilities (CIDB G7, Design &amp; Build, PMM) rather than vague superlatives.

---

## 9. For LinkedIn profile drafting (brief)

When building company + personal LinkedIn profiles drawing from this memory, key talking points:

**Company tagline (LinkedIn "About"):**
> SQA Builders Sdn Bhd — a progressive Malaysian-Japanese contractor and part of the SQA Group, established in 1997. CIDB Grade G7. Turnkey Design & Build for industrial, commercial, residential, and institutional clients.

**Short positioning sentence:**
> Built with speed. Delivered with quality. Assured by safety.

**Industries (LinkedIn field):** Construction
**Company size field:** (private — update based on actual headcount)
**Headquarters:** Selangor, Malaysia
**Founded:** 1997

**Three things to lead with in posts / about section:**
1. Design & Build under a single contract — fewer interfaces, shorter programme, accountable delivery.
2. Japanese project management discipline applied to Malaysian projects — structured reporting, safety culture, on-time completion.
3. 25+ years of turnkey delivery across industrial, commercial, residential, and institutional sectors.

**For JV / landowner-facing posts:**
- Lead with Design &amp; Build under G7 licence, in-house architectural and engineering coordination, and development-ready capability for build-to-suit and JV partners.
- Target development types: shop-office, industrial developments, residential.

**For recruitment posts:**
- Dynamic, growing contractor.
- Hiring across construction, design, engineering, M&E, QS, safety, business development, and corporate functions.
- Culture: teamwork, competence, character, upward energy, diversity, talent development.

---

## 10. Outstanding items / owner TODO

- Replace `logo.svg` placeholder with the real SQA logo file.
- Fill in head-office address, phone, and fax across footer + contact page.
- Replace `[Name]` placeholders in `data/leadership.json` with real director names and biographies.
- Add real project photography (swap `.feature-img`, `.project-img`, `.culture-tile` gradient placeholders for real JPGs — see `UPDATE_NOTES.md` for how).
- Embed Google Map iframe on `contact.html` (replace the `.map-block` placeholder).
- Update `data/jobs.json` with live openings as they come.
- Update `data/awards.json` with real ISO / QLASSIC / SHASSIC certificates and scores.

---

## 11. Reference docs in this repo

- `SITEMAP.md` — full site structure
- `UPDATE_NOTES.md` — step-by-step guide for every content update (projects, leaders, jobs, awards, logo, map, palette)
- `PROJECT_MEMORY.md` — this file

---

*Last updated: April 2026. Keep this file up-to-date whenever the brand positioning, information architecture, or key facts change — it's the single source of truth for the SQA Builders website project.*
