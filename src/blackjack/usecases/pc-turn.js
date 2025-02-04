import { pedirCarta } from "./ask-card";
import { valorCarta } from "./card-value";
import { crearCarta } from "./create-card";

// Logica de la PC
const determinarGanador = (puntosJugadores) => {
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

// Turno: 0 = primer jugador y el último será la PC
export const acumularPuntos = (carta, turno, puntosJugadores, ptsJugador, ptsComputadora) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    (turno === 0) ? ptsJugador.innerText = puntosJugadores[turno]
        : ptsComputadora.innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
}


/**
 * 
 * @param {Number} puntosMinimos minimum points the PC needs to win 
 * @param {Array<Number>} puntosJugadores  
 * @param {Array<String>} deck 
 */
export const turnoPC = (puntosMinimos, puntosJugadores, ptsJugador, ptsComputadora, divCartasJugadores, deck = []) => {
    if (!puntosMinimos) throw new Error('Puntos minimos son necesarios');
    if (!puntosJugadores) throw new Error('Puntos jugadores son necesarios');
    let puntosComputadora = 0;
    do {
        const carta = pedirCarta(deck);
        puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1,  puntosJugadores, ptsJugador, ptsComputadora);
        crearCarta(carta, puntosJugadores.length - 1, divCartasJugadores)
    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
    determinarGanador(puntosJugadores);
}