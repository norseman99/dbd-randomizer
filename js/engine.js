const SURVIVORS = [ "dwight",  "meg", "claudette", "jake", "nea", "bill", "david", "laurie", "ace", "feng", "quentin",
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

function randomize() {
    document.getElementById('survivor-portrait').style.backgroundImage = "url('img/portraits/survivors/" + engine.randomize() + ".png')";;
}

window.onload = function() {
    randomize();

    document.getElementById('randomize').addEventListener("click", function (ev) {
        randomize();
    });
}