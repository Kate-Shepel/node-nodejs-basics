import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileToRead = join(__dirname, 'files', 'fileToRead.txt');
const errorMsg = 'FS operation failed';

const read = async () => {
    try {
        const fileToReadContent = await readFile(fileToRead, 'utf-8');

        console.log(fileToReadContent);
    } catch (err) {
        throw new Error(errorMsg);
    }
};

await read();