import 'module-alias/register';
const port = 80;
const secure_port = 443;
const development_port = 4000;
let fs = require('fs');
let http = require('http');
let https = require('https');
let certs = null;
let privateKey = null;
let certificate = null;
let credentials = null;
if (fs.existsSync('/data/config/certs')) {
    certs = require('/data/config/certs');
    if (certs.key &&
        certs.crt &&
        fs.existsSync(certs.key) &&
        fs.existsSync(certs.crt)) {
        privateKey = fs.readFileSync(certs.key, 'utf8');
        certificate = fs.readFileSync(certs.crt, 'utf8');
        credentials = { key: privateKey, cert: certificate };
    }
}
const express = require("express");
const app = express();
const compression = require('compression');
// let's setup gzip compression with the middleware compression
const zlib = require('zlib');
app.use(compression({ level: zlib.constants.Z_BEST_COMPRESSION }));
// we set up cookie parser for being able to manage cookies
const cookieParser = require('cookie-parser')
const path = require("path");
// lets parse cookies with cookie-parser midleware
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static'))); //  "static" static folder files
// set the view engine to ejs
app.set("view engine", "ejs");
const api = require("./api");
app.get("/", function(req, res) {
    const api_engine = api.engine;
    let language = req.cookies.language;
    if (language === undefined) { // no language cookie
        language = 'en';
    }
    const command = api_engine.command_list.get_details;
    const homeData = api_engine.get(command, language);
    const defaultData = {
        webTitle: 'Online Resume - Change it on config collection',
        name: 'Your name here - Change it on the personal_details collection',
        surname: 'Your last name here - Change it on the personal_details collection',
        primaryJobName: 'Your primary Job name - Change it on the personal_details collection. You can add a secondary too',
        secondaryJobName: null,
        nickname: 'Your nickname or shortened name here - You can assign it or nullify ir on personal_details collection'
    };
    homeData.then(data => {
        const dataPassed = Object.assign(
            defaultData,
            data.details,
        );
        res.render("home", dataPassed);
    }).catch(e => console.log(e));
    // res.send("Hello World!"); 
});
app.use("/api", api.router); // route to api if url starts with /api
app.use(function(req, res) {
    res.status(404).send("<h1>404/Not found</h1>");
});
const httpServer = http.createServer(app);
var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
    // configure stuff here
    httpServer.listen(development_port, function() {
        console.log(`Online resume backend app listening on port ${development_port}!`);
    });
} else { // production
    const httpsServer = https.createServer(credentials, app);
    httpServer.listen(port, function() {
        console.log(`Online resume backend app listening on port ${port}!`);
    });
    httpsServer.listen(secure_port, function() {
        console.log(`Online resume backend app listening on port ${secure_port}!`);
    });
}
process.on('uncaughtException', function(err) {
    console.error(err);
    console.log("Node NOT Exiting...");
});