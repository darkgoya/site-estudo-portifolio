const { Router } = require('express');
const router = Router();

const { createTaskController } = require('./tarefas.controller');

router.post('/', createTaskController);

module.exports = router;