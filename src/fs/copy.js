import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdir, mkdir, copyFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDir = join(__dirname, 'files');
const targetDir = join(__dirname, 'files_copy');
const errorMsg = 'FS operation failed';

const copy = async () => {
    try {
        const filesToBeCopied = await readdir(sourceDir);
        console.log(filesToBeCopied);
        await mkdir(targetDir);
        await Promise.all(
            filesToBeCopied.map(file =>
            copyFile(join(sourceDir, file), join(targetDir, file))
        ));
    } catch (err) {
        throw new Error(errorMsg);
    }
};

await copy();
