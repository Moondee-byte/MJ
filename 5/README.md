# For You, Always 💌

A little romantic anniversary website — built to run entirely from GitHub Pages,
no backend or account setup needed beyond GitHub itself.

Everything below assumes you're doing this **from an Android phone**, using the
GitHub app or GitHub's mobile website. No computer required.

---

## 1. Create a GitHub account (skip if you have one)

1. Install the **GitHub** app from the Play Store, or open github.com in Chrome.
2. Sign up with an email address and password.

## 2. Create a new repository

1. In the GitHub app, tap the **+** button → **New repository**.
2. Name it something like `for-her` or `our-5-months` (no spaces).
3. Set it to **Public** (required for free GitHub Pages).
4. Tap **Create repository**.

## 3. Upload the website files

1. Open your new repository.
2. Tap the **⋯** menu (or **Add file**) → **Upload files** / **Create file**.
   - If your GitHub app version doesn't support file upload directly, open
     github.com/YOUR-USERNAME/YOUR-REPO in Chrome (request "Desktop site" if
     the upload button is hard to find on mobile) and use **Add file → Upload files** there.
3. Upload these files one by one, keeping the same names:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
4. Create the `images` folder by uploading a photo — type `images/photo1.jpg`
   as the file path when uploading, and GitHub will create the folder for you.
5. Do the same for `music/our-song.mp3` if you're adding a song (optional).

**Tip:** you can select multiple photos at once when uploading, as long as
you drop them into the `images/` folder path.

## 4. Add your photos

1. Save the pictures you want on your phone first.
2. In your repo, go into the `images` folder → **Add file → Upload files**.
3. Upload your photos. Name them anything you like, e.g. `photo1.jpg`,
   `photo2.jpg`, `beach-day.jpg`.
4. Open `script.js` in the GitHub app (tap the file → pencil/edit icon).
5. Find the `photos` list near the top and add a line for each photo:

   ```javascript
   photos: [
     { src: "images/photo1.jpg", caption: "Our first date ❤️" },
     { src: "images/beach-day.jpg", caption: "That windy afternoon" },
   ],
   ```
6. Tap **Commit changes** to save.

## 5. Change the text

1. Open `script.js` in the GitHub app and tap the pencil/edit icon.
2. At the very top is a section called `siteConfig` — every editable message
   lives there (names, the story, the love letter, the 5 reasons, the
   timeline, and the final message).
3. Change the text between the quote marks `" "` only — don't remove the
   quote marks or commas.
4. Tap **Commit changes** when you're done. Repeat for as many edits as you like.

## 6. Add music (optional)

1. Upload your song file into the `music` folder, named `our-song.mp3`
   (or edit `siteConfig.musicFile` in `script.js` if you used a different name).
2. That's it — a small music note button appears in the top-right corner of
   the site so she can turn it on if she wants to.

## 7. Turn on GitHub Pages

1. In your repository, go to **Settings**.
2. Scroll to **Pages** (under "Code and automation").
3. Under **Source**, choose **Deploy from a branch**.
4. Set the branch to **main** and the folder to **/ (root)**.
5. Tap **Save**.

## 8. Get your link

1. Wait a minute or two, then reload the **Settings → Pages** screen.
2. Your live link will appear at the top, looking like:
   `https://YOUR-USERNAME.github.io/YOUR-REPO/`
3. Open it to make sure everything looks right, then send it to her. 💌

---

## File structure

```text
romantic-website/
│
├── index.html      → the page itself, don't need to edit this
├── style.css        → all the colors/fonts, optional to edit
├── script.js         → ✏️ edit this one — all your text and photos live here
├── README.md         → this file
│
├── images/            → put your photos in here
│   └── photo1.jpg, photo2.jpg, ...
│
└── music/              → put your song in here (optional)
    └── our-song.mp3
```

---

## How to Customize This on Your Phone

Everything you'll want to change lives in **`script.js`**, inside the
`siteConfig` block at the very top of the file. Open the file in the GitHub
app, tap the pencil icon to edit, make your change between the quote marks,
then tap **Commit changes**.

- **Her name / your name:** `girlfriendName` and `myName`
- **Hero headline & subtitle:** `heroMessage`, `heroSubtitle`
- **The story message:** `storyText`
- **Love letter:** `loveLetter` and `loveLetterSignoff`
- **5 things you love about her:** the `reasons` list — add or remove lines freely
- **Timeline:** the `timeline` list — each entry has a `label` and `desc`
- **Final message:** `finaleIntro`, `finalMessage`, `finaleNames`
- **Photos:** the `photos` list — add `{ src: "images/yourfile.jpg", caption: "..." }`
  for each photo, after uploading the file itself into the `images/` folder
- **Music:** upload `music/our-song.mp3`, or change `musicFile` if you named it differently

### Final checklist

- ☐ Replace names
- ☐ Replace messages
- ☐ Add photos
- ☐ Add captions
- ☐ Add music (optional)
- ☐ Upload to GitHub
- ☐ Enable GitHub Pages
- ☐ Send the link to my girlfriend ❤️
