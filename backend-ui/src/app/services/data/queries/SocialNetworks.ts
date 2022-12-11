export const QuerySocialNetworks = `
    query QuerySocialNetworks($language: String!) {
        socialNetworks(language: $language) {
            id: _id
            language
            label
            description
            url
            keywords
            order
        }
    }
`;

export const MutateSocialNetworks = `
    mutation MutateSocialNetworks($socialNetworks: [SocialNetworkInput]!) {
        putSocialNetworks(socialNetworks: $socialNetworks) {
            # return id if everything was ok
            id: _id
        }
    }
`;

export const RemoveNetwork = `
    mutation RemoveNetwork($id: ID!) {
        removeSocialNetwork(id: $id)
    }
`;
