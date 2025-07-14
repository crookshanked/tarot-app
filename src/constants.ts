export const constants = {
    cardDirectory : "assets/images/cards/" as String | null,
    drawCardsButton : document.getElementById('draw-cards') as HTMLButtonElement | null,
    readingDiv : document.getElementById('reading') as HTMLDivElement | null,
    outputDiv : document.getElementById('output-div') as HTMLDivElement | null,
    cardsDiv : document.getElementById('cards') as HTMLDivElement | null,
    
    getInterpretationButton : document.getElementById('get-interpretation-button') as HTMLButtonElement | null,
    interpretationTextarea : document.getElementById('interpretation') as HTMLTextAreaElement | null,
    layoutElement : document.getElementById('layout') as HTMLInputElement | HTMLSelectElement | null, // Assert type and allow null

    downloadLink : document.getElementById('download') as HTMLLinkElement | null,
    shareButton : document.getElementById('share-button') as HTMLButtonElement | null,
    shareTooltip : document.getElementById('share-tooltip') as HTMLElement | null,
    shareUrlInput : document.getElementById('share-url') as HTMLInputElement | null,
   
    apiKeyInput : document.getElementById('api-key') as HTMLInputElement | null,
    modelSelect : document.getElementById('model-select') as HTMLSelectElement | null,
    providerSelect : document.getElementById('provider-select') as HTMLSelectElement | null,
} as const;

