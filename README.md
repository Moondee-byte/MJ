# Happy 4th Monthsary 💌

A little interactive website made as a monthsary gift. No frameworks, no build tools — just HTML, CSS, and JavaScript, ready to open or publish immediately.

## What's inside

```
index.html    → the whole site (all sections live here as panels)
style.css     → all styling, colors, fonts, animations
script.js     → all interactivity (menu, letter, game, notes, etc.)
README.md     → this file
hero.jpg      → placeholder cover image
photo1.jpg … photo6.jpg → placeholder gallery photos
music.mp3     → placeholder background song
```

Everything sits in one root folder on purpose — no subfolders — so you can just drop in your own files with the same names and it keeps working.

## 1. Try it locally

Just double-click `index.html`. It opens straight in your browser, no server or install needed.

## 2. Publish it on GitHub Pages

1. Create a new repository on GitHub (e.g. `our-4th-monthsary`).
2. Upload all the files in this folder to that repository (drag-and-drop on the GitHub website works fine, or use `git push` if you're comfortable with git).
3. In the repository, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`, pick the `main` branch and `/ (root)` folder, then **Save**.
5. Wait a minute or two, then GitHub will give you a link like:
   `https://your-username.github.io/our-4th-monthsary/`
6. Send that link to her. 💕

## 3. Replace the placeholder photos

The gallery uses `photo1.jpg` through `photo6.jpg`, and the top of the page uses `hero.jpg`. To swap them:

1. Pick your own photos.
2. Rename them exactly to `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, `photo4.jpg`, `photo5.jpg`, `photo6.jpg`, and `hero.jpg`.
3. Replace the placeholder files in the repository with your renamed photos (upload with the same filename to overwrite).
4. Square-ish photos (close to 1:1) look best in the gallery grid, but any size will work — they'll be cropped gently to fit.

If you'd rather use different filenames, update the matching `src="..."` values inside `index.html` (search for `photo1.jpg`, etc.).

## 4. Replace the background music

The placeholder `music.mp3` is just a soft synthetic tone so the player works out of the box — swap it for a real song:

1. Export or download your song as an **MP3** file.
2. Rename it to exactly `music.mp3`.
3. Replace the placeholder file in the repository.

Keep the file reasonably small (under ~8–10MB) so it loads quickly on mobile data. The site will automatically fade the new song in after she taps "Start Exploring," loop it, and let her mute it anytime with the floating 🎵 button in the corner.

## 5. Edit the love letter

Open `script.js` and find the section near the top labeled:

```js
/* 5. LOVE LETTER — envelope open + typewriter effect */
```

Just below it there's a `LETTER` variable containing the full letter text as a template string. Edit the words directly — line breaks in the code become line breaks on the page. Save the file and refresh the browser to see your changes.

## 6. Customize the Love Notes

Still in `script.js`, look for:

```js
/* 8. LOVE NOTES GENERATOR */
const LOVE_NOTES = [ ... ];
```

It's a plain list of short strings, one per line, wrapped in quotes and separated by commas. You can:
- Edit any existing note's text.
- Add a new one by adding another line in the same format: `"Your new note here.",`
- Delete a line you don't like.

The site automatically shuffles through every note before repeating any, no matter how many you add or remove.

## 7. Customize "Reasons I Love You"

Same idea, in the section labeled:

```js
/* 9. REASONS I LOVE YOU — 30 flip cards */
const REASONS = [ ... ];
```

Edit, add, or remove lines the same way as the love notes list above.

## 8. Customize the names used throughout

Search `index.html` and `script.js` for the pet names (My Love, My Babyy, My Wife, Love Love Ko, My Candy) if you'd like to swap any of them out — they appear naturally across the letter, notes, and finale.

## A couple of small notes

- The site is designed mobile-first since that's most likely how it'll be viewed, but it also looks good on desktop.
- Browsers block audio from autoplaying without a tap — that's normal and already handled: the music starts right after she taps "Start Exploring," and if a browser still blocks it, a small "tap anywhere" hint appears.
- Everything works offline once the page is loaded (no external dependencies except the two Google Fonts links in `index.html`, which just need an internet connection the first time the page loads).

Happy monthsary. 🤍
