const mongoose = require('mongoose');

const TicketCategorySchema = new mongoose.Schema({
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
    },
    parentCategoryCode: {
        type: String,
        required: false
    }
});

module.exports = TicketCategory = mongoose.model('ticket-categories', TicketCategorySchema);