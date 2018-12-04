const SURVIVORS = [ "dwight",  "meg", "claudette", "jake", "nea", "billy", "david", "laurie", "ace", "feng", "quentin",
    "tapp", "kate", "francis" ];

class Engine {

    getRandomSurvivor() {
        return SURVIVORS[this.getRandomNumberBetween(0, SURVIVORS.length - 1)];
    }

    getRandomNumberBetween(min, max) {
        let result = Math.floor(Math.random() * (max - min) + min);

        return result;
    }

    randomize() {
        return this.getRandomSurvivor();
    }
}

var engine = new Engine();

window.onload = function() {
    document.getElementById('randomize').addEventListener("click", function (ev) {
        document.getElementById('survivor-portrait').innerHTML = engine.randomize();
    });
}