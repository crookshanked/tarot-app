"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayCards = displayCards;
const debug_ts_1 = require("./debug.ts");
const constants_ts_1 = require("./constants.ts");
const geminiAPI_ts_1 = require("./geminiAPI.ts");
function displayCards(cards) {
    (debug_ts_1.debugMode) ? console.log(cards) : '';
    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        const cardImg = document.createElement('img');
        const imageUrl = card.file;
        cardImg.src = imageUrl;
        if (card.reversed) {
            cardImg.classList.add('reversed');
        }
        const cardName = document.createElement('p');
        cardName.textContent = card.name + (card.reversed ? ' (Reversed)' : '');
        cardDiv.appendChild(cardImg);
        cardDiv.appendChild(cardName);
        const meaningTextarea = document.createElement('textarea');
        meaningTextarea.id = `meaning-${card.name.replace(/ /g, '_')}`;
        meaningTextarea.readOnly = true;
        cardDiv.appendChild(meaningTextarea);
        // Check if constants.cardsDiv exists before appending
        if (constants_ts_1.constants.cardsDiv) {
            constants_ts_1.constants.cardsDiv.appendChild(cardDiv);
        }
        else {
            console.error('Error: constants.cardsDiv is null or undefined. Cannot display cards.');
            // Communicate to the user that the cards could not be displayed
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Error displaying cards. Please try again later.';
            errorMessage.style.color = 'red'; // Optional: style the error message
            document.body.appendChild(errorMessage); // Append the error message to the body
        }
        (0, geminiAPI_ts_1.getCardMeaning)(card.name, card.reversed, meaningTextarea.id);
    });
}
