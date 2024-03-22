const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 3002;

// initialise middleware
app.use(cors());
app.use(express.json({ extended: false }));

// routes
app.use('/schema', require('./routes/schema'));

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});