const express = require('express');
const router = express.Router();
const Organisation = require('../models/Organisation');

// Get all organisations.
router.get('/', async (request, response) => {
    try {
        const organisations = await Organisation.find({});
        if(organisations) {
            return response.send(organisations);
        }
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Internal Server Error');
    }
});

// Get a single organisation by code.
router.get('/:id', async (request, response) => {
    try {
        const organisation = await Organisation.find({_id: request.params.id});
        if(organisation) {
            return response.send(organisation);
        }
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Internal Server Error');
    }
});

// Create a new organisation.
router.post('/', async (request, response) => {
    const { code, name, description } = request.body;
    try {
        let organisation = await Organisation.findOne({ code });
        if(organisation) {
            return response.status(400)
                .json({
                    errors: [{
                        message: 'Record already exists in database.'
                    }]
                });
        }

        organisation = new Organisation({
            code,
            name,
            description
        });
        await organisation.save();
        response.end(JSON.stringify({ message: 'Saved successfully.', success: true }));
    } catch (err) {
        console.error(err.message);
        response.status(500, 'Internal Server Error');
    }
});

// Edit an existing organisation.
router.put('/:id', async (request, response) => {
    const { code, name, description } = request.body;
    try {
        let organisation = await Organisation.findOne({ _id: request.params.id });
        if(!organisation) {
            return response.status(400)
                .json({
                    errors: [{
                        message: 'Record does not exist in database.'
                    }]
                });
        }

        organisation.code = code;
        organisation.name = name;
        organisation.description = description;

        await organisation.save();
        response.end(JSON.stringify({ message: 'Updated successfully.', success: true }));
    } catch (err) {
        console.error(err.message);
        response.status(500, 'Internal Server Error');
    }
});

// Delete an existing organisation.
router.delete('/:id', async (request, response) => {
    try {
        let organisation = await Organisation.findOne({ _id: request.params.id });
        if(!organisation) {
            return response.status(400)
                .json({
                    errors: [{
                        message: 'Record does not exist in database.'
                    }]
                });
        }

        await organisation.deleteOne();
        response.end(JSON.stringify({ message: 'Deleted successfully.', success: true }));
    } catch (err) {
        console.error(err.message);
        response.status(500, 'Internal Server Error');
    }
});

module.exports = router;