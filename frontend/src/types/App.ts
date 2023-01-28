export type propDef = {
    background: string | String | null
    introduction: unknown
    language: string
    resume: unknown
    requestUserDataLoad: (lang: string) => void
    requestTranslations: (lang: string, moduleTagsPairs: {
        tags: Array<string>,
        modules: Array<string>,
        domain: string
    }) => void
    setLanguage: (lang: string, setLangInCookie?: boolean) => void
}

export type stateDef = {
    showPageLoader: boolean
}