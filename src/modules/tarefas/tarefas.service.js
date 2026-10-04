const { insertTask, listAllTasks } = require('./tarefas.repository');

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

module.exports = {
    createTask,
    getAllTasks,
};