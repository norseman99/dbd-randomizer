class RandomizerSlotMachineEngine {

    constructor(engine, uiHandler) {
        this.killerPerksSlotMachines = [];
        this.survivorPerksSlotMachines = [];
        this.engine = engine;
        this.uiHandler = uiHandler;
    }

    init() {
        this._registerKillerPerksSlotMachines()
        this._registerSurvivorPerksSlotMachines();
        this._registerKillerSlotMachine();
        this._registerSurvivorSlotMachine();
    }

    shufflePortrait(role) {
        switch(role) {
            case ROLES[0]:
                this._shufflePortraitMachine(this.killerSlotMachine);
                break;
            case ROLES[1]:
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

    shufflePerks(role) {
        switch (role) {
            case ROLES[0]:
                this._shufflePerks(this.killerPerksSlotMachines);
                break;
            case ROLES[1]:
                this._shufflePerks(this.survivorPerksSlotMachines);
                break;
        }
    }

    _shufflePerks(perkSlotMachines) {
        perkSlotMachines.forEach(function (slotMachine) {
            slotMachine.shuffle(9999999);
        });

        setTimeout(function () {
            perkSlotMachines.forEach(function (slotMachine) {
                slotMachine.stop();
            });
        }, PERK_SLOT_SHUFFLE_TIME)
    }

    _shufflePortraitMachine(slotMachine) {
        slotMachine.shuffle(9999999);

        setTimeout(function () {
            slotMachine.stop();
        }, CHARACTER_SLOT_SHUFFLE_TIME);
    }

    _registerKillerPerksSlotMachines() {
        this.killerPerksSlotMachines = [];
        this.killerPerksSlotMachines.push(this._registerSlotMachine('#killer-perk-slot1', 1, 'perk', 0));
        this.killerPerksSlotMachines.push(this._registerSlotMachine('#killer-perk-slot2', 2, 'perk', 1));
        this.killerPerksSlotMachines.push(this._registerSlotMachine('#killer-perk-slot3', 3, 'perk', 2));
        this.killerPerksSlotMachines.push(this._registerSlotMachine('#killer-perk-slot4', 4, 'perk', 3));
    }

    _registerSurvivorPerksSlotMachines() {
        this.survivorPerksSlotMachines = [];
        this.survivorPerksSlotMachines.push(this._registerSlotMachine('#survivor-perk-slot1', 1, 'perk', 0));
        this.survivorPerksSlotMachines.push(this._registerSlotMachine('#survivor-perk-slot2', 2, 'perk', 1));
        this.survivorPerksSlotMachines.push(this._registerSlotMachine('#survivor-perk-slot3', 3, 'perk', 2));
        this.survivorPerksSlotMachines.push(this._registerSlotMachine('#survivor-perk-slot4', 4, 'perk', 3));
    }

    _registerKillerSlotMachine() {
        this.killerSlotMachine = this._registerSlotMachine('#killer .portrait', 0, 'killer', 0);
    }

    _registerSurvivorSlotMachine() {
        this.survivorSlotMachine = this._registerSlotMachine('#survivor .portrait', 0, 'survivor', 0);
    }

    _registerSlotMachine(selector, active, type, index) {
        let self = this;

        return new SlotMachine(document.querySelector(selector), {
            active: active,
            delay: 500,
            randomize: function () {
                return self._getRandomizeResult(type, index);
            }
        });
    }

    _getRandomizeResult(type, index) {
        switch(type) {
            case 'perk':
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
            this.survivorSlotMachine.destroy();
        }
    }

    randomize() {
        this.randomizeRole(this.engine.pickRandomRole());
    }

    randomizeRole(role) {
        let self = this;

        setTimeout(function () {
            self.uiHandler.updateUI(role);

            RandomizerUiGenerator.generateAllElements();
            self.init();

            setTimeout(function () {
                self.randomizeCharacter(role);
                self.shufflePortrait(role);

                setTimeout(function () {
                    self.randomizePerks(role);
                    self.shufflePerks(role);

                    setTimeout(function () {
                        self.uiHandler.enableButtons();
                    }, PERK_SLOT_SHUFFLE_TIME + 500);

                }, CHARACTER_SLOT_SHUFFLE_TIME);

            }, ROLE_SLOT_SHUFFLE_TIME );

        }, 1000);
    }
}