const express = require('express');
const router = express.Router();
const TicketCategory = require('../models/TicketCategory');

// Get all ticket categories.
router.get('/', async (request, response) => {
    try {
        const ticketCategories = await TicketCategory.find({});
        if(ticketCategories) {
            return response.send(ticketCategories);
        }
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Internal Server Error');
    }
});

// Get all ticket categories for dropdown.
router.get('/dd', async (request, response) => {
    try {
        const ticketCategories = await TicketCategory.aggregate([
            { "$project": {
                "name": "$name",
                "value": "$code",
                "_id": 0
            }}
        ]);
        if(ticketCategories) {
            return response.send(ticketCategories);
        }
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Internal Server Error');
    }
});

// Get a single ticket category by code.
router.get('/:id', async (request, response) => {
    try {
        const ticketCategory = await TicketCategory.find({_id: request.params.id});
        if(ticketCategory) {
            return response.send(ticketCategory);
        }
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Internal Server Error');
    }
});

// Create a new ticket category.
router.post('/', async (request, response) => {
    const { code, name, description, parentCategoryCode } = request.body;
    try {
        let ticketCategory = await TicketCategory.findOne({ code });
        if(ticketCategory) {
            return response.status(400)
                .json({
                    errors: [{
                        message: 'Record already exists in database.'
                    }]
                });
        }

        ticketCategory = new TicketCategory({
            code,
            name,
            description,
            parentCategoryCode
        });
        await ticketCategory.save();
        response.end(JSON.stringify({ message: 'Saved successfully.', success: true }));
    } catch (err) {
        console.error(err.message);
        response.status(500, 'Internal Server Error');
    }
});

// Edit an existing ticket category.
router.put('/:id', async (request, response) => {
    const { code, name, description, parentCategoryCode } = request.body;
    try {
        let ticketCategory = await TicketCategory.findOne({ _id: request.params.id });
        if(!ticketCategory) {
            return response.status(400)
                .json({
                    errors: [{
                        message: 'Record does not exist in database.'
                    }]
                });
        }

        ticketCategory.code = code;
        ticketCategory.name = name;
        ticketCategory.description = description;
        ticketCategory.parentCategoryCode = parentCategoryCode;

        await ticketCategory.save();
        response.end(JSON.stringify({ message: 'Updated successfully.', success: true }));
    } catch (err) {
        console.error(err.message);
        response.status(500, 'Internal Server Error');
    }
});

// Delete an existing ticket category.
router.delete('/:id', async (request, response) => {
    try {
        let ticketCategory = await TicketCategory.findOne({ _id: request.params.id });
        if(!ticketCategory) {
            return response.status(400)
                .json({
                    errors: [{
                        message: 'Record does not exist in database.'
                    }]
                });
        }

        await ticketCategory.deleteOne();
        response.end(JSON.stringify({ message: 'Deleted successfully.', success: true }));
    } catch (err) {
        console.error(err.message);
        response.status(500, 'Internal Server Error');
    }
});

module.exports = router;