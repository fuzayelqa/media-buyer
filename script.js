/* Ozih portfolio: vanilla JS */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  $('#yr').textContent = new Date().getFullYear();

  // Mobile menu
  const btn = $('#menuBtn'), menu = $('#mobileMenu');
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('hidden') === false;
    btn.setAttribute('aria-expanded', open);
  });
  $$('#mobileMenu a').forEach(a => a.addEventListener('click', () => { menu.classList.add('hidden'); btn.setAttribute('aria-expanded', false); }));

  // Reveal on scroll: add .reveal to section content blocks
  $$('section > div, section > ul, section > h2, .note, .tile').forEach(el => { if (!el.classList.contains('reveal') && !el.closest('#top')) el.classList.add('reveal'); });
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  $$('.reveal').forEach(el => reduce ? el.classList.add('in') : io.observe(el));
  if (!reduce) requestAnimationFrame(() => $$('#top .reveal').forEach(el => el.classList.add('in')));

  // Active nav highlighting
  const links = $$('.navlink');
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => spy.observe(s));

  // ROI calculator
  const spend = $('#spend'), rev = $('#rev');
  const calc = () => {
    const s = parseFloat(spend.value) || 0, r = parseFloat(rev.value) || 0, p = r - s;
    $('#oProfit').textContent = (p < 0 ? '-$' : '$') + Math.abs(p).toFixed(2);
    $('#oRoi').textContent = s ? (p / s * 100).toFixed(1) + '%' : 'n/a';
    $('#oRoas').textContent = s ? (r / s).toFixed(2) + 'x' : 'n/a';
  };
  spend.addEventListener('input', calc); rev.addEventListener('input', calc); calc();
  $('#roi').addEventListener('submit', e => e.preventDefault());

  // Animated counters
  const co = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    co.unobserve(e.target);
    const el = e.target, to = +el.dataset.to, pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    if (reduce) { el.textContent = pre + to + suf; return; }
    const t0 = performance.now(), dur = 1200;
    const tick = t => { const k = Math.min((t - t0) / dur, 1); el.textContent = pre + Math.round(to * (1 - Math.pow(1 - k, 3))) + suf; if (k < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }), { threshold: .6 });
  $$('.count').forEach(c => co.observe(c));

  // Copy email + toast
  const toast = $('#toast');
  $('#copyMail').addEventListener('click', async e => {
    const mail = e.currentTarget.dataset.mail;
    try { await navigator.clipboard.writeText(mail); } catch (_) {
      const t = document.createElement('textarea'); t.value = mail; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove();
    }
    toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 1500);
  });

  // Contact form: mailto fallback
  $('#contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const body = `${f.get('message')}\n\nFrom: ${f.get('name')} (${f.get('email')})`;
    location.href = `mailto:info.ozih@gmail.com?subject=${encodeURIComponent('Project enquiry from ' + f.get('name'))}&body=${encodeURIComponent(body)}`;
  });

  // Custom cursor (desktop)
  const cur = $('.cursor');
  if (cur && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    addEventListener('mousemove', e => { cur.style.transform = `translate(${e.clientX}px,${e.clientY}px)`; });
    document.addEventListener('mouseover', e => cur.classList.toggle('big', !!e.target.closest('a,button,input,textarea')));
  }
})();
