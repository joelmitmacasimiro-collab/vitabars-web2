// Reusable flavor views. Add a record to CATALOG_DATA to populate all views.
const PRODUCTS = CATALOG_DATA;
const FLAVORS = Object.fromEntries(PRODUCTS.filter(p=>p.nutrition).map(p=>[p.id,p]));
const EXPLORABLE = PRODUCTS.filter(p=>p.nutrition && p.discover!==false).map(p=>p.id);
const NUTRITION_ROWS = [
 ['Porción','weight'],['Calorías','kcal',' kcal'],['Grasa total','fat'],
 ['Grasa saturada','sat'],['Grasas trans','trans'],['Sodio','sodium'],
 ['Carbohidratos totales','carbs'],['Azúcar total','sugar'],
 ['Azúcares añadidos','added'],['Fibra dietética','fiber'],['Proteína','protein']
];
const escapeHTML = value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function flavorPhoto(id){const f=FLAVORS[id];return `<img class="flavor-photo" src="${escapeHTML(f.image)}" alt="Empaque de ${escapeHTML(f.short)}" width="405" height="1010" decoding="async">`}
function ingredientPhoto(id){const f=FLAVORS[id];return f.ingredientImage?`<img class="ingredient-photo" src="${escapeHTML(f.ingredientImage)}" alt="" aria-hidden="true" width="350" height="300" loading="lazy" decoding="async">`:''}
function flavorCard(id){const f=FLAVORS[id];return `<article class="flavor-card"><a class="flavor-stage flavor-stage-${id}" href="#sabor/${id}" aria-label="Conocer ${escapeHTML(f.short)}">${flavorPhoto(id)}${ingredientPhoto(id)}</a><p class="flavor-category">${escapeHTML(f.line)}</p><h2>${escapeHTML(f.short)}</h2><a class="pill flavor-discover" href="#sabor/${id}">Conocer sabor <span aria-hidden="true">↗</span></a></article>`}
function renderFlavors(){const ids=[...EXPLORABLE,...Object.keys(FLAVORS).filter(id=>!EXPLORABLE.includes(id))];document.querySelector('#flavor-grid').innerHTML=ids.map(flavorCard).join('')}
function renderFilters(){
 const labels={whey:'ISO Whey',plant:'Plant-Based',superfoods:'Superfoods',mini:'Mini'};
 const categories=[...new Set(PRODUCTS.map(p=>p.category))];
 document.querySelector('#catalog-filters').innerHTML=[['all','Todos'],...categories.map(c=>[c,labels[c]||PRODUCTS.find(p=>p.category===c).line])].map(([id,label])=>`<button class="pill${id==='all'?' active':''}" data-filter="${escapeHTML(id)}" aria-pressed="${id==='all'}">${escapeHTML(label)}</button>`).join('');
}
function renderFlavorDetail(id){
 const f=FLAVORS[id];if(!f)return;
 const n=f.nutrition;
 const rows=NUTRITION_ROWS.filter(([,key])=>n[key]!=null).map(([title,key,suffix=''])=>`<tr><th scope="row">${title}</th><td>${escapeHTML(n[key])}${suffix}</td></tr>`).join('');
 document.querySelector('#flavor-detail-content').innerHTML=`
 <div class="flavor-overview">
  <figure class="flavor-detail-photo flavor-stage flavor-stage-${id}">${flavorPhoto(id)}${ingredientPhoto(id)}</figure>
  <article class="flavor-detail-copy">
   <p class="eyebrow">${escapeHTML(f.line)}</p>
   <h1 tabindex="-1" id="flavor-detail-title">${escapeHTML(f.short)}</h1>
   <p class="flavor-intro">${escapeHTML(f.tag)}</p>
   <div class="flavor-traits">${f.traits.map(t=>`<span>${escapeHTML(t)}</span>`).join('')}</div>
   <section class="flavor-ingredients"><h2>Lo que lleva.</h2><ul>${f.ingredients.map(t=>`<li>${escapeHTML(t)}</li>`).join('')}</ul><p class="ingredient-note">${escapeHTML(f.contains)}</p></section>
   <section class="flavor-moment"><h2>Tu momento.</h2><p>${escapeHTML(f.moment)}</p></section>
   <a class="pill flavor-buy" href="#catalogo" data-buy-flavor="${id}">Ver en el catálogo <span aria-hidden="true">↗</span></a>
  </article>
 </div>
 <section class="flavor-nutrition" aria-labelledby="nutrition-title">
  <div class="nutrition-heading"><p class="eyebrow">EN CADA BARRA</p><h2 id="nutrition-title">Información nutricional</h2><p>${escapeHTML(f.short)}<br>1 porción por envase · ${escapeHTML(n.weight)}</p></div>
  <table><caption class="sr-only">Información nutricional de ${escapeHTML(f.short)}, por barra de ${escapeHTML(n.weight)}</caption><thead><tr><th scope="col">Nutriente</th><th scope="col">Por barra</th></tr></thead><tbody>${rows}</tbody></table>
 </section>
 <p class="nutrition-source">Valores e ingredientes según la información proporcionada por Vitabars. Los momentos sugeridos son ideas para disfrutarla.</p>`;
}

const $=s=>document.querySelector(s), money=n=>`S/ ${n.toFixed(2)}`;
let carouselPositions=[0],carouselIndex=0;
let cart={},currentFilter='all',toastTimer,homeScroll=0,activeView='',lastStep=-1,scrollFrame=0;
try{const saved=JSON.parse(localStorage.getItem('vitabars-cart-v1')||'{}');PRODUCTS.forEach(p=>{const q=saved?.[p.id];if(Number.isInteger(q)&&q>0&&q<=99)cart[p.id]=q})}catch{}
const filtered=()=>PRODUCTS.filter(p=>currentFilter==='all'||p.category===currentFilter);
const total=()=>PRODUCTS.reduce((s,p)=>s+p.price*(cart[p.id]||0),0);
const hasReference=()=>PRODUCTS.some(p=>cart[p.id]&&p.reference);
function announce(s){$('#toast').textContent=s;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),2500)}
function renderProducts(){const list=filtered();$('#products').innerHTML=list.map(p=>`<article class="product-card" data-product="${p.id}"><button class="product-image product-image-${p.id}" data-detail="${p.id}" aria-label="Ver fotografía y detalles de ${p.name}"><span class="product-photo-shadow">${FLAVORS[p.id]?flavorPhoto(p.id):`<img class="catalog-pack pack-${p.id}" src="${p.image}" width="707" height="707" alt="Empaque original de ${p.name}" loading="lazy" decoding="async">`}</span></button><div class="product-meta"><p class="product-line">${p.line}</p><h2>${p.name}</h2><p class="presentation">${p.presentation}</p><div class="price"><strong>${money(p.price)}</strong>${p.reference?'<small>Precio referencial</small>':''}</div></div><button class="pill add-button" data-add="${p.id}" aria-label="Agregar ${p.name} al carrito">Agregar <span aria-hidden="true">+</span></button><button class="text-button detail-link" data-detail="${p.id}">Ver producto</button></article>`).join('');$('#products').scrollLeft=0;rebuildCarousel();requestAnimationFrame(rebuildCarousel)}
function rebuildCarousel(){
 const rail=$('#products'),cards=[...rail.children],max=Math.max(0,rail.scrollWidth-rail.clientWidth);
 if(!rail.clientWidth||!cards.length)return;
 const first=cards[0].offsetLeft,positions=[0];
 for(const card of cards){const left=Math.min(max,Math.max(0,card.offsetLeft-first));if(left-positions[positions.length-1]>2)positions.push(left)}
 if(max-positions[positions.length-1]>2)positions.push(max);
 carouselPositions=positions;
 $('#catalog-pagination').hidden=positions.length<=1;
 $('.carousel-arrows').hidden=positions.length<=1;
 $('#catalog-pagination').innerHTML=positions.length>1?positions.map((left,i)=>`<button class="page-dot" data-slide="${i}" aria-label="Posición ${i+1} de ${positions.length}" aria-current="false"></button>`).join(''):'';
 updateCarousel();
}
function updateCarousel(){
 const rail=$('#products');if(!rail.clientWidth)return;
 carouselIndex=carouselPositions.reduce((best,left,i)=>Math.abs(left-rail.scrollLeft)<Math.abs(carouselPositions[best]-rail.scrollLeft)?i:best,0);
 $('#products-prev').disabled=carouselIndex===0;
 $('#products-next').disabled=carouselIndex===carouselPositions.length-1;
 document.querySelectorAll('[data-slide]').forEach((dot,i)=>dot.setAttribute('aria-current',String(i===carouselIndex)));
}
function goToCarouselPosition(index){const i=Math.max(0,Math.min(carouselPositions.length-1,index));$('#products').scrollTo({left:carouselPositions[i],behavior:reduced.matches?'instant':'smooth'})}
function renderCart(){const count=Object.values(cart).reduce((a,b)=>a+b,0),items=PRODUCTS.filter(p=>cart[p.id]);$('#cart-count').textContent=count;$('#open-cart').setAttribute('aria-label',`Abrir carrito, ${count} ${count===1?'barra':'barras'}`);$('#cart-items').innerHTML=items.length?items.map(p=>`<div class="cart-row">${FLAVORS[p.id]?`<span class="cart-pack-thumb">${flavorPhoto(p.id)}</span>`:`<img src="${p.image}" alt="${p.name}" width="76" height="76">`}<div><h3>${p.name}</h3><p>${p.presentation} · ${money(p.price)} c/u${p.reference?' · Referencial':''}</p><div class="row-controls"><div class="quantity"><button data-change="${p.id}" data-delta="-1" aria-label="Reducir cantidad de ${p.name}">−</button><output aria-label="Cantidad de ${p.name}">${cart[p.id]}</output><button data-change="${p.id}" data-delta="1" aria-label="Aumentar cantidad de ${p.name}" ${cart[p.id]>=99?'disabled':''}>+</button></div><button class="remove" data-remove="${p.id}" aria-label="Eliminar ${p.name}">Eliminar</button></div></div></div>`).join(''):`<div class="empty"><span aria-hidden="true">✳</span><p>Tu próxima pausa te espera.</p><button class="pill" id="browse-products">Ver productos ↗</button></div>`;$('#cart-total').textContent=money(total());$('#cart-footer').hidden=!items.length;$('#total-label').textContent=hasReference()?'Subtotal estimado':'Subtotal';$('#cart-price-note').textContent=hasReference()?'Incluye el precio referencial de Mini. Envío por definir.':'Envío por definir.';try{localStorage.setItem('vitabars-cart-v1',JSON.stringify(cart))}catch{}}
function openCart(){renderCart();$('#cart-dialog').showModal()}
function showDetail(id){if(FLAVORS[id]){navigate('#sabor/'+id);return}const p=PRODUCTS.find(x=>x.id===id);if(!p)return;$('#product-detail').innerHTML=`<img src="${p.image}" alt="Fotografía original de ${p.name} con sus ingredientes" width="707" height="707"><div><p class="eyebrow">${p.line}</p><h2 id="product-detail-title">${p.name}</h2><p>${p.presentation}</p><strong class="detail-price">${money(p.price)}</strong>${p.reference?'<p class="small-print">Precio referencial</p>':''}<button class="pill" data-add="${p.id}">Agregar al carrito +</button></div>`;$('#product-dialog').showModal()}
document.addEventListener('click',e=>{const add=e.target.closest('[data-add]');if(add){const id=add.dataset.add;if((cart[id]||0)>=99){announce('Máximo 99 unidades por producto.');return}cart[id]=(cart[id]||0)+1;renderCart();announce('Producto agregado al carrito.')}const f=e.target.closest('[data-filter]');if(f){currentFilter=f.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===f);b.setAttribute('aria-pressed',String(b===f))});renderProducts()}const ch=e.target.closest('[data-change]');if(ch){const id=ch.dataset.change;cart[id]=Math.min(99,(cart[id]||0)+Number(ch.dataset.delta));if(cart[id]<=0)delete cart[id];renderCart();($(`[data-change="${id}"][data-delta="${ch.dataset.delta}"]`)||$('#cart-title')).focus()}const rem=e.target.closest('[data-remove]');if(rem){delete cart[rem.dataset.remove];renderCart();$('#cart-title').focus();announce('Producto eliminado.')}const detail=e.target.closest('[data-detail]');if(detail)showDetail(detail.dataset.detail);const slide=e.target.closest('[data-slide]');if(slide)goToCarouselPosition(Number(slide.dataset.slide));if(e.target.closest('.close-dialog'))e.target.closest('dialog').close();if(e.target.closest('#browse-products')){$('#cart-dialog').close();navigate('#catalogo')}});
$('#products-prev').addEventListener('click',()=>goToCarouselPosition(carouselIndex-1));$('#products-next').addEventListener('click',()=>goToCarouselPosition(carouselIndex+1));$('#products').addEventListener('scroll',updateCarousel,{passive:true});
$('#open-cart').addEventListener('click',openCart);$('#checkout').addEventListener('click',()=>{if(!Object.keys(cart).length)return;$('#order-summary').innerHTML=PRODUCTS.filter(p=>cart[p.id]).map(p=>`<div class="summary-line"><span>${cart[p.id]} × ${p.name}${p.reference?' (referencial)':''}</span><strong>${money(cart[p.id]*p.price)}</strong></div>`).join('')+`<div class="summary-line summary-total"><span>${hasReference()?'Subtotal estimado':'Subtotal'}</span><strong>${money(total())}</strong></div><p class="small-print">Envío por definir.</p>`;$('#cart-dialog').close();$('#summary-dialog').showModal()});$('#back-to-cart').addEventListener('click',()=>{$('#summary-dialog').close();openCart()});$('#demo-info').addEventListener('click',()=>$('#info-dialog').showModal());document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}));
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),hand=$('#hand-product'),handPhoto=$('#hand-photo'),barPhoto=$('.motion-bar'),track=$('#esencia'),cta=$('#story-cta'),pack=$('#story-product');
let trackTop=0,trackTravel=1,geometry=null;
const clamp=n=>Math.min(1,Math.max(0,n));
const ease=n=>{n=clamp(n);return n*n*(3-2*n)};
function measure(){
 $('#nav-story').textContent=innerWidth<700?'Historia':'Nuestra historia';
 if(activeView==='experience'){
  const stage=$('.story-sticky'),width=stage.clientWidth,height=stage.clientHeight,mobile=width<700;
  trackTop=track.getBoundingClientRect().top+scrollY-(parseFloat(getComputedStyle(stage).top)||0);
  trackTravel=Math.max(1,track.offsetHeight-stage.offsetHeight);
  // A single package and a static finger mask share one source coordinate plane.
  // Scale is calculated only on resize, never from scroll progress.
  const scale=mobile?Math.min(height*.65/731,width*.35/280):Math.min(height*.70/731,width*.34/400);
  const barTop=mobile?Math.max(205,height*.30):height*.22;
  geometry={width,height,scale,x:width*(mobile?.70:.70)-450*scale,y:barTop-43*scale,drop:Math.min(mobile?60:70,height*.10),rise:height+150};
 }
 updateScroll();rebuildCarousel();
}
function updateScroll(){
 scrollFrame=0;if(activeView!=='experience'||!geometry)return;
 const p=reduced.matches?1:clamp((scrollY-trackTop)/trackTravel),g=geometry;
 const descend=ease(p/.52),receive=ease((p-.48)/.32),step=p<.28?0:p<.57?1:2;
 const angle=0;
 pack.style.transform=`translate3d(${g.x}px,${g.y-g.drop*(1-descend)}px,0) scale(${g.scale}) rotate(${angle}deg)`;
 hand.style.transform=`translate3d(${g.x}px,${g.y+g.rise*(1-receive)}px,0) scale(${g.scale})`;
 cta.hidden=!(p>=.84&&handPhoto.complete&&handPhoto.naturalWidth>1&&barPhoto.complete&&barPhoto.naturalWidth>1);
 if(step!==lastStep){
  const title=['CONOCE TU<br>PRÓXIMA FAVORITA.','INGREDIENTES.<br>CON CARÁCTER.','LISTOS PARA<br>IR CONTIGO.'];
  const kicker=['UN NUEVO ÁNGULO','MACA · LÚCUMA · CACAO','LISTA PARA IR CONTIGO'];
  const labels=['CONOCE SUPERFOODS','DENTRO DE ESTA BARRA','SIGUE DESCUBRIENDO VITABARS'];
  const desc=['Maca, lúcuma y cacao en una barra de 63.4 g.','Una combinación con superalimentos y mantequilla de maní.','Superfoods es solo el comienzo.'];
  const facts=[
   '<span class="fact-chip">10 g de proteína</span><span class="fact-chip">63.4 g por barra</span><a class="intro-detail-link" href="#sabor/superfoods">Conoce Superfoods ↗</a>',
   FLAVORS.superfoods.ingredients.map(t=>`<span class="ingredient-chip"><i aria-hidden="true"></i>${t}</span>`).join(''),
   '<p class="closing-flavor-message">Elige tu próxima pausa.<br><strong>Descubre todas las combinaciones.</strong></p>'
  ];
  $('#story-title').innerHTML=title[step];$('#story-kicker').textContent=kicker[step];$('#story-info-label').textContent=labels[step];$('#story-description').textContent=desc[step];$('#story-facts').innerHTML=facts[step];$('#story-facts').className='story-facts facts-step-'+step;$('#story-source').textContent='';$('#story-step').textContent=`0${step+1} / 03`;lastStep=step;

 }
}
let activeHash='',saveFrame=0,restoringView=false;
try{history.scrollRestoration='manual'}catch{}
if(!history.state?.vitabars)history.replaceState({vitabars:true,parent:false,snapshot:null},'');
function captureView(){return {y:scrollY,filter:currentFilter,rail:$('#products').scrollLeft,vw:innerWidth,vh:innerHeight,progress:activeView==='experience'&&geometry?clamp((scrollY-trackTop)/trackTravel):null}}
function saveView(){if(!activeHash||restoringView)return;try{history.replaceState({...history.state,vitabars:true,snapshot:captureView()},'')}catch{}}
function queueSave(){if(!saveFrame)saveFrame=requestAnimationFrame(()=>{saveFrame=0;saveView()})}
function navigate(hash,options={}){saveView();if((location.hash||'#inicio')===hash&&!options.focusProduct){if(hash==='#inicio')window.scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'});return}history.pushState({vitabars:true,parent:true,snapshot:null,...options},'',hash);route()}
function backView(){if(history.state?.vitabars&&history.state.parent){history.back();return}const fallback=activeView==='detail'?'#sabores':'#inicio';history.replaceState({vitabars:true,parent:false,snapshot:null},'',fallback);route()}
function route(){
 const hash=location.hash||'#inicio',id=hash.startsWith('#sabor/')?hash.slice(7):'',valid=Boolean(FLAVORS[id]);
 const next=hash==='#catalogo'?'catalog':hash==='#experiencia'||hash==='#esencia'?'experience':hash==='#sabores'?'flavors':valid?'detail':hash==='#nosotros'?'about':'home';
 const snapshot=history.state?.snapshot,focusProduct=history.state?.focusProduct;
 restoringView=true;activeHash=hash;activeView=next;
 for(const [view,selector]of Object.entries({home:'#home-view',experience:'#experience-view',catalog:'#catalog-view',flavors:'#flavors-view',detail:'#flavor-detail-view',about:'#about-view'}))$(selector).hidden=view!==next;
 $('#view-backbar').hidden=next==='home';$('#view-context').textContent=({experience:'Un nuevo ángulo',catalog:'Tu pedido',flavors:'Nuestros sabores',detail:'Conoce tu sabor',about:'Nuestra historia'})[next]||'';
 document.body.classList.toggle('catalog-mode',next==='catalog');document.body.dataset.view=next;
 $('#nav-story').textContent=innerWidth<700?'Historia':'Nuestra historia';
 if(next==='flavors')renderFlavors();if(next==='detail')renderFlavorDetail(id);
 if(next==='catalog'){
  currentFilter=focusProduct&&!snapshot?'all':snapshot?.filter||'all';
  document.querySelectorAll('[data-filter]').forEach(b=>{const selected=b.dataset.filter===currentFilter;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected))});renderProducts();
 }
 document.title=({home:'Vitabars — Alimento hecho barra',experience:'Conoce tu próxima favorita | Vitabars',catalog:'Catálogo | Vitabars',flavors:'Explorar más sabores | Vitabars',detail:valid?FLAVORS[id].short+' | Vitabars':'Vitabars',about:'Nuestra historia | Vitabars'})[next];
 requestAnimationFrame(()=>{
  lastStep=-1;measure();
  const restoreY=next==='experience'&&snapshot?.progress!=null&&(snapshot.vw!==innerWidth||snapshot.vh!==innerHeight)?trackTop+snapshot.progress*trackTravel:snapshot?.y||0;
  window.scrollTo({top:restoreY,behavior:'instant'});
  if(next==='catalog'){
   rebuildCarousel();let left=snapshot?.rail||0;
   if(focusProduct&&!snapshot){const card=document.querySelector(`[data-product="${focusProduct}"]`);if(card){left=card.offsetLeft-$('#products').firstElementChild.offsetLeft;card.classList.add('is-target')}}
   $('#products').scrollTo({left,behavior:'instant'});updateCarousel();
  }
  updateScroll();
  if(!snapshot){const heading=next==='catalog'?$('#catalog-title'):next==='experience'?$('#story-title'):next==='flavors'?$('#flavors-title'):next==='detail'?$('#flavor-detail-title'):next==='about'?$('#nosotros h2'):$('#inicio h1');heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true})}
  requestAnimationFrame(()=>{restoringView=false;saveView()});
 });
}
document.addEventListener('click',e=>{const back=e.target.closest('#go-back');if(back){backView();return}const link=e.target.closest('a[href^="#"]');if(!link||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();navigate(link.getAttribute('href'),link.dataset.buyFlavor?{focusProduct:link.dataset.buyFlavor}:{})});
$('#go-back').addEventListener('keydown',e=>{if(e.key==='Escape')backView()});
addEventListener('popstate',route);
addEventListener('hashchange',()=>{if((location.hash||'#inicio')!==activeHash){history.replaceState({vitabars:true,parent:false,snapshot:null},'');route()}});
addEventListener('scroll',()=>{if(activeView==='experience'&&!scrollFrame)scrollFrame=requestAnimationFrame(updateScroll);queueSave()},{passive:true});
$('#products').addEventListener('scroll',queueSave,{passive:true});
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>requestAnimationFrame(saveView)));
addEventListener('pagehide',saveView);
addEventListener('resize',measure);handPhoto.addEventListener('load',measure);barPhoto.addEventListener('load',measure);reduced.addEventListener('change',measure);document.fonts.ready.then(measure);
$('#year').textContent=new Date().getFullYear();renderFilters();renderProducts();renderCart();route();
