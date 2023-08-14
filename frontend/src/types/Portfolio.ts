export type PortfolioImage = {
    data: string,
    name?: string,
    description?: string
}

export type PortfolioDef = {
    id: string
    name: string
    description: string
    keywords: string[]
    language: string
    pictures: Array<PortfolioImage>
    url: string
    order: number
}

export type PropDef = {
    name: string
    portfolio: Array<PortfolioDef>
    reference: React.Ref<HTMLElement>
}

export type StateDef = {
    isOpen: boolean
    photoIndex: number
    portfolioName: string
}