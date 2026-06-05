# 💌 Happy 3rd Monthsary — Romantic Website

A cute, soft-aesthetic romantic website to celebrate a 3rd monthsary. Built with pure HTML, CSS, and JavaScript — no frameworks needed.

---

## ✨ Features

- 🌸 **Soft pink & rose aesthetic** — pastel gradients, elegant typography
- 💗 **Floating hearts** — canvas-drawn hearts drift up continuously
- 💌 **Animated love letter** — opens with an envelope reveal + typing effect
- 🎵 **Background music toggle** — soft romantic background track
- 💥 **Click sparkles** — clicking anywhere spawns mini heart bursts
- 📱 **Fully responsive** — works on mobile and desktop

---

## 🚀 How to Use

### Option 1 — Open Locally
1. Download or clone this repository
2. Open `index.html` in any modern browser
3. That's it — no build step, no server needed ✅

### Option 2 — Host on GitHub Pages
1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)`
4. Your site will be live at `https://yourusername.github.io/repo-name`

---

## 🎨 Personalization

### Change the letter content
Open `script.js` and edit the `letterParagraphs` array near the top:

```js
const letterParagraphs = [
  "Your first paragraph here...",
  "Your second paragraph here...",
  // ...
];
```

### Change the names / title
Open `index.html` and edit:
- The `<title>` tag
- The `.main-title` text
- The `.sign-name` span at the bottom of the letter

### Change the music
Replace the `<source src="...">` URL in `index.html` with any `.mp3` link you have, or drop an audio file in the `/assets` folder and reference it locally:

```html
<source src="assets/music.mp3" type="audio/mpeg" />
```

### Change colors
All colors are CSS variables at the top of `style.css`:

```css
:root {
  --pink-light: #ffe4ec;
  --rose:       #c0395f;
  /* etc. */
}
```

---

## 📁 File Structure

```
monthsary/
├── index.html      ← Main page structure
├── style.css       ← All styles & animations
├── script.js       ← Hearts canvas, typing, music, interactions
├── README.md       ← This file
└── assets/         ← (Optional) Put local music/images here
```

---

## 💡 Notes

- The background music streams from an external URL by default. For offline use, download a `.mp3` and place it in `/assets`.
- The typing effect replays every time the letter is opened and closed.
- Tested on Chrome, Firefox, Safari, and mobile browsers.

---

*Made with ❤️ — because she deserves something special.*
