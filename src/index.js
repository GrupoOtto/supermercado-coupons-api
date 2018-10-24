const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const api = require('./api');

mongoose.connect(process.env.DB_URL);
const port = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(morgan('tiny'));

api(app);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json(err);
  throw err;
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
