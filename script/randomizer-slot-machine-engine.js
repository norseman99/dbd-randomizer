class RandomizerSlotMachineEngine {

    constructor(engine, uiHandler) {
        this.killerPerksSlotMachines = [];
        this.survivorPerksSlotMachines = [];
        this.engine = engine;
        this.uiHandler = uiHandler;
    }

    init() {
        this._registerRoleSlotMachine();
        this._registerKillerPerksSlotMachines()
        this._registerSurvivorPerksSlotMachines();
        this._registerKillerSlotMachine();
        this._registerSurvivorSlotMachine();
    }

    pickRandomRole() {
        return ROLES[this.randomizeRole()];
    }

    randomizeRole() {
        this.roleSlotMachineResult = this.engine.pickRandomRole();

        return this.roleSlotMachineResult;
    }

    randomizeCharacter(role) {
        this.characterSlotMachineResult = this.engine.pickRandomCharacter(role);
    }

    randomizePerks(role) {
        this.perkSlotMachinesResult = this.engine.pickRandomPerks(role);
    }

    shuffleRole() {
        this._shuffleSlotMachine(this.roleSlotMachine, ROLE_SLOT_SHUFFLE_TIME);
    }

    shuffleCharacter(role) {
        switch(role) {
            case ROLES[0]:
                this._shuffleSlotMachine(this.killerSlotMachine, CHARACTER_SLOT_SHUFFLE_TIME);
                break;
            case ROLES[1]:
                this._shuffleSlotMachine(this.survivorSlotMachine, CHARACTER_SLOT_SHUFFLE_TIME);
                break;
        }
    }

    shufflePerks(role) {
        switch (role) {
            case ROLES[0]:
                this._shuffleSlotMachines(this.killerPerksSlotMachines, PERK_SLOT_SHUFFLE_TIME);
                break;
            case ROLES[1]:
                this._shuffleSlotMachines(this.survivorPerksSlotMachines, PERK_SLOT_SHUFFLE_TIME);
                break;
        }
    }

    _shuffleSlotMachines(perkSlotMachines, timeout) {
        perkSlotMachines.forEach(function (slotMachine) {
            slotMachine.shuffle(9999999);
        });

        setTimeout(function () {
            perkSlotMachines.forEach(function (slotMachine) {
                slotMachine.stop();
            });
        }, timeout + SLOT_MACHINE_DELAY)
    }

    _shuffleSlotMachine(slotMachine, timeout) {
        slotMachine.shuffle(9999999);

        setTimeout(function () {
            slotMachine.stop();
        }, timeout + SLOT_MACHINE_DELAY);
    }

    _registerRoleSlotMachine(){
        this.roleSlotMachine = this._registerSlotMachine('#role', 1, 'role', 0);
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
            delay: SLOT_MACHINE_DELAY,
            randomize: function () {
                return self._getRandomizeResult(type, index);
            }
        });
    }

    _getRandomizeResult(type, index) {
        switch(type) {
            case 'role':
                return this.roleSlotMachineResult;
            case 'perk':
                return this.perkSlotMachinesResult[index];
            case 'killer':
            case 'survivor':
                return this.characterSlotMachineResult;
        }
    }

    randomize() {
        let self = this;
        let role = this.pickRandomRole();
        this.shuffleRole();

        setTimeout(function () {
            self.randomizeForRole(role);
        }, 2000)
    }

    randomizeForRole(role) {
        let self = this;

        setTimeout(function () {
            self.uiHandler.updateUI(role);

            RandomizerUiGenerator.generateAllElements();
            self.init(); // TODO temporary

            setTimeout(function () {
                self.randomizeCharacter(role);
                self.shuffleCharacter(role);

                setTimeout(function () {
                    self.randomizePerks(role);
                    self.shufflePerks(role);

                    setTimeout(function () {
                        self.uiHandler.enableButtons();
                    }, PERK_SLOT_SHUFFLE_TIME + 500);

                }, CHARACTER_SLOT_SHUFFLE_TIME);

            }, 1000);

        }, ROLE_SLOT_SHUFFLE_TIME);
    }
}