import autopush from 'http2-express-autopush';
import express from "express";
import http2Express from "http2-express-bridge";
import compression from 'compression';
import zlib from 'zlib';
import cookieParser from 'cookie-parser';
import path from "path";

import { adminMiddleware, graphql, loggingMidleware, notFoundMiddleware } from "app/api/index.js";

import { catchUncontrolledException, createSecureServer, createServer } from "app/helpers/server.js";
import { fileDirName } from 'app/helpers/utils.js';

// let's create the express app
// const app = express(); // no http2-bridged version
const app = http2Express(express); // bridged version for http2

// let's setup gzip compression with the middleware compression
app.use(compression({ level: zlib.constants.Z_BEST_COMPRESSION, params: { [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY } }));

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
//  "frontend/build" static folder files. We serve the static files with autopush whenever available
app.use(autopush(path.join(fileDirName(import.meta).__dirname, '..', 'webroot', 'frontend')));
// "backend/build" static folder files
app.use(adminMiddleware);

/**
 * Middleware for no found response. Used
 * when the other routers had been exhausted
 * and none of them matched the request url
 */
app.use(notFoundMiddleware);

// lets create the servers
createServer(app);
createSecureServer(app);

// in case some uncontrolled exception is caught, don't exit
catchUncontrolledException();