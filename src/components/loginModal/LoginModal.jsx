import { useFormik } from 'formik';
import { loginSchema } from '../../validation/login';
import Button from './../button/Button';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import ChangePassword from './changePassword/ChangePassword';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { registrationActions } from '../../store/registration';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ModalContainer from '../modal/ModalContainer';

const InputAnimation = " block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";

const Label = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";



const LoginModal = ( { closeModal } ) =>
{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    mobile_number: "",
    password: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik( {
    initialValues,
    validationSchema: loginSchema,
    onSubmit: ( values, action ) =>
    {
      const payload = {
        mobile_number: parseInt( values.mobile_number ),
        password: values.password,
      };
      axios.post( import.meta.env.VITE_USER_API + "/login", payload )
        .then( res =>
        {
          dispatch( registrationActions.registrationUser( res.data.token ) );
          toast.success( res.data.msg, {
            theme: "dark",
            autoClose: 2500,
          } );
          navigate( '/pay' );
          closeModal();
        } ).catch( error =>
        {
          console.log( error );
          toast.warn( error.response.data.message, {
            theme: "dark",
            autoClose: 2000
          }
          );
          action.resetForm();
        } );
    }
  } );

  const [ togglePassword, setTogglePassword ] = useState( false );

  const handleTogglePassword = () =>
  {
    setTogglePassword( !togglePassword );
  };

  const [ toggleChangePassword, setChangePassword ] = useState( false );

  const handleChangePassword = () =>
  {
    // closeModal();
    setChangePassword( !toggleChangePassword );
  };

  return (
    <>
      <ModalContainer closeModal={ closeModal }>

        <h3 className="text-6xl mobile:text-4xl py-3 text-animation font-myFont tracking-wider text-center">
          Login
        </h3>
        <form onSubmit={ handleSubmit }>
          <div className="relative bottom-4">
            <input type="tel" name="mobile_number" value={ values.mobile_number } onChange={ handleChange } onBlur={ handleBlur } id="mobile_number" className={ InputAnimation } placeholder=" " required />
            <label htmlFor="mobile_number" className={ Label }>Mobile Number*</label>
            { errors.mobile_number && touched.mobile_number ? <p className=' text-red-600 mt-1'>{ errors.mobile_number }</p> : null }
          </div>

          <div className="relative">
            <input type={ togglePassword ? "text" : "password" } name="password" value={ values.password } onChange={ handleChange } onBlur={ handleBlur } id="password" className={ InputAnimation } placeholder=" " required />
            <label htmlFor="password" className={ Label }>Password*</label>
            <div onClick={ handleTogglePassword } className='absolute right-0 top-2 cursor-pointer'>
              {
                togglePassword ?
                  <Eye />
                  :
                  <EyeOff />
              }
            </div>
            { errors.password && touched.password ? <p className=' text-red-600 mt-1'>{ errors.password }</p> : null }
          </div>
          <div className='top-4 relative text-blue-600 underline cursor-pointer hover:no-underline w-fit' onClick={ handleChangePassword }>
            <h3>Change Password</h3>
          </div>
          <div className="flex items-center justify-center gap-6 mt-10">
            <button type="button" onClick={ closeModal } className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-semibold tracking-wider rounded-lg text-sm px-5 py-2.5 font-myFont text-center me-2 mb-2">
              Close
            </button>
            <Button text={ "Submit" } />
          </div>
        </form>

      </ModalContainer>
      { toggleChangePassword && <ChangePassword closeModal={ handleChangePassword } /> }
    </>
  );
};

export default LoginModal;