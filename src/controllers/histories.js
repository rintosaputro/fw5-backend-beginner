/* eslint-disable camelcase */
/* eslint-disable radix */
const historyModel = require('../models/histories');
const vehicleModel = require('../models/vehicles');
const userModel = require('../models/users');

const helperGet = require('../helpers/get');
const checkDate = require('../helpers/checkDate');

const getHistories = (req, res) => {
  helperGet(req, res, historyModel.getHistories, historyModel.countHistory, 'histories');
};

const getHistory = (req, res) => {
  const { id } = req.params;
  historyModel.getHistory(id, (results) => {
    if (results.length > 0) {
      return res.json({
        success: true,
        message: `History with id ${id}`,
        results: results[0],
      });
    }
    return res.status(404).json({
      success: false,
      message: 'History not found',
    });
  });
};

const addHistory = (req, res) => {
  const {
    id_user, id_vehicle, rent_start_date, rent_end_date, prepayment,
  } = req.body;

  if (id_user && id_vehicle && rent_start_date && rent_end_date && prepayment) {
    return userModel.getUser(id_user, (user) => {
      if (user.length > 0) {
        return vehicleModel.getVehicle(id_vehicle, (vehicle) => {
          if (vehicle.length > 0) {
            if (checkDate(rent_start_date) && checkDate(rent_end_date)) {
              const pola = /\D/g;
              if (!pola.test(prepayment)) {
                const status = 'not been returned';
                const data = {
                  id_user, id_vehicle, rent_start_date, rent_end_date, prepayment, status,
                };
                return historyModel.addHistory(data, () => {
                  vehicleModel.addRentCount(id_vehicle);
                  historyModel.newHistory((results) => res.json({
                    success: true,
                    message: 'Successfully added new History',
                    results: results[0],
                  }));
                });
              }
              return res.status(400).json({
                success: false,
                message: 'Prepayment must be number',
              });
            }
            return res.status(400).json({
              success: false,
              message: 'Wrong date input for rent_start_date and rent_end_date. Format date YYYY-MM-DD',
            });
          }
          return res.status(404).json({
            success: false,
            message: 'id_vehicle is undifined',
          });
        });
      }
      return res.status(400).json({
        success: false,
        message: 'id_user is undefined',
      });
    });
  }
  return res.status(400).json({
    success: false,
    message: 'Failed add new history, data must be filled',
  });
};

const editHistory = (req, res) => {
  const { id } = req.params;
  const {
    id_user, id_vehicle, rent_start_date, rent_end_date, prepayment, status,
  } = req.body;

  if (id_user && id_vehicle && rent_start_date && rent_end_date && prepayment && status) {
    return userModel.getUser(id_user, (user) => {
      if (user.length > 0) {
        return vehicleModel.getVehicle(id_vehicle, (vehicle) => {
          if (vehicle.length > 0) {
            const pola = /\D/g;
            if (!pola.test(prepayment)) {
              if (checkDate(rent_start_date) && checkDate(rent_end_date)) {
                const notReturned = 'not been returned';
                const returned = 'has been returned';
                if (status.toLowerCase() === notReturned || status.toLowerCase() === returned) {
                  const data = {
                    id_user, id_vehicle, rent_start_date, rent_end_date, prepayment, status,
                  };
                  return historyModel.editHistory(data, id, (results) => {
                    if (results.changedRows > 0) {
                      return historyModel.getHistory(id, (rslt) => res.json({
                        success: true,
                        message: 'Edited successfully',
                        results: rslt,
                      }));
                    }
                    return res.status(400).json({
                      success: false,
                      message: `Failed to edit history with id ${id}. Data has not changed`,
                    });
                  });
                }
                return res.status(400).json({
                  success: false,
                  message: `Failed to edit histories, status must be one of '${notReturned}' / '${returned}'`,
                });
              }
              return res.status(400).json({
                success: false,
                message: 'Wrong date input for rent_start_date and rent_end_date. Format date YYYY-MM-DD',
              });
            }
            return res.status(400).json({
              success: false,
              message: 'Prepayment must be number',
            });
          }
          return res.status(404).json({
            success: false,
            message: 'id_vehicle is undifined',
          });
        });
      }
      return res.status(400).json({
        success: false,
        message: 'id_user is undefined',
      });
    });
  }
  return res.status(400).json({
    success: false,
    message: `Failed edit history with id ${id}, data must be filled`,
  });
};

const deleteHistory = (req, res) => {
  const { id } = req.params;
  historyModel.getHistory(id, (historyDeleted) => {
    historyModel.deleteHistory(id, (results) => {
      if (results.affectedRows > 0) {
        return res.json({
          success: true,
          message: `History with id ${id} successfully deleted`,
          results: historyDeleted[0],
        });
      }
      return res.status(400).json({
        success: false,
        message: `Failed to delete history with id ${id}`,
      });
    });
  });
};

module.exports = {
  getHistories,
  getHistory,
  addHistory,
  editHistory,
  deleteHistory,
};
