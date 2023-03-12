import http from 'http';
import express from "express";
import compression from 'compression';
import zlib from 'zlib';
import cookieParser from 'cookie-parser';
import path from "path";

import { port, development_port } from 'app/config/backend/app.js';
import { adminMiddleware, graphql, loggingMidleware, notFoundMiddleware } from "app/api/index.js";

import { createSecureServer } from "app/helpers/secureServer.js";
import { fileDirName } from 'app/helpers/utils.js';
import niceLog from './helpers/logs.js';

// We set our enviroment. Either production or development
const env = process.env.NODE_ENV || 'development';

// let's create the express app
const app = express();

// let's setup gzip compression with the middleware compression
app.use(compression({ level: zlib.constants.Z_BEST_COMPRESSION }));

// Add this before the GraphQL middleware
// Needed to upload files through GraphQL
// and maybe to download them too
app.use(express.json({ limit: '1mb' }));

// we set up cookie parser for being able to manage cookies
// lets parse cookies with cookie-parser midleware
app.use(cookieParser());

/** Logging middleware */
app.use(loggingMidleware);

/*
 * Route to graphQL api if url contains
 * /graphql. Used mainly in the backend to
 * modify the data and make consultations
 */
app.use(/(\/.+)*\/graphql/, graphql);

//  "acme challenge for letsencrypt certbot" static folder files
app.use('/.well-known', express.static(path.join(fileDirName(import.meta).__dirname, '..', 'certbot', 'acme-challenge', '.well-known')));
//  "frontend/build" static folder files
app.use(express.static(path.join(fileDirName(import.meta).__dirname, '..', 'webroot', 'frontend')));
// "backend/build" static folder files
app.use(adminMiddleware);

/**
 * Middleware for no found response. Used
 * when the other routers had been exhausted
 * and none of them matched the request url
 */
app.use(notFoundMiddleware);

// let's create the server
const port_to_use = env === 'development' ? [development_port, port] : [port];

port_to_use.forEach(port => {
    const httpServer = http.createServer(app);
    httpServer.listen(port, () => {
        niceLog({ data: { text: '----------------------------------------------------------------------------------', style: 'yellow' }});
        niceLog({ data: { text: `Online resume BACKEND app listening on port ${port}!`, style: 'yellow' }, attachTimeStamp: true });
        niceLog({ data: { text: '----------------------------------------------------------------------------------', style: 'yellow' }});
    })
});
createSecureServer(app);

// in case some uncontrolled exception is caught, don't exit
process.on('uncaughtException', function(err) {
    niceLog({ data: { text: '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++', style: 'red', logLevel: 'error' }});
    niceLog({ data: { text: 'UNCONTROLLED EXCEPTION', style: 'red' }, attachTimeStamp: true, logLevel: 'error' });
    niceLog({ data: { text: error, style: 'red' }, attachTimeStamp: true, logLevel: 'error' });
    niceLog({ data: { text: '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++', style: 'red', logLevel: 'error' }});
    niceLog({ data: { text: 'Node NOT Exiting...', style: 'blue', logLevel: 'log' }});
});