const db = require('../../database');//importa a pasta de database, inicializando o index.js dentro dela.

/*Função para inserir tarefa na database, requerindo o título*/
function insertTask(title) {
    const stmt = db.prepare('INSERT INTO tasks (title) VALUES (?)');//Prepara a sql que será usada, no caso inserir na tabela tasks os valores (?)
    const info = stmt.run(title);//roda a sql na database
    return info.lastInsertRowid;//retorna a id que foi inserida
}

/*Função para retornar todas as tarefas que foram inseridas na db*/
function listAllTasks() {
    const stmt = db.prepare('SELECT id, title, status, created_at FROM tasks ORDER BY id DESC');//Prepara a sql que será usada, no caso pegar todas os dados que se encontram na tabela
    return stmt.all();//roda a sql e retorna todos os dados que o prepare pediu
}

/*Função que eu criei para puxar qualquer tarefa baseada em seu ID*/
function listTaskById(id) {
    const stmt = db.prepare('SELECT id, title, status, created_at FROM tasks WHERE id = ?');//prepara a sql que será usada, no caso pegar os dados da tabela com o ID pedido
    return stmt.get(id);//roda e retorna os dados pedidos no prepare
}

/*Função usada para atualizar parte da tabela, pedindo o ID e o STATUS para atualização*/
function updateTaskStatus(id, status) {
    const stmt = db.prepare('UPDATE tasks SET status = ? WHERE id = ?');//prepara a sql que será usada,     
    const info = stmt.run(status, id);//roda o a sql na database
    return info.changes > 0;//retorna apenas se aconteceu alguma mudança na database
}

/*Função usada para deletar tarefas baseadas no ID*/
function deleteTaskById(id) {
    const stmt = db.prepare('DELETE FROM tasks WHERE id = ?');//prepara a sql que será usada, no caso deletar as tarefas com certo id
    const info = stmt.run(id);//roda a sql na database
    return info.changes > 0;//retorna apenas se aconteceu mudança na database
}

module.exports = {
    insertTask,
    listAllTasks,
    listTaskById,
    updateTaskStatus,
    deleteTaskById
};//exportação dos módulos 