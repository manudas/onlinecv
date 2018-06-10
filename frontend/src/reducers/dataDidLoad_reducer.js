import { dataLoaded } from '../actions';
// State argument is not application state, only the state
// this reducer is responsible for
export default function (state = null, action) {
    let payload = action.payload;
    switch (action.type) {
        case dataLoaded:
            var result = {...payload};
            if (!payload.images || !payload.images.bgimage) {
                result.images.bgimage = (state && state.images && state.images.bgimage) 
                                            ? state.images.bgimage : null;
            }
            if (!payload.images || !payload.images.profileImage){
                result.images.profileImage = (state && state.images && state.images.profileImage)
                                                ? state.images.profileImage : null;
            }
            return result;
    }
    return state;
}