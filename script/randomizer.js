let randomizer = new Engine();
let uiTranslator = new RandomizerUiTranslator();
let uiHandler = new RandomizerUiHandler(uiTranslator);
let slotMachineEngine = new RandomizerSlotMachineEngine(randomizer, uiHandler);

function init() {
    let defaultRole = ROLES[1];
    let defaultCharacter = SURVIVORS[0];
    RandomizerUiGenerator.generateAllElements(defaultRole);
    uiHandler.init(defaultRole, slotMachineEngine);
    slotMachineEngine.init(defaultRole, defaultCharacter);
}

$(function() {
    init();
});