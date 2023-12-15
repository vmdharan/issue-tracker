const express = require('express');
const router = express.Router();
const Organisation = require('../models/Organisation');

// Get all tickets.
router.get('/', async (request, response) => {
    try {
        const tickets = await Organisation.find({});
        if(tickets) {
            return response.send(tickets);
        }
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Internal Server Error');
    }
});

// Get a single ticket by code.
router.get('/:id', async (request, response) => {
    try {
        const ticket = await Organisation.find({_id: request.params.id});
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
        let ticket = await Organisation.findOne({ code });
        if(ticket) {
            return response.status(400)
                .json({
                    errors: [{
                        message: 'Record already exists in database.'
                    }]
                });
        }

        ticket = new Organisation({
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
router.put('/:id', async (request, response) => {
    const { code, title, description, creator, assignee, category, severity } = request.body;
    try {
        let ticket = await Organisation.findOne({ _id: request.params.id });
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
router.delete('/:id', async (request, response) => {
    try {
        let ticket = await Organisation.findOne({ _id: request.params.id });
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