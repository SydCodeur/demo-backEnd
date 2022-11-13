const { validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const Utils = require('../utils/utils')

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: "Liste des utilisatuers ", users });
    } catch (error) {
        Utils.printError("getAllUsers", error);
        res.status(500).json({ message: "La récupération a échoué !" });
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ message: errors.array()[0].msg });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            email: req.body.email,
            password: hashedPassword,
            username: req.body.username,
            phone: req.body.phone,
            state: true
        });
        const result = await user.save()

        res.status(201).json({ message: "Le compte a été créé avec succès!", result });
    } catch (error) {
        Utils.printError('createUser', error);
        res.status(500).json({ message: "La création de compte a échouée !" });
    }
}

exports.updateUser = async (req, res, next) => {
    const userId = req.params.userId;
    console.log(userId)
    const email = req.body.email
   

    let listWithoutUpdateUser = await User.find({ _id: { $ne: userId } }).select('email -_id');
    console.log('list', listWithoutUpdateUser);
    if (listWithoutUpdateUser.some(currentUser => currentUser.email === email)) {
        return res.status(401).json({ message: "Cet email est déjà utilisé !" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg });
    }


    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "Ce utilisateur est introuvable" });
        }

        user.email = email;
        user.username = req.body.username;
        user.phone = req.body.phone;
        user.state = req.body.state;

        const updateUser = await user.save();

        res.status(200).json({ message: "La mise à jour a été effectuée avec succès ", updateUser });
    } catch (error) {
        Utils.printError("updateUser", error);
        res.status(500).json({ message: "La modification a échoué" });
    }
};


exports.deleteUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "Cet utilisateur est introuvable" });
        }

        await User.findByIdAndRemove(userId);
        res.status(200).json({ message: "L'utilisateur a été supprimé" });
    } catch (error) {
        Utils.printError("deleteUser", error);
        res.status(500).json({ message: "La suppression a échoué" });
    }
};