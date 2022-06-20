const config = require('./actual.config');
const mongoose = require('mongoose');
var fs = require('fs');

const url = config.dbConnString;

mongoose.Promise = global.Promise;
// , useUnifiedTopology: true useFindAndModify: false useCreateIndex: true
mongoose.connect(url, { useNewUrlParser: true }, function(err) {
    if (err) {
        console.log(err);
    }
});

console.log('about to connect to db');

mongoose.connection.on('connected', function(err, ref) {
    console.log('Connected to mongo server');
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection disconnected');
});