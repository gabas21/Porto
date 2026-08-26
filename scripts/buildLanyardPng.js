/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require('sharp');
const path = require('path');

const width = 512;
const height = 128;

// 100% Pure Solid Matte Black Fabric (No dashed lines, no patterns, zero artifacts)
const svgString = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#121316"/>
</svg>
`;

const outputWebp = path.join(__dirname, '..', 'public', 'assets', 'lanyard', 'lanyard.webp');
const outputPng = path.join(__dirname, '..', 'public', 'assets', 'lanyard', 'lanyard.png');

sharp(Buffer.from(svgString))
  .webp({ lossless: true, quality: 100 })
  .toFile(outputWebp)
  .then(() => {
    console.log('Successfully generated pure solid black lanyard.webp');
  });

sharp(Buffer.from(svgString))
  .png({ quality: 100 })
  .toFile(outputPng)
  .then(() => {
    console.log('Successfully generated pure solid black lanyard.png');
  });
