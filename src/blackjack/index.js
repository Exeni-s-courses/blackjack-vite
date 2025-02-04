
/*
* 2C = Two of Clubs
* 2D = Two of Diamonds
* 2H = Two of Hearts
* 2S = Two of Spades
*/

import { crearDeck, valorCarta, pedirCarta, crearCarta, turnoPC, acumularPuntos } from "./usecases";



let deck = [];
const tipos = ['C', 'D', 'H', 'S'],
    especiales = ['A', 'J', 'Q', 'K'];

let puntosJugadores = [];

// DOM - Referencias del HTML
const [nuevoBtn, pedirBtn, detenerBtn] = document.querySelectorAll('.btn');
const [ptsJugador, ptsComputadora] = document.querySelectorAll('small');

const divCartasJugadores = document.querySelectorAll('.divCartas');


deck = crearDeck(tipos, especiales);

// Esta función inicializa el juego
const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck(tipos, especiales);
    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
        puntosJugadores.push(0);
    }

    ptsJugador.innerText = 0;
    ptsComputadora.innerText = 0;

    divCartasJugadores.forEach(elem => elem.innerHTML = '');

    detenerBtn.disabled = false;
    pedirBtn.disabled = false;
}



// Eventos
// Una función que se manda como argumento o parametro se llama callback
pedirBtn.addEventListener('click', () => {
    const carta = pedirCarta(deck);
    const puntosJugador = acumularPuntos(carta, 0, puntosJugadores, ptsJugador, ptsComputadora);

    crearCarta(carta, 0);

    if (puntosJugador > 21) {
        console.warn('Lo siento mucho, perdiste');
        pedirBtn.disabled = true;
        turnoPC(puntosJugador, puntosJugadores, ptsJugador, ptsComputadora, divCartasJugadores, deck);
    } else if (puntosJugador === 21) {
        console.warn('21 GENIAL!');
        pedirBtn.disabled = true;
        detenerBtn.disabled = true;
        turnoPC(puntosJugador, puntosJugadores, ptsJugador, ptsComputadora, divCartasJugadores, deck);
    }
});

detenerBtn.addEventListener('click', () => {
    detenerBtn.disabled = true;
    pedirBtn.disabled = true;
    turnoPC(puntosJugadores[0], puntosJugadores, ptsJugador, ptsComputadora, divCartasJugadores, deck);
})

nuevoBtn.addEventListener('click', () => {
    inicializarJuego();
})



