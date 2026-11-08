(function () {
  var KEY = "lang";
  var body = document.body;
  var buttons = document.querySelectorAll(".switch button");

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function save(lang) {
    try { localStorage.setItem(KEY, lang); } catch (e) { /* Speichern nicht möglich: ignorieren */ }
  }

  function setLang(lang) {
    if (lang !== "de" && lang !== "en") lang = "de";
    body.setAttribute("data-lang", lang);
    document.documentElement.lang = lang;
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-set") === lang ? "true" : "false");
    });
    document.title = lang === "en"
      ? "Eries Shala · ERP Project Manager & Senior D365 SCM Consultant"
      : "Eries Shala · ERP Project Manager & Senior D365 SCM Consultant";
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      var lang = b.getAttribute("data-set");
      setLang(lang);
      save(lang);
    });
  });

  // Standard Deutsch; gespeicherte Wahl hat Vorrang
  setLang(stored() || "de");
})();
(function () {
var links = document.querySelectorAll(".side a");
  if (!links.length || !("IntersectionObserver" in window)) return;
  var map = {};
  links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (l) { l.removeAttribute("aria-current"); });
      map[e.target.id].setAttribute("aria-current", "true");
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  Object.keys(map).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) obs.observe(el);
  });
})();
// Fächer-Grafik: Klick/Hover/Tastatur wählt, sonst wechselt sie automatisch
(function () {
  var fan = document.getElementById("fan");
  if (!fan) return;
  var segs = fan.querySelectorAll(".fan-seg");
  var infos = fan.querySelectorAll(".fan-info");
  var cur = 0, timer = null;

  function show(i) {
    cur = i;
    segs.forEach(function (s, k) { s.classList.toggle("is-active", k === i); });
    infos.forEach(function (n, k) { n.classList.toggle("is-active", k === i); });
  }
  function start() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    stop();
    timer = setInterval(function () { show((cur + 1) % segs.length); }, 4000);
  }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }

  segs.forEach(function (s, k) {
    s.addEventListener("mouseenter", function () { show(k); stop(); });
    s.addEventListener("focus", function () { show(k); stop(); });
    s.addEventListener("click", function () { show(k); });
    s.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(k); }
    });
  });
  fan.addEventListener("mouseleave", start);
  start();
})();
