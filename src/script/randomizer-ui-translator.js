const TRANSLATIONS = require('./conf/translations.json');

class RandomizerUiTranslator {
    constructor() {
        this.locale = 'en';
    }

    getTranslation(key) {
        let translations = TRANSLATIONS[this.locale];

        return translations[key];
    }
}

export default RandomizerUiTranslator;