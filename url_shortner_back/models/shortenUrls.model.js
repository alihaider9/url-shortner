'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var shortenUrlSchema = new Schema({
    url: String,
    shortCode: String,
    createdOn: {
        type: Date,
        default:  new Date()
    },
    expiry: Date,
    numberClicks: {
        type: Number,
        default: 0
    },
    isExpired: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, { timestamps: true });

let shortenUrl = mongoose.model('shortenUrl', shortenUrlSchema);

shortenUrl.collection.createIndex({ url: 1 });
shortenUrl.collection.createIndex({ shortCode: 1 });
shortenUrl.collection.createIndex({ createdOn: 1 });
shortenUrl.collection.createIndex({ createdBy: 1 });
shortenUrl.collection.createIndex({ createdOn: 1 });
shortenUrl.collection.createIndex({ url: 'text', shortCode: 'text' }, { name: 'shortUrlText' });