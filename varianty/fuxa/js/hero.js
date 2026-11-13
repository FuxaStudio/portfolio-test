// Hero: latka na pozadi (Faze 2, varianta A9).
// Na mobilu (pod 810 px) a pri omezenem pohybu zustava jen poster a video se
// vubec nestahne. Jinak se video nacte az tady, hraje ve smycce a stoji, kdyz je
// hero mimo obraz nebo je karta na pozadi. Pri rolovani se jen lehce posune
// (transform), jine vlastnosti se neanimuji.
(() => {
  const root = document.querySelector('.hero > .hb');
  const video = root && root.querySelector('video.hb__media');
  if (!video) return;
  const still = matchMedia('(max-width: 809px), (prefers-reduced-motion: reduce)');
  const hero = root.parentElement;
  let started = false, inView = true, raf = 0, sy = 0, target = 0;

  const sync = () => {
    if (!started) return;
    if (inView && !document.hidden && !still.matches) video.play().catch(() => {});
    else video.pause();
  };
  const tick = () => {
    sy += (target - sy) * 0.12;
    video.style.transform = `translate3d(0, ${(sy * 12).toFixed(3)}%, 0) scale(1.04)`;
    raf = Math.abs(target - sy) > 0.0005 ? requestAnimationFrame(tick) : 0;
  };
  const onScroll = () => {
    target = Math.min(Math.max(scrollY / hero.offsetHeight, 0), 1);
    if (!raf) raf = requestAnimationFrame(tick);
  };
  // EN stránky leží v en/, cesty k videu se berou z místa skriptu (js/hero.js)
  const base = new URL('../', document.currentScript ? document.currentScript.src : location.href).href;

  const start = () => {
    if (started || still.matches) return;
    started = true;
    for (const [type, src] of [['webm', base + 'assets/hero/fabric.webm'], ['mp4', base + 'assets/hero/fabric.mp4']]) {
      video.append(Object.assign(document.createElement('source'), { type: `video/${type}`, src }));
    }
    video.addEventListener('playing', () => root.classList.add('is-live'), { once: true });
    video.load();
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    sync();
  };

  new IntersectionObserver(([en]) => { inView = en.isIntersecting; sync(); }).observe(hero);
  document.addEventListener('visibilitychange', sync);
  still.addEventListener('change', () => { start(); sync(); });
  // Video az po nacteni stranky, at nebrzdi poster a pisma
  if (document.readyState === 'complete') start(); else addEventListener('load', start, { once: true });
})();
