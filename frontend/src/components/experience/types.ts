export type experience = {
    company: string
    company_url: string
    start_date: number
    finish_date: number
    role: string
    description: string
    details: string[],
    type: string,
    order: number
}

export type PropDef = {
    name: string
    language: string
    experiences: experience[]
    reference: React.Ref<any>
    translations: string[]
}