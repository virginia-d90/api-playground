const apiRouter = require('express').Router()
const router = require('./example1/example1Router');
const cron = require('node-cron')
const midware = require('../cron/middleware')
const axios = require('axios')
const example1Model = require('../api/example1/example1Model')
const db = require('../data/dbConfig')

apiRouter.use('/example1', router)


// cron.schedule(('*/15 * * * * *'), function(){
//     midware.wipeDB()
//     midware.populateDB()
// })
module.exports = apiRouter