// reducer.js
import { createReducer, combineReducers } from '@reduxjs/toolkit';

import { loginRequest, loginSuccess, loginFailure, setMaxTableCount, setChairsPerTable, setTablesAction, logout } from './actions';

const initialLoginState = {
  loggedIn: false,
  loading: false,
  error: null,
  token: null
};

const loginReducer = createReducer(initialLoginState, (builder) => {
  builder
    .addCase(loginRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loginSuccess, (state, action) => {
      state.loggedIn = true;
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    })
    .addCase(loginFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(logout, (state, action) =>{
      state.loggedIn = false;
    });
});


const initialConfigState = {
  maxTableCount: null,
  chairsPerTable: null,
};


const configReducer = createReducer(initialConfigState, (builder) => {
  builder
    .addCase(setMaxTableCount, (state, action) => {
      state.maxTableCount = action.payload;
    })
    .addCase(setChairsPerTable, (state, action) => {
      state.chairsPerTable = action.payload;
    });
});


const initalTablesState = {
  tables:[]
};

const tablesReducer = createReducer(initalTablesState, (builder)=>{
  builder
    .addCase(setTablesAction, (state, action) =>{
      state.tables = action.payload
    })
});


// 
const rootReducer = combineReducers({
  login: loginReducer,
  config: configReducer,
  tables: tablesReducer
  // Add other reducers here if needed
});

export default rootReducer;