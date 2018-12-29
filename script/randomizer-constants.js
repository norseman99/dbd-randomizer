const SLOT_MACHINE_DELAY = 500;
const DELAY_BEFORE_CHARACTER_ROLE = 150;
const SHOW_ROLE_RESULT_TIME = 200;
const ROLE_SLOT_SHUFFLE_TIME = 500; // the duration of the role shuffle in ms
const PERK_SLOT_SHUFFLE_TIME = 500; // the duration of the perk shuffle in ms
const CHARACTER_SLOT_SHUFFLE_TIME = 500; // the duration of the character shuffle in ms
const ADDONS_SLOT_SHUFFLE_TIME = 5000; // the duration of the addons shuffle in ms

const ROLES = [
    'killer',
    'survivor'
];

const SURVIVORS = [
    'dwight',
    'meg',
    'claudette',
    'jake',
    'jeff',
    'nea',
    'bill',
    'david',
    'laurie',
    'ace',
    'feng',
    'quentin',
    'tapp',
    'kate',
    'francis'
]; // list of all available survivors

const KILLERS = [
    'clown',
    'doctor',
    'freddy',
    'hag',
    'hillbilly',
    'huntress',
    'leatherface',
    'legion',
    'myers',
    'nurse',
    'pig',
    'spirit',
    'trapper',
    'wraith'
]; // list of all available killers

const KILLER_PERKS = [
    'agitation',
    'aNursesCalling',
    'bamboozle',
    'BBQAndChili',
    'BeastOfPrey',
    'bitterMurmur',
    'bloodhound',
    'bloodWarden',
    'brutalStrength',
    'coulrophobia',
    'deerstalker',
    'devourHope',
    'discordance',
    'distressing',
    'dyingLight',
    'enduring',
    'fireUp',
    'franklinsLoss',
    'generatorOvercharge',
    'hangmansTrick',
    'hatred',
    'hauntedGround',
    'HuntressLullaby',
    'insidious',
    'ironGrasp',
    'ironMaiden',
    'knockOut',
    'lightborn',
    'madGrit',
    'makeYourChoice',
    'monitorAndAbuse',
    'monstrousShrine',
    'noOneEscapesDeath',
    'overwhelmingPresence',
    'playWithYourFood',
    'popGoesTheWeasel',
    'predator',
    'rememberMe',
    'ruin',
    'saveTheBestForLast',
    'shadowborn',
    'sloppyButcher',
    'spiesFromTheShadows',
    'spiritFury',
    'stridor',
    'surveillance',
    'territorialImperative',
    'thatanophobia',
    'theThirdSeal',
    'thrillOfTheHunt',
    'tinkerer',
    'unnervingPresence',
    'unrelenting',
    'whispers'
]; // list of all killers perks

const SURVIVOR_PERKS = [
    'aceInTheHole',
    'adrenaline',
    'aftercare',
    'alert',
    'autodidact',
    'balancedLanding',
    'boilOver',
    'bond',
    'borrowedTime',
    'botanyKnowledge',
    'breakdown',
    'calmSpirit',
    'danceWithMe',
    'darkSense',
    'DeadHard',
    'decisiveStrike',
    'dejaVu',
    'deliverance',
    'detectivesHunch',
    'distortion',
    'diversion',
    'empathy',
    'hope',
    'ironWill',
    'kindred',
    'leader',
    'leftBehind',
    'lightweight',
    'lithe',
    'NoMither',
    'noOneLeftBehind',
    'objectOfObsession',
    'openHanded',
    'pharmacy',
    'plunderersInstinct',
    'premonition',
    'proveThyself',
    'quickAndQuiet',
    'resilience',
    'saboteur',
    'selfCare',
    'slipperyMeat',
    'smallGame',
    'soleSurvivor',
    'spineChill',
    'sprintBurst',
    'stakeOut',
    'streetwise',
    'technician',
    'tenacity',
    'thisIsNotHappening',
    'unbreakable',
    'upTheAnte',
    'urbanEvasion',
    'vigil',
    'wakeUp',
    'wellMakeIt',
    'WereGonnaLiveForever',
    'windowsOfOpportunity'
]; // list of all survivor perks

const RARE_PERKS = [
    'bamboozle',
    'BeastOfPrey',
    'deerstalker',
    'discordance',
    'enduring',
    'fireUp',
    'hangmansTrick',
    'ironGrasp',
    'knockOut',
    'overwhelmingPresence',
    'predator',
    'sloppyButcher',
    'spiritFury',
    'stridor',
    'thrillOfTheHunt',
    'unnervingPresence',
    'balancedLanding',
    'bond',
    'breakdown',
    'diversion',
    'empathy',
    'ironWill',
    'leftBehind',
    'lightweight',
    'plunderersInstinct',
    'quickAndQuiet',
    'slipperyMeat',
    'smallGame',
    'technician',
    'tenacity',
    'wakeUp',
    'WereGonnaLiveForever',
    'windowsOfOpportunity'
];

const KILLER_POWERS = {
    'clown': {
        image: 'gasBomb',
        addons: []
    },
    'doctor': {
        image: 'cartersSpark',
        addons: []
    },
    'freddy': {
        image: 'dreamMaster',
        addons: []
    },
    'hag': {
        image: 'blackenedCatalyst',
        addons: []
    },
    'hillbilly': {
        image: 'chainsaw',
        addons: [
            { name: 'Vegetable Oil', image: 'vegetableOil', rarity: 'common' },
            { name: 'Spark Plug', image: 'sparkPlug', rarity: 'common' },
            { name: 'Chainsaw File', image: 'chainsawFile', rarity: 'common' },
            { name: 'Spiked Boots', image: 'spikedBoots', rarity: 'uncommon' },
            { name: 'Speed Limiter', image: 'speedLimiter', rarity: 'uncommon' },
            { name: 'Shop Lubricant', image: 'shopLubricant', rarity: 'uncommon' },
            { name: 'Primer Bulb', image: 'primerBulb', rarity: 'uncommon' },
            { name: 'Long Guide Bar', image: 'longGuideBar', rarity: 'uncommon' },
            { name: 'Homemade Muffler', image: 'homemadeMuffler', rarity: 'uncommon' },
            { name: 'Grisly Chains', image: 'chainsGrisly', rarity: 'uncommon' },
            { name: 'Depth Gauge Rake', image: 'depthGaugeRake', rarity: 'uncommon' },
            { name: 'Death Engravings', image: 'deathEngravings', rarity: 'uncommon' },
            { name: 'The Thompson\'s Mix', image: 'theThompsonsMix', rarity: 'rare' },
            { name: 'Rusted Chains', image: 'chainsRusted', rarity: 'rare' },
            { name: 'Light Chassis', image: 'lightChassis', rarity: 'rare' },
            { name: 'Doom Engravings', image: 'doomEngravings', rarity: 'rare' },
            { name: 'Carburettor Tuning Guide', image: 'carburetorTuningGuide', rarity: 'rare' },
            { name: 'Thompson\'s Moonshine', image: 'thompsonsMoonshine', rarity: 'veryrare' },
            { name: 'Begrimed Chains', image: 'chainsBloody2', rarity: 'veryrare' }
        ]
    },
    'huntress': {
        image: 'huntingHatchets',
        addons: []
    },
    'leatherface': {
        image: 'bubbasChainsaw',
        addons: []
    },
    'legion': {
        image: 'feralFrenzy',
        addons: []
    },
    'myers': {
        image: 'stalker3',
        addons: []
    },
    'nurse': {
        image: 'breath',
        addons: []
    },
    'pig': {
        image: 'reverseBearTrap',
        addons: []
    },
    'spirit': {
        image: 'yamaokasHaunting',
        addons: []
    },
    'trapper': {
        image: 'trap',
        addons: [
            { name: 'Trapper Sack', image: 'trapperSack', rarity: 'common' },
            { name: 'Trapper Gloves', image: 'trapperGloves', rarity: 'common' },
            { name: 'Strong Coil Spring', image: 'coilSpring', rarity: 'common' },
            { name: 'Padded Jaws', image: 'paddedJaws', rarity: 'common' },
            { name: 'Trapper Bag', image: 'trapperBag', rarity: 'uncommon' },
            { name: 'Trap Setters', image: 'tapSetters', rarity: 'uncommon' },
            { name: 'Serrated Jaws', image: 'serratedJaws', rarity: 'uncommon' },
            { name: 'Logwood Dye', image: 'logwoodDye', rarity: 'uncommon' },
            { name: '4-Coil Spring Kit', image: 'coilsKit4', rarity: 'uncommon' },
            { name: 'Wax Brick', image: 'waxBrick', rarity: 'rare' },
            { name: 'Tar Bottle', image: 'tarBottle', rarity: 'rare' },
            { name: 'Setting Tools', image: 'settingTools', rarity: 'rare' },
            { name: 'Secondary Coil', image: 'secondaryCoil', rarity: 'rare' },
            { name: 'Rusted Jaws', image: 'rustedJaws', rarity: 'rare' },
            { name: 'Stitched Bag', image: 'stichedBag', rarity: 'veryrare' },
            { name: 'Oily Coil', image: 'oilyCoil', rarity: 'veryrare' },
            { name: 'Honing Stone', image: 'honingStone', rarity: 'veryrare' },
            { name: 'Fastening Tools', image: 'fasteningTools', rarity: 'veryrare' },
            { name: 'Iridescent Stone', image: 'diamondStone', rarity: 'ultra' },
            { name: 'Bloody Coil', image: 'bloodyCoil', rarity: 'ultra' }
        ]
    },
    'wraith': {
        image: 'bell',
        addons: [
            { name: '"The Serpent" - Soot', image: 'sootTheSerpent', rarity: 'common' },
            { name: '"The Hound" - Soot', image: 'sootTheHound', rarity: 'common' },
            { name: '"The Ghost" - Soot', image: 'sootTheGhost', rarity: 'common' },
            { name: '"The Beast" - Soot', image: 'sootTheBeast', rarity: 'common' },
            { name: 'Bone Clapper', image: 'boneClapper', rarity: 'uncommon' },
            { name: '"Blink" - Mud', image: 'mudBlink', rarity: 'uncommon' },
            { name: '"Windstorm" - Mud', image: 'mudWindstorm', rarity: 'uncommon' },
            { name: '"Swift Hunt" - Mud', image: 'mudSwiftHunt', rarity: 'uncommon' },
            { name: '"Blind Warrior" - Mud', image: 'mudBaikraKaeug', rarity: 'uncommon' },
            { name: '"Windstorm" - White', image: 'whiteWindstorm', rarity: 'rare' },
            { name: '"Swift Hunt" - White', image: 'whiteKuntinTakkho', rarity: 'rare' },
            { name: '"Shadow Dance" - White', image: 'whiteBlink', rarity: 'rare' },
            { name: '"Blink" - White', image: 'whiteShadowDance', rarity: 'rare' },
            { name: '"Blind Warrior" - White', image: 'whiteBlindWarrior', rarity: 'rare' },
            { name: '"Windstorm" - Blood', image: 'bloodWindstorm', rarity: 'veryrare' },
            { name: '"Swift Hunt" - Blood', image: 'bloodSwiftHunt', rarity: 'veryrare' },
            { name: '"Shadow Dance" - Blood', image: 'bloodShadowDance', rarity: 'veryrare' },
            { name: '"All Seeing" - Blood', image: 'bloodKraFabai', rarity: 'veryrare' },
            { name: 'Coxcombed Clapper', image: 'coxcombedClapper', rarity: 'ultra' },
            { name: '"All Seeing" - Spirit', image: 'spiritAllSeeing', rarity: 'ultra' },

        ]
    }
}

const POWER_ADDONS = {
    'clown': [],
    'doctor': [
        'calmCartersNotes',
        'calmClassI',
        'calmClassII',
        'diciplineCartersNote',
        'diciplineClassII',
        'diciplineClassIII',
        'highStimulusElectrod',
        'interviewTape',
        'iridescentKing',
        'mapleKnight',
        'moldyElectrode',
        'obedienceCartersNote',
        'orderCartersNotes',
        'orderClassI',
        'orderClassII',
        'polishedElectrode',
        'restraintCartersNote',
        'restraintClassII',
        'restraintClassIII',
        'scrappedTape',
        'classPhoto',
        'gardenRake',
        'greenDress',
        'jumpRope',
        'kidsDrawing',
        'nancysMasterpiece',
        'nancysSketch',
        'outdoorRope',
        'paintThinner',
        'pillBottle',
        'prototypeClaw',
        'redPaintBrush',
        'sheepBlock',
        'swingChains',
        'unicornBlock',
        'woolShirt',
        'zBlock'
    ],
    'hag': [
        'bloodiedMud',
        'bloodiedWater',
        'bogWater',
        'crackedTurtleEgg',
        'cypressNecklet',
        'deadFlyMud',
        'disfiguredEar',
        'dragonflyWings',
        'driedCicada',
        'granmasHeart',
        'halfEggshell',
        'mintRag',
        'powderedEggshell',
        'pussyWillowCatkins',
        'ropeNecklet',
        'rustyShackles',
        'scarredHand',
        'swampOrchidNecklet',
        'waterloggedShoe',
        'willowWreath'
    ],
    'hillbilly': {},
    'huntress': [
        'amanitaToxin',
        'bandagedHalf',
        'begrimedHead',
        'berusToxin',
        'coarseStone',
        'deerskinGloves',
        'fineStone',
        'flowerBabushka',
        'glowingConcoction',
        'infantryBelt',
        'irisdescentHead',
        'leatherLoop',
        'mannaGrassBraid',
        'oakHaft',
        'pungenFiale',
        'rustyHead',
        'shinyPin',
        'shinyPin2',
        'venomousConcoction',
        'yewSeedBrew',
        'yewSeedConcoction'
    ],
    'leatherface': [
        'awardwinningChili',
        'chili',
        'knifeScratches',
        'theBeastsMark',
        'theGrease'
    ],
    'myers': [
        'blondeHair',
        'boyfriendsMemo',
        'deadRabbit',
        'glassFragment',
        'hairBow',
        'hairBrush',
        'jewelry',
        'jewelryBox',
        'jMyersMemorial',
        'judithsJournal',
        'judithsTombstone',
        'lockOfHair',
        'memorialFlower',
        'memorialFlower2',
        'mirrorShard',
        'reflectiveFragment',
        'scratchedMirror',
        'tackyEarrings',
        'tombstonePiece',
        'tuftOfHair',
        'vanityMirror'
    ],
    'nurse': [],
    'pig': [],
    'spirit': [],
    'trapper': [
    ],
    'wraith': []
};

const SURVIVOR_ITEMS = {
    'brokenKey': 'key',
    'dullKey2': 'key',
    'key': 'key',
    'chineseFirecracker': 'firecracker',
    'winterEventFirecracker': 'firecracker',
    'firstAidKit': 'medkit',
    'medkit': 'medkit',
    'rangersAidKit': 'medkit',
    'rundownAidKit': 'medkit',
    'flashlight': 'flashlight',
    'flashlightSport': 'flashlight',
    'flashlightUtility': 'flashlight',
    'map': 'map',
    'rainbowMap': 'map',
    'toolbox': 'toolbox',
    'toolboxAlexs': 'toolbox',
    'toolboxCommodious': 'toolbox',
    'toolboxEnginners': 'toolbox',
    'toolboxMechanics': 'toolbox',
    'toolboxWornOut': 'toolbox'
};

const ITEMS_ADDONS =  {
    'key': [
        'bloodAmber',
        'milkyGlass',
        'prayerBeads',
        'prayerRope',
        'scratchedPearl',
        'tokenErroded',
        'tokenGold',
        'weavedRing'
    ],
    'medkit': [],
    'flashlight': [],
    'map': [],
    'toolbox': []
};

const KILLER_OFFERS = [

];

const SURVIVOR_OFFERS = [

];