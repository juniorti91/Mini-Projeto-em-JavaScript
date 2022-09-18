const img = document.getElementById('img');
const buttons = document.getElementById('buttons');
let colorIndex = 0;
let intervalId = null;

// função utilizada para acionar o semáforo recebendo os camandos do botão
const trafficLight = (event) => {
    stopAutomatic();
    turnOn[event.target.id]();
}

const nextIndex = () => {
    colorIndex = colorIndex < 2 ? ++colorIndex : 0;
}

const changecolor = () => {
    const colores = ['red','yellow','green'];
    const color = colores[colorIndex];
    turnOn[color]();
    nextIndex();
}

const stopAutomatic = () => {
    clearInterval(intervalId);
}

const turnOn = {
    'red':          () => img.src = 'img/vermelho.png',
    'yellow':       () => img.src = 'img/amarelo.png',
    'green':        () => img.src = 'img/verde.png',
    'automatic':    () => intervalId = setInterval(changecolor, 1000)
};

buttons.addEventListener('click', trafficLight);