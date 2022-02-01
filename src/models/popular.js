const db = require('../helpers/db');

const popularVehicle = (data, cb) => {
  db.query(`SELECT * FROM vehicles ORDER by rent_count DESC LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

module.exports = popularVehicle;
