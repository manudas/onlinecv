import { TrainingFetched, TrainingInterface } from '@app/types'
import { createAction, props } from '@ngrx/store'

export const SAVE_TRAININGS =  createAction(
    '[Training Component] SaveTrainings',
    props<{
        trainings: TrainingInterface[]
        trainingType: string
    }>()
)

export const FETCH_TRAINING = createAction(
    '[Training Component] FetchTrainings',
    props<{
        language: string
        trainingType: string
    }>()
)

export const TRAINING_FETCHED = createAction(
    '[Training Component] Trainings fetched',
    props<TrainingFetched>()
)

export const REMOVE_TRAINING = createAction(
    '[Training Component] RemoveTraining',
    props<{
        id: string
        trainingType: string
    }>()
)