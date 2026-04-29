# SQA Builders Sdn Bhd — Sitemap

```
Home (index.html)                              ← Video hero, intro, stats, Work With Us, Track Records, CTAs
│
├── About Us
│   ├── Overview (about.html)                  ← Japanese-Malaysian D&B + Approach + Strengths
│   ├── Corporate Milestones (milestones.html)
│   ├── Our Leadership (leadership.html)
│   │     └─ Board of Directors
│   │     └─ Senior Management & Department Heads (optional)
│   ├── Vision & Mission (vision-mission.html)
│   ├── Our People (people.html)               ← Life at SQA, culture, talent development
│   └── Safety (safety.html)                   ← Everyone Safe, Every Day + 11 Basic Safety Actions
│
├── Capabilities (capabilities.html)
│     ↳ Sector capabilities (Industrial, Warehouse/Logistics, Production Plants,
│       Commercial, Institutional, Residential)
│     ↳ Delivery capabilities (Design & Build, Turnkey, MEP, Value Engineering, PM, Renovation)
│     ↳ Trusted By section (10 client placeholder cards)
│
├── Projects (main nav)
│   ├── On-Going Projects (current-projects.html)
│   └── Completed Projects (completed-projects.html)
│         ↳ Optional "Design & Build" badge on project cards (toggle via data/projects.json)
│
├── Property Development (property-development.html)
│     ↳ Industrial Development, Build-to-Suit, Landowner Collaboration, JV,
│       Forward Funding, Turnkey Development Support, Feasibility & VE,
│       Design Coordination, Project Delivery
│     ↳ Joint Venture model (WhatsApp + email CTAs)
│     ↳ Land Proposal model + form (Name, Company, Phone, Email, Land Location,
│       Land Size, Proposal Type, Message)
│
├── Certifications & Recognitions (certifications.html)  ← Tabbed: ISO / QLASSIC / SHASSIC / Commendations
│
├── Careers (careers.html)
│     ↳ Job Opportunities first (flip-card listings from data/jobs.json)
│     ↳ Why Join Us (5-bullet checklist)
│     ↳ "See Our People →" link
│     ↳ Side CTA "View Job Openings" + WhatsApp HR
│
└── Contact Us (contact.html)
      ↳ 4 Quick-Contact Cards: Project / Property Development / Careers / General
      ↳ Each card: WhatsApp + Email actions
      ↳ Enquiry form (Name, Company, Email, Phone, Enquiry Type, Message)
      ↳ Map placeholder
      ↳ Final general-enquiry CTA band

Floating WhatsApp button — visible on every page (bottom right)
```

## Editable data files
| File | Drives |
|---|---|
| `data/projects.json` | On-Going & Completed Projects (with `designBuild` toggle for D&B badge) |
| `data/leadership.json` | Board of Directors + optional Senior Management |
| `data/milestones.json` | Corporate Milestones timeline |
| `data/jobs.json` | Careers flip-card job listings |
| `data/awards.json` | Certifications & Recognitions tabs |

## Optional / future-ready modules
- **News / Media**
- **Governance / Policies**
- **Sustainability / ESG**
- **Senior Management section** — already scaffolded; set `showKeyManagement: true` in `data/leadership.json` to reveal
