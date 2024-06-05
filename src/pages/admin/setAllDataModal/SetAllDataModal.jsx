import { useState } from 'react';
import ModalContainer from "../../../components/modal/ModalContainer";
import Button from "../../../components/button/Button";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { allUsersDataAction } from "../../../store/allUsersData";
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomDateInput from "./CustomDateInput";
import TimePicker from 'react-time-picker';
import "react-time-picker/dist/TimePicker.css";
import { motion } from 'framer-motion';
import DropDown from '../dropDown/DropDown';

const SetAllDataModal = ( { closeModal } ) =>
{
  const inputAnimation = 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer';
  const labelAnimation = 'peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6';
  const dispatch = useDispatch();
  const token = useSelector( state => state.registration );

  const [ data, setData ] = useState( {
    rate: "",
    payment_date: "",
    due_date: "",
    time: "",
    area: "",
  } );

  const users = useSelector( state => state.allUsersData );

  const handleChange = ( e ) =>
  {
    const { name, value } = e.target;
    setData( { ...data, [ name ]: value } );
  };

  const handleDateChange = ( name, date ) =>
  {
    // console.log( date.toISOString() );
    setData( { ...data, [ name ]: date.toISOString() } );
  };

  const handleTimeChange = ( time ) =>
  {
    setData( { ...data, time } );
  };

  const [ area, selectArea ] = useState( "area" );
  const [ isOpen, setIsOpen ] = useState( false );

  const toggleDropdown = () =>
  {
    setIsOpen( !isOpen );
  };

  const handleTab = ( area ) =>
  {
    selectArea( area );
    setIsOpen( false );
  };

  const handleSubmit = async ( e ) =>
  {
    e.preventDefault();
    const payload = {
      ...data,
      rate: Number( data.rate ),
      pending_amount: data.rate * 12,
      total_amount: data.rate * 12,
      time: data.time,
      area,
    };
    console.log( payload );
    try
    {
      if ( payload.area === "Area" )
      {
        toast.error( "Please Select Area", {
          theme: "dark",
          autoClose: 1000,
        } );
        throw new Error( "Please Select Area" );
      }
      const res = await axios.patch( import.meta.env.VITE_ADMIN_API + "/updateallusers", payload, {
        headers: {

          Authorization: `Bearer ${ token }`
        }
      } );
      closeModal();
      dispatch( allUsersDataAction.updateAllUsers( payload ) );
      toast.success( "Update Data", {
        theme: "dark",
        autoClose: 1000,
      } );
    } catch ( error )
    {
      console.log( error );
    }
  };
  const [ isFocused, setIsFocused ] = useState( false );
  const handleFocus = () =>
  {
    setIsFocused( true );
  };

  const handleBlur = () =>
  {
    if ( data.rate === '' )
    {
      setIsFocused( false );
    }
  };
  return (
    <ModalContainer closeModal={ closeModal }>
      <h3 className="text-5xl mobile:text-4xl py-1 text-animation font-myFont tracking-wider text-center">
        Set All Users
      </h3>
      <form onSubmit={ handleSubmit }>
        <div className="relative my-3">
          <input
            type="tel"
            name="rate"
            onChange={ handleChange }
            value={ data.rate }
            id="rate"
            className={ inputAnimation }
            onFocus={ handleFocus }
            onBlur={ handleBlur }
          />
          <motion.label
            htmlFor="rate"
            className={ labelAnimation }
            initial={ { y: 0, scale: 1 } }
            animate={ isFocused || data.rate ? { y: -24, scale: 0.75 } : { y: 0, scale: 1 } }
            transition={ { duration: 0.3, ease: 'easeInOut' } }
          >
            RATE
          </motion.label>
        </div>
        <div className='my-5'>
          <DropDown data={ users?.area } tab={ area } isOpen={ isOpen } toggleDropdown={ toggleDropdown } handleTab={ handleTab } />
        </div>
        <div className="flex justify-around items-center">
          <div className="flex flex-col gap-2">
            <h6 className="font-myFont text-sm text-gray-500">Payment Date</h6>
            <DatePicker
              name="payment_date"
              selected={ data.payment_date }
              onChange={ ( date ) => handleDateChange( 'payment_date', date ) }
              customInput={ <CustomDateInput placeholder="Select Payment Date" /> }
              placeholderText="Select Payment Date"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h6 className="font-myFont text-sm text-gray-500">Due Date</h6>
            <DatePicker
              name="due_date"
              selected={ data.due_date }
              onChange={ ( date ) => handleDateChange( 'due_date', date ) }
              customInput={ <CustomDateInput placeholder="Select Due Date" /> }
              placeholderText="Select Due Date"
            />
          </div>
          <label htmlFor="time" className="flex flex-col font-myFont text-sm text-gray-500 dark:text-gray-400 relative">
            Time
            <div className="relative mt-2">
              <TimePicker
                onChange={ ( time ) => handleTimeChange( time ) }
                value={ data.time }
                className="react-time-picker__inputGroup text-white border-none bg-[#0f0e0c] p-2 rounded-lg outline-none w-full"
                disableClock
              />
            </div>
          </label>
        </div>
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={ closeModal }
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-semibold tracking-wider rounded-lg text-sm px-5 py-2.5 font-myFont text-center me-2 mb-2"
          >
            Close
          </button>
          <Button text={ "Submit" } />
        </div>
      </form>
    </ModalContainer>
  );
};

export default SetAllDataModal;
