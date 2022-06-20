var shortnerRouter = require('./shortner.router');
var userRouter = require('./users.router');
var requiringToRunCronJobs = require('./../controllers/cronjobs.ctrl');
const express = require('express');

router = function(app) {
    app.use('/api/user',userRouter);
    app.use('/api/shortner',shortnerRouter);
};

exports.router = router;