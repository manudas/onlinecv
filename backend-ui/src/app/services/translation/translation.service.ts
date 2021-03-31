import { Injectable } from "@angular/core";
import { ModuleTagPairType, RequestedTranslations } from "@app/types/Translations";

@Injectable()
export class TranslationService {
    requestedTranslations: RequestedTranslations  = { } // the translations that are to be requested to the API

    getTranslationsRequest() {
        return this.requestedTranslations
    }

    requestTranslation(tag: string, module: string) {
        if (tag) { // let's avoid empty or undefined tags
            this.requestedTranslations[module] = this.requestedTranslations[module] || [];
            if (!this.requestedTranslations[module].includes(tag)) {
                this.requestedTranslations[module].push(tag);
            }
        }
    }

    getModuleTagPairs = (translations: RequestedTranslations): ModuleTagPairType => {
        const result = {
          module_arr: [],
          tag_arr: []
        }
        // Object.entries(payload).forEach(([key, value])
        const indexValueList = Object.entries(translations);
        indexValueList.forEach(([key, value]) => {
          const keyArr = Array(value.length).fill(key) // fills the array with the key values.length times
          result.module_arr.push(...keyArr) // key is the name of the module for which we are looking the translation for
          result.tag_arr.push(...value) // value represents the tag we are looking the translation for inside its module
        })

        return result
    }
}