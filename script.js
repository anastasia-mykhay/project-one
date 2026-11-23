const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const D=[
{c:'var(--miri)',n:'Miri',s:'AI concierge',m:'Mobile app · Concept · 2026',t:['Human–AI interaction','Korean service culture','Design system'],r:['Question','How should the concierge get to know a guest who doesn’t want to be asked questions?','Decision','Preferences come from behavior, not questionnaires. It offers one suggestion at a time and declining works as a refinement.'],img:'images/miri.png',w:191,h:415,k:'shot-miri',a:'Miri home screen with a proposed corner table'},
{c:'var(--rentflow)',n:'RentFlow',s:'Property management platform',m:'Web app · Concept · 2026',t:['Human–AI interaction','Information architecture'],r:['Question','How should AI speak to an owner, a tenant and a manager about the same property?','Decision','Each role gets its own dashboard, where AI suggests next to the numbers and the person decides.'],img:'images/rentflow.png',w:432,h:404,k:'shot-rentflow',a:'RentFlow owner dashboard with an AI insight about pending payments'},
{c:'var(--studio)',n:'Studio',s:'AI concept boards',m:'Web app · In progress · 2026',t:['Human–AI interaction','Design tools','Real product data'],r:['Question','How can a designer use AI to assemble a concept board and still feel that every choice is theirs?','Decision','The AI only searches and combines real catalog items. The designer swaps any piece, the budget rebalances, and the client approves.'],img:'',a:''},
{c:'var(--sema)',n:'SeMA',s:'Museum website redesign',m:'Web redesign · Concept · 2026',t:['UX audit','Navigation redesign','Visual hierarchy'],r:['Question','What happens when the findings of a UX audit are applied to an existing museum website?','Decision','The audit set the direction. The redesign followed it through the navigation, the exhibitions and the collection page.'],img:'images/sema.png',w:297,h:465,k:'shot-sema',a:'Redesigned SeMA museum homepage'}
];
document.getElementById('cases').innerHTML=D.map((x,i)=>`<section class="case${i%2?' alt':''}" id="c${i}" aria-label="${x.n}"><div class="block" style="--c:${x.c}"><div class="tx"><div class="meta">0${i+1} · ${x.m}</div><div><h3 class="case-title">${x.n}<span class="sub">${x.s}</span></h3></div><div class="roles"><div class="role"><i class="marker-hollow"></i><div><b>${x.r[0]}</b><span>${x.r[1]}</span></div></div><div class="role dec"><i class="marker-filled"></i><div><b>${x.r[2]}</b><span>${x.r[3]}</span></div></div></div><div class="pills">${x.t.map(t=>`<span>${t}</span>`).join('')}</div></div><div class="shot">${x.img?`<img class="${x.k}" src="${x.img}" width="${x.w}" height="${x.h}" alt="${x.a}">`:`<div class="ph" role="img" aria-label="Placeholder: concept board screens in progress"><i></i><i></i><i></i><i></i><i></i><i></i><p>Screens in progress</p></div>`}</div></div></section>`).join('');
const rail=document.getElementById('rail');
rail.innerHTML='<i class="rail-ring" aria-hidden="true"></i>'+D.map((x,i)=>`<button style="--c:${x.c}" aria-label="Go to project 0${i+1}, ${x.n}"><span class="rail-dot"></span><span>0${i+1}</span></button>`).join('');
const btns=[...rail.querySelectorAll('button')],cases=[...document.querySelectorAll('.case')];
const inView=new Set();
const setCur=i=>{btns.forEach((b,j)=>{b.classList.toggle('cur',j===i);b.setAttribute('aria-current',j===i?'true':'false')});rail.classList.toggle('on',i>=0);if(i>=0)rail.style.setProperty('--i',i)};
const io=new IntersectionObserver(es=>{es.forEach(e=>{const k=cases.indexOf(e.target);e.isIntersecting?inView.add(k):inView.delete(k)});setCur(inView.size?Math.min(...inView):-1)},{rootMargin:'-40% 0px -40% 0px'});
cases.forEach(c=>io.observe(c));
btns.forEach((b,j)=>{
b.addEventListener('click',()=>cases[j].scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'}));
});
setCur(-1);

(()=>{const cols=D.map(x=>x.c),m=document.getElementById('hero-dots');
const ds=cols.map(c=>{const d=document.createElement('i');d.className='hero-dot';d.style.setProperty('--c',c);m.appendChild(d);return d});
const ring=document.createElement('i');ring.className='hero-ring';m.appendChild(ring);
if(reduce){ds.forEach(d=>d.classList.add('on'));return}
const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{while(1){await sl(900);for(let k=0;k<4;k++){ring.style.setProperty('--k',k);ring.style.opacity=1;await sl(550);ds[k].classList.add('on');await sl(550)}await sl(500);ring.style.opacity=0;await sl(1400);ds.forEach(d=>d.classList.remove('on'));await sl(900)}})();})();

(()=>{const up=document.querySelector('.up');up.addEventListener('click',()=>{up.classList.add('go');window.scrollTo({top:0,behavior:reduce?'auto':'smooth'});setTimeout(()=>up.classList.remove('go'),1600)})})();

(()=>{if(reduce)return;
let last=scrollY,dir=null;
addEventListener('scroll',()=>{dir=scrollY>last?'down':scrollY<last?'up':dir;last=scrollY},{passive:true});
const decs=[...document.querySelectorAll('.dec')];
decs.forEach(d=>{if(d.getBoundingClientRect().top>innerHeight*.5)d.closest('.case').classList.add('arm')});
const io=new IntersectionObserver(es=>es.forEach(e=>{const s=e.target.closest('.case');
if(e.intersectionRatio>=.9){if(dir==='down'){s.classList.remove('go');const q=s.querySelector('.marker-hollow'),m=s.querySelector('.dec>i');s.style.setProperty('--dy',(m.getBoundingClientRect().top-q.getBoundingClientRect().top)+'px');void s.offsetWidth;s.classList.remove('arm');s.classList.add('go')}else s.classList.remove('go','arm')}
else if(e.intersectionRatio===0&&e.boundingClientRect.top>innerHeight*.5){s.classList.remove('go');s.classList.add('arm')}}),{threshold:[0,.9],rootMargin:'0px 0px -10% 0px'});
decs.forEach(d=>io.observe(d))})();

(()=>{if(reduce)return;const g=document.querySelector('.projects-dots'),h=g.closest('.sec-title');
const arm=()=>{g.classList.remove('go');g.classList.add('arm')},play=()=>{g.classList.remove('arm','go');void g.offsetWidth;g.classList.add('go')};
arm();
let on=false;const io=new IntersectionObserver(es=>{const r=es[es.length-1].intersectionRatio;if(r>=.6){if(!on){on=true;play()}}else if(r===0&&on){on=false;arm()}},{threshold:[0,.6]});io.observe(h);
addEventListener('pageshow',e=>{if(e.persisted){on=false;arm();io.unobserve(h);io.observe(h)}});})();
