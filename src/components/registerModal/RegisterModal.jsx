import { motion, AnimatePresence } from "framer-motion";
import Button from "../button/Button";
import { useFormik } from 'formik';
import { registerSchema } from "../../validation/registration";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import ModalContainer from "../modal/ModalContainer";

const RegisterModal = ( { closeModal } ) =>
{
  const InputAnimation = " block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";

  const Label = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";



  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      y: 100
    },
    animate: ( i ) => (
      {
        opacity: 1,
        y: 0,

        transition: {
          delay: 0.10 * i,
          duration: .5,
          ease: [ 0.12, 0, 0.39, 0 ],
        }
      }
    )
  };
  const initialValues = {
    student_name: "",
    mobile_number: "",
    password: "",
    pick_up_address: "",
    drop_up_address: "",
    area: "",
    div: "",
    society: "",
    gender: "",
    std: "",
    alternate_number: "",
  };



  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik( {
    initialValues,
    validationSchema: registerSchema,
    onSubmit: ( values, action ) =>
    {
      const payload = { ...values, mobile_number: parseInt( values.mobile_number ), area: values.area.toLowerCase(), std: parseInt( values.std ) };

      axios.post( import.meta.env.VITE_USER_API + "/register", payload )
        .then( res =>
        {
          toast.success( res.data.msg, {
            theme: "dark",
            autoClose: 2500,
          } );
          closeModal();
        } ).catch( error =>
        {
          toast.error( error.response.data.message, {
            theme: "dark",
            autoClose: 2500
          } );
          action.resetForm();
        } );
    }
  } );
  console.log( errors );
  const [ togglePassword, setTogglePassword ] = useState( false );

  const handleTogglePassword = () =>
  {
    setTogglePassword( !togglePassword );
  };

  return (
    <ModalContainer closeModal={ closeModal }>
      <form onSubmit={ handleSubmit }>
        <div className="relative z-10">

          <h3 className="text-6xl mobile:text-4xl py-3 text-animation font-myFont tracking-wider text-center">
            Start Now
          </h3>
          <motion.div className=" flex flex-col justify-center" variants={ fadeInAnimationVariants } initial="initial" animate="animate">

            <div className="relative bottom-4  mb-2">
              <input type="text" name="student_name" autoComplete='name' value={ values.student_name } onChange={ handleChange } onBlur={ handleBlur } id="student_name" className={ InputAnimation } placeholder=" " required />
              <label htmlFor="student_name" className={ Label }>Student Name*</label>
              { errors.student_name && touched.student_name ? <p className=' text-red-600 mt-1'>{ errors.student_name }</p> : null }
            </div>

            <div className="relative bottom-4">
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


            <div className="grid grid-cols-2 mb-4 mobile:grid-cols-1 gap-5">
              <div className="relative ">
                <input type="tel" name="mobile_number" value={ values.mobile_number } onChange={ handleChange } onBlur={ handleBlur } id="mobile_number" className={ InputAnimation } placeholder=" " required />
                <label htmlFor="mobile_number" className={ Label }>Mobile Number*</label>
                { errors.mobile_number && touched.mobile_number ? <p className=' text-red-600 mt-1'>{ errors.mobile_number }</p> : null }
              </div>

              <div className="relative">
                <input type="text" name="alternate_number"
                  value={ values.alternate_number } onBlur={ handleBlur } onChange={ handleChange } id="alternate_number" className={ InputAnimation } placeholder=" " />
                <label htmlFor="alternate_number" className={ Label }>Alternate Number</label>
              </div>
            </div>


            <div className="grid grid-cols-2 mobile:grid-cols-1 gap-5">
              <div className="relative ">
                <input type="text" name="pick_up_address" value={ values.pick_up_address } onChange={ handleChange } onBlur={ handleBlur } id="pick_up_address" className={ InputAnimation } placeholder=" " required />
                <label htmlFor="pick_up_address" className={ Label }>Pick Address*</label>
                { errors.pick_up_address && touched.pick_up_address ? <p className=' text-red-600 mt-1'>{ errors.pick_up_address }</p> : null }

              </div>

              <div className="relative">
                <input type="text" name="drop_up_address" value={ values.drop_up_address } onChange={ handleChange } onBlur={ handleBlur } id="drop_up_address" className={ InputAnimation } placeholder=" " required />
                <label htmlFor="drop_up_address" className={ Label }>Drop Address*</label>
                { errors.drop_up_address && touched.drop_up_address ? <p className=' text-red-600 mt-1'>{ errors.drop_up_address }</p> : null }
              </div>
            </div>

            <div className="relative mt-3">
              <input type="text" name="area" autoComplete='area'
                value={ values.area } onChange={ handleChange } onBlur={ handleBlur } id="area" className={ InputAnimation } placeholder=" " required />
              <label htmlFor="area" className={ Label }>Area*</label>
              { errors.area && touched.area ? <p className=' text-red-600 mt-1'>{ errors.area }</p> : null }
            </div>

            <div className="relative my-3">
              <input type="tel" name="society"
                value={ values.society } onChange={ handleChange } onBlur={ handleBlur } id="society" className={ InputAnimation } placeholder=" " required />
              <label htmlFor="society" className={ Label }>SOCIETY*</label>
              { errors.society && touched.society ? <p className=' text-red-600 mt-1'>{ errors.society }</p> : null }
            </div>

            <div className="grid grid-cols-2 mobile:grid-cols-1 gap-5">
              <div className="relative ">
                <input type="tel" name="std"
                  value={ values.std } onChange={ handleChange } onBlur={ handleBlur } id="std" className={ InputAnimation } placeholder=" " required />
                <label htmlFor="std" className={ Label }>STD*</label>
                { errors.std && touched.std ? <p className=' text-red-600 mt-1'>{ errors.std }</p> : null }
              </div>

              <div className="relative">
                <input type="tel" name="div"
                  value={ values.div } onChange={ handleChange } onBlur={ handleBlur } id="div" className={ InputAnimation } placeholder=" " required />
                <label htmlFor="div" className={ Label }>DIV*</label>
                { errors.div && touched.div ? <p className=' text-red-600 mt-1'>{ errors.div }</p> : null }
              </div>
            </div>
            <div className="flex flex-wrap my-5 font-myFont tracking-wider">
              <div className="flex items-center me-4">
                <input id="red-radio" type="radio" value="M" name="gender" onChange={ handleChange } onBlur={ handleBlur } className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="red-radio" className="ms-2 text-lg  text-gray-900 dark:text-gray-300">Male</label>
              </div>
              <div className="flex items-center me-4">
                <input id="green-radio" type="radio" value="F" name="gender" onChange={ handleChange } onBlur={ handleBlur } className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="green-radio" className="ms-2 text-lg  text-gray-900 dark:text-gray-300">Female</label>
              </div>
              { errors.gender && touched.gender ? <p className=' text-red-600 mt-1'>{ errors.gender }</p> : null }
            </div>
          </motion.div>
          <div className="flex items-center justify-center gap-6 mt-5">
            <button type="button" onClick={ closeModal } className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-semibold tracking-wider rounded-lg text-sm px-5 py-2.5 font-myFont text-center me-2 mb-2">
              Close
            </button>
            <Button text={ "Submit" } />
          </div>
        </div>
      </form>
    </ModalContainer>

  );
};

export default RegisterModal;