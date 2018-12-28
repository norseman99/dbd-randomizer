class RandomizerUiHandler {
    constructor(uiTranslator) {
        this.uiTranslator = uiTranslator;
    }

    init(defaultRole, slotMachineEngine) {
        this.updateUI(defaultRole);
        this._initTranslations();
        this._registerRandomizeEvent(slotMachineEngine);
    }

    updateUI(role) {
        this._clearElements(role)
        this._enableRole(role);
    }

    updateRoleResult(role) {
        this.showResultsOverlay();

        $('#overlay #role-result').html(uiTranslator.getTranslation('UI_OVERLAY_RESULT_' + role.toUpperCase()));
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

    togglePerksOverlay(show) {
        $('.perk-slot-name').html('');
        $('.perk-slot-overlay').css('display', show ? 'block' : 'none');
    }

    enableControls() {
        $('#controls').css('visibility', '');
        $('#randomize-all').attr('disabled', false);
        $('#randomize-killer').attr('disabled', false);
        $('#randomize-survivor').attr('disabled', false);
    }

    disableControls() {
        $('#controls').css('visibility', 'hidden');
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

    _clearElements(role) {
        switch(role) {
            case ROLES[0]:
                $('#killer .item-image').html('');
                break;
        }
    }

    _registerPerkLock() {
        $('.perk').on('click',function () {
            let lockElement = this.children[0];
            lockElement.style.visibility = (lockElement.style.visibility == 'hidden' ? 'visible' : 'hidden');
        });
    }

    _initTranslations() {
        $('#perk-randomizer').html(uiTranslator.getTranslation('UI_PERK_RANDOMIZER'));
        $('#perkless-randomizer').html(uiTranslator.getTranslation('UI_PERKLESS_RANDOMIZER'));
        $('#perk-randomize-all').attr('value', uiTranslator.getTranslation('UI_ANY'));
        $('#perk-randomize-killer').attr('value', uiTranslator.getTranslation('UI_KILLER'));
        $('#perk-randomize-survivor').attr('value', uiTranslator.getTranslation('UI_SURVIVOR'));
        $('#overlay-text-1').html(uiTranslator.getTranslation('UI_OVERLAY_TEXT1'));
        $('#overlay-text-2').html(uiTranslator.getTranslation('UI_OVERLAY_TEXT2'));
    }

    _registerRandomizeEvent(slotMachineEngine) {
        let self = this;

        $('.randomizer').on("click", function () {
            self.disableControls();
            slotMachineEngine.randomize($(this).attr('data-character'), $('#randomize-with-perks').is(':checked'));
        });

        $('#randomize-perks').on("click", function () {
            self.disableControls();
            slotMachineEngine.randomizePerks();
        });
    }
}