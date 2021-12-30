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
    tags: string[],
    domain: string
}

export type TranslationInterface = {
    id: string
    language: string
    module?: string
    tag: string
    text: string
}

export type PutTranslation = {
    putTranslation: TranslationInterface
}

export type RemovedTranslation = {
    removeTranslation: TranslationInterface
}

export type TranslatedTranslations = {
    translatedStrings: TranslationInterface[]
}

export type ReceivedTranslationsType = {
    translations: TranslationInterface[]
    missingTranslations?: TranslationInterface[]
}

export type InternalStoredTranslationInterface = {
    initialTranslation: string
    translation?: TranslationInterface
}


export type TranslationsType = {
    [iso: string]: {
        [component: string]: {
            [key: string] : InternalStoredTranslationInterface
        }
    }
}

export type TranslationsObservableStore = {
    [iso: string]: {
        [component: string]: {
            [key: string] : Subject<string>
        }
    }
}

export enum TranslationEnum {
    all,
    missing,
    translated
}

export type EditTranslationStructure = {
    index: number
    translation: TranslationInterface
    isMissing: boolean
}

export type TranslationStore = ReceivedTranslationsType & {
    translationManager: {
        missing: TranslationInterface[],
        translated: TranslationInterface[]
    }
}
