'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var usersSchema = new Schema({
    name: String,
    email: String,
    password: String
}, { timestamps: true });

usersSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

let users = mongoose.model('users', usersSchema);

users.collection.createIndex({ email: 1 });
users.collection.createIndex({ password: 1 });
users.collection.createIndex({ name: 'text', email: 'text' }, { name: 'userText' });