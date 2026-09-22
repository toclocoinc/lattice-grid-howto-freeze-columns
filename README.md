# How to freeze columns in a JavaScript data grid

Pins one column to the left edge and one to the right edge of a wide grid, so
both stay in view while the twelve columns between them scroll sideways.

Live demo: https://toclocoinc.github.io/lattice-grid-howto-freeze-columns/

**Read the how-to:** https://www.latticegrid.dev/docs/how-to/freeze-columns/

## The full source

Two files: `index.html` loads the grid and declares the mount point, `demo.js` configures and creates it. Copy both as they are below and it runs.

### index.html

```html
<!doctype html>
<html lang="en-GB">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>How to freeze columns in a JavaScript data grid</title>
    <meta
      name="description"
      content="Pin a column to the left or right edge of a JavaScript data grid with layout: { pin: 'start' | 'end' }, so it stays in view while the rest of a wide table scrolls. Built with Lattice Grid loaded by script tag, no install and no build."
    />
    <link rel="icon" href="data:," />
    <!--
      The grid's stylesheet, from jsDelivr. The address names the exact
      release, 1.68.2, and carries the hash of the file it expects, so the
      page can never quietly pick up a different build than the one it was
      checked against.
    -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@toclocoinc/lattice-grid@1.68.2/lattice-grid.min.css"
      integrity="sha384-mcpd7S8C5nz58bZDAXdYH6rzezEhfN7B4u2SlW426dSe20GnkxTu4TygyOILnCth"
      crossorigin="anonymous"
    />
    <style>
      body { margin: 0; font-family: system-ui, sans-serif; background: #f4f6f9; color: #131a24; }
      header { padding: 1.5rem 1.5rem 0.5rem; max-width: 960px; margin: 0 auto; }
      header p { color: #4a5568; }
      header a { color: #2d6bff; }
      main { max-width: 960px; margin: 0 auto; padding: 0 1.5rem 2.5rem; }
      #grid { height: 520px; }
    </style>
  </head>
  <body>
    <header>
      <h1>How to freeze columns in a JavaScript data grid</h1>
      <p>
        Region is pinned to the left edge, Total is pinned to the right edge, and the
        twelve month columns between them scroll on their own. Read the
        <a href="https://www.latticegrid.dev/docs/how-to/freeze-columns/">full how-to</a>
        on latticegrid.dev.
      </p>
    </header>
    <main>
      <div id="grid"></div>
    </main>

    <!--
      The library, as a classic script tag. No npm install, no bundler, no
      type="module": the file runs as it arrives and leaves the LatticeGrid
      global behind.
    -->
    <script
      src="https://cdn.jsdelivr.net/npm/@toclocoinc/lattice-grid@1.68.2/lattice-grid.min.js"
      integrity="sha384-vCzLyFYn0T0lz/vkdH4x0JpJZkOazZgI2LiGui7lm5uerdZd0Z46G9hr3Aq1FFPS"
      crossorigin="anonymous"
    ></script>
    <script src="./demo.js"></script>
  </body>
</html>
```

### demo.js

```js
/**
 * Freeze columns in a JavaScript data grid.
 *
 * Twelve months of sales run wider than the screen, so the grid needs to
 * scroll sideways to show them all. Region stays pinned to the left edge and
 * Total stays pinned to the right edge, both fixed in place while the twelve
 * month columns between them scroll underneath.
 */

// Tied to toclocoinc.github.io only; has no effect anywhere else and needs
// no key at all to run this page from a local copy.
LatticeGrid.setLicence(
  'LG1.eyJ2IjoxLCJwIjoibGF0dGljZS1ncmlkIiwidCI6IlRPQ0xPQ08gSW5jIC0gcHVibGljIGRlbW9zIiwiZSI6IjIwMzAtMDEtMDEiLCJkIjpbInRvY2xvY29pbmMuZ2l0aHViLmlvIl19.9De42ua3aCGpiMB6EVRP7Tv-upUlDI-0T07rlSPzvCrsqg8t4YJi7SRnStEpAg48uzmcG7il1fR_TfwkUE7iCA'
);

const rows = [
  { region: 'North America', jan: 82100, feb: 79300, mar: 88900, apr: 91200, may: 94600, jun: 97800, jul: 101200, aug: 99500, sep: 96300, oct: 102400, nov: 108900, dec: 121300, total: 1163500 },
  { region: 'EMEA', jan: 64200, feb: 61800, mar: 68300, apr: 70100, may: 72900, jun: 75400, jul: 77200, aug: 76100, sep: 74800, oct: 79300, nov: 84600, dec: 93700, total: 898400 },
  { region: 'UK & Ireland', jan: 41500, feb: 39900, mar: 43200, apr: 44800, may: 46100, jun: 47900, jul: 49300, aug: 48200, sep: 47000, oct: 50100, nov: 53400, dec: 59800, total: 571200 },
  { region: 'DACH', jan: 38700, feb: 37200, mar: 40100, apr: 41600, may: 42900, jun: 44500, jul: 45800, aug: 44900, sep: 43700, oct: 46600, nov: 49700, dec: 55400, total: 531100 },
  { region: 'Southern Europe', jan: 27300, feb: 26100, mar: 28900, apr: 29800, may: 30700, jun: 31900, jul: 32800, aug: 32100, sep: 31300, oct: 33400, nov: 35700, dec: 39900, total: 379900 },
  { region: 'Nordics', jan: 19800, feb: 18900, mar: 20600, apr: 21400, may: 22100, jun: 23000, jul: 23700, aug: 23100, sep: 22500, oct: 24100, nov: 25800, dec: 28900, total: 273900 },
  { region: 'APAC', jan: 55600, feb: 53100, mar: 58900, apr: 60700, may: 62800, jun: 65100, jul: 67300, aug: 65900, sep: 64200, oct: 68500, nov: 73200, dec: 81600, total: 776900 },
  { region: 'Japan', jan: 31200, feb: 29800, mar: 32900, apr: 33900, may: 34900, jun: 36200, jul: 37300, aug: 36600, sep: 35700, oct: 38000, nov: 40600, dec: 45300, total: 412400 },
  { region: 'ANZ', jan: 22400, feb: 21400, mar: 23600, apr: 24300, may: 25100, jun: 26000, jul: 26800, aug: 26200, sep: 25500, oct: 27300, nov: 29200, dec: 32600, total: 310400 },
  { region: 'Latin America', jan: 24900, feb: 23800, mar: 26200, apr: 27000, may: 27900, jun: 28900, jul: 29800, aug: 29100, sep: 28400, oct: 30300, nov: 32400, dec: 36200, total: 344900 },
  { region: 'Brazil', jan: 17600, feb: 16800, mar: 18500, apr: 19100, may: 19700, jun: 20400, jul: 21100, aug: 20600, sep: 20100, oct: 21400, nov: 22900, dec: 25600, total: 243800 },
  { region: 'Middle East & Africa', jan: 15300, feb: 14600, mar: 16100, apr: 16600, may: 17100, jun: 17700, jul: 18300, aug: 17900, sep: 17400, oct: 18600, nov: 19900, dec: 22200, total: 211700 },
];

const money = { style: 'currency', currency: 'USD', decimals: 0 };
const month = (field, title) => ({ field, title, type: 'number', format: money, layout: { width: 108 } });

const grid = LatticeGrid.createGrid(document.getElementById('grid'), {
  rowKey: 'region',
  columns: [
    { field: 'region', title: 'Region', layout: { pin: 'start', width: 190 } },
    month('jan', 'Jan'), month('feb', 'Feb'), month('mar', 'Mar'), month('apr', 'Apr'),
    month('may', 'May'), month('jun', 'Jun'), month('jul', 'Jul'), month('aug', 'Aug'),
    month('sep', 'Sep'), month('oct', 'Oct'), month('nov', 'Nov'), month('dec', 'Dec'),
    { field: 'total', title: 'Total', type: 'number', format: money, layout: { pin: 'end', width: 150 }, total: 'sum' },
  ],
  rows,
});
```

`layout: { pin: 'start' }` fixes a column to the left edge and `pin: 'end'`
fixes one to the right edge. Every other column scrolls independently
between them.

## Running it yourself

Open `index.html` in a browser, or serve the folder with any static file
server. The grid loads from jsDelivr by script tag, so there is no install
and no build step. It runs keyless on `localhost`; the licence key in
`demo.js` is bound to `toclocoinc.github.io` and has no effect anywhere else.

## Licence

MIT, see [LICENSE](./LICENSE). Lattice Grid itself is licensed separately
per domain: https://www.latticegrid.dev/pricing/
