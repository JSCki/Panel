const express = require('express');
const app = express();
app.use(express.json());

let validKeys = {}; // Store keys and their usage status

// Store generated keys
app.post('/store-key', (req, res) => {
    const { key } = req.body;
    if (key) {
        validKeys[key] = false; // Mark as unused
        res.status(200).send('Key stored successfully');
    } else {
        res.status(400).send('Invalid key');
    }
});

// Validate keys for login
app.post('/validate-key', (req, res) => {
    const { key } = req.body;
    if (key && validKeys.hasOwnProperty(key)) {
        if (!validKeys[key]) {
            validKeys[key] = true; // Mark as used
            res.json({ valid: true });
        } else {
            res.json({ valid: false, message: 'Key already used' });
        }
    } else {
        res.json({ valid: false, message: 'Invalid key' });
    }
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
