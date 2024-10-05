import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { stat, rename as modifyFileName } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const oldFileName = join(__dirname, 'files', 'wrongFilename.txt');
const modifiedFileName = join(__dirname, 'files', 'properFilename.md');
const errorMsg = 'FS operation failed';

const rename = async () => {
    try {
        await stat(oldFileName);
        try {
            await stat(modifiedFileName);
            throw new Error(errorMsg);
        } catch (err) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
        }
        await modifyFileName(oldFileName, modifiedFileName);
    } catch (err) {
        throw new Error(errorMsg);
    }
};

await rename();