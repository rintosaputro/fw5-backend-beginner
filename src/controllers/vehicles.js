const vehicleModel = require('../models/vehicles');

const getVehicles = (req, res) => {
  vehicleModel.getVehicles((results) => res.json({
    success: true,
    message: 'List Vehicles',
    results,
  }));
};

const getVehicle = (req, res) => {
  const { id } = req.params;
  vehicleModel.getVehicle(id, (results) => {
    if (results.length > 0) {
      return res.json({
        success: true,
        message: 'Detail Vehicle',
        results: results[0],
      });
    }
    return res.status(404).json({
      success: false,
      message: `vehicle not found with id ${id}`,
    });
  });
};

const addVehicle = (req, res) => {
  const {
    type, brand, capacity, location, price, isAvailable,
  } = req.body;

  if (type && brand && capacity && location && price && isAvailable) {
    const regex = /\D/gi; // Mencari karakter selain angka
    if (!regex.test(price) && !regex.test(isAvailable)) {
      return vehicleModel.addVehicle(req.body, () => {
        vehicleModel.getVehicles((results) => {
          const newVehicle = results.length - 1;
          res.json({
            success: true,
            message: 'Successfully added new vehicle',
            vehicle: results[newVehicle],
          });
        });
      });
    }
    return res.json({
      success: false,
      message: 'Price and isAvailable must be number',
    });
  }
  return res.status(400).json({
    success: false,
    message: 'Failed to add new vehicle',
  });
};

const editVehicle = (req, res) => {
  const { id } = req.params;
  vehicleModel.editVehicle(req.body, id, (results) => {
    if (results.changedRows > 0) {
      return vehicleModel.getVehicle(id, (vehicle) => res.json({
        success: true,
        message: 'Edited Succesfully',
        results: vehicle[0],
      }));
    }
    return res.status(400).json({
      success: false,
      message: `Failed to edit vehicle with id ${id}`,
    });
  });
};

const deleteVehicle = (req, res) => {
  const { id } = req.params;
  vehicleModel.getVehicle(id, (vehicleDeleted) => {
    vehicleModel.deleteVehicle(id, (results) => {
      if (results.affectedRows > 0) {
        return res.json({
          success: true,
          message: `Vehicle with id ${id} successfully deleted`,
          results: vehicleDeleted[0],
        });
      }
      return res.status(400).json({
        success: false,
        message: `Failed to delete vehicle with id ${id}`,
      });
    });
  });
};

module.exports = {
  getVehicles,
  getVehicle,
  addVehicle,
  editVehicle,
  deleteVehicle,
};
