import { Transform } from 'stream';
import { stdin, stdout } from 'process';

const transform = async () => {

    const reversedTextfromDataTransform = new Transform({
        transform(dataPiece, encoding, done) {
            const reversedStr = dataPiece.toString().split('').reverse().join('');
            this.push(reversedStr + '\n');
            done();
        }
    });

    stdin.pipe(reversedTextfromDataTransform).pipe(stdout);

    stdin.on('end', () => {
        stdout.write('\n---Data transformation has been finished.---\n');
    });

    reversedTextfromDataTransform.on('error', (error) => {
        console.error('Error:', error);
    });
};

await transform();