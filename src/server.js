const app = require('./app');
const { port } = require('./config');
const db = require('./database');

app.listen(port, () => {
    console.log(`Servidor rodando no ${port}`);
});