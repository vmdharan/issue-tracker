const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Get all tickets.
router.get('/', async (request, response) => {
    try {
        const tickets = await Ticket.find({});
        if(tickets) {
            return response.send(tickets);
        }
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Internal Server Error');
    }
});

// Get a single ticket by code.
router.get('/:code', async (request, response) => {
    try {
        const ticket = await Ticket.find({code: request.params.code});
        if(ticket) {
            return response.send(ticket);
        }
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Internal Server Error');
    }
});

// Create a new ticket.
router.post('/', async (request, response) => {
    const { code, title, description, creator, assignee, category, severity } = request.body;
    try {
        let ticket = await Ticket.findOne({ code });
        if(ticket) {
            return response.status(400)
                .json({
                    errors: [{
                        message: 'Record already exists in database.'
                    }]
                });
        }

        ticket = new Ticket({
            code,
            title,
            description,
            creator,
            assignee,
            category, 
            severity
        });
        await ticket.save();
        response.end(JSON.stringify({ message: 'Saved successfully.', success: true }));
    } catch (err) {
        console.error(err.message);
        response.status(500, 'Internal Server Error');
    }
});

// Edit an existing ticket.
router.put('/:code', async (request, response) => {
    const { code, title, description, creator, assignee, category, severity } = request.body;
    try {
        let ticket = await Ticket.findOne({ code: request.params.code });
        if(!ticket) {
            return response.status(400)
                .json({
                    errors: [{
                        message: 'Record does not exist in database.'
                    }]
                });
        }

        ticket.code = code;
        ticket.title = title;
        ticket.description = description;
        ticket.creator = creator;
        ticket.assignee = assignee;
        ticket.category = category;
        ticket.severity = severity;

        await ticket.save();
        response.end(JSON.stringify({ message: 'Updated successfully.', success: true }));
    } catch (err) {
        console.error(err.message);
        response.status(500, 'Internal Server Error');
    }
});

// Delete an existing ticket.
router.delete('/:code', async (request, response) => {
    try {
        let ticket = await Ticket.findOne({ code: request.params.code });
        if(!ticket) {
            return response.status(400)
                .json({
                    errors: [{
                        message: 'Record does not exist in database.'
                    }]
                });
        }

        await ticket.deleteOne();
        response.end(JSON.stringify({ message: 'Deleted successfully.', success: true }));
    } catch (err) {
        console.error(err.message);
        response.status(500, 'Internal Server Error');
    }
});

module.exports = router;