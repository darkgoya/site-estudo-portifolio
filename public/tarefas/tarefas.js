const API_URL = '/api/tarefas';

const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');

async function fetchTasks() {
    console.log('1 - Iniciando fetchTasks');
    try {
        const response = await fetch(API_URL);
        console.log('2. Resposta recebida:', response.status);
        if (!response.ok) {
            throw new Error('Falha ao obter tarefas');
        }
        const tasks = await response.json();
        console.log('3. Tarefas recebidas:', tasks);
        renderTasks(tasks);
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
    }
}

function renderTasks(tasks) {
    console.log('4. Renderizando itens. Quantidade:', tasks.length);
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.status}`;
        li.innerHTML = `
            <span class="task-title">${task.title}</span>
            <div class="task-actions">
                <button type="button" onclick="toggleTaskStatus(${task.id}, '${task.status}')">
                    ${task.status === 'done' ? 'Marcar como pendente' : 'Marcar como concluída'}
                </button>
                <button type="button" onclick="deleteTask(${task.id})">Excluir</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

fetchTasks();