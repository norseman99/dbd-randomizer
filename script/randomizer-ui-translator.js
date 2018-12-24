class RandomizerUiTranslator {
    constructor() {
        this.locale = 'en';
    }

    getTranslation(key) {
        let translations = TRANSLATIONS[this.locale];

        return translations[key];
    }
}

const TRANSLATIONS = {
    'en': {
        "CHARACTER_DWIGHT": "Dwight Fairfield",
        "CHARACTER_MEG": "Meg Thomas",
        "CHARACTER_CLAUDETTE": "Claudette Morel",
        "CHARACTER_JAKE": "Jake Park",
        "CHARACTER_JEFF": "Jeff Johansen",
        "CHARACTER_NEA": "Nea Karlsson",
        "CHARACTER_BILL": "Bill Overbeck",
        "CHARACTER_DAVID": "David King",
        "CHARACTER_LAURIE": "Laurie Strode",
        "CHARACTER_ACE": "Ace Visconti",
        "CHARACTER_FENG": "Feng Min",
        "CHARACTER_QUENTIN": "Quentin",
        "CHARACTER_TAPP": "David Tapp",
        "CHARACTER_KATE": "Kate Denson",
        "CHARACTER_FRANCIS": "Adam Francis",
        "CHARACTER_CLOWN": "Jeffrey Hawk (Clown)",
        "CHARACTER_DOCTOR": "Herman Carter (Doctor)",
        "CHARACTER_FREDDY": "Freddy Krueger",
        "CHARACTER_HAG": "Lisa Sherwood (Hag)",
        "CHARACTER_HILLBILLY": "Max Thompson Jr. (Hillbilly)",
        "CHARACTER_HUNTRESS": "Anna (Huntress)",
        "CHARACTER_LEATHERFACE": "Junior Sawyer (Cannibal)",
        "CHARACTER_LEGION": "F. J. S. J. (Legion)",
        "CHARACTER_MYERS": "Michael Myers",
        "CHARACTER_NURSE": "Sally Smithson (Nurse)",
        "CHARACTER_PIG": "Amanda Young (Pig)",
        "CHARACTER_SPIRIT": "Rin Yamaoka (Spirit)",
        "CHARACTER_TRAPPER": "Evan MacMillan (Trapper)",
        "CHARACTER_WRAITH": "Philip Ojomo (Wraith)"
    }
}