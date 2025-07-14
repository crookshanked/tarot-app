import { debugMode } from './debug.ts'
import { constants } from './constants.ts';
import { cardData } from './cardData.ts';

interface CardData {
  majorArcana: { name: string; value: number; file: string; }[];
  Wands: { [key: string]: string | undefined; }[];
  Cups: { [key: string]: string | undefined; }[];
  Swords: { [key: string]: string | undefined; }[];
  Pentacles: { [key: string]: string | undefined; }[];
}

// Cast the imported cardData to the defined type
const typedCardData: CardData = cardData as CardData;
(debugMode) ? console.log('typedCardData: ' + typedCardData) : '';

export function drawCards(numCards: number) {
  (debugMode) ? console.log('drawCards(numCards): ' + numCards) : '';
  const drawnCards = [];
  // const allCards = [];
  // Seems to not like the [] setting... trying this below as a quick fix.
  // const allCards: { name: any; value?: any; suit: string; file: any; }[] = [];
  const allCards: Array<{ name: any; value?: any; suit: string; file: any; }> = [];

  typedCardData.majorArcana.forEach(
    card => allCards.push({
      name: card.name,
      value: card.value,
      suit: 'Major Arcana',
      file: constants.cardDirectory! + card.file // Added non-null assertion
    })
  );
  (debugMode) ? console.log('typedCardData.majorArcana - allCards: ' + allCards) : '';

  const suits: ('Wands' | 'Cups' | 'Swords' | 'Pentacles')[] = ["Wands", "Cups", "Swords", "Pentacles"];
  suits.forEach(suit => {
    typedCardData[suit].forEach(cardNumber => {
      const cardNumberKey = Object.keys(cardNumber)[0];
      const fileName = cardNumber[cardNumberKey];
      let cardValue = cardNumberKey;
      (debugMode) ? console.log('let cardValue = cardNumberKey: ' + cardValue) : '';
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
      (debugMode) ? console.log('after switch() - let cardValue = cardNumberKey: ' + cardValue) : '';
      const cardName = `${cardValue} of ${suit}`; // e.g., "2 of Wands", "8 of Cups"
      (debugMode) ? console.log('cardName: ' + cardName) : '';

      // const cardName = `${cardNumberKey} of ${suit}`; // e.g., "2 of Wands", "8 of Cups"

      if (fileName) { // Added check for undefined fileName
        (debugMode) ? console.log('fileName: ' + fileName) : '';
        allCards.push({
          name: cardName,
          suit: suit,
          file: constants.cardDirectory! + fileName // Added non-null assertion
        });
      }
      (debugMode) ? console.log('fileName push allCards: ' + allCards) : '';

    });
  });

  for (let i = 0; i < numCards; i++) {
    const isReversed = Math.random() < 0.5;
    const cardIndex = Math.floor(Math.random() * allCards.length);
    const card = allCards.splice(cardIndex, 1)[0]; // Get the first element from the splice result
    (debugMode) ? console.log('isReversed: ' + isReversed) : '';
    (debugMode) ? console.log('cardIndex: ' + cardIndex) : '';
    (debugMode) ? console.log('card: ' + card) : '';

    drawnCards.push({ ...card, reversed: isReversed });
    (debugMode) ? console.log('drawnCards.push: ' + drawnCards) : '';

  }

  return drawnCards;
}
