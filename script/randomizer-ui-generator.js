class RandomizerUiGenerator {

    static generateAllElements(role) {
        switch(role) {
            case ROLES[0]:
                RandomizerUiGenerator._generateKillerPortraitElements();
                break;
            case ROLES[1]:
                RandomizerUiGenerator._generateSurvivorPortraitElements();
                break;
        }

        RandomizerUiGenerator._generatePerkElements(role);
    }

    static generateCharacterSpecificElements(role, character) {
        switch(role) {
            case ROLES[0]:
                RandomizerUiGenerator._generateKillerPowerElement(character);
                break;
            case ROLES[1]:
                break;
        }
    }

    static _generateKillerPowerElement(killer) {
        $('#killer .item-image').html(RandomizerUiGenerator._createDivElement('item', [
            RandomizerUrlBuilder.buildCssKillerPowerPath(KILLER_POWERS[killer]),
            RandomizerUrlBuilder.buildCssAddonPath('common')
        ]))
    }

    static _generateKillerPowerAddonsElements() {

    }

    static _generateSurvivorItemElemenmt() {

    }

    static _generateSurvivorItemAddonsElements() {

    }

    static _generatePerkElements(role) {
        switch(role) {
            case ROLES[0]:
                RandomizerUiGenerator._generateKillerPerkElements();
                break;
            case ROLES[1]:
                RandomizerUiGenerator._generateSurvivorPerkElements();
                break;
        }
    }

    static _generateKillerPerkElements() {
        $('#killer .perk-slot-image').each(function () {
            $(this).html('');
            for (let i = 0; i < KILLER_PERKS.length; i++) {
                $(this).append(RandomizerUiGenerator._createDivElement('perk', [
                    RandomizerUrlBuilder.buildCssPerkPath(ROLES[0], KILLER_PERKS[i]),
                    RandomizerUrlBuilder.buildCssPerkBackPath(RARE_PERKS.includes(KILLER_PERKS[i]))
                ]));
            }
        });
    }

    static _generateSurvivorPerkElements() {
        $('#survivor .perk-slot-image').each(function () {
            $(this).html('');
            for (let i = 0; i < SURVIVOR_PERKS.length; i++) {
                $(this).append(RandomizerUiGenerator._createDivElement('perk', [
                    RandomizerUrlBuilder.buildCssPerkPath(ROLES[1], SURVIVOR_PERKS[i]),
                    RandomizerUrlBuilder.buildCssPerkBackPath(RARE_PERKS.includes(SURVIVOR_PERKS[i]))
                ]));
            }
        });
    }

    static _generateKillerPortraitElements() {
        RandomizerUiGenerator._generatePortraitElements('#killer .portrait-image', 'killer', ROLES[0], KILLERS);
    }

    static _generateSurvivorPortraitElements() {
        RandomizerUiGenerator._generatePortraitElements('#survivor .portrait-image', 'survivor', ROLES[1], SURVIVORS);
    }

    static _generatePortraitElements(selector, className, role, characters) {
        $(selector).html('');
        $(selector).each(function () {
            let portrait = this;
            characters.forEach(function (character) {
                $(portrait).append(RandomizerUiGenerator._createDivElement(className, [RandomizerUrlBuilder.buildCssCharacterPortraitPath(role, character)]));
            });
        })
    }

    static _createDivElement(className, backgroundImages) {
        let div = document.createElement('div');
        $(div).addClass(className).css('backgroundImage', this._buildBackgroundImages(backgroundImages));
        return div;
    }

    static _buildBackgroundImages(backgroundImages) {
        let result = '';

        backgroundImages.forEach(function (backgroundImage) {
            result += (result.length > 0 ? ',' : '');
            result += backgroundImage;
        })

        return result;
    }
}