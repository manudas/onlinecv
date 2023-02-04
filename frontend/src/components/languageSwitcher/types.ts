export type switcherDev = {
    setLanguage: (args: string) => void
    language: string
    locales: localeDef[]
}

export type selectorTypeDef = {
    lang: string
    handleChangeLanguage: (arg0: string) => void
    locales: localeDef[]
}
export type localeDef = {
    iso: string
    name: string
    flag: string
}

export enum language {
    'deu',
    'en',
    'es'
}