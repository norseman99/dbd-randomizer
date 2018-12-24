class Engine {

    pickRandomRole() {
        return this._pickRandomNumber(ROLES);
    }

    pickRandomCharacter(role) {
        switch(role) {
            case ROLES[0]:
                return this._pickRandomNumber(KILLERS)
            case ROLES[1]:
                return this._pickRandomNumber(SURVIVORS)
        }
    }

    pickRandomPerks(role){
        switch(role) {
            case ROLES[0]:
                return this._getRandomNumbersBetween(4, 0, KILLER_PERKS.length - 1);
            case ROLES[1]:
                return this._getRandomNumbersBetween(4, 0, SURVIVOR_PERKS.length -1);
        }
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