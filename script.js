/* ============================================================
   MONTHSARY WEBSITE — SCRIPT.JS
   Features:
   - Floating hearts canvas animation
   - Open / close letter with animation
   - Typing effect for the love letter
   - Background music toggle
   - Dynamic date in letter
   ============================================================ */

// ── DOM REFERENCES ──────────────────────────────────────────
const canvas        = document.getElementById('heartsCanvas');
const ctx           = canvas.getContext('2d');
const openBtn       = document.getElementById('openLetterBtn');
const closeBtn      = document.getElementById('closeLetterBtn');
const letterSection = document.getElementById('letterSection');
const landing       = document.getElementById('landing');
const letterBody    = document.getElementById('letterBody');
const letterDate    = document.querySelector('.letter-date');
const musicBtn      = document.getElementById('musicBtn');
const bgMusic       = document.getElementById('bgMusic');

// ── LOVE LETTER TEXT ────────────────────────────────────────
// Edit the paragraphs below to personalize the message.
const letterParagraphs = [
  "Three months. Ninety-something days. And somehow every single one of them felt like I won a little lottery I didn't even know I'd entered.",

  "Thank you — for the good mornings that made waking up easier, for the little check-ins that turned ordinary days into something I actually looked forward to. Thank you for laughing at my jokes even when they probably didn't deserve it, and for being honest with me even when honesty was harder.",

  "You make things feel lighter. I don't know how you do it, but you do — and I'm really, really glad you do it around me.",

  "Three months in and I'm not even close to done learning you. Every conversation we have adds a new page I didn't expect, and I keep wanting to read more. That's a good sign, I think.",

  "Here's to the next chapter — more adventures, more laughs, more of whatever this is. I'm in, completely.",

  "I love you more than I know how to say — so I figured a little letter might help. 💕"
];

// ── SET DYNAMIC DATE ────────────────────────────────────────
(function setDate() {
  const now = new Date();
  const opts = { year: 'numeric', month: 'long', day: 'numeric' };
  letterDate.textContent = now.toLocaleDateString('en-US', opts);
})();

// ── FLOATING HEARTS CANVAS ──────────────────────────────────
let hearts = [];

/** Resize canvas to fill viewport */
function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

/** Single heart object */
class Heart {
  constructor() {
    this.reset(true);
  }

  reset(init = false) {
    this.x     = Math.random() * canvas.width;
    this.y     = init ? Math.random() * canvas.height : canvas.height + 30;
    this.size  = 10 + Math.random() * 20;
    this.speed = 0.5 + Math.random() * 1.2;
    this.drift = (Math.random() - 0.5) * 0.6;   // gentle horizontal sway
    this.alpha = 0.15 + Math.random() * 0.55;
    this.wobble      = Math.random() * Math.PI * 2; // phase offset
    this.wobbleSpeed = 0.015 + Math.random() * 0.02;
    // Palette: soft pinks and roses
    const colors = ['#f9b8cc', '#e8638c', '#c0395f', '#fcd7e2', '#ff8fab'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  /** Draw an SVG-style heart using bezier curves */
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle   = this.color;
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    const s = this.size;
    ctx.moveTo(0, s * 0.3);
    ctx.bezierCurveTo(-s, -s * 0.3,  -s * 1.8, s * 0.6,  0,  s * 1.3);
    ctx.bezierCurveTo( s * 1.8, s * 0.6,  s, -s * 0.3,  0,  s * 0.3);
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.wobble += this.wobbleSpeed;
    this.x += Math.sin(this.wobble) * 0.8 + this.drift;
    this.y -= this.speed;
    if (this.y < -this.size * 2) this.reset();
  }
}

/** Spawn initial hearts */
function initHearts(count = 38) {
  hearts = [];
  for (let i = 0; i < count; i++) hearts.push(new Heart());
}
initHearts();

/** Animation loop */
function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(h => { h.update(); h.draw(); });
  requestAnimationFrame(animateHearts);
}
animateHearts();

// ── OPEN LETTER ─────────────────────────────────────────────
openBtn.addEventListener('click', () => {
  // Hide landing
  landing.classList.add('hidden');

  // Show letter section
  letterSection.classList.add('visible');

  // Start typing after the letter card slides in (~800ms)
  setTimeout(startTyping, 900);
});

// ── CLOSE LETTER ────────────────────────────────────────────
closeBtn.addEventListener('click', () => {
  letterSection.classList.remove('visible');

  setTimeout(() => {
    landing.classList.remove('hidden');
    // Reset typed content so it types again next open
    letterBody.innerHTML = '';
    typingDone = false;
  }, 600);
});

// ── TYPING EFFECT ───────────────────────────────────────────
let typingDone = false;
let typingTimeout = null;

function startTyping() {
  if (typingDone) return;
  letterBody.innerHTML = '';

  let paraIndex = 0;   // which paragraph we're on
  let charIndex = 0;   // which char within that paragraph
  let currentP  = null;

  // Cursor element that blinks while typing
  const cursor = document.createElement('span');
  cursor.className = 'cursor';

  function nextChar() {
    // Move to next paragraph if needed
    if (!currentP || charIndex >= letterParagraphs[paraIndex].length) {
      if (currentP) paraIndex++;                   // advance after finishing one
      if (paraIndex >= letterParagraphs.length) {  // all done
        cursor.remove();
        typingDone = true;
        return;
      }
      // Create a new <p> and start typing into it
      currentP = document.createElement('p');
      if (paraIndex > 0) currentP.style.marginTop = '1rem';
      letterBody.appendChild(currentP);
      letterBody.appendChild(cursor);
      charIndex = 0;
    }

    const ch = letterParagraphs[paraIndex][charIndex];
    currentP.textContent += ch;
    charIndex++;

    // Punctuation pauses feel more natural
    const pauseChars = ['.', ',', '!', '?', '—'];
    const delay = pauseChars.includes(ch) ? 65 : 26;
    typingTimeout = setTimeout(nextChar, delay);
  }

  nextChar();
}

// ── MUSIC TOGGLE ────────────────────────────────────────────
let musicPlaying = false;

musicBtn.addEventListener('click', () => {
  if (musicPlaying) {
    bgMusic.pause();
    musicBtn.classList.remove('playing');
    musicBtn.textContent = '🎵';
    musicPlaying = false;
  } else {
    bgMusic.volume = 0.35;
    bgMusic.play().catch(() => {
      // Autoplay blocked — silently ignore
    });
    musicBtn.classList.add('playing');
    musicBtn.textContent = '🎶';
    musicPlaying = true;
  }
});

// ── SPARKLE ON CLICK ────────────────────────────────────────
// Small hearts burst from wherever you click
document.addEventListener('click', (e) => {
  // Skip if clicking a button
  if (e.target.tagName === 'BUTTON') return;

  for (let i = 0; i < 5; i++) {
    const h = new Heart();
    h.x     = e.clientX + (Math.random() - 0.5) * 30;
    h.y     = e.clientY;
    h.size  = 6 + Math.random() * 10;
    h.speed = 1.5 + Math.random() * 2;
    h.alpha = 0.7;
    hearts.push(h);
  }

  // Remove extra hearts after burst so we don't accumulate endlessly
  setTimeout(() => {
    if (hearts.length > 60) hearts.splice(0, 5);
  }, 3000);
});
