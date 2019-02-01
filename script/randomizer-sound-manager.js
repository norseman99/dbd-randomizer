class RandomizerSoundManager {

    constructor() {
        this.enabled = true;

        this.roleSound = new Audio('sound/tick.mp3');
        this.roleSound.loop = true;

        this.characterSound = new Audio('sound/tick.mp3');
        this.characterSound.loop = true;

        this.perksSound = [];
        for (let i = 0; i < 4; i++) {
            this.perksSound[i] = new Audio('sound/tick.mp3');
            this.perksSound[i].loop = true;
        }
    }

    playRoleSound() {
        if (this.enabled) {
            this.roleSound.play();
        }
    }

    pauseRoleSound() {
        if (this.enabled) {
            this.roleSound.pause();
        }
    }

    playCharacterSound() {
        if (this.enabled) {
            this.characterSound.play();
        }
    }

    pauseCharacterSound() {
        if (this.enabled) {
            this.characterSound.pause();
        }
    }

    playPerksSound() {
        if (this.enabled) {
            this.perksSound.forEach(function (perkSound) {
                perkSound.play();
            });
        }
    }

    pausePerksSound() {
        if (this.enabled) {
            this.perksSound.forEach(function (perkSound) {
                perkSound.pause();
            });
        }
    }

    checkEnabledStatus() {
        this.enabled = $("#randomizer").attr('data-sound-enabled') === "true";
    }
}