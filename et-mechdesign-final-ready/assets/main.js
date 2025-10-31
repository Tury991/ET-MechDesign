
(function(){
  const html = document.documentElement;
  const toggleDark = document.getElementById('toggleDark');
  const toggleLang = document.getElementById('toggleLang');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  let dark = localStorage.getItem('etmd-dark');
  if(dark===null){ dark = prefersDark ? '1' : '0'; }
  if(dark==='1') html.classList.add('dark'); else html.classList.remove('dark');
  toggleDark.addEventListener('click', ()=>{ html.classList.toggle('dark'); const is = html.classList.contains('dark')? '1':'0'; localStorage.setItem('etmd-dark', is); });
  let lang = localStorage.getItem('etmd-lang') || 'en'; setLang(lang);
  toggleLang.addEventListener('click', ()=>{ lang = (lang==='en')?'it':'en'; setLang(lang); localStorage.setItem('etmd-lang', lang); });
  function setLang(l){ document.querySelectorAll('[data-i18n]').forEach(el=>{ const key = el.getAttribute('data-i18n'); if(window.I18N && window.I18N[l] && window.I18N[l][key]) el.innerHTML = window.I18N[l][key]; }); toggleLang.innerText = l==='en' ? 'IT' : 'EN'; }
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click', e=>{ e.preventDefault(); const id = a.getAttribute('href').slice(1); const el = document.getElementById(id); if(el) el.scrollIntoView({behavior:'smooth', block:'start'}); }));
  const form = document.getElementById('contactForm'); form.addEventListener('submit', function(e){ e.preventDefault(); alert( (localStorage.getItem('etmd-lang')||'en')==='en' ? 'Message sent (demo). I will reply soon.' : 'Messaggio inviato (demo). Risponder\u00f2 a breve.' ); form.reset(); });
})();
