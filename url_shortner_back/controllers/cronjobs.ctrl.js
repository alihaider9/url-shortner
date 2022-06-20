var mongoose = require('mongoose');
const shortenUrlModel = mongoose.model('shortenUrl');
// var cron = require('node-cron');
var CronJob = require('cron').CronJob;


function checkExpiredLinks(){
    shortenUrlModel.updateMany({isExpired: false, expiry: {$lte: new Date()}},{$set: {isExpired: true}}).then(resp => {
        console.log('checkExpiredLinks cronjob ran');
    }).catch(err => {
        console.log('error in checkExpiredLinks cronjob ', err);
    });
}

var job = new CronJob(
	'1 1 1 * * *',
	checkExpiredLinks()
);

// cron.schedule('1 1 * * *', () => {
//     checkExpiredLinks();
// });
