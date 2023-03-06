export type ReferenceDef = {
    id: string
    name: string
    role: string
    description: string
    company: string
    company_url: string
    keywords: string[]
    language: string
    phone: string
    email: string
    order: number
}

export type EditReferenceStructure = {
    index: number
    reference: ReferenceDef
}

export type ReferencesFetched = {
    references: ReferenceDef[]
}
