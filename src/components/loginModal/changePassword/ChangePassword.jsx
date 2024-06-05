
import { useFormik } from 'formik';
import { changePasswordSchema } from '../../../validation/changePassword';
import Button from '../../button/Button';
import ModalContainer from '../../modal/ModalContainer';
import axios from 'axios';
import { toast } from 'react-toastify';
const ChangePassword = ( { closeModal } ) =>
{
  const initialValues = {
    mobile_number: "",
    old_password: "",
    password: "",
    confirmPassword: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik( {
    initialValues,
    validationSchema: changePasswordSchema,
    onSubmit: async ( values ) =>
    {
      const payload = { ...values, mobile_number: Number( values.mobile_number ) };
      console.log( payload );
      try
      {
        const res = await axios.patch( import.meta.env.VITE_USER_API + `/updatepassword/${ values.mobile_number }`, payload );
        console.log( res );

        closeModal();
        toast.success( "Password Updated Successfully", {
          theme: "dark",
          autoClose: 2000,
        } );
      } catch ( error )
      {
        // console.log( error );
        toast.error( error.response.data.message, {
          theme: "dark",
          autoClose: 2000,
        } );
      }
    }
  } );
  const InputAnimation = " block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";

  const Label = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";
  return (
    <ModalContainer closeModal={ closeModal }>
      <h3 className="text-6xl mobile:text-4xl py-6 text-animation font-myFont tracking-wider text-center">
        Change Password
      </h3>
      <form onSubmit={ handleSubmit }>
        <div className="relative ">
          <input type="tel" name="mobile_number" value={ values.mobile_number } onChange={ handleChange } onBlur={ handleBlur } id="mobile_number" className={ InputAnimation } placeholder=" " required />
          <label htmlFor="mobile_number" className={ Label }>Mobile Number*</label>
          { errors.mobile_number && touched.mobile_number ? <p className=' text-red-600 mt-1'>{ errors.mobile_number }</p> : null }
        </div>
        <div className="relative mt-4">
          <input type="text" name="old_password" value={ values.old_password } onChange={ handleChange } onBlur={ handleBlur } id="old_password" className={ InputAnimation } placeholder=" " required />
          <label htmlFor="old_password" className={ Label }>Old Password*</label>
        </div>
        <div className="relative mt-4">
          <input type="text" name="password" value={ values.password } onChange={ handleChange } onBlur={ handleBlur } id="password" className={ InputAnimation } placeholder=" " required />
          <label htmlFor="password" className={ Label }>New Password*</label>
          { errors.password && touched.password ? <p className=' text-red-600 mt-1'>{ errors.password }</p> : null }
        </div>
        <div className="relative mt-4">
          <input type="text" name="confirmPassword" value={ values.confirmPassword } onChange={ handleChange } onBlur={ handleBlur } id="confirmPassword" className={ InputAnimation } placeholder=" " required />
          <label htmlFor="confirmPassword" className={ Label }>Confirm Password*</label>
          { errors.confirmPassword && touched.confirmPassword ? <p className=' text-red-600 mt-1'>{ errors.confirmPassword }</p> : null }
        </div>
        <div className="flex items-center justify-center gap-6 mt-10">
          <button type="button" onClick={ closeModal } className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-semibold tracking-wider rounded-lg text-sm px-5 py-2.5 font-myFont text-center me-2 mb-2">
            Close
          </button>
          <Button text={ "Submit" } />
        </div>
      </form>
    </ModalContainer>

  );
};

export default ChangePassword;