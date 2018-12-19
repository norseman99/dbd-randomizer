class RandomizerUiHandler {

    constructor(slotMachineEngine) {
        this.slotMachineEngine = slotMachineEngine;
    }

    init() {
        this._registerRandomizeEvent();
    }

    updateTitle(role) {
        $("#title").html(role);
    }

    updateCharacterProtrait(role) {
        $('#portrait').css('backgroundImage', RandomizerUrlBuilder.buildCharacterPortraitPath(role, randomizer.pickRandomCharacter(role)));
    }

    registerPerkLock() {
        $('.perk').on('click',function () {
            let lockElement = this.children[0];
            lockElement.style.visibility = (lockElement.style.visibility == 'hidden' ? 'visible' : 'hidden');
        });
    }

    _registerRandomizeEvent() {
        $('#randomize').on("click", function () {
            slotMachineEngine.shuffle();
        });
    }
}