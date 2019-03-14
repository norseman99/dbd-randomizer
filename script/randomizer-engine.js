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
                ids = this._getRandomNumbersBetween(4, 0, KILLER_PERKS.length);
                perks =  ids.map(function (id) {
                   return KILLER_PERKS[id];
                });
                break;
            case ROLES[1]:
                ids = this._getRandomNumbersBetween(4, 0, SURVIVOR_PERKS.length);
                perks =  ids.map(function (id) {
                    return SURVIVOR_PERKS[id];
                });
                break;
        }

        return { ids: ids, perks: perks };
    }

    pickRandomSurvivorItem() {
        let id = this._pickRandomNumber(SURVIVOR_ITEMS);
        let item = SURVIVOR_ITEMS[id];

        return { id: id, type: item.type, name: item.name };
    }

    pickRandomAddons(character) {
        let ids, names;

        if ($.inArray(character, KILLERS) !== -1) {
            ids = this._getRandomNumbersBetween(2, 0, KILLER_POWERS[character].addons.length - 1);
            names =  ids.map(function (id) {
                return KILLER_POWERS[character].addons[id].name;
            });
        } else {
            ids = this._getRandomNumbersBetween(2, 0, ITEMS_ADDONS[character].length - 1);
            names =  ids.map(function (id) {
                return ITEMS_ADDONS[character][id].name;
            });
        }

        return { ids: ids, names: names };
    }

    pickRandomOffering(role) {
        let id, name;
        switch(role) {
            case ROLES[0]:
                id = this._pickRandomNumber(KILLER_OFFERS);
                name = KILLER_OFFERS[id].name;
                break;
            case ROLES[1]:
                id = this._pickRandomNumber(SURVIVOR_OFFERS);
                name = SURVIVOR_OFFERS[id].name;
                break;
        }

        return { id: id, name: name };
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