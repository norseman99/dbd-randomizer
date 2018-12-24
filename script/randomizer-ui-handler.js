class RandomizerUiHandler {

    init(slotMachineEngine) {
        this._registerRandomizeEvent(slotMachineEngine);
    }

    updateUI(role) {
        this._enableRole(role);
    }

    updateRoleResult(role) {
        this.showResultsOverlay();

        $('#overlay #role-result').html(role.toUpperCase() + ' it is!');
    }

    showResultsOverlay() {
        $('#overlay #role-result').html('');
        $("#overlay").css('display', 'block');
    }

    hideResultsOverlay() {
        $("#overlay").css('display', 'none');
        $('#overlay #role-result').html('');
    }

    enableButtons() {
        $('#randomize-all').attr('disabled', false);
        $('#randomize-killer').attr('disabled', false);
        $('#randomize-survivor').attr('disabled', false);
    }

    disableButtons() {
        $('#randomize-all').attr('disabled', true);
        $('#randomize-killer').attr('disabled', true);
        $('#randomize-survivor').attr('disabled', true);
    }

    _enableRole(role) {
        let killersDisplay = 'none';
        let survivorsDisplay = 'none';

        switch(role) {
            case ROLES[0]:
                killersDisplay = 'block';
                break;
            case ROLES[1]:
                survivorsDisplay = 'block';
                break;
        }

        $('#killer').css('display', killersDisplay);
        $('#survivor').css('display', survivorsDisplay);
    }

    _registerPerkLock() {
        $('.perk').on('click',function () {
            let lockElement = this.children[0];
            lockElement.style.visibility = (lockElement.style.visibility == 'hidden' ? 'visible' : 'hidden');
        });
    }

    _registerRandomizeEvent(slotMachineEngine) {
        let self = this;

        $('#randomize-all').on("click", function () {
            self.disableButtons();

            slotMachineEngine.randomize();
        });

        $('#randomize-killer').on("click", function () {
            self.disableButtons();

            slotMachineEngine.randomizeForRole('killer', 0);
        });

        $('#randomize-survivor').on("click", function () {
            self.disableButtons();

            slotMachineEngine.randomizeForRole('survivor', 0);
        });
    }
}