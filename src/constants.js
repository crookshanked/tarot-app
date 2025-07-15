"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constants = void 0;
exports.constants = {
    cardDirectory: "assets/images/cards/",
    drawCardsButton: document.getElementById('draw-cards'),
    readingDiv: document.getElementById('reading'),
    outputDiv: document.getElementById('output-div'),
    cardsDiv: document.getElementById('cards'),
    getInterpretationButton: document.getElementById('get-interpretation-button'),
    interpretationTextarea: document.getElementById('interpretation'),
    layoutElement: document.getElementById('layout'), // Assert type and allow null
    downloadLink: document.getElementById('download'),
    shareButton: document.getElementById('share-button'),
    shareTooltip: document.getElementById('share-tooltip'),
    shareUrlInput: document.getElementById('share-url'),
    apiKeyInput: document.getElementById('api-key'),
    modelSelect: document.getElementById('model-select'),
    providerSelect: document.getElementById('provider-select'),
};
