import $ from 'jquery';
import Engine from './randomizer-engine.js';
import RandomizerUiTranslator from './randomizer-ui-translator.js';
import RandomizerSoundManager from './randomizer-sound-manager.js';
import RandomizerUiGenerator from './randomizer-ui-generator.js';
import RandomizerUiHandler from './randomizer-ui-handler.js';
import RandomizerSlotMachineEngine from './randomizer-slot-machine-engine.js';

import 'jquery-slotmachine/dist/jquery.slotmachine.min.css';

const DATA = require('./conf/data.json');
const ROLES = DATA.ROLES;
const SURVIVORS = DATA.SURVIVORS;

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