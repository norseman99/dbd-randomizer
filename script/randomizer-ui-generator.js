class RandomizerUiGenerator {

    static generateAllElements() {
        RandomizerUiGenerator._generateKillerPortraitElements();
        RandomizerUiGenerator._generateSurvivorPortraitElements();
        RandomizerUiGenerator._generatePerkElements();
    }

    static _generatePerkElements() {
        RandomizerUiGenerator._generateKillerPerkElements();
        RandomizerUiGenerator._generateSurvivorPerkElements();
    }

    static _generateKillerPerkElements() {
        $('#killer .perk-slot').each(function () {
            $(this).html('');
            for (let i = 1; i <= 48; i++) {
                $(this).append(RandomizerUiGenerator._createDivElement('perk', RandomizerUrlBuilder.buildCssPerkPath(ROLES[0], i)));
            }
        })
    }

    static _generateSurvivorPerkElements() {
        $('#survivor .perk-slot').each(function () {
            $(this).html('');
            for (let i = 1; i <= 58; i++) {
                $(this).append(RandomizerUiGenerator._createDivElement('perk', RandomizerUrlBuilder.buildCssPerkPath(ROLES[1], i)));
            }
        })
    }

    static _generateKillerPortraitElements() {
        RandomizerUiGenerator._generatePortraitElements('#killer .portrait', 'killer', ROLES[0], KILLERS);
    }

    static _generateSurvivorPortraitElements() {
        RandomizerUiGenerator._generatePortraitElements('#survivor .portrait', 'survivor', ROLES[1], SURVIVORS);
    }

    static _generatePortraitElements(selector, className, role, characters) {
        $(selector).html('');
        $(selector).each(function () {
            let portrait = this;
            characters.forEach(function (character) {
                $(portrait).append(RandomizerUiGenerator._createDivElement(className, RandomizerUrlBuilder.buildCharacterPortraitPath(role, character)));
            });
        })
    }

    static _createDivElement(className, backgroundImage) {
        let div = document.createElement('div');
        $(div).addClass(className).css('backgroundImage', backgroundImage);
        return div;
    }
}