/* ==========================================================================
   4TH MONTHSARY — SCRIPT
   Plain vanilla JS. No frameworks, no build step.
   Organized into clearly labeled sections so it's easy to edit later.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------ *
   * 0. SMALL HELPERS
   * ------------------------------------------------------------------ */
  const qs  = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const rand = (min, max) => Math.random() * (max - min) + min;
  const randInt = (min, max) => Math.floor(rand(min, max + 1));

  /* ------------------------------------------------------------------ *
   * 1. SCREEN NAVIGATION
   * ------------------------------------------------------------------ */
  const screens = qsa('.screen');

  function showScreen(name) {
    screens.forEach(s => s.classList.toggle('active', s.dataset.screen === name));
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });

    // trigger section-specific "on open" behaviour
    if (name === 'reasons') buildFlipCards();
    if (name === 'distance') animateCounters();
    if (name === 'sky') buildNightSky();
    if (name === 'finale') playFinale();
    if (name === 'game') resetGame();
  }

  qs('#start-btn').addEventListener('click', (e) => {
    rippleEffect(e);
    showScreen('menu');
    startMusic();
  });

  qsa('.menu-card').forEach(card => {
    card.addEventListener('click', () => showScreen(card.dataset.panel));
  });

  qsa('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => showScreen('menu'));
  });

  /* ------------------------------------------------------------------ *
   * 2. BUTTON RIPPLE EFFECT
   * ------------------------------------------------------------------ */
  function rippleEffect(e) {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  }
  qsa('.btn-glow').forEach(b => b.addEventListener('click', rippleEffect));

  /* ------------------------------------------------------------------ *
   * 3. AMBIENT FLOATING HEARTS (canvas, whole-site background)
   * ------------------------------------------------------------------ */
  const bgCanvas = qs('#hearts-bg');
  const bgCtx = bgCanvas.getContext('2d');
  let bgHearts = [];

  function resizeBgCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }
  resizeBgCanvas();
  window.addEventListener('resize', resizeBgCanvas);

  function makeBgHeart() {
    return {
      x: rand(0, bgCanvas.width),
      y: bgCanvas.height + rand(0, 200),
      size: rand(8, 20),
      speed: rand(0.25, 0.7),
      drift: rand(-0.3, 0.3),
      sway: rand(0, Math.PI * 2),
      opacity: rand(0.15, 0.45),
    };
  }
  for (let i = 0; i < 18; i++) bgHearts.push(makeBgHeart());

  function drawHeart(ctx, x, y, size, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = '#FF9EC2';
    ctx.translate(x, y);
    ctx.beginPath();
    const s = size / 16;
    ctx.moveTo(0, 4 * s);
    ctx.bezierCurveTo(0, 2 * s, -4 * s, -4 * s, -8 * s, 0);
    ctx.bezierCurveTo(-14 * s, 6 * s, -2 * s, 12 * s, 0, 16 * s);
    ctx.bezierCurveTo(2 * s, 12 * s, 14 * s, 6 * s, 8 * s, 0);
    ctx.bezierCurveTo(4 * s, -4 * s, 0, 2 * s, 0, 4 * s);
    ctx.fill();
    ctx.restore();
  }

  function animateBgHearts() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    bgHearts.forEach(h => {
      h.y -= h.speed;
      h.sway += 0.01;
      h.x += Math.sin(h.sway) * 0.3 + h.drift * 0.1;
      if (h.y < -30) Object.assign(h, makeBgHeart(), { y: bgCanvas.height + 30 });
      drawHeart(bgCtx, h.x, h.y, h.size, h.opacity);
    });
    requestAnimationFrame(animateBgHearts);
  }
  animateBgHearts();

  /* ------------------------------------------------------------------ *
   * 4. MUSIC — fade in after "Start Exploring", mute/unmute button
   * ------------------------------------------------------------------ */
  const music = qs('#bg-music');
  const musicToggle = qs('#music-toggle');
  const musicIcon = qs('#music-icon');
  const tapHint = qs('#tap-hint');
  const TARGET_VOLUME = 0.25;
  let musicStarted = false;
  let musicMuted = false;

  music.volume = 0;

  function fadeMusicIn(duration = 2500) {
    const steps = 30;
    const stepTime = duration / steps;
    let count = 0;
    const stepVol = TARGET_VOLUME / steps;
    const fade = setInterval(() => {
      count++;
      music.volume = Math.min(TARGET_VOLUME, stepVol * count);
      if (count >= steps) clearInterval(fade);
    }, stepTime);
  }

  function startMusic() {
    if (musicStarted) return;
    musicStarted = true;
    const playPromise = music.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => fadeMusicIn())
        .catch(() => {
          // autoplay blocked — invite the first tap anywhere on the page
          tapHint.classList.add('show');
          const resumeOnTap = () => {
            music.play().then(fadeMusicIn).catch(() => {});
            tapHint.classList.remove('show');
            document.removeEventListener('click', resumeOnTap);
            document.removeEventListener('touchstart', resumeOnTap);
          };
          document.addEventListener('click', resumeOnTap, { once: true });
          document.addEventListener('touchstart', resumeOnTap, { once: true });
        });
    }
  }

  musicToggle.addEventListener('click', () => {
    musicMuted = !musicMuted;
    music.muted = musicMuted;
    musicToggle.classList.toggle('muted', musicMuted);
    musicToggle.classList.toggle('spin', !musicMuted);
    musicIcon.textContent = musicMuted ? '🔇' : '🎵';
    if (!musicStarted) startMusic();
  });

  /* ------------------------------------------------------------------ *
   * 5. LOVE LETTER — envelope open + typewriter effect
   * ------------------------------------------------------------------ */
  const envelope = qs('#envelope');
  const letterTextEl = qs('#letter-text');
  let letterOpened = false;
  let letterTyped = false;

  const LETTER = `My Love,

Four months in a blink of an eye. Dali ra kayo ang adlaw babyy, it all started when i said "hi" and now dili na makaya ang everyday life kung dili ma dungog,makita or makachat tika. grabe ka inlove. 

Babyy our every call means the world to me, to be loved by you was the greatest gift na na received nako in all my life. Thank you for always choosing to love me every day.

Every message makes my day a little brighter, yesss i mean it, even kanang random "hello love" nimo in the middle of the day, nga idk why maka smile rakog kalit hehe. 

Thank you for staying, for choosing this — for choosing us — even when the distance makes it harder than it should be. That means more to me than I know how to say.

I'm proud of what we've built. Proud of how patient we've been with each other, how we keep choosing honesty and effort over giving up when things get hard. Not every love survives distance. Ours is learning how to.

I can't wait for the days nga dili nata maka ingon after sa atong calls og "byebye baby" — and when good night means, i get to see you not through the screen, and dili lang sa ma dunggan tika. Until then babyy, I'll keep showing up, one call, one message, one monthsary at a time.

I'm excited for everything still ahead of us. Ang mga plano nato, og katong mga plano na wala pa na ingon, atong days nga ma spend nato with each other and dili na sa call lang. 

Happy 4th monthsary, my babyy. Thank you for four months of choosing me. cheers to us, one day at a time — and to a lifetime of never having to say goodbye again.

Don't forget, im Always Proud of You babyy, I love youuuu. Always.

— Yours, pinaka cute nimong palangga hehe`;

  function typeLetter() {
    if (letterTyped) return;
    letterTyped = true;
    letterTextEl.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    let i = 0;
    const speed = 18; // ms per character — feels natural, not sluggish
    function typeChar() {
      if (i < LETTER.length) {
        letterTextEl.textContent += LETTER.charAt(i);
        i++;
        letterTextEl.parentElement.scrollTop = letterTextEl.parentElement.scrollHeight;
        setTimeout(typeChar, speed);
      }
    }
    typeChar();
  }

  envelope.addEventListener('click', () => {
    if (letterOpened) return;
    letterOpened = true;
    envelope.classList.add('open');
    setTimeout(typeLetter, 500);
  });

  /* ------------------------------------------------------------------ *
   * 6. MEMORY GALLERY + LIGHTBOX
   * ------------------------------------------------------------------ */
  const galleryItems = qsa('.gallery-item');
  const lightbox = qs('#lightbox');
  const lightboxImg = qs('#lightbox-img');
  let currentPhotoIndex = 0;
  const photoSources = galleryItems.map(item => item.dataset.src);

  function openLightbox(index) {
    currentPhotoIndex = index;
    lightboxImg.src = photoSources[index];
    lightbox.classList.add('active');
  }
  function closeLightbox() { lightbox.classList.remove('active'); }
  function showNextPhoto(dir) {
    currentPhotoIndex = (currentPhotoIndex + dir + photoSources.length) % photoSources.length;
    lightboxImg.src = photoSources[currentPhotoIndex];
  }

  galleryItems.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));
  qs('#lightbox-close').addEventListener('click', closeLightbox);
  qs('#lightbox-prev').addEventListener('click', () => showNextPhoto(-1));
  qs('#lightbox-next').addEventListener('click', () => showNextPhoto(1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextPhoto(1);
    if (e.key === 'ArrowLeft') showNextPhoto(-1);
  });

  /* ------------------------------------------------------------------ *
   * 7. LOVE METER MINI-GAME
   * ------------------------------------------------------------------ */
  const gameArea = qs('#game-area');
  const meterFill = qs('#meter-fill');
  const meterPercent = qs('#meter-percent');
  const gameWin = qs('#game-win');
  const gameRestart = qs('#game-restart');
  const gameSecret = qs('#game-secret');

  let meterValue = 0;
  let gameSpawnTimer = null;
  let gameActive = false;
  const HEART_EMOJIS = ['❤️', '💕', '💗', '💖'];
  const SECRET_MESSAGE = "Every single one of those hearts is a piece of how much I love you — and you caught them all, just like you've caught mine. 4 months down, forever to go.";

  function spawnFallingHeart() {
    if (!gameActive) return;
    const heart = document.createElement('button');
    heart.className = 'falling-heart';
    heart.textContent = HEART_EMOJIS[randInt(0, HEART_EMOJIS.length - 1)];
    const areaWidth = gameArea.clientWidth;
    heart.style.left = randInt(10, Math.max(10, areaWidth - 40)) + 'px';
    const duration = rand(3.2, 5.5);
    heart.style.animationDuration = duration + 's';
    gameArea.appendChild(heart);

    const remove = () => heart.remove();
    heart.addEventListener('animationend', remove);

    heart.addEventListener('click', () => {
      if (heart.classList.contains('heart-pop')) return;
      heart.classList.add('heart-pop');
      setTimeout(remove, 350);
      incrementMeter();
    });
  }

  function incrementMeter() {
    meterValue = Math.min(100, meterValue + randInt(4, 8));
    meterFill.style.width = meterValue + '%';
    meterPercent.textContent = meterValue + '%';
    if (meterValue >= 100) winGame();
  }

  function winGame() {
    gameActive = false;
    clearInterval(gameSpawnTimer);
    qsa('.falling-heart', gameArea).forEach(h => h.remove());
    gameSecret.textContent = SECRET_MESSAGE;
    gameWin.classList.remove('hidden');
    gameRestart.classList.remove('hidden');
    launchConfetti();
  }

  function resetGame() {
    meterValue = 0;
    meterFill.style.width = '0%';
    meterPercent.textContent = '0%';
    gameWin.classList.add('hidden');
    gameRestart.classList.add('hidden');
    qsa('.falling-heart', gameArea).forEach(h => h.remove());
    clearInterval(gameSpawnTimer);
    gameActive = true;
    gameSpawnTimer = setInterval(spawnFallingHeart, 650);
  }

  gameRestart.addEventListener('click', resetGame);

  /* ------------------------------------------------------------------ *
   * 8. LOVE NOTES GENERATOR (50+ notes, no repeats until exhausted)
   * ------------------------------------------------------------------ */
  const LOVE_NOTES = [
    "I miss you a little more with every hour that passes today.",
    "Good morning, my love — you were my last thought before I fell asleep.",
    "Somewhere out there, you're probably smiling, and it's making my day better too.",
    "I can't wait for the day video calls become 'come here' instead of 'see you tomorrow.'",
    "Goodnight, my babyy. Sleep well — I'll be here when you wake up.",
    "One day we won't need a screen to hold hands. I'm counting down.",
    "You're the last tab I close and the first thing I check in the morning.",
    "Distance made me a professional at loving you long-distance. New skill unlocked hehe.",
    "If missing you burned calories, I'd be the healthiest person alive.",
    "Every video call with you feels like a mini date, and I never want it to end.",
    "I dream about the day I get to hold your hand instead of just hearing your voice.",
    "My love, you make even the most ordinary day feel like something worth smiling about.",
    "I saved a seat next to me today. It was for you, even if you weren't really there.",
    "You are the reason my phone battery drains so fast — and I regret nothing.",
    "One day, 'goodnight' will come with a kiss instead of a call ending.",
    "I love you in every timezone, at every hour, no exceptions.",
    "Thinking of you isn't something I schedule — it just happens, all day, every day.",
    "My future wife, I can't wait to build a life where we don't have to say 'talk later.'",
    "Every 'good morning' text from you is my favorite alarm.",
    "The distance is temporary. What we're building is not.",
    "I love loving you, even from this far away.",
    "You make me want to be patient for something incredible — and that's rare.",
    "I already know our future dates are going to make up for every missed hug.",
    "I keep imagining the first time I get to actually hold your hand in person again.",
    "Even our silence on calls feels like home to me.",
    "I love you more today than yesterday, and that's saying a lot.",
    "You're worth every time difference, every delayed reply, every long night waiting for your call.",
    "One day soon, closing the distance will just mean walking across a room to you.",
    "My love, being away from you has only ever made me more sure about us.",
    "I hope you know how loud my heart cheers every time your name pops up on my screen.",
    "Someday we'll laugh about how many hours we spent staring at each other through a camera.",
    "You are worth the wait, the time difference, and every mile between us.",
    "I love you in a way that doesn't need to be in the same room to feel real.",
    "Good morning, love love ko — I hope today is soft and kind to you.",
    "I can't wait for a future where 'see you soon' actually means soon.",
    "Every laugh we share on call is a memory I keep long after we hang up.",
    "You make long distance feel less like a challenge and more like a promise.",
    "I hope our future is full of the hand-holding we're saving up right now.",
    "My babyy, even a boring day feels sweeter knowing I get to talk to you.",
    "I love the version of us that keeps choosing each other, miles apart.",
    "One day there will be no more 'goodbye,' only 'see you at home.'",
    "You're the calm in my chaos, even through a phone screen.",
    "I love you across time, screens, and every mile in between.",
    "The best part of my day is always the part where I get to talk to you.",
    "I can't wait to trade video calls for actual, real-life hugs.",
    "Every 'I miss you' text is really just me saying 'I love you' in disguise.",
    "You're proof that distance is just a test, not an ending.",
    "My babyy, thank you for making the wait feel worth it.",
    "I love you enough to be patient for our forever.",
    "Someday soon, I won't have to imagine holding your hand — I'll just do it.",
    "Every day with you, even the long-distance ones, is one I'd choose again.",
    "You're my favorite notification, every single time.",
    "I love you a little louder every time I miss you a little more.",
  ];

  let noteDeck = [];
  let notesGivenCount = 0;

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = randInt(0, i);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function refillDeck() { noteDeck = shuffle(LOVE_NOTES); }
  refillDeck();

  const noteTextEl = qs('#note-text');
  const noteCountEl = qs('#note-count');

  qs('#note-btn').addEventListener('click', (e) => {
    rippleEffect(e);
    if (noteDeck.length === 0) refillDeck();
    const note = noteDeck.pop();
    notesGivenCount++;
    noteTextEl.classList.remove('pop');
    void noteTextEl.offsetWidth; // restart animation
    noteTextEl.textContent = note;
    noteTextEl.classList.add('pop');
    noteCountEl.textContent = `note ${((notesGivenCount - 1) % LOVE_NOTES.length) + 1} of ${LOVE_NOTES.length} • ${LOVE_NOTES.length} to go through before they repeat`;
  });

  /* ------------------------------------------------------------------ *
   * 9. REASONS I LOVE YOU — 30 flip cards
   * ------------------------------------------------------------------ */
  const REASONS = [
    "Your smile — it's honestly my favorite thing on the planet.",
    "Your kindness, even to people who don't deserve it.",
    "Your patience with me, especially on my dum ass days.",
    "The way you support every random thought I have.",
    "How safe I feel just talking to you about anything.",
    "The way you say i love you like you mean it.",
    "How you sometimes don't remember some things I mentioned once.",
    "Your laugh the (the cutest) — it's basically my favorite sound.",
    "The way you make ordinary days feel special.",
    "How you never make me feel bad for missing you so much.",
    "Your honesty, even when it's the harder thing to say.",
    "The way you fight for us despite the distance.",
    "Your strength on days you don't feel strong.",
    "The way your voice instantly calms me down.",
    "How you celebrate my small wins like they're huge.",
    "The way you say my name.",
    "How effortlessly you make me want to be better.",
    "Your patience during our small or big fights.",
    "The way you still get shy sometimes — it's adorable.",
    "How you never let a fight turn into an end.",
    "Your loyalty — you've never given me a reason to doubt you.",
    "The way you plan our future like it's already certain.",
    "How you make waiting feel worth it.",
    "Your humor — you make even bad days funny.",
    "The way you say I miss you.",
    "How you show up, call after call, day after day.",
    "The way you love me in all my dum ass moments.",
    "Simply put — you. All of you, exactly as you are.",
  ];

  const flipGrid = qs('#flip-grid');
  let flipCardsBuilt = false;

  function buildFlipCards() {
    if (flipCardsBuilt) return;
    flipCardsBuilt = true;
    REASONS.forEach((reason, i) => {
      const card = document.createElement('button');
      card.className = 'flip-card';
      card.innerHTML = `
        <div class="flip-card-inner">
          <div class="flip-face flip-front"><span class="flip-num">${i + 1}</span></div>
          <div class="flip-face flip-back">${reason}</div>
        </div>`;
      card.addEventListener('click', () => card.classList.toggle('flipped'));
      flipGrid.appendChild(card);
    });
  }

  /* ------------------------------------------------------------------ *
   * 10. LONG DISTANCE COUNTERS
   * ------------------------------------------------------------------ */
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;
    qsa('.counter-num').forEach(numEl => {
      const target = parseInt(numEl.dataset.target, 10);
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        numEl.textContent = Math.floor(eased * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
        else numEl.textContent = target.toLocaleString();
      }
      requestAnimationFrame(tick);
    });
  }

  /* ------------------------------------------------------------------ *
   * 11. SURPRISE GIFT
   * ------------------------------------------------------------------ */
  const giftBox = qs('#gift-box');
  const giftReveal = qs('#gift-reveal');
  let giftOpened = false;

  giftBox.addEventListener('click', () => {
    if (giftOpened) return;
    giftOpened = true;
    giftBox.classList.add('opened');
    setTimeout(() => {
      giftReveal.classList.remove('hidden');
      launchConfetti();
    }, 500);
  });

  /* ------------------------------------------------------------------ *
   * 12. INTERACTIVE NIGHT SKY
   * ------------------------------------------------------------------ */
  const STAR_WISHES = [
    "I wish for the day we never have to say 'talk to you tomorrow' again.",
    "I wish for a home that's just ours, someday.",
    "I wish for lazy Sundays with you, in person, no calls needed.",
    "I wish for every future birthday spent together.",
    "I wish for the both of us to keep choosing each other, always.",
    "I wish for a future full love,cuddles and kisses.",
    "I wish for the trip we keep planning to actually happen.",
    "I wish for slow mornings where I get to see you real time, not through a screen.",
    "I wish for us to grow old still calling each other silly names.",
    "I wish for every 'goodnight' to eventually become 'goodnight, I'm right here.'",
    "I wish for a love that never runs out of good mornings.",
    "I wish for you to always feel as loved as you make me feel.",
    "Here's a little secret: you were the best decision these four months made.",
    "And I'd still make that decision over and over", 
    "Here's a little secret: your voice is my favorite sound in the world.",
  ];

  const skyArea = qs('#sky-area');
  const skyMessage = qs('#sky-message');
  let skyBuilt = false;

  function buildNightSky() {
    if (skyBuilt) return;
    skyBuilt = true;
    const positions = [];
    const starCount = STAR_WISHES.length;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('button');
      star.className = 'sky-star';
      star.textContent = '✦';
      const top = randInt(4, 82);
      const left = randInt(4, 90);
      star.style.top = top + '%';
      star.style.left = left + '%';
      star.style.animationDelay = rand(0, 2) + 's';
      star.addEventListener('click', () => {
        skyMessage.textContent = STAR_WISHES[i];
        skyMessage.classList.remove('hidden');
        void skyMessage.offsetWidth;
      });
      skyArea.appendChild(star);
    }
    // sprinkle extra tiny ambient (non-interactive) stars
    for (let i = 0; i < 40; i++) {
      const dot = document.createElement('span');
      dot.style.position = 'absolute';
      dot.style.width = dot.style.height = rand(1, 2.5) + 'px';
      dot.style.borderRadius = '50%';
      dot.style.background = '#fff';
      dot.style.opacity = rand(0.2, 0.8);
      dot.style.top = randInt(0, 95) + '%';
      dot.style.left = randInt(0, 98) + '%';
      dot.style.pointerEvents = 'none';
      skyArea.appendChild(dot);
    }
  }

  /* ------------------------------------------------------------------ *
   * 13. FINALE SEQUENCE
   * ------------------------------------------------------------------ */
  const finaleTextEl = qs('#finale-text');
  const finaleCanvas = qs('#finale-canvas');
  const finaleCtx = finaleCanvas.getContext('2d');
  let finalePlayed = false;
  let fireflies = [];

  const FINALE_LINES = [
    "My Love.", "My Babyy.", "My Wife.", "Love Love Ko.", "Palangga ko.",
    "Four beautiful months.", "A lifetime to go.",
    "I'll keep choosing you.",
    "I love you more than words could ever describe."
  ];

  function resizeFinaleCanvas() {
    finaleCanvas.width = window.innerWidth;
    finaleCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeFinaleCanvas);

  function makeFirefly() {
    return {
      x: rand(0, finaleCanvas.width),
      y: rand(0, finaleCanvas.height),
      r: rand(1.5, 3),
      vx: rand(-0.3, 0.3),
      vy: rand(-0.3, 0.3),
      phase: rand(0, Math.PI * 2),
    };
  }

  function animateFireflies() {
    if (!qs('[data-screen="finale"]').classList.contains('active')) return;
    finaleCtx.clearRect(0, 0, finaleCanvas.width, finaleCanvas.height);
    fireflies.forEach(f => {
      f.x += f.vx; f.y += f.vy; f.phase += 0.03;
      if (f.x < 0 || f.x > finaleCanvas.width) f.vx *= -1;
      if (f.y < 0 || f.y > finaleCanvas.height) f.vy *= -1;
      const glow = (Math.sin(f.phase) + 1) / 2;
      finaleCtx.beginPath();
      finaleCtx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      finaleCtx.fillStyle = `rgba(255, 217, 200, ${0.2 + glow * 0.6})`;
      finaleCtx.shadowBlur = 12;
      finaleCtx.shadowColor = 'rgba(255,217,125,0.8)';
      finaleCtx.fill();
    });
    requestAnimationFrame(animateFireflies);
  }

  function playFinale() {
    resizeFinaleCanvas();
    if (fireflies.length === 0) {
      for (let i = 0; i < 35; i++) fireflies.push(makeFirefly());
    }
    animateFireflies();
    if (finalePlayed) return;
    finalePlayed = true;
    finaleTextEl.innerHTML = '';
    let i = 0;
    function showNextLine() {
      if (i >= FINALE_LINES.length) return;
      finaleTextEl.innerHTML = `<span class="line">${FINALE_LINES[i]}</span>`;
      i++;
      setTimeout(showNextLine, 2200);
    }
    setTimeout(showNextLine, 800);
    setTimeout(launchConfetti, 1200);
  }

  /* ------------------------------------------------------------------ *
   * 14. CONFETTI (canvas-based, reusable)
   * ------------------------------------------------------------------ */
  const confettiCanvas = qs('#confetti-canvas');
  const confettiCtx = confettiCanvas.getContext('2d');
  const CONFETTI_COLORS = ['#FF6FA0', '#C6A4F2', '#FFD97D', '#FFB0CE', '#FFFFFF'];

  function resizeConfettiCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  resizeConfettiCanvas();
  window.addEventListener('resize', resizeConfettiCanvas);

  function launchConfetti() {
    const pieces = [];
    const count = 120;
    for (let i = 0; i < count; i++) {
      pieces.push({
        x: rand(0, confettiCanvas.width),
        y: rand(-40, -confettiCanvas.height * 0.2),
        size: rand(6, 11),
        color: CONFETTI_COLORS[randInt(0, CONFETTI_COLORS.length - 1)],
        speedY: rand(2, 5),
        speedX: rand(-1.5, 1.5),
        rotation: rand(0, 360),
        rotSpeed: rand(-6, 6),
        shape: Math.random() > 0.5 ? 'heart' : 'square',
        life: 0,
      });
    }
    let frame = 0;
    const maxFrames = 220;
    function tick() {
      frame++;
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      pieces.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;
        confettiCtx.save();
        confettiCtx.translate(p.x, p.y);
        confettiCtx.rotate((p.rotation * Math.PI) / 180);
        confettiCtx.fillStyle = p.color;
        confettiCtx.globalAlpha = frame > maxFrames - 40 ? Math.max(0, (maxFrames - frame) / 40) : 1;
        if (p.shape === 'heart') {
          drawHeart(confettiCtx, 0, 0, p.size, confettiCtx.globalAlpha);
        } else {
          confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }
        confettiCtx.restore();
      });
      if (frame < maxFrames) requestAnimationFrame(tick);
      else confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
    tick();
  }

});
