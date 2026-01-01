import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
ffmpeg.setFfmpegPath(ffmpegStatic);

const videosToCompress = [
    // Huge files invoked in src
    { path: '../src/videos/competences.mp4', output: '../src/videos/competences_compressed.mp4' },
    { path: '../src/videos/contact.mp4', output: '../src/videos/contact_compressed.mp4' },
    { path: '../src/videos/projets/chironv2.mp4', output: '../src/videos/projets/chironv2_compressed.mp4' },

    // Public files (duplicates or standalone) that were missed
    { path: '../public/videos/contact.mp4', output: '../public/videos/contact_compressed.mp4' },
    { path: '../public/videos/projets/vitrine.mp4', output: '../public/videos/projets/vitrine_compressed.mp4' },
    { path: '../public/videos/projets/porftolio.mp4', output: '../public/videos/projets/porftolio_compressed.mp4' },
    { path: '../public/videos/projets/bras.mp4', output: '../public/videos/projets/bras_compressed.mp4' },
    { path: '../public/videos/competences.mp4', output: '../public/videos/competences_compressed.mp4' },
    { path: '../public/videos/parcours.mp4', output: '../public/videos/parcours_compressed.mp4' },
];

const compressVideo = (input, output) => {
    return new Promise((resolve, reject) => {
        const inputPath = path.join(__dirname, input);
        const outputPath = path.join(__dirname, output);

        if (!fs.existsSync(inputPath)) {
            console.warn(`File not found: ${inputPath}`);
            resolve();
            return;
        }

        // Check if output already exists to avoid re-compressing if not needed (for subsequent runs)
        // But here we want to force distinct names to be safe.

        console.log(`Compressing ${input} to ${output}...`);

        ffmpeg(inputPath)
            .outputOptions([
                '-c:v libx264',
                '-crf 28',
                '-preset veryfast',
                '-vf scale=-2:720',
                '-c:a aac',
                '-b:a 128k',
                '-movflags +faststart'
            ])
            .save(outputPath)
            .on('end', () => {
                console.log(`Finished ${output}`);
                resolve();
            })
            .on('error', (err) => {
                console.error(`Error compressing ${input}:`, err);
                // Resolve anyway to continue with other files
                resolve();
            });
    });
};

const run = async () => {
    console.log("Starting batch compression...");
    for (const video of videosToCompress) {
        await compressVideo(video.path, video.output);
    }
    console.log('All compressions finished.');
};

run();
