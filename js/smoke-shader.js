(function () {
  var VS = '#version 300 es\nprecision highp float;\nin vec4 position;\nvoid main(){gl_Position=position;}';

  var FS = '#version 300 es\n' +
    'precision highp float;\n' +
    'out vec4 O;\n' +
    'uniform float time;\n' +
    'uniform vec2 resolution;\n' +
    'uniform vec3 u_color;\n' +
    '#define FC gl_FragCoord.xy\n' +
    '#define R resolution\n' +
    '#define T (time+660.)\n' +
    'float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);}\n' +
    'float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);return mix(mix(rnd(i),rnd(i+vec2(1,0)),u.x),mix(rnd(i+vec2(0,1)),rnd(i+1.),u.x),u.y);}\n' +
    'float fbm(vec2 p){float t=.0,a=1.;for(int i=0;i<3;i++){t+=a*noise(p);p*=mat2(1,-1.2,.2,1.2)*2.;a*=.5;}return t;}\n' +
    'void main(){\n' +
    '  vec2 uv=(FC-.5*R)/R.y;\n' +
    '  vec3 col=vec3(1);\n' +
    '  uv.x+=.25;\n' +
    '  uv*=vec2(2,1);\n' +
    '  float n=fbm(uv*.28-vec2(T*.01,0));\n' +
    '  n=noise(uv*3.+n*2.);\n' +
    '  col.r-=fbm(uv+vec2(0,T*.015)+n);\n' +
    '  col.g-=fbm(uv*1.003+vec2(0,T*.015)+n+.003);\n' +
    '  col.b-=fbm(uv*1.006+vec2(0,T*.015)+n+.006);\n' +
    '  col=mix(col,u_color,dot(col,vec3(.21,.71,.07)));\n' +
    '  col=mix(vec3(.08),col,min(time*.1,1.));\n' +
    '  col=clamp(col,.08,1.);\n' +
    '  O=vec4(col,1);\n' +
    '}';

  /* Fragment shader je nejdrazsi vec na strance. Na stroji s grafickou kartou
     stoji par milisekund na snimek, na stroji bez ni (headless Chrome, na kterem
     bezi PageSpeed, levny notebook, virtualka) se stejny snimek pocita softwarove
     na procesoru a trva desetiny sekundy. Proto tri pojistky:
     1. rendrujeme do mensiho bufferu, nez je canvas na obrazovce - kour je mekky
        sum, na pulce rozliseni ho nikdo nepozna, ale fragmentu je 4x min,
     2. detekujeme softwarovy renderer a rovnou z animace delame staticky obrazek,
     3. merime, jak dlouho snimky ve skutecnosti trvaji, a kdyz to stroj nestiha,
        animaci zmrazime na poslednim snimku.
     preserveDrawingBuffer drzi posledni snimek na platne i po zastaveni smycky. */
  var MAX_PIXELS   = 400000; // strop poctu fragmentu na snimek
  var MAX_SCALE    = 0.5;    // vic nez pulka rozliseni nema u kouře smysl
  var FRAME_MS     = 50;     // ~20 fps, kour se hybe pomalu
  var SLOW_MS      = 90;     // snimek, ktery uz je podezrele dlouhy
  var SLOW_STRIKES = 6;      // kolik jich po sobe staci na zmrazeni
  var FIRST_FRAME_BUDGET_MS = 30; // drazsi prvni snimek = stroj na animaci nema

  function looksLikeSoftware(gl) {
    var dbg = gl.getExtension('WEBGL_debug_renderer_info');
    if (!dbg) return false;
    var name = '';
    try { name = String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) || ''); } catch (e) { return false; }
    return /swiftshader|llvmpipe|softpipe|software|basic render|microsoft basic/i.test(name);
  }

  function initSmokeShader(canvasId, sectionId) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;

    var gl = canvas.getContext('webgl2', {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      powerPreference: 'low-power',
      preserveDrawingBuffer: true
    });
    if (!gl) { canvas.style.display = 'none'; return; }

    function mkShader(type, src) {
      var sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(sh));
        gl.deleteShader(sh); return null;
      }
      return sh;
    }

    var vs = mkShader(gl.VERTEX_SHADER, VS);
    var fs = mkShader(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return;

    var prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog)); return;
    }

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,1,-1,-1,1,1,1,-1]), gl.STATIC_DRAW);
    var posLoc = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    var uRes   = gl.getUniformLocation(prog, 'resolution');
    var uTime  = gl.getUniformLocation(prog, 'time');
    var uColor = gl.getUniformLocation(prog, 'u_color');

    var color = [0.0, 0.0, 0.0];
    var t0 = performance.now();
    var raf = null;
    var frozen = false;   // stroj to nestiha, zustava posledni snimek
    var visible = true;   // sekce je v zabere
    var strikes = 0;
    var lastFrameTime = 0;

    function resize() {
      var section = document.getElementById(sectionId);
      if (!section) return;
      var w = section.offsetWidth, h = section.offsetHeight;
      if (!w || !h) return;
      var scale = Math.min(MAX_SCALE, Math.sqrt(MAX_PIXELS / (w * h)));
      canvas.width  = Math.max(1, Math.round(w * scale));
      canvas.height = Math.max(1, Math.round(h * scale));
      canvas.style.width  = w + 'px';
      canvas.style.height = h + 'px';
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    function draw() {
      var now = (performance.now() - t0) * 0.001;
      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, now);
      gl.uniform3fv(uColor, color);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    function stop() {
      if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
    }

    function start() {
      if (frozen || !visible || document.hidden || raf !== null) return;
      lastFrameTime = 0;
      raf = requestAnimationFrame(render);
    }

    function render(ts) {
      raf = requestAnimationFrame(render);
      if (lastFrameTime && ts - lastFrameTime < FRAME_MS) return;

      var gap = lastFrameTime ? ts - lastFrameTime : 0;
      lastFrameTime = ts;

      if (gap > SLOW_MS) {
        if (++strikes >= SLOW_STRIKES) { frozen = true; stop(); return; }
      } else if (strikes) {
        strikes--;
      }

      draw();
    }

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { resize(); draw(); }, 150);
    }, { passive: true });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });

    /* Kour pod patou stranky nema proc pocitat, kdyz je uzivatel u hlavicky. */
    var section = document.getElementById(sectionId);
    if (section && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) start(); else stop();
      }, { rootMargin: '120px' }).observe(section);
    }

    resize();

    /* Nazev rendereru rekne pravdu jen nekdy - WEBGL_debug_renderer_info
       prohlizece kvuli soukromi casto neposkytnou. Spolehlivejsi je zmerit
       si prvni snimek. gl.finish() pocka, nez grafika praci opravdu dodela,
       takze cislo odpovida skutecnosti. Na grafickem akceleratoru jsou to
       jednotky milisekund, na softwarovem SwiftShaderu (headless Chrome,
       na kterem bezi PageSpeed, virtualka, stroj bez ovladacu) desitky az
       stovky. Kdyz je snimek drahy, vykreslime jeden jediny staticky
       a procesor uz dal nezatezujeme. */
    var t = performance.now();
    draw();
    gl.finish();
    var firstFrameMs = performance.now() - t;

    if (firstFrameMs > FIRST_FRAME_BUDGET_MS || looksLikeSoftware(gl)) return;

    start();
  }

  window.initSmokeShader = initSmokeShader;
})();
