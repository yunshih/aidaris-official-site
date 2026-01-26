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
};

const config = {
  minParticles: 420,
  maxParticles: 900,
  density: 0.00012,
  speed: 0.5,
  fieldScale: 0.002,
  fade: 0.1,
  glow: 0.35,
  maxDpr: 1.5,
  targetFps: 30,
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

function createParticles() {
  const count = getParticleCount();
  state.particles = Array.from({ length: count }, () => ({
    x: Math.random() * state.width,
    y: Math.random() * state.height,
    vx: 0,
    vy: 0,
    life: Math.random() * 200 + 100,
  }));
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

function animate(timestamp) {
  if (!state.running) return;
  const interval = 1000 / config.targetFps;
  if (timestamp - state.lastFrame >= interval) {
    state.lastFrame = timestamp;
    step();
  }
  state.rafId = requestAnimationFrame(animate);
}

function init() {
  resizeCanvas();
  createParticles();
  ctx.fillStyle = "rgba(2, 3, 1, 1)";
  ctx.fillRect(0, 0, state.width, state.height);
  state.lastFrame = performance.now();
  state.rafId = requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
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

init();
