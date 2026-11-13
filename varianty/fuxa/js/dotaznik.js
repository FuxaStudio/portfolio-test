// Dotaznik pro klienty: odeslani pres Web3Forms, stejny access key a stejny zpusob jako poptavkovy formular (main.js).
// E-mail chodi vzdy cesky: otazky berou cesky text z data-q, odpovedi z EN verze cesky z data-cs.
(() => {
  const form = document.getElementById('dq');
  if (!form) return;
  const btn = document.getElementById('dqSubmit');
  const status = document.getElementById('dqStatus');
  const d = form.dataset;
  const NONE = '(nevyplněno)';

  const nameEl = form.elements.name;
  const q1 = form.elements.q1;
  const setErr = (el, text) => {
    const p = document.getElementById(el.id + '-e');
    p.textContent = text || '';
    p.hidden = !text;
    if (text) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid');
  };
  // Hlaska zmizi, jakmile je pole v poradku
  [[nameEl, 'eName'], [q1, 'eQ1']].forEach(([el, k]) => el.addEventListener('input', () => { if (el.value.trim()) setErr(el); }));

  // Odpoved na jednu otazku jako cesky text
  const answer = (box) => {
    const text = box.querySelector('input[type="text"]:not(.dq__other), textarea');
    if (text) return text.value.trim() || NONE;
    const picked = [...box.querySelectorAll('input:checked')].map((i) => {
      const cs = i.dataset.cs || i.value;
      if (!('other' in i.dataset)) return cs;
      const more = box.querySelector('.dq__other').value.trim();
      return more ? cs + ': ' + more : cs;
    });
    return picked.join(', ') || NONE;
  };

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    if (btn.disabled) return;
    const bad = [];
    if (!nameEl.value.trim()) bad.push([nameEl, d.eName]);
    if (!q1.value.trim()) bad.push([q1, d.eQ1]);
    setErr(nameEl, !nameEl.value.trim() && d.eName);
    setErr(q1, !q1.value.trim() && d.eQ1);
    if (bad.length) { bad[0][0].focus(); return; }

    btn.disabled = true;
    status.className = 'dq__status';
    status.textContent = d.sending;

    const name = nameEl.value.trim();
    const data = new FormData();
    data.append('access_key', form.elements.access_key.value);
    data.append('subject', 'Nový dotazník k webu' + (d.lang === 'EN' ? ' (EN)' : '') + ', ' + name);
    data.append('from_name', 'FuxaStudio web');
    data.append('botcheck', form.elements.botcheck.checked ? 'true' : '');
    data.append('Jazyk', d.lang);
    // Jedno pole: otazka, pod ni odpoved, oddelene prazdnym radkem
    data.append('Odpovědi', [...form.querySelectorAll('.dq__q')].map((box) => box.dataset.q + '\n' + answer(box)).join('\n\n'));
    data.append('Stránka', location.href);

    let ok = false;
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { Accept: 'application/json' }, body: data });
      const json = await res.json().catch(() => ({}));
      ok = res.ok && json.success !== false;
    } catch (err) { ok = false; }

    btn.disabled = false;
    if (ok) {
      form.reset();
      status.className = 'dq__status dq__status--ok';
      status.textContent = d.ok;
    } else {
      status.className = 'dq__status dq__status--err';
      status.innerHTML = d.err;
    }
  });
})();
