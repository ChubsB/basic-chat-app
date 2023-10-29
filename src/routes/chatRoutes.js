const express = require('express');
const router = express.Router();

// Modify the message structure to include the username
const messages = [];

router.get('/messages', (req, res) => {
    res.json(messages);
});

router.post('/messages', (req, res) => {
    const { message, username } = req.body;
    
    if (!message || !username) {
        return res.status(400).send('Both message content and username are required');
    }
    
    messages.push({ username, message });
    res.status(201).send('Message added');
});

module.exports = router;
