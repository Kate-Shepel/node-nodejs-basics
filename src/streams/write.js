import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createWriteStream } from 'fs';
import { stdin } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileToWritePath = join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
    try {
        const writeFileStream = createWriteStream(fileToWritePath);

        stdin.pipe(writeFileStream);

        writeFileStream.on('finish', () => {
            console.log('\n---The data has been successfully written to the file.---');
        });

        writeFileStream.on('error', (error) => {
            console.error('File writing error:', error);
        });

        process.on('SIGINT', () => {
            writeFileStream.end();
            console.log('\n-----Closing file stream.-----');
            process.exit();
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

await write();