const db = require('../helpers/db');

const countPopular = (data, cb) => {
  db.query(`SELECT COUNT(*) as total FROM vehicles WHERE type LIKE '${data.search}%'`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

const popularVehicle = (data, cb) => {
  db.query(`SELECT * FROM vehicles WHERE type LIKE '${data.search}%' ORDER by rent_count DESC LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

module.exports = { countPopular, popularVehicle };
