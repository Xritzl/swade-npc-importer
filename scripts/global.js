// this module... obviously
export const thisModule = "swade-npc-importer";

// module defaults and registered settings
export const settingPackageToUse = "packageToUse";
export const settingAdditionalTraits = "additionalStats";
export const settingDefaultDisposition = "defaultDisposition";
export const settingDefaultActorType = "defaultActorType";
export const settingDefaultIsWildcard = "defaultIsWildcard";
export const settingBulletPointIcons = "bulletPointIcons";
export const settingLastSaveFolder = "lastSaveFolder";
export const settingCompsToUse = "compsToUse";
export const settingActiveCompendiums = "activeCompendiums"

// global logger
export const log = function (msg) {
    console.log(`SWADE NPC Importer | ${msg}`)
}

// regex
export const newLineRegex = /\r\n|\n|\r/g;
export const newLineAndBullet = /\r\n\W|\n\W|\r\W/g;
export const diceRegex = /(\d+)?d(\d+)([\+\-]\d+)?/g;
export const closingParenthesis = /\)/g;
export const gearParsingRegex = /(^[\w\s]+)(\(([^()]+)\))?,?/gi;
export const meleeDamageRegex = /Str\.|Str[\+\-](\d+)?d?(\d+)?[\+\-]?(\d+)?d?(\d+)/g;
export const weaponRangeRegex = /\d+\/\d+\/\d+/g;
export const armorModRegex = /\+\d+/;
export const parryModRegex = new RegExp(`(+\\d|\\-\\d) ${game.i18n.localize("Parser.Parry")}`, "gi")  // /(\+\d|\-\d) Parry/gi;
export const coverModRegex = new RegExp(`(+\\d|\\-\\d) ${game.i18n.localize("Parser.Cover")}`, "gi")  // /(\+\d|\-\d) Cover/gi;

// traits to use
export const attributesAndSkills = [`${game.i18n.localize("Parser.Attributes")}:`, `${game.i18n.localize("Parser.Skills")}:`];
export const supportedListStats = [`${game.i18n.localize("Parser.Hindrances")}:`,`${game.i18n.localize("Parser.Edges")}:`,`${game.i18n.localize("Parser.Powers")}:`];
export const baseStats = [`${game.i18n.localize("Parser.Pace")}:`,`${game.i18n.localize("Parser.Parry")}:`,`${game.i18n.localize("Parser.Toughness")}:`, ,`${game.i18n.localize("Parser.PowerPoints")}:`];
export const gear = [`${game.i18n.localize("Parser.Gear")}:`];
export const supportedBulletListStats = [`${game.i18n.localize("Parser.SpecialAbilities")}:`, `${game.i18n.localize("Parser.SuperPowers")}:`];
export const allStatBlockEntities = attributesAndSkills.concat(supportedListStats, baseStats, supportedBulletListStats, gear);

export const UnshakeBonus = [`${game.i18n.localize("Parser.undead")}`, `${game.i18n.localize("Parser.construct")}`, `${game.i18n.localize("Parser.combatReflexes")}`];
export const IgnoreWound = [`${game.i18n.localize("Parser.undead")}`, `${game.i18n.localize("Parser.construct")}`, `${game.i18n.localize("Parser.elemental")}`];

export const SwadeItems = {
    SKILL: `${game.i18n.localize("Parser.Skill")}`,
    EDGE: `${game.i18n.localize("Parser.Edge")}`,
    HINDRANCE: `${game.i18n.localize("Parser.Hindrance")}`,
    POWER: `${game.i18n.localize("Parser.Power")}`,
    SHIELD: `${game.i18n.localize("Parser.Shield")}`,
    ARMOR: `${game.i18n.localize("Parser.Armor")}`,
    WEAPON: `${game.i18n.localize("Parser.Weapon")}`,
    GEAR: `${game.i18n.localize("Parser.Gear")}`
}

export const GetMeleeDamage = function(abilityDescription){
    let damage = abilityDescription.match(meleeDamageRegex).toString().replace('.', '').toLowerCase();
    return `@${damage}`;
}

export const GetArmorBonus = function(data){
    return parseInt(data.match(armorModRegex)[0]);
}

export const GetParryBonus = function(data){
    return parseInt(data.match(parryModRegex)[0]);
}

export const GetCoverBonus = function(data){
    return parseInt(data.match(coverModRegex)[0]);
}

export const capitalize = function(string){
    return string.replace(/(?:^|\s)\S/g, function(a) { 
        return a.toUpperCase(); 
    });
}

export const capitalizeEveryWord = function(string){
    let capitalizedString = [];
    string.split(' ').forEach( x => {
        capitalizedString.push(capitalize(x.toLowerCase()));
    });
    return capitalizedString.join(' ');
}