const express = require('express');
const router = express.Router();
const TicketSeverity = require('../models/TicketSeverity');

// Get all ticket severities.
router.get('/', async (request, response) => {
    try {
        const ticketSeverities = await TicketSeverity.find({});
        if(ticketSeverities) {
            return response.send(ticketSeverities);
        }
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Internal Server Error');
    }
});

// Get a single ticket severity by code.
router.get('/:code', async (request, response) => {
    try {
        const ticketSeverity = await TicketSeverity.find({code: request.params.code});
        if(ticketSeverity) {
            return response.send(ticketSeverity);
        }
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Internal Server Error');
    }
});

// Create a new ticket severity.
router.post('/', async (request, response) => {
    const { code, name, description } = request.body;
    try {
        let ticketSeverity = await TicketSeverity.findOne({ code });
        if(ticketSeverity) {
            return response.status(400)
                .json({
                    errors: [{
                        message: 'Record already exists in database.'
                    }]
                });
        }

        ticketSeverity = new TicketSeverity({
            code,
            name,
            description
        });
        await ticketSeverity.save();
        response.end('Saved successfully.');
    } catch (err) {
        console.error(err.message);
        response.status(500, 'Internal Server Error');
    }
});

// Edit an existing ticket severity.
router.put('/:code', async (request, response) => {
    const { code, name, description } = request.body;
    try {
        let ticketSeverity = await TicketSeverity.findOne({ code: request.params.code });
        if(!ticketSeverity) {
            return response.status(400)
                .json({
                    errors: [{
                        message: 'Record does not exist in database.'
                    }]
                });
        }

        ticketSeverity.code = code;
        ticketSeverity.name = name;
        ticketSeverity.description = description;

        await ticketSeverity.save();
        response.end('Updated successfully.');
    } catch (err) {
        console.error(err.message);
        response.status(500, 'Internal Server Error');
    }
});

// Delete an existing ticket severity.
router.delete('/:code', async (request, response) => {
    try {
        let ticketSeverity = await TicketSeverity.findOne({ code: request.params.code });
        if(!ticketSeverity) {
            return response.status(400)
                .json({
                    errors: [{
                        message: 'Record does not exist in database.'
                    }]
                });
        }

        await ticketSeverity.deleteOne();
        response.end('Deleted successfully.');
    } catch (err) {
        console.error(err.message);
        response.status(500, 'Internal Server Error');
    }
});

module.exports = router;