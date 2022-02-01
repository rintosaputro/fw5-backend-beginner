const populerModel = require('../models/popular');
const helperVehicle = require('../helpers/vehicles');

const popular = (req, res) => {
  helperVehicle(req, res, populerModel);
};

module.exports = popular;
