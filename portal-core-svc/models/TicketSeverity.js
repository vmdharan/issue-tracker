const mongoose = require('mongoose');

const TicketSeveritySchema = new mongoose.Schema({
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

module.exports = TicketSeverity = mongoose.model('ticket-severities', TicketSeveritySchema);