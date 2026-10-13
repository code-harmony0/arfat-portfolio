/* Hero 3D phones: real Zonesso screens on a rounded-box body, pointer and scroll reactive.
   Desktop pointers only, never for reduced motion. The CSS phones stay as the fallback and hide only after the first WebGL frame. */
(function () {
  var root = document.documentElement;
  var stage = document.querySelector('.hero-stage');
  var ok = stage && !root.classList.contains('static') &&
    matchMedia('(hover:hover) and (pointer:fine)').matches && innerWidth >= 900;
  if (!ok) return;

  var start = function () { boot().catch(function () { /* CSS phones remain */ }); };
  if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 2500 }); else setTimeout(start, 1200);

  async function boot() {
    var THREE = await import('three');
    var mod = await import('three/addons/geometries/RoundedBoxGeometry.js');
    var RoundedBoxGeometry = mod.RoundedBoxGeometry;

    var canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    stage.appendChild(canvas);
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50);
    camera.position.set(0, 0, 7.4);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x2a2018, 1.15));
    var key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(3, 4, 5); scene.add(key);
    var rim = new THREE.DirectionalLight(0xff5b2e, 2.2); rim.position.set(-5, 1, 2); scene.add(rim);

    var loader = new THREE.TextureLoader();
    var W = 1, H = 1.84, D = 0.11, SW = 0.93, SH = 0.93 / (610 / 1110);

    /* rounded-corner alpha mask so the flat screen follows the body's corners */
    var m = document.createElement('canvas'); m.width = 128; m.height = 233;
    var c = m.getContext('2d'); c.fillStyle = '#000'; c.fillRect(0, 0, 128, 233);
    c.fillStyle = '#fff'; c.beginPath(); c.roundRect(0, 0, 128, 233, 16); c.fill();
    var mask = new THREE.CanvasTexture(m);

    function phone(src, dim, x, y, rotY, rotZ, z) {
      var g = new THREE.Group();
      var body = new THREE.Mesh(
        new RoundedBoxGeometry(W, H, D, 5, 0.1),
        new THREE.MeshPhysicalMaterial({ color: 0x17181b, metalness: 0.7, roughness: 0.32, clearcoat: 0.6, clearcoatRoughness: 0.35 })
      );
      g.add(body);
      var tex = loader.load(src, function () { ready(); });
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      var screen = new THREE.Mesh(
        new THREE.PlaneGeometry(SW, SH),
        new THREE.MeshBasicMaterial({ map: tex, alphaMap: mask, transparent: true, color: new THREE.Color(dim, dim, dim) })
      );
      screen.position.z = D / 2 + 0.002;
      g.add(screen);
      g.scale.setScalar(1.3); g.position.set(x, y, z); g.rotation.set(0.1, rotY, rotZ);
      g.userData = { x: x, y: y, rotY: rotY, rotZ: rotZ };
      scene.add(g);
      return g;
    }
    var back = phone('/assets/shots/zonesso-ui-1.webp', 0.55, -0.85, 0.2, 0.5, -0.1, -0.9);
    var main = phone('/assets/shots/zonesso-ui-3.webp', 1, 0.85, -0.2, -0.42, 0.08, 0);

    var loaded = 0, shown = false;
    function ready() { loaded++; }

    function resize() {
      var w = stage.clientWidth, h = stage.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    }
    resize(); addEventListener('resize', resize);

    var px = 0, py = 0, tx = 0, ty = 0;
    addEventListener('pointermove', function (e) { tx = e.clientX / innerWidth - 0.5; ty = e.clientY / innerHeight - 0.5; }, { passive: true });

    var visible = true, raf = 0;
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible && !raf) raf = requestAnimationFrame(frame); }).observe(stage);

    function frame(t) {
      raf = 0;
      if (!visible) return;
      px += (tx - px) * 0.06; py += (ty - py) * 0.06;
      var s = Math.min(1, Math.max(0, scrollY / innerHeight));
      var bob = Math.sin(t / 1400) * 0.035;
      [main, back].forEach(function (g, i) {
        var d = g.userData, k = i ? 0.6 : 1;
        g.rotation.y = d.rotY + px * 0.6 * k + s * 0.5;
        g.rotation.x = 0.1 + py * 0.35 * k - s * 0.15;
        g.rotation.z = d.rotZ + s * 0.06;
        g.position.y = d.y + bob * k + s * 0.35;
      });
      renderer.render(scene, camera);
      if (!shown && loaded >= 2) { shown = true; stage.classList.add('gl-on'); }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
  }
})();
