const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    creator: {
        type: String,
        required: true
    },
    assignee: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        required: true
    }
});

module.exports = Ticket = mongoose.model('tickets', TicketSchema);