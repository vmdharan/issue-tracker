const express = require('express');
const router = express.Router();
const ProductCategory = require('../models/ProductCategory');

// Get all product categories.
router.get('/', async (request, response) => {
    try {
        const productCategories = await ProductCategory.find({});
        if(productCategories) {
            return response.send(productCategories);
        }
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Internal Server Error');
    }
});

// Get all product categories for dropdown.
router.get('/dd', async (request, response) => {
    try {
        const productCategories = await ProductCategory.aggregate([
            { "$project": {
                "name": "$name",
                "value": "$code",
                "_id": 0
            }}
        ]);
        if(productCategories) {
            return response.send(productCategories);
        }
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Internal Server Error');
    }
});

// Get a single product category by code.
router.get('/:id', async (request, response) => {
    try {
        const productCategory = await ProductCategory.find({_id: request.params.id});
        if(productCategory) {
            return response.send(productCategory);
        }
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Internal Server Error');
    }
});

// Create a new product category.
router.post('/', async (request, response) => {
    const { code, name, description, parentCategoryCode } = request.body;
    try {
        let productCategory = await ProductCategory.findOne({ code });
        if(productCategory) {
            return response.status(400)
                .json({
                    errors: [{
                        message: 'Record already exists in database.'
                    }]
                });
        }

        productCategory = new ProductCategory({
            code,
            name,
            description,
            parentCategoryCode
        });
        await productCategory.save();
        response.end(JSON.stringify({ message: 'Saved successfully.', success: true }));
    } catch (err) {
        console.error(err.message);
        response.status(500, 'Internal Server Error');
    }
});

// Edit an existing product category.
router.put('/:id', async (request, response) => {
    const { code, name, description, parentCategoryCode } = request.body;
    try {
        let productCategory = await ProductCategory.findOne({ _id: request.params.id });
        if(!productCategory) {
            return response.status(400)
                .json({
                    errors: [{
                        message: 'Record does not exist in database.'
                    }]
                });
        }

        productCategory.code = code;
        productCategory.name = name;
        productCategory.description = description;
        productCategory.parentCategoryCode = parentCategoryCode;

        await productCategory.save();
        response.end(JSON.stringify({ message: 'Updated successfully.', success: true }));
    } catch (err) {
        console.error(err.message);
        response.status(500, 'Internal Server Error');
    }
});

// Delete an existing product category.
router.delete('/:id', async (request, response) => {
    try {
        let productCategory = await ProductCategory.findOne({ _id: request.params.id });
        if(!productCategory) {
            return response.status(400)
                .json({
                    errors: [{
                        message: 'Record does not exist in database.'
                    }]
                });
        }

        await productCategory.deleteOne();
        response.end(JSON.stringify({ message: 'Deleted successfully.', success: true }));
    } catch (err) {
        console.error(err.message);
        response.status(500, 'Internal Server Error');
    }
});

module.exports = router;