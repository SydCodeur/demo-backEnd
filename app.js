const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const apiUrlPrefix = '/api/v1';
const profileRoutes = require('./routes/profile');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(apiUrlPrefix, profileRoutes);
app.use(apiUrlPrefix, userRoutes);
app.use(apiUrlPrefix, categoryRoutes);
app.use(apiUrlPrefix, productRoutes);


mongoose.connect("mongodb+srv://demo:" + process.env.DATABASE_PASSWORD + "@cluster0.d9pj9.mongodb.net/demo-db?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('You are connected to demo-db!')
        app.listen(3000);
    })
    .catch((error) => {
        console.log('Connection to demo-db failed', error)
    });