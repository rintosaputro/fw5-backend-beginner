/* eslint-disable radix */
/* eslint-disable max-len */
const vehicleModel = require('../models/vehicles');

const getVehicles = (req, res) => {
  let { search, page, limit } = req.query;
  search = search || '';
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;

  const offset = (page - 1) * limit;
  const data = { search, limit, offset };

  vehicleModel.getVehicles(data, (results) => {
    vehicleModel.countVehicle(data, (count) => {
      const { total } = count[0];
      const last = Math.ceil(total / limit);
      return res.json({
        success: true,
        message: 'List Vehicles',
        results,
        pageInfo: {
          prev: page > 1 ? `http://localhost:5000/vehicles?page=${page - 1}` : null,
          next: page < last ? `http://localhost:5000/vehicles?page=${page + 1}` : null,
          totalData: total,
          currentPage: page,
          lastPage: last,
        },
      });
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

  if (type && brand && capacity && location && price && qty) {
    const regex = /\D/gi; // Mencari karakter selain angka
    if (!regex.test(price) && !regex.test(qty)) {
      return vehicleModel.addVehicle(req.body, () => {
        vehicleModel.getVehicles((results) => {
          const newVehicle = results.length - 1;
          res.json({
            success: true,
            message: 'Successfully added new vehicle',
            results: results[newVehicle],
          });
        });
      });
    }
    return res.json({
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
