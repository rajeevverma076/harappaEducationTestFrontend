
/**
 * App Reducers
 */
import { combineReducers} from 'redux';
import ActiveUserReducer  from './ActiveUserReducer';
const reducers = combineReducers({
  authUser: ActiveUserReducer,
});

export default reducers;