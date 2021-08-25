const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const Sauces = require('./models/sauces');
const app = express();
const sauceRoutes = require('./routes/sauces')
const userRoutes = require('./routes/user');
const path = require('path');
const cors = require('cors');
//console.log('123')
mongoose.connect('mongodb+srv://chris:xw5Lftse7cdfQ8P@cluster0.ddekq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
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