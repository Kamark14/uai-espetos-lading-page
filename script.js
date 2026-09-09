const menuBtn=document.getElementById('menuBtn');
const nav=document.getElementById('nav');
menuBtn?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded',open?'true':'false');
  menuBtn.innerHTML=open?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-bars"></i>';
});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const lightbox=document.getElementById('lightbox');
const lightboxImg=document.getElementById('lightboxImg');
const closeLightbox=()=>{lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');lightboxImg.src='';document.body.style.overflow='';};
document.querySelectorAll('.gallery-item').forEach(item=>{
  item.addEventListener('click',()=>{
    lightboxImg.src=item.dataset.full;
    lightboxImg.alt=item.querySelector('img')?.alt||'Imagem Uai Espetos';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  });
});
document.getElementById('lightboxClose')?.addEventListener('click',closeLightbox);
lightbox?.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});

// Smooth reveal
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.opacity='1';
      entry.target.style.transform='translateY(0)';
      observer.unobserve(entry.target);
    }
  });
},{threshold:.08});
document.querySelectorAll('.specialty,.about-image,.about-copy,.gallery-item,.location-copy,.map-wrap').forEach(el=>{
  el.style.opacity='0';
  el.style.transform='translateY(18px)';
  el.style.transition='opacity .7s ease, transform .7s ease';
  observer.observe(el);
});
