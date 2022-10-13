'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')


const tempClient = {
    nome: "Marcos",
    email: "marcos@gmail.com",
    celular: "71-99898-8484",
    cidade: "Salvador"
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
const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        };
        createClient(cliente);
    }
}


// Eventos    
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)  

document.getElementById('salvar')
    .addEventListener('click', saveClient);