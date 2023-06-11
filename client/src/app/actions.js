// actions.js
import { createAction } from '@reduxjs/toolkit';
import HTTPClient from '../HTTPClient';

// export const login = createAction('login');
// export const logout = createAction('logout');

export const loginRequest = createAction('login/request');
export const loginSuccess = createAction('login/success');
export const loginFailure = createAction('login/failure');
export const logout = createAction('logout');
// config actions
export const setMaxTableCount = createAction('config/setMaxTableCount');
export const setChairsPerTable = createAction('config/setChairsPerTable');

//Table actions
export const setTablesAction = createAction('data/tables');

export const login = (email, password) => {

  return async (dispatch) => {

    dispatch(loginRequest());

    try {
      // const response = await axios.post(`${BASE_URL}/auth/login`, { email, password }, {withCredentials:true});
      const response = await HTTPClient.post('/auth/login', { email, password });
      const { data } = response;

      // Assuming the server returns a token upon successful login
      
      dispatch(loginSuccess(data));


    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
};