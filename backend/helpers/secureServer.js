import fs from 'fs';
import https from 'https';
import path from "path";
import chokidar from 'chokidar';
import debounce from "just-debounce-it";

import { secure_port } from 'app/config/backend/app.js';
import { fileDirName } from 'app/helpers/utils.js';
import niceLog from './logs.js';

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
    if (process.env.domain && fs.existsSync(path.join(fileDirName(import.meta).__dirname, '..', 'certs', 'live', process.env.domain))) {
        credentials = certFiles.reduce((previousCredentialObject, { name: currentName, file: currentFile }) => {
            const result = { ...previousCredentialObject,
                [currentName]: fs.existsSync(path.join(fileDirName(import.meta).__dirname, '..', 'certs', 'live', process.env.domain, currentFile))
                    ? fs.readFileSync(path.join(fileDirName(import.meta).__dirname, '..', 'certs', 'live', process.env.domain, currentFile), 'utf8')
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
    const checkedFiles = certFiles.map(({ file }) => path.join(fileDirName(import.meta).__dirname, '..', 'certs', 'live', process.env.domain, file));

    const initServer = () => {
        // if we have key and certificate, let's enable the secure port
        if (credentials?.key && credentials?.cert) {
            secureServer = https.createServer(credentials, app);
            secureServer.listen(secure_port, () => {
                niceLog({ data: { text: '----------------------------------------------------------------------------------', style: 'yellow' }});
                niceLog({ data: { text: `Secure Online resume BACKEND app listening on port ${secure_port}!`, style: 'yellow' }, attachTimeStamp: true });
                niceLog({ data: { text: '----------------------------------------------------------------------------------', style: 'yellow' }});
            });
        }
    }

    const shutdownServer = (onCloseCallback = undefined) => {
        if (secureServer) {
            niceLog({ data: { text: '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++', style: 'red' }});
            niceLog({ data: { text: 'Secure server is is shuting down', style: 'red' }, attachTimeStamp: true });
            niceLog({ data: { text: '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++', style: 'red' }});
            secureServer.close(onCloseCallback);
            secureServer.closeAllConnections();
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

    if (process.env.domain && fs.existsSync(path.join(fileDirName(import.meta).__dirname, '..', 'certs'))) {
        credentials = loadCredentials();
        chokidar.watch(path.join(fileDirName(import.meta).__dirname, '..', 'certs')).on('all', (event, fullFileName) => {
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

            if ( event === 'addDir' && fullFileName === path.join(fileDirName(import.meta).__dirname, '..', 'certs', 'live', process.env.domain)
                || (event === 'add' || event === 'change') && checkedFiles.includes(fullFileName) ) {
                debouncedRestart();
            } else if ( event === 'unlinkDir' && fullFileName === path.join(fileDirName(import.meta).__dirname, '..', 'certs', 'live', process.env.domain)
                || event === 'unlink' && checkedFiles.includes(fullFileName) ) {
                debouncedShutDown();
            }
        });
    };
    initServer();

    return secureServer;
}

export {
    createSecureServer,
}