require('dotenv').config()
const path = require('path')
const express = require('express');
const morgan = require('morgan');
const router = require('./routes.js')

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/', router);

// LOADER_IO
const fileName = process.env.LOADER_IO;
app.get(`/${fileName}`, (req, res) => {
  console.log(`${process.env.LOADER_IO}`)
  res.send(`${process.env.LOADER_IO}`)
})

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})