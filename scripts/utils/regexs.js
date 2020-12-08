// RegExps used by NPC Importer

export const newLineRegex = /\r\n|\n|\r/g;
export const diceRegex = /(\d+)?d(\d+)([\+\-]\d+)?/g;
export const gearParsingRegex = /(^[\w\s]+)(\(([^()]+)\))?,?/gi;
export const meleeDamageRegex = /Str\.|Str[\+\-](\d+)?d?(\d+)?[\+\-]?(\d+)?d?(\d+)/g;
export const armorModRegex = /\+\d+/;
export const plusMinusNumberRegex = /(\+\d|\-\d)/gi
// export const parryModRegex = new RegExp(`(+\\d|\\-\\d) ${game.i18n.localize("Parser.Parry")}`, "gi"); // /(\+\d|\-\d) Parry/gi;
// export const coverModRegex = new RegExp(`(+\\d|\\-\\d) ${game.i18n.localize("Parser.Cover")}`, "gi"); // /(\+\d|\-\d) Cover/gi;
