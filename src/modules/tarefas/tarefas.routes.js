const { Router } = require('express');
const router = Router();

const { createTaskController, getAllTasksController, getTaskByIdController, changeTaskStatusController, removeTaskByIdController } = require('./tarefas.controller');

router.post('/', createTaskController);
router.get('/', getAllTasksController);
router.get('/:id', getTaskByIdController);
router.patch('/:id', changeTaskStatusController);
router.delete('/:id', removeTaskByIdController);

module.exports = router;