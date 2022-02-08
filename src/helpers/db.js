const mysql = require('mysql');

const {
  DB_HOST, DB_USER, DB_PASSWORD, DB_NAME,
} = process.env;

const conn = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

conn.connect((err) => {
  if (err) throw err;
  // eslint-disable-next-line no-console
  console.log('Successfully connected to database');
});

module.exports = conn;
