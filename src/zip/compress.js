import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createGzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileToCompressPath = join(__dirname, 'files', 'fileToCompress.txt');
const archiveFilePath = join(__dirname, 'files', 'archive.gz');

const compress = async () => {
    try {
        const readingStream = createReadStream(fileToCompressPath);
        const writingStream = createWriteStream(archiveFilePath);
        const compressionStream = createGzip();

        readingStream.pipe(compressionStream).pipe(writingStream);

        writingStream.on('finish', () => {
            console.log('---File has been compressed successfully.---');
        });

        readingStream.on('error', (e) => {
            console.error('Reading error:', e);
        });

        writingStream.on('error', (e) => {
            console.error('Writing error:', e);
        });

        compressionStream.on('error', (e) => {
            console.error('Compression error:', e);
        });

    } catch (e) {
        console.error('Error:', e);
    }
};

await compress();