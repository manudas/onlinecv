const fs = require('fs')
const path = require('path');

const { Init: MongoInitialiser } = require('@helpers/MongoInitialiser');
const graphql = require('./graphql');
const { getAdminFolder } = require('@helpers/utils');

MongoInitialiser();

const loggingMidleware = (req, _res, next) => {
    console.log(`Requested URL: ${req.url}`);
    next();
}

const adminMiddleware = async(req, res, next) => {
    const adminVirtualFolder = (await getAdminFolder())?.value ?? 'admin';
    const adminVirtualFolderReg = `^/${adminVirtualFolder}[/]{0,1}`;
    const regexAdminFolder = new RegExp(adminVirtualFolderReg, 'i');
    const regexNotFound = /\/notfound/;
    if (req.url.match(regexAdminFolder) && !req.url.match(regexNotFound)) {
        const adminPath = path.join(__dirname, '..', '..', 'webroot', 'backend-ui');
        const relativeUrl = req.url.replace(regexAdminFolder, '/');

        const pathArr = path.join(`${adminPath}/${relativeUrl}`).match(/[^\/]+/g) || [];

        let index = 0;
        while (!fs.existsSync(`${adminPath}/${pathArr.slice(index).join('/')}`) && index < pathArr.length - 1) {
            index++
        }

        const pathname = `${adminPath}/${pathArr.slice(index).join('/')}`;


        if (fs.existsSync(pathname)) {

            const stat = fs.lstatSync(pathname);
            if (stat.isDirectory()) {
                if (!req.url.endsWith('/')) {
                    res.redirect(301, `${req.url}/`);
                } else {
                    res.sendFile(`${pathname}/index.html`);
                }
            } else { // it's a file
                res.sendFile(pathname);
            }

        } else {
            res.sendFile("index.html", {
                root: adminPath
            });
        }
    } else {
        next();
    }
}

const notFoundMiddleware = async(req, res, next) => {
    if (!req.accepts('html') && req.accepts('json')) {
        res.status(404).json({
            error: {
                code: 404,
                message: 'Not found'
            }
        })
    } else {
        const notFoundPath = path.join(__dirname, '..', '..', 'webroot', 'notfound');

        const pathArr = req.path.match(/[^\/]+/g) || [];
        let index = 0;
        while (!fs.existsSync(`${notFoundPath}/${pathArr.slice(index).join('/')}`) && index < pathArr.length - 1) {
            index++
        }

        const pathname = `${notFoundPath}/${pathArr.slice(index).join('/')}`;
        if (fs.existsSync(pathname)) {
            const stat = fs.lstatSync(pathname);
            if (stat.isDirectory()) {
                res.status(404).sendFile(`${pathname}/index.html`);
            } else { // it's a file
                if (pathArr[pathArr.length - 1].toLowerCase() === 'index.html') {
                    res.status(404);
                }
                res.sendFile(pathname);
            }
        } else if (fs.existsSync(`${notFoundPath}/index.html`)) {
            res.status(404).sendFile("index.html", {
                root: notFoundPath
            });
        } else {
            next();
        }
    }
}

module.exports = {
    adminMiddleware,
    graphql,
    loggingMidleware,
    notFoundMiddleware
};