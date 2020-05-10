/*
 src/reducers/ActiveUserReducer.js
*/
/**
 * Auth User Reducers
 */
import isEmpty from '../validation/is-empty';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  SET_CURRENT_USER,
  PROFILE_INFO,
  FETCH_ORDER,
  REQUEST_ORDER,
  ERROR_GENERATED,
} from '../actions/types';

/**
 * initial auth user
 */
const INIT_STATE = {
  user: {},
  loading: true,
  isLoading:true,
  account: null,
  isAuthenticated: false,
  profile_info: {},
  orderDetail:[]
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      console.log('reducer Called');
      var isAuthenticated = !isEmpty(action.payload);
      console.log(isAuthenticated);
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    case LOGIN_USER:
      return { ...state, loading: true };

    case LOGIN_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };

    case LOGIN_USER_FAILURE:
      return { ...state, loading: false };

    case LOGOUT_USER:
      return { ...state, user: null };

      case FETCH_ORDER:
      return { ...state, orderDetail: action.payload,isLoading:false };

      case REQUEST_ORDER:
      return { ...state, orderDetail: action.payload,isLoading:false };
      
      case ERROR_GENERATED:
      return { ...state, orderDetail: action.payload,isLoading:false };

    default:
      return { ...state };
  }
};
