class RandomizerSlotMachineEngine {

    constructor(engine, uiHandler) {
        this.killerPerksSlotMachines = [];
        this.survivorPerksSlotMachines = [];
        this.controlsOnCharacterComplete = false;
        this.engine = engine;
        this.uiHandler = uiHandler;
    }

    init(defaultRole, defaultCharacter) {
        this.setActiveRole(defaultRole);
        this.setActiveCharacter(defaultCharacter);
        this._registerRoleSlotMachine();
        this.registerSlotMachinesForRole(defaultRole);
    }

    _randomizeRole() {
        this.roleSlotMachineResult = this.engine.pickRandomRole();
    }

    _randomizeAndGetActiveRole() {
        this._randomizeRole();
        return this.getActiveRole();
    }

    getActiveRole() {
        return this.roleSlotMachineResult.role;
    }

    setActiveRole(role) {
        this.roleSlotMachineResult = { id: ROLES.indexOf(role), role: role};
    }

    getActiveCharacter() {
        return this.characterSlotMachineResult.character;
    }

    setActiveCharacter(character) {
        let id = Math.max(KILLERS.indexOf(character), SURVIVORS.indexOf(character));
        this.characterSlotMachineResult = { id: id, character: character }
    }

    _randomizeCharacter(role) {
        this.characterSlotMachineResult = this.engine.pickRandomCharacter(role);
    }

    _randomizeAndGetActiveCharacter(role) {
        this._randomizeCharacter(role);
        return this.getActiveCharacter();
    }

    _randomizePerks(role) {
        let result = this.engine.pickRandomPerks(role)
        this.perkSlotMachinesResult = result.ids;
        return result.perks;
    }

    _randomizeAddons(role, character) {
        let result = this.engine.pickRandomAddons(character);
        this.characterAddonSlotMachineResult = result.ids;
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

    shuffleAddons(role) {
        switch (role) {
            case ROLES[0]:
                this._shuffleSlotMachines(this.killerAddonsSlotMachines, ADDONS_SLOT_SHUFFLE_TIME);
                break;
            case ROLES[1]:
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

    _toggleEnableControlsOnCharacterComplete(value) {
        this.controlsOnCharacterComplete = value;
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
        this.killerSlotMachine = this._registerSlotMachine('#killer .portrait-image', 0, 'character', 0);
    }

    _registerSurvivorSlotMachine() {
        this.survivorSlotMachine = this._registerSlotMachine('#survivor .portrait-image', 0, 'character', 0);
    }

    _registerKillerAddonsSlotMachine() {
        this.killerAddonsSlotMachines = [];
        this.killerAddonsSlotMachines.push(this._registerSlotMachine('#power-addon1', 1, 'addon', 0));
        this.killerAddonsSlotMachines.push(this._registerSlotMachine('#power-addon2', 2, 'addon', 1));
    }

    _registerSlotMachine(selector, active, type, index) {
        let self = this;
        let options = {
            active: active,
            delay: SLOT_MACHINE_DELAY,
            randomize: function () {
                return self._getRandomizeResult(type, index);
            },
            onComplete: function () {
                self._triggerSlotMachineComplete(type, index);
            }
        };

        return new SlotMachine(document.querySelector(selector), options);
    }

    _triggerSlotMachineComplete(type, index) {
        if (this.controlsOnCharacterComplete && type === 'character') {
            this.controlsOnCharacterComplete = false;
            this.uiHandler.enableControls();
        } else if ((type === 'perk' && index === 3) || (type == 'addon' && index == 1)) {
            this.uiHandler.enableControls();
        }
    }

    _getRandomizeResult(type, index) {
        switch(type) {
            case 'role':
                return this.roleSlotMachineResult.id;
            case 'perk':
                return this.perkSlotMachinesResult[index];
            case 'character':
                return this.characterSlotMachineResult.id;
            case 'addon':
                return this.characterAddonSlotMachineResult[index];
        }
    }

    randomize(role, withPerks) {
        this.uiHandler.showResultsOverlay();
        this.uiHandler.togglePerksOverlay(true);

        if (role === undefined) {
            role = this._randomizeAndGetActiveRole();
            this.shuffleRole();
        } else {
            this.setActiveRole(role);
        }

        let self = this;
        setTimeout(function () {
            self.uiHandler.updateRoleResult(role)
            self.uiHandler.updateUI(role);

            RandomizerUiGenerator.generateAllElements(role);
            self.registerSlotMachinesForRole(role);

            setTimeout(function () {
                self.uiHandler.hideResultsOverlay();

                setTimeout(function () {
                    let character = self._randomizeAndGetActiveCharacter(role);
                    self._toggleEnableControlsOnCharacterComplete(!withPerks);
                    self.shuffleCharacter(role);

                    setTimeout(function () {
                        self.uiHandler.updateCharacterName(role, character);

                        if (withPerks) {
                            self.randomizePerks();
                        }

                    }, CHARACTER_SLOT_SHUFFLE_TIME + (SLOT_MACHINE_DELAY * 3));

                }, DELAY_BEFORE_CHARACTER_ROLE); // wait time to read results

            }, SHOW_ROLE_RESULT_TIME); // setup time

        }, ROLE_SLOT_SHUFFLE_TIME + SLOT_MACHINE_DELAY);
    }

    randomizePerks() {
        this.uiHandler.togglePerksOverlay(false);
        let role = this.getActiveRole();
        let perks = this._randomizePerks(role);
        this.shufflePerks(role);

        let self = this;
        setTimeout(function () {
            self.uiHandler.updatePerkNames(role, perks);
        }, PERK_SLOT_SHUFFLE_TIME + (SLOT_MACHINE_DELAY * 3));
    }

    randomizeItems() {
        let role = this.getActiveRole();
        let character = 'hillbilly';

        this.uiHandler.toggleAddonsBlankBackground(false);
        RandomizerUiGenerator.generateCharacterSpecificElements(role, character);
        this._registerKillerAddonsSlotMachine();

        this._randomizeAddons(role, character)
        this.shuffleAddons(role);

        let self = this;
        setTimeout(function () {
            self.uiHandler.toggleAddonsBlankBackground(true);
        }, ADDONS_SLOT_SHUFFLE_TIME + (SLOT_MACHINE_DELAY * 3));
    }
}