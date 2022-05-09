const express = require('express');

require('dotenv').config();

const app = express();

const cors = require('cors');
// const { path } = require('express/lib/application');

app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname));

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

app.use(cors());

app.use(require('./src/routes'));

app.use('/uploads', express.static('uploads'));

const { PORT, APP_PORT } = process.env;

app.listen(PORT || APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${PORT || APP_PORT}`);
});
