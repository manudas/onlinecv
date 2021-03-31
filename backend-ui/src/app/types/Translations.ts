import { Observable } from "rxjs"

export type RequestedTranslations = {
    [component: string]: string[]
}

export type ModuleTagPairType = {
    module_arr: string[]
    tag_arr: string[]
}

export type ActionRequestTranslation = {
    iso: string
    modules: string[]
    tags: string[]
}

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
