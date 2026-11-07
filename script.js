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
