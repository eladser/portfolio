// Google Analytics (GA4).
//
// gtag.js is ~488 KB raw / ~163 KB over the wire and can't be slimmed — it's Google's
// bundle and ships the whole tag platform (consent mode, Ads, enhanced measurement)
// whether or not any of it is used. What we can control is *when* it loads, so it's
// deferred until the page is idle or the visitor interacts. Keeps 163 KB out of the
// LCP window; the trade-off is that a bounce inside the first second may go unlogged.
(function () {
  var ID = 'G-Q92S02RPVS';
  var started = false;

  function start() {
    if (started) return;
    started = true;

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', ID);

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    document.head.appendChild(s);
  }

  // Whichever comes first: a real interaction, browser idle, or a 4s backstop.
  ['pointerdown', 'keydown', 'touchstart', 'scroll'].forEach(function (evt) {
    window.addEventListener(evt, start, { once: true, passive: true });
  });
  if ('requestIdleCallback' in window) {
    requestIdleCallback(start, { timeout: 4000 });
  } else {
    setTimeout(start, 3000);
  }
})();
