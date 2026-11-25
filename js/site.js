/* Renders publication lists from js/publications.js and stamps the
   "last updated" date. No dependencies. */
(function () {
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function pubHtml(p, num) {
    var authors = p.authors.map(function (a) {
      return a === MY_NAME ? "<b>" + esc(a) + "</b>" : esc(a);
    }).join(", ");

    var links = [];
    var l = p.links || {};
    for (var key in l) {
      if (l[key]) links.push('<a href="' + esc(l[key]) + '">[' + esc(key) + "]</a>");
    }
    if (p.bibtex) {
      links.push("<details><summary>[bibtex]</summary><pre>" + esc(p.bibtex) + "</pre></details>");
    }

    var fig = p.figure
      ? '<a class="pub-fig" href="' + esc(p.figure) + '"><img src="' + esc(p.figure) +
        '" alt="' + esc(p.figureAlt || "") + '" loading="lazy"></a>'
      : "";

    return '<li><span class="num">[' + num + "]</span>" + fig +
      '<span class="pub-title">' + esc(p.title) + "</span><br>" +
      authors + "<br>" +
      '<span class="pub-venue">' + esc(p.venue) + "</span>, " + esc(p.year) +
      (links.length ? '<br><span class="pub-links">' + links.join(" ") + "</span>" : "") +
      "</li>";
  }

  function render(target) {
    if (typeof PUBLICATIONS === "undefined") return;
    var all = PUBLICATIONS.slice().sort(function (a, b) { return b.year - a.year; });
    var total = all.length;
    var html = "";

    if (target.getAttribute("data-pubs") === "selected") {
      html = '<ol class="pubs">';
      all.forEach(function (p, i) {
        if (p.selected) html += pubHtml(p, total - i);
      });
      html += "</ol>";
    } else {
      var year = null;
      all.forEach(function (p, i) {
        if (p.year !== year) {
          if (year !== null) html += "</ol>";
          year = p.year;
          html += "<h3>" + esc(year) + '</h3><ol class="pubs">';
        }
        html += pubHtml(p, total - i);
      });
      if (year !== null) html += "</ol>";
    }
    target.innerHTML = html;
  }

  var targets = document.querySelectorAll("[data-pubs]");
  for (var i = 0; i < targets.length; i++) render(targets[i]);

  var stamp = document.getElementById("updated");
  var d = new Date(document.lastModified);
  if (stamp && !isNaN(d)) {
    stamp.textContent = d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  }
})();
