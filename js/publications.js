/* Publication list — the single place to add or edit papers.
   Every page that shows publications is generated from this array.

   Fields:
     title    (required)
     authors  (required) array of names, in order
     venue    (required) journal / conference / "Preprint"
     year     (required)
     selected true to also show it on the home page
     figure   optional image path, shown as a thumbnail linking to the full image
     figureAlt  short description of the figure for screen readers
     links    any of: pdf, doi, arxiv, project, code, demo, slides, video  (URLs)
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
    figure: "images/pubs/shedding-light.jpg",
    figureAlt: "Reference and generated light probes compared by their estimated light direction",
    selected: true,
    links: {
      doi: "https://doi.org/10.1145/3842579",
      project: "https://lvsn.github.io/SheddingLight/",
      code: "https://github.com/JustineGiroux/SheddingLightBenchmark",
      demo: "shedding-light.html"
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
    title: "HDR Environment Map Estimation with Latent Diffusion Models",
    authors: ["Jack Hilliard", "Adrian Hilton", "Jean-Yves Guillemaut"],
    venue: "arXiv preprint arXiv:2507.21261",
    year: 2025,
    figure: "images/pubs/hdr-latent-diffusion.jpg",
    figureAlt: "Objects with different surface properties rendered under estimated indoor and outdoor environment maps",
    selected: true,
    links: {
      arxiv: "https://arxiv.org/abs/2507.21261",
      pdf: "https://arxiv.org/pdf/2507.21261"
    },
    bibtex:
      "@article{hilliard2025hdr,\n" +
      "  title   = {HDR Environment Map Estimation with Latent Diffusion Models},\n" +
      "  author  = {Hilliard, Jack and Hilton, Adrian and Guillemaut, Jean-Yves},\n" +
      "  journal = {arXiv preprint arXiv:2507.21261},\n" +
      "  year    = {2025}\n" +
      "}"
  },
  {
    title: "Generative Models for High Dynamic Range Panorama Outpainting from a Single-View Image",
    authors: ["Jack Hilliard"],
    venue: "PhD thesis, University of Surrey",
    year: 2025,
    links: {
      doi: "https://doi.org/10.15126/thesis.901738"
    },
    bibtex:
      "@phdthesis{hilliard2025thesis,\n" +
      "  title  = {Generative Models for High Dynamic Range Panorama Outpainting from a Single-View Image},\n" +
      "  author = {Hilliard, Jack Oliver},\n" +
      "  school = {University of Surrey},\n" +
      "  year   = {2025},\n" +
      "  doi    = {10.15126/thesis.901738}\n" +
      "}"
  },
  {
    title: "360U-Former: HDR Illumination Estimation with Panoramic Adapted Vision Transformers",
    authors: ["Jack Hilliard", "Adrian Hilton", "Jean-Yves Guillemaut"],
    venue: "Computer Vision – ECCV 2024 Workshops, pp. 431–448",
    year: 2025,
    figure: "images/pubs/360u-former.jpg",
    figureAlt: "Objects rendered with 360U-Former and ground-truth environment maps, beside the environment maps themselves",
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
    figure: "images/pubs/hdr-outpainting.jpg",
    figureAlt: "A limited field-of-view image, its placement in a panorama, and the outpainted panorama",
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
