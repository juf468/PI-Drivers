const express = require('express');
const routerDriver = require('./routerDriver');
const server = express();
const morgan = require('morgan');
const routerTeams = require('./routerTeams');

server.use(morgan('dev'));
server.use(express.json());

server.use('/drivers', routerDriver);
server.use('/teams', routerTeams);

module.exports = server;
