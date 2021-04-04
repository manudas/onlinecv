/*
 * shape of a social Network in MongoDB:
 *
    id: ID!
    language: String!,
    label: String!,
    description: String,
    url: String!,
    keywords: [String]!,
    order: Int!
 *
 */
export type SocialNetwork = {
    id: string // needed to update a Social Network
    label: string
    description: string
    url: string
    order: number
}