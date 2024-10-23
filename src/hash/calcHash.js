import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';
import { createReadStream } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileToCalcHash = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
    try {
        const hashToLog = createHash('sha256');
        const fileReadStream = createReadStream(fileToCalcHash);

        fileReadStream.on('data', (dataPart) => {
            hashToLog.update(dataPart);
        });

        fileReadStream.on('end', () => {
            const hashToLogInHex = hashToLog.digest('hex');
            console.log(`SHA256 hash for file fileToCalculateHashFor.txt: ${hashToLogInHex}`);
        });

        fileReadStream.on('error', (error) => {
            console.error('Reading file error:', error);
        });
    } catch (error) {
        console.error('Hash calculating error:', error);
    }
};

await calculateHash();