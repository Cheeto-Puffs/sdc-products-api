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
const filePath = process.env.LOADER_IO;
Router.get(`/${filePath}`, (req, res) => {
  res.sendFile(path.join(__dirname, filePath, '.txt'))
})

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})