const express = require('express');
const path = require('path');

const app = express();

const publicPath = path.join(__dirname, '..', 'public');

app.use(express.json());
app.use(express.static(publicPath));

app.get('/health', (req, res) => {
    res.status(200).send(JSON.stringify({ status: 'ok' }));
});

module.exports = app;