import { Observable } from "rxjs"

export type TranslationsType = {
    [iso: string]: {
        [component: string]: {
            [key: string] : string
        }
    }
}

export type StoredTranslationsObservable = {
    [iso: string]: {
        [component: string]: {
            [key: string] : Observable<string>
        }
    }
}

export type TranslationStore = {
    translations: TranslationsType
}