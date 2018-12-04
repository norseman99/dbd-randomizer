const SURVIVORS = [ "dwight",  "meg", "claudette", "jake", "nea", "bill", "david", "laurie", "ace", "feng", "quentin",
    "tapp", "kate", "francis" ];

const KILLERS = [ "clown",  "doctor", "freddy", "hag", "hillbilly", "huntress", "leatherface", "myers", "nurse", "pig", "spirit",
    "trapper", "wraith" ];

const ROLES = [ "killer", "survivor" ];

class UrlBuilder {

    static buildCharacterPortraitPath(role, character) {
        return "url('img/portraits/" + role + "/" + character + ".png')"
    }

    static buildPerkPath(role, perk) {
        return "url('img/perks/" + role + "/" + perk + ".png')";
    }

}

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

let engine = new Engine();

function randomize() {
    let role = engine.pickRandomRole();

    document.getElementById("title").innerText = role;

    document.getElementById('portrait').style.backgroundImage = UrlBuilder.buildCharacterPortraitPath(role, engine.pickRandomCharacter(role));

    engine.pickRandomPerks(role).forEach(function(perk, i) {
        document.getElementsByClassName('perk')[i].style.backgroundImage = UrlBuilder.buildPerkPath(role, perk);
    });
}

function registerEvents() {
    document.getElementById('randomize').addEventListener("click", function () {
        randomize();
    });

    Array.prototype.forEach.call(document.getElementsByClassName('perk'),function(element) {
            element.addEventListener('click', function () {
                let lockElement = this.children[0];
                lockElement.style.visibility = (lockElement.style.visibility == 'hidden' ? 'visible' : 'hidden');
            })
    });
}


window.onload = function() {
    randomize();
    registerEvents();
};