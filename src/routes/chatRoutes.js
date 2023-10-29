const express = require('express');
const router = express.Router();

// In-memory messages store
const messages = [];

router.get('/messages', (req, res) => {
    res.json(messages);
});

router.post('/messages', (req, res) => {
    const message = req.body.message;
    if (!message) {
        return res.status(400).send('Message content is required');
    }
    messages.push(message);
    res.status(201).send('Message added');
});

module.exports = router;
