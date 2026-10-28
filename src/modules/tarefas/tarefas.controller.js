const { createTask, getAllTasks, getTaskById, changeTaskStatus, removeTaskById } = require('./tarefas.service');

function createTaskController(req, res) {
    const title= req.body?.title;
    const task = createTask(title);
    return res.status(201).json(task);
}

function getAllTasksController(req, res) {
    const tasks = getAllTasks();
    return res.status(200).json(tasks);
}

function getTaskByIdController(req, res) {

    const { id } = req.params;
    const task = getTaskById(Number(id));
    return res.status(200).json(task);
}

function changeTaskStatusController(req, res) {
    const { id } = req.params;
    const status= req.body?.status;
    const updatedTask = changeTaskStatus(Number(id), status);
    return res.status(200).json(updatedTask);
}

function removeTaskByIdController(req, res) {
    const { id } = req.params;
    removeTaskById(Number(id));
    return res.status(204).send();
}

module.exports = {
    createTaskController,
    getAllTasksController,
    getTaskByIdController,
    changeTaskStatusController,
    removeTaskByIdController
};