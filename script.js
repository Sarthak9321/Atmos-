const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.i);toast.i=setTimeout(()=>t.classList.remove('show'),2400)};
// Hero photo: a warm light follows your cursor
const hi=$('#hi');hi.addEventListener('pointermove',e=>{const r=hi.getBoundingClientRect();hi.style.setProperty('--x',e.clientX-r.left+'px');hi.style.setProperty('--y',e.clientY-r.top+'px')});
// Products
const P=[['luma','Luma',129,'Table lamp','Bestseller',[['#d9d2c0','Chalk'],['#b89a7e','Sand'],['#6e7556','Olive']]],
['arc','Arc',289,'Floor lamp','A house favorite',[['#b5934f','Aged brass'],['#4f3f33','Bronze']]],
['sol','Sol',89,'Portable lamp','Goes anywhere',[['#c08a3e','Honey'],['#e5dcc4','Cream'],['#6b4a38','Cocoa']]],
['forma','Forma',179,'Pendant','Soft by nature',[['#b5934f','Natural'],['#e8dfc8','Ivory']]]];
$('#grid').innerHTML=P.map(p=>`<article class="card"><div class="pi"><img src="img/${p[0]}.jpg" alt="${p[1]} ${p[3].toLowerCase()}" loading="lazy"><span class="badge">${p[4]}</span><button class="heart" aria-label="Save ${p[1]}">♡</button><button class="add" data-n="${p[1]}">Add to bag — $${p[2]}</button></div>
<div class="r"><h3>${p[1]}</h3><span>$${p[2]}</span></div><small>${p[3]} · Warm glow, always</small>
<div class="sw">${p[5].map((c,i)=>`<button class="${i?'':'on'}" style="background:${c[0]}" data-c="${c[1]}" aria-label="${c[1]}"></button>`).join('')}</div><small class="cn">${p[5].map(c=>c[1]).join(' · ')}</small></article>`).join('');
$('#grid').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
 if(b.classList.contains('heart')){const on=b.classList.toggle('on');b.textContent=on?'♥':'♡'}
 if(b.dataset.n){$('#count').textContent=+$('#count').textContent+1;toast(b.dataset.n+' is on its way to a warmer home')}
 if(b.dataset.c){const c=b.closest('.card');c.querySelectorAll('.sw button').forEach(s=>s.classList.toggle('on',s===b));c.querySelector('.cn').textContent=b.dataset.c}});
$('#cart').onclick=()=>toast(+$('#count').textContent?$('#count').textContent+' in your bag':'Your bag is empty. Find your glow first.');
// Light off / on slider
const cmp=$('#cmp'),rng=$('#rng'),set=v=>cmp.style.setProperty('--p',v+'%');
rng.oninput=()=>{set(rng.value);dem=false};let dem=true;set(50);
new IntersectionObserver(([e],o)=>{if(!e.isIntersecting)return;o.disconnect();const t0=performance.now();
 (function f(t){if(!dem)return;const k=Math.min((t-t0)/2600,1),v=90-80*(1-Math.pow(1-k,3))*1+ (k<1?0:0);rng.value=v;set(v);if(k<1)requestAnimationFrame(f)})(t0)},{threshold:.6}).observe(cmp);
// Kelvin tryout colours the sign-off wordmark glow
const k=$('#k');k.oninput=()=>{$('#ko').textContent=k.value+'K';const t=(k.value-2200)/1800;document.documentElement.style.setProperty('--tan',`rgb(${212-t*40|0},${180+t*10|0},${131+t*90|0})`)};
// Footer wordmark lights up where you point
const w=$('#word');w.addEventListener('pointermove',e=>{const r=w.getBoundingClientRect();w.style.setProperty('--x',e.clientX-r.left+'px')});
// Newsletter
$('#f').addEventListener('submit',e=>{e.preventDefault();const i=$('#em'),ok=/^\S+@\S+\.\S+$/.test(i.value);i.classList.toggle('bad',!ok);
 $('#msg').textContent=ok?'You’re in. Your 10% off is on its way.':'Enter an email like name@home.com to get your 10% off.';if(ok)i.value=''});
