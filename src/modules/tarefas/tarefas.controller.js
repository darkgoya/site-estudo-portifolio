const { createTask, getAllTasks, getTaskById, changeTaskStatus, removeTaskById } = require('./tarefas.service');//importa as funções criadas no tarefas service

/*função criada para criar o controlador das tarefas*/
function createTaskController(req, res) {
    try {
        const { title } = req.body;//cria variável de título com o body da requisição que chega
        const task = createTask(title);//chama a função do service de criar tarefas com o titulo
        return res.status(201).json(task);//retorna o código do status caso funcione a função
    }
    catch (error) {
        return res.status(400).json({ error: error.message });//retorna o código do status caso não funcione a função
    }
}

/*função de controle para pegar todas as tarefas*/
function getAllTasksController(req, res) {
    try {
        const tasks = getAllTasks();//chama a função do service para puxar a lista de tarefas
        return res.status(200).json(tasks);//retorna o código do status caso funcione a função
    }
    catch (error) {
        return res.status(500).json({ error: error.message });//retorna o código do status caso não funcione a função
    }
}

/*função de controle para pegar uma tarefa pelo ID*/
function getTaskByIdController(req, res) {
    try {
        const { id } = req.params;//cria a variável de id com os parametros enviados da requisição
        const task = getTaskById(Number(id));//chama a função do service para pegar a tarefa por id
        return res.status(200).json(task);//retorna o código do status caso funcione a função
    }
    catch (error) {
        return res.status(400).json({ error: error.message });//retorna o código do status caso não funcione a função
    }
}

/*função de controle para modificar o status da tarefa*/
function changeTaskStatusController(req, res) {
    try {
        const { id } = req.params;//cria a variável de id com os paramentros enviados da requisição
        const { status } = req.body;//cria a variável de status com o body da requisição
        const updatedTask = changeTaskStatus(Number(id), status);//chama a função de mudança de status do service
        return res.status(200).json(updatedTask);//retorna o código do status caso funcione a função
    }
    catch (error) {
        return res.status(400).json({ error: error.message });//retorna o código do status caso não funcione a função
    }
}

/*função de controle para exclusão de tarefas*/
function removeTaskByIdController(req, res) {
    try {
        const { id } = req.params;//cria a variável de id com os parametros enviados da requisição
        removeTaskById(Number(id));//aciona a função de exclusão da tarefa pelo id
        return res.status(200).send();//retorna o código do status caso funcione a função
    }
    catch (error) {
        return res.status(400).json({ error: error.message });//retorna o código do status caso não funcione a função
    }
}

module.exports = {
    createTaskController,
    getAllTasksController,
    getTaskByIdController,
    changeTaskStatusController,
    removeTaskByIdController
};//exportação de módulos