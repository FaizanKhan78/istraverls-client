import { createSlice } from "@reduxjs/toolkit";

export const registrationSlice = createSlice( {
  name: "registration",
  initialState: localStorage.getItem( "token" ),
  reducers: {
    registrationUser: ( state, action ) =>
    {
      state = action.payload;
      localStorage.setItem( "token", state );
      return state;
    },
    logoutUser: ( state ) =>
    {
      state = "";
      localStorage.clear();
      return state;
    }
  }
} );


export const registrationActions = registrationSlice.actions;