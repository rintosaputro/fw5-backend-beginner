/* eslint-disable prefer-const */
/* eslint-disable camelcase */
const fs = require('fs');
const camelCase = require('camelcase-keys');
const vehicleModel = require('../models/vehicles');
const helperGet = require('../helpers/get');
const categoriesModel = require('../models/categories');
const upload = require('../helpers/upload').single('image');

const getVehicles = (req, res) => {
  helperGet(req, res, vehicleModel.getVehicles, vehicleModel.countVehicle, 'vehicles');
};

const getVehicleCategory = (req, res) => {
  let { category, page, limit } = req.query;
  category = category || '';
  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 5;

  const offset = (page - 1) * limit;
  const data = { category, limit, offset };

  vehicleModel.getVehicleCategory(data, (resultsFin) => {
    if (resultsFin.length > 0) {
      return vehicleModel.countVehicleCategory(data, (count) => {
        const { total } = count[0];
        const last = Math.ceil(total / limit);
        const results = camelCase(resultsFin);
        res.json({
          success: true,
          message: `List vehicles by category ${category}`,
          results,
          pageInfo: {
            prev: page > 1 ? `http://localhost:5000/vehicles/category/?category=${category}&page=${page - 1}&limit=${limit}` : null,
            next: page < last ? `http://localhost:5000/vehicles/category/?category=${category}&page=${page + 1}&limit=${limit}` : null,
            totalData: total,
            currentPage: page,
            lastPage: last,
          },
        });
      });
    }
    return res.status(404).json({
      success: false,
      message: 'Data not found',
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
        results: camelCase(results[0]),
      });
    }
    return res.status(404).json({
      success: false,
      message: `vehicle not found with id ${id}`,
    });
  });
};

const addVehicle = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    const {
      id_category, brand, capacity, location, price, qty,
    } = req.body;
    let image;
    if (req.file) {
      image = req.file.path;
    }
    if (id_category && brand && capacity && location && price && qty) {
      return categoriesModel.getCategory(id_category, (checkType) => {
        if (checkType.length > 0) {
          const regex = /\D/g; // Mencari karakter selain angka
          if (!regex.test(price) && !regex.test(qty)) {
            const typeCategory = checkType[0].type;
            const data = {
              id_category, type: typeCategory, brand, image, capacity, location, price, qty,
            };
            return vehicleModel.checkVehicle(data, (checkResult) => {
              if (checkResult.length > 0) {
                return res.status(400).json({
                  success: false,
                  message: 'Failed to add new vehicle. Data already exists',
                });
              }
              return vehicleModel.addVehicle(data, (addRes) => {
                vehicleModel.getVehicle(addRes.insertId, (results) => res.json({
                  success: true,
                  message: 'Successfully added new vehicle',
                  results: camelCase(results[0]),
                }));
              });
            });
          }
          return res.status(400).json({
            success: false,
            message: 'Price and qty must be number',
          });
        }
        return categoriesModel.getTypeIdCategories((typeCtg) => res.status(400).json({
          success: false,
          message: 'id_category not available',
          listCategories: typeCtg,
        }));
      });
    }
    return res.status(400).json({
      success: false,
      message: 'Failed to add new vehicle, data must be filled',
    });
  });
};

const editVehicle = (req, res) => {
  const { id } = req.params;
  const {
    id_category, brand, capacity, location, price, qty, rent_count,
  } = req.body;

  if (id_category && brand && capacity && location && price && qty && rent_count) {
    return categoriesModel.getCategory(id_category, (checkType) => {
      if (checkType.length > 0) {
        const notNum = /\D/g;
        if (!notNum.test(price) && !notNum.test(qty) && !notNum.test(rent_count)) {
          const typeCategory = checkType[0].type;
          const dataBody = {
            id_category, type: typeCategory, brand, capacity, location, price, qty, rent_count,
          };
          return vehicleModel.editVehicle(dataBody, id, (results) => {
            if (results.changedRows > 0) {
              return vehicleModel.getVehicle(id, (vehicle) => res.json({
                success: true,
                message: 'Edited Succesfully',
                results: camelCase(vehicle[0]),
              }));
            }
            return res.status(400).json({
              success: false,
              message: `Failed to edit vehicle with id ${id}. Data hasnt changed`,
            });
          });
        }
        return res.status(400).json({
          success: false,
          message: 'Price, qty and rent_count must be number',
        });
      }
      return categoriesModel.getTypeIdCategories((typeCtg) => res.status(400).json({
        success: false,
        message: 'id_category not available',
        listCategories: typeCtg,
      }));
    });
  }
  return res.status(400).json({
    success: false,
    message: `Failed to edit vehicle with id ${id}. Some data is empty.`,
  });
};

const deleteVehicle = (req, res) => {
  const { id } = req.params;
  vehicleModel.getVehicle(id, (vehicleDeleted) => {
    vehicleModel.deleteVehicle(id, (results) => {
      if (results.affectedRows > 0) {
        const arrImage = vehicleDeleted[0].image.split('/');
        const fileImage = arrImage[arrImage.length - 1];
        return fs.rm(fileImage, {}, (err) => {
          if (err) throw err;
          return res.json({
            success: true,
            message: `Vehicle with id ${id} successfully deleted`,
            results: camelCase(vehicleDeleted[0]),
          });
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
