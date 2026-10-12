
/* =====================================================
   ✏️ EDIT HERE #1 — YOUR PHOTOS
   Your photos are inside the "images" folder.
   Filenames: 1.jpg to 20.jpg
   ===================================================== */

const girlfriendPhotos = Array.from(
  { length: 20 },
  (_, i) => `images/${i + 1}.jpg`
);


/* =====================================================
   ✏️ EDIT HERE #2 — YOUR LOVE LETTER
   Replace the text between the backticks. Line breaks are kept.
   ===================================================== */
const loveLetter = `To My One and Only

Hii babyyy, happy monthsary po hehe `;

const $ = s => document.querySelector(s);
const WINS_NEEDED = 2;
const EMOJI = {rock:"✊",paper:"✋",scissors:"✌️"};
const BEATS = {rock:"scissors",paper:"rock",scissors:"paper"};
const WIN_MSG = ["You win! Of course you do ♡","Point for you, babyy! ✨","Smarty pants 💕"];
const LOSE_MSG = ["AI wins… but you've got this ♡","Oops! Try again, love 💗","So close, babyy!"];
let score, busy;

/* ---------- Screen switching ---------- */
function show(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  $("#"+id).classList.add("active");
}

/* ---------- Falling photos (broken files are skipped) ---------- */
function spawnPhoto(src){
  const img = new Image();
  img.onload = () => {
    const w = 70 + Math.random()*(innerWidth<600?40:70);
    const d = document.createElement("div");
    d.className = "photo";
    d.style.cssText = `left:${Math.random()*95}%;width:${w}px;height:${w*1.2}px;
      --dx:${(Math.random()-.5)*160}px;--r1:${(Math.random()-.5)*30}deg;--r2:${(Math.random()-.5)*60}deg;
      animation-duration:${14+Math.random()*12}s;animation-delay:${-Math.random()*20}s`;
    d.appendChild(img);
    $("#photo-layer").appendChild(d);
  };
  img.alt = ""; img.onerror = () => {}; img.src = src;
}
const count = innerWidth<600 ? 2 : 3;   // copies per photo; keeps things light
girlfriendPhotos.forEach(p => { for(let i=0;i<count;i++) spawnPhoto(p); });

$("#motion-toggle").onclick = e => {
  const on = document.body.classList.toggle("calm");
  e.target.setAttribute("aria-pressed", on);
  e.target.textContent = on ? "Lively photos" : "Calm photos";
};

/* ---------- Hearts ---------- */
function hearts(x, y, n=6, symbols=["💗","💖","♡","✨"]){
  for(let i=0;i<n;i++){
    const h = document.createElement("span");
    h.className = "heart";
    h.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    h.style.cssText = `left:${x+(Math.random()-.5)*60}px;top:${y}px;bottom:auto;font-size:${14+Math.random()*18}px;
      --dx:${(Math.random()-.5)*120}px;--t:${2+Math.random()*2}s`;
    $("#heart-layer").appendChild(h);
    setTimeout(()=>h.remove(),4200);
  }
}
document.addEventListener("click", e => hearts(e.clientX, e.clientY, 4));
const burst = (n=30) => { for(let i=0;i<n;i++) setTimeout(()=>hearts(Math.random()*innerWidth, innerHeight*.9, 1),i*60); };
setInterval(()=>{ if(!document.hidden) hearts(Math.random()*innerWidth, innerHeight, 1, ["♡","💗"]); }, 2500);

/* ---------- Game ---------- */
function reset(){
  score = {p:0,a:0,t:0}; busy = false;
  $("#player-pick").textContent = $("#ai-pick").textContent = "❔";
  $("#result").textContent = "Choose your move!";
  $("#again-btn").classList.add("hidden");
  document.querySelectorAll(".choice").forEach(b=>b.disabled=false);
  render();
}
const render = () => { $("#s-player").textContent=score.p; $("#s-ai").textContent=score.a; $("#s-tie").textContent=score.t; };
const pick = a => a[Math.floor(Math.random()*a.length)];

function play(move){
  if(busy) return;
  const ai = pick(["rock","paper","scissors"]);
  $("#player-pick").textContent = EMOJI[move]; $("#ai-pick").textContent = EMOJI[ai];
  ["#player-pick","#ai-pick"].forEach(s=>{const el=$(s);el.classList.remove("pop");void el.offsetWidth;el.classList.add("pop");});
  let msg;
  if(move===ai){ score.t++; msg="It's a tie! Go again ♡"; }
  else if(BEATS[move]===ai){ score.p++; msg=pick(WIN_MSG); burst(10); }
  else { score.a++; msg=pick(LOSE_MSG); }
  render(); $("#result").textContent = msg;

  if(score.p>=WINS_NEEDED){ busy=true; $("#result").textContent="You beat me! 🎉 Something special is coming…"; burst(40);
    setTimeout(()=>{ show("reward"); }, 1800); }
  else if(score.a>=WINS_NEEDED){ busy=true; $("#result").textContent="I got this round — but you can beat me! ♡";
    document.querySelectorAll(".choice").forEach(b=>b.disabled=true);
    $("#again-btn").classList.remove("hidden"); }
}

/* ---------- Chest & letter ---------- */
function openChest(){
  const c = $("#chest"); if(c.classList.contains("open")) return;
  c.classList.add("open"); $("#open-btn").classList.add("hidden"); burst(40);
  setTimeout(()=>{ showLetter(); }, 1800);
}
function showLetter(){
  $("#letter-text").textContent = loveLetter;
  $("#final").classList.add("hidden");
  show("letter-screen");
  $(".letter").scrollTop = 0;
  setTimeout(()=>{ $("#final").classList.remove("hidden"); burst(25); }, 3500);
}

/* ---------- Wiring ---------- */
$("#start-btn").onclick = () => { reset(); show("game"); };
document.querySelectorAll(".choice").forEach(b => b.onclick = () => play(b.dataset.move));
$("#again-btn").onclick = reset;
$("#chest").onclick = $("#open-btn").onclick = openChest;
$("#reread-btn").onclick = showLetter;
$("#replay-btn").onclick = () => { $("#chest").classList.remove("open"); $("#open-btn").classList.remove("hidden"); reset(); show("game"); };
/* Testing shortcut: add #win to the URL (index.html#win) to jump to the chest */
if(location.hash==="#win") show("reward");
reset();
