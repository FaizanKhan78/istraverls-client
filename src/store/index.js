import { configureStore } from "@reduxjs/toolkit";
import { registrationSlice } from "./registration";
import { usersSlices } from "./users";
import { usersDetailsSlices } from "./usersDetails";
import { allUsersDataSlice } from "./allUsersData";
import { editUserSlice } from "./editUserData";

export const store = configureStore( {
  reducer: {
    registration: registrationSlice.reducer,
    users: usersSlices.reducer,
    usersDetails: usersDetailsSlices.reducer,
    allUsersData: allUsersDataSlice.reducer,
    editUser: editUserSlice.reducer,
  }
} );