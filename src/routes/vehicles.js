const vehicles = require('express').Router();

const {
  getVehicles,
  getVehicleCategory,
  getVehicle,
  addVehicle,
  editAllVehicle,
  editVehicle,
  deleteVehicle,
} = require('../controllers/vehicles');
const { verifyUser } = require('../helpers/auth');

vehicles.get('/', verifyUser, getVehicles);
vehicles.post('/', addVehicle);
vehicles.get('/category', getVehicleCategory);
vehicles.get('/:id', verifyUser, getVehicle);
vehicles.put('/:id', editAllVehicle);
vehicles.patch('/:id', editVehicle);
vehicles.delete('/:id', deleteVehicle);

module.exports = vehicles;
