const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users.
router.get('/', async (request, response) => {
    try {
        const users = await User.find({});
        if(users) {
            return response.send(users);
        }
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Internal Server Error');
    }
});

// Get a single user by id.
router.get('/:id', async (request, response) => {
    try {
        const user = await User.find({_id: request.params.id});
        if(user) {
            return response.send(user);
        }
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Internal Server Error');
    }
});

// Create a new user.
router.post('/', async (request, response) => {
    const { firstName, lastName, email, userName, password, organisationCode } = request.body;
    try {
        let user = await User.findOne({ userName });
        if(user) {
            return response.status(400)
                .json({
                    errors: [{
                        message: 'User already exists in database.'
                    }]
                });
        }

        user = new User({
            firstName,
            lastName,
            email,
            userName,
            password,
            organisationCode
        });
        await user.save();
        response.end(JSON.stringify({ message: 'Saved successfully.', success: true }));
    } catch (err) {
        console.error(err.message);
        response.status(500, 'Internal Server Error');
    }
});

// Edit an existing user.
router.put('/:id', async (request, response) => {
    console.log(request);
    const { firstName, lastName, email, userName, password, organisationCode } = request.body;
    try {
        let user = await User.findOne({ _id: request.params.id });
        if(!user) {
            return response.status(400)
                .json({
                    errors: [{
                        message: 'User does not exist in database.'
                    }]
                });
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.userName = userName;
        user.password = password;
        user.organisationCode = organisationCode;

        await user.save();
        response.end(JSON.stringify({ message: 'Updated successfully.', success: true }));
    } catch (err) {
        console.error(err.message);
        response.status(500, 'Internal Server Error');
    }
});

// Delete an existing user.
router.delete('/:id', async (request, response) => {
    try {
        let user = await User.findOne({ _id: request.params.id });
        if(!user) {
            return response.status(400)
                .json({
                    errors: [{
                        message: 'User does not exist in database.'
                    }]
                });
        }

        await user.deleteOne();
        response.end(JSON.stringify({ message: 'Deleted successfully.', success: true }));
    } catch (err) {
        console.error(err.message);
        response.status(500, 'Internal Server Error');
    }
});

module.exports = router;