import _ from 'lodash'
import {
    
} from '../../constants/actionTypes';

const initialState = {
    header: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjp0cnVlLCJleHAiOjE1NTQyMTIwNzQsImp0aSI6ImRmYzdhOTE2NzU4YTk5YzgxNTA1ODIwNDdlYmEwZDRkIiwiaWF0IjoxNTUyOTE2MDc0LCJzdWIiOiIyZmUzYmQwMS00N2RmLTQ4Y2QtODBmNy0xMzQ4Y2QxYjM5OTgifQ.tGkGSPMmrc6pedskYFxTkG5gp3oFWRet8yGLto0EICU'
    },
};

const reducer = (state = initialState, action: any) => {
    let newState = _.cloneDeep(state);
    
    switch(action.type) {
        default:
            return state;
    }
};

export default reducer;