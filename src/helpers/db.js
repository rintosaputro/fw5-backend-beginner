const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rent_vehicles',
});

conn.connect((err) => {
  if (err) throw err;
  // eslint-disable-next-line no-console
  console.log('Successfully connected to database');
});

module.exports = conn;
