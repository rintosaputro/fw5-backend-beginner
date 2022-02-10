/* eslint-disable prefer-const */
/* eslint-disable camelcase */
const camelCase = require('camelcase-keys');
const vehicleModel = require('../models/vehicles');
const helperGet = require('../helpers/get');
const categoriesModel = require('../models/categories');
const upload = require('../helpers/upload').single('image');
const response = require('../helpers/response');
const deleteImg = require('../helpers/deleteImg');

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

        return response(req, res, `List vehicles by category ${category}`, results, pageInfo);
      });
    }
    return response(req, res, 'Page not found', null, null, 404);
  });
};

const getVehicle = (req, res) => {
  const { id } = req.params;
  vehicleModel.getVehicle(id, (results) => {
    if (results.length > 0) {
      return response(req, res, 'Detail Vehicle', camelCase(results[0]), null);
    }
    return response(req, res, `Vehicle not found with id ${id}`, null, null, 404);
  });
};

const addVehicle = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return response(req, res, err.message, null, null, 400);
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
          const regex = /\D/g;
          if (!regex.test(price) && !regex.test(qty)) {
            const typeCategory = checkType[0].type;
            const data = {
              id_category, type: typeCategory, brand, image, capacity, location, price, qty,
            };
            return vehicleModel.checkVehicle(data, (checkResult) => {
              if (checkResult.length > 0) {
                return response(req, res, 'Failed to add new vehicle. Data already exists', null, null, 400);
              }
              return vehicleModel.addVehicle(data, (addRes) => {
                vehicleModel.getVehicle(addRes.insertId, (results) => response(req, res, 'Successfully added new vehicle', camelCase(results[0])));
              });
            });
          }
          return response(req, res, 'Price and qty must be number', null, null, 400);
        }
        return response(req, res, 'id_category not available', null, null, 400);
      });
    }
    return response(req, res, 'Failed to add new vehicle, data must be filled', null, null, 400);
  });
};

const editAllVehicle = (req, res) => {
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
          return vehicleModel.editAllVehicle(dataBody, id, (results) => {
            if (results.changedRows > 0) {
              return vehicleModel.getVehicle(id, (vehicle) => response(req, res, 'Edited Succesfully', camelCase(vehicle[0]), null));
            }
            return response(req, res, `Failed to edit vehicle with id ${id}. Data hasnt changed`, null, null, 400);
          });
        }
        return response(req, res, 'Price, qty and rent_count must be number', null, null, 400);
      }
      return response(req, res, 'id category not available', null, null, 400);
    });
  }
  return response(req, res, `Failed to edit vehicle with id ${id}. Some data is empty.`, null, null, 400);
};

const editVehicle = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return response(req, res, err.message, null, null, 400);
    }
    const { id } = req.params;
    return vehicleModel.getVehicle(id, (vehicle) => {
      if (vehicle.length > 0) {
        const data = {};
        const input = ['id_category', 'brand', 'capacity', 'location', 'price', 'qty', 'rent_count'];
        input.forEach((item) => {
          if (req.body[item] && req.body[item] !== undefined) {
            data[item] = req.body[item];
          }
        });
        if (req.file) {
          data.image = req.file.path;
        }
        console.log(Object.values(data));
        if (data.price || data.qty || data.rent_count) {
          const pola = /\D/g;
          if (pola.test(data.price)) {
            return response(req, res, 'price must be number', null, null, 404);
          }
          if (pola.test(data.qty)) {
            return response(req, res, 'qty must be number', null, null, 404);
          }
          if (pola.test(data.rent_count)) {
            return response(req, res, 'rent_count must be number', null, null, 404);
          }
        }
        if (data) {
          // return vehicleModel.editAllVehicle(data, id, (results) => {
          //   if (results.affectedRows > 0) {
          // eslint-disable-next-line max-len
          //     return vehicleModel.getVehicle(id, (edited) => response(req, res, 'Data vehicle', edited, null));
          //   }
          //   return response(req, res, 'Failed to update vehicle', null, null, 500);
          // });
          console.log('ok');
        } else {
          console.log('kosong');
        }
        // return response(req, res, 'No data changed', null, null, 404);
      }
      return response(req, res, 'Vehicle not available', null, null, 404);
    });
  });
};

const deleteVehicle = (req, res) => {
  const { id } = req.params;
  vehicleModel.getVehicle(id, (vehicleDeleted) => {
    vehicleModel.deleteVehicle(id, (results) => {
      if (results.affectedRows > 0) {
        deleteImg.rm(vehicleDeleted);
        return response(req, res, `Vehicle with id ${id} successfully deleted`, camelCase(vehicleDeleted[0]), null);
      }
      return response(req, res, `Failed to delete vehicle with id ${id}`, null, null, 400);
    });
  });
};

module.exports = {
  getVehicles,
  getVehicleCategory,
  getVehicle,
  addVehicle,
  editAllVehicle,
  editVehicle,
  deleteVehicle,
};
