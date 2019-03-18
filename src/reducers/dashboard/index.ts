import _ from 'lodash'
import {
    
} from '../../constants/actionTypes';

const initialState = {
    
};

const reducer = (state = initialState, action: any) => {
    let newState = _.cloneDeep(state);
    
    switch(action.type) {
        default:
            return state;
    }
};

export default reducer;