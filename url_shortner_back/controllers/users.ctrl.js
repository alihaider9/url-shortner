var mongoose = require('mongoose');
const userModel = mongoose.model('users')
var bcrypt = require('bcryptjs');
var errorHandler = require('./errorHandler');
var config = require('./../config/actual.config');
var jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    userModel.findOne({ email: req.body.email }).then(user => {
        if (user && user.comparePassword(req.body.password)) {
            let jwtToken = jwt.sign({
                name: user.name,
                email: user.email,
                type: user.type,
                _id: user._id
            }, config.encryptionJwtKey);
            res.json({ token: jwtToken, user: user });
        } else {
            errorHandler.handle('Invalid email or password', res, 401);
        }
    }).catch(err => {
        errorHandler.handle(err, res, 500);
    });
}

exports.signup = (req, res) => {
    userModel.count({email: req.body.email}).then(count => {
        if(count){
            errorHandler.handle('Email already exists', res, 401);
        } else {
            new userModel({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
            }).save().then(user => {
                let jwtToken = jwt.sign({
                    name: user.name,
                    email: user.email,
                    type: user.type,
                    _id: user._id
                }, config.encryptionJwtKey);
                res.json({ token: jwtToken, user: user });
            }).catch(err => {
                console.log(err);
            });
        }
    }).catch(err => {
        console.log(err);
    });
}

exports.authRequired = (req, res, next) => {
    if (req.user && req.user.email) {
        next();
    } else {
        return res.status(401).json({ error: 'Unauthorized user. Kindly logout and login again.' });
    }
};