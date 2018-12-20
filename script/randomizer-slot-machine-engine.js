class RandomizerSlotMachineEngine {

    constructor(engine, uiHandler) {
        this.perkSlotMachines = [];
        this.engine = engine;
        this.uiHandler = uiHandler;
    }

    init() {
        this.perkSlotMachines.push(this._registerSlotMachine('#perk-slot1', 1, 'perk', 0));
        this.perkSlotMachines.push(this._registerSlotMachine('#perk-slot2', 2, 'perk', 1));
        this.perkSlotMachines.push(this._registerSlotMachine('#perk-slot3', 3, 'perk', 2));
        this.perkSlotMachines.push(this._registerSlotMachine('#perk-slot4', 4, 'perk', 3));
    }

    shufflePortrait(role) {
        this._destroySlotMachines();

        switch(role) {
            case ROLES[0]:
                this.killerSlotMachine = this._registerSlotMachine('#killers', 0, 'killer', 0);

                this._shufflePortraitMachine(this.killerSlotMachine);
                break;
            case ROLES[1]:
                this.survivorSlotMachine = this._registerSlotMachine('#survivors', 0, 'survivor', 0);

                this._shufflePortraitMachine(this.survivorSlotMachine);
                break;
        }
    }

    randomizePerks(role) {
        this.perkSlotMachinesResult = this.engine.pickRandomPerks(role);
    }

    randomizeCharacter(role) {
        this.characterSlotMachineResult = this.engine.pickRandomCharacter(role);
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

    _registerSlotMachine(selector, active, type, index) {
        let self = this;

        return new SlotMachine(document.querySelector(selector), {
            active: active,
            delay: 500,
            spins: 5,
            randomize: function () {
                return self._getRandomizeResult(type, index);
            }
        });
    }

    _getRandomizeResult(type, index) {
        switch(type) {
            case 'perk':
                console.log(this.perkSlotMachinesResult);
                return this.perkSlotMachinesResult[index];
            case 'killer':
            case 'survivor':
                console.log(this.characterSlotMachineResult);
                return this.characterSlotMachineResult;
        }
    }

    _destroySlotMachines() {
        if (this.killerSlotMachine != undefined) {
            console.log(this.killerSlotMachine);
            this.killerSlotMachine.destroy();
        }

        if (this.survivorSlotMachine != undefined) {
            console.log(this.survivorSlotMachine);
            this.survivorSlotMachine.destroy();
        }
    }

    randomize() {
        this.uiHandler.updateTitle("The wheel is turning...")

        let self = this;
        let role = this.engine.pickRandomRole();

        setTimeout(function () {
            self.uiHandler.updateUI(role);

            setTimeout(function () {
                self.randomizeCharacter(role);
                self.shufflePortrait(role);

                setTimeout(function () {
                    self.randomizePerks(role);
                    self.shufflePerks();
                    self.uiHandler.enableButtons();
                    //self._destroySlotMachines();
                }, 1000);

            }, 1000);

        }, 1000);
    }
}