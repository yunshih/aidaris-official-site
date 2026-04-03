/**
 * Text-to-Speech Module for Blog Articles
 * Supports English and Chinese with paragraph highlighting
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

    // Segment tracking
    this.segments = [];
    this.currentSegmentIndex = 0;

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
    this.extractSegments();
    this.createControls();
    this.attachEventListeners();
  }

  extractSegments() {
    // Extract all readable segments: paragraphs, list items, and headings
    const selectors = ['.article-body > p', '.article-body > ul > li', '.article-body > ol > li', '.article-body > h2'];
    const elements = this.container.querySelectorAll(selectors.join(', '));

    this.segments = Array.from(elements).map(el => ({
      element: el,
      text: el.innerText || el.textContent
    })).filter(seg => seg.text.trim().length > 0);
  }

  createControls() {
    const controls = document.createElement('div');
    controls.id = this.controlsId;
    controls.className = 'tts-controls';

    controls.innerHTML = `
      <div class="tts-controls-inner">
        <div class="tts-label">
          <svg class="tts-icon tts-icon-speaker" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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

    playBtn.addEventListener('click', () => this.play());
    pauseBtn.addEventListener('click', () => this.pause());
    stopBtn.addEventListener('click', () => this.stop());
  }

  playSegment(index) {
    if (index >= this.segments.length) {
      // Finished all segments
      this.speaking = false;
      this.currentSegmentIndex = 0;
      this.clearHighlights();
      this.updateButtonState();
      this.updateVisualFeedback();
      return;
    }

    const segment = this.segments[index];
    const text = segment.text.trim();

    if (!text) {
      // Skip empty segments
      this.playSegment(index + 1);
      return;
    }

    this.currentSegmentIndex = index;
    this.highlightSegment(segment);

    this.currentUtterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance.lang = this.lang;
    this.currentUtterance.rate = 1;

    this.currentUtterance.onstart = () => {
      this.speaking = true;
      this.updateButtonState();
      this.updateVisualFeedback();
    };

    this.currentUtterance.onend = () => {
      // Play next segment
      this.playSegment(index + 1);
    };

    this.currentUtterance.onerror = (e) => {
      console.error('Speech error:', e);
      this.playSegment(index + 1);
    };

    this.synth.cancel();
    this.synth.speak(this.currentUtterance);
  }

  play() {
    if (this.paused) {
      this.synth.resume();
      this.paused = false;
      this.updateButtonState();
      this.updateVisualFeedback();
      return;
    }

    if (this.speaking) return;

    this.currentSegmentIndex = 0;
    this.playSegment(0);
  }

  pause() {
    if (this.speaking) {
      this.synth.pause();
      this.paused = true;
      this.updateButtonState();
      this.updateVisualFeedback();
    }
  }

  stop() {
    this.synth.cancel();
    this.speaking = false;
    this.paused = false;
    this.currentSegmentIndex = 0;
    this.clearHighlights();
    this.updateButtonState();
    this.updateVisualFeedback();
  }

  highlightSegment(segment) {
    this.clearHighlights();
    segment.element.classList.add('tts-highlighted');

    // Scroll to highlighted segment
    segment.element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  clearHighlights() {
    const highlighted = this.container.querySelectorAll('.tts-highlighted');
    highlighted.forEach(el => el.classList.remove('tts-highlighted'));
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

  updateVisualFeedback() {
    const controls = this.controls;
    if (this.speaking && !this.paused) {
      controls.classList.add('tts-playing');
    } else {
      controls.classList.remove('tts-playing');
    }
  }

  isSupported() {
    return 'speechSynthesis' in window;
  }
}

// Auto-initialize when DOM is ready
function initTTS() {
  if ('speechSynthesis' in window) {
    new ArticleTextToSpeech();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTTS);
} else {
  initTTS();
}
