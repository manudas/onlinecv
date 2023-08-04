export type PortfolioDef = {
    id: string
    name: string
    description: string
    keywords: string[]
    language: string
    picture: string[]
    url: string
    order: number
}

export type EditPortfolioStructure = {
    index: number
    portfolio: PortfolioDef
}

export type PortfolioFetched = {
    portfolio: PortfolioDef[]
}
