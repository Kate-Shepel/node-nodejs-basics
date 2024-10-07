import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const scriptFilePath = join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
    const workerProcess = spawn('node', [scriptFilePath, ...args], {
        stdio: ['pipe', 'pipe', 'inherit']
    });

    process.stdin.pipe(workerProcess.stdin);
    workerProcess.stdout.pipe(process.stdout);

    workerProcess.on('close', (code) => {
        console.log(`Child process exited with the following code: ${code}`);
    });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['arg0', 'arg1', 2, true]);
