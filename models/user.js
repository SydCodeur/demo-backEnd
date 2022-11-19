const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        // Penser à utiliser unique = true pour ne plus écrire la logique soi-même
        email: { type: String },
        password: { type: String },
        username: { type: String },
        phone: { type: String },
        state: { type: Boolean },
    },
    {
        timestamps: true
    });


module.exports = mongoose.model('User', userSchema);