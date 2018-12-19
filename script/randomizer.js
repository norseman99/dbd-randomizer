let randomizer = new Engine();
let uiHandler = new RandomizerUiHandler();
let slotMachineEngine = new RandomizerSlotMachineEngine(randomizer, uiHandler);
let uiGenerator = new RandomizerUiGenerator();

function init() {
    let role = randomizer.pickRandomRole();

    uiHandler.updateUI(role);

    uiGenerator.init();
    uiHandler.init(slotMachineEngine);
    slotMachineEngine.init();
}

$(function() {
    init();
});