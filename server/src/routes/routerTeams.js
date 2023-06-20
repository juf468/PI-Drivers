const getTeams = require('../handlers/getAllTeams');

const routerTeams = require('express').Router();

routerTeams.get('/', getTeams);
module.exports = routerTeams;
