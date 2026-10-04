const { Router } = require('express');
const router = Router();

const { createTaskController, getAllTasksController, getTaskByIdController, changeTaskStatusController } = require('./tarefas.controller');

router.post('/', createTaskController);
router.get('/', getAllTasksController);
router.get('/:id', getTaskByIdController);
router.patch('/:id', changeTaskStatusController);

module.exports = router;