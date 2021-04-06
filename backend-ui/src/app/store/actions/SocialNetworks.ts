import { SocialNetwork, SocialNetworkFetched } from '@app/types/SocialNetworks'
import { createAction, props } from '@ngrx/store'

export const SAVE_NETWORKS =  createAction(
    '[SocialNetwork/Details Component] SaveSocialNetworks',
    props<{ socialNetworks: SocialNetwork[] }>()
)

export const FETCH_NETWORKS = createAction(
    '[SocialNetwork/Details Component] FetchSocialNetworks',
    props<{ language: string }>()
)

export const NETWORKS_FETCHED = createAction(
    '[SocialNetwork/Details Component] Social Networks fetched',
    props<SocialNetworkFetched>()
)
