const express = require('express');
const { body } = require('express-validator');

const profileController = require('../controllers/profile');

const router = express.Router();

router.get('/profiles', profileController.getAllProfiles);

router.post('/profile',
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Veuillez renseigner le nom du profil'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage("Veuillez renseigner la description")
        .isLength({ min: 15 })
        .withMessage('La description doit comporter au moins 15 caractères'),
    profileController.createProfile);

module.exports = router;