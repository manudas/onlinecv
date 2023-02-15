const express = require('express');
const fs = require('fs')
const path = require('path');

const { ConfigModel } = require('@models/Config');
const { Init: MongoInitialiser } = require('@helpers/MongoInitialiser');
const graphql = require('./graphql');

MongoInitialiser();

const getAdminFolder = async () => {
    return await ConfigModel.findOne(
            { key: 'adminFolder'}
    );
}

const adminMiddleware = async(req, res, next) => {
    const adminVirtualFolder = `^/${(await getAdminFolder())?.value ?? 'admin'}[/]{0,1}`;
    const regex = new RegExp(adminVirtualFolder, 'i');
    if (req.url.match(regex)) {
        const adminPath = path.join(__dirname, '..', '..', 'backend-ui', 'dist', 'backend-ui');
        const relativeUrl = req.url.replace(regex, '/');
        if (fs.existsSync(`${adminPath}${relativeUrl}`)) {
            const modifiedRequest = Object.create(Object.getPrototypeOf(req), Object.getOwnPropertyDescriptors(req));
            modifiedRequest.url = relativeUrl;
            express.static(adminPath)(modifiedRequest, res, next);
        } else {
            res.sendFile("index.html", {
                root: adminPath
            });
        }
    } else {
        next()
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
        const notFoundPath = path.join(__dirname, '..', '..', 'notfound');

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
    graphql,
    adminMiddleware,
    notFoundMiddleware
};