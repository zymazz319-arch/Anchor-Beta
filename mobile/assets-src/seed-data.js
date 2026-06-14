// Generates realistic localStorage seed data for Play Store screenshots only.
// Not used in the shipped app.
const fs = require('fs');

const today = new Date();
function dateStr(offset) {
  const d = new Date(today);
  d.setDate(d.getDate() - offset);
  return d.toISOString().split('T')[0];
}

const triggersByDay = {
  17: ["Stress", "Tiredness"],
  14: ["Loneliness"],
  11: ["Relationship conflict"],
  9: ["Boredom"],
  6: ["Social pressure"],
  3: ["Stress"],
  0: []
};

const checkins = [];
for (let i = 17; i >= 0; i--) {
  // Trend: mood improves over time, HALT + compulsion decrease
  const progress = (17 - i) / 17; // 0 -> 1
  const mood = Math.round(4 + progress * 4 + (Math.sin(i) * 0.6)); // ~4 -> ~8
  const hunger = Math.round(6 - progress * 3 + (Math.cos(i) * 0.5));
  const anger = Math.round(6 - progress * 4 + (Math.sin(i * 1.3) * 0.5));
  const loneliness = Math.round(7 - progress * 4 + (Math.cos(i * 1.7) * 0.5));
  const tired = Math.round(6 - progress * 2 + (Math.sin(i * 0.7) * 0.5));
  const compulsion = Math.round(7 - progress * 5 + (Math.cos(i * 1.1) * 0.5));

  const clamp = (n) => Math.min(10, Math.max(1, n));

  checkins.push({
    id: `seed${i}`,
    date: dateStr(i),
    mood: clamp(mood),
    hunger: clamp(hunger),
    anger: clamp(anger),
    loneliness: clamp(loneliness),
    tired: clamp(tired),
    compulsion: clamp(compulsion),
    triggers: triggersByDay[i] || [],
    note: i === 0 ? "Feeling steady today. Grateful for the small wins." : null,
    createdAt: new Date(`${dateStr(i)}T19:30:00`).toISOString()
  });
}

const journalEntries = [
  {
    id: 'jseed3',
    date: dateStr(1),
    prompt: "What helped me stay grounded today?",
    response: "Took a long walk after work instead of scrolling my phone. Called my sponsor and just talked through my day. It's the little routines that keep adding up.",
    createdAt: new Date(`${dateStr(1)}T21:00:00`).toISOString()
  },
  {
    id: 'jseed2',
    date: dateStr(5),
    prompt: "What am I most grateful for today in my recovery?",
    response: "Grateful that I noticed the urge before it took over. A few weeks ago I wouldn't have even paused. Progress isn't always loud, but it's there.",
    createdAt: new Date(`${dateStr(5)}T20:15:00`).toISOString()
  },
  {
    id: 'jseed1',
    date: dateStr(12),
    prompt: "What was the hardest moment today, and how did I handle it?",
    response: "Ran into an old friend who still uses. Felt the pull for a second, but I just kept walking and texted a friend right after. Felt proud of that.",
    createdAt: new Date(`${dateStr(12)}T18:45:00`).toISOString()
  }
];

fs.writeFileSync('seed-data.json', JSON.stringify({ checkins, journalEntries }, null, 2));
console.log('Wrote seed-data.json with', checkins.length, 'checkins and', journalEntries.length, 'journal entries');
