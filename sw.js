// Ödemeler service worker: keeps the app usable offline.
// Bump VERSION whenever index.html, sw.js or the icons change: that is what tells an open app a new version is ready.
const VERSION = "odemeler-v7";
const SHELL = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png"];
const PAGE = "index.html";
const NET_WAIT = 3500;  // on a weak connection, show the saved copy after this many ms rather than a blank screen

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Only the app's own page may become the offline copy: never an error page, a redirect,
// or any other address in scope (a 404 saved here would replace the app when offline).
function isAppPage(res){
  if(!res || !res.ok || res.redirected || res.type !== "basic") return false;
  const scope = new URL(self.registration.scope);
  const u = new URL(res.url);
  if(u.origin !== scope.origin) return false;
  return u.pathname === scope.pathname || u.pathname === scope.pathname + PAGE;
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);

  // The page itself: network first so updates arrive; the saved copy when offline, slow, or the server errs.
  if(req.mode === "navigate"){
    const net = fetch(req);
    e.waitUntil(net.then(res => {
      if(!isAppPage(res)) return;
      const copy = res.clone();  // clone now, before the page starts reading the body
      return caches.open(VERSION).then(c => c.put(PAGE, copy));
    }).catch(() => {}));
    e.respondWith(new Promise(resolve => {
      let done = false;
      const finish = r => { if(!done && r){ done = true; resolve(r); } };
      const cached = () => caches.match(PAGE);
      const timer = setTimeout(() => cached().then(finish), NET_WAIT);
      net.then(res => {
        clearTimeout(timer);
        if(res.ok) return finish(res);
        // server error or not found: fall back to the saved copy of the app
        return cached().then(c => finish(c || res));
      }).catch(() => {
        clearTimeout(timer);
        return cached().then(c => finish(c || Response.error()));
      });
    }));
    return;
  }

  // Own files and Google Fonts: serve from cache, fetch and store on first use.
  const isFont = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if(url.origin === self.location.origin || isFont){
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        if(res && (res.ok || res.type === "opaque")){ const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
        return res;
      }))
    );
  }
});
