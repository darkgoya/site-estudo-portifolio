const db = require('../../database');

function insertTask(title) {
    const stmt = db.prepare('INSERT INTO tasks (title) VALUES (?)');
    const info = stmt.run(title);
    return info.lastInsertRowid;
}

function listAllTasks() {
    const stmt = db.prepare('SELECT id, title, status, created_at FROM tasks ORDER BY id DESC');
    return stmt.all();
}

function listTaskById(id) {
    const stmt = db.prepare('SELECT id, title, status, created_at FROM tasks WHERE id = ?');
    return stmt.get(id);
}

module.exports = {
    insertTask,
    listAllTasks,
    listTaskById,
};