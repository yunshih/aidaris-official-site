const canvas = document.getElementById("flow-canvas");
const ctx = canvas ? canvas.getContext("2d") : null;

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

const baseConfig = {
  minParticles: 900,
  maxParticles: 2600,
  density: 0.0003,
  speed: 0.65,
  fieldScale: 0.0011,
  fade: 0.055,
  glow: 0.6,
  maxDpr: 1.5,
  targetFps: 30,
  rampDurationMs: 6000,
  rampStartRatio: 0.35,
  rampStep: 40,
  nearRatio: 0.35,
  nearSpeed: 1.1,
  farSpeed: 0.78,
  nearLineWidth: 1.3,
  farLineWidth: 0.7,
  nearGlow: 1.1,
  farGlow: 0.6,
  nearAlpha: 0.8,
  farAlpha: 0.35,
};

const config = { ...baseConfig };

function applyResponsiveConfig() {
  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    config.minParticles = 520;
    config.maxParticles = 1400;
    config.density = 0.00018;
    config.speed = 0.55;
    config.fade = 0.07;
    config.glow = 0.45;
    config.maxDpr = 1.2;
    config.targetFps = 24;
    config.nearLineWidth = 1.1;
    config.farLineWidth = 0.6;
    config.nearGlow = 0.9;
    config.farGlow = 0.5;
    config.nearAlpha = 0.7;
    config.farAlpha = 0.3;
  } else {
    Object.assign(config, baseConfig);
  }
}

function getParticleCount() {
  const area = state.width * state.height;
  const count = Math.floor(area * config.density);
  return Math.max(config.minParticles, Math.min(config.maxParticles, count));
}

function resizeCanvas() {
  applyResponsiveConfig();
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
    layer: Math.random() < config.nearRatio ? 1 : 0,
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
      layer: Math.random() < config.nearRatio ? 1 : 0,
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
    Math.sin(nx * 1.5 + t * 0.5) +
    Math.cos(ny * 1.7 - t * 0.7) +
    Math.sin((nx + ny) * 1.0 + t * 0.35);
  return angle * Math.PI;
}

function tintFor(y, alpha) {
  const ratio = y / state.height;
  const top = { r: 35, g: 190, b: 200 };
  const bottom = { r: 190, g: 215, b: 85 };
  const r = Math.floor(top.r + (bottom.r - top.r) * ratio);
  const g = Math.floor(top.g + (bottom.g - top.g) * ratio);
  const b = Math.floor(top.b + (bottom.b - top.b) * ratio);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function step(deltaMs) {
  const dt = Math.min(deltaMs, 50) / 16.67;
  state.time += 0.007 * dt;
  ctx.fillStyle = `rgba(2, 3, 1, ${config.fade})`;
  ctx.fillRect(0, 0, state.width, state.height);

  ctx.save();
  ctx.globalCompositeOperation = "lighter";

  for (const p of state.particles) {
    const isNear = p.layer === 1;
    const speedScale = isNear ? config.nearSpeed : config.farSpeed;
    const lineWidth = isNear ? config.nearLineWidth : config.farLineWidth;
    const glowScale = isNear ? config.nearGlow : config.farGlow;
    const alpha = isNear ? config.nearAlpha : config.farAlpha;
    const angle = flowField(p.x, p.y, state.time);
    const pullX = state.mouse.active ? (state.mouse.x - p.x) * 0.00035 : 0;
    const pullY = state.mouse.active ? (state.mouse.y - p.y) * 0.00035 : 0;
    p.vx += (Math.cos(angle) * config.speed * speedScale + pullX) * dt;
    p.vy += (Math.sin(angle) * config.speed * speedScale + pullY) * dt;
    const damping = Math.pow(0.985, dt);
    p.vx *= damping;
    p.vy *= damping;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.life -= dt;

    if (p.x < -50 || p.x > state.width + 50 || p.y < -50 || p.y > state.height + 50 || p.life <= 0) {
      p.x = Math.random() * state.width;
      p.y = Math.random() * state.height;
      p.vx = 0;
      p.vy = 0;
      p.life = Math.random() * 200 + 100;
    }

    ctx.strokeStyle = tintFor(p.y, alpha);
    ctx.lineWidth = lineWidth;
    ctx.shadowColor = `rgba(182, 234, 95, ${0.35 + alpha * 0.4})`;
    ctx.shadowBlur = 18 * config.glow * glowScale;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x - p.vx * 3.2, p.y - p.vy * 3.2);
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
  if (hideCanvas && canvas) {
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
    const deltaMs = state.lastFrame ? timestamp - state.lastFrame : interval;
    state.lastFrame = timestamp;
    step(deltaMs);
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

let resizeTimer = 0;
window.addEventListener("resize", () => {
  if (state.disabled) return;
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    resizeCanvas();
    const now = performance.now();
    createParticles(getRampTarget(now));
  }, 150);
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

function setupToggles() {
  const panels = [
    {
      label: "office",
      sectionSel: ".location-section",
      toggleSel: ".location-toggle",
    },
    {
      label: "contact",
      sectionSel: ".contact-section",
      toggleSel: ".contact-toggle",
    },
  ];

  const resolved = panels.map((p) => ({
    ...p,
    section: document.querySelector(p.sectionSel),
    toggle: document.querySelector(p.toggleSel),
  }));

  function closePanel(panel) {
    if (!panel.section || !panel.toggle) return;
    panel.section.classList.remove("is-open");
    panel.toggle.setAttribute("aria-expanded", "false");
  }

  resolved.forEach((panel) => {
    if (!panel.section || !panel.toggle) return;
    panel.toggle.addEventListener("click", () => {
      const isOpen = panel.section.classList.toggle("is-open");
      panel.toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

      if (window.dataLayer) {
        window.dataLayer.push({
          event: "ui_click",
          ui_component: "floating_toggle",
          ui_label: panel.label,
          ui_state: isOpen ? "open" : "close",
        });
      }

      // Close other panels when one opens
      if (isOpen) {
        resolved.forEach((other) => {
          if (other !== panel) closePanel(other);
        });
      }
    });
  });

  // Escape to close all panels
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    resolved.forEach(closePanel);
  });

  // Click outside panel to close
  document.addEventListener("click", (e) => {
    const target = e.target;
    const isInsideAnyPanel = resolved.some(
      (panel) =>
        panel.section?.contains(target) || panel.toggle?.contains(target)
    );
    if (!isInsideAnyPanel) resolved.forEach(closePanel);
  });
}

function prefersReducedMotion() {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function updateLocalVersion() {
  const target = document.querySelector("[data-version]");
  if (!target) return;
  const last = new Date(document.lastModified);
  target.textContent = `v${Math.floor(last.getTime() / 1000)}`;
}

function startApp() {
  if (!ctx) {
    // Canvas 2D 不可用（舊版或受限環境）：停用動畫並隱藏 canvas
    disableAnimation(true, "unsupported");
  } else if (prefersReducedMotion()) {
    // 使用者明確偏好減少動態：停用動畫並隱藏 canvas
    disableAnimation(true, "reduced-motion");
  } else {
    init();
  }

  setupToggles();
  updateLocalVersion();
}

startApp();
