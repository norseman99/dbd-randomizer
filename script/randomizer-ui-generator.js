class RandomizerUiGenerator {

    constructor(uiTranslator) {
        this.uiTranslator = uiTranslator;
    }

    generateAllElements(role) {
        switch(role) {
            case ROLES[0]:
                this._generateKillerPortraitElements();
                break;
            case ROLES[1]:
                this._generateSurvivorPortraitElements();
                break;
        }

        this._generatePerkElements(role);
    }

    generateCharacterSpecificElements(role, character) {
        switch(role) {
            case ROLES[0]:
                this._generateKillerPowerElement(character);
                this._generateKillerPowerAddonsElements(character);
                break;
            case ROLES[1]:
                this._generateSurvivorItemAddonsElements(character);
                break;
        }
    }

    _generateKillerPowerElement(killer) {
        let self = this;

        $('#killer .item-image').html(self._createDivElement('item', [
            RandomizerUrlBuilder.buildCssKillerPowerPath(KILLER_POWERS[killer].image),
            RandomizerUrlBuilder.buildCssAddonBackPath('common')
        ]))
    }

    _generateKillerPowerAddonsElements(killer) {
        let self = this;

        $('#killer .item-addon-image').each(function () {
           $(this).html('');

           let addons = KILLER_POWERS[killer].addons;
           for (let i = 0; i < addons.length; i++) {
               let addon = addons[i];

               $(this).append(self._createDivElement('item-addon', [
                   RandomizerUrlBuilder.buildCssKillerAddonPath(killer, addon.image),
                   RandomizerUrlBuilder.buildCssAddonBackPath(addon.rarity)
               ]));
           }
        });
    }

    generateSurvivorItemElements() {
        let self = this;

        $('#survivor .item-image').each(function () {
            $(this).html('');

            let itemImage = this;
            SURVIVOR_ITEMS.forEach(function (item) {
                $(itemImage).append(self._createDivElement('item', [
                    RandomizerUrlBuilder.buildCssItemPath(item.image),
                    RandomizerUrlBuilder.buildCssItemBackPath(item.rarity)
                ]));
            });
        });
    }

    _generateSurvivorItemAddonsElements(item) {
        let self = this;

        $('#survivor .item-addon-image').each(function () {
            $(this).html('');

            let addons = ITEMS_ADDONS[item];
            for (let i = 0; i < addons.length; i++) {
                let addon = addons[i];

                $(this).append(self._createDivElement('item-addon', [
                    RandomizerUrlBuilder.buildCssItemAddonPath(item, addon.image),
                    RandomizerUrlBuilder.buildCssAddonBackPath(addon.rarity)
                ]));
            }
        });
    }

    _generateOfferingsElements(role) {
        let self = this;

        $('#' + role + ' .offer-image').each(function () {
            $(this).html('');

            let offerImage = this;
            let offers = (role == ROLES[0] ? KILLER_OFFERS : SURVIVOR_OFFERS);
            offers.forEach(function (offering) {
                $(offerImage).append(self._createDivElement('offer', [
                    RandomizerUrlBuilder.buildCssOfferingPath(offering.type, offering.image),
                    RandomizerUrlBuilder.buildCssOfferingBackPath(offering.rarity)
                ]));
            });
        });
    }

    _generatePerkElements(role) {
        switch(role) {
            case ROLES[0]:
                this._generateKillerPerkElements();
                break;
            case ROLES[1]:
                this._generateSurvivorPerkElements();
                break;
        }
    }

    _generateKillerPerkElements() {
        let self = this;

        $('#killer .perk-slot-image').each(function () {
            $(this).html('');
            for (let i = 0; i < KILLER_PERKS.length; i++) {
                $(this).append(self._createDivElement('perk', [
                    RandomizerUrlBuilder.buildCssPerkPath(ROLES[0], KILLER_PERKS[i]),
                    RandomizerUrlBuilder.buildCssPerkBackPath(RARE_PERKS.includes(KILLER_PERKS[i]))
                ], {
                    title : self.uiTranslator.getTranslation('PERK_' + KILLER_PERKS[i].toUpperCase())
                }));
            }
        });
    }

    _generateSurvivorPerkElements() {
        let self = this;

        $('#survivor .perk-slot-image').each(function () {
            $(this).html('');
            for (let i = 0; i < SURVIVOR_PERKS.length; i++) {
                $(this).append(self._createDivElement('perk', [
                    RandomizerUrlBuilder.buildCssPerkPath(ROLES[1], SURVIVOR_PERKS[i]),
                    RandomizerUrlBuilder.buildCssPerkBackPath(RARE_PERKS.includes(SURVIVOR_PERKS[i]))
                ], {
                    title : self.uiTranslator.getTranslation('PERK_' + SURVIVOR_PERKS[i].toUpperCase())
                }));
            }
        });
    }

    _generateKillerPortraitElements() {
        this._generatePortraitElements('#killer .portrait-image', 'killer', ROLES[0], KILLERS);
    }

    _generateSurvivorPortraitElements() {
        this._generatePortraitElements('#survivor .portrait-image', 'survivor', ROLES[1], SURVIVORS);
    }

    _generatePortraitElements(selector, className, role, characters) {
        let self = this;

        $(selector).html('');
        $(selector).each(function () {
            let portrait = this;
            characters.forEach(function (character) {
                $(portrait).append(self._createDivElement(className, [RandomizerUrlBuilder.buildCssCharacterPortraitPath(role, character)]));
            });
        })
    }

    _createDivElement(className, backgroundImages, options) {
        let div = document.createElement('div');
        $(div).addClass(className).css('backgroundImage', this._buildBackgroundImages(backgroundImages));

        if (options && options.title) {
            $(div).attr('title', options.title);
        }

        return div;
    }

    _buildBackgroundImages(backgroundImages) {
        let result = '';

        backgroundImages.forEach(function (backgroundImage) {
            result += (result.length > 0 ? ',' : '');
            result += backgroundImage;
        })

        return result;
    }
}