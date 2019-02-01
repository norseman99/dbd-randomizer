class RandomizerSlotMachineEngine {

    constructor(engine, uiHandler, uiGenerator, soundManager) {
        this.killerPerksSlotMachines = [];
        this.survivorPerksSlotMachines = [];
        this.controlsOnCharacterComplete = false;
        this.engine = engine;
        this.uiHandler = uiHandler;
        this.uiGenerator = uiGenerator;
        this.soundManager = soundManager;
    }

    init(defaultRole, defaultCharacter) {
        this.setActiveRole(defaultRole);
        this.setActiveCharacter(defaultCharacter);
        this._registerRoleSlotMachine();
        this.registerSlotMachinesForRole(defaultRole);
        this.uiHandler.updateCharacterName(defaultRole, defaultCharacter);
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

    _randomizeSurvivorItem() {
        this.survivorItemSlotMachineResult = this.engine.pickRandomSurvivorItem();
    }

    _randomizeAndGetSurvivorItem() {
        this._randomizeSurvivorItem();
        return this.survivorItemSlotMachineResult;
    }

    _randomizeItemAddons(role, character) {
        this.characterAddonSlotMachineResult = this.engine.pickRandomAddons(character);
    }

    _randomizeAndGetItemAddons(role, character) {
        this._randomizeItemAddons(role, character);
        return this.characterAddonSlotMachineResult.names;
    }

    _randomizeOffering(role) {
        this.offeringSlotMachineResult = this.engine.pickRandomOffering(role);
    }

    _randomizeAndGetOffering(role) {
        this._randomizeOffering(role);
        return this.offeringSlotMachineResult.name;
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

    shuffleSurvivorItems() {
        this._shuffleSlotMachine(this.survivorItemsSlotMachine, ITEMS_SLOT_SHUFFLE_TIME);
    }

    shuffleAddons(role) {
        switch (role) {
            case ROLES[0]:
                this._shuffleSlotMachines(this.killerAddonsSlotMachines, ADDONS_SLOT_SHUFFLE_TIME);
                break;
            case ROLES[1]:
                this._shuffleSlotMachines(this.survivorItemAddonsSlotMachines, ADDONS_SLOT_SHUFFLE_TIME);
                break;
        }
    }

    shuffleOfferings() {
        this._shuffleSlotMachine(this.offeringSlotMachine, OFFERING_SLOT_SHUFFLE_TIME);
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

    _registerAddonsSlotMachine(role) {
        switch(role) {
            case ROLES[0]:
                this._registerKillerAddonsSlotMachine();
                break;
            case ROLES[1]:
                this._registerSurvivorItemAddonsSlotMachine();
                break;
        }
    }


    _registerKillerAddonsSlotMachine() {
        this.killerAddonsSlotMachines = [];
        this.killerAddonsSlotMachines.push(this._registerSlotMachine('#power-addon1', 1, 'addon', 0));
        this.killerAddonsSlotMachines.push(this._registerSlotMachine('#power-addon2', 2, 'addon', 1));
    }

    _registerSurvivorItemsSlotMachine() {
        this.survivorItemsSlotMachine = this._registerSlotMachine('#survivor-item', 1, 'item', 0);
    }

    _registerSurvivorItemAddonsSlotMachine() {
        this.survivorItemAddonsSlotMachines = [];
        this.survivorItemAddonsSlotMachines.push(this._registerSlotMachine('#item-addon1', 1, 'addon', 0));
        this.survivorItemAddonsSlotMachines.push(this._registerSlotMachine('#item-addon2', 2, 'addon', 1));
    }

    _registerOfferingSlotMachine(role) {
        this.offeringSlotMachine = this._registerSlotMachine("#" + role + " .offer-image", 1, 'offering', 0);
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
        } else if ((type === 'perk' && index === 3) || (type === 'addon' && index == 1) || type === 'offering') {
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
            case 'item':
                return this.survivorItemSlotMachineResult.id;
            case 'addon':
                return this.characterAddonSlotMachineResult.ids[index];
            case 'offering':
                return this.offeringSlotMachineResult.id;
        }
    }

    randomize(role, withPerks, roleDelay) {
        roleDelay = (roleDelay === undefined ? ROLE_SLOT_SHUFFLE_TIME + SLOT_MACHINE_DELAY : roleDelay);

        this.uiHandler.showResultsOverlay();
        this.uiHandler.togglePerksOverlay(true);

        if (role === undefined) {
            this.soundManager.playRoleSound();
            role = this._randomizeAndGetActiveRole();
            this.shuffleRole();
        } else {
            this.setActiveRole(role);
        }

        let self = this;
        setTimeout(function () {
            self.uiHandler.updateRoleResult(role)
            self.uiHandler.updateUI(role);
            self.soundManager.pauseRoleSound();

            self.uiGenerator.generateAllElements(role);
            self.registerSlotMachinesForRole(role);

            setTimeout(function () {
                self.uiHandler.hideResultsOverlay();

                setTimeout(function () {
                    let character = self._randomizeAndGetActiveCharacter(role);
                    self.soundManager.playCharacterSound();
                    self._toggleEnableControlsOnCharacterComplete(!withPerks);
                    self.shuffleCharacter(role);

                    setTimeout(function () {
                        self.uiHandler.updateCharacterName(role, character);
                        self.soundManager.pauseCharacterSound();

                        if (withPerks) {
                            self.randomizePerks();
                        }

                    }, CHARACTER_SLOT_SHUFFLE_TIME + (SLOT_MACHINE_DELAY * 3));

                }, DELAY_BEFORE_CHARACTER_ROLE); // wait time to read results

            }, SHOW_ROLE_RESULT_TIME); // setup time

        }, roleDelay);
    }

    randomizePerks() {
        this.uiHandler.togglePerksOverlay(false);
        this.soundManager.playPerksSound();

        let role = this.getActiveRole();
        let perks = this._randomizePerks(role);
        this.shufflePerks(role);

        let self = this;
        setTimeout(function () {
            self.uiHandler.updatePerkNames(role, perks);
            self.soundManager.pausePerksSound();
        }, PERK_SLOT_SHUFFLE_TIME + (SLOT_MACHINE_DELAY * 3));
    }

    randomizeItems() {
        let role = this.getActiveRole();
        let character = this.getActiveCharacter();

        switch(role) {
            case ROLES[0]:
                this._randomizeActiveItemAddons(role, character);
                break;
            case ROLES[1]:
                this._randomizeActiveSurvivorItem();
                break;
        }
    }

    randomizeOfferings() {
        let role = this.getActiveRole();

        this.uiGenerator._generateOfferingsElements(role);
        this._registerOfferingSlotMachine(role);
        this.uiHandler.toggleOfferingBlankBackground(false);

        let offering = this._randomizeAndGetOffering(role)
        this.shuffleOfferings()

        let self = this;
        setTimeout(function () {
            self.uiHandler.toggleOfferingBlankBackground(true);
            self.uiHandler.updateOfferingName(role, offering);
        }, OFFERING_SLOT_SHUFFLE_TIME + (SLOT_MACHINE_DELAY * 3));
    }

    _randomizeActiveSurvivorItem() {
        this.uiGenerator.generateSurvivorItemElements();
        this._registerSurvivorItemsSlotMachine();
        this.uiHandler.toggleItemBlankBackground(false);

        let item = this._randomizeAndGetSurvivorItem()
        this.shuffleSurvivorItems()

        let self = this;
        setTimeout(function () {
            self._randomizeActiveItemAddons(ROLES[1], item.type);
            self.uiHandler.updateItemName(ROLES[1], item.name);
            self.uiHandler.toggleItemBlankBackground(true);
        }, ITEMS_SLOT_SHUFFLE_TIME + (SLOT_MACHINE_DELAY * 3));
    }

    _randomizeActiveItemAddons(role, item) {
        this.uiGenerator.generateCharacterSpecificElements(role, item);

        this.uiHandler.toggleAddonsBlankBackground(false);
        this._registerAddonsSlotMachine(role);
        let addons = this._randomizeAndGetItemAddons(role, item);
        this.shuffleAddons(role);

        let self = this;
        setTimeout(function () {
            self.uiHandler.updateAddonNames(role, addons);
            self.uiHandler.toggleAddonsBlankBackground(true);
        }, ADDONS_SLOT_SHUFFLE_TIME + (SLOT_MACHINE_DELAY * 3));
    }
}