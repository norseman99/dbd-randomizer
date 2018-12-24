class RandomizerUiHandler {
    constructor(uiTranslator) {
        this.uiTranslator = uiTranslator;
    }

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

    updateCharacterName(role, character) {
        $('#' + role + " .portrait-name").html(this.uiTranslator.getTranslation('CHARACTER_' + character.toUpperCase()));
    }

    updatePerkNames(role, perks) {
        let self = this;
        $('#' + role + " .perk-slot-name").each(function (index, element) {
            $(element).html(self.uiTranslator.getTranslation('PERK_' + perks[index].toUpperCase()));
        });
    }

    showResultsOverlay() {
        $('#overlay #role-result').html('');
        $('.portrait-name').html('');
        $('.perk-slot-name').html('');

        $("#overlay").css('display', 'block');
    }

    hideResultsOverlay() {
        $("#overlay").css('display', 'none');
        $('#overlay #role-result').html('');
    }

    togglePerklessOverlay(role, show) {
        if (show) {
            $('#' + role + '-perks-overlay').css('display', 'block');
        } else {
            $('#' + role + '-perks-overlay').css('display', 'none');
        }
    }

    enableControls() {
        $('#controls').css('display', 'block');
        $('#randomize-all').attr('disabled', false);
        $('#randomize-killer').attr('disabled', false);
        $('#randomize-survivor').attr('disabled', false);
    }

    disableControls() {
        $('#controls').css('display', 'none');
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

        $('.randomizer').on("click", function () {
            self.disableControls();
            slotMachineEngine.randomize($(this).attr('data-character'), $(this).attr('data-perkless'));
        });
    }
}