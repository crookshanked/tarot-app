"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawCards = drawCards;
const debug_ts_1 = require("./debug.ts");
const constants_ts_1 = require("./constants.ts");
const cardData_ts_1 = require("./cardData.ts");
// Cast the imported cardData to the defined type
const typedCardData = cardData_ts_1.cardData;
(debug_ts_1.debugMode) ? console.log('typedCardData: ' + typedCardData) : '';
function drawCards(numCards) {
    (debug_ts_1.debugMode) ? console.log('drawCards(numCards): ' + numCards) : '';
    const drawnCards = [];
    // const allCards = [];
    // Seems to not like the [] setting... trying this below as a quick fix.
    // const allCards: { name: any; value?: any; suit: string; file: any; }[] = [];
    const allCards = [];
    typedCardData.majorArcana.forEach(card => allCards.push({
        name: card.name,
        value: card.value,
        suit: 'Major Arcana',
        file: constants_ts_1.constants.cardDirectory + card.file // Added non-null assertion
    }));
    (debug_ts_1.debugMode) ? console.log('typedCardData.majorArcana - allCards: ' + allCards) : '';
    const suits = ["Wands", "Cups", "Swords", "Pentacles"];
    suits.forEach(suit => {
        typedCardData[suit].forEach(cardNumber => {
            const cardNumberKey = Object.keys(cardNumber)[0];
            const fileName = cardNumber[cardNumberKey];
            let cardValue = cardNumberKey;
            (debug_ts_1.debugMode) ? console.log('let cardValue = cardNumberKey: ' + cardValue) : '';
            switch (parseInt(cardNumberKey)) {
                case 1:
                    cardValue = "Ace";
                    break;
                case 11:
                    cardValue = "Page";
                    break;
                case 12:
                    cardValue = "Knight";
                    break;
                case 13:
                    cardValue = "Queen";
                    break;
                case 14:
                    cardValue = "King";
                    break;
                default:
                    break;
            }
            (debug_ts_1.debugMode) ? console.log('after switch() - let cardValue = cardNumberKey: ' + cardValue) : '';
            const cardName = `${cardValue} of ${suit}`; // e.g., "2 of Wands", "8 of Cups"
            (debug_ts_1.debugMode) ? console.log('cardName: ' + cardName) : '';
            // const cardName = `${cardNumberKey} of ${suit}`; // e.g., "2 of Wands", "8 of Cups"
            if (fileName) { // Added check for undefined fileName
                (debug_ts_1.debugMode) ? console.log('fileName: ' + fileName) : '';
                allCards.push({
                    name: cardName,
                    suit: suit,
                    file: constants_ts_1.constants.cardDirectory + fileName // Added non-null assertion
                });
            }
            (debug_ts_1.debugMode) ? console.log('fileName push allCards: ' + allCards) : '';
        });
    });
    for (let i = 0; i < numCards; i++) {
        const isReversed = Math.random() < 0.5;
        const cardIndex = Math.floor(Math.random() * allCards.length);
        const card = allCards.splice(cardIndex, 1)[0]; // Get the first element from the splice result
        (debug_ts_1.debugMode) ? console.log('isReversed: ' + isReversed) : '';
        (debug_ts_1.debugMode) ? console.log('cardIndex: ' + cardIndex) : '';
        (debug_ts_1.debugMode) ? console.log('card: ' + card) : '';
        drawnCards.push(Object.assign(Object.assign({}, card), { reversed: isReversed }));
        (debug_ts_1.debugMode) ? console.log('drawnCards.push: ' + drawnCards) : '';
    }
    return drawnCards;
}
