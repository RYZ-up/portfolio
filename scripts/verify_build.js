import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const videosDir = path.join(distDir, 'videos');

if (!fs.existsSync(distDir)) {
    console.error('❌ dist folder not found! Run npm run build first.');
    process.exit(1);
}

if (!fs.existsSync(videosDir)) {
    console.error('❌ videos folder not found in dist!');
    process.exit(1);
}

const requiredVideos = [
    'soft.mp4',
    'dev.mp4',
    'certi.mp4',
    'projets/1.mp4',
    'projets/bras.mp4',
    'projets/portfolio.mp4',
    'projets/vitrine.mp4',
    'projets/chironv2.mp4',
    'parcours.mp4',
    'projets.mp4',
    'competences.mp4',
    'contact.mp4'
];

let missing = false;

requiredVideos.forEach(video => {
    if (!fs.existsSync(path.join(videosDir, video))) {
        console.error(`❌ Missing video: ${video}`);
        missing = true;
    } else {
        console.log(`✅ Found: ${video}`);
    }
});

if (missing) {
    process.exit(1);
} else {
    console.log('✅ All videos present in dist!');
}
