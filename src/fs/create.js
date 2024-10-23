import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const newFilePath = join(__dirname, 'files', 'fresh.txt');
const fileContent = 'I am fresh and young';
const errorMsg = 'FS operation failed';

const create = async () => {
    try {
        await writeFile(newFilePath, fileContent, { flag: 'wx' });
    } catch (err) {
        throw new Error(errorMsg);
    }
};

await create();