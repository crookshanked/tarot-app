"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugMode = void 0;
exports.setDebug = setDebug;
exports.debugMode = false;
function setDebug(debugFlag) {
    exports.debugMode = debugFlag;
}
// USAGE: (debugMode) ? console.log() : '';
