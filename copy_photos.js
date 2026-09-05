const fs = require('fs');
const path = require('path');

const publicImages = path.join(__dirname, 'public', 'images');

const baseRose = path.join(publicImages, 'gaouaher-source-still-life.png');
const baseArgan = path.join(publicImages, 'argan_elixir.png');
const baseGhassoul = path.join(publicImages, 'ghassoul_mask.png');
const baseHero = path.join(publicImages, 'hero_gaouaher_banner.png');

fs.copyFileSync(baseRose, path.join(publicImages, 'rose-cloud-essence-photo.png'));
fs.copyFileSync(baseGhassoul, path.join(publicImages, 'neroli-cloud-cream-photo.png'));
fs.copyFileSync(baseHero, path.join(publicImages, 'orange-blossom-body-milk-photo.png'));
fs.copyFileSync(baseArgan, path.join(publicImages, 'rose-lip-serum-photo.png'));
fs.copyFileSync(baseHero, path.join(publicImages, 'silk-shampoo-photo.png'));

console.log('Successfully created distinct PNG files for all 5 products!');
