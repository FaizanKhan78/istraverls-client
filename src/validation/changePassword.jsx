import * as Yup from 'yup';

export const changePasswordSchema = Yup.object().shape( {
  mobile_number: Yup.string()
    .matches( /^\d{10}$/, "Mobile Number should be exactly 10 digits long and only contain numbers" )
    .required( "Please Enter Mobile Number" )
    .min( 10, "Mobile Number Should be of 10 digits" )
    .max( 10, "Mobile Number Should be of 10 digits" ),
  password: Yup.string()
    .required( 'Password is required' )
    .min( 8, 'Password must be at least 8 characters long' ),
  confirmPassword: Yup.string()
    .oneOf( [ Yup.ref( 'password' ), null ], 'Passwords must match' )
    .required( 'Confirm Password is required' )
} );
