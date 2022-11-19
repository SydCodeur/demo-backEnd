const express = require('express');
const { body } = require('express-validator');

const profileController = require('../controllers/profile');

const router = express.Router();

const nameValidator = body('name')
    .trim()
    .notEmpty()
    .withMessage('Veuillez renseigner le nom du profil')

const descriptionValidator = body('description')
    .trim()
    .notEmpty()
    .withMessage("Veuillez renseigner la description")
    .isLength({ min: 15 })
    .withMessage('La description doit comporter au moins 15 caractères')

const stateValidator = body('state')
    .isBoolean()
    .withMessage(`Veuillez renseigner l'état du profil`)

router.get('/profiles', profileController.getAllProfiles);

router.delete('/profile/:profileId', profileController.deleteProfile);

router.put('/profile/:profileId',
    [
        nameValidator,
        descriptionValidator,
        stateValidator
    ]
    ,
    profileController.updateProfile);

router.post('/profile',
    [
        nameValidator,
        descriptionValidator
    ],
    profileController.createProfile);

module.exports = router;