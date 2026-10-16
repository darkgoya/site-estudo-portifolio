const { Router } = require('express');//importa parte da biblioteca express e a adiciona em uma variável
const router = Router();//cria uma variável com a função extraída do express

/*importa as funções criadas no tarefas controller*/
const { createTaskController, getAllTasksController, getTaskByIdController, changeTaskStatusController, removeTaskByIdController } = require('./tarefas.controller');

router.post('/', createTaskController);// POST /api/tarefas -> Cria uma nova tarefa a partir dos dados enviados no corpo (body) da requisição
router.get('/', getAllTasksController);// GET /api/tarefas -> Lista todas as tarefas cadastradas no banco de dados
router.get('/:id', getTaskByIdController);// GET /api/tarefas/:id -> Busca uma tarefa específica utilizando o ID enviado como parâmetro na URL
router.patch('/:id', changeTaskStatusController);// PATCH /api/tarefas/:id -> Atualiza parcialmente a tarefa (neste caso, o status) identificada pelo ID na URL
router.delete('/:id', removeTaskByIdController);// DELETE /api/tarefas/:id -> Remove do banco de dados a tarefa correspondente ao ID informado na URL

module.exports = router;//exporta o módulo