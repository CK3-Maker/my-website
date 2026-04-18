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
| **Management team** names, roles, biographies | `data/management.json` |
| **Careers** / open positions | `data/jobs.json` |
| Case studies on the Specialty page | `specialty.html` |
| Safety principles & content | `safety.html` |
| Colour palette / fonts / spacing | `style.css` (top of file — `:root` variables) |

---

## 1. Updating project data

The Current Projects and Completed Projects pages load from `data/projects.json`. Open that file and edit the two arrays:

```json
{
  "current": [
    {
      "title": "Project name",
      "client": "Client name (or 'Confidential')",
      "location": "City, State",
      "period": "Target completion QX 20XX",
      "value": "Undisclosed",
      "category": "Industrial"   // Must be one of: Industrial | Commercial | Residential | Institutional
    }
  ],
  "completed": [ /* same structure */ ]
}
```

After editing, save the file. The page filter (Industrial / Commercial / Residential / Institutional) works automatically based on the `category` value.

---

## 2. Updating management profiles

Edit `data/management.json`:

```json
{
  "leaders": [
    {
      "name": "Full Name",
      "role": "Title",
      "bio": "Long biography paragraph. Shown when the user clicks 'Read More'."
    }
  ]
}
```

Add as many leaders as needed. Each one renders as a card on the Management page with an expandable bio.

---

## 3. Updating open positions

Edit `data/jobs.json`:

```json
{
  "jobs": [
    { "title": "Position Title", "department": "Department", "location": "Office / Site" }
  ]
}
```

To show "No open positions at the moment," leave the array empty: `"jobs": []`.

Every "Apply" link emails `careers@sqabuilders.com` by default. To change this, edit the `mailto:` address in `main.js` (search for `mailto:careers@sqabuilders.com`).

---

## 4. Updating head-office details

Address, phone, fax, and email appear in the footer of **every** page, and on the Contact page. To change them:

1. Find-and-replace across `.html` files for each detail, or
2. Open each page and update the footer block directly (it's identical in every file).

The placeholder values are:
- Address lines: `[Address line 1]` / `[Address line 2]`
- Phone: `+60 3 0000 0000`
- Email: `enquiry@sqabuilders.com`

---

## 5. Changing the brand colour

Open `style.css` and look at the top — the `:root` block:

```css
:root {
  --ink:   #0a1628;   /* main dark */
  --navy:  #112a44;
  --blue:  #1e4d8c;   /* accent blue */
  --gold:  #b78e3f;   /* accent gold */
  ...
}
```

Change those hex values and every page updates automatically.

---

## 6. Replacing the placeholder imagery

Every page currently uses coloured gradients and inline SVG icons as placeholders for construction photography. When real photos become available:

1. Drop JPG files into an `img/` folder.
2. In each HTML page, replace the `<div class="feature-img">`, `<div class="project-img">`, `<div class="case-img">`, or `<div class="sector-card">` blocks with `<img src="img/filename.jpg" alt="...">` — or add the image as a CSS background on the existing container.

---

## 7. Embedding the Google Map

The Contact page has a placeholder block:

```html
<div class="map-block">Map — embed your Google Map iframe here...</div>
```

Replace its contents with the `<iframe>` snippet copied from Google Maps → Share → Embed a map.

---

## 8. Previewing locally

From Terminal:

```bash
cd ~/Desktop/my-website
python3 -m http.server 8080
```

Then open http://localhost:8080 in your browser. A local server is required because the pages load `data/*.json` using `fetch()`, which does not work when opening HTML files directly from the filesystem.

---

## 9. Publishing changes

The live site is hosted on GitHub Pages at **https://ck3-maker.github.io/my-website/**.

Every time you push to the `main` branch, GitHub Pages redeploys automatically (takes 30–90 seconds). Typical workflow:

```bash
git add .
git commit -m "Update current projects"
git push
```

---

## 10. Future modules (optional)

The sitemap notes four optional sections that were left out:
- News / Media
- Awards / Certifications
- Governance / Policies
- Sustainability

When you're ready to add any of these, let me know and I'll scaffold the page using the same design system — nothing new to learn.
