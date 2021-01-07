import { log, settingLastSaveFolder, settingParaeLanguage } from "./global.js"
import { StatBlockParser } from "./parseStatBlock.js";
import { ActorImporter } from "./actorImporter.js";
import { BuildActorData } from "./dataBuilders/buildActorData.js";
import { BuildActorItems } from "./dataBuilders/buildActorItems.js";
import { BuildActorToken } from "./dataBuilders/buildActorToken.js";
import { getFolderId, updateModuleSetting, setParsingLanguage, getModuleSettings } from "./utils/foundryActions.js";
import { SpecialAbilitiesForDescription } from "./utils/textUtils.js";

export const BuildActor = async function (importSettings, data = undefined) {
    let clipboardText = data ?? await GetClipboardText();
    if (clipboardText != undefined) {
        let currentLang = game.i18n.lang;
        await setParsingLanguage(getModuleSettings(settingParaeLanguage));
        let parsedData = await StatBlockParser(clipboardText);
        if (parsedData != undefined) {
            try {
                var finalActor = {}
                finalActor.name = parsedData.Name;
                finalActor.type = importSettings.actorType;
                finalActor.folder = importSettings.saveFolder == '' ? '' : getFolderId(importSettings.saveFolder);
                finalActor.data = await BuildActorData(parsedData, importSettings.isWildCard == 'true');
                finalActor.items = await BuildActorItems(parsedData);
                finalActor.token = await BuildActorToken(parsedData, importSettings.tokenSettings);
                finalActor.data.details.biography.value = await addSpecAbsToDescription(finalActor, parsedData.SpecialAbilities);
                await updateModuleSetting(settingLastSaveFolder, importSettings.saveFolder);
                await setParsingLanguage(currentLang);
                log(`Actor to import: ${JSON.stringify(finalActor)}`);
                await ActorImporter(finalActor);
            } catch (error) {
                log("Failed to build finalActor: " + error);
            } finally {
                await setParsingLanguage(currentLang);
            }
        }
    } else {
        ui.notification.error(game.i18n.localize("npcImporter.parser.EmptyClipboard"))
    }
}

async function GetClipboardText() {
    return await navigator.clipboard.readText();
}

async function addSpecAbsToDescription(finalActor, specAbilities) {
    var desc = finalActor.data.details.biography.value;
    try {
        if (desc.length > 0) {
            desc = `${desc} <hr>`;
        }

        var items = finalActor.items;

        for (const elem in specAbilities) {
            var ability = elem.replace(new RegExp('^@[aehw]?'), '').trim();
            items.forEach(item => {
                if (item.name === ability) {
                    delete specAbilities[elem];
                }
            });
        }
        return Object.keys(specAbilities).length > 0
            ? `${desc} ${SpecialAbilitiesForDescription(specAbilities)}`
            : desc;
    } catch (error) {
        log('Error when parsing special abilities for description');
        return desc;
    }
}