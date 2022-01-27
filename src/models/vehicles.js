const db = require('../helpers/db');

const getVehicles = (cb) => {
  db.query('SELECT * FROM vehicles', (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getVehicle = (id, cb) => {
  db.query('SELECT * FROM vehicles WHERE id=?', [id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const addVehicle = (data, cb) => {
  db.query('INSERT INTO vehicles SET ?', [data], (err) => {
    if (err) throw err;
    cb();
  });
};

const editVehicle = (data, id, cb) => {
  db.query('UPDATE vehicles SET ? WHERE id=?;', [data, id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const deleteVehicle = (id, cb) => {
  db.query('DELETE FROM vehicles WHERE id=?', [id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

module.exports = {
  getVehicles,
  getVehicle,
  addVehicle,
  editVehicle,
  deleteVehicle,
};
