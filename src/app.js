const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());  // To parse JSON body
app.use(express.static(path.join(__dirname, '../frontend')));

// In-memory messages store
const messages = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/messages', (req, res) => {
    res.json(messages);
});

app.post('/messages', (req, res) => {
    const message = req.body.message;
    if (!message) {
        return res.status(400).send('Message content is required');
    }
    messages.push(message);
    res.status(201).send('Message added');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app; // for further usage and testing
