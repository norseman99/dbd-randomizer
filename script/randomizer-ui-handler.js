class RandomizerUiHandler {

    constructor(engine, slotMachineEngine) {
        this.slotMachineEngine = slotMachineEngine;
    }

    init() {
        this._registerRandomizeEvent();
    }

    randomize() {
        this.updateTitle("The wheel is turning...")

        let result = slotMachineEngine.randomize();

        let self = this;
        setTimeout(function () {
            self.updateTitle(result.role);
        }, 1000);

    }

    updateTitle(message) {
        $("#title").html(message);
    }

    updateCharacterProtrait(role) {
        $('#portrait').css('backgroundImage', RandomizerUrlBuilder.buildCharacterPortraitPath(role, randomizer.pickRandomCharacter(role)));
    }

    _registerPerkLock() {
        $('.perk').on('click',function () {
            let lockElement = this.children[0];
            lockElement.style.visibility = (lockElement.style.visibility == 'hidden' ? 'visible' : 'hidden');
        });
    }

    _registerRandomizeEvent() {
        let self = this;

        $('#randomize').on("click", function () {
            self.randomize();
        });
    }
}