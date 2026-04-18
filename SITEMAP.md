# SQA Builders Sdn Bhd — Sitemap

```
Home (index.html)
│
├── About Us
│   ├── Overview (about.html)
│   ├── Corporate Milestones (milestones.html)
│   ├── Our Leadership (leadership.html)
│   │     └─ Board of Directors (shown)
│   │     └─ Key Management (optional — hidden by default; toggle via data/leadership.json)
│   └── Vision & Mission (vision-mission.html)
│
├── Capabilities (capabilities.html)
│
├── Projects
│   ├── Our Projects (projects.html)              ← Sector tiles
│   ├── Our Specialty (specialty.html)            ← IBS + case studies
│   ├── Current Projects (current-projects.html)  ← Data-driven
│   └── Completed Projects (completed-projects.html) ← Data-driven
│
├── Property Development (property-development.html)
│     ↳ Shop-office, Industrial Developments, Residential
│     ↳ Design & Build capability for landowners / JV partners
│
├── Awards & Accolades (awards.html)              ← Tabbed: ISO / QLASSIC / SHASSIC / Commendations
│
├── Careers (careers.html)                         ← Culture gallery + flip-card job listings
│
└── Contact (contact.html)
```

## Optional / future-ready modules
These sections were intentionally kept out of the main navigation. Each can be added later when real content is available:

- **News / Media** — company announcements, press mentions
- **Governance / Policies** — code of conduct, whistleblower policy, procurement policy
- **Sustainability** — ESG reporting, green building commitment
- **Key Management** — already scaffolded inside the Leadership page; set `showKeyManagement: true` in `data/leadership.json` to reveal it.
