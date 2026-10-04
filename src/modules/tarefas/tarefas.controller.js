const { createTask, getAllTasks, getTaskById, changeTaskStatus, removeTaskById } = require('./tarefas.service');

function createTaskController(req, res) {
    try {
        const { title } = req.body;
        const task = createTask(title);
        return res.status(201).json(task);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

function getAllTasksController(req, res) {
    try {
        const tasks = getAllTasks();
        return res.status(200).json(tasks);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

function getTaskByIdController(req, res) {
    try {
        const { id } = req.params;
        const task = getTaskById(Number(id));
        return res.status(200).json(task);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

function changeTaskStatusController(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedTask = changeTaskStatus(Number(id), status);
        return res.status(200).json(updatedTask);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

function removeTaskByIdController(req, res) {
    try {
        const { id } = req.params;
        removeTaskById(Number(id));
        return res.status(200).send();
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createTaskController,
    getAllTasksController,
    getTaskByIdController,
    changeTaskStatusController,
    removeTaskByIdController
};