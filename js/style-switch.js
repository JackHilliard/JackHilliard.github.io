/* TEMPORARY: lets you flip between the candidate themes while choosing.
   Once a theme is picked, delete this file, its <script> tag in each page,
   and the unused theme stylesheets. */
(function () {
  var THEMES = { classic: null, web1: "css/web1.css", portal: "css/portal.css", neo: "css/neo.css" };
  var LABELS = { classic: "classic", web1: "web 1.0", portal: "portal", neo: "neo" };
  var DEFAULT = "neo";
  var current = DEFAULT;
  try { current = localStorage.getItem("theme") || DEFAULT; } catch (e) {}
  if (!(current in THEMES)) current = DEFAULT;

  if (THEMES[current]) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = THEMES[current] + "?t=" + Date.now(); // always fetch the latest while iterating
    document.head.appendChild(link);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var footer = document.getElementById("footer");
    if (!footer) return;
    var span = document.createElement("span");
    span.appendChild(document.createTextNode("Style: "));
    Object.keys(THEMES).forEach(function (name, i) {
      if (i) span.appendChild(document.createTextNode(" | "));
      if (name === current) {
        var b = document.createElement("b");
        b.textContent = LABELS[name];
        span.appendChild(b);
      } else {
        var a = document.createElement("a");
        a.href = "#";
        a.textContent = LABELS[name];
        a.onclick = function () {
          try { localStorage.setItem("theme", name); } catch (e) {}
          location.reload();
          return false;
        };
        span.appendChild(a);
      }
    });
    footer.insertBefore(span, footer.lastElementChild);
  });
})();
