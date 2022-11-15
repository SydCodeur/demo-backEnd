const express = require('express');
const { body } = require('express-validator');

const categoryController = require('../controllers/category');

const router = express.Router();


router.post('/category',
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Veuillez renseigner le nom de la catégorie'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage("Veuillez renseigner la description")
        .isLength({ min: 15 })
        .withMessage('La description doit comporter au moins 15 caractères'),
    categoryController.createCategory
);

router.get('/categories/:id', categoryController.getOneCategory);

router.put('/categories/:id', categoryController.updateCategory);

router.delete('/categories/:id', categoryController.deleteCategory);

router.get('/categories', categoryController.getAllCategories);

module.exports = router;
