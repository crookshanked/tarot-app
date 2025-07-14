import { debugMode } from './debug.ts'
import { constants } from './constants.ts';
// import { cardData } from './cardData.ts';
import { getInterpretation } from './geminiAPI.ts';
import { drawCards } from './drawCards.ts';
import { displayCards } from './displayCards.ts';

// Define the interface for a card based on the error message
interface Card {
    reversed: boolean;
    name: any; // Using 'any' based on the error, ideally this would be more specific
    value?: any; // Using 'any' and optional based on the error
    suit: string;
    file: any; // Using 'any' based on the error
}

export let lastDrawnCards: Card[] = []; // Variable to store the last drawn cards

if (constants.drawCardsButton) {
    (debugMode) ? console.log("constants.drawCardsButton: " + constants.drawCardsButton) : '';
    constants.drawCardsButton.addEventListener('click', () => {
        (debugMode) ? console.log("addEventListener click to constants.drawCardsButton" + constants.drawCardsButton) : '';
        if (!constants.layoutElement) {
            console.error('Error: Layout element not found.');
            return;
        }
        (debugMode) ? console.log('constants.layoutElement :' + constants.layoutElement) : '';
        const layout = constants.layoutElement.value;
        (debugMode) ? console.log('layout :' + constants.layoutElement.value) : '';
        // (debugMode) ? console.log() : '';
        const numberOfCardsToDraw = parseInt(layout);
        (debugMode) ? console.log('numberOfCardsToDraw: ' + numberOfCardsToDraw) : '';

        const drawnCards = drawCards(numberOfCardsToDraw);
        (debugMode) ? console.log('drawnCards = drawCards(numberOfCardsToDraw): ' + drawnCards) : '';
        const output = displayCards(drawnCards);
        (debugMode) ? console.log('output = displayCards(drawnCards): ' + output) : '';
        // Removed the automatic call to getInterpretation(drawnCards);
        lastDrawnCards = drawnCards; // Store the drawn cards

        // Check if readingDiv exists before accessing its style
        if (constants.readingDiv) {
            constants.readingDiv.style.display = 'block';
        } else {
            // readingDiv missing!
            console.error('Error: Reading div not found.');
            // Optionally, inform the user visually
            if (constants.outputDiv) {
                constants.outputDiv.innerHTML = '<p style="color: red;">Error: Interpretation area not found. Please check the page structure.</p>';
                constants.outputDiv.style.display = 'block'; // Ensure output div is visible
            }
        }
    });
}

if (constants.getInterpretationButton) {
    constants.getInterpretationButton.addEventListener('click', () => {
        if (lastDrawnCards.length > 0) {
            getInterpretation(lastDrawnCards); // Call getInterpretation with the stored cards
        } else {
            // Check if interpretationTextarea exists before setting its value
            if (constants.interpretationTextarea) {
                constants.interpretationTextarea.value = "Draw cards first to get an interpretation.";
            }
        }
    });
}

// Assuming shareButton is also obtained via getElementById or similar
// Add a check for shareButton
if (constants.shareButton) {
    constants.shareButton.addEventListener(
        'click', () => {
            // Add checks for constants properties
            if (constants && constants.shareUrlInput) {
                constants.shareUrlInput.value = window.location.href;
            }
            if (constants && constants.shareTooltip) {
                constants.shareTooltip.style.display = 'block';
            }
            // Check again before calling select as shareUrlInput might be null
            if (constants && constants.shareUrlInput) {
                constants.shareUrlInput.select();
            }
        }
    );
}