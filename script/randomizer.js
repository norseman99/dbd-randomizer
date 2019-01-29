let randomizer = new Engine();
let uiTranslator = new RandomizerUiTranslator();
let uiGenerator = new RandomizerUiGenerator(uiTranslator);
let uiHandler = new RandomizerUiHandler(uiTranslator);
let slotMachineEngine = new RandomizerSlotMachineEngine(randomizer, uiHandler, uiGenerator);

function init() {
    let defaultRole = ROLES[1];
    let defaultCharacter = SURVIVORS[0];
    uiGenerator.generateAllElements(defaultRole);
    uiHandler.init(defaultRole, slotMachineEngine);
    slotMachineEngine.init(defaultRole, defaultCharacter);
}

$(function() {
    init();
});