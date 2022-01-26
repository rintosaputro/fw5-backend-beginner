const vehicleModel = require('../models/vehicles')

const getVehicles = (req, res) => {
  vehicleModel.getVehicles(results => {
    return res.json({
      success: true,
      message: 'List Vehicles',
      results: results
    })
  })
}

const getVehicle = (req, res) => {
  const id = req.params.id
  vehicleModel.getVehicle(id, results => {
    if (results.length > 0) {
      return res.json({
        success: true,
        message: 'Detail Vehicle',
        results: results[0]
      })
    } else {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      })
    }
  })
}

const addVehicle = (req, res) => {
  const newData = {
    brand: req.body.brand,
    price: req.body.price,
    isAvailable: req.body.isAvailable
  }
  vehicleModel.addVehicle(newData, results => {
    return res.json({
      success: true,
      message: 'Successfully added',
      data: newData
    })
  })
} 

const editVehicle = (req, res) => {
  const dataEdit = {
    brand: req.body.brand,
    price: req.body.price,
    isAvailable: req.body.isAvailable
  }
  const {id} = req.params
  vehicleModel.editVehicle(dataEdit, id, results => {
    if(results.changedRows > 0) {
      return res.json({
        success: true,
        message: 'Edited Succesfully'
      })
    } else {
      return res.status(404).json({
        success: false,
        message: 'Edited Failed'
      })
    } 
  })
}

const deleteVehicle = (req, res) => {
  const id = req.params.id
  vehicleModel.deleteVehicle(id, results => { 
    if(results.affectedRows > 0) {
      return res.json({
        success: true,
        message: 'Deleted Successfully'
      })
    } else {
      return res.status(404).json({
        success: false,
        message: 'Deleted Failed'
      })
    }
  })
}

module.exports = {
  getVehicles,
  getVehicle,
  addVehicle,
  editVehicle,
  deleteVehicle
}