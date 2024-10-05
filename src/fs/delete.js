import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { unlink } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileToRemove = join(__dirname, 'files', 'fileToRemove.txt');
const errorMsg = 'FS operation failed';

const remove = async () => {
    try {
        await unlink(fileToRemove);
        console.log(`${fileToRemove} has been successfully deleted.`);
    } catch (err) {
        throw new Error(errorMsg);
    }
};

await remove();