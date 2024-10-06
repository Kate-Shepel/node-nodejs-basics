const parseArgs = () => {
    const result = [];
    const commandLineArgs = process.argv.slice(2);

    for (let i = 0; i < commandLineArgs.length; i += 2) {
        const property = commandLineArgs[i].replace('--', '');
        const propValue = commandLineArgs[i + 1];
        result.push(`${property} is ${propValue}`);
    }

    console.log(result.join(', '));
};

parseArgs();