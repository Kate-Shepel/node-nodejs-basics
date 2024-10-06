import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createReadStream } from 'fs';
import { stdout } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileToReadPath = join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
    try {
        const fileReadStream = createReadStream(fileToReadPath, 'utf-8');
        fileReadStream.pipe(stdout);

        fileReadStream.on('end', () => {
            console.log('\n\n-----File reading has been completed.-----');
        });

        fileReadStream.on('error', (error) => {
            console.error('File reading error:', error);
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

await read();