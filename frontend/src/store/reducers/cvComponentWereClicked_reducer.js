import { cvComponentsWereClicked } from '../actions';
// State argument is not application state, only the state
// this reducer is responsible for
export default function (state = null, action) {
    let payload = action.payload;
    switch (action.type) {
        case cvComponentsWereClicked:
            let result = payload;
            if (!payload) {
                result = (state && state.component_clicked_data ) 
                                            ? state.component_clicked_data : null;
            }
			return result;
		default:	
    }
    return state;
}