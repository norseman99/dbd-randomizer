class RandomizerUrlBuilder {

    static buildCharacterPortraitPath(role, character) {
        return "url('img/portraits/" + role + "/" + character + ".png')"
    }

    static buildPerkPath(role, perk) {
        return "img/perks/" + role + "/iconPerks_" + perk + ".png";
    }

    static buildCssPerkPath(role, perk) {
        return "url(" + this.buildPerkPath(role, perk) + ")";
    }
}