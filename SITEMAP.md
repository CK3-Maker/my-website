# SQA Builders Sdn Bhd — Sitemap

```
Home (index.html)                              ← Video hero, stats band, Work With Us cards
│
├── About Us
│   ├── Overview (about.html)
│   ├── Corporate Milestones (milestones.html)
│   ├── Our Leadership (leadership.html)
│   │     └─ Board of Directors (shown)
│   │     └─ Senior Management & Department Heads (optional — toggle via data/leadership.json)
│   ├── Vision & Mission (vision-mission.html)
│   ├── Our People (people.html)               ← Life at SQA, culture, talent development
│   └── Safety (safety.html)
│
├── Capabilities (capabilities.html)
│     ↳ Sector capabilities + Delivery capabilities (Design & Build, Turnkey, MEP, VE, PM, Renovation) + PMM
│
├── Property Development (property-development.html)
│     ↳ Industrial Developments, Build-to-Suit, Landowner Collaboration, JV, Forward Funding,
│       Turnkey Development Support, Feasibility & Value Engineering, Design Coordination,
│       Project Delivery
│
├── Awards & Accolades (awards.html)            ← Tabbed: ISO / QLASSIC / SHASSIC / Commendations
│
├── Careers (careers.html)                      ← Why Join Us + flip-card job listings
│     ↳ Floating "View Job Openings" side CTA scrolls to #openings
│
└── Contact (contact.html)                      ← Form, details, map, direct inboxes, general-enquiry CTA
```

### Off-nav pages (linked from CTAs and footer only)
- **On-Going Projects** (`current-projects.html`)
- **Completed Projects** (`completed-projects.html`)

These are still live and linked from the home-page CTA row, capabilities CTA, and footer "Business" column — but no longer in the main nav.

## Optional / future-ready modules
- **News / Media**
- **Governance / Policies**
- **Sustainability / ESG**
- **Senior Management section** — already scaffolded inside Leadership; set `showKeyManagement: true` in `data/leadership.json` to reveal
