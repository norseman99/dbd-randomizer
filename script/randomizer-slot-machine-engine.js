class RandomizerSlotMachineEngine {

    constructor(engine) {
                this.perkSlotMachines = [];
        this.engine = engine;
    }

    init() {
        this.perkSlotMachines.push(this._registerSlotMachine('#perk-slot1', 1));
        this.perkSlotMachines.push(this._registerSlotMachine('#perk-slot2', 2));
        this.perkSlotMachines.push(this._registerSlotMachine('#perk-slot3', 3));
        this.perkSlotMachines.push(this._registerSlotMachine('#perk-slot4', 4));

        this.killerSlotMachine = this._registerSlotMachine('#portrait', 0);
    }

    _registerSlotMachine(selector, active) {
        return new SlotMachine(document.querySelector(selector), {
            active: active,
            delay: 500,
            spins: 5
        });
    }

    randomize() {
        let role = this.engine.pickRandomRole();
        let self = this;

        this.killerSlotMachine.shuffle(9999999);

        this.perkSlotMachines.forEach(function (slotMachine) {
            slotMachine.shuffle(9999999);
        });

        setTimeout(function () {
            self.killerSlotMachine.stop();
            self.perkSlotMachines.forEach(function (slotMachine) {
                slotMachine.stop();
            });
        }, 1000)

        return {
            role: role
        };
    }
}