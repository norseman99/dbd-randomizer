let randomizer = new Engine();
let slotMachineEngine = new RandomizerSlotMachineEngine(randomizer);
let uiHandler = new RandomizerUiHandler(slotMachineEngine);
let uiPerkGenerator = new RandomizerUiPerkGenerator();

function init() {
    let role = randomizer.pickRandomRole();

    uiHandler.updateTitle(role);
    uiHandler.updateCharacterProtrait(role);

    uiPerkGenerator.init();
    uiHandler.init();
    slotMachineEngine.init();
}

$(function() {
    init();
});