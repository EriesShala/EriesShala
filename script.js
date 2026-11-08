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
  var links = document.querySelectorAll(".tabs a");
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
(function () {
  var tabs = document.querySelector(".tabs");
  if (!tabs) return;
  function check() { tabs.classList.toggle("is-stuck", tabs.getBoundingClientRect().top <= 0); }
  window.addEventListener("scroll", check, { passive: true });
  check();
})();
