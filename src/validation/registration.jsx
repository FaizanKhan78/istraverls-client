import * as Yup from 'yup';

export const registerSchema = Yup.object( {
  student_name: Yup.string()
    .min( 3, "Name should be greater than 3 characters" )
    .max( 25, "Name should be less than 25 characters" )
    .required( "Please Enter Name" ),

  mobile_number: Yup.string()
    .matches( /^\d{10}$/, "Mobile Number should be exactly 10 digits long and only contain numbers" )
    .required( "Please Enter Mobile Number" ),

  password: Yup.string()
    .min( 8, "Password should be greater than 8 characters" )
    .max( 25, "Password should be less than 25 characters" )
    .matches( /[A-Za-z]+[0-9]{3,}/, "Password must contain alphabets and at least 3 digits" )
    .required( "Please Enter Password" ),

  pick_up_address: Yup.string()
    .min( 8, "Pick Up Address should be greater than 8 characters" )
    .max( 255, "Pick Up Address should be less than 255 characters" )
    .required( "Please Enter Pick Up Address" ),

  drop_up_address: Yup.string()
    .min( 8, "Drop Address should be greater than 8 characters" )
    .max( 255, "Drop Address should be less than 255 characters" )
    .required( "Please Enter Drop Address" ),

  area: Yup.string()
    .min( 4, "Area should be greater than 4 characters" )
    .max( 255, "Area should be less than 255 characters" )
    .required( "Please Enter Area" ),

  div: Yup.string()
    .min( 1, "Division should be at least 1 character" )
    .required( "Please Enter Division" ),

  society: Yup.string()
    .min( 6, "Society should be greater than 6 characters" )
    .max( 50, "Society should be less than 50 characters" )
    .required( "Please Enter Society" ),

  gender: Yup.string()
    .required( "Please Select Gender" ),

  std: Yup.string()
    .min( 1, "STD should be at least 1 character" )
    .max( 3, "STD should be less than 3 characters" )
    .required( "Please Enter STD" ),

} );
