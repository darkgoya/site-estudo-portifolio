const db = require('../../database');

function createTask(title) {
    const stmt = db.prepare('INSERT INTO tasks (title) VALUES (?)');
    const info = stmt.run(title);
    return info.lastInsertRowid;
}

module.exports = {
    createTask,
};