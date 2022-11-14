const fieldsValidator = require('../utils/validator');
const Ville = require('../models/ville');

exports.getAllVille = async (req, res, next) => {
    
 await Ville.find().then(villes => res.status(200).json({ message: "Liste des villes ", villes }))
 .catch(error => res.status(500).json({ message: 'La récupération a échoué !' }));
    
};

exports.createVille = async (req, res, next) => {

    const errorMessage = fieldsValidator.validateFields(req);

    if (errorMessage !== null) {
        return res.status(422).json({ message: 'Erreur de validation', error: errorMessage });
    }

    const  ville = new  Ville({
        name: req.body.name,
        description: req.body.description
    });

    
    await ville.save().then((result) => res.status(201).json({ message: "La ville a été ajouté !", ville: result }))
    .catch(error => res.status(500).json({message: 'Erreur lors de la création du ville !'}));  
    
     };

     exports.updateVille = (req, res, next) => { 
        Ville.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
     };

     exports.deleteVille = (req, res, next) => { 
        Ville.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
     };     
