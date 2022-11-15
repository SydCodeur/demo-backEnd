const mongoose = require('mongoose');
const quartierSchema = mongoose.Schema(
    {
        name: { type: String },
        description: { type: String },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Quartier', quartierSchema);