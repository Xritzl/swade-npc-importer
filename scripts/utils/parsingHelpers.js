import { meleeDamageRegex, armorModRegex } from "./regexs.js";


export const GetMeleeDamage = function (abilityDescription) {
    let damage = abilityDescription.match(meleeDamageRegex).toString().replace('.', '').toLowerCase();
    return `@${damage}`;
};

export const GetArmorBonus = function (data) {
    return parseInt(data.match(armorModRegex)[0]);
};

export const GetParryBonus = function (data) {
    return parseInt(data.match((new RegExp(`(\\+\d|\\-\d) ${game.i18n.localize("Praser.Parry")}`)))[0]);
};

export const GetCoverBonus = function (data) {
    return parseInt(data.match((new RegExp(`(\\+\d|\\-\d) ${game.i18n.localize("Praser.Cover")}`)))[0]);
};
