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
  const newData = {
    type: req.body.type,
    brand: req.body.brand,
    capacity: req.body.capacity,
    location: req.body.location,
    price: req.body.price,
    isAvailable: req.body.isAvailable,
  };
  vehicleModel.addVehicle(newData, () => res.json({
    success: true,
    message: 'Successfully added',
    data: newData,
  }));
};

const editVehicle = (req, res) => {
  const dataEdit = {
    type: req.body.type,
    brand: req.body.brand,
    capacity: req.body.capacity,
    location: req.body.location,
    price: req.body.price,
    isAvailable: req.body.isAvailable,
  };
  const { id } = req.params;
  vehicleModel.editVehicle(dataEdit, id, (results) => {
    if (results.changedRows > 0) {
      return res.json({
        success: true,
        message: 'Edited Succesfully',
      });
    }
    return res.status(404).json({
      success: false,
      message: `Edited Failed, vehicle not found with id ${id}`,
    });
  });
};

const deleteVehicle = (req, res) => {
  const { id } = req.params;
  vehicleModel.deleteVehicle(id, (results) => {
    if (results.affectedRows > 0) {
      return res.json({
        success: true,
        message: 'Deleted Successfully',
      });
    }
    return res.status(404).json({
      success: false,
      message: `Delete Failed, vehicle not found with id ${id}`,
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
