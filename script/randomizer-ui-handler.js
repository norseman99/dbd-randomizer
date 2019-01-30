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

    updateItemName(role, item) {
        $('#' + role + " .item-name").html(item);
    }

    updateAddonNames(role, addons) {
        $('#' + role + " .item-addon-name").each(function (index, element) {
            $(element).html(addons[index]);
        });
    }

    updateOfferingName(role, offering) {
        $('#' + role + " .offer-name").html(offering);
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

    toggleItemBlankBackground(show) {
        if (show) {
            $('.item-image').addClass('blank');
        } else {
            $('.item-name').html('');
            $('.item-image').removeClass('blank');
        }
    }

    toggleAddonsBlankBackground(show) {
        if (show) {
            $('.item-addon-image').addClass('blank');
        } else {
            $('.item-addon-name').html('');
            $('.item-addon-image').removeClass('blank');
        }
    }

    toggleOfferingBlankBackground(show) {
        if (show) {
            $('.offer-image').addClass('blank');
        } else {
            $('.offer-name').html('');
            $('.offer-image').removeClass('blank');
        }
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
        $('.item-image').html('');
        $('.item-name').html('');
        $('.item-image').addClass('blank');
        $('.item-addon-image').html('');
        $('.item-addon-name').html('');
        $('.item-addon-image').addClass('blank');
        $('.offer-image').html('');
        $('.offer-name').html('');
        $('.offer-image').addClass('blank');
    }

    _registerPerkLock() {
        $('.perk').on('click',function () {
            let lockElement = this.children[0];
            lockElement.style.visibility = (lockElement.style.visibility == 'hidden' ? 'visible' : 'hidden');
        });
    }

    _initTranslations() {
        $('.randomize-label').html(uiTranslator.getTranslation('UI_RANDOMIZE_LABEL'));
        $('.randomize-with-perks-label').html(uiTranslator.getTranslation('UI_RANDOMIZE_WITH_PERKS_LABEL'));
        $('#randomize-all').html(uiTranslator.getTranslation('UI_ANY'));
        $('#randomize-killer').html(uiTranslator.getTranslation('UI_KILLER'));
        $('#randomize-survivor').html(uiTranslator.getTranslation('UI_SURVIVOR'));
        $('#randomize-perks').html(uiTranslator.getTranslation('UI_PERKS_ONLY'));
        $('#randomize-items').html(uiTranslator.getTranslation('UI_ITEMS_ONLY'));
        $('#randomize-offers').html(uiTranslator.getTranslation('UI_OFFERS_ONLY'));
        $('#overlay-text-1').html(uiTranslator.getTranslation('UI_OVERLAY_TEXT1'));
        $('#overlay-text-2').html(uiTranslator.getTranslation('UI_OVERLAY_TEXT2'));
    }

    _registerRandomizeEvent(slotMachineEngine) {
        let self = this;

        $('.randomizer').on("click", function () {
            self.disableControls();
            slotMachineEngine.randomize($(this).attr('data-character'), $('#randomize-with-perks').is(':checked'), $(this).attr('data-role-delay'));
        });

        $('#randomize-perks').on("click", function () {
            self.disableControls();
            slotMachineEngine.randomizePerks();
        });

        $('#randomize-items').on("click", function () {
            self.disableControls();
            slotMachineEngine.randomizeItems();
        });

        $('#randomize-offers').on('click', function () {
           self.disableControls();
           slotMachineEngine.randomizeOfferings();
        });
    }
}