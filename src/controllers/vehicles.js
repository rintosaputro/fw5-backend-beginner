/* eslint-disable prefer-const */
/* eslint-disable camelcase */
const vehicleModel = require('../models/vehicles');
const helperGet = require('../helpers/get');

const getVehicles = (req, res) => {
  helperGet(req, res, vehicleModel.getVehicles, vehicleModel.countVehicle, 'vehicles');
};

const getVehicleCategory = (req, res) => {
  const { category } = req.query;
  vehicleModel.getVehicleCategory(category, (results) => {
    if (results.length > 0) {
      return res.json({
        success: true,
        message: 'Vehicles by category',
        results,
      });
    }
    return res.status(404).json({
      success: false,
      message: `Vehicle with category ${category} not found`,
    });
  });
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
    type, brand, capacity, location, price, qty,
  } = req.body;
  const dataBody = {
    type, brand, capacity, location, price, qty,
  };

  if (type && brand && capacity && location && price && qty) {
    const regex = /\D/g; // Mencari karakter selain angka
    if (!regex.test(price) && !regex.test(qty)) {
      return vehicleModel.checkVehicle(dataBody, (checkResult) => {
        if (checkResult.length > 0) {
          return res.status(400).json({
            success: false,
            message: 'Failed to add new vehicle. Data already exists',
          });
        }
        return vehicleModel.addVehicle(dataBody, () => {
          vehicleModel.newVehicle((results) => res.json({
            success: true,
            message: 'Successfully added new vehicle',
            results: results[0],
          }));
        });
      });
    }
    return res.status(400).json({
      success: false,
      message: 'Price and qty must be number',
    });
  }
  return res.status(400).json({
    success: false,
    message: 'Failed to add new vehicle, data must be filled',
  });
};

const editVehicle = (req, res) => {
  const { id } = req.params;
  const {
    type, brand, capacity, location, price, qty, rent_count,
  } = req.body;
  const dataBody = {
    type, brand, capacity, location, price, qty, rent_count,
  };
  vehicleModel.editVehicle(dataBody, id, (results) => {
    if (results.changedRows > 0) {
      return vehicleModel.getVehicle(id, (vehicle) => res.json({
        success: true,
        message: 'Edited Succesfully',
        results: vehicle[0],
      }));
    }
    return res.status(400).json({
      success: false,
      message: `Failed to edit vehicle with id ${id}. Data hasnt changed or data is empty`,
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
  getVehicleCategory,
  getVehicle,
  addVehicle,
  editVehicle,
  deleteVehicle,
};
