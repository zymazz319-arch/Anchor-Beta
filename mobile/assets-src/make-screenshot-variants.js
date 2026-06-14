// Generates per-screen HTML renders (for Play Store screenshots) from the built
// web app (mobile/www/index.html) plus seed-data.json. Not part of the shipped app.
//
// Usage: node seed-data.js && node make-screenshot-variants.js
const fs = require('fs');
const path = require('path');

const appHtml = fs.readFileSync(path.join(__dirname, '..', 'www', 'index.html'), 'utf8');
const seed = fs.readFileSync(path.join(__dirname, 'seed-data.json'), 'utf8');

const seedScript = `
    <script>
        // SCREENSHOT SEED DATA — not part of the shipped app
        (function() {
            const seed = ${seed};
            localStorage.setItem('anchor_checkins', JSON.stringify(seed.checkins));
            localStorage.setItem('anchor_journal', JSON.stringify(seed.journalEntries));
        })();
    </script>
</body>`;

const seeded = appHtml.replace('</body>', seedScript);
const onloadMarker = 'window.onload = initializeApp;';

const variants = {
    'render-home.html': null,
    'render-checkin.html': "showScreen('checkin');",
    'render-triggers.html': "showScreen('triggers');",
    'render-insights.html': "showScreen('insights');",
    'render-journal.html': "showScreen('journal');",
    'render-crisis.html': "showCrisisSupport();",
};

for (const [filename, navCall] of Object.entries(variants)) {
    let out = seeded;
    if (navCall) {
        const replacement = `window.onload = function() {
            initializeApp();
            setTimeout(function(){ ${navCall} }, 400);
        };`;
        out = seeded.replace(onloadMarker, replacement);
        if (out === seeded) throw new Error(`marker not found for ${filename}`);
    }
    fs.writeFileSync(path.join(__dirname, filename), out);
    console.log('wrote', filename);
}
