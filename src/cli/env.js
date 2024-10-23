const parseEnv = () => {
    const variables = process.env;

    const rssVariablesToLog = Object.entries(variables)
        .filter(([key]) => key.startsWith('RSS_'))
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');

    console.log(rssVariablesToLog);
};

parseEnv();