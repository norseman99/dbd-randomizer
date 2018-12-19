const SURVIVORS = [ "dwight",  "meg", "claudette", "jake", "nea", "bill", "david", "laurie", "ace", "feng", "quentin",
    "tapp", "kate", "francis" ];

const KILLERS = [ "clown",  "doctor", "freddy", "hag", "hillbilly", "huntress", "leatherface", "myers", "nurse", "pig", "spirit",
    "trapper", "wraith" ];

const ROLES = [ "killer", "survivor" ];

class UrlBuilder {

    static buildCharacterPortraitPath(role, character) {
        return "url('img/portraits/" + role + "/" + character + ".png')"
    }

    static buildCssPerkPath(role, perk) {
        return "url(" + this.buildPerkPath(role, perk) + ")";
    }

    static buildPerkPath(role, perk) {
        return "img/perks/" + role + "/" + perk + ".png";
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

    $("#title").html(role);

    $('#portrait').css('backgroundImage', UrlBuilder.buildCharacterPortraitPath(role, engine.pickRandomCharacter(role)));

    /*engine.pickRandomPerks(role).forEach(function(perk, i) {
        $('.perk').eq(i).css('backgroundImage', UrlBuilder.buildCssPerkPath(role, perk));
    });*/
}

function registerEvents() {
    $('.perk').on('click',function () {
        let lockElement = this.children[0];
        lockElement.style.visibility = (lockElement.style.visibility == 'hidden' ? 'visible' : 'hidden');
    });
}

function generatePerks() {

    $('.perk-slot').each(function () {
        for (let i = 1; i <= 58; i++) {

            let img = document.createElement('img');
            $(img).addClass('perk-img').attr('src', UrlBuilder.buildPerkPath(ROLES[1], i)).attr('height', 225).attr('width', 225);

            let div = document.createElement('div');
            $(div).addClass('perk-div').append(img);

            $(this).append(div);
        }
    })

    let p1 = document.querySelector('#perk-slot1');
    const mCasino1 = new SlotMachine(p1, {
        active: 1,
        delay: 3000,
        spins: 1
    });

    let p2 = document.querySelector('#perk-slot2');
    const mCasino2 = new SlotMachine(p2, {
        active: 2,
        delay: 3000,
        spins: 1
    });

    let p3 = document.querySelector('#perk-slot3');
    const mCasino3 = new SlotMachine(p3, {
        active: 3,
        delay: 3000,
        spins: 1
    });

    let p4 = document.querySelector('#perk-slot4');
    const mCasino4 = new SlotMachine(p4, {
        active: 4,
        delay: 3000,
        spins: 1
    });

    $('#randomize').on("click", function () {
        mCasino1.shuffle();
        mCasino2.shuffle();
        mCasino3.shuffle();
        mCasino4.shuffle();
    });
}

$(function() {
    randomize();
    registerEvents();
    generatePerks();
});