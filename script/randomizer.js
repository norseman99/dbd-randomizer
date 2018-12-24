let randomizer = new Engine();
let uiTranslator = new RandomizerUiTranslator();
let uiHandler = new RandomizerUiHandler(uiTranslator);
let slotMachineEngine = new RandomizerSlotMachineEngine(randomizer, uiHandler);

function init() {
    RandomizerUiGenerator.generateAllElements();
    uiHandler.init(slotMachineEngine);
    slotMachineEngine.init();
}

$(function() {
    init();
});