# My Store

A simple, clean personal sales website. No database, no backend — just HTML, CSS, and JavaScript.

---

## How to manage your store

### Add / edit / remove products
Open **`js/products.js`** — it's the only file you need to touch for day-to-day maintenance.

```js
{
  id: 7,                        // Unique number — never repeat
  name: "My Item",
  category: "Electronics",     // Used for filter tabs — keep consistent
  price: 50,
  image: "images/myitem.jpg",  // Put photos in the /images/ folder
  description: "Short description of the item.",
  condition: "Good",            // New | Like New | Good | Fair
  sold: false,                  // Change to true when sold
}
```

### Update your contact info
Also in **`js/products.js`**, at the bottom — update `STORE` with your name, email, phone, location, and accepted payment methods.

### Add product photos
Drop image files into the **`/images/`** folder, then set the `image` field to `"images/yourfile.jpg"`.

---

## Hosting options (all low-cost or free)

### Option 1 — Netlify Drop (Easiest, Free)
1. Go to **https://app.netlify.com/drop**
2. Drag your entire `my-store` folder onto the page
3. Done — you get a live URL instantly
4. To update: drag the folder again (or connect to GitHub for auto-deploy)

### Option 2 — GitHub Pages (Free, great for updates)
1. Create a free GitHub account at github.com
2. Create a new repository named `my-store`
3. Upload all files (or use GitHub Desktop)
4. Go to Settings → Pages → Source: `main` branch → `/root`
5. Your site is live at `https://yourusername.github.io/my-store`

### Option 3 — Vercel (Free, fastest global CDN)
1. Push your files to a GitHub repo (see above)
2. Go to **https://vercel.com** → Import your repo
3. Click Deploy — done. Auto-deploys on every push.

### Option 4 — Cloudflare Pages (Free, very fast)
1. Push to GitHub
2. Go to **https://pages.cloudflare.com** → Connect repo
3. Build command: leave blank. Output: leave blank.
4. Deploy.

### Option 5 — Custom domain (~$10–15/year)
Buy a domain from Namecheap or Cloudflare Registrar, then point it to whichever host above you chose.
All of them support custom domains for free.

---

## File structure

```
my-store/
├── index.html        ← Main shop page
├── cart.html         ← Cart / checkout page
├── css/
│   └── style.css     ← All styles (edit to change colors/fonts)
├── js/
│   ├── products.js   ← YOUR DATA — edit this to manage products
│   └── app.js        ← Store logic (no need to edit)
├── images/           ← Drop product photos here
└── README.md         ← This file
```

---

## Customizing the look

To change the brand color, open `css/style.css` and update the `--brand` variable at the top:

```css
:root {
  --brand: #2563eb;   /* ← change this hex color */
}
```
