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
        $('#killer .perk-slot-image').each(function () {
            $(this).html('');
            for (let i = 0; i < KILLER_PERKS.length; i++) {
                $(this).append(RandomizerUiGenerator._createDivElement('perk', RandomizerUrlBuilder.buildCssPerkPath(ROLES[0], KILLER_PERKS[i])));
            }
        })
    }

    static _generateSurvivorPerkElements() {
        $('#survivor .perk-slot-image').each(function () {
            $(this).html('');
            for (let i = 0; i < SURVIVOR_PERKS.length; i++) {
                $(this).append(RandomizerUiGenerator._createDivElement('perk', RandomizerUrlBuilder.buildCssPerkPath(ROLES[1], SURVIVOR_PERKS[i])));
            }
        })
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