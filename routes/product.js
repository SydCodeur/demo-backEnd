const express = require('express');
const { body } = require('express-validator');

const productController = require('../controllers/product');

const router = express.Router();


router.post('/product',
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
            body('price')
                .trim()
                .notEmpty()
                .withMessage("Veuillez renseigner le prix"),
                body('quantity')
                    .trim()
                    .notEmpty()
                    .withMessage("Veuillez renseigner la description"),
    productController.createProduct
);

router.get('/products/:id', productController.getOneProduct);

router.put('/products/:id', productController.updateProduct);

router.delete('/products/:id', productController.deleteProduct);

router.get('/products', productController.getAllProducts);

module.exports = router;
