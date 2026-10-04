const { Router } = require('express');
const router = Router();

const { createTaskController, getAllTasksController } = require('./tarefas.controller');

router.post('/', createTaskController);
router.get('/', getAllTasksController);


module.exports = router;