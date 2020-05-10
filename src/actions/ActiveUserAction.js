/*
 src/actions/ActiveUserAction.js
*/
import jwt_decode from 'jwt-decode';
import { NotificationManager } from 'react-notifications';
import {
  LOGIN_USER_FAILURE,
  SET_CURRENT_USER,
  API_URl,
  FETCH_ORDER,
  REQUEST_ORDER,
  ERROR_GENERATED,
} from './types';
import setAuthToken from '../api/setAuthToken';
// api
import api from '../api';
import axios from 'axios';

let header = {headers: {'Authorization': 'Bearer ' + localStorage.getItem("jwtToken"),'Content-Type': 'application/json'}};
/**Login User */
export const signinUserIn = (data, history) => {
  return async dispatch => {
    try {
      const user = await api.post('user/login', data);
      let dashboardData
      if (user.status === 200) {
        // Save to localStorage
        const { token, role, name, email, _id } = user.data.data;
        await localStorage.setItem('jwtToken', token);
        await localStorage.setItem('user_name', email);
        await localStorage.setItem('name', name);
        await localStorage.setItem('userID', _id)
        let jwtToken = await localStorage.getItem('jwtToken');
        console.log('Jwt Token');
        console.log(jwtToken);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
        history.push('/home');
      } else {
        localStorage.removeItem('jwtToken');
        dispatch({ type: LOGIN_USER_FAILURE });
        NotificationManager.error(user.message);
      }
    } catch (error) {
      dispatch({ type: LOGIN_USER_FAILURE });
      NotificationManager.error('Your user and password invalid');
    }
  };
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
//FETCH_ORDER
export const getOrder = (cbNavigation) => {
  console.log("FETCH_ORDER")
  return async dispatch => {
    async function onSuccess(success) {
      cbNavigation({payload: success.data,status:1});
      dispatch({type: FETCH_ORDER, payload: success.data});
    }
    function onError(error) {
      dispatch({type: ERROR_GENERATED, payload: error.response.data.error});
    }
    try {
      let header = {headers: {'Authorization': 'Bearer ' + localStorage.getItem("jwtToken"),'Content-Type': 'application/json'}};
      const success = await axios.get(API_URl+'user/getOrder',header);
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
};



export const getRequestOrder = (cbNavigation) => {
  console.log("REQUEST_ORDER")
  return async dispatch => {
    async function onSuccess(success) {
      cbNavigation({payload: success.data,status:1});
      dispatch({type: REQUEST_ORDER, payload: success.data});
    }
    function onError(error) {
      dispatch({type: ERROR_GENERATED, payload: error.response.data.error});
    }
    try {
      let header = {headers: {'Authorization': 'Bearer ' + localStorage.getItem("jwtToken"),'Content-Type': 'application/json'}};
      const success = await axios.get(API_URl+'user/getRequestOrder',header);
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
};










