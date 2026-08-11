/* ============================================================================
   ✏️  EDIT EVERYTHING YOU NEED IN THIS ONE SECTION.
   This is the only part of the code you should have to touch. Change the
   text between the quotes " " and save the file — the rest of the website
   updates itself automatically.
   ============================================================================ */
const siteConfig = {

  // ----- Names & date -----
  girlfriendName: "Babyy",
  myName: "Baby",
  months: "5",
  anniversaryDate: "August 14, 2026",                 // e.g. "August 11, 2026" (not shown yet, just here for your reference)

  // ----- Hero section -----
  heroMessage: "Happy 5 Months, My Love",
  heroSubtitle: "five months of you, and I still can't believe my luck.",

  // ----- "Our Story" section -----
  storyText: "Five months may sound like a short time, but somehow you've become such a beautiful part of my life. Every ordinary day feels a little softer, a little brighter, simply because you're in it. I don't know exactly when it happened — maybe it was gradual, maybe it was instant — but somewhere between our first conversation and right now, you became my favorite person to tell things to.",

  // ----- Photo Memories -----
  // Add a photo by:
  //   1. Uploading a JPG/PNG file into the "images" folder (e.g. images/photo4.jpg)
  //   2. Adding a new line below with its filename and an optional caption
  // Remove a photo by deleting its line. Reorder by moving lines up/down.
  photos: [
    { src: "images/1.jpg", caption: "Love love 🥹" },
    { src: "images/2.jpg", caption: "Sooooo pretty🥰" },
    { src: "images/3.jpg", caption: "Gorgeous😍" },
    { src: "images/4.jpg", caption: "I love you so much 😘" },
    { src: "images/5.jpg", caption: "Akong palangga 😍🥰" },
    { src: "images/6.jpg", caption: "Asawa ko 😘🥰😍" },
  ],

  // ----- My Favorite Photos of You -----
  // A separate gallery, just for the pictures of her you love most.
  // Same rules as "photos" above: add the file to images/, then add a line here.
  favoritePhotos: [
    { src: "images/favorite1.jpg", caption: "This one, always" },
    { src: "images/favorite2.jpg", caption: "" },
    { src: "images/favorite3.jpg", caption: "" },
  ],

  // ----- Love Letter -----
  loveLetter: "My love, if you're reading this, it means you found the little world I made for you. I wanted a place, outside of texts and calls, where I could say everything I mean without running out of characters. Thank you for these five months — for your patience, your laugh, the way you make small moments feel like the whole point. I promise to keep choosing you, on the easy days and the hard ones.",
  loveLetterSignoff: "— always yours",

  // ----- 5 Things I Love About You -----
  // Add, remove, or reorder lines freely — the list resizes itself.
  reasons: [
    "Your smile ❤️",
    "The way you make me laugh",
    "Your kindness",
    "The little things you do",
    "Simply being you",
  ],

  // ----- Timeline -----
  // Add, remove, or edit entries the same way as reasons above.
  timeline: [
    { label: "Month 1 — The Beginning ❤️", desc: "The day it all started." },
    { label: "Month 2 — Getting Closer 💕", desc: "Late-night talks and inside jokes." },
    { label: "Month 3 — More Memories", desc: "Adventures and quiet moments." },
    { label: "Month 4 — Growing Together", desc: "Learning each other, on purpose." },
    { label: "Month 5 — Still Choosing You ❤️", desc: "And I'd choose you again." },
  ],

  // ----- Final section -----
  finaleIntro: "Every month with you has felt like its own small chapter, and I can't wait to keep writing this story with you.",
  finalMessage: "I love you more today than yesterday, and probably not as much as tomorrow. Happy 5 months, my love. Here's to every month after this one.",
  finaleNames: "— from your person, always",

  // ----- Music -----
  // Put your song file at music/our-song.mp3 — leave as is if you don't
  // want music; the button will just gently disable itself.
  musicFile: "music/our-song.mp3",
};

/* ============================================================================
   Below this line: the code that makes everything work.
   You shouldn't need to edit anything past here, but nothing bad will
   happen if you look around.
   ============================================================================ */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Apply text config into the page ---------- */
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el && value) el.textContent = value;
  };
  setText("heroHeadline", siteConfig.heroMessage);
  setText("heroSubtitle", siteConfig.heroSubtitle);
  setText("storyText", siteConfig.storyText);
  setText("loveLetterText", siteConfig.loveLetter);
  setText("loveLetterSignoff", siteConfig.loveLetterSignoff);
  setText("finaleIntro", siteConfig.finaleIntro);
  setText("finalMessageText", siteConfig.finalMessage);
  setText("finaleNames", siteConfig.finaleNames);
  document.title = `For ${siteConfig.girlfriendName}, With Love`;

  /* ---------- Build a photo gallery (used for both galleries on the page) ---------- */
  // Renders `photosArray` into the grid at `gridId`, and wires each card to
  // open the lightbox scoped to that same array — so the two galleries
  // (Photo Memories and Favorite Photos) browse independently of each other.
  function buildGallery(gridId, photosArray, emptyHint) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    if (photosArray.length === 0) {
      grid.innerHTML = `<p class="gallery-empty-note">${emptyHint}</p>`;
      return;
    }

    photosArray.forEach((photo, index) => {
      const card = document.createElement("button");
      card.className = "gallery-card";
      card.setAttribute("aria-label", photo.caption || `Photo ${index + 1}`);

      const img = document.createElement("img");
      img.src = photo.src;
      img.alt = photo.caption || `Photo ${index + 1}`;
      img.loading = "lazy";
      // If an image file is missing, quietly swap in a placeholder heart
      // instead of showing a broken-image icon.
      img.onerror = () => {
        card.innerHTML = `<div class="gallery-placeholder">🤍</div>`;
      };
      card.appendChild(img);

      if (photo.caption) {
        const cap = document.createElement("span");
        cap.className = "card-caption";
        cap.textContent = photo.caption;
        card.appendChild(cap);
      }

      card.addEventListener("click", () => openLightbox(photosArray, index));
      grid.appendChild(card);
    });
  }

  const photos = Array.isArray(siteConfig.photos) ? siteConfig.photos : [];
  const favoritePhotos = Array.isArray(siteConfig.favoritePhotos) ? siteConfig.favoritePhotos : [];

  buildGallery("galleryGrid", photos, "Add photos in script.js → siteConfig.photos to see them here.");
  buildGallery("favoritesGrid", favoritePhotos, "Add photos in script.js → siteConfig.favoritePhotos to see them here.");

  /* ---------- Lightbox (shared by both galleries) ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");
  let activeGallery = [];
  let currentPhotoIndex = 0;

  function openLightbox(photosArray, index) {
    if (!photosArray || photosArray.length === 0) return;
    activeGallery = photosArray;
    currentPhotoIndex = index;
    renderLightbox();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function renderLightbox() {
    const photo = activeGallery[currentPhotoIndex];
    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.caption || "";
    lightboxCaption.textContent = photo.caption || "";
    const multiple = activeGallery.length > 1;
    lightboxPrev.style.display = multiple ? "flex" : "none";
    lightboxNext.style.display = multiple ? "flex" : "none";
  }
  function showNext() {
    currentPhotoIndex = (currentPhotoIndex + 1) % activeGallery.length;
    renderLightbox();
  }
  function showPrev() {
    currentPhotoIndex = (currentPhotoIndex - 1 + activeGallery.length) % activeGallery.length;
    renderLightbox();
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxNext.addEventListener("click", showNext);
  lightboxPrev.addEventListener("click", showPrev);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });

  // Basic swipe support for mobile
  let touchStartX = 0;
  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  lightbox.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) > 40) dx < 0 ? showNext() : showPrev();
  }, { passive: true });

  /* ---------- Build "5 Things I Love About You" ---------- */
  const reasonsList = document.getElementById("reasonsList");
  (siteConfig.reasons || []).forEach((reason, i) => {
    const card = document.createElement("div");
    card.className = "reason-card";
    card.setAttribute("data-reveal", "");
    card.innerHTML = `<span class="reason-index">${i + 1}</span><span class="reason-text">${reason}</span>`;
    reasonsList.appendChild(card);
  });

  /* ---------- Build the timeline ---------- */
  const timelineList = document.getElementById("timelineList");
  (siteConfig.timeline || []).forEach((item) => {
    const el = document.createElement("div");
    el.className = "timeline-item";
    el.setAttribute("data-reveal", "");
    el.innerHTML = `
      <div class="timeline-label">${item.label}</div>
      <div class="timeline-desc">${item.desc || ""}</div>
    `;
    timelineList.appendChild(el);
  });

  /* ---------- Scroll reveal animations ---------- */
  const revealTargets = document.querySelectorAll("[data-reveal]");
  if (prefersReducedMotion) {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  } else if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Hero "Open Our Story" button ---------- */
  document.getElementById("openStoryBtn").addEventListener("click", () => {
    document.getElementById("story").scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  /* ---------- Final "One More Thing" reveal ---------- */
  const oneMoreBtn = document.getElementById("oneMoreThingBtn");
  const finalReveal = document.getElementById("finalReveal");
  oneMoreBtn.addEventListener("click", () => {
    const isOpen = finalReveal.classList.toggle("is-open");
    finalReveal.setAttribute("aria-hidden", String(!isOpen));
    oneMoreBtn.textContent = isOpen ? "Read That Again ❤" : "One More Thing ❤";
    if (isOpen) {
      finalReveal.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
    }
  });

  /* ---------- Optional background music ---------- */
  const musicToggle = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");
  let musicPlaying = false;

  musicToggle.addEventListener("click", () => {
    if (musicPlaying) {
      bgMusic.pause();
      musicToggle.classList.remove("is-playing");
      musicToggle.setAttribute("aria-label", "Play our song");
      musicToggle.setAttribute("aria-pressed", "false");
      musicPlaying = false;
    } else {
      bgMusic.play().catch(() => {
        // No music file present, or the browser blocked playback — fail quietly.
        musicToggle.title = "Add music/our-song.mp3 to enable music";
      });
      musicToggle.classList.add("is-playing");
      musicToggle.setAttribute("aria-label", "Pause our song");
      musicToggle.setAttribute("aria-pressed", "true");
      musicPlaying = true;
    }
  });

  /* ---------- Ambient floating hearts ---------- */
  if (!prefersReducedMotion) {
    const ambientLayer = document.getElementById("ambientLayer");
    const heartChars = ["❤", "❤", "🤍", "✨"];

    function spawnHeart() {
      const heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
      const size = 12 + Math.random() * 16;
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.fontSize = `${size}px`;
      heart.style.setProperty("--drift", `${(Math.random() - 0.5) * 120}px`);
      const duration = 9 + Math.random() * 6;
      heart.style.animationDuration = `${duration}s`;
      ambientLayer.appendChild(heart);
      setTimeout(() => heart.remove(), duration * 1000 + 500);
    }

    // A gentle, infrequent drift of hearts — not a snowstorm.
    setInterval(spawnHeart, 2200);
    spawnHeart();
  }
})();
