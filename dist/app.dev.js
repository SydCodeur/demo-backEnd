"use strict";

var express = require('express');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var apiUrlPrefix = '/api/v1';

var profileRoutes = require('./routes/profile');

var userRoutes = require('./routes/user');

var categoryRoutes = require('./routes/category');

var productRoutes = require('./routes/product');

var app = express();
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(apiUrlPrefix, profileRoutes);
app.use(apiUrlPrefix, userRoutes);
app.use(apiUrlPrefix, categoryRoutes);
app.use(apiUrlPrefix, productRoutes);
mongoose.connect("mongodb+srv://demo:" + process.env.DATABASE_PASSWORD + "@cluster0.d9pj9.mongodb.net/demo-db?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log('You are connected to demo-db!');
  app.listen(3000);
})["catch"](function (error) {
  console.log('Connection to demo-db failed', error);
});