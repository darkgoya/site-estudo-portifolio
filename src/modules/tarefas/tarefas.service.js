const { insertTask, listAllTasks, listTaskById, updateTaskStatus } = require('./tarefas.repository');

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

function changeTaskStatus(id, status) {
    if (typeof id !== 'number' || Number.isNaN(id) || id <= 0) {
        throw new Error('ID inválido');
    }

    if (typeof status !== 'string' || !['pending', 'done'].includes(status)) {
        throw new Error('Status inválido');
    }

    const updated = updateTaskStatus(id, status);

    if (!updated) {
        throw new Error('Tarefa não encontrada');
    }

    return { id, status };

}

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    changeTaskStatus
};