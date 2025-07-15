"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callGeminiAPI = callGeminiAPI;
exports.getCardMeaning = getCardMeaning;
exports.getInterpretation = getInterpretation;
// import { debugMode } from './debug.ts'
const constants_ts_1 = require("./constants.ts");
function callGeminiAPI(prompt, apiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const API_KEY = apiKey;
        // Assert types for select elements to access the .value property
        const MODEL_NAME = (_a = constants_ts_1.constants.modelSelect) === null || _a === void 0 ? void 0 : _a.value; // Get model from select input
        const API_BASE_URL = (_b = constants_ts_1.constants.providerSelect) === null || _b === void 0 ? void 0 : _b.value; // Get base input URL from select input
        if (!MODEL_NAME || !API_BASE_URL) {
            console.error('Error: Could not get model name or API base URL from constants.');
            return null; // Or throw an error, depending on desired behavior
        }
        const url = `${API_BASE_URL}${MODEL_NAME}:generateContent?key=${API_KEY}`;
        //TODO: confirm any needed changes...
        const requestBody = {
            contents: [{
                    parts: [{
                            text: prompt
                        }]
                }]
        };
        try {
            const response = yield fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            if (!response.ok) {
                const errorData = yield response.json();
                throw new Error(`API error: ${response.status} - ${errorData.error.message}`);
            }
            const data = yield response.json();
            return data.candidates[0].content.parts[0].text;
        }
        catch (error) {
            console.error('Error calling Gemini API:', error);
            return null;
        }
    });
}
function getCardMeaning(cardName, isReversed, elementId) {
    return __awaiter(this, void 0, void 0, function* () {
        // **GEMINI API CALL for individual card meaning**
        const prompt = `What is the meaning of the ${cardName} tarot card${isReversed ? ' when reversed' : ''}?`;
        // Take the value of the constant apiKeyInput
        const apiKey = constants_ts_1.constants.apiKeyInput.value; // Assert type as HTMLInputElement
        const meaningTextarea = document.getElementById(elementId); // Assert type as HTMLTextAreaElement or null
        if (!apiKey) {
            if (meaningTextarea) {
                meaningTextarea.value = "Please enter your Gemini API Key.";
            }
            console.error("API Key is missing.");
            return;
        }
        // Check if the textarea element was found
        if (!meaningTextarea) {
            console.error(`Error: Textarea element with id "${elementId}" not found.`);
            return;
        }
        // Add loading indicator animation
        meaningTextarea.value = "Getting meaning"; // Initial loading message
        let loadingInterval = setInterval(() => {
            meaningTextarea.value += "."; // Append a period
        }, 1000); // Every 1000ms (1 second)
        // Call to the Gemini API using it and the value of the constant prompt.
        try {
            const responseText = yield callGeminiAPI(prompt, apiKey); // Await the promise directly
            clearInterval(loadingInterval); // Clear the interval after fetch is complete
            if (responseText) {
                // console.log("Gemini response:", responseText);
                meaningTextarea.value = responseText; // Update with actual meaning
            }
            else {
                meaningTextarea.value = "Error getting interpretation from Gemini. Please wait a minute and try again."; // Update with error message
                console.log("ResponseText: Error getting interpretation from Gemini.");
            }
        }
        catch (error) {
            console.error("Error calling Gemini API:", error);
            clearInterval(loadingInterval); // Clear the interval in case of error
            meaningTextarea.value = "Catch: Error getting interpretation from Gemini."; // Update with catch error message
        }
    });
}
function getInterpretation(cards) {
    return __awaiter(this, void 0, void 0, function* () {
        // **GEMINI API CALL for overall interpretation**
        const queryInput = document.getElementById('query'); // Assert type as HTMLInputElement or null
        const query = (queryInput === null || queryInput === void 0 ? void 0 : queryInput.value) || ''; // Safely access value with optional chaining, default to empty string
        const cardNames = cards.map(c => c.name + (c.reversed ? ' (Reversed)' : '')).join(', ');
        const prompt = `I did a tarot reading with the following cards: ${cardNames}. The query was "${query}". What is the interpretation of this reading?`;
        const apiKey = constants_ts_1.constants.apiKeyInput.value; // Assert type as HTMLInputElement
        const interpretationTextarea = document.getElementById('interpretation'); // Assert type as HTMLTextAreaElement or null
        if (!apiKey) {
            if (interpretationTextarea) {
                interpretationTextarea.value = "Please enter your Gemini API Key to get the overall interpretation.";
            }
            console.error("API Key is missing for overall interpretation.");
            return;
        }
        // Check if the textarea element was found
        if (!interpretationTextarea) {
            console.error('Error: Interpretation textarea element not found.');
            return;
        }
        // Add loading indicator animation
        interpretationTextarea.value = "Getting interpretation"; // Initial loading message
        let loadingInterval = setInterval(() => {
            interpretationTextarea.value += "."; // Append a period
        }, 1000); // Every 1000ms (1 second)
        try {
            const responseText = yield callGeminiAPI(prompt, apiKey); // Using the same placeholder API call for consistency
            clearInterval(loadingInterval); // Clear the interval after fetch is complete
            if (responseText) {
                interpretationTextarea.value = responseText; // Update with actual interpretation
            }
            else {
                interpretationTextarea.value = "Error getting overall interpretation from Gemini."; // Update with error message
                console.error("ResponseText: Error getting overall interpretation from Gemini.");
            }
        }
        catch (error) {
            console.error("Error calling Gemini API for interpretation:", error);
            clearInterval(loadingInterval); // Clear the interval in case of error
            interpretationTextarea.value = "Error getting overall interpretation from Gemini."; // Update with catch error message
        }
        // Prepare download link
        const readingText = `Query: ${query}\n\nCards Drawn:\n${cardNames}\n\nInterpretation:\n${interpretationTextarea.value}`;
        const blob = new Blob([readingText], { type: 'text/plain' });
        const downloadLink = constants_ts_1.constants.downloadLink; // Assert type as HTMLAnchorElement or null
        // Check if the download link element was found
        if (downloadLink) {
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = 'tarot_reading.txt';
        }
        else {
            console.error('Error: Download link element not found in constants.');
        }
    });
}
