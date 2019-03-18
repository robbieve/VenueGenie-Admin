import _ from 'lodash'
import {
    CREATE_VENUE,
    DELETE_VENUE,
    FETCH_VENUES,
    VENUES_RECEIVED,
} from '../../constants/actionTypes';

const initialState = {
    venues: [],
};

const reducer = (state = initialState, action: any) => {
    let newState = _.cloneDeep(state);
    
    switch(action.type) {
        case FETCH_VENUES:
        
            return newState
        case VENUES_RECEIVED:
        newState.venues = action.payload
            return newState
        default:
            return state;
    }
};

export default reducer;