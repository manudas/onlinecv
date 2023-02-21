require('module-alias/register');

const { port, development_port, secure_port } = require('@config/backend/app');

const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require("express");
const compression = require('compression');
const zlib = require('zlib');
const cookieParser = require('cookie-parser')
const path = require("path");

const { adminMiddleware, graphql, loggingMidleware, notFoundMiddleware } = require("./api");

let certs = null;
let privateKey = null;
let certificate = null;
let credentials = null;

if (fs.existsSync('@config/certs')) {
    const certs = require('@config/certs');
    if ( certs && fs.existsSync(certs?.key ?? '') && fs.existsSync(certs?.crt ?? '') ) {
        privateKey = fs.readFileSync(certs.key, 'utf8');
        certificate = fs.readFileSync(certs.crt, 'utf8');
        credentials = {
            key: privateKey,
            cert: certificate
        };
    }
}

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

//  "frontend/build" static folder files
app.use(express.static(path.join(__dirname, '..', 'webroot', 'frontend')));
// "backend/build" static folder files
app.use(adminMiddleware);

/**
 * Middleware for no found response. Used
 * when the other routers had been exhausted
 * and none of them matched the request url
 */
app.use(notFoundMiddleware);

// let's create the server
const httpServer = http.createServer(app);
const port_to_use = env === 'development' ? development_port : port;
httpServer.listen(port_to_use, () => console.log(`Online resume BACKEND app listening on port ${port_to_use}!`));

// if the server is in production mode, let's enable the secure port
if (env !== 'development') { // production, add secure port
    const httpsServer = https.createServer(app);
    httpsServer.listen(secure_port, () => console.log(`Online resume BACKEND app listening on port ${secure_port}!`));
}

// in case some uncontrolled exception is caught, don't exit
process.on('uncaughtException', function(err) {
    console.error(err);
    console.log("Node NOT Exiting...");
});