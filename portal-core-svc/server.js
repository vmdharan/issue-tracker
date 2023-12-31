const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

const PORT = 3000;

// connect to MongoDB
connectDB();

// initialise middleware
app.use(cors());
app.use(express.json({ extended: false }));

// routes
app.use('/tickets', require('./routes/tickets'));
app.use('/ticket-categories', require('./routes/ticket-categories'));
app.use('/ticket-severities', require('./routes/ticket-severities'));
app.use('/products', require('./routes/products'));
app.use('/product-categories', require('./routes/product-categories'));
app.use('/organisations', require('./routes/organisations'));

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});