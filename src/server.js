const app = require('./app'); //importa instância configurada do express exportada pelo app.js
const { port } = require('./config'); //usa desestruturação para extrair diretamente a propriedade port do módulo de configurações de ambiente
const db = require('./database'); //importa o módulo de database, procurando dentro da pasta o index.js para inicializar a ligação com a base de dados

//inicia o servidor HTTP escutando as conexões na porta definida
app.listen(port, () => {
    //callback executado no momento que o servidor fica pronto para requisições
    console.log(`Servidor rodando no ${port}`);
});