/* Shedding Light demo: a sphere lit by one directional light that follows
   the pointer.

   The shading is a JavaScript port of CTSchlickGGX_render_sphere (and the
   sphere geometry helpers) from shedding_light/ldo.py in
   https://github.com/JustineGiroux/SheddingLightBenchmark  (MIT License).
   Default material values are the optimiser's initial values in that file. */
(function () {
  var SIZE = 256;          // PROBE_SIZE
  var MASK_RADIUS = 122;   // PROBE_MASK_RADIUS

  // Initial parameter values from NormalisedLightDirection / CookTorrLightDirection.
  var ALBEDO = Math.exp(-1.07);                 // PositiveParam(-1.07)
  var FRESNEL = 1 / (1 + Math.exp(3.178));      // sigmoid(-3.178)
  var AMBIENT = 0.1;
  var LIGHT_INTENSITY = Math.E;                 // PositiveParam(1)
  var DEFAULTS = {
    roughness: 1 / (1 + Math.exp(-0.9)),        // sigmoid(0.9)
    metallic: 1 / (1 + Math.exp(6)),            // sigmoid(-6)
    height: 1
  };

  var canvas = document.getElementById("sphere");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var image = ctx.createImageData(SIZE, SIZE);

  // create_sphere_normals + create_sphere_mask
  // Convention: x right, y up, z towards the camera.
  var N = new Float32Array(SIZE * SIZE * 3);
  var mask = new Uint8Array(SIZE * SIZE);
  for (var j = 0; j < SIZE; j++) {
    for (var i = 0; i < SIZE; i++) {
      var x = -1 + (2 * i) / (SIZE - 1);
      var y = -1 + (2 * j) / (SIZE - 1);
      var z = Math.sqrt(Math.abs(1 - x * x - y * y));
      var len = Math.sqrt(x * x + y * y + z * z) + 1e-6;
      var k = j * SIZE + i;
      N[3 * k] = x / len;
      N[3 * k + 1] = -y / len;
      N[3 * k + 2] = z / len;
      var dx = i - SIZE / 2, dy = j - SIZE / 2;
      mask[k] = dx * dx + dy * dy <= MASK_RADIUS * MASK_RADIUS ? 1 : 0;
    }
  }

  var state = {
    roughness: DEFAULTS.roughness,
    metallic: DEFAULTS.metallic,
    height: DEFAULTS.height,
    pointer: null,           // last pointer position in viewport pixels
    light: [-0.5, 0.5, 0.707]
  };

  // CTSchlickGGX_render_sphere, for one light and a view direction of (0, 0, 1).
  function render() {
    var L = state.light;
    var hx = L[0], hy = L[1], hz = L[2] + 1;
    var hl = Math.sqrt(hx * hx + hy * hy + hz * hz) + 1e-8;
    hx /= hl; hy /= hl; hz /= hl;

    var a2 = Math.pow(state.roughness, 4);
    var metallic = Math.max(state.metallic, 0);
    var data = image.data;

    for (var k = 0; k < SIZE * SIZE; k++) {
      var o = 4 * k;
      if (!mask[k]) { data[o + 3] = 0; continue; }
      var nx = N[3 * k], ny = N[3 * k + 1], nz = N[3 * k + 2];

      var NdotL = Math.max(nx * L[0] + ny * L[1] + nz * L[2], 0);
      var NdotV = Math.max(nz, 0);
      var NdotH = Math.max(nx * hx + ny * hy + nz * hz, 0);

      var Fr = FRESNEL + (1 - FRESNEL) * Math.pow(1 - NdotV, 5);
      var kD = (1 - Fr) * (1 - metallic);

      var d = NdotH * NdotH * (a2 - 1) + 1;
      var NDF = a2 / (Math.PI * d * d);

      var G_V = NdotV + Math.sqrt(NdotV * NdotV * (1 - a2) + a2);
      var G_L = NdotL + Math.sqrt(NdotL * NdotL * (1 - a2) + a2);
      var G = 1 / (G_L * G_V);

      var F = FRESNEL + (1 - FRESNEL) * Math.pow(1 - NdotH, 5);
      var specular = NDF * G * F;

      var value = AMBIENT * ALBEDO +
        ((kD * ALBEDO) / Math.PI + specular) * LIGHT_INTENSITY * NdotL;

      // Display only: clamp and gamma-encode the linear value.
      var v = Math.round(255 * Math.pow(Math.min(Math.max(value, 0), 1), 1 / 2.2));
      data[o] = data[o + 1] = data[o + 2] = v;
      data[o + 3] = 255;
    }
    ctx.putImageData(image, 0, 0);
  }

  // The light sits at the pointer, a chosen height above the page (in sphere
  // radii). Its direction is taken from the sphere centre towards that point.
  function updateLight() {
    if (state.pointer) {
      var r = canvas.getBoundingClientRect();
      var radius = MASK_RADIUS * (r.width / SIZE);
      var lx = (state.pointer[0] - (r.left + r.width / 2)) / radius;
      var ly = -(state.pointer[1] - (r.top + r.height / 2)) / radius;
      var lz = state.height;
      var len = Math.sqrt(lx * lx + ly * ly + lz * lz) || 1;
      state.light = [lx / len, ly / len, lz / len];
    }
  }

  function fmt(v) { return (v < 0 ? "−" : "") + Math.abs(v).toFixed(2); }

  function updateReadout() {
    var L = state.light;
    var theta = Math.acos(Math.min(Math.max(L[2], -1), 1)) * 180 / Math.PI;
    var phi = Math.atan2(L[1], L[0]) * 180 / Math.PI;
    if (phi < 0) phi += 360;
    set("out-angle", theta.toFixed(1) + "°");
    set("out-azimuth", phi.toFixed(1) + "°");
    set("out-dir", "(" + fmt(L[0]) + ", " + fmt(L[1]) + ", " + fmt(L[2]) + ")");
    set("out-roughness", state.roughness.toFixed(2));
    set("out-metallic", state.metallic.toFixed(2));
    set("out-height", fmt(state.height));
  }

  function set(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  var queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () {
      queued = false;
      updateLight();
      render();
      updateReadout();
    });
  }

  function onPointer(e) {
    state.pointer = [e.clientX, e.clientY];
    schedule();
  }
  document.addEventListener("pointermove", onPointer);
  document.addEventListener("pointerdown", onPointer);
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);

  function bind(id, key) {
    var input = document.getElementById(id);
    if (!input) return;
    input.value = state[key];
    input.addEventListener("input", function () {
      state[key] = parseFloat(input.value);
      schedule();
    });
  }
  bind("in-roughness", "roughness");
  bind("in-metallic", "metallic");
  bind("in-height", "height");

  var reset = document.getElementById("reset");
  if (reset) reset.addEventListener("click", function () {
    ["roughness", "metallic", "height"].forEach(function (key) {
      state[key] = DEFAULTS[key];
      document.getElementById("in-" + key).value = DEFAULTS[key];
    });
    schedule();
  });

  schedule();
})();
