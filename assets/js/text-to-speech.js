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
    this._articleTitle = (document.querySelector('h1.eyebrow') || {}).textContent || document.title;

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
      this.pushEvent('complete');
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

    // Null out handlers on previous utterance before cancel() to prevent
    // browsers (Chrome/Safari) from re-firing onend when cancel() is called.
    if (this.currentUtterance) {
      this.currentUtterance.onstart = null;
      this.currentUtterance.onend = null;
      this.currentUtterance.onerror = null;
    }

    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.lang;
    utterance.rate = 1;
    this.currentUtterance = utterance;

    utterance.onstart = () => {
      this.speaking = true;
      this.updateButtonState();
      this.updateVisualFeedback();
    };

    utterance.onend = () => {
      // Play next segment
      this.playSegment(index + 1);
    };

    utterance.onerror = (e) => {
      if (e.error === 'not-allowed' || e.error === 'synthesis-unavailable' || e.error === 'audio-busy') {
        this.stop();
        this.showError(this.lang === 'zh-TW'
          ? '無法播放語音，請確認瀏覽器允許音訊。'
          : 'Audio playback failed. Check that your browser allows audio.');
      } else {
        this.playSegment(index + 1);
      }
    };

    this.synth.speak(utterance);
  }

  pushEvent(action) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'tts_interaction',
      tts_action: action,
      article_title: this._articleTitle,
      page_location: window.location.href
    });
  }

  play() {
    if (this.paused) {
      this.synth.resume();
      this.paused = false;
      this.updateButtonState();
      this.updateVisualFeedback();
      this.pushEvent('resume');
      return;
    }

    if (this.speaking) return;

    this.currentSegmentIndex = 0;
    this.pushEvent('play');
    this.playSegment(0);
  }

  pause() {
    if (this.speaking) {
      this.synth.pause();
      this.paused = true;
      this.updateButtonState();
      this.updateVisualFeedback();
      this.pushEvent('pause');
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
    this.pushEvent('stop');
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

  showError(message) {
    const existing = this.controls.querySelector('.tts-error');
    if (existing) existing.remove();
    const err = document.createElement('p');
    err.className = 'tts-error';
    err.textContent = message;
    this.controls.appendChild(err);
    setTimeout(() => err.remove(), 6000);
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
