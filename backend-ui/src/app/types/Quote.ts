export type QuoteDef = {
    id: string
    author: string
    quote: string
    keywords: string[]
}

// export type EditReferenceStructure = {
//     index: number
//     reference: ReferenceDef
// }

export type QuoteFetched = {
    quote: QuoteDef[]
}
