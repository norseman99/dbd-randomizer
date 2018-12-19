class RandomizerUiGenerator {

    init() {
        this._generatePortraitElements();
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

    _generatePortraitElements() {
        let _self = this;
        $('#portrait').each(function () {
            let portrait = this;
            KILLERS.forEach(function (character) {
                $(portrait).append(_self._createDivElement('killer', RandomizerUrlBuilder.buildCharacterPortraitPath(ROLES[0], character)));
            });
        })
    }

    _createDivElement(className, backgroundImage) {
        let div = document.createElement('div');
        $(div).addClass(className).css('backgroundImage', backgroundImage);
        return div;
    }
}