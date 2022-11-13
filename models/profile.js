const mongoose = require('mongoose');
const profileSchema = mongoose.Schema(
    {
        name: { type: String },
        description: { type: String },
        state: { type: Boolean }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Profile', profileSchema);