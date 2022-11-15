const fieldsValidator = require('../utils/validator');
const Quartier = require('../models/quartier');

exports.getAllQuartier = async (req, res, next) => {
    
 await Quartier.find().then(quartiers => res.status(200).json({ message: "Liste des quartiers ", quartiers }))
 .catch(error => res.status(500).json({ message: 'La récupération a échoué !' }));
    
};

exports.createQuartier = async (req, res, next) => {
    console.log("kara")
    const errorMessage = fieldsValidator.validateFields(req);

    if (errorMessage !== null) {
        return res.status(422).json({ message: 'Erreur de validation', error: errorMessage });
    }

    const  quartier = new  Quartier({
        name: req.body.name,
        description: req.body.description
    });

    
    await quartier.save().then((result) => res.status(201).json({ message: "Le quartier a été ajouté !", quartier: result }))
    .catch(error => res.status(500).json({message: 'Erreur lors de la création du profil !'}));  
    
     };

     exports.updateQuartier = (req, res, next) => { 
        Quartier.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
     };

     exports.deleteQuartier = (req, res, next) => { 
        Quartier.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
     };     
