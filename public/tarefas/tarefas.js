const API_URL = '/api/tarefas';

const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');

async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Falha ao obter tarefas');
        }
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
    }
}

function renderTasks(tasks) {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.status}`;

        const span = document.createElement('span');
        span.className = 'task-title';
        span.textContent = task.title;

        const div = document.createElement('div');
        div.className = 'task-actions';

        const buttonChange = document.createElement('button');
        buttonChange.type = 'button';
        buttonChange.textContent = task.status === 'done' ? 'Pendente' : 'Concluida';
        buttonChange.addEventListener('click', ()=>{toggleTaskStatus(task.id, task.status)});

        const buttonDelete = document.createElement('button');
        buttonDelete.type = 'button';
        buttonDelete.textContent = 'excluir';
        buttonDelete.addEventListener('click', ()=>{deleteTask(task.id)});


        /*li.className = `task-item ${task.status}`;
        li.innerHTML = `
            <img src=x onerror=alert(1)>
            <span class="task-title">${task.title}</span>
            <div class="task-actions">
                <button type="button" onclick="toggleTaskStatus(${task.id}, '${task.status}')">
                    ${task.status === 'done' ? 'Pendente' : 'Concluída'}
                </button>
                <button type="button" onclick="deleteTask(${task.id})">Excluir</button>
            </div>
        `;*/
        li.appendChild(span);
        li.appendChild(div);
        div.appendChild(buttonChange);
        div.appendChild(buttonDelete);
        taskList.appendChild(li);        
    });
}

fetchTasks();

taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = taskInput.value.trim();

    if (!title) return;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        });
        if (!response.ok) {
            throw new Error('Erro ao adicionar tarefa no servidor');
        }

        taskInput.value = '';

        await fetchTasks();
    } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
    }
});

async function toggleTaskStatus(id, currentStatus) {
    const newStatus = currentStatus === 'done' ? 'pending' : 'done';

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar status da tarefa no servidor');
        }

        await fetchTasks();
    } catch (error) {
        console.error('Erro ao atualizar status da tarefa:', error);
    }
}

async function deleteTask(id) {
    const confirmDelete = confirm('Tem certeza de que deseja excluir esta tarefa?');

    if (!confirmDelete) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Erro ao excluir tarefa no servidor');
        }

        await fetchTasks();
    } catch (error) {
        console.error('Erro ao excluir tarefa:', error);
    }
}