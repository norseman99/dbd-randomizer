const SURVIVORS = [ "dwight",  "meg", "claudette", "jake", "nea", "bill", "david", "laurie", "ace", "feng", "quentin",
    "tapp", "kate", "francis" ];

class Engine {

    getRandomSurvivor() {
        return SURVIVORS[this._getRandomNumberBetween(0, SURVIVORS.length - 1)];
    }

    getSurvivorRandomPerks(){
        return this._getRandomNumbersBetween(4, 1, 58);
    }

    _getRandomNumbersBetween(quantity, min, max) {
        var result = [];

        while (result.length < quantity) {
            var number = this._getRandomNumberBetween(1, 58);

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

var engine = new Engine();

function randomize() {
    document.getElementById('portrait').style.backgroundImage = "url('img/portraits/survivors/" + engine.getRandomSurvivor() + ".png')";

    engine.getSurvivorRandomPerks().forEach(function(perk, i) {
        document.getElementsByClassName('perk')[i].style.backgroundImage = "url('img/perks/survivor/" + perk + ".png')";
    });
}

window.onload = function() {
    randomize();

    document.getElementById('randomize').addEventListener("click", function (ev) {
        randomize();
    });
}