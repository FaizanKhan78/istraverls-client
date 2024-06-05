import { createSlice } from "@reduxjs/toolkit";

export const usersDetailsSlices = createSlice( {
  name: "usersDetails",
  initialState: [],
  reducers: {
    getUsersDetails: ( state, action ) =>
    {
      return [ ...state, ...action.payload ];
    },
    updateUsersDetails: ( state, action ) =>
    {
      state.map( ( user ) =>
      {
        if ( user.id === action.payload.id )
        {
          user.payment_date = action.payload.payment_date;
          user.due_date = action.payload.due_date;
          user.pending_amount = action.payload.pending_amount;
          user.paid_amount = action.payload.paid_amount;
        }
      } );
      return state;
    },
    removeUser: () =>
    {
      return [];
    }
  }
} );


export const usersDetailsAction = usersDetailsSlices.actions;