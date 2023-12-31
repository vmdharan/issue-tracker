const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

const PORT = 3001;

// connect to MongoDB
connectDB();

// initialise middleware
app.use(cors());
app.use(express.json({ extended: false }));

// routes
app.use('/users', require('./routes/users'));
app.use('/login', require('./routes/login'));

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});