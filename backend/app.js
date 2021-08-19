const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//const Thing = require('./models/thing');

const app = express();

// const stuffRoutes = require('./routes/stuff')

const userRoutes = require('./routes/user');



mongoose.connect('mongodb+srv://chris:xw5Lftse7cdfQ8P@cluster0.ddekq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

//middleware
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// app.use('/api/stuff', stuffRoutes);

app.use('/api/auth', userRoutes);

 
module.exports = app;