export type LanguageInterface = {
    id: string
    name: String,
    certification: String,
    school: String,
    school_url: String,
    written_level: String,
    spoken_level: String,
    keywords: [],
    language: String
}


export type LanguagesFetched = {
    Skills: LanguageInterface[]
}