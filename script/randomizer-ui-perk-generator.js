class RandomizerUiPerkGenerator {

    init() {
        let _self = this;

        $('.perk-slot').each(function () {
            for (let i = 1; i <= 58; i++) {
                $(this).append(_self._createDivElement(_self._createImgElement(i)));
            }
        })
    }

    _createImgElement(n) {
        let img = document.createElement('img');

        $(img).addClass('perk-img').attr('src', RandomizerUrlBuilder.buildPerkPath(ROLES[1], n))
            .attr('height', 225).attr('width', 225);

        return img;
    }

    _createDivElement(img) {
        let div = document.createElement('div');
        $(div).addClass('perk-div').append(img);
        return div;
    }
}