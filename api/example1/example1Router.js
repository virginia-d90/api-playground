require('dotenv').config()
const example1Router = require('express').Router()

example1Router.get('/', (req, res) => {
    res.status(200).json({error:false, message: "welcome to example1"})
})

module.exports = example1Router