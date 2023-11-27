const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (request, response) => {
    const { userName, password } = request.body;
    try {
        let user = await User.findOne({ userName, password });
        if(!user) {
            return response.status(400)
                .json({
                    errors: [{
                        message: 'Invalid credentials!'
                    }]
                });
        }

        response.send({token: 'loginToken12345'});
    } catch (err) {
        console.error(err.message);
        response.status(500, 'Internal Server Error');
    }
});

module.exports = router;