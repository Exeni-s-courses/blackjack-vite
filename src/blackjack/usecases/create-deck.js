import _ from "underscore";


/**
 * This funtcion creates a new deck
 * @param {Array<String>} cardTypes Eje: ['C', 'D', 'H', 'S']
 * @param {Array<String>} specialTypes Eje: ['A', 'J', 'Q', 'K']
 * @returns {Array<String>} returns a new deck of cards
 */
export const crearDeck = (cardTypes, specialTypes) => {

    if(!cardTypes || cardTypes.length === 0) throw new Error('cardTypes is required as an string array');
    if(!specialTypes || specialTypes.length === 0) throw new Error('specialTypes is required as an string array');

    let deck = [];
    for (let i = 2; i <= 10; i++) {
        for (const tipo of cardTypes) {
            deck.push(i + tipo);
        }
    }

    for (const tipo of cardTypes) {
        for (const especial of specialTypes) {
            deck.push(especial + tipo);
        }
    }
    return _.shuffle(deck);
}