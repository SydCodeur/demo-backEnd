const fieldsValidator = require('../utils/validator');
const Profile = require('../models/profile');

exports.getAllProfiles = async (req, res, next) => {
    try {
        const profiles = await Profile.find()
        res.status(200).json({ message: "Liste des profils ", profiles });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'La récupération a échoué !' });
    }
};

exports.createProfile = async (req, res, next) => {
    const errorMessage = fieldsValidator.validateFields(req);

    if (errorMessage !== null) {
        return res.status(422).json({ message: 'Erreur de validation', error: errorMessage });
    }

    const profile = new Profile({
        name: req.body.name,
        description: req.body.description
    });

    try {
        const result = await profile.save()
        console.log('result', result);
        return res.status(201).json({ message: "Le profil a été ajouté !", profile: result });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Erreur lors de la création du profil !' });
    }

};

exports.updateProfile = (req, res, next) => { };

exports.deleteProfile = (req, res, next) => { };