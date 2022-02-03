/* eslint-disable camelcase */
/* eslint-disable radix */
const historyModel = require('../models/histories');
const vehicleModel = require('../models/vehicles');
const helperGet = require('../helpers/get');

const getHistories = (req, res) => {
  helperGet(req, res, historyModel.getHistories, historyModel.countHistory, 'histories');
};

const addHistory = (req, res) => {
  const {
    id_user, id_vehicle, rent_start_date, rent_end_date, prepayment,
  } = req.body;
  const data = {
    id_user, id_vehicle, rent_start_date, rent_end_date, prepayment,
  };
  if (id_user && id_vehicle && rent_start_date && rent_end_date && prepayment) {
    const pola = /\D/g;
    if (!pola.test(prepayment)) {
      return historyModel.checkHistory(data, (checkResult) => {
        if (checkResult.length > 0) {
          return res.status(400).json({
            success: false,
            message: 'Failed to add new history. Data already exists',
          });
        }
        return historyModel.addHistory(data, () => {
          vehicleModel.addRentCount(id_vehicle);
          historyModel.newHistory((results) => res.json({
            success: true,
            message: 'Successfully added new History',
            results: results[0],
          }));
        });
      });
    }
    return res.status(400).json({
      success: false,
      message: 'Prepayment must be number',
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
    id_user, id_vehicle, rent_start_date, rent_end_date, prepayment, returned,
  } = req.body;
  const data = {
    id_user, id_vehicle, rent_start_date, rent_end_date, prepayment, returned,
  };

  const pola = /\D/g;
  if (!pola.test(prepayment)) {
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
        message: `Failed to edit history with id ${id}`,
      });
    });
  }
  return res.status(400).json({
    success: false,
    message: 'Prepayment must be number',
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
  addHistory,
  editHistory,
  deleteHistory,
};
