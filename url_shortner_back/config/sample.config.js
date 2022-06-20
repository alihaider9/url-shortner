let staticVars = {
    development: {
        dbConnString: "mongodb://localhost:27017/quixelShortenUrl",
        serverPort: 51214,
        socketPort: 0,
        serverUrl: 'http://localhost:51214/',
        assetsUrl: 's3 bucket or any storage service',
        env: 'development',
        encryptionJwtKey: 'quixelJwtTestKey'
    },
    production: {
        dbConnString: "actual-url-here",
        serverPort: 51214,
        socketPort: 0,
        serverUrl: 'server-url-here',
        assetsUrl: 'assets-url-here',
        env: 'production',
        encryptionJwtKey: 'key-here'
    }
};
let runningEnv = process.argv[2];
let environments = ["development", "production"];
if (environments.includes(runningEnv) <= 0) {
    throw new Error(`please enter one of the following environemnts: ${environments}`);
}


module.exports = {
    dbConnObj: null,
    maxJsonSize: '50mb',
    dbConnString: staticVars[runningEnv].dbConnString,
    serverPort: staticVars[runningEnv].serverPort,
    socketPort: staticVars[runningEnv].socketPort,
    serverUrl: staticVars[runningEnv].serverUrl,
    assetsUrl: staticVars[runningEnv].assetsUrl,
    encryptionJwtKey: staticVars[runningEnv].encryptionJwtKey,
    runningEnv: runningEnv,
    env: staticVars[runningEnv].env
};