exports.getAllProfiles = (req, res, next) => {
    res.status(200).json({
        message: 'Liste des profils',
        profiles: []
    });
};

exports.createProfile = (req, res, next) => { };

exports.updateProfile = (req, res, next) => { };

exports.deleteProfile = (req, res, next) => { };