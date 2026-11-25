/* Style switcher: the site ships two looks, neo (default) and web 1.0.
   The choice is remembered per browser; a footer link flips between them.
   Without JavaScript the page shows the plain base stylesheet. */
(function () {
  var THEMES = { neo: "css/neo.css", web1: "css/web1.css" };
  var LABELS = { neo: "neo", web1: "web 1.0" };
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
