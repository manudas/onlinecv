export type ResumeDef = {
    id?: string
    data: string
    keywords?: string[]
    language: string
}

export type ResumeFetched = {
    resume: ResumeDef
}
