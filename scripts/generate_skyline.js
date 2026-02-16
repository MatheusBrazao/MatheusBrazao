const fs = require("fs");

const weeks = 52;           // 1 ano
const maxHeight = 120;
const buildingWidth = 12;
const gap = 4;

// simulação: depois dá pra trocar pela API do GitHub
const commits = Array.from({ length: weeks }, () =>
  Math.floor(Math.random() * maxHeight)
);

let x = 20;
let buildings = "";

commits.forEach((h, i) => {
  buildings += `
    <rect x="${x}" y="${150 - h}" width="${buildingWidth}" height="${h}"
      fill="url(#neon)"
      opacity="0.9">
      <animate attributeName="opacity"
        values="0.4;1;0.6"
        dur="${2 + i % 3}s"
        repeatCount="indefinite"/>
    </rect>
  `;
  x += buildingWidth + gap;
});

const svg = `
<svg width="900" height="180" viewBox="0 0 900 180"
     xmlns="http://www.w3.org/2000/svg">

  <defs>
    <linearGradient id="neon" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#00f7ff"/>
      <stop offset="100%" stop-color="#7a00ff"/>
    </linearGradient>

    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <rect width="100%" height="100%" fill="#0b0f14"/>

  <g filter="url(#glow)">
    ${buildings}
  </g>

</svg>
`;

fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/skyline.svg", svg);

console.log("Skyline gerado com sucesso");
