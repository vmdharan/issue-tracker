const mongoose = require('mongoose');

const OrganisationSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

module.exports = Organisation = mongoose.model('organisations', OrganisationSchema);