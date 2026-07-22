const fs = require('fs');
const path = require('path');

const dir = __dirname;
const template = fs.readFileSync(path.join(dir, 'dashboard_template.html'), 'utf8');

const map = {
  __CARD1_B64__: 'card1.png',
  __CARD1_1_B64__: 'card1_1.png',
  __CARD2_B64__: 'card2.png',
  __CARD3_B64__: 'card3.png',
  __CARD4_B64__: 'card4.png',
  __CARD4_1_B64__: 'card4_1.png',
  __CARD5_B64__: 'card5.png',
};

let out = template;
for (const [placeholder, file] of Object.entries(map)) {
  const b64 = fs.readFileSync(path.join(dir, file)).toString('base64');
  const dataUri = `data:image/png;base64,${b64}`;
  out = out.split(placeholder).join(dataUri);
}

fs.writeFileSync(path.join(dir, 'techa_dashboard.html'), out);
console.log('done', out.length);
