import { combineReducers } from 'redux'
import venue from './venue';
import authentication from './authentication'
import dashboard from './dashboard'

const RootReducer = combineReducers({
    venue,
    authentication,
    dashboard
});

export default RootReducer;