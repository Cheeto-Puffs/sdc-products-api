require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const router = require('./routes.js')

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/', router);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})