/**
 * Load the demo in a real headless browser and check that it works.
 *
 * Serves the project locally and drives it with the same minimal Chrome
 * driver the grid's own test suite uses (tools/browser.js), so this needs no
 * dependency beyond Chrome itself.
 *
 * Checks:
 *   - the library arrived and left the LatticeGrid global behind;
 *   - the grid mounted rows;
 *   - both pinned regions (Region at the start, Total at the end) are
 *     present, so the freeze actually happened, not just that a grid drew;
 *   - nothing logged a console error or threw while the page ran.
 *
 * Exits non-zero on any failure, so it can gate a deployment.
 *
 * Usage: node tools/verify.mjs
 */

import { startServer } from './serve.mjs';
import { Browser, available } from './browser.js';

if (!available()) {
  console.log('No headless browser on this machine; skipping verify.mjs.');
  process.exit(0);
}

const { server, port } = await startServer();
const browser = new Browser();

try {
  await browser.start();

  // Collect console errors and thrown errors from the very first script the
  // page runs, before LatticeGrid or demo.js execute.
  await browser.send('Page.addScriptToEvaluateOnNewDocument', {
    source: `
      window.__errs = [];
      addEventListener('error', (e) => window.__errs.push(String(e.message || e)));
      addEventListener('unhandledrejection', (e) => window.__errs.push('unhandledrejection: ' + String(e.reason)));
      const origError = console.error.bind(console);
      console.error = (...args) => { window.__errs.push('console.error: ' + args.map(String).join(' ')); origError(...args); };
    `,
  });

  await browser.open(`http://127.0.0.1:${port}/`);

  const hasGrid = await browser.evaluate(`typeof LatticeGrid !== 'undefined' && typeof LatticeGrid.createGrid === 'function'`);
  const rowCount = await browser.evaluate(`document.querySelectorAll('#grid .lat-row').length`);
  const pinnedStart = await browser.evaluate(`!!document.querySelector('#grid [class*="left-pinned"]')`);
  const pinnedEnd = await browser.evaluate(`!!document.querySelector('#grid [class*="right-pinned"]')`);
  const errors = await browser.evaluate('window.__errs');

  const failures = [];
  if (!hasGrid) failures.push('LatticeGrid.createGrid was not found on the page');
  if (!(rowCount > 0)) failures.push(`expected rendered rows, found ${rowCount}`);
  if (!pinnedStart) failures.push('no start-pinned region was found in the DOM');
  if (!pinnedEnd) failures.push('no end-pinned region was found in the DOM');
  if (errors.length) failures.push(`console/window errors: ${errors.join(' | ')}`);

  if (failures.length) {
    console.error('FAILED:\n' + failures.map((f) => `  - ${f}`).join('\n'));
    process.exitCode = 1;
  } else {
    console.log(`OK: grid loaded, ${rowCount} rows rendered, a pinned region is present, 0 console errors.`);
  }
} finally {
  await browser.close();
  server.close();
}
