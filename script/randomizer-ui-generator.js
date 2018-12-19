class RandomizerUiGenerator {

    init() {
        this._generatePortraitElements();
        this._generatePerkElements();
    }

    _generatePerkElements() {
        let _self = this;
        $('.perk-slot').each(function () {
            for (let i = 1; i <= 58; i++) {
                $(this).append(_self._createDivElement(i));
            }
        })
    }

    _generatePortraitElements() {

    }

    _createDivElement(n) {
        let div = document.createElement('div');
        $(div).addClass('perk').css('backgroundImage', RandomizerUrlBuilder.buildCssPerkPath(ROLES[1], n));
        return div;
    }
}