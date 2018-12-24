let randomizer = new Engine();
let uiHandler = new RandomizerUiHandler();
let slotMachineEngine = new RandomizerSlotMachineEngine(randomizer, uiHandler);

function init() {
    RandomizerUiGenerator.generateAllElements();
    uiHandler.init(slotMachineEngine);
    slotMachineEngine.init();
}

$(function() {
    init();
});