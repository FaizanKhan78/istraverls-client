import * as Yup from 'yup';

export const loginSchema = Yup.object( {
  mobile_number: Yup.string()
    .matches( /^\d{10}$/, "Mobile Number should be exactly 10 digits long and only contain numbers" )
    .required( "Please Enter Mobile Number" ),
  password: Yup.string().min( 8 ).max( 25 ).matches( /[A-Z a-z]{1}[a-z]*[0-9]{3,}/g, "Password Must Contain alphabets and At least 3 digit" ).required( "Please Enter Password" ),
} );