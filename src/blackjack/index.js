
import { pedirCarta } from './usecases/ask-card';
import { valorCarta } from './usecases/card-value';
import { crearDeck } from './usecases/create-deck';

/*
* 2C = Two of Clubs
* 2D = Two of Diamonds
* 2H = Two of Hearts
* 2S = Two of Spades
*/



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



// Turno: 0 = primer jugador y el último será la PC
const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    (turno === 0) ? ptsJugador.innerText = puntosJugadores[turno]
        : ptsComputadora.innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
}

const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta')
    divCartasJugadores[turno].append(imgCarta);
}

const determinarGanador = () => {
    const [puntosMinimos, puntosComputadora] = puntosJugadores;
    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert('Nadie gana :(');
        } else if (puntosMinimos > 21) {
            alert('Computadora gana!!');
        } else if (puntosComputadora > 21) {
            alert('Jugador gana!!');
        } else {
            alert('Computadora gana!!');
        }
    }, 100);
}

// Logica de la PC
const turnoPC = (puntosMinimos) => {
    let puntosComputadora = 0;
    do {
        const carta = pedirCarta(deck);
        puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
        crearCarta(carta, puntosJugadores.length - 1)
    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
    determinarGanador();
}

// Eventos
// Una función que se manda como argumento o parametro se llama callback
pedirBtn.addEventListener('click', () => {
    const carta = pedirCarta(deck);
    const puntosJugador = acumularPuntos(carta, 0);

    crearCarta(carta, 0);

    if (puntosJugador > 21) {
        console.warn('Lo siento mucho, perdiste');
        pedirBtn.disabled = true;
        turnoPC(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn('21 GENIAL!');
        pedirBtn.disabled = true;
        detenerBtn.disabled = true;
        turnoPC(puntosJugador);
    }
});

detenerBtn.addEventListener('click', () => {
    detenerBtn.disabled = true;
    pedirBtn.disabled = true;
    turnoPC(puntosJugadores[0]);
})

nuevoBtn.addEventListener('click', () => {
    inicializarJuego();
})



