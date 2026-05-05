
const $ = s => document.querySelector(s);
const pages = window.SCHOOL_PAGES || [];
const news = window.SCHOOL_NEWS || [];
const sections = window.SCHOOL_SECTIONS || [];

function initIntro(){
  const intro = $('#intro'), btn = $('#enterSite');
  if(!intro) return;
  if(sessionStorage.getItem('introSeen') === 'yes'){ intro.classList.add('hide'); return; }
  btn?.addEventListener('click', () => {
    intro.classList.add('open');
    setTimeout(()=>{ intro.classList.add('hide'); sessionStorage.setItem('introSeen','yes'); }, 1200);
  });
}
function initCommon(){
  if(localStorage.getItem('schoolTheme') === 'dark') document.body.classList.add('dark');
  $('#themeBtn')?.addEventListener('click',()=>{document.body.classList.toggle('dark');localStorage.setItem('schoolTheme',document.body.classList.contains('dark')?'dark':'light')});
  $('#menuBtn')?.addEventListener('click',()=>$('#nav')?.classList.toggle('open'));
}
function initHome(){
  if($('#sectionsGrid')) $('#sectionsGrid').innerHTML = sections.map(s=>`<article class="section-card"><img src="${s[2]}" alt="${s[0]}" loading="lazy"><div><h3>${s[0]}</h3><p>${s[1]}</p></div></article>`).join('');
  if($('#newsGrid')) $('#newsGrid').innerHTML = news.map(n=>`<article class="news-card"><img src="${n[2]}" alt="${n[0]}" loading="lazy"><div><span>${n[1]}</span><h3>${n[0]}</h3><p>${n[3]}</p></div></article>`).join('');
  if($('#magazineStrip')){
    const picks=[0,1,2,3,4,5,6,9,12,21,27,32,34,44,48,51];
    $('#magazineStrip').innerHTML = picks.filter(i=>pages[i]).map(i=>`<div class="page-thumb" data-src="${pages[i]}"><img src="${pages[i]}" alt="صفحة ${i+1}" loading="lazy"><b>${i+1}</b></div>`).join('');
    bindModal();
  }
}
function initGallery(){
  if(!$('#galleryGrid')) return;
  function render(){
    const q=($('#pageSearch')?.value||'').trim();
    const list=pages.map((src,i)=>({src,num:i+1})).filter(x=>!q||String(x.num).includes(q));
    $('#galleryGrid').innerHTML=list.map(x=>`<article class="gallery-item" data-src="${x.src}"><img src="${x.src}" alt="صفحة ${x.num}" loading="lazy"><p>صفحة ${x.num}</p></article>`).join('');
    bindModal();
  }
  $('#pageSearch')?.addEventListener('input',render); render();
}
function bindModal(){document.querySelectorAll('[data-src]').forEach(el=>{el.onclick=()=>openModal(el.dataset.src)})}
function openModal(src){$('#modalImg').src=src;$('#modal').classList.add('open')}
function initModal(){$('#closeModal')?.addEventListener('click',()=>$('#modal').classList.remove('open'));$('#modal')?.addEventListener('click',e=>{if(e.target.id==='modal')$('#modal').classList.remove('open')})}
initIntro();initCommon();initModal();initHome();initGallery();
// kamel3lom
