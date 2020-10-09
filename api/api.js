const apiRouter = require('express').Router()
const example1Router = require('./example1/example1Router')


apiRouter.use('/example1', example1Router)

apiRouter.get('/', (req, res) => {
    res.status(200).json({error:false, message: "welcome to example1"})
})

module.exports = apiRouter