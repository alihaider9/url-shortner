var mongoose = require('mongoose');
const shortenModel = mongoose.model('shortenUrl')
var errorHandler = require('./errorHandler');
var commonFunctions = require('./commonFunctions');
var config = require('./../config/actual.config');
const e = require('express');

exports.shorten = async (req, res) => {
    let expiry = new Date(req.body.expiry);
    let url = req.body.url;
    if(expiry && url){
        let shortCode = commonFunctions.randomStr(6);
        let count = await shortenModel.count({isExpired: false, shortCode: shortCode});
        while(count){
            shortCode = commonFunctions.randomStr(6);
            count = await shortenModel.count({isExpired: false, shortCode: shortCode});
        }
        new shortenModel({
            expiry: expiry,
            url: url,
            shortCode: shortCode,
            createdBy: req.user._id
        }).save().then(shortenEntry => {
            res.json({shortenUrl: `${config.serverUrl}r/${shortCode}`})
        }).catch(err => {
            errorHandler.handle(err, res, 500);
        });
    } else {
        errorHandler.handle('Please enter valid params', res, 400);
    }
}

exports.fullUrl = (req, res) => {
    shortenModel.findOneAndUpdate({shortCode: req.params.shortCode, isExpired: false}, { $inc: { numberClicks: 1 } }).then(shortenEntry => {
        if(shortenEntry && shortenEntry.url){
            // res.redirect(shortenEntry.url);
            res.json(shortenEntry);
        } else {
            res.json({error: 'Invalid URL'})
        }
    }).catch(err => {
        errorHandler.handle(err, res, 500);
    });
}

exports.get = (req, res) => {
    shortenModel.find({createdBy: req.user._id}).then(shortens => {
        res.json(shortens)
    }).catch(err => {
        errorHandler.handle(err, res, 500);
    });
}