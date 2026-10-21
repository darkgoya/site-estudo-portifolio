const API_URL = '/api/tarefas';//variável de URL da API 

const taskList = document.getElementById('task-list');//variável que pega a classe tasklist no html
const taskForm = document.getElementById('task-form');//variável que pega a classe taskform no html
const taskInput = document.getElementById('task-input');//variável que pega a classe taskinput no html

/*função assíncrona que busca as tarefas*/
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);//cria uma variável com o fetch, no url do api e congela o script até que volte a resposta do servidor com o dado
        if (!response.ok) {//se a resposta não for ok
            throw new Error('Falha ao obter tarefas');//jogar erro de falha de obtenção de tarefas
        }
        const tasks = await response.json();//cria a variável com as tarefas, congelando o script para obter a resposta em json
        renderTasks(tasks);//renderiza as tarefas no DOM
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);//responde pelo console o erro caso não tenha obtido ok com a resposta
    }
}

/*função que renderiza as tarefas no DOM*/
function renderTasks(tasks) {
    taskList.innerHTML = '';//limpa toda a lista de tarefas para atualizar com todas
    tasks.forEach(task => {//para cada tarefa dentro da lista
        const li = document.createElement('li');//criar um elemento html de lista dentro da lista não ordenada
        li.className = `task-item ${task.status}`; //coloca o nome da classe no elemento criado
        /*cria todo a marcação hipertexto de cada tarefa, incluindo título, botões de ações (mudar status ou deletar tarefa) para cada tarefa da lista*/
        li.innerHTML = `
            <span class="task-title">${task.title}</span>
            <div class="task-actions">
                <button type="button" onclick="toggleTaskStatus(${task.id}, '${task.status}')">
                    ${task.status === 'done' ? 'Pendente' : 'Concluída'}
                </button>
                <button type="button" onclick="deleteTask(${task.id})">Excluir</button>
            </div>
        `;
        taskList.appendChild(li);//coloca esse elemento como filho da lista não ordenada
    });
}

fetchTasks();//chama a função que lista as tarefas

/*escutador de eventos para o botão de enviar tarefas para a database*/
taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();//cancela a ação padrão do navegador que é de atualizar a página, nesse caso
    const title = taskInput.value.trim();//cria a variável que pega o titulo e corta os espaços para melhor leitura

    if (!title) return;//se não tiver nada no titulo a função para por aqui

    try {
        const response = await fetch(API_URL, { //cria uma variável com o fetch, no url do api e congela o script até que volte a resposta do servidor com o dado
            method: 'POST', //método que é chegado a informação, nesse caso POST
            headers: {
                'Content-Type': 'application/json' //Header explicando como o aplicativo está dentro da página, no caso usando JSON
            },
            body: JSON.stringify({ title })//Converte o valor em um arquivo json, string
        });
        if (!response.ok) { //se a resposta não for ok
            throw new Error('Erro ao adicionar tarefa no servidor'); //jogar erro ao adicionar tarefa no servidor
        }

        taskInput.value = '';//deixa em branco o campo de texto do usuário

        await fetchTasks();//chama a função para atualizar a página de tarefas
    } catch (error) {//pega se vier erro
        console.error('Erro ao adicionar tarefa:', error);//mostra o erro no console
    }
});

/*função para dar update nos status da tarefa, se pending ou done*/
async function toggleTaskStatus(id, currentStatus) {
    const newStatus = currentStatus === 'done' ? 'pending' : 'done'; //cria a variável com a mudança definida nos status

    try { 
        const response = await fetch(`${API_URL}/${id}`, {//cria uma variável com o fetch, no url do api e congela o script até que volte a resposta do servidor com os dados
            method: 'PATCH',//método que virá a informação, nesse caso PATCH
            headers: {
                'Content-Type': 'application/json'//Header explicando como o aplicativo está dentro da página, no caso usando JSON
            },
            body: JSON.stringify({ status: newStatus })//Converte o valor em um arquivo json, string
        });

        if (!response.ok) {//se a resposta não for ok
            throw new Error('Erro ao atualizar status da tarefa no servidor');//joga o erro que não conseguiu atualizar o servidor
        }

        await fetchTasks();//chama a função para atualizar a lista de tarefas
    } catch (error) {//pega se vier erro
        console.error('Erro ao atualizar status da tarefa:', error);//mostra o erro no console
    }
}

/*função para a exclusão da tarefa*/
async function deleteTask(id) {
    const confirmDelete = confirm('Tem certeza de que deseja excluir esta tarefa?');//cria uma janela para confirmar a exclusão com o usuário

    if (!confirmDelete) return;//se o usuário não aceitar excluir a função para por aqui

    try {
        const response = await fetch(`${API_URL}/${id}`, {//cria uma variável com o fetch, no url do api e congela o script até que volte a resposta do servidor com os dados
            method: 'DELETE'//método como a informação chegará ou será utilizada, no caso DELETE
        });

        if (!response.ok) {//se a resposta não for ok
            throw new Error('Erro ao excluir tarefa no servidor');//joga o erro que não conseguiu atualizar o servidor
        }

        await fetchTasks();//chama a função para atualizar a lista de tarefas
    } catch (error) {//pega se vier erro
        console.error('Erro ao excluir tarefa:', error);//mostra o erro no console
    }
}