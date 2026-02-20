const canvas = document.getElementById("flow-canvas");
const ctx = canvas ? canvas.getContext("2d") : null;

const state = {
  width: 0,
  height: 0,
  particles: [],
  lastFrame: 0,
  rafId: null,
  running: true,
  disabled: false,
  startTime: 0,
};

const perfSamples = [];
let perfCheckDone = false;

const baseConfig = {
  minMeteors: 28,
  maxMeteors: 65,
  density: 0.000018,
  speedMin: 2.8,
  speedMax: 6.5,
  trailLength: 42,
  trailLengthNear: 72,
  nearRatio: 0.4,
  fade: 0.04,
  glow: 0.7,
  maxDpr: 1.5,
  targetFps: 30,
  rampDurationMs: 4000,
  rampStartRatio: 0.4,
  rampStep: 3,
  nearLineWidth: 2,
  farLineWidth: 1,
  nearGlow: 1.2,
  farGlow: 0.6,
  nearAlpha: 0.85,
  farAlpha: 0.4,
};

const config = { ...baseConfig };

function applyResponsiveConfig() {
  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    config.minMeteors = 18;
    config.maxMeteors = 40;
    config.density = 0.000012;
    config.speedMin = 2.2;
    config.speedMax = 5;
    config.trailLength = 32;
    config.trailLengthNear = 52;
    config.fade = 0.05;
    config.glow = 0.5;
    config.maxDpr = 1.2;
    config.targetFps = 24;
    config.nearLineWidth = 1.6;
    config.farLineWidth = 0.85;
    config.nearGlow = 1;
    config.farGlow = 0.5;
    config.nearAlpha = 0.75;
    config.farAlpha = 0.35;
  } else {
    Object.assign(config, baseConfig);
  }
}

function getMeteorCount() {
  const area = state.width * state.height;
  const count = Math.floor(area * config.density);
  return Math.max(config.minMeteors, Math.min(config.maxMeteors, count));
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

function randomSpeed() {
  return config.speedMin + Math.random() * (config.speedMax - config.speedMin);
}

function createParticles(count = getMeteorCount()) {
  state.particles = Array.from({ length: count }, () => {
    const speed = randomSpeed();
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.35;
    return {
      x: Math.random() * state.width,
      y: Math.random() * state.height,
      vx: Math.cos(angle) * speed * 0.08,
      vy: Math.sin(angle) * speed,
      layer: Math.random() < config.nearRatio ? 1 : 0,
    };
  });
}

function addParticles(count) {
  for (let i = 0; i < count; i += 1) {
    const speed = randomSpeed();
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.35;
    state.particles.push({
      x: Math.random() * state.width,
      y: Math.random() * state.height,
      vx: Math.cos(angle) * speed * 0.08,
      vy: Math.sin(angle) * speed,
      layer: Math.random() < config.nearRatio ? 1 : 0,
    });
  }
}

function getRampTarget(timestamp) {
  if (!state.startTime) {
    state.startTime = timestamp;
  }
  const baseCount = getMeteorCount();
  const elapsed = Math.max(0, timestamp - state.startTime);
  const ramp = Math.min(1, elapsed / config.rampDurationMs);
  const ratio = config.rampStartRatio + (1 - config.rampStartRatio) * ramp;
  return Math.max(1, Math.floor(baseCount * ratio));
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
  ctx.fillStyle = `rgba(2, 3, 1, ${config.fade})`;
  ctx.fillRect(0, 0, state.width, state.height);

  ctx.save();
  ctx.globalCompositeOperation = "lighter";

  const trailLenNear = config.trailLengthNear;
  const trailLenFar = config.trailLength;

  for (const p of state.particles) {
    const isNear = p.layer === 1;
    const trailLen = isNear ? trailLenNear : trailLenFar;
    const lineWidth = isNear ? config.nearLineWidth : config.farLineWidth;
    const glowScale = isNear ? config.nearGlow : config.farGlow;
    const alpha = isNear ? config.nearAlpha : config.farAlpha;

    p.x += p.vx * dt;
    p.y += p.vy * dt;

    if (p.y < -trailLen - 20) {
      p.x = Math.random() * state.width;
      p.y = state.height + trailLen + Math.random() * 80;
    } else if (p.x < -20 || p.x > state.width + 20) {
      p.x = Math.max(0, Math.min(state.width, p.x));
      p.vx *= -0.6;
    }

    const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy) || 1;
    const tailX = p.x - (p.vx / speed) * trailLen;
    const tailY = p.y - (p.vy / speed) * trailLen;

    const gradient = ctx.createLinearGradient(tailX, tailY, p.x, p.y);
    gradient.addColorStop(0, "rgba(35, 190, 200, 0)");
    gradient.addColorStop(0.4, tintFor((tailY + p.y) / 2, alpha * 0.5));
    gradient.addColorStop(1, tintFor(p.y, alpha));

    ctx.strokeStyle = gradient;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.shadowColor = `rgba(182, 234, 95, ${0.4 + alpha * 0.5})`;
    ctx.shadowBlur = 16 * config.glow * glowScale;
    ctx.beginPath();
    ctx.moveTo(tailX, tailY);
    ctx.lineTo(p.x, p.y);
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
