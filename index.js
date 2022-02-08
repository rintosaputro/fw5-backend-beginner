const express = require('express');

require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(require('./src/routes'));

app.listen(5000, () => {
  // eslint-disable-next-line no-console
  console.log('App running on port 5000');
});
