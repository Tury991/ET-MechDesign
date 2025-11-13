

// assets/main.js
(function(){
  const html = document.documentElement;

  // Support both ids: 'toggleDark' (vecchio) and 'theme-toggle' (nuovo)
  const toggleDark = document.getElementById('toggleDark') || document.getElementById('theme-toggle');
  const toggleLang = document.getElementById('toggleLang');

  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // read stored preference; if missing, use system preference
  let dark = localStorage.getItem('etmd-dark');
  if (dark === null) { dark = prefersDark ? '1' : '0'; }
  if (dark === '1') html.classList.add('dark'); else html.classList.remove('dark');

  // attach dark toggle if element exists
  if (toggleDark) {
    toggleDark.addEventListener('click', () => {
      html.classList.toggle('dark');
      const is = html.classList.contains('dark') ? '1' : '0';
      localStorage.setItem('etmd-dark', is);
      // optional: update visual of the button (if you want to change text)
      // toggleDark.innerText = html.classList.contains('dark') ? '🌙' : '☀️';
    });
  } else {
    // no theme toggle found — safe no-op
    console.warn('Theme toggle button not found (expected id "toggleDark" or "theme-toggle").');
  }

  // language toggle
  let lang = localStorage.getItem('etmd-lang') || 'en';

  // function to set language texts
  function setLang(l){
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if (window.I18N && window.I18N[l] && window.I18N[l][key]) el.innerHTML = window.I18N[l][key];
    });
    if (toggleLang) toggleLang.innerText = l === 'en' ? 'IT' : 'EN';
  }

  // init language
  setLang(lang);

  // attach lang toggle if element exists
  if (toggleLang) {
    toggleLang.addEventListener('click', ()=>{
      lang = (lang === 'en') ? 'it' : 'en';
      setLang(lang);
      localStorage.setItem('etmd-lang', lang);
      // optionally update URL param (?lang=it) without reload:
      try {
        const url = new URL(window.location);
        url.searchParams.set('lang', lang);
        window.history.replaceState({}, '', url);
      } catch (e) { /* ignore if URL API not available */ }
    });
  } else {
    console.warn('Language toggle button not found (expected id "toggleLang").');
  }

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // contact form demo handler (safe guard)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const currentLang = localStorage.getItem('etmd-lang') || 'en';
      alert(currentLang === 'en' ? 'Message sent (demo). I will reply soon.' : 'Messaggio inviato (demo). Risponderò a breve.');
      form.reset();
    });
  }

})();

