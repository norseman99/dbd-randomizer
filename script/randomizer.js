let randomizer = new Engine();
let uiHandler = new RandomizerUiHandler();
let slotMachineEngine = new RandomizerSlotMachineEngine(randomizer, uiHandler);

function init() {
    let role = randomizer.pickRandomRole();

    uiHandler.updateUI(role);

    RandomizerUiGenerator.generateAllElements();
    uiHandler.init(slotMachineEngine);
    slotMachineEngine.init();
}

$(function() {
    init();
});