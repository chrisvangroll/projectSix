const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const sauceRoutes = require('./routes/sauces')
const userRoutes = require('./routes/user');
const path = require('path');
const cors = require('cors');
require('dotenv/config');


mongoose.connect(process.env.DB_CONNECTION,
   { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex:true }
  )

  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

//middleware
app.use(cors())

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);

app.use('/api/auth', userRoutes);

 
module.exports = app;