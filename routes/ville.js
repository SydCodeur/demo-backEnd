const express = require('express');
const { body } = require('express-validator');

const villeController = require('../controllers/ville');

const router = express.Router();

router.get('/villes', villeController.getAllVille);

router.post('/ville',
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
        villeController.createVille);

    router.put('/ville/:id',
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
        villeController.updateVille);

    router.delete('/ville/:id', villeController.deleteVille)

module.exports = router;