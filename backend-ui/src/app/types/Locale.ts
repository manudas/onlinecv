export type LocaleType = {
    id: number
    name: string
    iso: string
    default: boolean
};

export type getLocaleTypeRequest = {
    getLocales: LocaleType[]
}

export type LocaleStore = {
    locales: LocaleType[]
    selectedLocale: string // iso code
}

export type SET_LOCALE_ACTION_TYPE = {
    type: string
    iso: string
}
