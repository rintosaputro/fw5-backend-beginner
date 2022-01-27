const vehicles = require('express').Router();

const {getVehicles, getVehicle, addVehicle, editVehicle, deleteVehicle} = require('../controllers/vehicles');

vehicles.get('/', getVehicles);
vehicles.get('/:id', getVehicle);
vehicles.post('/post', addVehicle);
vehicles.patch('/edit/:id', editVehicle);
vehicles.delete('/delete/:id', deleteVehicle);

module.exports = vehicles;