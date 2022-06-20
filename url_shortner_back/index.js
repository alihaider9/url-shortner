const requiringToConnectDb = require('./config/connect.db');
const express = require('express');
const bodyParser = require('body-parser');
const jsonwebtoken = require("jsonwebtoken");
var config = require('./config/actual.config');

const mongoose = require('mongoose');
const usersModelFile = require('./models/users.model');
const shortenUrlsModelFile = require('./models/shortenUrls.model');

var path = require('path');
global.appRoot = path.resolve(__dirname);

const app = express();
let https = require('http');

app.set('trust proxy', true);

app.use(bodyParser.json({ limit: config.maxJsonSize }));

app.use((req, res, next) => {
    if (req.headers && req.headers.authorization) {
        jsonwebtoken.verify(req.headers.authorization, config.encryptionJwtKey, function(err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept, environment");
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});

mongoose.connection.once('open', function() {
    // All OK - fire (emit) a ready event. 
    app.emit('ready');
});

app.on('ready', function() {
    const router = require('./routes/main.router').router;
    router(app);
});

var serverRequests = https.createServer(app);
serverRequests.listen(config.serverPort);
console.log('server listening to ' + config.serverPort);