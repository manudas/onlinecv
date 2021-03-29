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
}