const fs = require('fs');
const https = require('https');
const path = require("path");
const chokidar = require('chokidar');
const debounce = require("just-debounce-it");

const { secure_port } = require('app/config/backend/app');

const certFiles = [
    {
        name: 'key',
        file: 'privkey.pem'
    },
    {
        name: 'cert',
        file: 'fullchain.pem'
    }
];

const loadCredentials = () => {
    let credentials = null;
    if (process.env.domain && fs.existsSync(path.join(__dirname, '..', 'certs', 'live', process.env.domain))) {
        credentials = certFiles.reduce((previousCredentialObject, { name: currentName, file: currentFile }) => {
            const result = { ...previousCredentialObject,
                [currentName]: fs.existsSync(path.join(__dirname, '..', 'certs', 'live', process.env.domain, currentFile))
                    ? fs.readFileSync(path.join(__dirname, '..', 'certs', 'live', process.env.domain, currentFile), 'utf8')
                    : null
            };
            return result;
        }, {});
    }

    return credentials;
}

const createSecureServer = (app) => {
    let credentials = null;
    let secureServer = null;
    const checkedFiles = certFiles.map(({ file }) => path.join(__dirname, '..', 'certs', 'live', process.env.domain, file));

    const initServer = () => {
        // if we have key and certificate, let's enable the secure port
        if (credentials?.key && credentials?.cert) {
            secureServer = https.createServer(credentials, app);
            secureServer.listen(secure_port, () => {
                console.log('----------------------------------------------------------------------------------');
                console.log(`Online resume BACKEND app listening on port ${secure_port}!`);
                console.log('----------------------------------------------------------------------------------');
            });
        }
    }

    const shutdownServer = (onCloseCallback = undefined) => {
        if (secureServer) {
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
            console.log('Secure server is is shuting down');
            secureServer.close(onCloseCallback);
            secureServer.closeAllConnections();
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        }
    }
    const debouncedShutDown = debounce(() => shutdownServer(), 500);

    const restartServer = () => {
        credentials = loadCredentials();
        if (secureServer) {
            shutdownServer(initServer);
        } else {
            initServer();
        }
    }
    const debouncedRestart = debounce(() => restartServer(), 500);

    if (process.env.domain && fs.existsSync(path.join(__dirname, '..', 'certs'))) {
        credentials = loadCredentials();
        chokidar.watch(path.join(__dirname, '..', 'certs')).on('all', (event, fullFileName) => {
            /*
               server  | addDir /app/backend/certs/live/manu.app
               server  | add /app/backend/certs/live/manu.app/fullchain.pem
               server  | add /app/backend/certs/live/manu.app/privkey.pem
               server  | unlinkDir /app/backend/certs/live/manu.app
               server  | unlink /app/backend/certs/live/manu.app/fullchain.pem
               server  | unlink /app/backend/certs/live/manu.app/privkey.pem
               server  | change /app/backend/certs/live/manu.app/privkey.pem
               server  | change /app/backend/certs/live/manu.app/fullchain.pem
            */

            if ( event === 'addDir' && fullFileName === path.join(__dirname, '..', 'certs', 'live', process.env.domain)
                || (event === 'add' || event === 'change') && checkedFiles.includes(fullFileName) ) {
                debouncedRestart();
            } else if ( event === 'unlinkDir' && fullFileName === path.join(__dirname, '..', 'certs', 'live', process.env.domain)
                || event === 'unlink' && checkedFiles.includes(fullFileName) ) {
                debouncedShutDown();
            }
        });
    };
    initServer();

    return secureServer;
}

module.exports = {
    createSecureServer,
}