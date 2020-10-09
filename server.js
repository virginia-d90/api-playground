const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const apiRouter = require('./api/api');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api', apiRouter)

module.exports = server;

