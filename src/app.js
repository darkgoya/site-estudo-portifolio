const express = require('express');
const path = require('path');
const corsMiddleware = require('./middlewares/cors.middleware');
const tarefasRoutes = require('./modules/tarefas/tarefas.routes');

const app = express();

const publicPath = path.join(__dirname, '..', 'public');

app.use(corsMiddleware);
app.use(express.json());
app.use(express.static(publicPath));
app.use('/tarefas', tarefasRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

module.exports = app;