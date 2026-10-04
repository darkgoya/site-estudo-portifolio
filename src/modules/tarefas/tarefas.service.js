const { insertTask, listAllTasks, listTaskById } = require('./tarefas.repository');

function createTask(title) {
    if (typeof title !== 'string' || title.trim() === '') {
        throw new Error('Titulo inválido');
    }

    if (title.length > 255) {
        throw new Error('Titulo inválido');
    }

    const cleanTitle = title.trim();
    const taskId = insertTask(cleanTitle);
    return { id: taskId, title: cleanTitle, status: 'pending' };
}

function getAllTasks() {
    return listAllTasks();
}

function getTaskById(id) {
    if (typeof id !== 'number' || Number.isNaN(id) || id <= 0) {
        throw new Error('ID inválido');
    }

    const task = listTaskById(id);

    if (!task) {
        throw new Error('Tarefa não encontrada');
    }

    return task;
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskById
};