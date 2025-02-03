import './style.css';

import { shuffle } from 'underscore';

/*
* 2C = Two of Clubs
* 2D = Two of Diamonds
* 2H = Two of Hearts
* 2S = Two of Spades
*/

(() => {
  'use strict';

  let deck       = [];
  const tipos    = ['C', 'D', 'H', 'S'],
      especiales = ['A', 'J', 'Q', 'K'];

  let puntosJugadores = [];

  // DOM - Referencias del HTML
  const [nuevoBtn, pedirBtn, detenerBtn] = document.querySelectorAll('.btn');
  const [ptsJugador, ptsComputadora] = document.querySelectorAll('small');

  const divCartasJugadores = document.querySelectorAll('.divCartas');

  // Esta función inicializa el juego
  const inicializarJuego = (numJugadores = 2) => {
      deck = crearDeck();
      puntosJugadores = [];
      for (let i = 0; i < numJugadores; i++) {
          puntosJugadores.push(0);
      }

      ptsJugador.innerText = 0;
      ptsComputadora.innerText = 0;

      divCartasJugadores.forEach( elem => elem.innerHTML = '');

      detenerBtn.disabled = false;
      pedirBtn.disabled = false;
  }

  const crearDeck = () => {
      deck = [];
      for (let i = 2; i <= 10; i++) {
          for (const tipo of tipos) {
              deck.push(i + tipo);
          }
      }

      for (const tipo of tipos) {
          for (const especial of especiales) {
              deck.push(especial + tipo);
          }
      }
      return shuffle(deck);
  }



  // Esta función me permite tomar una carta
  const pedirCarta = () => {
      if (deck.length === 0) throw 'No hay cartas en el deck';
      return deck.pop();
  }


  const valorCarta = (carta) => {
      const valor = carta.substring(0, carta.length - 1);
      return (isNaN(valor)) ?
          (valor === 'A') ? 11 : 10
          : Number(valor)
  }

  // Turno: 0 = primer jugador y el último será la PC
  const acumularPuntos = (carta, turno) => {
      puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
      (turno === 0) ? ptsJugador.innerText = puntosJugadores[turno]
          : ptsComputadora.innerText = puntosJugadores[turno];
      return puntosJugadores[turno];
  }

  const crearCarta = ( carta, turno ) => {
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
          const carta = pedirCarta();
          puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
          crearCarta(carta, puntosJugadores.length - 1)
      } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
      determinarGanador();
  }

  // Eventos
  // Una función que se manda como argumento o parametro se llama callback
  pedirBtn.addEventListener('click', () => {
      const carta = pedirCarta();
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


  return {
      init: inicializarJuego
  }

})();

