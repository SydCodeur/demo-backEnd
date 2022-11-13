const express = require('express');
const { body } = require('express-validator');

const userController = require('../controllers/user');
const User = require('../models/user');

// Eventuelle factorisation de code (1)
const emailValidator = body('email')
    .notEmpty()
    .withMessage('Veuillez saisir votre email!')
    .custom(value => {
        return User.findOne({ email: value }).then(user => {
            if (user) return Promise.reject('Cet email est déjà utilisé !');

        });
    });

const passwordValidator = body('password')
    .isLength({ min: 6 }).withMessage('Le mot de passe doit comporter au moins 6 caractères')

const usernameValidator = body('username')
    .notEmpty()
    .withMessage("Veuillez saisir votre nom d'utilisateur")

const phoneValidator = body('phone')
    .notEmpty()
    .withMessage("Veuillez saisir votre nom d'utilisateur")

const stateValidator = body('state')
    .isBoolean()
    .withMessage(`Veuillez renseigner l'état de l'utilisateur`)

const router = express.Router();

router.get('/users', userController.getAllUsers);

router.delete('/user/:userId', userController.deleteUser);

// Factorisation éventuelle de la portion notEmpty (2)
router.put('/user/:userId', [
    body('email')
        .notEmpty().
        withMessage('Veuillez saisir votre email!'),
    passwordValidator, usernameValidator, phoneValidator, stateValidator], userController.updateUser);

router.post('/user', [emailValidator, passwordValidator, usernameValidator, phoneValidator], userController.createUser);

module.exports = router;