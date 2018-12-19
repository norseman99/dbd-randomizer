class RandomizerSlotMachineEngine {

    constructor(engine, uiHandler) {
        this.perkSlotMachines = [];
        this.engine = engine;
        this.uiHandler = uiHandler;
    }

    init() {
        this.perkSlotMachines.push(this._registerSlotMachine('#perk-slot1', 1));
        this.perkSlotMachines.push(this._registerSlotMachine('#perk-slot2', 2));
        this.perkSlotMachines.push(this._registerSlotMachine('#perk-slot3', 3));
        this.perkSlotMachines.push(this._registerSlotMachine('#perk-slot4', 4));
    }

    shufflePortrait(role) {
        switch(role) {
            case ROLES[0]:
                this.killerSlotMachine = this._registerSlotMachine('#killers', 0);

                this._shufflePortraitMachine(this.killerSlotMachine);
                break;
            case ROLES[1]:
                this.survivorSlotMachine = this._registerSlotMachine('#survivors', 0);

                this._shufflePortraitMachine(this.survivorSlotMachine);
                break;
        }
    }

    shufflePerks() {
        let self = this;

        this.perkSlotMachines.forEach(function (slotMachine) {
            slotMachine.shuffle(9999999);
        });

        setTimeout(function () {
            self.perkSlotMachines.forEach(function (slotMachine) {
                slotMachine.stop();
            });
        }, 1000)
    }

    _shufflePortraitMachine(slotMachine) {
        slotMachine.shuffle(9999999);

        setTimeout(function () {
            slotMachine.stop();
        }, 1000);
    }

    _registerSlotMachine(selector, active) {
        return new SlotMachine(document.querySelector(selector), {
            active: active,
            delay: 500,
            spins: 5
        });
    }

    randomize() {
        uiHandler.updateTitle("The wheel is turning...")

        let self = this;
        let role = this.engine.pickRandomRole();

        setTimeout(function () {
            uiHandler.updateUI(role);

            setTimeout(function () {
                self.shufflePortrait(role);

                setTimeout(function () {
                    self.shufflePerks();
                    uiHandler.enableButtons();
                }, 1000);

            }, 1000);

        }, 1000);
    }
}