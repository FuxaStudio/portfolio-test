(function () {
  /* Vlny se kreslily pres ctx.shadowBlur = 35. Rozostreni stinu na 2D platne
     pocita procesor, ne grafika, a pro peti cary pres celou sirku hlavicky to
     byl zdaleka nejdrazsi ukon na strance. Stejny opticky vysledek se da slozit
     ze dvou tahu - siroky s nizkou pruhlednosti dela zar, uzky dela caru - a to
     uz je prace pro kompozitor. K tomu strop 30 snimku za sekundu, pauza, kdyz
     sekce neni v zabere, a ustup do jednodussi varianty na stroji, ktery to
     nestiha. */
  var FRAME_MS     = 33;   // ~30 fps
  var SLOW_MS      = 90;   // snimek, ktery uz je podezrele dlouhy
  var SLOW_STRIKES = 8;    // kolik jich po sobe staci na ustup
  var STEP         = 6;    // vzorkovani krivky v px
  var GLOW_WIDTH   = 14;
  var CORE_WIDTH   = 2.5;

  function initWaveHero(canvasId, sectionId) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var section = document.getElementById(sectionId);
    if (!section) return;

    var mouse  = { x: 0, y: 0 };
    var target = { x: 0, y: 0 };
    var time   = 0;
    var raf    = null;

    var waves = [
      { offset: 0,               amplitude: 70, frequency: 0.003,  color: 'rgba(237,237,237,1)', opacity: 0.22 },
      { offset: Math.PI * 0.5,  amplitude: 90, frequency: 0.0026, color: 'rgba(190,190,190,1)', opacity: 0.14 },
      { offset: Math.PI,         amplitude: 60, frequency: 0.0034, color: 'rgba(160,160,160,1)', opacity: 0.11 },
      { offset: Math.PI * 1.5,  amplitude: 80, frequency: 0.0022, color: 'rgba(237,237,237,1)', opacity: 0.09 },
      { offset: Math.PI * 2,    amplitude: 55, frequency: 0.004,  color: 'rgba(175,175,175,1)', opacity: 0.07 },
    ];

    var mouseInfluence  = 70;
    var influenceRadius = 320;
    var smoothing       = 0.1;

    var step      = STEP;
    var waveCount = waves.length;
    var strikes   = 0;
    var visible   = true;
    var stopped   = false;
    var lastFrameTime = 0;

    function resize() {
      canvas.width  = section.offsetWidth;
      canvas.height = section.offsetHeight;
      mouse.x  = canvas.width  / 2;
      mouse.y  = canvas.height / 2;
      target.x = canvas.width  / 2;
      target.y = canvas.height / 2;
    }

    function drawWave(wave) {
      var w = canvas.width;
      var mid = canvas.height / 2;
      var dy = mid - mouse.y;
      var dy2 = dy * dy;
      var t1 = time * 0.001 + wave.offset;
      var t2 = time * 0.002 + wave.offset;
      var t3 = time * 0.003;
      var amp2 = wave.amplitude * 0.45;

      var path = new Path2D();
      for (var x = 0; x <= w; x += step) {
        var dx = x - mouse.x;
        var infl = 1 - Math.sqrt(dx * dx + dy2) / influenceRadius;
        var mouseEffect = infl > 0 ? infl * mouseInfluence * Math.sin(t1 + x * 0.01) : 0;

        var y = mid
          + Math.sin(x * wave.frequency + t2) * wave.amplitude
          + Math.sin(x * wave.frequency * 0.4 + t3) * amp2
          + mouseEffect;

        if (x === 0) path.moveTo(x, y);
        else         path.lineTo(x, y);
      }

      ctx.strokeStyle = wave.color;

      /* zar: siroky tah s nizkou pruhlednosti */
      ctx.globalAlpha = wave.opacity * 0.32;
      ctx.lineWidth   = GLOW_WIDTH;
      ctx.stroke(path);

      /* cara */
      ctx.globalAlpha = wave.opacity;
      ctx.lineWidth   = CORE_WIDTH;
      ctx.stroke(path);
    }

    function frame() {
      time++;
      mouse.x += (target.x - mouse.x) * smoothing;
      mouse.y += (target.y - mouse.y) * smoothing;

      /* pruhledne pozadi - barvu urcuje --color-bg-primary sekce pod canvasem,
         zadny natvrdo zadany gradient (drive #0a0a0a>#0d0d14) */
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineCap  = 'round';
      ctx.lineJoin = 'round';

      for (var i = 0; i < waveCount; i++) drawWave(waves[i]);
      ctx.globalAlpha = 1;
    }

    function animate(ts) {
      raf = requestAnimationFrame(animate);
      if (lastFrameTime && ts - lastFrameTime < FRAME_MS) return;

      var gap = lastFrameTime ? ts - lastFrameTime : 0;
      lastFrameTime = ts;

      if (gap > SLOW_MS) {
        if (++strikes >= SLOW_STRIKES) {
          strikes = 0;
          if (waveCount > 2) { waveCount = 2; step = 12; }  // prvni ustup
          else { stopped = true; stop(); return; }          // druhy uz je konec
        }
      } else if (strikes) {
        strikes--;
      }

      frame();
    }

    function stop() {
      if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
    }

    function start() {
      if (stopped || !visible || document.hidden || raf !== null) return;
      lastFrameTime = 0;
      raf = requestAnimationFrame(animate);
    }

    function onMouseMove(e) {
      var rect = canvas.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
    }

    function onMouseLeave() {
      target.x = canvas.width  / 2;
      target.y = canvas.height / 2;
    }

    resize();

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { resize(); frame(); }, 150);
    }, { passive: true });
    window.addEventListener('mousemove',  onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) start(); else stop();
      }, { rootMargin: '120px' }).observe(section);
    }

    frame();
    start();
  }

  window.initWaveHero = initWaveHero;
})();
