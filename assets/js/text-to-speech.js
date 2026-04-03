/**
 * Text-to-Speech Module for Blog Articles
 * Supports English and Chinese (Traditional & Simplified)
 */

class ArticleTextToSpeech {
  constructor(options = {}) {
    this.container = options.container || document.querySelector('.article-body');
    this.controlsId = options.controlsId || 'tts-controls';
    this.speaking = false;
    this.paused = false;
    this.currentUtterance = null;
    this.synth = window.speechSynthesis;
    this.lang = options.lang || this.detectLanguage();

    if (this.container) {
      this.init();
    }
  }

  detectLanguage() {
    const htmlLang = document.documentElement.lang;
    if (htmlLang.startsWith('zh')) return 'zh-TW';
    return 'en-US';
  }

  init() {
    this.createControls();
    this.attachEventListeners();
  }

  createControls() {
    const controls = document.createElement('div');
    controls.id = this.controlsId;
    controls.className = 'tts-controls';

    controls.innerHTML = `
      <div class="tts-controls-inner">
        <div class="tts-label">
          <svg class="tts-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a7 7 0 0 1 0 9.9M20.16 3.84a11 11 0 0 1 0 15.52"></path>
          </svg>
          <span class="tts-label-text">${this.lang === 'zh-TW' ? '聆聽文章' : 'Listen to Article'}</span>
        </div>

        <div class="tts-controls-buttons">
          <button class="tts-btn tts-play" title="${this.lang === 'zh-TW' ? '播放' : 'Play'}" aria-label="Play">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>

          <button class="tts-btn tts-pause hidden" title="${this.lang === 'zh-TW' ? '暫停' : 'Pause'}" aria-label="Pause">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          </button>

          <button class="tts-btn tts-stop" title="${this.lang === 'zh-TW' ? '停止' : 'Stop'}" aria-label="Stop">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="6" width="12" height="12"></rect>
            </svg>
          </button>

          <div class="tts-separator"></div>

          <div class="tts-speed-control">
            <label for="tts-speed" class="tts-speed-label">
              ${this.lang === 'zh-TW' ? '速度' : 'Speed'}:
            </label>
            <select id="tts-speed" class="tts-speed-select">
              <option value="0.75">0.75x</option>
              <option value="1" selected>1x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
            </select>
          </div>

          <div class="tts-separator"></div>

          <div class="tts-lang-control">
            <label for="tts-lang" class="tts-lang-label">
              ${this.lang === 'zh-TW' ? '語言' : 'Language'}:
            </label>
            <select id="tts-lang" class="tts-lang-select">
              <option value="en-US" ${this.lang === 'en-US' ? 'selected' : ''}>English</option>
              <option value="zh-TW" ${this.lang === 'zh-TW' ? 'selected' : ''}>繁體中文</option>
              <option value="zh-CN">簡體中文</option>
            </select>
          </div>
        </div>
      </div>

      <div class="tts-progress">
        <div class="tts-progress-bar"></div>
      </div>
    `;

    // Insert controls before article-body
    this.container.parentNode.insertBefore(controls, this.container);
    this.controls = controls;
  }

  attachEventListeners() {
    const playBtn = this.controls.querySelector('.tts-play');
    const pauseBtn = this.controls.querySelector('.tts-pause');
    const stopBtn = this.controls.querySelector('.tts-stop');
    const speedSelect = this.controls.querySelector('#tts-speed');
    const langSelect = this.controls.querySelector('#tts-lang');

    playBtn.addEventListener('click', () => this.play());
    pauseBtn.addEventListener('click', () => this.pause());
    stopBtn.addEventListener('click', () => this.stop());
    speedSelect.addEventListener('change', (e) => this.setSpeed(parseFloat(e.target.value)));
    langSelect.addEventListener('change', (e) => {
      this.lang = e.target.value;
      if (this.speaking) this.stop();
    });
  }

  getTextContent() {
    const clone = this.container.cloneNode(true);
    const text = clone.innerText;
    return text;
  }

  play() {
    if (this.paused) {
      this.synth.resume();
      this.paused = false;
      this.updateButtonState();
      return;
    }

    if (this.speaking) return;

    const text = this.getTextContent();
    this.currentUtterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance.lang = this.lang;
    this.currentUtterance.rate = parseFloat(document.querySelector('#tts-speed').value);

    this.currentUtterance.onstart = () => {
      this.speaking = true;
      this.updateButtonState();
    };

    this.currentUtterance.onend = () => {
      this.speaking = false;
      this.paused = false;
      this.updateButtonState();
    };

    this.currentUtterance.onerror = (e) => {
      console.error('Speech error:', e);
      this.speaking = false;
      this.paused = false;
      this.updateButtonState();
    };

    this.synth.cancel();
    this.synth.speak(this.currentUtterance);
  }

  pause() {
    if (this.speaking) {
      this.synth.pause();
      this.paused = true;
      this.updateButtonState();
    }
  }

  stop() {
    this.synth.cancel();
    this.speaking = false;
    this.paused = false;
    this.updateButtonState();
  }

  setSpeed(rate) {
    if (this.currentUtterance) {
      this.currentUtterance.rate = rate;
      if (this.speaking || this.paused) {
        this.stop();
        setTimeout(() => this.play(), 100);
      }
    }
  }

  updateButtonState() {
    const playBtn = this.controls.querySelector('.tts-play');
    const pauseBtn = this.controls.querySelector('.tts-pause');

    if (this.speaking && !this.paused) {
      playBtn.classList.add('hidden');
      pauseBtn.classList.remove('hidden');
    } else {
      playBtn.classList.remove('hidden');
      pauseBtn.classList.add('hidden');
    }
  }

  isSupported() {
    return 'speechSynthesis' in window;
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (new ArticleTextToSpeech().isSupported()) {
      new ArticleTextToSpeech();
    }
  });
} else {
  if (new ArticleTextToSpeech().isSupported()) {
    new ArticleTextToSpeech();
  }
}
