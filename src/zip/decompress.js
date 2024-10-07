import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createGunzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const archiveFilePath = join(__dirname, 'files', 'archive.gz');
const decompressedFilePath = join(__dirname, 'files', 'fileToCompress.txt');

const decompress = async () => {
    try {
        const readingStream = createReadStream(archiveFilePath);
        const writingStream = createWriteStream(decompressedFilePath);
        const decompressionStream = createGunzip();

        readingStream.pipe(decompressionStream).pipe(writingStream);

        writingStream.on('finish', () => {
            console.log('---File has been decompressed successfully.---');
        });

        readingStream.on('error', (error) => {
            console.error('Archive reading error:', error);
        });

        writingStream.on('error', (error) => {
            console.error('File writing error:', error);
        });

        decompressionStream.on('error', (error) => {
            console.error('Decompression error:', error);
        });

    } catch (error) {
        console.error('Error:', error);
    }
};

await decompress();