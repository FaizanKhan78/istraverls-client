import { createSlice } from "@reduxjs/toolkit";

export const allUsersDataSlice = createSlice( {
  name: "allUsersData",
  initialState: {
    originalData: [],
    copyData: [],
    loading: false,
    area: [],
  },
  reducers: {
    getAllUsersData: ( state, action ) =>
    {
      const approvedData = action.payload.filter( ( user ) => user.status );
      const uniqueAreas = [ ...new Set( approvedData.map( student => student.area ) ) ];
      return { ...state, originalData: action.payload, copyData: approvedData, loading: true, area: uniqueAreas };
    },
    showStatusPending: ( state ) =>
    {
      const data = state.originalData.filter( ( user ) => !user.status );
      return { ...state, copyData: data };
    },
    showStatusApproved: ( state ) =>
    {
      const data = state.originalData.filter( ( user ) => user.status );
      return { ...state, copyData: data };
    },
    showPending: ( state ) =>
    {
      const data = state.originalData.filter( ( user ) =>
      {
        const date = new Date();
        const dueDate = new Date( user.due_date );
        if ( date > dueDate )
        {
          return user;
        }
      } );
      return { ...state, copyData: data };
    },
    showPaid: ( state ) =>
    {
      const data = state.originalData.filter( ( user ) =>
      {
        const date = new Date();
        const dueDate = new Date( user.due_date );
        if ( date < dueDate )
        {
          return user;
        }
      } );
      return { ...state, copyData: data };
    },
    filterByNameSearch: ( state, action ) =>
    {
      const users = state.originalData.filter( ( user ) =>
      {
        if ( user.status )
        {
          const name = user.student_name.toLowerCase();
          return name.includes( action.payload.toLowerCase() );
        }
      } );
      return { ...state, copyData: users };
    },
    filterByNumberSearch: ( state, action ) =>
    {
      const users = state.originalData.filter( ( user ) =>
      {
        if ( user.status )
        {
          const mobile_number = String( user.mobile_number );
          return mobile_number.includes( action.payload );
        }
      } );
      return { ...state, copyData: users };
    },
    filterByIdSearch: ( state, action ) =>
    {
      const users = state.originalData.filter( ( user ) =>
      {
        if ( user.status )
        {
          const id = String( user.id );
          return id.includes( action.payload );
        }
      } );
      return { ...state, copyData: users };
    },
    statusPending: ( state, action ) =>
    {
      state.copyData.map( ( user ) =>
      {
        if ( user.id === action.payload.id )
        {
          return { ...user, ...action.payload };
        }
        return user;
      } );
      const newArray = state.originalData.map( ( user ) =>
      {
        if ( user.id === action.payload.id )
        {
          return { ...user, ...action.payload };
        }
        return user;
      } );
      const newData = state.copyData.filter( ( user ) => user.id !== action.payload.id );
      return { ...state, originalData: newArray, copyData: newData };

    },
    updateUserData: ( state, action ) =>
    {
      console.log( action.payload );
      const users = state.copyData.map( ( user ) =>
      {
        if ( user.id === action.payload.id )
        {
          return { ...user, ...action.payload };
        }
        return user;
      } );
      return { ...state, copyData: users };
    },
    updateAllUsers: ( state, action ) =>
    {
      console.log( action.payload );

      const { area } = action.payload;
      const data = state.copyData.map( ( user ) =>
      {
        if ( user.area === area )
        {
          return { ...user, ...action.payload };
        }
        return user;
      } );
      return { ...state, copyData: data };
    },
    deleteUser: ( state, action ) =>
    {
      const newData = state.copyData.filter( ( user ) => user._id !== action.payload );
      const data = state.originalData.filter( ( user ) => user._id !== action.payload );
      return { ...state, originalData: data, copyData: newData };
    },
  },
} );


export const allUsersDataAction = allUsersDataSlice.actions;