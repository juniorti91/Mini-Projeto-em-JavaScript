'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields(); // toda vez que fechar o modal ira limpar o display
    document.getElementById('modal').classList.remove('active');
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [];
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient));

// CRUD - create, read, update e delete
const deleteClient = (index) => { // DELETAR
    const dbClient = readClient();
    dbClient.splice(index,1);
    setLocalStorage(dbClient);
}

const updateClient = (index, client) => { // ATUALIZAR
    const dbClient = readClient();
    dbClient[index] = client;
    setLocalStorage(dbClient);
}

const readClient = () => getLocalStorage(); // LER

const createClient = (client) => { // CRIAR
    const dbClient = getLocalStorage()
    dbClient.push(client);
    setLocalStorage(dbClient);
}
// FIM CRUD

const isValidFields = () => {
    // ira retornar verdadeiro se todos os requisitos HTML do form for atendidos
    return document.getElementById('form').reportValidity(); 
}

// Interação com o Layout
const clearFields = () => {
    const fildes = document.querySelectorAll('.modal-field');
    fildes.forEach(field => field.value = ""); // ele vai pegar cada campo do form e igualar a vazio
}

const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        const index = document.getElementById('nome').dataset.index;
        if (index == 'new') {
            createClient(client);
            updateTable();
            closeModal();
        } else {
            updateClient(index, client);
            updateTable();
            closeModal();
        }    
        
    }
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green"id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}">Excluir</button>
        </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
}

const updateTable = () => {
    const dbClient = readClient(); // faz a leitura do local storage
    clearTable();
    dbClient.forEach(createRow); // faz a interação com cada elemento do array
}

// preenchendo o formulario com os campos ja inseridos para editar o cliente
const fillFields = (client) => {
    document.getElementById('nome').value = client.nome;
    document.getElementById('email').value = client.email;
    document.getElementById('celular').value = client.celular;
    document.getElementById('cidade').value = client.cidade;
    document.getElementById('nome').dataset.index = client.index;
}

const editClient = (index) => {
    const client = readClient()[index];
    client.index = index;
    fillFields(client);
    openModal();
}

const editDelete = (event) => {
    if (event.target.type == "button") {
        const [action, index] = event.target.id.split('-')
        
        if (action == 'edit') {
            editClient(index);            
        } else {
            const client = readClient()[index];
            const response = confirm (`Deseja realmente excluir o cliente ${client.nome}`);
            if (response) {
                deleteClient(index);
                updateTable();
            }            
        }
    }    
}

updateTable();


// Eventos    
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)  

document.getElementById('salvar')
    .addEventListener('click', saveClient);

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete);