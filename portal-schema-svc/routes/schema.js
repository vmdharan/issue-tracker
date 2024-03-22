const express = require('express');
const router = express.Router();

const Organisation = require('../json/organisation.json');
const ProductCategory = require('../json/product_category.json');
const Product = require('../json/product.json');
const TicketCategory = require('../json/ticket_category.json');
const TicketSeverity = require('../json/ticket_severity.json');
const Ticket = require('../json/ticket.json');
const User = require('../json/user.json');

// Get all schemas.
router.get('/', async (request, response) => {
    try {
        const schemas = [
            Organisation,
            ProductCategory,
            Product,
            TicketCategory,
            TicketSeverity,
            Ticket,
            User
        ];
        if(schemas) {
            return response.send(schemas);
        }
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Internal Server Error');
    }
});

const getSchemaForName = (name) => {
    switch(name) {
        case 'organisation': return Organisation;
        case 'product_category': return ProductCategory;
        case 'product': return Product;
        case 'ticket_category': return TicketCategory;
        case 'ticket_severity': return TicketSeverity;
        case 'ticket': return Ticket;
        case 'user': return User;
        default: return {};
    };
};

// Get a single schema by name.
router.get('/:name', async (request, response) => {
    try {
        const schema = await getSchemaForName(request.params.id);
        if(schema) {
            return response.send(schema);
        }
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Internal Server Error');
    }
});

module.exports = router;