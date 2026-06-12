// Copies the root index.html (single source of truth for the web app / GitHub Pages)
// into mobile/www/ so Capacitor can bundle it into the native Android app.
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'index.html');
const destDir = path.join(__dirname, 'www');
const dest = path.join(destDir, 'index.html');

fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, dest);

console.log(`Synced ${src} -> ${dest}`);
