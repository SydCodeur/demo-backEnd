const fieldsValidator = require("../utils/validator");
const Utils = require("../utils/utils");
const Profile = require("../models/profile");

exports.getAllProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json({ message: "Liste des profils ", profiles });
  } catch (error) {
    Utils.printError("getAllProfiles", error);
    res.status(500).json({ message: "La récupération a échoué !" });
  }
};

exports.createProfile = async (req, res, next) => {
  // La fonction validateFields est tout simplement inutile pour le moment. Je vais revoir s'il faut supprimer ou l'améliorer ;)
  const errorMessage = fieldsValidator.validateFields(req);
  if (errorMessage !== null) {
    return res.status(422).json({ message: "Erreur de validation", error: errorMessage });
  }

  const profile = new Profile({
    name: req.body.name,
    description: req.body.description,
    state: true
  });

  try {
    const result = await profile.save();
    return res.status(201).json({ message: "Le profil a été ajouté !", profile: result });
  } catch (error) {
    Utils.printError("createProfile", error);
    res.status(500).json({ message: "Erreur lors de la création du profil !" });
  }
};

exports.updateProfile = async (req, res, next) => {
  const errorMessage = fieldsValidator.validateFields(req);

  if (errorMessage !== null) {
    return res.status(422).json({ message: "Erreur de validation", error: errorMessage });
  }

  const profileId = req.params.profileId;
  try {
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(400).json({ message: "Ce profil est introuvable" });
    }

    profile.name = req.body.name;
    profile.description = req.body.description;
    profile.state = req.body.state;

    const updatedProfile = await profile.save();

    res.status(200).json({ message: "Le profil a été modifié", updatedProfile });
  } catch (error) {
    Utils.printError("updateProfile", error);
    res.status(500).json({ message: "La modification a échoué" });
  }
};

exports.deleteProfile = async (req, res, next) => {
  const profileId = req.params.profileId;
  try {
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(400).json({ message: "Ce profil est introuvable" });
    }

    await Profile.findByIdAndRemove(profileId);
    res.status(200).json({ message: "Le profil a été supprimé" });
  } catch (error) {
    Utils.printError("deleteProfile", error);
    res.status(500).json({ message: "La suppression a échoué" });
  }
};
