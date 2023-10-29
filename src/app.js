const express = require('express');
const path = require('path');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

const users = [
    { username: 'user1', password: 'pass1' },
    { username: 'user2', password: 'pass2' }
];

app.post('/login', (req, res) => {
    const user = users.find(u => u.username === req.body.username && u.password === req.body.password);
    if (user) {
        res.status(200).send({ message: 'Logged in successfully' });
    } else {
        res.status(401).send({ message: 'Invalid credentials' });
    }
});

// Use chat routes
app.use('/chat', chatRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app; // for further usage and testing
