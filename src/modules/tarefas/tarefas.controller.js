const {createTask} = require('./tarefas.service');

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

module.exports = {
    createTaskController,
};