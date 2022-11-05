const express = require('express');

const profileRoutes = require('./routes/profile');

const app = express();

app.use('/api/v1', profileRoutes);

app.listen(3000);