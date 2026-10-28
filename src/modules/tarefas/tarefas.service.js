const { insertTask, listAllTasks, listTaskById, updateTaskStatus, deleteTaskById } = require('./tarefas.repository');
const AppError = require('../../errors/AppError');

function createTask(title) {
    if (typeof title !== 'string' || title.trim() === '') {
        throw new AppError('Titulo inválido', 400);
    }

    const cleanTitle = title.trim();

    if (cleanTitle > 255) {
        throw new AppError('Titulo muito longo', 400);
    }

    const taskId = insertTask(cleanTitle);
    return { id: taskId, title: cleanTitle, status: 'pending' };
}

function getAllTasks() {
    return listAllTasks();
}

function getTaskById(id) {
    if (typeof id !== 'number' || Number.isNaN(id) || id <= 0) {
        throw new AppError('ID inválido', 400);
    }

    const task = listTaskById(id);

    if (!task) {
        throw new AppError('Tarefa não encontrada', 404);
    }

    return task;
}

function changeTaskStatus(id, status) {
    if (typeof id !== 'number' || Number.isNaN(id) || id <= 0) {
        throw new AppError('ID inválido', 400);
    }

    if (typeof status !== 'string' || !['pending', 'done'].includes(status)) {
        throw new AppError('Status inválido', 400);
    }

    const updated = updateTaskStatus(id, status);

    if (!updated) {
        throw new AppError('Tarefa não encontrada', 404);
    }

    return { id, status };
}

function removeTaskById(id) {
    if (typeof id !== 'number' || Number.isNaN(id) || id <= 0) {
        throw new AppError('ID inválido', 400);
    }

    const deleted = deleteTaskById(id);

    if (!deleted) {
        throw new AppError('Tarefa não encontrada', 404);
    }

    return { id };
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    changeTaskStatus,
    removeTaskById
};