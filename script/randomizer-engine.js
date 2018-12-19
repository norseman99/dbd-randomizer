const SURVIVORS = [ "dwight",  "meg", "claudette", "jake", "nea", "bill", "david", "laurie", "ace", "feng", "quentin",
    "tapp", "kate", "francis" ];

const KILLERS = [ "clown",  "doctor", "freddy", "hag", "hillbilly", "huntress", "leatherface", "myers", "nurse", "pig", "spirit",
    "trapper", "wraith" ];

const ROLES = [ "killer", "survivor" ];

class Engine {

    pickRandomRole() {
        return this._pickRandom(ROLES);
    }

    pickRandomCharacter(role) {
        switch(role) {
            case ROLES[0]:
                return this._pickRandom(KILLERS)
            case ROLES[1]:
                return this._pickRandom(SURVIVORS)
        }
    }

    pickRandomPerks(role){
        switch(role) {
            case ROLES[0]:
                return this._getRandomNumbersBetween(4, 1, 49);
            case ROLES[1]:
                return this._getRandomNumbersBetween(4, 1, 58);
        }
    }

    _pickRandom(array) {
        return array[this._getRandomNumberBetween(0, array.length)];
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