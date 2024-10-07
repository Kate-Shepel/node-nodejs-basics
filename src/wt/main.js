import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Worker } from 'worker_threads';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const workerFilePath = join(__dirname, 'worker.js');
const numCores = os.cpus().length;

const performCalculations = async () => {
    const calculationResults = [];

    const createWorker = (workerData) => {
        return new Promise((resolve) => {
            const calculationWorker = new Worker(workerFilePath, { workerData });

            calculationWorker.on('message', (data) => {
                resolve({ status: 'resolved', data });
            });

            calculationWorker.on('error', () => {
                resolve({ status: 'error', data: null });
            });

            calculationWorker.on('exit', (code) => {
                if (code !== 0) {
                    resolve({ status: 'error', data: null });
                }
            });
        });
    };

    const calculationPromises = [];

    for (let i = 0; i < numCores; i++) {
        calculationPromises.push(createWorker(10 + i));
    }

    for (const result of await Promise.all(calculationPromises)) {
        calculationResults.push(result);
    }

    console.log(calculationResults);
};

await performCalculations();