const fieldsValidator = require('../utils/validator');
const Product = require('../models/product');

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find()
        res.status(200).json({ message: "Liste des produits ", products });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Le récupération a échoué !' });
    }
};

exports.createProduct = async (req, res, next) => {
    const errorMessage = fieldsValidator.validateFields(req);

    if (errorMessage !== null) {
        return res.status(422).json({ message: 'Erreur de validation', error: errorMessage });
    }

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
    });

    try {
        const result = await product.save()
        console.log('result', result);
        return res.status(201).json({ message: "Le produit a été ajouté !", product: result });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Erreur lors de la création du produit !' });
    }

};

exports.getOneProduct = async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await Product.findById(id)
        console.log('result', result);
        return res.status(200).json({ product: result });
    } catch (error) {
        console.log('error', error);
        res.status(404).json({ message: 'Erreur lors de la récupération du produit !', error: error  });
    }
};

exports.updateProduct = async (req, res, next) => {
    const product = {
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
    }

    try {
        const result = await Product.updateOne({ _id: req.params.id }, product)
        console.log('result', result);
        if(result.modifiedCount == 0){
            return res.status(500).json({ message: "Le produit n'a pas été modifié !", result });
        }
        return res.status(201).json({ message: "Le produit a été modifié !" });
    } catch (error) {
        console.log('error', error);
        res.status(400).json({ message: 'Erreur lors de la modification du produit !', error: error });
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const result = await Product.deleteOne({ _id: req.params.id });
        console.log('result', result);
        return res.status(200).json({ message: 'Le produit a bien été supprimé!' });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

