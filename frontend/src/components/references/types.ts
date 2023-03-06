export type reference = {
    name: string,
    role: string,
    description: string,
    company: string,
    company_url: string,
    keywords: Array<string>,
    language: string,
    phone: string,
    email: string,
    order: number,
}

export type PropDef = {
    name: string
    language: string
    references: reference[]
    reference: React.Ref<any>
    translations: string[]
}