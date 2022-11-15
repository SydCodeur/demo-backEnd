const mongoose = require('mongoose');
const villeSchema = mongoose.Schema(
    {
        name: { type: String },
        description: { type: String },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Ville', villeSchema);