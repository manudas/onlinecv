const express = require('express');
const router = express.Router();

const dateTime = require('node-datetime');

const engine = require('./api_engine');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    let now = dateTime.create();
    let now_formatted = now.format('d/m/Y H:M:S');
    console.log('Requested API URL:', req.originalUrl, 'Time:',
        now_formatted);
    next();
});

// we define here our REST API router
// get REST API WITH DATA: retrieve some specific data
router.get('/:command/:data', function(req, res) {
    console.log('Received command:', req.params.command, 'Data:', req.params
        .data, 'Query parameters:', req.query);
    const response_data_promise = engine.get(req.params.command, req.params
        .data, req.query);
    if (!response_data_promise) { // not appropriate command
        res.status(404).send('<h1>404/Not found</h1>');
        return;
    }
    response_data_promise.then((resolved_response_data) => {
        res.send(resolved_response_data);
    }).catch(function(err) {
        console.log(err);
        res.status(500).send(
            '<h1>500/Internal server error</h1>');
    });
});

// get REST API WITHOUT DATA: retrieve some general data
router.get('/:command', function(req, res) {
    console.log('Received command:', req.params.command,
        'Query parameters:', req.query);
    const response_data_promise = engine.get(req.params.command, null,
        req.query);
    if (!response_data_promise) { // not appropriate command
        res.status(404).send('<h1>404/Not found</h1>');
        return;
    }
    response_data_promise.then((resolved_response_data) => {
        res.send(resolved_response_data);
    }).catch(function(err) {
        console.log(err);
        res.status(500).send(
            '<h1>500/Internal server error</h1>');
    });
});

/*
// post REST API WITHOUT DATA: insert or modify data
router.post('/about', function (req, res) {
    res.send('About birds');
});

// delete REST API WITHOUT DATA: remove some data
router.delete('/about', function (req, res) {
    res.send('About birds');
});
*/

// End of API router

module.exports = {
    router,
    engine
};