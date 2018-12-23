class RandomizerUiHandler {

    init(slotMachineEngine) {
        this._registerRandomizeEvent(slotMachineEngine);
    }

    updateUI(role) {
        this.updateTitle(role);
        this._enableRole(role);
    }

    updateTitle(message) {
        $("#title").html(message);
    }

    enableButtons() {
        $('#randomize').attr('disabled', false);
    }

    _enableRole(role) {
        let killersDisplay = 'none';
        let survivorsDisplay = 'none';

        switch(role) {
            case ROLES[0]:
                killersDisplay = '';
                break;
            case ROLES[1]:
                survivorsDisplay = '';
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
        $('#randomize').on("click", function () {
            $(this).attr('disabled', true);

            slotMachineEngine.randomize();
        });
    }
}