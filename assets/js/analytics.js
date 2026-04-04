/**
 * GTM dataLayer event tracking
 * Pushes custom events for GA4 via GTM-TLBV435S
 */
(function () {
  'use strict';

  window.dataLayer = window.dataLayer || [];

  function push(eventName, params) {
    var payload = { event: eventName };
    for (var key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        payload[key] = params[key];
      }
    }
    window.dataLayer.push(payload);
  }

  var pageLang = document.documentElement.lang || 'en';

  // Language switch clicks
  document.addEventListener('click', function (e) {
    var link = e.target.closest('.lang-switch');
    if (!link) return;
    var href = link.getAttribute('href') || '';
    var toLang = href.indexOf('/zh/') !== -1 ? 'zh-Hant' : 'en';
    push('lang_switch', {
      from_lang: pageLang,
      to_lang: toLang,
      page_location: window.location.href
    });
  });

  // Prev / next article navigation clicks
  document.addEventListener('click', function (e) {
    var link = e.target.closest('.prev-next-link');
    if (!link) return;
    var direction = link.classList.contains('prev-next-prev') ? 'prev' : 'next';
    push('article_navigation', {
      nav_direction: direction,
      target_url: link.href,
      page_location: window.location.href
    });
  });
})();
