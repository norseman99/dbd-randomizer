const SLOT_MACHINE_DELAY = 500;
const DELAY_BEFORE_CHARACTER_ROLE = 150;
const SHOW_ROLE_RESULT_TIME = 200;
const ROLE_SLOT_SHUFFLE_TIME = 500; // the duration of the role shuffle in ms
const PERK_SLOT_SHUFFLE_TIME = 500; // the duration of the perk shuffle in ms
const CHARACTER_SLOT_SHUFFLE_TIME = 500; // the duration of the character shuffle in ms
const ADDONS_SLOT_SHUFFLE_TIME = 500; // the duration of the addons shuffle in ms

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
        addons: [
            { name: 'Mouldy Electrode', image: 'moldyElectrode', rarity: 'common' },
            { name: 'Maple Knight', image: 'mapleKnight', rarity: 'common' },
            { name: '"Order" - Class I', image: 'orderClassI', rarity: 'common' },
            { name: '"Calm" - Class I', image: 'calmClassI', rarity: 'common' },
            { name: 'Scrapped Tape', image: 'scrappedTape', rarity: 'uncommon' },
            { name: 'Polished Electrode', image: 'polishedElectrode', rarity: 'uncommon' },
            { name: 'Interview Tape', image: 'interviewTape', rarity: 'uncommon' },
            { name: '"Restraint" - Class II', image: 'restraintClassII', rarity: 'uncommon' },
            { name: '"Order" - Class II', image: 'diciplineClassII', rarity: 'uncommon' },
            { name: '"Discipline" - Class II', image: 'orderClassII', rarity: 'uncommon' },
            { name: '"Calm" - Class II', image: 'calmClassII', rarity: 'uncommon' },
            { name: 'High Stimulus Electrode', image: 'highStimulusElectrode', rarity: 'rare' },
            { name: '"Restraint" - Class III', image: 'restraintClassIII', rarity: 'rare' },
            { name: '"Discipline" - Class III', image: 'diciplineClassIII', rarity: 'rare' },
            { name: '"Restraint" - Carter\'s Notes', image: 'restraintCartersNotes', rarity: 'veryrare' },
            { name: '"Order" - Carter\'s Notes', image: 'orderCartersNotes', rarity: 'veryrare' },
            { name: '"Obedience" - Carter\'s Notes', image: 'obedienceCartersNotes', rarity: 'veryrare' },
            { name: '"Discipline" - Carter\'s Notes', image: 'diciplineCartersNotes', rarity: 'veryrare' },
            { name: '"Calm" - Carter\'s Notes', image: 'calmCartersNotes', rarity: 'veryrare' },
            { name: 'Iridescent King', image: 'iridescentKing', rarity: 'ultra' }
        ]
    },
    'freddy': {
        image: 'dreamMaster',
        addons: [
            { name: 'Wool Shirt', image: 'woolShirt', rarity: 'common' },
            { name: 'Sheep Block', image: 'sheepBlock', rarity: 'common' },
            { name: 'Kid\'s Drawing', image: 'kidsDrawing', rarity: 'common' },
            { name: 'Garden Rake', image: 'gardenRake', rarity: 'common' },
            { name: 'Prototype Claws', image: 'prototypeClaw', rarity: 'uncommon' },
            { name: 'Outdoor Rope', image: 'outdoorRope', rarity: 'uncommon' },
            { name: 'Nancy\'s Sketch', image: 'nancysSketch', rarity: 'uncommon' },
            { name: 'Green Dress', image: 'greenDress', rarity: 'uncommon' },
            { name: 'Cat Block', image: 'catBlock', rarity: 'uncommon' },
            { name: 'Unicorn Block', image: 'unicornBlock', rarity: 'rare' },
            { name: 'Swing Chains', image: 'swingChains', rarity: 'rare' },
            { name: 'Nancy\'s Masterpiece', image: 'nancysMasterpiece', rarity: 'rare' },
            { name: 'Jump Rope', image: 'jumpRope', rarity: 'rare' },
            { name: 'Blue Dress', image: 'blueDress', rarity: 'rare' },
            { name: 'Pill Bottle', image: 'pillBottle', rarity: 'veryrare' },
            { name: 'Paint Thinner', image: 'paintThinner', rarity: 'veryrare' },
            { name: 'Class Photo', image: 'classPhoto', rarity: 'veryrare' },
            { name: '"Z" Block', image: 'zBlock', rarity: 'veryrare' },
            { name: 'Red Paint Brush', image: 'redPaintBrush', rarity: 'ultra' },
            { name: 'Black Box', image: 'blackBox', rarity: 'ultra' }
        ]
    },
    'hag': {
        image: 'blackenedCatalyst',
        addons: [
            { name: 'Rope Necklet', image: 'ropeNecklet', rarity: 'common' },
            { name: 'Powdered Eggshell', image: 'powderedEggshell', rarity: 'common' },
            { name: 'Dead Fly Mud', image: 'deadFlyMud', rarity: 'common' },
            { name: 'Bog Water', image: 'bogWater', rarity: 'common' },
            { name: 'Pussy Willow Catkins', image: 'pussyWillowCatkins', rarity: 'uncommon' },
            { name: 'Half Eggshell', image: 'halfEggshell', rarity: 'uncommon' },
            { name: 'Dragonfly Wings', image: 'dragonflyWings', rarity: 'uncommon' },
            { name: 'Cypress Necklet', image: 'cypressNecklet', rarity: 'uncommon' },
            { name: 'Bloodied Water', image: 'bloodiedWater', rarity: 'uncommon' },
            { name: 'Willow Wreath', image: 'willowWreath', rarity: 'rare' },
            { name: 'Swamp Orchid Necklet', image: 'swampOrchidNecklet', rarity: 'rare' },
            { name: 'Dried Cicada', image: 'driedCicada', rarity: 'rare' },
            { name: 'Cracked Turtle Egg', image: 'crackedTurtleEgg', rarity: 'rare' },
            { name: 'Bloodied Mud', image: 'bloodiedMud', rarity: 'rare' },
            { name: 'Scarred Hand', image: 'scarredHand', rarity: 'veryrare' },
            { name: 'Rusty Shackles', image: 'rustyShackles', rarity: 'veryrare' },
            { name: 'Granma\'s Heart', image: 'granmasHeart', rarity: 'veryrare' },
            { name: 'Disfigured Ear', image: 'disfiguredEar', rarity: 'veryrare' },
            { name: 'Waterlogged Shoe', image: 'waterloggedShoe', rarity: 'ultra' },
            { name: 'Mint Rag', image: 'mintRag', rarity: 'ultra' }
        ]
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
        addons: [
            { name: 'Coarse Stone', image: 'coarseStone', rarity: 'common' },
            { name: 'Berus Toxin', image: 'berusToxin', rarity: 'common' },
            { name: 'Bandaged Haft', image: 'bandagedHaft', rarity: 'common' },
            { name: 'Amanita Toxin', image: 'amanitaToxin', rarity: 'common' },
            { name: 'Yew Seed Brew', image: 'yewSeedBrew', rarity: 'uncommon' },
            { name: 'Shiny Pin', image: 'shinyPin', rarity: 'uncommon' },
            { name: 'Oak Haft', image: 'oakHaft', rarity: 'uncommon' },
            { name: 'Manna Grass Braid', image: 'mannaGrassBraid', rarity: 'uncommon' },
            { name: 'Leather Loop', image: 'leatherLoop', rarity: 'uncommon' },
            { name: 'Fine Stone', image: 'fineStone', rarity: 'uncommon' },
            { name: 'Deerskin Gloves', image: 'deerskinGloves', rarity: 'uncommon' },
            { name: 'Yew Seed Concoction', image: 'yewSeedConcoction', rarity: 'rarity' },
            { name: 'Venomous Concoction', image: 'venomousConcoction', rarity: 'rarity' },
            { name: 'Rusty Head', image: 'rustyHead', rarity: 'rarity' },
            { name: 'Pungent Phial', image: 'pungentFiale', rarity: 'rarity' },
            { name: 'Flower Babushka', image: 'flowerBabushka', rarity: 'rarity' },
            { name: 'Infantry Belt', image: 'infantryBelt', rarity: 'veryrare' },
            { name: 'Glowing Concoction', image: 'glowingConcoction', rarity: 'veryrare' },
            { name: 'Begrimed Head', image: 'begrimedHead', rarity: 'veryrare' },
            { name: 'Iridescent Head', image: 'iridescentHead', rarity: 'ultra' }
        ]
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
        addons: [
            { name: '', image: 'blondeHair', rarity: 'common' },
            { name: '', image: 'boyfriendsMemo', rarity: 'common' },
            { name: '', image: 'deadRabbit', rarity: 'common' },
            { name: '', image: 'glassFragment', rarity: 'common' },
            { name: '', image: 'hairBow', rarity: 'common' },
            { name: '', image: 'hairBrush', rarity: 'common' },
            { name: '', image: 'jewelry', rarity: 'common' },
            { name: '', image: 'jewelryBox', rarity: 'common' },
            { name: '', image: 'jMyersMemorial', rarity: 'common' },
            { name: '', image: 'judithsJournal', rarity: 'common' },
            { name: '', image: 'judithsTombstone', rarity: 'common' },
            { name: '', image: 'lockOfHair', rarity: 'common' },
            { name: '', image: 'memorialFlower', rarity: 'common' },
            { name: '', image: 'memorialFlower2', rarity: 'common' },
            { name: '', image: 'mirrorShard', rarity: 'common' },
            { name: '', image: 'reflectiveFragment', rarity: 'common' },
            { name: '', image: 'scratchedMirror', rarity: 'common' },
            { name: '', image: 'tackyEarrings', rarity: 'common' },
            { name: '', image: 'tombstonePiece', rarity: 'common' },
            { name: '', image: 'tuftOfHair', rarity: 'common' },
            { name: '', image: 'vanityMirror', rarity: 'common' }
        ]
    },
    'nurse': {
        image: 'breath',
        addons: [
            { name: '', image: 'anxiousGasp', rarity: 'common' },
            { name: '', image: 'ataxicRespiration', rarity: 'common' },
            { name: '', image: 'badManKeepsake', rarity: 'common' },
            { name: '', image: 'badMansLastBreath', rarity: 'common' },
            { name: '', image: 'campbellsLastBreath', rarity: 'common' },
            { name: '', image: 'catatonicTreasure', rarity: 'common' },
            { name: '', image: 'darkCincture', rarity: 'common' },
            { name: '', image: 'dullBracelet', rarity: 'common' },
            { name: '', image: 'fragileWheeze', rarity: 'common' },
            { name: '', image: 'heavyPanting', rarity: 'common' },
            { name: '', image: 'jennersLastBreath', rarity: 'common' },
            { name: '', image: 'kavanaghsLastBreath', rarity: 'common' },
            { name: '', image: 'matchBox', rarity: 'common' },
            { name: '', image: 'metalSpoon', rarity: 'common' },
            { name: '', image: 'plaidFlannel', rarity: 'common' },
            { name: '', image: 'pocketWatch', rarity: 'common' },
            { name: '', image: 'spasmodicBreath', rarity: 'common' },
            { name: '', image: 'tornBookmark', rarity: 'common' },
            { name: '', image: 'whiteNitComb', rarity: 'common' },
            { name: '', image: 'woodenHorse', rarity: 'common' }
        ]
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
            { name: '"All Seeing" - Spirit', image: 'spiritAllSeeing', rarity: 'ultra' }
        ]
    }
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