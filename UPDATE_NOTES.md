# How to Update the SQA Builders Website

The site is built with plain HTML/CSS/JavaScript. No build tools, no framework — edit files directly and refresh the browser.

---

## Quick reference: Where to change what

| What you want to change | File to edit |
| --- | --- |
| Company name, tagline, intro text, hero headline | `index.html` |
| Address, phone, fax, email (in every page's footer) | Footer block in **each** HTML page |
| Nav links / menu structure | Nav block in **each** HTML page |
| **Current Projects** (ongoing construction) | `data/projects.json` → `current` array |
| **Completed Projects** archive | `data/projects.json` → `completed` array |
| **Board of Directors** names, roles, bios | `data/leadership.json` → `board` array |
| **Key Management** (hidden by default) | `data/leadership.json` → `keyManagement` + set `showKeyManagement: true` |
| **Corporate Milestones** timeline | `data/milestones.json` |
| **Awards & Accolades** (tabs + items) | `data/awards.json` |
| **Open positions** (flip cards) | `data/jobs.json` |
| Culture / events gallery imagery | `careers.html` → `.culture-tile` blocks |
| Case studies on Specialty page | `specialty.html` |
| Colour palette / fonts | `style.css` (top of file — `:root` variables) |

---

## 1. Updating Board of Directors & Key Management

Open `data/leadership.json`:

```json
{
  "showKeyManagement": false,              ← set to true to reveal Key Management section
  "board": [
    { "name": "Name", "role": "Title", "bio": "Long bio..." }
  ],
  "keyManagement": [
    { "name": "Name", "role": "Title", "bio": "Long bio..." }
  ]
}
```

The **Board of Directors** section is always visible. The **Key Management** section stays hidden until both:
1. `showKeyManagement` is set to `true`, AND
2. `keyManagement` contains at least one entry.

Each entry renders as an expandable card ("Read More" reveals the full bio).

---

## 2. Updating Corporate Milestones

Open `data/milestones.json`. Each entry renders as a point on the vertical timeline:

```json
{
  "milestones": [
    {
      "year": "2024",
      "title": "Short headline",
      "body": "Longer description of what happened this year."
    }
  ]
}
```

Entries are displayed top-to-bottom in the order listed — newest first reads best.

---

## 3. Updating Awards & Accolades

Open `data/awards.json`. Awards are grouped into **tabs** by awarding body:

```json
{
  "tabs": [
    {
      "id": "iso",                         ← short id used internally
      "label": "ISO Certifications",       ← shown on the tab button
      "intro": "Optional paragraph at top of this tab.",
      "items": [
        {
          "year": "Active",
          "title": "ISO 9001 — Quality Management System",
          "description": "...",
          "score": "85%"                    ← optional, renders as a highlighted chip
        }
      ]
    }
  ]
}
```

Add new tabs by adding another object to the `tabs` array. The page auto-generates the tab buttons and panels.

---

## 4. Adding / removing job openings (flip cards)

Open `data/jobs.json`. Each job becomes a flip card on the Careers page:

```json
{
  "jobs": [
    {
      "title": "Project Manager",
      "department": "Construction",
      "location": "Shah Alam, Selangor",
      "summary": "One-line role summary.",
      "responsibilities": [ "Bullet 1", "Bullet 2" ],
      "requirements": [ "Bullet 1", "Bullet 2" ]
    }
  ]
}
```

**How the card behaves:**
- Front face shows the title, department, and location.
- Click the card → it flips to reveal the full JD.
- The Apply button opens a pre-filled email to `careers@sqabuilders.com`.

**To show "No open positions at the moment":** set `"jobs": []`.

---

## 5. Adding real culture / events photography

The Careers page has a 5-tile "Life at SQA" gallery. Each tile currently uses a coloured gradient as a placeholder.

In `careers.html`, locate the `.culture-tile` blocks. To add a real image to a tile:

```html
<div class="culture-tile" style="background-image: url('img/events/gathering.jpg'); background-size: cover; background-position: center;">
  <div class="culture-tile-inner">
    <strong>Annual Company Gathering</strong>
    <span>Short description.</span>
  </div>
</div>
```

Drop image files into an `img/` folder first, then reference them with the `url()` syntax above. The dark overlay is handled automatically by the existing CSS for text readability.

---

## 6. Updating Current / Completed Projects

Edit `data/projects.json`:

```json
{
  "current": [
    { "title": "...", "client": "...", "location": "...", "period": "...", "value": "...", "category": "Industrial" }
  ],
  "completed": [ /* same structure */ ]
}
```

`category` must be one of: `Industrial`, `Commercial`, `Residential`, `Institutional`. The filter chips on the page automatically use this to filter cards.

---

## 7. Updating head-office details

Address, phone, fax, and email appear in the footer of **every** page, and on the Contact page. To change them:

1. Find-and-replace across `.html` files for each detail, or
2. Open each page and update the footer block directly.

Placeholders currently in use:
- Address: `[Address line 1]` / `[Address line 2]`
- Phone: `+60 3 0000 0000`
- Email: `enquiry@sqabuilders.com`

---

## 8. Brand palette

`style.css` top of file:

```css
:root {
  --ink:   #1a2b3c;    /* deep navy headings */
  --navy:  #2e6da4;    /* brand navy-blue */
  --blue:  #337ab7;    /* SQA primary blue */
  --gold:  #b78e3f;    /* gold accent */
  --bg-light: #f3f4f8; /* page background */
  ...
}
```

Change these values and every page updates.

---

## 9. Contact page — Google Map

Replace the `.map-block` placeholder in `contact.html` with the `<iframe>` snippet from Google Maps → Share → Embed.

---

## 10. Previewing locally

```bash
cd ~/Desktop/my-website
python3 -m http.server 8080
```

Then open http://localhost:8080. A local server is required because pages load `data/*.json` via `fetch()` — this doesn't work when opening HTML from the filesystem directly.

---

## 11. Publishing changes

Live site: **https://ck3-maker.github.io/my-website/**

Every push to `main` triggers an automatic GitHub Pages redeploy (30–90s):

```bash
git add .
git commit -m "Update Current Projects for Q2 2026"
git push
```

---

## 12. Future modules (optional)

- **News / Media**
- **Governance / Policies**
- **Sustainability / ESG**

When you're ready to add any of these, we'll scaffold them using the same design system.
