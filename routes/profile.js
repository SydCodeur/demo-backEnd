const express = require('express');

const profileController = require('../controllers/profile');

const router = express.Router();

router.get('/profiles', profileController.getAllProfiles);

module.exports = router;