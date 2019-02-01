let randomizer = new Engine();
let uiTranslator = new RandomizerUiTranslator();
let soundManager = new RandomizerSoundManager();
let uiGenerator = new RandomizerUiGenerator(uiTranslator);
let uiHandler = new RandomizerUiHandler(uiTranslator);
let slotMachineEngine = new RandomizerSlotMachineEngine(randomizer, uiHandler, uiGenerator, soundManager);

function init() {
    let defaultRole = ROLES[1];
    let defaultCharacter = SURVIVORS[0];
    soundManager.checkEnabledStatus();
    uiGenerator.generateAllElements(defaultRole);
    uiHandler.init(defaultRole, slotMachineEngine);
    slotMachineEngine.init(defaultRole, defaultCharacter);
}

$(function() {
    init();
});