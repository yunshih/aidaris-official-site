(function () {
  var bar = document.createElement('div');
  bar.id = 'reading-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  function update() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var pct = total > 0 ? (scrollTop / total) * 100 : 0;
    bar.style.width = Math.min(pct, 100) + '%';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();
