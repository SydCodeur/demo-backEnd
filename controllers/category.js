const fieldsValidator = require('../utils/validator');
const Category = require('../models/category');

exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find()
        res.status(200).json({ message: "Liste des catégories ", categories });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'La récupération a échoué !' });
    }
};

exports.createCategory = async (req, res, next) => {
    const errorMessage = fieldsValidator.validateFields(req);

    if (errorMessage !== null) {
        return res.status(422).json({ message: 'Erreur de validation', error: errorMessage });
    }

    const category = new Category({
        name: req.body.name,
        description: req.body.description
    });

    try {
        const result = await category.save()
        console.log('result', result);
        return res.status(201).json({ message: "La catégorie a été ajoutée !", category: result });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Erreur lors de la création de la catégorie !' });
    }

};

exports.getOneCategory = async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await Category.findById(id)
        console.log('result', result);
        return res.status(200).json({ category: result });
    } catch (error) {
        console.log('error', error);
        res.status(404).json({ message: 'Erreur lors de la récupération de la catégorie !', error: error  });
    }
};

exports.updateCategory = async (req, res, next) => {
    const category = {
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description
    }

    try {
        const result = await Category.updateOne({ _id: req.params.id }, category)
        console.log('result', result);
        if(result.modifiedCount == 0){
            return res.status(500).json({ message: "La catégorie n'a pas été modifiée !", result });
        }
        return res.status(201).json({ message: "La catégorie a été modifiée !" });
    } catch (error) {
        console.log('error', error);
        res.status(400).json({ message: 'Erreur lors de la modification de la catégorie !', error: error });
    }
};

exports.deleteCategory = async (req, res, next) => {
    try {
        const result = await Category.deleteOne({ _id: req.params.id });
        console.log('result', result);
        return res.status(200).json({ message: 'La catégorie a bien été supprimée!' });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

