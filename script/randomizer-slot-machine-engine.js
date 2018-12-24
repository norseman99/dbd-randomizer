class RandomizerSlotMachineEngine {

    constructor(engine, uiHandler) {
        this.killerPerksSlotMachines = [];
        this.survivorPerksSlotMachines = [];
        this.engine = engine;
        this.uiHandler = uiHandler;
    }

    init() {
        this._registerRoleSlotMachine();

        let self = this;
        ROLES.forEach(function (role) {
            self.registerSlotMachinesForRole(role);
        })
    }

    randomizeRole() {
        let result = this.engine.pickRandomRole();
        this.roleSlotMachineResult = result.id;
        return result.role;
    }

    randomizeCharacter(role) {
        let result = this.engine.pickRandomCharacter(role);
        this.characterSlotMachineResult = result.id;
        return result.character;
    }

    randomizePerks(role) {
        let result = this.engine.pickRandomPerks(role)
        this.perkSlotMachinesResult = result.ids;
        return result.perks;
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

    registerSlotMachinesForRole(role) {
        switch (role) {
            case ROLES[0]:
                this._registerKillerSlotMachine();
                this._registerKillerPerksSlotMachines();
                break;
            case ROLES[1]:
                this._registerSurvivorSlotMachine();
                this._registerSurvivorPerksSlotMachines();
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
        this.killerPerksSlotMachines.push(this._registerSlotMachine('#killer-perk-slot1 .perk-slot-image', 1, 'perk', 0));
        this.killerPerksSlotMachines.push(this._registerSlotMachine('#killer-perk-slot2 .perk-slot-image', 2, 'perk', 1));
        this.killerPerksSlotMachines.push(this._registerSlotMachine('#killer-perk-slot3 .perk-slot-image', 3, 'perk', 2));
        this.killerPerksSlotMachines.push(this._registerSlotMachine('#killer-perk-slot4 .perk-slot-image', 4, 'perk', 3));
    }

    _registerSurvivorPerksSlotMachines() {
        this.survivorPerksSlotMachines = [];
        this.survivorPerksSlotMachines.push(this._registerSlotMachine('#survivor-perk-slot1 .perk-slot-image', 1, 'perk', 0));
        this.survivorPerksSlotMachines.push(this._registerSlotMachine('#survivor-perk-slot2 .perk-slot-image', 2, 'perk', 1));
        this.survivorPerksSlotMachines.push(this._registerSlotMachine('#survivor-perk-slot3 .perk-slot-image', 3, 'perk', 2));
        this.survivorPerksSlotMachines.push(this._registerSlotMachine('#survivor-perk-slot4 .perk-slot-image', 4, 'perk', 3));
    }

    _registerKillerSlotMachine() {
        this.killerSlotMachine = this._registerSlotMachine('#killer .portrait-image', 0, 'killer', 0);
    }

    _registerSurvivorSlotMachine() {
        this.survivorSlotMachine = this._registerSlotMachine('#survivor .portrait-image', 0, 'survivor', 0);
    }

    _registerSlotMachine(selector, active, type, index) {
        let self = this;
        let options = {
            active: active,
            delay: SLOT_MACHINE_DELAY,
            randomize: function () {
                return self._getRandomizeResult(type, index);
            }
        };

        if (type === 'perk' && index === 3) {
            options.onComplete = function () {
                self.uiHandler.enableButtons();
            }
        }

        return new SlotMachine(document.querySelector(selector), options);
    }

    _getRandomizeResult(type, index) {
        switch(type) {
            case 'role':
                console.log(this.roleSlotMachineResult);
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
        this.uiHandler.showResultsOverlay();

        let role = this.randomizeRole();
        this.shuffleRole();

        self.randomizeForRole(role,ROLE_SLOT_SHUFFLE_TIME + SLOT_MACHINE_DELAY);
    }

    randomizeForRole(role, delay) {
        let self = this;

        setTimeout(function () {
            self.uiHandler.updateRoleResult(role)
            self.uiHandler.updateUI(role);

            RandomizerUiGenerator.generateAllElements();
            self.registerSlotMachinesForRole(role);

            setTimeout(function () {
                self.uiHandler.hideResultsOverlay();

                setTimeout(function () {
                    let character = self.randomizeCharacter(role);
                    self.shuffleCharacter(role);

                    setTimeout(function () {
                        self.uiHandler.updateCharacterName(role, character)
                        let perks = self.randomizePerks(role);
                        self.shufflePerks(role);

                        setTimeout(function () {
                            self.uiHandler.updatePerkNames(role, perks);
                        }, PERK_SLOT_SHUFFLE_TIME + (SLOT_MACHINE_DELAY * 3));

                    }, CHARACTER_SLOT_SHUFFLE_TIME + (SLOT_MACHINE_DELAY * 3));

                }, 1500) // wait time to read results

            }, 2000); // setup time

        }, delay);
    }
}