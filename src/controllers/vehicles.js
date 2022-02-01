/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable radix */
/* eslint-disable max-len */
const vehicleModel = require('../models/vehicles');
const helperVehicle = require('../helpers/vehicles');

const getVehicles = (req, res) => {
  helperVehicle(req, res, vehicleModel.getVehicles);
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
    const regex = /\D/gi; // Mencari karakter selain angka
    if (!regex.test(price) && !regex.test(qty)) {
      return vehicleModel.addVehicle(dataBody, () => {
        vehicleModel.newVehicle((results) => res.json({
          success: true,
          message: 'Successfully added new vehicle',
          results: results[0],
        }));
      });
    }
    return res.status(400).json({
      success: false,
      message: 'Price and qty must be number',
    });
  }
  return res.status(400).json({
    success: false,
    message: 'Failed to add new vehicle',
  });
};

const editVehicle = (req, res) => {
  const { id } = req.params;
  let {
    type, brand, capacity, location, price, qty, rent_count,
  } = req.body;
  rent_count = rent_count || 0;
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
