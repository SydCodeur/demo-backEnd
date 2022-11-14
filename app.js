const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const profileRoutes = require('./routes/profile');
const quartierRoutes = require('./routes/quartier');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api/v1', profileRoutes);
app.use('/api/v1', quartierRoutes);


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