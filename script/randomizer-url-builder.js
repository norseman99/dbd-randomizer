class RandomizerUrlBuilder {

    static buildPerkPath(role, perk) {
        return "img/perks/" + role + "/iconPerks_" + perk + ".png";
    }

    static buildPerkBackPath(rare) {
        return "img/perks/rarity/" + (rare ? 'rare' : 'veryrare') + ".png";
    }

    static buildCssCharacterPortraitPath(role, character) {
        return "url('img/portraits/" + role + "/" + character + ".png')"
    }

    static buildCssKillerPowerPath(killerPower) {
        return "url('img/powers/iconPowers_" + killerPower + ".png')";
    }

    static buildCssKillerAddonPath(killer, imageName) {
        return "url('img/addons/killers/" + killer + "/iconAddon_" + imageName + ".png')";
    }

    static buildCssItemPath(item) {
        return "url('img/items/iconItems_" +  item + ".png')";
    }

    static buildCssItemAddonPath(item, imageName) {
        return "url('img/addons/survivors/" + item + "/iconAddon_" + imageName + ".png')";
    }

    static buildCssItemBackPath(rarity) {
        return "url('img/addons/rarity/" + rarity + ".png')";
    }

    static buildCssAddonBackPath(rarity) {
        return "url('img/addons/rarity/" + rarity + ".png')";
    }

    static buildCssOfferingPath(type, image) {
        return "url('img/offers/" + type + "/iconFavors_" + image + ".png')";
    }

    static buildCssOfferingBackPath(rarity) {
        return "url('img/offers/rarity/" + rarity + ".png')";
    }

    static buildCssPerkPath(role, perk) {
        return "url(" + this.buildPerkPath(role, perk) + ")";
    }

    static buildCssPerkBackPath(rare) {
        return "url(" + this.buildPerkBackPath(rare) + ")";
    }
}