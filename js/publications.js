/* Publication list — the single place to add or edit papers.
   Every page that shows publications is generated from this array.

   Fields:
     title    (required)
     authors  (required) array of names, in order
     venue    (required) journal / conference / "Preprint"
     year     (required)
     selected true to also show it on the home page
     links    any of: pdf, doi, arxiv, code, demo, slides, video  (URLs)
     bibtex   optional BibTeX string, shown behind a [bibtex] toggle
*/

// Your name exactly as it appears in the author lists (shown in bold).
var MY_NAME = "Jack Hilliard";

var PUBLICATIONS = [
  {
    title: "Shedding Light: A Benchmark for Evaluating Lighting Understanding in Generative Image Models",
    authors: ["Justine Giroux", "Jack Hilliard", "Yannick Hold-Geoffroy", "Javier Vazquez-Corral", "Jean-François Lalonde"],
    venue: "ACM Transactions on Graphics, 45(6)",
    year: 2026,
    selected: true,
    links: {
      doi: "https://doi.org/10.1145/3842579"
    },
    bibtex:
      "@article{giroux2026shedding,\n" +
      "  title     = {Shedding Light: A Benchmark for Evaluating Lighting Understanding in Generative Image Models},\n" +
      "  author    = {Giroux, Justine and Hilliard, Jack Oliver and Hold-Geoffroy, Yannick and Vazquez-Corral, Javier and Lalonde, Jean-Fran\\c{c}ois},\n" +
      "  journal   = {ACM Transactions on Graphics},\n" +
      "  volume    = {45},\n" +
      "  number    = {6},\n" +
      "  pages     = {1--25},\n" +
      "  year      = {2026},\n" +
      "  publisher = {Association for Computing Machinery},\n" +
      "  doi       = {10.1145/3842579}\n" +
      "}"
  },
  {
    title: "360U-Former: HDR Illumination Estimation with Panoramic Adapted Vision Transformers",
    authors: ["Jack Hilliard", "Adrian Hilton", "Jean-Yves Guillemaut"],
    venue: "Computer Vision – ECCV 2024 Workshops, pp. 431–448",
    year: 2025,
    selected: true,
    links: {
      doi: "https://doi.org/10.1007/978-3-031-91838-4_26"
    },
    bibtex:
      "@inproceedings{hilliard2025360uformer,\n" +
      "  title     = {360U-Former: HDR Illumination Estimation with Panoramic Adapted Vision Transformers},\n" +
      "  author    = {Hilliard, Jack and Hilton, Adrian and Guillemaut, Jean-Yves},\n" +
      "  booktitle = {Computer Vision -- ECCV 2024 Workshops},\n" +
      "  pages     = {431--448},\n" +
      "  year      = {2025},\n" +
      "  publisher = {Springer Nature Switzerland},\n" +
      "  doi       = {10.1007/978-3-031-91838-4_26}\n" +
      "}"
  },
  {
    title: "HDR Illumination Outpainting with a Two-Stage GAN Model",
    authors: ["Jack Hilliard", "Adrian Hilton", "Jean-Yves Guillemaut"],
    venue: "Proceedings of the 20th ACM SIGGRAPH European Conference on Visual Media Production (CVMP ’23)",
    year: 2023,
    selected: true,
    links: {
      doi: "https://doi.org/10.1145/3626495.3626510"
    },
    bibtex:
      "@inproceedings{hilliard2023hdr,\n" +
      "  title     = {HDR Illumination Outpainting with a Two-Stage GAN Model},\n" +
      "  author    = {Hilliard, Jack Oliver and Hilton, Adrian and Guillemaut, Jean-Yves},\n" +
      "  booktitle = {Proceedings of the 20th ACM SIGGRAPH European Conference on Visual Media Production},\n" +
      "  series    = {CVMP '23},\n" +
      "  pages     = {1--9},\n" +
      "  year      = {2023},\n" +
      "  publisher = {ACM},\n" +
      "  doi       = {10.1145/3626495.3626510}\n" +
      "}"
  }
];
