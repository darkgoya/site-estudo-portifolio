const API_URL = '/api/tarefas'; //URL base da API de tarefas

const taskList = document.getElementById('task-list'); //referência ao elemento HTML que exibe a lista de tarefas
const taskForm = document.getElementById('task-form'); //referência ao formulário de criação de tarefas
const taskInput = document.getElementById('task-input'); //referência ao campo de texto para digitar o título da tarefa

/*função assíncrona que busca todas as tarefas da API e renderiza na tela*/
async function fetchTasks() {
    try {
        const response = await fetch(API_URL); //envia requisição GET para a API e aguarda a resposta
        if (!response.ok) { //verifica se a resposta indica erro HTTP
            throw new Error('Falha ao obter tarefas'); //lança erro caso a resposta não seja bem-sucedida
        }
        const tasks = await response.json(); //converte o corpo da resposta em JSON com a lista de tarefas
        renderTasks(tasks); //chama a função que exibe as tarefas no DOM
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error); //exibe o erro no console do navegador
    }
}

/*função que limpa a lista atual e renderiza todas as tarefas recebidas no DOM*/
function renderTasks(tasks) {
    taskList.innerHTML = ''; //limpa o conteúdo atual da lista para evitar duplicação
    tasks.forEach(task => { //itera sobre cada tarefa retornada pela API
        const li = document.createElement('li'); //cria um elemento de lista para representar a tarefa
        li.className = `task-item ${task.status}`; //aplica classes CSS com o status da tarefa (pending ou done)
        /*monta o HTML interno de cada tarefa com título e botões de ação*/
        li.innerHTML = `
            <span class="task-title">${task.title}</span>
            <div class="task-actions">
                <button type="button" onclick="toggleTaskStatus(${task.id}, '${task.status}')">
                    ${task.status === 'done' ? 'Pendente' : 'Concluída'}
                </button>
                <button type="button" onclick="deleteTask(${task.id})">Excluir</button>
            </div>
        `;
        taskList.appendChild(li); //adiciona o elemento criado à lista visível na página
    });
}

fetchTasks(); //carrega as tarefas ao iniciar a página

/*escutador de evento submit no formulário para criar uma nova tarefa via POST*/
taskForm.addEventListener('submit', async (event) => {
    event.preventDefault(); //impede o recarregamento padrão da página ao enviar o formulário
    const title = taskInput.value.trim(); //obtém o valor digitado removendo espaços extras

    if (!title) return; //interrompe se o título estiver vazio após o trim

    try {
        const response = await fetch(API_URL, { //envia requisição POST para criar a tarefa
            method: 'POST', //define o método HTTP como POST
            headers: {
                'Content-Type': 'application/json' //informa ao servidor que o corpo está em JSON
            },
            body: JSON.stringify({ title }) //serializa o objeto com o título para enviar no corpo
        });
        if (!response.ok) { //verifica se a resposta indica erro HTTP
            throw new Error('Erro ao adicionar tarefa no servidor'); //lança erro caso a criação falhe
        }

        taskInput.value = ''; //limpa o campo de entrada após criação bem-sucedida

        await fetchTasks(); //atualiza a lista exibida com a nova tarefa incluída
    } catch (error) {
        console.error('Erro ao adicionar tarefa:', error); //exibe o erro no console do navegador
    }
});

/*função assíncrona que alterna o status da tarefa entre pending e done via PATCH*/
async function toggleTaskStatus(id, currentStatus) {
    const newStatus = currentStatus === 'done' ? 'pending' : 'done'; //define o novo status como o oposto do atual

    try {
        const response = await fetch(`${API_URL}/${id}`, { //envia requisição PATCH para a tarefa específica
            method: 'PATCH', //define o método HTTP como PATCH para atualização parcial
            headers: {
                'Content-Type': 'application/json' //informa ao servidor que o corpo está em JSON
            },
            body: JSON.stringify({ status: newStatus }) //serializa o novo status para enviar no corpo
        });

        if (!response.ok) { //verifica se a resposta indica erro HTTP
            throw new Error('Erro ao atualizar status da tarefa no servidor'); //lança erro caso a atualização falhe
        }

        await fetchTasks(); //atualiza a lista exibida com o status alterado
    } catch (error) {
        console.error('Erro ao atualizar status da tarefa:', error); //exibe o erro no console do navegador
    }
}

/*função assíncrona que exclui uma tarefa após confirmação do usuário via DELETE*/
async function deleteTask(id) {
    const confirmDelete = confirm('Tem certeza de que deseja excluir esta tarefa?'); //exibe diálogo de confirmação antes de prosseguir

    if (!confirmDelete) return; //interrompe se o usuário cancelar a exclusão

    try {
        const response = await fetch(`${API_URL}/${id}`, { //envia requisição DELETE para a tarefa específica
            method: 'DELETE' //define o método HTTP como DELETE
        });

        if (!response.ok) { //verifica se a resposta indica erro HTTP
            throw new Error('Erro ao excluir tarefa no servidor'); //lança erro caso a exclusão falhe
        }

        await fetchTasks(); //atualiza a lista exibida sem a tarefa removida
    } catch (error) {
        console.error('Erro ao excluir tarefa:', error); //exibe o erro no console do navegador
    }
}