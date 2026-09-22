# How to freeze columns in a JavaScript data grid

Pins one column to the left edge and one to the right edge of a wide grid, so
both stay in view while the twelve columns between them scroll sideways.

Live demo: https://toclocoinc.github.io/lattice-grid-howto-freeze-columns/

**Read the how-to:** https://www.latticegrid.dev/docs/how-to/freeze-columns/

## The snippet

```js
const grid = LatticeGrid.createGrid(document.getElementById('grid'), {
  rowKey: 'region',
  columns: [
    { field: 'region', title: 'Region', layout: { pin: 'start', width: 190 } },
    // ... the columns that scroll ...
    { field: 'total', title: 'Total', type: 'number', layout: { pin: 'end', width: 150 } },
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
