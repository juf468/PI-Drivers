const toPostDriver = require('../handlers/driverToPost');
const getDrivers = require('../handlers/getDrivers');
const getIdDriver = require('../handlers/getIdDriver');

const routerDriver = require('express').Router();

routerDriver.get('/', getDrivers);
routerDriver.get('/:id', getIdDriver);
routerDriver.post('/', toPostDriver);

module.exports = routerDriver;
