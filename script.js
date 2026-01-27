const canvas = document.getElementById("flow-canvas");
const ctx = canvas.getContext("2d");

const state = {
  width: 0,
  height: 0,
  particles: [],
  time: 0,
  mouse: { x: 0, y: 0, active: false },
  lastFrame: 0,
  rafId: null,
  running: true,
  disabled: false,
  startTime: 0,
};

const perfSamples = [];
let perfCheckDone = false;

const config = {
  minParticles: 900,
  maxParticles: 2600,
  density: 0.0003,
  speed: 0.7,
  fieldScale: 0.002,
  fade: 0.1,
  glow: 0.35,
  maxDpr: 1.5,
  targetFps: 30,
  rampDurationMs: 6000,
  rampStartRatio: 0.35,
  rampStep: 40,
};

function getParticleCount() {
  const area = state.width * state.height;
  const count = Math.floor(area * config.density);
  return Math.max(config.minParticles, Math.min(config.maxParticles, count));
}

function resizeCanvas() {
  state.width = window.innerWidth;
  state.height = window.innerHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, config.maxDpr);
  canvas.width = state.width * dpr;
  canvas.height = state.height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function createParticles(count = getParticleCount()) {
  state.particles = Array.from({ length: count }, () => ({
    x: Math.random() * state.width,
    y: Math.random() * state.height,
    vx: 0,
    vy: 0,
    life: Math.random() * 200 + 100,
  }));
}

function addParticles(count) {
  for (let i = 0; i < count; i += 1) {
    state.particles.push({
      x: Math.random() * state.width,
      y: Math.random() * state.height,
      vx: 0,
      vy: 0,
      life: Math.random() * 200 + 100,
    });
  }
}

function getRampTarget(timestamp) {
  if (!state.startTime) {
    state.startTime = timestamp;
  }
  const baseCount = getParticleCount();
  const elapsed = Math.max(0, timestamp - state.startTime);
  const ramp = Math.min(1, elapsed / config.rampDurationMs);
  const ratio = config.rampStartRatio + (1 - config.rampStartRatio) * ramp;
  return Math.max(1, Math.floor(baseCount * ratio));
}

function flowField(x, y, t) {
  const nx = x * config.fieldScale;
  const ny = y * config.fieldScale;
  const angle =
    Math.sin(nx * 2.2 + t * 0.7) +
    Math.cos(ny * 2.6 - t * 0.9) +
    Math.sin((nx + ny) * 1.4 + t * 0.5);
  return angle * Math.PI;
}

function tintFor(y) {
  const ratio = y / state.height;
  const top = { r: 35, g: 190, b: 200 };
  const bottom = { r: 190, g: 215, b: 85 };
  const r = Math.floor(top.r + (bottom.r - top.r) * ratio);
  const g = Math.floor(top.g + (bottom.g - top.g) * ratio);
  const b = Math.floor(top.b + (bottom.b - top.b) * ratio);
  return `rgba(${r}, ${g}, ${b}, 0.7)`;
}

function step() {
  state.time += 0.006;
  ctx.fillStyle = `rgba(2, 3, 1, ${config.fade})`;
  ctx.fillRect(0, 0, state.width, state.height);

  ctx.save();
  ctx.globalCompositeOperation = "lighter";

  for (const p of state.particles) {
    const angle = flowField(p.x, p.y, state.time);
    const pullX = state.mouse.active ? (state.mouse.x - p.x) * 0.00035 : 0;
    const pullY = state.mouse.active ? (state.mouse.y - p.y) * 0.00035 : 0;
    p.vx += Math.cos(angle) * config.speed + pullX;
    p.vy += Math.sin(angle) * config.speed + pullY;
    p.vx *= 0.96;
    p.vy *= 0.96;
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 1;

    if (p.x < -50 || p.x > state.width + 50 || p.y < -50 || p.y > state.height + 50 || p.life <= 0) {
      p.x = Math.random() * state.width;
      p.y = Math.random() * state.height;
      p.vx = 0;
      p.vy = 0;
      p.life = Math.random() * 200 + 100;
    }

    ctx.strokeStyle = tintFor(p.y);
    ctx.lineWidth = 0.9;
    ctx.shadowColor = "rgba(182, 234, 95, 0.35)";
    ctx.shadowBlur = 10 * config.glow;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x - p.vx * 1.6, p.y - p.vy * 1.6);
    ctx.stroke();
  }

  ctx.restore();
}

function disableAnimation(hideCanvas = true, reason = "unknown") {
  state.running = false;
  state.disabled = true;
  if (state.rafId !== null) {
    cancelAnimationFrame(state.rafId);
    state.rafId = null;
  }
  if (hideCanvas) {
    canvas.style.display = "none";
  }

  if (reason === "perf") {
    document.body.classList.add("bg-disabled-perf");
  }
}

function animate(timestamp) {
  if (!state.running || state.disabled) return;

  // Collect a small sample of frame intervals to detect slow devices
  if (!perfCheckDone) {
    if (state.lastFrame) {
      perfSamples.push(timestamp - state.lastFrame);
    }
    if (perfSamples.length >= 60) {
      const avg = perfSamples.reduce((a, b) => a + b, 0) / perfSamples.length;
      const fps = 1000 / avg;
      if (fps < 15) {
        // 裝置效能太弱：停用動畫，但保留 canvas 作為靜態背景，並讓中間 AIDARIS 做呼吸燈
        disableAnimation(false, "perf");
        return;
      }
      perfCheckDone = true;
    }
  }

  const targetCount = getRampTarget(timestamp);
  const currentCount = state.particles.length;
  if (currentCount < targetCount) {
    addParticles(Math.min(config.rampStep, targetCount - currentCount));
  } else if (currentCount > targetCount) {
    state.particles.length = targetCount;
  }

  const interval = 1000 / config.targetFps;
  if (timestamp - state.lastFrame >= interval) {
    state.lastFrame = timestamp;
    step();
  }
  state.rafId = requestAnimationFrame(animate);
}

function init() {
  resizeCanvas();
  state.startTime = performance.now();
  createParticles(getRampTarget(state.startTime));
  ctx.fillStyle = "rgba(2, 3, 1, 1)";
  ctx.fillRect(0, 0, state.width, state.height);
  state.lastFrame = performance.now();
  state.rafId = requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  if (state.disabled) return;
  resizeCanvas();
  const now = performance.now();
  createParticles(getRampTarget(now));
});

window.addEventListener("pointermove", (event) => {
  state.mouse.x = event.clientX;
  state.mouse.y = event.clientY;
  state.mouse.active = true;
});

window.addEventListener("pointerleave", () => {
  state.mouse.active = false;
});

document.addEventListener("visibilitychange", () => {
  if (state.disabled) return;
  state.running = !document.hidden;
  if (state.running && state.rafId === null) {
    state.lastFrame = performance.now();
    state.rafId = requestAnimationFrame(animate);
  }
  if (!state.running && state.rafId !== null) {
    cancelAnimationFrame(state.rafId);
    state.rafId = null;
  }
});

function setupLocationToggle() {
  const section = document.querySelector(".location-section");
  const toggle = document.querySelector(".location-toggle");
  const contactSection = document.querySelector(".contact-section");
  const contactToggle = document.querySelector(".contact-toggle");
  if (!section || !toggle) return;

  toggle.addEventListener("click", () => {
    const isOpen = section.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

    if (window.dataLayer) {
      window.dataLayer.push({
        event: "ui_click",
        ui_component: "floating_toggle",
        ui_label: "office",
        ui_state: isOpen ? "open" : "close",
      });
    }

    if (isOpen && contactSection && contactToggle) {
      contactSection.classList.remove("is-open");
      contactToggle.setAttribute("aria-expanded", "false");
    }
  });
}

function setupContactToggle() {
  const section = document.querySelector(".contact-section");
  const toggle = document.querySelector(".contact-toggle");
  const locationSection = document.querySelector(".location-section");
  const locationToggle = document.querySelector(".location-toggle");
  if (!section || !toggle) return;

  toggle.addEventListener("click", () => {
    const isOpen = section.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

    if (window.dataLayer) {
      window.dataLayer.push({
        event: "ui_click",
        ui_component: "floating_toggle",
        ui_label: "contact",
        ui_state: isOpen ? "open" : "close",
      });
    }

    if (isOpen && locationSection && locationToggle) {
      locationSection.classList.remove("is-open");
      locationToggle.setAttribute("aria-expanded", "false");
    }
  });
}

function prefersReducedMotion() {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function startApp() {
  if (prefersReducedMotion()) {
    // 使用者明確偏好減少動態：停用動畫並隱藏 canvas
    disableAnimation(true, "reduced-motion");
  } else {
    init();
  }

  setupLocationToggle();
  setupContactToggle();
}

startApp();
