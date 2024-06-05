import { createSlice } from '@reduxjs/toolkit';

export const usersSlices = createSlice( {
  name: "users",
  initialState: [],
  reducers: {
    addUsers: ( state, action ) =>
    {
      return [ ...state, action.payload ];
    },
    deleteUsers: () =>
    {
      return [];
    }
  }
} );


export const usersActions = usersSlices.actions;