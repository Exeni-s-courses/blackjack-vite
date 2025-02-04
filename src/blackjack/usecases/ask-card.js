/**
 * Esta función me permite tomar una carta
 * @param {Array<String>} deck Its a strgin array
 * @returns {String} returns a deckas card
 */
export const pedirCarta = (deck) => {
    if (!deck || deck.length === 0) throw 'No hay cartas en el deck';
    return deck.pop();
}
