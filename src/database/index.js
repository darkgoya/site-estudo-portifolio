const Database = require('better-sqlite3'); //importa a classe construtora Database da biblioteca "better-sqlite3", que instancia conexões síncronas
const path = require('path'); //importa o módulo nativo 'path' e o coloca em uma váriavel para uso

const dbPath = path.join(__dirname, 'database.db'); //cria uma variável com o caminho da database do servidor, usando novamente __dirname para apontar a própria pasta e o nome do arquivo
const db = new Database(dbPath); //cria uma instância nova da base de dados, utilizando o caminho, e a coloca em uma variável

/*executa um código dentro da base de dados para verificar se existe a tabela na base de dados, caso não, cria uma tabela nova, colocando o id como chave primária e auto-incremental
titulo texto que não pode ser vazio, status texto que não pode ser vazio e o padrão inicial é pending e a data de criação com a data de quando for colocado o dado*/
db.exec(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    status TEXT NOT NULL default 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

module.exports = db; //exportação do módulo