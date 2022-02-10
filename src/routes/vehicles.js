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

vehicles.get('/', getVehicles);
vehicles.post('/', verifyUser, addVehicle);
vehicles.get('/category', getVehicleCategory);
vehicles.get('/:id', getVehicle);
vehicles.put('/:id', verifyUser, editAllVehicle);
vehicles.patch('/:id', verifyUser, editVehicle);
vehicles.delete('/:id', verifyUser, deleteVehicle);

module.exports = vehicles;
