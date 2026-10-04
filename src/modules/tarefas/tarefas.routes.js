const { Router } = require('express');
const router = Router();

const { createTaskController, getAllTasksController, getTaskByIdController } = require('./tarefas.controller');

router.post('/', createTaskController);
router.get('/', getAllTasksController);
router.get('/:id', getTaskByIdController);

module.exports = router;