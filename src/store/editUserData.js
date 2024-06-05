import { createSlice } from "@reduxjs/toolkit";

export const editUserSlice = createSlice( {
  name: "editUser",
  initialState: {},
  reducers: {
    getEditUserData: ( state, action ) =>
    {
      return { ...state, ...action.payload };
    },
    removeUser: () =>
    {
      return [];
    },
    changeUserData: ( state, action ) =>
    {
      const { name, value } = action.payload;
      return { ...state, [ name ]: value };
    },
  }
} );


export const editUserAction = editUserSlice.actions;