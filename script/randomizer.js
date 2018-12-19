let randomizer = new Engine();
let slotMachineEngine = new RandomizerSlotMachineEngine(randomizer);
let uiHandler = new RandomizerUiHandler(slotMachineEngine);
let uiGenerator = new RandomizerUiGenerator();

function init() {
    let role = randomizer.pickRandomRole();

    uiHandler.updateTitle(role);

    uiGenerator.init();
    uiHandler.init();
    slotMachineEngine.init();
}

$(function() {
    init();
});