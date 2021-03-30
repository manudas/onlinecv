import { Injectable } from "@angular/core";
import { RequestedTranslations } from "@app/types/Translations";

@Injectable()
export class TranslationService {
    requestedTranslations: RequestedTranslations  = { } // the translations that are to be requested to the API

    getTranslationsRequest() {
        return this.requestedTranslations
    }

    requestTranslation(tag: string, module: string) {
        this.requestedTranslations[module] = this.requestedTranslations[module] || [];
        if (!this.requestedTranslations[module].includes(tag)) {
            this.requestedTranslations[module].push(tag);
        }
    }

    getModuleTagPairs = (translations: RequestedTranslations): {
        module_arr: string[],
        tag_arr: string[]
      } => {
        const result = {
          module_arr: [],
          tag_arr: []
        }
        // Object.entries(payload).forEach(([key, value])
        const indexValueList = Object.entries(translations);
        indexValueList.forEach(([key, value]) => {
          result.module_arr.push(key) // key is the name of the module for which we are looking the translation for
          result.tag_arr.push(value) // value represents the tag we are looking the translation for inside its module
        })

        return result
    }
}