# Happy 4th Monthsary ❤️

An interactive, explorable love letter for my girlfriend, built for our 4th monthsary while we're apart. No scrolling story — she taps her way through a heart-shaped little universe: a letter, a photo gallery, a mini-game, love notes, flip cards, and a few surprises.

## How to use it

1. Open `index.html` in any browser. That's it, no build step, no install.
2. To publish it on GitHub Pages: push this folder to a GitHub repo, then in **Settings → Pages** set the source to your main branch. Your site will be live at `https://<username>.github.io/<repo-name>/`.

## Before you send it — replace the placeholders

All the placeholder assets already exist so the site runs immediately, but they should be swapped for the real thing:

| Replace this file | With |
|---|---|
| `assets/images/hero.jpg` | not currently used on the homepage, kept for future use |
| `assets/images/photo1.jpg` – `photo6.jpg` | 6 of your favorite photos together (any image works, just keep the same filename or update the paths in `script.js` → `photos` array) |
| `assets/music/music.mp3` | "your song" — currently a silent placeholder track |

Photos should ideally be portrait-oriented (3:4) since the gallery cards are tall, but any photo will still display fine.

## What's inside

- **Home screen** – title, subtitle, and a button into the experience.
- **The Hub** – a heart-shaped constellation of 10 glowing nodes; each one opens a section.
- **A Letter** – tap the envelope to open it and watch a typed-out, original love letter.
- **Little Moments** – a responsive photo gallery with a full-screen lightbox.
- **Catch My Heart** – a mini-game where tapping falling hearts fills a Love Meter; hitting 100% reveals a hidden message.
- **Love Notes** – a button that hands out one of 50 unique notes at a time, no repeats until they've all been seen.
- **Reasons I Love You** – 30 flip cards, one reason per card.
- **Our Distance** – four stats about months, messages, calls, and shared dreams (deliberately not measured in kilometers).
- **A Surprise** (gift box) – tap to open, confetti plus a hidden message.
- **Our Dreams** – tap-to-expand cards about the future.
- **Night Sky** – tap the stars to reveal little whispered messages.
- **The Last One** – the final surprise: a glowing heart and the closing line.
- **Floating music player** – play/pause, scrub, and volume, bottom-right, on every screen. Doesn't autoplay.

## Customizing the words

Everything text-based lives in `script.js`, in clearly labeled arrays near the top of each section:

- `loveLetter` — the letter text
- `loveNotes` — the 50 love notes
- `reasons` — the 30 flip-card reasons
- `distanceStats` — the "Our Distance" cards
- `dreams` — the future dreams cards
- `skyMessages` — the night sky whispers
- The gift box and Love Meter hidden messages are set directly inside their click handlers (search for `giftMessage.textContent` and `game-message`).

Affectionate names used throughout: **My Love, My Babyy, My Wife, Love Love Ko, My Candy** — feel free to search-and-replace any of these in `script.js` if you'd like different names.

## Tech

Plain HTML, CSS, and vanilla JavaScript. No frameworks, no build tools, no dependencies beyond two Google Fonts (Cormorant Garamond, Quicksand, Poppins) loaded via CDN link in `index.html`.

Happy 4th monthsary. Here's to every month after this one. 🤍
