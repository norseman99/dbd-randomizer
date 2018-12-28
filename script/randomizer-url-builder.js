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

    static buildCssAddonPath(rarity) {
        return "url('img/addons/rarity/" + rarity + ".png')";
    }

    static buildCssPerkPath(role, perk) {
        return "url(" + this.buildPerkPath(role, perk) + ")";
    }

    static buildCssPerkBackPath(rare) {
        return "url(" + this.buildPerkBackPath(rare) + ")";
    }
}