export type PortfolioDef = {
    id: string
    name: string
    description: string
    keywords: string[]
    language: string
    pictures: Array<{
        name: string
        description: string
        data: string
    }>
    url: string
    order: number
}

export type EditPortfolioStructure = {
    index: number
    portfolio: PortfolioDef
}

export type PortfolioRequest = {
    portfolio?: PortfolioDef[]
    putPortfolio?: PortfolioDef[]
}
