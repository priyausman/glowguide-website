/* ============ NAV ============ */
const header=document.getElementById('header'),burger=document.getElementById('hamburger'),links=document.getElementById('navLinks');
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>40));
burger.onclick=()=>links.classList.toggle('open');
links.querySelectorAll('a').forEach(a=>a.onclick=()=>links.classList.remove('open'));

/* ============ PRODUCTS DATA ============ */
const PRODUCTS=[
 {id:1,emoji:"🧼",name:"Gentle Jelly Cleanser",price:"$9",ing:"Glycerin · Aloe · Green Tea",type:["all"],concern:["sensitive","dullness"],tag:"Cleanser",desc:"A soft, low-pH gel that cleans without stripping — perfect first step for everyone."},
 {id:2,emoji:"🌿",name:"2% Salicylic Acid Toner",price:"$11",ing:"Salicylic Acid (BHA) · Witch Hazel",type:["oily","combination"],concern:["acne","blackheads"],tag:"Exfoliant",desc:"Unclogs pores, dissolves blackheads, and keeps breakouts under control."},
 {id:3,emoji:"💧",name:"Hyaluronic Dew Serum",price:"$14",ing:"Hyaluronic Acid · Vitamin B5",type:["dry","normal","combination"],concern:["dryness","dullness"],tag:"Serum",desc:"A weightless drink of water for thirsty skin. Plumps, smooths, and preps for moisturizer."},
 {id:4,emoji:"🍊",name:"Vitamin C Glow Serum",price:"$16",ing:"10% Vitamin C · Ferulic Acid",type:["normal","oily","combination","dry"],concern:["dark spots","dullness"],tag:"Serum",desc:"Fades dark spots and post-acne marks while giving skin that lit-from-within glow."},
 {id:5,emoji:"🌾",name:"Ceramide Repair Cream",price:"$13",ing:"Ceramides · Shea Butter · Squalane",type:["dry","sensitive","normal"],concern:["dryness","sensitive"],tag:"Moisturizer",desc:"Rebuilds the moisture barrier so dry, flaky, reactive skin stays calm and soft."},
 {id:6,emoji:"🪶",name:"Oil-Free Gel Moisturizer",price:"$12",ing:"Niacinamide · Hyaluronic Acid",type:["oily","combination"],concern:["acne","dullness"],tag:"Moisturizer",desc:"Lightweight hydration that never feels greasy. Yes, oily skin needs moisturizer too!"},
 {id:7,emoji:"🌼",name:"Centella Calm Cream",price:"$12",ing:"Centella Asiatica · Madecassoside",type:["sensitive","dry","normal"],concern:["sensitive","acne"],tag:"Moisturizer",desc:"Soothes redness and irritation while healing angry, stressed-out skin."},
 {id:8,emoji:"☀️",name:"Invisible Daily SPF 50",price:"$10",ing:"SPF 50 · Vitamin E · No White Cast",type:["all"],concern:["dark spots","dullness"],tag:"Sunscreen",desc:"The non-negotiable final step. Prevents dark spots from getting darker. Every. Single. Day."},
 {id:9,emoji:"🍃",name:"Niacinamide 10% Serum",price:"$12",ing:"Niacinamide · Zinc PCA",type:["oily","combination","normal"],concern:["dark spots","acne","dullness"],tag:"Serum",desc:"Minimizes pores, fades marks, and balances oil — the ultimate multi-tasker."},
 {id:10,emoji:"🧂",name:"PHA Glow Tonic",price:"$10",ing:"PHA · Rose Water",type:["sensitive","dry","normal"],concern:["dullness","dryness"],tag:"Exfoliant",desc:"The gentlest exfoliant. Lifts dullness and flakes without stinging sensitive skin."},
 {id:11,emoji:"🩹",name:"Spot Rescue Gel",price:"$8",ing:"Benzoyl Peroxide 2.5% · Tea Tree",type:["oily","combination"],concern:["acne"],tag:"Spot Treatment",desc:"Dab on active breakouts overnight and wake up to a visibly calmer pimple."},
 {id:12,emoji:"🍯",name:"Honey Barrier Mask",price:"$9",ing:"Manuka Honey · Oat Extract",type:["dry","sensitive","normal"],concern:["dryness","sensitive","dullness"],tag:"Mask",desc:"A 10-minute weekly hug for stressed skin. Deeply nourishes and restores glow."}
];
const TYPE_LABEL={all:"All Skin Types",normal:"Normal",dry:"Dry",oily:"Oily",combination:"Combination",sensitive:"Sensitive"};
const CONCERN_LABEL={acne:"Acne & Breakouts",blackheads:"Blackheads",darkspots:"Dark Spots",dryness:"Dryness",dullness:"Dullness",sensitive:"Sensitivity"};

/* ============ PRODUCT GRID + FILTERS ============ */
const grid=document.getElementById('prodGrid'),fbar=document.getElementById('filterBar');
const filters=[["all","All"],["normal","Normal"],["dry","Dry"],["oily","Oily"],["combination","Combination"],["sensitive","Sensitive"],["acne","Acne"],["dark spots","Dark Spots"],["dryness","Dryness"],["dullness","Dullness"],["blackheads","Blackheads"],["sensitive-c","Sensitive"]];
fbar.innerHTML=filters.map((f,i)=>`<button class="filter-btn${i===0?' active':''}" data-f="${f[0]}">${f[1]}</button>`).join('');
fbar.addEventListener('click',e=>{
  if(!e.target.dataset.f)return;
  fbar.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  e.target.classList.add('active');renderProducts(e.target.dataset.f);
});
function renderProducts(f="all"){
  let list=PRODUCTS;
  if(f==="sensitive-c")list=PRODUCTS.filter(p=>p.concern.includes("sensitive"));
  else if(f!=="all"){
    if(TYPE_LABEL[f])list=PRODUCTS.filter(p=>p.type.includes(f)||p.type.includes("all"));
    else list=PRODUCTS.filter(p=>p.concern.includes(f==="dark spots"?"darkspots":f));
  }
  grid.innerHTML=list.length?list.map(p=>`
    <div class="prod-card">
      <div class="prod-img">${p.emoji}</div>
      <div class="prod-body">
        <span class="prod-tag">${p.tag}</span>
        <h3>${p.name}</h3>
        <div class="prod-price">${p.price}</div>
        <div class="prod-meta">🧪 <b>Key ingredients:</b> ${p.ing}</div>
        <div class="prod-meta">🧏 <b>Suits:</b> ${p.type.map(t=>TYPE_LABEL[t]).join(", ")}</div>
        <div class="prod-meta">🎯 <b>Targets:</b> ${p.concern.map(c=>CONCERN_LABEL[c==="darkspots"?"darkspots":c]).join(", ")}</div>
        <div class="prod-meta" style="margin-top:8px">${p.desc}</div>
      </div>
    </div>`).join('')
  :`<div class="no-results">No products match that filter yet — try another! 💜</div>`;
}
renderProducts();

/* ============ QUIZ ENGINE ============ */
const QUESTIONS=[
 {q:"How does your skin feel about 30 minutes after cleansing?",opts:[
   {t:"Tight, rough, or flaky — like it needs moisture NOW",s:{dry:3,dryness:2}},
   {t:"Shiny and slick all over my face",s:{oily:3,acne:1}},
   {t:"Shiny only on my forehead, nose, and chin",s:{combination:3,blackheads:1}},
   {t:"Comfortable, soft, and balanced",s:{normal:3}},
   {t:"Tingly, red, or irritated easily",s:{sensitive:3,sensitive:3}}]},
 {q:"Where does shine appear by midday?",opts:[
   {t:"Everywhere — my whole face glows (not in a good way)",s:{oily:3}},
   {t:"Mainly my T-zone (forehead + nose + chin)",s:{combination:3,blackheads:1}},
   {t:"Nowhere — my skin stays matte, maybe even flaky",s:{dry:3,dryness:1}},
   {t:"Just a little, and only when it's hot or humid",s:{normal:2}},
   {t:"Shine isn't the issue — redness is",s:{sensitive:3}}]},
 {q:"How visible are your pores?",opts:[
   {t:"Large and noticeable, especially on my nose",s:{oily:3,blackheads:2}},
   {t:"Visible in the T-zone, small on my cheeks",s:{combination:2}},
   {t:"Tiny and barely visible",s:{dry:2,normal:1}},
   {t:"Average — not something I notice much",s:{normal:2}}]},
 {q:"How does your skin react to new products?",opts:[
   {t:"Burns, itches, or turns red almost immediately",s:{sensitive:4}},
   {t:"Sometimes gets a little red or stingy",s:{sensitive:2,dry:1}},
   {t:"Usually fine — maybe a small breakout at first",s:{normal:2,oily:1}},
   {t:"No reaction at all",s:{normal:2}}]},
 {q:"How often do you get pimples or breakouts?",opts:[
   {t:"Frequently — several active ones most of the time",s:{acne:4,oily:1}},
   {t:"Occasionally, usually around my period or exams",s:{acne:2}},
   {t:"Rarely, maybe one small one a month",s:{acne:0,normal:1}},
   {t:"Almost never",s:{normal:2}}]},
 {q:"Blackheads — where are you with them?",opts:[
   {t:"All over my nose and chin, they're very visible",s:{blackheads:4,oily:1}},
   {t:"A few on my nose that keep coming back",s:{blackheads:2}},
   {t:"Maybe one or two, honestly not a big deal",s:{blackheads:1}},
   {t:"What's a blackhead? 😅",s:{normal:1}}]},
 {q:"Any dark spots or marks left behind after pimples?",opts:[
   {t:"Yes, several spots that take forever to fade",s:{darkspots:4}},
   {t:"A few marks from old breakouts",s:{darkspots:2}},
   {t:"Hardly any — my skin clears up clean",s:{normal:1}}]},
 {q:"How does your skin feel about moisturizing?",opts:[
   {t:"Desperate for it — my skin drinks it up and still feels dry",s:{dry:3,dryness:3}},
   {t:"I need a light one — heavy creams feel suffocating",s:{oily:2,combination:1}},
   {t:"I use it, but my T-zone doesn't need much",s:{combination:2}},
   {t:"My skin is pretty content either way",s:{normal:2}},
   {t:"Even moisturizers sometimes sting my skin",s:{sensitive:2,dryness:1}}]},
 {q:"Does your skin ever look dull or tired?",opts:[
   {t:"Yes, it looks grey and lifeless even when I'm well-rested",s:{dullness:3,dry:1}},
   {t:"Sometimes, especially in winter or after late nights",s:{dullness:2}},
   {t:"Not really — my skin has a natural glow",s:{normal:1,dullness:0}}]},
 {q:"In photos without filter, how would you describe your skin?",opts:[
   {t:"Red or blotchy in patches",s:{sensitive:3}},
   {t:"Shiny with some texture and bumps",s:{oily:2,acne:1,blackheads:1}},
   {t:"Dry patches and flaking around my nose/cheeks",s:{dry:2,dryness:2}},
   {t:"Uneven with dark spots from old pimples",s:{darkspots:2}},
   {t:"Pretty even and smooth overall",s:{normal:2}}]}
];
const TYPE_INFO={
 normal:{emoji:"✨",name:"Normal",desc:"Balanced, low-maintenance skin! Your focus: keep it that way with gentle cleansing, light hydration, and daily SPF."},
 dry:{emoji:"💧",name:"Dry",desc:"Your skin craves moisture. Prioritize hydrating serums, ceramide-rich creams, and avoid harsh foaming cleansers."},
 oily:{emoji:"🌟",name:"Oily",desc:"Your skin produces extra sebum — but that's built-in anti-aging! Balance oil with lightweight hydration and gentle BHA exfoliation."},
 combination:{emoji:"🌗",name:"Combination",desc:"The classic T-zone situation. Use lighter layers overall and treat your T-zone with a little extra care where needed."},
 sensitive:{emoji:"🌸",name:"Sensitive",desc:"Your skin needs calm and patience. Fragrance-free, soothing ingredients like centella and ceramides are your best friends."}
};

let qi=0, scores={};
const $=id=>document.getElementById(id);
const startBox=$("quizStart"),qBox=$("quizQuestion"),rBox=$("quizResult");
$("startBtn").onclick=()=>{qi=0;scores={};startBox.classList.add("quiz-hidden");rBox.classList.add("quiz-hidden");qBox.classList.remove("quiz-hidden");showQ();};
$("retakeBtn").onclick=()=>{startBox.classList.remove("quiz-hidden");rBox.classList.add("quiz-hidden");$("quizBar").style.width="0";};
$("qBack").onclick=()=>{if(qi>0){qi--;showQ();}};

function showQ(){
  const Q=QUESTIONS[qi];
  $("qStep").textContent=`Question ${qi+1} of ${QUESTIONS.length}`;
  $("qText").textContent=Q.q;
  $("qCount").textContent=`${qi+1} / ${QUESTIONS.length}`;
  $("quizBar").style.width=(qi/QUESTIONS.length*100)+"%";
  $("qBack").style.visibility=qi===0?"hidden":"visible";
  const box=$("qOpts");box.innerHTML="";
  Q.opts.forEach((o,i)=>{
    const b=document.createElement("button");
    b.className="quiz-opt";b.textContent=o.t;
    b.onclick=()=>{Object.entries(o.s).forEach(([k,v])=>scores[k]=(scores[k]||0)+v);qi++;
      if(qi<QUESTIONS.length)showQ();else showResult();};
    box.appendChild(b);
  });
}
function showResult(){
  $("quizBar").style.width="100%";
  qBox.classList.add("quiz-hidden");rBox.classList.remove("quiz-hidden");
  const typeKeys=["normal","dry","oily","combination","sensitive"];
  let bestType="normal",best=-1;typeKeys.forEach(t=>{if((scores[t]||0)>best){best=scores[t];bestType=t;}});
  const info=TYPE_INFO[bestType];
  $("resType").textContent=`${info.emoji} ${info.name}`;
  $("resDesc").textContent=info.desc;
  const cKeys=["acne","blackheads","darkspots","dryness","dullness","sensitive"];
  const sorted=cKeys.map(k=>({k,v:scores[k]||0})).filter(c=>c.v>0).sort((a,b)=>b.v-a.v).slice(0,3);
  $("resConcerns").innerHTML=sorted.length?sorted.map(c=>`<span class="chip">${CONCERN_LABEL[c.k]}</span>`).join(""):`<span class="chip">No major concerns — just maintenance! ✨</span>`;
  /* pick up to 4 recommendations: 2 by type, 2 by top concerns */
  let picks=[];
  const byType=PRODUCTS.filter(p=>p.type.includes(bestType)||p.type.includes("all"));
  const byConcern=PRODUCTS.filter(p=>p.concern.some(c=>sorted.map(s=>s.k).includes(c)));
  const merged=[...byType,...byConcern,...PRODUCTS.filter(p=>p.type.includes("all"))];
  for(const p of merged){if(picks.length>=4)break;if(!picks.includes(p))picks.push(p);}
  $("resRecos").innerHTML=picks.map(p=>`
    <div class="rec-card">
      <div class="p-emoji">${p.emoji}</div>
      <h4>${p.name}</h4>
      <div class="price">${p.price} · ${p.tag}</div>
      <small>🧪 ${p.ing}</small>
      <small>🧏 ${p.type.map(t=>TYPE_LABEL[t]).join(", ")}</small>
      <small>🎯 ${p.concern.map(c=>CONCERN_LABEL[c]).join(", ")}</small>
    </div>`).join("");
  rBox.scrollIntoView({behavior:"smooth",block:"center"});
}

/* ============ SPA SMOOTH-SCROLL NAVIGATION (same-tab, no URL change) ============ */
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click', function(e){
    var id = a.getAttribute('href');
    if(id.length < 2) return;
    var target = document.querySelector(id);
    if(!target) return;
    e.preventDefault();            // never change the URL hash
    target.scrollIntoView({behavior:'smooth', block:'start'});
    // close mobile menu after navigating
    var nl = document.getElementById('navLinks');
    if(nl) nl.classList.remove('open');
  });
});
/* Belt-and-suspenders: block any programmatic new-tab attempts */
window.open = function(){ return null; };