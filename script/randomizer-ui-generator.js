class RandomizerUiGenerator {

    init() {
        this._generateKillerPortraitElements();
        this._generateSurvivorPortraitElements();
        this._generatePerkElements();
    }

    _generatePerkElements() {
        let _self = this;
        $('.perk-slot').each(function () {
            for (let i = 1; i <= 58; i++) {
                $(this).append(_self._createDivElement('perk', RandomizerUrlBuilder.buildCssPerkPath(ROLES[1], i)));
            }
        })
    }

    _generateKillerPortraitElements() {
        this._generatePortraitElements('#killers', 'killer', ROLES[0], KILLERS);
    }

    _generateSurvivorPortraitElements() {
        this._generatePortraitElements('#survivors', 'survivor', ROLES[1], SURVIVORS);
    }

    _generatePortraitElements(selector, className, role, characters) {
        let _self = this;
        $(selector).each(function () {
            let portrait = this;
            characters.forEach(function (character) {
                $(portrait).append(_self._createDivElement(className, RandomizerUrlBuilder.buildCharacterPortraitPath(role, character)));
            });
        })
    }

    _createDivElement(className, backgroundImage) {
        let div = document.createElement('div');
        $(div).addClass(className).css('backgroundImage', backgroundImage);
        return div;
    }
}