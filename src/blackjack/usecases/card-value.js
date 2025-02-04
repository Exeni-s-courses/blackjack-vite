/**
 * Get the value of the card
 * @param {String} carta 
 * @returns {Number} returns the value of the card 
 */
export const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : Number(valor)
}
