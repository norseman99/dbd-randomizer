const SURVIVORS = [ "dwight",  "meg", "claudette", "jake", "nea", "bill", "david", "laurie", "ace", "feng", "quentin",
    "tapp", "kate", "francis" ];

const KILLERS = [ "clown",  "doctor", "freddy", "hag", "hillbilly", "huntress", "leatherface", "myers", "nurse", "pig", "spirit",
    "trapper", "wraith" ];

const ROLES = [ "killer", "survivor" ];

class UrlBuilder {

    static buildCharacterPortraitPath(role, character) {
        return "url('img/portraits/" + role + "/" + character + ".png')"
    }

    static buildCssPerkPath(role, perk) {
        return "url(" + this.buildPerkPath(role, perk) + ")";
    }

    static buildPerkPath(role, perk) {
        return "img/perks/" + role + "/" + perk + ".png";
    }
}

class Engine {

    pickRandomRole() {
        return this._pickRandom(ROLES);
    }

    pickRandomCharacter(role) {
        switch(role) {
            case ROLES[0]:
                return this._pickRandom(KILLERS)
            case ROLES[1]:
                return this._pickRandom(SURVIVORS)
        }
    }

    pickRandomPerks(role){
        switch(role) {
            case ROLES[0]:
                return this._getRandomNumbersBetween(4, 1, 49);
            case ROLES[1]:
                return this._getRandomNumbersBetween(4, 1, 58);
        }
    }

    _pickRandom(array) {
        return array[this._getRandomNumberBetween(0, array.length)];
    }

    _getRandomNumbersBetween(quantity, min, max) {
        let result = [];

        while (result.length < quantity) {
            let number = this._getRandomNumberBetween(min, max);

            if(!result.includes(number)) {
                result.push(number);
            }
        }

        return result;
    }

    _getRandomNumberBetween(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}

class SlotMachineEngine {

    constructor() {
        this.slotMachines = [];
    }

    init() {
        let _self = this;

        this.slotMachines.push(this._registerSlotMachine('#perk-slot1', 1));
        this.slotMachines.push(this._registerSlotMachine('#perk-slot2', 2));
        this.slotMachines.push(this._registerSlotMachine('#perk-slot3', 3));
        this.slotMachines.push(this._registerSlotMachine('#perk-slot4', 4));

        $('#randomize').on("click", function () {
            _self.slotMachines.forEach(function (slotMachine) {
                slotMachine.shuffle();
            });
        });
    }

    _registerSlotMachine(selector, active) {
        return new SlotMachine(document.querySelector(selector), {
            active: active,
            delay: 500,
            spins: 5
        });
    }
}

class UIHandler {

    updateTitle(role) {
        $("#title").html(role);
    }

    updateCharacterProtrait(role) {
        $('#portrait').css('backgroundImage', UrlBuilder.buildCharacterPortraitPath(role, engine.pickRandomCharacter(role)));
    }

    registerPerkLock() {
        $('.perk').on('click',function () {
            let lockElement = this.children[0];
            lockElement.style.visibility = (lockElement.style.visibility == 'hidden' ? 'visible' : 'hidden');
        });
    }
}

class UIPerkGenerator {

    init() {
        let _self = this;

        $('.perk-slot').each(function () {
            for (let i = 1; i <= 58; i++) {
                $(this).append(_self._createDivElement(_self._createImgElement(i)));
            }
        })
    }

    _createImgElement(n) {
        let img = document.createElement('img');

        $(img).addClass('perk-img').attr('src', UrlBuilder.buildPerkPath(ROLES[1], n))
            .attr('height', 225).attr('width', 225);

        return img;
    }

    _createDivElement(img) {
        let div = document.createElement('div');
        $(div).addClass('perk-div').append(img);
        return div;
    }
}

let engine = new Engine();
let uiHandler = new UIHandler();
let uiPerkGenerator = new UIPerkGenerator();
let slotMachineEngine = new SlotMachineEngine();

function init() {
    let role = engine.pickRandomRole();

    uiHandler.updateTitle(role);
    uiHandler.updateCharacterProtrait(role);
}

$(function() {
    uiPerkGenerator.init();
    slotMachineEngine.init();

    init();
});