export let debugMode = false;

export function setDebug(debugFlag: boolean) {
    debugMode = debugFlag;
}

// USAGE: (debugMode) ? console.log() : '';
