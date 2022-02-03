const vehicles = require('express').Router();

const {
  getVehicles, getVehicleCategory, getVehicle, addVehicle, editVehicle, deleteVehicle,
} = require('../controllers/vehicles');

vehicles.get('/', getVehicles);
vehicles.get('/category', getVehicleCategory);
vehicles.get('/:id', getVehicle);
vehicles.post('/', addVehicle);
vehicles.patch('/:id', editVehicle);
vehicles.delete('/:id', deleteVehicle);

module.exports = vehicles;
