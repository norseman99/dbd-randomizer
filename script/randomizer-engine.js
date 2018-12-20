class Engine {

    pickRandomRole() {
        return this._pickRandom(ROLES);
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
                return this._getRandomNumbersBetween(4, 0, 48);
            case ROLES[1]:
                return this._getRandomNumbersBetween(4, 0, 57);
        }
    }

    _pickRandom(array) {
        return array[this._getRandomNumberBetween(0, array.length)];
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