import { Subject } from "rxjs"

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

export type DBTranslation = {
    id: string
    language: string
    module?: string
    tag: string
    text: string
}

export type ReceivedTranslationsType = {
    translations: DBTranslation[]
}

export type InternalStoredTranslationInterface = {
    initialTranslation: string
    translation?: DBTranslation
}


export type TranslationsType = {
    [iso: string]: {
        [component: string]: {
            [key: string] : InternalStoredTranslationInterface
        }
    }
}

export type StoredTranslationsObservable = {
    [iso: string]: {
        [component: string]: {
            [key: string] : Subject<string>
        }
    }
}

export type TranslationStore = ReceivedTranslationsType
