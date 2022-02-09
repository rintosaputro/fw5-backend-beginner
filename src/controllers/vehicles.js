/* eslint-disable prefer-const */
/* eslint-disable camelcase */
const fs = require('fs');
const camelCase = require('camelcase-keys');
const vehicleModel = require('../models/vehicles');
const helperGet = require('../helpers/get');
const categoriesModel = require('../models/categories');
const upload = require('../helpers/upload').single('image');
const deleteImg = require('../helpers/deleteImg');
const response = require('../helpers/response');

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
        const pageInfo = {
          prev: page > 1 ? `http://localhost:5000/vehicles/category/?category=${category}&page=${page - 1}&limit=${limit}` : null,
          next: page < last ? `http://localhost:5000/vehicles/category/?category=${category}&page=${page + 1}&limit=${limit}` : null,
          totalData: total,
          currentPage: page,
          lastPage: last,
        };

        return response(res, `List vehicles by category ${category}`, results, pageInfo);
      });
    }
    return response(res, 'Page not found', null, null, 404);
  });
};

const getVehicle = (req, res) => {
  const { id } = req.params;
  vehicleModel.getVehicle(id, (results) => {
    if (results.length > 0) {
      return response(res, 'Detail Vehicle', camelCase(results[0]), null);
    }
    return response(res, `Vehicle not found with id ${id}`, null, null, 404);
  });
};

const addVehicle = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return response(res, err.message, null, null, 400);
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
                deleteImg(req);
                return response(res, 'Failed to add new vehicle. Data already exists', null, null, 400);
              }
              return vehicleModel.addVehicle(data, (addRes) => {
                vehicleModel.getVehicle(addRes.insertId, (results) => response(res, 'Successfully added new vehicle', camelCase(results[0])));
              });
            });
          }
          deleteImg(req);
          return response(res, 'Price and qty must be number', null, null, 400);
        }
        deleteImg(req);
        return response(res, 'id_category not available', null, null, 400);
      });
    }
    deleteImg(req);
    return response(res, 'Failed to add new vehicle, data must be filled', null, null, 400);
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
              return vehicleModel.getVehicle(id, (vehicle) => response(res, 'Edited Succesfully', camelCase(vehicle[0]), null));
            }
            return response(res, `Failed to edit vehicle with id ${id}. Data hasnt changed`, null, null, 400);
          });
        }
        return response(res, 'Price, qty and rent_count must be number', null, null, 400);
      }
      return response(res, 'id category not available', null, null, 400);
    });
  }
  return response(res, `Failed to edit vehicle with id ${id}. Some data is empty.`, null, null, 400);
};

const deleteVehicle = (req, res) => {
  const { id } = req.params;
  vehicleModel.getVehicle(id, (vehicleDeleted) => {
    vehicleModel.deleteVehicle(id, (results) => {
      if (results.affectedRows > 0) {
        if (vehicleDeleted[0].image !== null) {
          const arrImage = vehicleDeleted[0].image.split('/');
          const fileImage = arrImage[arrImage.length - 1];
          return fs.rm(fileImage, {}, (err) => {
            if (err) throw err;
            return response(res, `Vehicle with id ${id} successfully deleted`, camelCase(vehicleDeleted[0]), null);
          });
        }
      }
      return response(res, `Failed to delete vehicle with id ${id}`, null, null, 400);
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
