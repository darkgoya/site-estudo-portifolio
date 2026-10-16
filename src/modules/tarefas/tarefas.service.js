const { insertTask, listAllTasks, listTaskById, updateTaskStatus, deleteTaskById } = require('./tarefas.repository'); //importa as funções criadas no repositório das tarefas

/*função que cria a tarefa*/
function createTask(title) {
    if (typeof title !== 'string' || title.trim() === '') {//se a tarefa não tiver titulo ou o trim retornar vazio
        throw new Error('Titulo inválido');//Jogar o erro de título inválido
    }

    if (title.length > 255) {//se o título tem mais de 255 caracteres
        throw new Error('Titulo inválido');//jogar o erro de título inválido
    }

    const cleanTitle = title.trim();//corta qualquer espaço depois e antes do titulo e o coloca em uma nova variável
    const taskId = insertTask(cleanTitle);//chama a função do repositório de inserir tarefas, e a guarda em uma variável pois a função retorna o ID da tarefa inserida
    return { id: taskId, title: cleanTitle, status: 'pending' };//retona ID, Titulo e o status da tarefa inserida
}

/*função que pega a lista de todas as tarefas inseridas*/
function getAllTasks() {
    return listAllTasks();//retorna a função do repositório que puxa a lista completa de tarefas inseridas
}

/*função para buscar tarefa baseada em ID*/
function getTaskById(id) {
    if (typeof id !== 'number' || Number.isNaN(id) || id <= 0) {//se o ID não for um número ou NAN ou id negativo
        throw new Error('ID inválido');//jogar erro de id inválido
    }

    const task = listTaskById(id); //cria a variável com a tarefa da ID desejada

    if (!task) {//se a tarefa não existe
        throw new Error('Tarefa não encontrada');//jogar erro de tarefa não encontrada
    }

    return task; //retorna tarefa
}

/*função feita para mudar o status da tarefa (done, pending)*/
function changeTaskStatus(id, status) {
    if (typeof id !== 'number' || Number.isNaN(id) || id <= 0) {//se o ID não for um número ou NAN ou id negativo
        throw new Error('ID inválido');//jogar erro de id inválido
    }

    if (typeof status !== 'string' || !['pending', 'done'].includes(status)) {//se o status não for string ou não estiver dentro das especificações
        throw new Error('Status inválido');//jogar erro de status inválido
    }

    const updated = updateTaskStatus(id, status);//criar variável enquanto muda o status da tarefa

    if (!updated) {//se não deu update
        throw new Error('Tarefa não encontrada');//kpgar erro de tarefa não encontrada
    }

    return { id, status };//retorna o ID e o status da tarefa
}

/*função para excluir a tarefa pelo id*/
function removeTaskById(id) {
    if (typeof id !== 'number' || Number.isNaN(id) || id <= 0) {//se o ID não for um número ou NAN ou id negativo
        throw new Error('ID inválido');//jogar erro de id inválido
    }

    const deleted = deleteTaskById(id);//exclui a tarefa pelo id e cria a variável com o resultado

    if (!deleted) {//se não deletou a tarefa
        throw new Error('Tarefa não encontrada');//jogar o erro de tarefa não encontrada
    }

    return { id };//retorna id da tarefa
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    changeTaskStatus,
    removeTaskById
};//exporta os modulos