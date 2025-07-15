import './style.css';
import { debugMode, setDebug } from './debug.ts';
import { cardData } from './cardData.ts';
import { constants } from './constants.ts';
import './drawCards.ts';
import './buttons.ts';
import './geminiAPI.ts';
import './displayCards.ts';
setDebug(false);
if (debugMode) {
  console.log(constants);
  console.log('cardData: ' + cardData);
  // console.log(cardData);
}
document.querySelector('#app').innerHTML = `
<h1>Tarot Card Reading</h1>
<div>
  <label for="api-key">Gemini API Key:</label>
  <input type="text" required value="" placeholder="*****************" id="api-key">
</div>

<div>
  <label for="model-select">Gemini Model:</label>
  <select id="model-select">
    <option value="gemini-2.0-flash" selected>gemini-2.0-flash</option>
    <option value="gemini-1.5-flash-latest">gemini-1.5-flash-latest</option>
    <option value="gemini-1.0-pro">gemini-1.0-pro</option>
    <option value="gemini-1.5-pro-latest">gemini-1.5-pro-latest</option>
  </select>
</div>

<div>
  <label for="provider-select">API Provider:</label>
  <select id="provider-select">
    <option value="https://generativelanguage.googleapis.com/v1beta/models/" selected>Google</option>
    <!-- Add more providers here later if needed -->
  </select>
</div>

<div>
  <label for="deck-type">Deck Type:</label>
  <select id="deck-type">
    <option value="rider-waite">Rider-Waite</option>
  </select>
</div>

<div>
  <label for="query">Query (optional):</label>
  <input type="text" id="query">
</div>

<div>
  <label for="layout">Layout:</label>
  <select id="layout">
    <option value="1">Single Card</option>
    <option value="3">Three Card (Past, Present, Future)</option>
  </select>
</div>

<button id="draw-cards">Draw Cards</button>

<div id="output-div"></div>
<div id="reading" style="display:none;">
  <div id="cards" class="card-container"></div>
  <h2>Interpretation</h2>
  <button id="get-interpretation-button">Get Interpretation</button>
  <textarea id="interpretation" readonly></textarea>
  <a id="download" href="#">Download Reading</a>
  <div id="share">
    <button id="share-button">Share</button>
    <div id="share-tooltip" style="display:none;">
      <input type="text" id="share-url" readonly>
      <br>
      <a href="#" id="facebook-share">Facebook</a>
      <a href="#" id="twitter-share">X</a>
      <a href="#" id="bluesky-share">Bluesky</a>
      <a href="#" id="instagram-share">Instagram</a>
      <a href="#" id="reddit-share">Reddit</a>
      <a href="#" id="sms-share">Text Message</a>
    </div>
  </div>
</div>
`;
