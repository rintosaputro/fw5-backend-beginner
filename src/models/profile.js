const db = require('../helpers/db');

const getProfile = (id, cb) => {
  db.query('SELECT id_user, name, display_name, email, phone_number, address, birthdate FROM users WHERE id_user=?', [id], (err, res) => {
    if (err) throw err;
    cb(res);
  });
};

module.exports = getProfile;
