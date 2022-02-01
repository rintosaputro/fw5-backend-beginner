const db = require('../helpers/db');

const countVehicle = (data, cb) => {
  db.query(`SELECT COUNT(*) as total FROM vehicles WHERE brand LIKE '${data.search}%'`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getVehicles = (data, cb) => {
  db.query(`SELECT * FROM vehicles WHERE brand LIKE '${data.search}%' LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getVehicle = (id, cb) => {
  db.query('SELECT * FROM vehicles WHERE id_vehicle=?', [id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const getAll = (cb) => {
  db.query('SELECT type, brand, capacity, location, price, qty FROM vehicles', (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const checkVehicle = (data, cb) => {
  db.query(`SELECT * FROM vehicles WHERE type='${data.type}' AND brand='${data.brand}' AND capacity='${data.capacity}' 
  AND location='${data.location}' AND price=${data.price} AND qty=${data.qty}`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const newVehicle = (cb) => {
  db.query('SELECT * FROM vehicles ORDER BY id_vehicle DESC LIMIT 1', (err, res) => {
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
  db.query('UPDATE vehicles SET ? WHERE id_vehicle=?;', [data, id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const deleteVehicle = (id, cb) => {
  db.query('DELETE FROM vehicles WHERE id_vehicle=?', [id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

module.exports = {
  countVehicle,
  getVehicles,
  getVehicle,
  getAll,
  checkVehicle,
  newVehicle,
  addVehicle,
  editVehicle,
  deleteVehicle,
};
