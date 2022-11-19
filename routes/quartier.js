const express = require('express');
const { body } = require('express-validator');

const quartierController = require('../controllers/quartier');

const router = express.Router();

router.get('/quartiers', quartierController.getAllQuartier);

router.post('/quartier',
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Veuillez renseigner le nom du profil'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage("Veuillez renseigner la description")
        .isLength({ min: 10 })
        .withMessage('La description doit comporter au moins 15 caractères'),
    quartierController.createQuartier);

    router.put('/quartier/:id',
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Veuillez renseigner le nom du profil'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage("Veuillez renseigner la description")
        .isLength({ min: 10 })
        .withMessage('La description doit comporter au moins 15 caractères'),
    quartierController.updateQuartier);

    router.delete('/quartier/:id', quartierController.deleteQuartier)

module.exports = router;