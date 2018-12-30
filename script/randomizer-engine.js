class Engine {

    pickRandomRole() {
        let id = this._pickRandomNumber(ROLES);

        return { id: id, role: ROLES[id]};
    }

    pickRandomCharacter(role) {
        let id, character;

        switch(role) {
            case ROLES[0]:
                id = this._pickRandomNumber(KILLERS);
                character = KILLERS[id];
                break;
            case ROLES[1]:
                id = this._pickRandomNumber(SURVIVORS);
                character = SURVIVORS[id];
                break;
        }

        return { id: id, character: character };
    }

    pickRandomPerks(role){
        let ids, perks;
        switch(role) {
            case ROLES[0]:
                ids = this._getRandomNumbersBetween(4, 0, KILLER_PERKS.length - 1);
                perks =  ids.map(function (id) {
                   return KILLER_PERKS[id];
                });
                break;
            case ROLES[1]:
                ids = this._getRandomNumbersBetween(4, 0, SURVIVOR_PERKS.length -1);
                perks =  ids.map(function (id) {
                    return SURVIVOR_PERKS[id];
                });
                break;
        }

        return { ids: ids, perks: perks };
    }

    pickRandomSurvivorItem() {
        let id = this._pickRandomNumber(SURVIVOR_ITEMS);

        return { id: id, item: SURVIVOR_ITEMS[id].item };
    }

    pickRandomAddons(character) {
        let ids;

        if ($.inArray(character, KILLERS) !== -1) {
            ids = this._getRandomNumbersBetween(2, 0, KILLER_POWERS[character].addons.length - 1);
        } else {
            ids = this._getRandomNumbersBetween(2, 0, ITEMS_ADDONS[character].length - 1);
        }

        return { ids: ids };
    }

    _pickRandomNumber(array) {
        return this._getRandomNumberBetween(0, array.length);
    }

    _getRandomNumbersBetween(quantity, min, max) {
        let result = [];

        while (result.length < quantity) {
            let number = this._getRandomNumberBetween(min, max);

            if(!result.includes(number)) {
                result.push(number);
            }
        }

        return result;
    }

    _getRandomNumberBetween(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}