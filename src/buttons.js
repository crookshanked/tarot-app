"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastDrawnCards = void 0;
const debug_ts_1 = require("./debug.ts");
const constants_ts_1 = require("./constants.ts");
// import { cardData } from './cardData.ts';
const geminiAPI_ts_1 = require("./geminiAPI.ts");
const drawCards_ts_1 = require("./drawCards.ts");
const displayCards_ts_1 = require("./displayCards.ts");
exports.lastDrawnCards = []; // Variable to store the last drawn cards
if (constants_ts_1.constants.drawCardsButton) {
    (debug_ts_1.debugMode) ? console.log("constants.drawCardsButton: " + constants_ts_1.constants.drawCardsButton) : '';
    constants_ts_1.constants.drawCardsButton.addEventListener('click', () => {
        (debug_ts_1.debugMode) ? console.log("addEventListener click to constants.drawCardsButton" + constants_ts_1.constants.drawCardsButton) : '';
        if (!constants_ts_1.constants.layoutElement) {
            console.error('Error: Layout element not found.');
            return;
        }
        (debug_ts_1.debugMode) ? console.log('constants.layoutElement :' + constants_ts_1.constants.layoutElement) : '';
        const layout = constants_ts_1.constants.layoutElement.value;
        (debug_ts_1.debugMode) ? console.log('layout :' + constants_ts_1.constants.layoutElement.value) : '';
        // (debugMode) ? console.log() : '';
        const numberOfCardsToDraw = parseInt(layout);
        (debug_ts_1.debugMode) ? console.log('numberOfCardsToDraw: ' + numberOfCardsToDraw) : '';
        const drawnCards = (0, drawCards_ts_1.drawCards)(numberOfCardsToDraw);
        (debug_ts_1.debugMode) ? console.log('drawnCards = drawCards(numberOfCardsToDraw): ' + drawnCards) : '';
        const output = (0, displayCards_ts_1.displayCards)(drawnCards);
        (debug_ts_1.debugMode) ? console.log('output = displayCards(drawnCards): ' + output) : '';
        // Removed the automatic call to getInterpretation(drawnCards);
        exports.lastDrawnCards = drawnCards; // Store the drawn cards
        // Check if readingDiv exists before accessing its style
        if (constants_ts_1.constants.readingDiv) {
            constants_ts_1.constants.readingDiv.style.display = 'block';
        }
        else {
            // readingDiv missing!
            console.error('Error: Reading div not found.');
            // Optionally, inform the user visually
            if (constants_ts_1.constants.outputDiv) {
                constants_ts_1.constants.outputDiv.innerHTML = '<p style="color: red;">Error: Interpretation area not found. Please check the page structure.</p>';
                constants_ts_1.constants.outputDiv.style.display = 'block'; // Ensure output div is visible
            }
        }
    });
}
if (constants_ts_1.constants.getInterpretationButton) {
    constants_ts_1.constants.getInterpretationButton.addEventListener('click', () => {
        if (exports.lastDrawnCards.length > 0) {
            (0, geminiAPI_ts_1.getInterpretation)(exports.lastDrawnCards); // Call getInterpretation with the stored cards
        }
        else {
            // Check if interpretationTextarea exists before setting its value
            if (constants_ts_1.constants.interpretationTextarea) {
                constants_ts_1.constants.interpretationTextarea.value = "Draw cards first to get an interpretation.";
            }
        }
    });
}
// Assuming shareButton is also obtained via getElementById or similar
// Add a check for shareButton
if (constants_ts_1.constants.shareButton) {
    constants_ts_1.constants.shareButton.addEventListener('click', () => {
        // Add checks for constants properties
        if (constants_ts_1.constants && constants_ts_1.constants.shareUrlInput) {
            constants_ts_1.constants.shareUrlInput.value = window.location.href;
        }
        if (constants_ts_1.constants && constants_ts_1.constants.shareTooltip) {
            constants_ts_1.constants.shareTooltip.style.display = 'block';
        }
        // Check again before calling select as shareUrlInput might be null
        if (constants_ts_1.constants && constants_ts_1.constants.shareUrlInput) {
            constants_ts_1.constants.shareUrlInput.select();
        }
    });
}
