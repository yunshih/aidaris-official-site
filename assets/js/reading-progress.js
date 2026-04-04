(function () {
  var bar = document.createElement('div');
  bar.id = 'reading-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  var readFired = false;

  function update() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var pct = total > 0 ? (scrollTop / total) * 100 : 0;
    bar.style.width = Math.min(pct, 100) + '%';

    if (!readFired && pct >= 95) {
      readFired = true;
      var title = document.querySelector('h1.eyebrow');
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'article_read_complete',
        article_title: title ? title.textContent.trim() : document.title,
        page_location: window.location.href
      });
    }
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();
