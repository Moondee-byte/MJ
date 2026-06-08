/* ============================================
   MY CANDY — script.js
   Handles: canvas hearts, scroll reveal,
   typing letter, click hearts
   ============================================ */

// ============ CANVAS FLOATING HEARTS ============
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

let hearts = [];
const HEART_COUNT = 18;
const EMOJIS = ['❤️','🩷','💕','💖','💗','🌸'];

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function spawnHeart() {
  return {
    x:     Math.random() * canvas.width,
    y:     canvas.height + 30,
    emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    size:  14 + Math.random() * 18,
    speed: 0.5 + Math.random() * 0.8,
    drift: (Math.random() - 0.5) * 0.6,
    opacity: 0.3 + Math.random() * 0.5,
  };
}

for (let i = 0; i < HEART_COUNT; i++) {
  const h = spawnHeart();
  h.y = Math.random() * canvas.height; // start scattered
  hearts.push(h);
}

function drawHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(h => {
    ctx.save();
    ctx.globalAlpha = h.opacity;
    ctx.font = `${h.size}px serif`;
    ctx.fillText(h.emoji, h.x, h.y);
    ctx.restore();

    h.y     -= h.speed;
    h.x     += h.drift;
    h.opacity -= 0.0008;

    if (h.y < -40 || h.opacity <= 0) {
      Object.assign(h, spawnHeart());
    }
  });
  requestAnimationFrame(drawHearts);
}
drawHearts();


// ============ SCROLL REVEAL ============
const revealEls = document.querySelectorAll('.reveal');

function checkReveal() {
  const trigger = window.innerHeight * 0.88;
  revealEls.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) {
      el.classList.add('visible');
    }
  });
}

// Trigger intro immediately
window.addEventListener('load', () => {
  setTimeout(checkReveal, 100);
});
window.addEventListener('scroll', checkReveal, { passive: true });


// ============ LETTER TYPING EFFECT ============
const openBtn   = document.getElementById('openBtn');
const letter    = document.getElementById('letter');
const typedText = document.getElementById('typedText');
const letterEnd = document.getElementById('letter-end');

// The letter — personal, raw, real
const message =
`My Candy,

Naa ko diri, trying to find the right words —
and you know mag lisod kog ingon ani hshshs😅

But here goes.

Three months. 
Doesn't sound like a lot, does it?
But every single day of those three months,
you've been the highlight of mine.

I still think about that first night I messaged you.
And i know na first thought nimo that I was weird — and honestly, you weren't wrong.
But instead of leaving, you stayed.
And that means everything.

We didn't need grand dates or big moments.
We had late nights and long chats,
scrolling through stuff together,
laughing at things only we'd find funny.
Those simple things — that's what I'll always treasure.

Thank you for not giving up on me.
Thank you for accepting me, all of me —
the weird parts, the quiet parts, the stubborn parts.
You never asked me to be anyone else.

This distance is hard, my love.
really hard. 
I won't pretend it isn't.
But every day I wake up knowing you're there —
praying for you, missing you, loving you through everything. 

I can't give you everything yet.
But I promise —
one day, I will make up for all of it.

You are my missing piece, My love.
My life feels more complete with you in it.
And I don't say that lightly —
I say it because I mean it with everything I have.

Sa bisan unsa pang mahitabo,
at the end of every day —
it's you I'm choosing.
Always you.

Here's to our 3rd monthsary,
and to all the months still to come.
I'm wishing for our forever. 🌸

I love you so much, My sweet sweet Candy.
So, so, so much. 🩷`;

let charIndex = 0;
let typingActive = false;
let cursor;

function typeWriter() {
  if (!typingActive) return;

  if (charIndex < message.length) {
    // Remove cursor temporarily
    if (cursor) cursor.remove();

    typedText.textContent = message.slice(0, charIndex + 1);
    charIndex++;

    // Re-add cursor
    cursor = document.createElement('span');
    cursor.className = 'cursor';
    typedText.appendChild(cursor);

    // Vary speed slightly for realism
    const ch    = message[charIndex - 1];
    const delay = (ch === '\n') ? 80 : (ch === ',' || ch === '.') ? 120 : 35;
    setTimeout(typeWriter, delay);
  } else {
    // Done typing
    if (cursor) cursor.remove();
    letterEnd.classList.remove('hidden');
  }
}

openBtn.addEventListener('click', () => {
  letter.classList.remove('hidden');
  openBtn.style.display = 'none';
  typingActive = true;
  typeWriter();
});


// ============ CLICK HEARTS ============
const clickEmojis = ['💖','🩷','❤️','💕','🌸','✨','💗'];

document.addEventListener('click', e => {
  // Don't spawn on button clicks
  if (e.target.closest('button')) return;

  const el = document.createElement('div');
  el.className = 'click-heart';
  el.textContent = clickEmojis[Math.floor(Math.random() * clickEmojis.length)];
  el.style.left = (e.clientX - 12) + 'px';
  el.style.top  = (e.clientY - 12) + 'px';
  document.body.appendChild(el);

  setTimeout(() => el.remove(), 1000);
});
