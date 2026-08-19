(function () {
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

    var mouseInfluence = 70;
    var influenceRadius = 320;
    var smoothing      = 0.1;

    function resize() {
      canvas.width  = section.offsetWidth;
      canvas.height = section.offsetHeight;
      mouse.x  = canvas.width  / 2;
      mouse.y  = canvas.height / 2;
      target.x = canvas.width  / 2;
      target.y = canvas.height / 2;
    }

    function drawWave(wave) {
      ctx.save();
      ctx.beginPath();

      for (var x = 0; x <= canvas.width; x += 4) {
        var dx = x - mouse.x;
        var dy = canvas.height / 2 - mouse.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var infl = Math.max(0, 1 - dist / influenceRadius);
        var mouseEffect = infl * mouseInfluence * Math.sin(time * 0.001 + x * 0.01 + wave.offset);

        var y = canvas.height / 2
          + Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude
          + Math.sin(x * wave.frequency * 0.4 + time * 0.003) * (wave.amplitude * 0.45)
          + mouseEffect;

        if (x === 0) ctx.moveTo(x, y);
        else         ctx.lineTo(x, y);
      }

      ctx.lineWidth   = 2.5;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.shadowBlur  = 35;
      ctx.shadowColor = wave.color;
      ctx.stroke();
      ctx.restore();
    }

    function animate() {
      time++;
      mouse.x += (target.x - mouse.x) * smoothing;
      mouse.y += (target.y - mouse.y) * smoothing;

      /* pruhledne pozadi - barvu urcuje --color-bg-primary sekce pod canvasem,
         zadny natvrdo zadany gradient (drive #0a0a0a>#0d0d14) */
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = 1;
      ctx.shadowBlur  = 0;

      for (var i = 0; i < waves.length; i++) drawWave(waves[i]);

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
    window.addEventListener('resize',     resize,      { passive: true });
    window.addEventListener('mousemove',  onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);

    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = null;
      } else if (!raf) {
        raf = requestAnimationFrame(animate);
      }
    });

    raf = requestAnimationFrame(animate);
  }

  window.initWaveHero = initWaveHero;
})();
