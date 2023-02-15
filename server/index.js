require('dotenv').config()
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'))


app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})