import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { stat, readdir } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceFolderPath = join(__dirname, 'files');
const errorMsg = 'FS operation failed';

const list = async () => {
    try {
        const sourseFolderInfo = await stat(sourceFolderPath);

        if (!sourseFolderInfo.isDirectory()) {
            throw new Error(errorMsg);
        }

        const filesToLog = await readdir(sourceFolderPath);

        console.log(filesToLog);
    } catch (err) {
        throw new Error(errorMsg);
    }
};

await list();