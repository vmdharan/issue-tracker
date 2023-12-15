const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products.
router.get('/', async (request, response) => {
    try {
        const products = await Product.find({});
        if(products) {
            return response.send(products);
        }
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Internal Server Error');
    }
});

// Get a single product by code.
router.get('/:id', async (request, response) => {
    try {
        const product = await Product.find({_id: request.params.id});
        if(product) {
            return response.send(product);
        }
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Internal Server Error');
    }
});

// Create a new product.
router.post('/', async (request, response) => {
    const { code, name, description, productCategory } = request.body;
    try {
        let product = await Product.findOne({ code });
        if(product) {
            return response.status(400)
                .json({
                    errors: [{
                        message: 'Record already exists in database.'
                    }]
                });
        }

        product = new Product({
            code,
            name,
            description,
            productCategory
        });
        await product.save();
        response.end(JSON.stringify({ message: 'Saved successfully.', success: true }));
    } catch (err) {
        console.error(err.message);
        response.status(500, 'Internal Server Error');
    }
});

// Edit an existing product.
router.put('/:id', async (request, response) => {
    const { code, name, description, productCategory } = request.body;
    try {
        let product = await Product.findOne({ _id: request.params.id });
        if(!product) {
            return response.status(400)
                .json({
                    errors: [{
                        message: 'Record does not exist in database.'
                    }]
                });
        }

        product.code = code;
        product.name = name;
        product.description = description;
        product.productCategory = productCategory;

        await product.save();
        response.end(JSON.stringify({ message: 'Updated successfully.', success: true }));
    } catch (err) {
        console.error(err.message);
        response.status(500, 'Internal Server Error');
    }
});

// Delete an existing product.
router.delete('/:id', async (request, response) => {
    try {
        let product = await Product.findOne({ _id: request.params.id });
        if(!product) {
            return response.status(400)
                .json({
                    errors: [{
                        message: 'Record does not exist in database.'
                    }]
                });
        }

        await product.deleteOne();
        response.end(JSON.stringify({ message: 'Deleted successfully.', success: true }));
    } catch (err) {
        console.error(err.message);
        response.status(500, 'Internal Server Error');
    }
});

module.exports = router;