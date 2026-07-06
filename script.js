/* =========================================================================
   4th Monthsary — script.js
   Vanilla JS only. Everything works by opening index.html directly.
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------ */
  /* AMBIENT FLOATING HEARTS                                             */
  /* ------------------------------------------------------------------ */
  const ambientLayer = document.getElementById('ambientLayer');
  const ambientEmojis = ['❤️','💕','💗','✨'];
  function spawnAmbientHeart(){
    const el = document.createElement('span');
    el.className = 'ambient-heart';
    el.textContent = ambientEmojis[Math.floor(Math.random()*ambientEmojis.length)];
    const left = Math.random()*100;
    const duration = 10 + Math.random()*10;
    const drift = (Math.random()*80 - 40) + 'px';
    el.style.left = left + 'vw';
    el.style.setProperty('--drift', drift);
    el.style.animationDuration = duration + 's';
    el.style.fontSize = (0.9 + Math.random()*1.2) + 'rem';
    ambientLayer.appendChild(el);
    setTimeout(() => el.remove(), duration*1000 + 500);
  }
  setInterval(spawnAmbientHeart, 900);
  for(let i=0;i<6;i++) setTimeout(spawnAmbientHeart, i*400);

  /* ------------------------------------------------------------------ */
  /* SCREEN / PANEL NAVIGATION                                           */
  /* ------------------------------------------------------------------ */
  const homeScreen = document.getElementById('homeScreen');
  const hubScreen = document.getElementById('hubScreen');
  const startBtn = document.getElementById('startExploringBtn');
  const allPanels = document.querySelectorAll('.panel');

  startBtn.addEventListener('click', () => {
    homeScreen.classList.remove('active-screen');
    hubScreen.classList.add('active-screen');
  });

  function openPanel(id){
    allPanels.forEach(p => p.classList.remove('active-panel'));
    const target = document.getElementById('panel-' + id);
    if(target){
      target.classList.add('active-panel');
      target.scrollTop = 0;
      window.scrollTo(0,0);
    }
  }
  function closePanel(){
    allPanels.forEach(p => p.classList.remove('active-panel'));
    window.scrollTo(0,0);
  }
  document.querySelectorAll('.btn-back').forEach(btn => {
    btn.addEventListener('click', closePanel);
  });

  /* ------------------------------------------------------------------ */
  /* HUB — HEART-SHAPED CONSTELLATION (signature element)                */
  /* ------------------------------------------------------------------ */
  const hubHeart = document.getElementById('hubHeart');
  const hubPolygon = document.getElementById('hubPolygon');

  // Positions precomputed from the heart parametric curve (percent left/top)
  const nodes = [
    { x:50.0, y:19.7, icon:'💌', label:'A Letter', target:'letter' },
    { x:61.8, y:0.0,  icon:'🖼️', label:'Little Moments', target:'gallery' },
    { x:100.0,y:3.8,  icon:'💗', label:'Catch My Heart', target:'game' },
    { x:100.0,y:44.9, icon:'📝', label:'Love Notes', target:'notes' },
    { x:61.8, y:81.3, icon:'🔄', label:'Reasons Why', target:'reasons' },
    { x:50.0, y:100.0,icon:'✨', label:'The Last One', target:'final' },
    { x:38.2, y:81.3, icon:'🌠', label:'Our Dreams', target:'dreams' },
    { x:0.0,  y:44.9, icon:'🌍', label:'Our Distance', target:'distance' },
    { x:0.0,  y:3.8,  icon:'⭐', label:'Night Sky', target:'sky' },
    { x:38.2, y:0.0,  icon:'🎁', label:'A Surprise', target:'gift' },
  ];

  hubPolygon.setAttribute('points', nodes.map(n => `${n.x},${n.y}`).join(' '));

  nodes.forEach((n, i) => {
    const btn = document.createElement('button');
    btn.className = 'hub-node';
    btn.style.left = n.x + '%';
    btn.style.top = n.y + '%';
    btn.style.animationDelay = (i*0.3) + 's';
    btn.innerHTML = `<span class="node-icon">${n.icon}</span><span class="node-label">${n.label}</span>`;
    btn.addEventListener('click', () => openPanelWithHooks(n.target));
    hubHeart.appendChild(btn);
  });

  /* ------------------------------------------------------------------ */
  /* LOVE LETTER — envelope + typing effect                              */
  /* ------------------------------------------------------------------ */
  const envelope = document.getElementById('envelope');
  const envelopeHint = document.getElementById('envelopeHint');
  const letterPaper = document.getElementById('letterPaper');
  const letterText = document.getElementById('letterText');

  const loveLetter = `My Love,

Four months ago I didn't know that a voice through a screen could feel like home, but here we are, and somehow you've become the best part of every single day.

I'm grateful for every call that ran too long and every message that made me smile at my phone like an idiot in public. I'm grateful for the good mornings you send before I'm even awake, and the good nights you never forget to say, no matter how tired you are.

People warned me long distance would be hard, and My Babyy, it has been. But it hasn't made us weaker. If anything, it's the reason I know exactly how much I want this, how much I want you, because I chose you without the easy parts, and I'd choose you again.

I look forward to the day a call doesn't have to end. The day "talk to you tomorrow" turns into "see you in five minutes." Until then, I'll take every version of you I can get, the voice notes, the blurry video calls, the 2am texts, all of it.

Thank you for your patience with me, My Wife. Thank you for loving me across time zones and bad signal and all the ordinary days I couldn't be there in person. You make distance feel like a small, temporary inconvenience instead of a wall.

I don't know exactly what our future looks like, but I know you're in it, Love Love Ko. I know I want mornings that aren't goodbyes and a life we don't have to schedule around time differences.

Happy 4th Monthsary, My Candy. Here's to every month after this one.`;

  let letterTyped = false;
  function typeLetter(){
    if(letterTyped) return;
    letterTyped = true;
    letterPaper.classList.add('show');
    letterText.textContent = '';
    let i = 0;
    const speed = 14;
    function step(){
      if(i <= loveLetter.length){
        letterText.textContent = loveLetter.slice(0, i);
        i += 2;
        setTimeout(step, speed);
      }
    }
    step();
  }
  envelope.addEventListener('click', () => {
    envelope.classList.add('opened');
    envelopeHint.textContent = 'opening for you...';
    setTimeout(typeLetter, 500);
  });

  /* ------------------------------------------------------------------ */
  /* GALLERY + LIGHTBOX                                                  */
  /* ------------------------------------------------------------------ */
  const galleryGrid = document.getElementById('galleryGrid');
  const photos = [
    { src: 'assets/images/photo1.jpg', cap: 'that one call that lasted till sunrise' },
    { src: 'assets/images/photo2.jpg', cap: 'the day everything felt easy' },
    { src: 'assets/images/photo3.jpg', cap: 'you, mid-laugh, my favorite' },
    { src: 'assets/images/photo4.jpg', cap: 'a memory I keep replaying' },
    { src: 'assets/images/photo5.jpg', cap: 'still my favorite notification' },
    { src: 'assets/images/photo6.jpg', cap: 'four months, so many little moments' },
  ];
  photos.forEach(p => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `<img src="${p.src}" alt="${p.cap}" loading="lazy"><div class="cap">${p.cap}</div>`;
    item.addEventListener('click', () => openLightbox(p.src, p.cap));
    galleryGrid.appendChild(item);
  });

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  function openLightbox(src, alt){
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('show');
  }
  lightboxClose.addEventListener('click', () => lightbox.classList.remove('show'));
  lightbox.addEventListener('click', (e) => { if(e.target === lightbox) lightbox.classList.remove('show'); });

  /* ------------------------------------------------------------------ */
  /* LOVE METER GAME — catch falling hearts                              */
  /* ------------------------------------------------------------------ */
  const gameStage = document.getElementById('gameStage');
  const meterFill = document.getElementById('meterFill');
  const meterLabel = document.getElementById('meterLabel');
  const gameRestartBtn = document.getElementById('gameRestartBtn');

  let meterValue = 0;
  let gameInterval = null;
  let gameActive = false;
  let gameRevealed = false;

  function updateMeter(){
    meterFill.style.width = meterValue + '%';
    meterLabel.textContent = meterValue + '%';
    if(meterValue >= 100 && !gameRevealed){
      gameRevealed = true;
      revealLoveMeterMessage();
    }
  }

  function revealLoveMeterMessage(){
    stopGame();
    const msg = document.createElement('div');
    msg.className = 'game-message';
    msg.innerHTML = `You just filled my heart the same way you do every day, just by being you.<br><br>I love you, My Wife-to-be. ❤️`;
    gameStage.appendChild(msg);
    requestAnimationFrame(() => msg.classList.add('show'));
    gameRestartBtn.style.display = 'inline-block';
  }

  function spawnFallingHeart(){
    if(!gameActive) return;
    const heart = document.createElement('button');
    heart.className = 'falling-heart';
    heart.textContent = '❤️';
    heart.style.left = (Math.random()*88) + '%';
    const duration = 3.5 + Math.random()*2.5;
    heart.style.animationDuration = duration + 's';
    heart.addEventListener('click', () => {
      if(!gameActive) return;
      meterValue = Math.min(100, meterValue + 8);
      updateMeter();
      heart.remove();
    });
    gameStage.appendChild(heart);
    setTimeout(() => heart.remove(), duration*1000 + 100);
  }

  function startGame(){
    gameActive = true;
    gameRevealed = false;
    meterValue = 0;
    gameRestartBtn.style.display = 'none';
    gameStage.innerHTML = '';
    updateMeter();
    gameInterval = setInterval(spawnFallingHeart, 700);
  }
  function stopGame(){
    gameActive = false;
    clearInterval(gameInterval);
  }
  gameRestartBtn.addEventListener('click', startGame);

  // Start the game the first time its panel is opened
  let gameStarted = false;
  function openPanelWithHooks(id){
    openPanel(id);
    if(id === 'game' && !gameStarted){
      gameStarted = true;
      startGame();
    }
    if(id === 'sky'){
      buildSky();
    }
  }

  /* ------------------------------------------------------------------ */
  /* LOVE NOTES — 50 unique notes, shuffled bag, no repeats until reset  */
  /* ------------------------------------------------------------------ */
  const loveNotes = [
    "Every morning I wake up grateful that somewhere, you're waking up too, thinking of me the way I think of you.",
    "My Love, distance is just proof that what we have is strong enough to survive the miles.",
    "I fall asleep talking to you and wake up smiling because of you. That's not a coincidence, that's us.",
    "You are the last thing on my mind before I sleep and the first thing I check on when I wake up.",
    "My Babyy, no bad day survives a single message from you.",
    "I don't need you in the same room to feel like the luckiest person alive.",
    "Four months in, and you still make my heart do that stupid little flip.",
    "Love Love Ko, you turned \"missing you\" into one of my favorite feelings, because it means I get to love you even from far away.",
    "If loving you from a distance is hard, imagine how much harder it would be not to love you at all.",
    "My Wife (in training, but I already call you that in my head), you make forever sound like a good idea.",
    "Every call with you feels like coming home, even when neither of us has left our rooms.",
    "I count down to our calls the way other people count down to weekends.",
    "You are my favorite notification.",
    "My Candy, you make ordinary Tuesdays feel like something worth celebrating.",
    "I don't just love you. I choose you, every single day, on purpose.",
    "Somewhere between good morning texts and goodnight calls, you became my favorite part of the day.",
    "Distance taught me patience, but you taught me why it's worth it.",
    "My Love, you are the reason my phone battery is always at 12% by noon.",
    "I could read a thousand of your messages and still want one more.",
    "You make me believe that love doesn't need proximity, it just needs you.",
    "Even on my worst days, knowing you exist somewhere out there makes the world feel softer.",
    "My Babyy, I fall for you a little more every time you laugh at your own jokes.",
    "If I could send you a hug through the screen, I would send you a thousand.",
    "Every time you say \"I miss you,\" I hear \"I choose you\" underneath it.",
    "Love Love Ko, you are proof that some people are just worth the wait.",
    "I don't do long distance well with anyone else. Just you. Always you.",
    "You are the softest place my heart has ever landed.",
    "My Wife, our future doesn't feel far away when I think about how far we've already come.",
    "I love that even after four months, you still give me butterflies over text.",
    "You are my favorite person to complain about a bad day to and my favorite person to celebrate a good one with.",
    "My Candy, being loved by you feels like the safest kind of adventure.",
    "I don't need a countdown to know that every day gets us closer to no more goodbyes.",
    "You make \"I love you\" feel brand new every time you say it.",
    "My Love, thank you for never making distance feel like an excuse to love me less.",
    "I smile at my phone more than I probably should, and it's always because of you.",
    "You are the reason I believe timing and distance are no match for the right person.",
    "Every \"goodnight, love you\" from you is my favorite way to end a day.",
    "My Babyy, I love you in every time zone, on every bad connection, through every missed call.",
    "You didn't just enter my life, you made it make more sense.",
    "Love Love Ko, four months with you already feels like something I'll be grateful for forever.",
    "I love the version of me that exists when I'm talking to you, softer, happier, more myself.",
    "My Wife, I already know I want to build a life where we never have to say goodbye after a call again.",
    "You turned \"I miss you\" into one of the most romantic phrases I know.",
    "Even miles away, you still manage to be my favorite hello and my hardest goodbye.",
    "My Candy, you make me want to be patient, present, and better, all at once.",
    "I don't just wait for you. I look forward to you.",
    "You are proof that love can grow even when we can't be in the same room to water it.",
    "My Love, every single day I choose you again, and I will keep choosing you.",
    "You are the calm in my chaos, even through a screen.",
    "Four months down, a lifetime to go, and I would not trade this distance-proof love for anything.",
  ];

  let noteBag = [];
  function refillBag(){
    noteBag = loveNotes.map((_, i) => i);
    for(let i = noteBag.length - 1; i > 0; i--){
      const j = Math.floor(Math.random()*(i+1));
      [noteBag[i], noteBag[j]] = [noteBag[j], noteBag[i]];
    }
  }
  refillBag();
  let notesShown = 0;
  const noteText = document.getElementById('noteText');
  const noteProgress = document.getElementById('noteProgress');
  const noteCard = document.getElementById('noteCard');
  document.getElementById('noteBtn').addEventListener('click', () => {
    if(noteBag.length === 0){
      refillBag();
      notesShown = 0;
    }
    const idx = noteBag.pop();
    notesShown++;
    noteCard.style.opacity = 0;
    setTimeout(() => {
      noteText.textContent = loveNotes[idx];
      noteCard.style.opacity = 1;
    }, 180);
    noteProgress.textContent = `note ${notesShown} of ${loveNotes.length}${noteBag.length===0 ? ' — that was all of them, tap again to reshuffle' : ''}`;
  });
  noteCard.style.transition = 'opacity 0.2s ease';

  /* ------------------------------------------------------------------ */
  /* FLIP CARDS — 30 reasons                                             */
  /* ------------------------------------------------------------------ */
  const reasons = [
    "The way you laugh at your own jokes before you even finish them.",
    "How you remember tiny details from conversations we had weeks ago.",
    "The way you say \"good morning\" like it's a love song.",
    "Your patience with me on days I don't deserve it.",
    "How you turn ordinary stories into the funniest thing I've heard all week.",
    "The way you say my name when you're trying to make a point.",
    "How you still get shy sometimes, even after four months.",
    "Your voice being the best sound in my day, every single day.",
    "The way you care about people, even ones you've never met.",
    "How you never let a call end without saying \"I love you\" first.",
    "Your stubbornness, which is somehow one of my favorite things about you.",
    "The way you get excited over small things and never apologize for it.",
    "How you always ask about my day like it actually matters to you.",
    "Your ability to make distance feel smaller just by picking up the phone.",
    "The way you overthink things and then trust me to help you through it.",
    "How you show up for me even when you're tired.",
    "Your honesty, even when it's easier to say nothing.",
    "The way you talk about your dreams like they're already happening.",
    "How safe I feel telling you literally anything.",
    "Your soft spot for the things you love, it's adorable, not annoying. Okay, maybe a little.",
    "The way you say \"I miss you\" like it still surprises you every time.",
    "How you never make me feel guilty for missing you first.",
    "Your loyalty, which I never have to question.",
    "The way you fight for us on hard days instead of giving up.",
    "How you make plans for our future like they're already promises.",
    "Your softness with the people and things you love.",
    "The way you say \"we\" instead of \"I\" when you talk about tomorrow.",
    "How you still try to impress me, four months in.",
    "Your laugh, the real one, not the polite one.",
    "Simply put: you. All of you, every single day.",
  ];
  const flipGrid = document.getElementById('flipGrid');
  reasons.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'flip-card';
    card.innerHTML = `
      <div class="flip-inner">
        <div class="flip-front">${i+1}</div>
        <div class="flip-back">${r}</div>
      </div>`;
    card.addEventListener('click', () => card.classList.toggle('flipped'));
    flipGrid.appendChild(card);
  });

  /* ------------------------------------------------------------------ */
  /* OUR DISTANCE                                                        */
  /* ------------------------------------------------------------------ */
  const distanceStats = [
    { num: '4', lbl: 'MONTHS TOGETHER', txt: "Four months of choosing each other, on purpose, every single day, no matter the miles between us." },
    { num: '∞', lbl: 'MESSAGES SENT', txt: "More texts than I could ever count, good mornings, good nights, and everything in between." },
    { num: 'countless', lbl: 'CALLS', txt: "Calls that turned into hours, hours that turned into some of my favorite memories of this year." },
    { num: '1', lbl: 'DREAM WE SHARE', txt: "A future with no more goodbyes after a call, just hellos that don't have an end time." },
  ];
  const distanceGrid = document.getElementById('distanceGrid');
  distanceStats.forEach(s => {
    const card = document.createElement('div');
    card.className = 'distance-card';
    card.innerHTML = `<span class="num">${s.num}</span><span class="lbl">${s.lbl}</span><p>${s.txt}</p>`;
    distanceGrid.appendChild(card);
  });

  /* ------------------------------------------------------------------ */
  /* GIFT BOX                                                            */
  /* ------------------------------------------------------------------ */
  const giftBox = document.getElementById('giftBox');
  const giftMessage = document.getElementById('giftMessage');
  let giftOpened = false;
  giftBox.addEventListener('click', () => {
    if(giftOpened) return;
    giftOpened = true;
    giftBox.classList.add('opened');
    launchConfetti();
    setTimeout(() => {
      giftMessage.textContent = "Surprise, My Candy. This box has nothing inside it except one truth: loving you is the easiest, best decision I keep making, over and over, four months and counting.";
      giftMessage.classList.add('show');
    }, 400);
  });

  function launchConfetti(){
    const colors = ['#e8b4bc', '#d4a574', '#f7d9dc', '#faf6f2'];
    for(let i=0;i<60;i++){
      const piece = document.createElement('div');
      const size = 6 + Math.random()*6;
      piece.style.position = 'fixed';
      piece.style.top = '-20px';
      piece.style.left = (Math.random()*100) + 'vw';
      piece.style.width = size + 'px';
      piece.style.height = size*0.4 + 'px';
      piece.style.background = colors[Math.floor(Math.random()*colors.length)];
      piece.style.opacity = '0.9';
      piece.style.zIndex = '80';
      piece.style.borderRadius = '2px';
      piece.style.pointerEvents = 'none';
      piece.style.transform = `rotate(${Math.random()*360}deg)`;
      document.body.appendChild(piece);
      const duration = 2200 + Math.random()*1400;
      const drift = (Math.random()*160 - 80);
      piece.animate([
        { transform: `translate(0,0) rotate(0deg)`, opacity: 0.9 },
        { transform: `translate(${drift}px, 100vh) rotate(${360 + Math.random()*360}deg)`, opacity: 0.2 }
      ], { duration, easing: 'ease-in' });
      setTimeout(() => piece.remove(), duration + 100);
    }
  }

  /* ------------------------------------------------------------------ */
  /* FUTURE DREAMS                                                       */
  /* ------------------------------------------------------------------ */
  const dreams = [
    { title: 'No More Goodbyes', body: "The day video calls turn into \"I'm home,\" and goodbyes stop being something we have to survive." },
    { title: 'Our First Trip Together', body: "Somewhere neither of us has been, so every memory there belongs only to us." },
    { title: 'Meeting Everyone, In Person', body: "Your family, my family, all the people who've heard about \"them\" for months, finally seeing us together." },
    { title: 'A Home With Two Names On It', body: "Nothing fancy. Just a place where your side of the bed is real, not a video call away." },
    { title: 'Slow Sunday Mornings', body: "No time zones, no \"I have to go,\" just us and coffee and nowhere else to be." },
    { title: 'Growing Old, Still Choosing You', body: "Same person, same choice, for the rest of our lives." },
  ];
  const dreamsGrid = document.getElementById('dreamsGrid');
  dreams.forEach(d => {
    const card = document.createElement('div');
    card.className = 'dream-card';
    card.innerHTML = `<h3>${d.title}</h3><p>${d.body}</p>`;
    card.addEventListener('click', () => card.classList.toggle('expanded'));
    dreamsGrid.appendChild(card);
  });

  /* ------------------------------------------------------------------ */
  /* NIGHT SKY                                                           */
  /* ------------------------------------------------------------------ */
  const skyMessages = [
    "I chose you then. I choose you now. I'll choose you tomorrow.",
    "You're my favorite good morning and my hardest goodnight.",
    "Somewhere under this same sky, you're thinking of me too.",
    "Four months. Still counting. Still smiling.",
    "Distance is just a math problem. My love for you isn't.",
    "You are worth every missed call and every rescheduled plan.",
    "One day, this sky won't be the only thing we share.",
    "My Love, you are the softest kind of home.",
    "Every star up there has seen me smile at your texts.",
    "I miss you in a good way, the way that means I get to love you longer.",
    "You make waiting feel like something worth doing.",
    "Even the stars can't outshine how I feel about you.",
  ];
  const skyStage = document.getElementById('skyStage');
  let skyBuilt = false;
  function buildSky(){
    if(skyBuilt) return;
    skyBuilt = true;
    skyMessages.forEach((msg, i) => {
      const star = document.createElement('div');
      star.className = 'sky-star';
      const left = 6 + Math.random()*88;
      const top = 8 + Math.random()*78;
      star.style.left = left + '%';
      star.style.top = top + '%';
      star.style.animationDelay = (Math.random()*2) + 's';

      const bubble = document.createElement('div');
      bubble.className = 'sky-msg';
      bubble.textContent = msg;
      bubble.style.left = left + '%';
      bubble.style.top = top + '%';

      star.addEventListener('click', () => {
        document.querySelectorAll('.sky-msg.show').forEach(b => { if(b !== bubble) b.classList.remove('show'); });
        bubble.classList.toggle('show');
      });

      skyStage.appendChild(star);
      skyStage.appendChild(bubble);
    });
    // scatter a handful of tiny non-interactive background stars for atmosphere
    for(let i=0;i<25;i++){
      const dot = document.createElement('div');
      dot.style.position = 'absolute';
      dot.style.width = '2px'; dot.style.height = '2px';
      dot.style.borderRadius = '50%';
      dot.style.background = 'rgba(250,246,242,0.5)';
      dot.style.left = (Math.random()*98) + '%';
      dot.style.top = (Math.random()*94) + '%';
      dot.style.pointerEvents = 'none';
      skyStage.appendChild(dot);
    }
  }

  /* ------------------------------------------------------------------ */
  /* MUSIC PLAYER                                                        */
  /* ------------------------------------------------------------------ */
  const bgAudio = document.getElementById('bgAudio');
  const musicToggle = document.getElementById('musicToggle');
  const musicProgress = document.getElementById('musicProgress');
  const musicVolume = document.getElementById('musicVolume');

  bgAudio.volume = 0.6;

  musicToggle.addEventListener('click', () => {
    if(bgAudio.paused){
      bgAudio.play().catch(() => {});
      musicToggle.textContent = '❚❚';
    } else {
      bgAudio.pause();
      musicToggle.textContent = '▶';
    }
  });

  bgAudio.addEventListener('timeupdate', () => {
    if(bgAudio.duration){
      musicProgress.value = (bgAudio.currentTime / bgAudio.duration) * 100;
    }
  });
  musicProgress.addEventListener('input', () => {
    if(bgAudio.duration){
      bgAudio.currentTime = (musicProgress.value / 100) * bgAudio.duration;
    }
  });
  musicVolume.addEventListener('input', () => {
    bgAudio.volume = musicVolume.value / 100;
  });

});
