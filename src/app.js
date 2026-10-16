const express = require('express'); //importa biblioteca express e o adiciona em uma variável
const path = require('path'); //importa o módulo nativo e o adiciona em uma variável
const corsMiddleware = require('./middlewares/cors.middleware'); //cria uma variável do Middleware do CORS, para diálogo entre front e backend com servidores diferentes
const tarefasRoutes = require('./modules/tarefas/tarefas.routes'); //importa roteador específico do app de tarefas, contendo os endpoints usados (GET, POST, PATCH, DELETE)

const app = express(); //chama função express() para criar uma instência da aplicação

const publicPath = path.join(__dirname, '..', 'public'); //cria uma variável aonde __dirname aponta a pasta do arquivo, '..' volta uma pasta e entra em 'public', o path.join cria um caminho padronizado

app.use(corsMiddleware); //faz a liberação das requisições que chegam no servidor
app.use(express.json()); //lê e interpreta o body das requisições que chegam em formato JSON
app.use(express.static(publicPath)); //transforma a pasta public em um servidor estático
app.use('/api/tarefas', tarefasRoutes);//conecta as rotas do módulo de tarefas a um prefixo na url

/*get do express para verificação de saúde do servidor*/
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

module.exports = app; //exportação do módulo