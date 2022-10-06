'use strict'; // utilizado para pegar erros e mostra em tela

// Função para criar os SONS
const sons = {
    'A': 'boom.wav',
    'S': 'clap.wav',
    'D': 'hihat.wav',
    'F': 'kick.wav',
    'G': 'openhat.wav',
    'H': 'ride.wav',
    'J': 'snare.wav',
    'K': 'tink.wav',
    'L': 'tom.wav'
}

// Função para criar as DIV'S
const criarDiv = (texto) => {
    const div = document.createElement('div'); // criação da div
    div.classList.add('key'); // adicionando a classe CSS
    div.textContent = texto; // pegando o texto digitado no campo da DIV
    div.id = texto; //adicionado um ID na DIV inserida
    document.getElementById('container').appendChild(div); // Adicionando DIV em CONTAINER
}

// Função para exibir os SONS na tela
// retona um array com todas as keys e criar uma DIV
const exibir = (sons) => Object.keys(sons).forEach(criarDiv);

const tocarSom = (letra) => {
    const audio = new Audio(`./sounds/${sons[letra]}`);
    audio.play();
}

const adicionarEfeito = (letra) => document.getElementById(letra) // Pegou o elemento através do ID
                                            .classList.add('active'); // Adicionou uma classe ACTIVE

const removerEfeito = (letra) => {
    const div  = document.getElementById(letra);
    const removeActive = () => div.classList.remove('active');
    div.addEventListener('transitionend', removeActive); // Espera a transição acabar para executar o active
}                                           

const ativarDiv = (evento) => {

    const letra = evento.type == 'click' ? evento.target.id : evento.key.toUpperCase();
    
    const letraPermitida = sons.hasOwnProperty(letra); // verificar se a letra existir retorna TRUE e toca o sim com o click 
    if (letraPermitida){
        adicionarEfeito(letra);
        tocarSom(letra);
        removerEfeito(letra);
    }
}


exibir(sons);
document.getElementById('container')
        .addEventListener('click', ativarDiv);

// Capturando o efeito das teclas
window.addEventListener('keydown', ativarDiv);