import { useDispatch, useSelector } from "react-redux";
import { editUserAction } from "../../../store/editUserData";
import Button from "../../../components/button/Button";
import { toast } from 'react-toastify';
import axios from "axios";
import { allUsersDataAction } from "../../../store/allUsersData";
import ModalContainer from "../../../components/modal/ModalContainer";
import CustomDateInput from "../setAllDataModal/CustomDateInput";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import { useEffect, useState } from "react";
import DropDown from "../dropDown/DropDown";


const EditModal = ( { closeModal } ) =>
{
  const inputAnimation = 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer';
  const labelAnimation = 'peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6';

  const editUser = useSelector( state => state.editUser );
  const token = useSelector( state => state.registration );

  const [ isOpen, setIsOpen ] = useState( false );
  const [ quarter, SelectQuarter ] = useState( "Select Quarter" );

  const data = [
    "One Quarter",
    "Two Quarter",
    "Three Quarter",
    "Four Quarter",
  ];

  const dispatch = useDispatch();

  useEffect( () =>
  {
    if ( editUser.payment_date )
    {
      const currentQuarter = data.findIndex( q => q === quarter );
      if ( currentQuarter !== -1 )
      {
        const date = new Date( editUser.payment_date );
        const newMonth = date.getMonth() + 3 * ( currentQuarter + 1 );
        const newDueDate = new Date( date.setMonth( newMonth % 12 ) );
        if ( newMonth >= 12 )
        {
          newDueDate.setFullYear( date.getFullYear() + 1 );
          dispatch( editUserAction.changeUserData( { name: "due_date", value: newDueDate.toISOString() } ) );
        } else
        {
          dispatch( editUserAction.changeUserData( { name: "due_date", value: newDueDate.toISOString() } ) );
        }
      }
    }
  }, [ quarter, editUser.payment_date ] );

  const toggleDropdown = () =>
  {
    setIsOpen( !isOpen );
  };

  const handleTab = ( quarter ) =>
  {
    SelectQuarter( quarter );
    setIsOpen( false );
  };




  const handleChange = ( e ) =>
  {
    const { name, value } = e.target;
    dispatch( editUserAction.changeUserData( { name, value } ) );
  };

  const handleDateChange = ( name, date ) =>
  {
    dispatch( editUserAction.changeUserData( { name, value: date.toISOString() } ) );
  };

  const handleTimeChange = ( time ) =>
  {
    dispatch( editUserAction.changeUserData( { name: "time", value: time } ) );
  };

  const handleSubmit = async ( e ) =>
  {
    e.preventDefault();

    const payload = {
      ...editUser,
      rate: Number( editUser.rate ),
      pending_amount: editUser.rate * 12,
      total_amount: editUser.rate * 12,
      quarter,
    };
    try
    {
      const res = await axios.patch( import.meta.env.VITE_ADMIN_API + `/updatesingle/${ editUser.mobile_number }`, payload, {
        headers: {
          Authorization: `Bearer ${ token }`,
        }
      } );
      toast.success( res.data.student_name + " Updated Successfully ✅", {
        theme: "dark",
        autoClose: 1500,
      } );
      dispatch( allUsersDataAction.updateUserData( res.data ) );
      closeModal();
    } catch ( error )
    {
      console.log( error );
    }
  };


  return (
    <ModalContainer closeModal={ closeModal }>
      <form onSubmit={ handleSubmit }>
        <div className="relative z-10">

          <h3 className="text-6xl mobile:text-4xl py-3 text-animation font-myFont tracking-wider text-center">
            Edit { editUser?.student_name }
          </h3>
          <div className="grid grid-cols-2 mb-4 mobile:grid-cols-1 gap-5">
            <div className="relative ">
              <input type="text" name="pick_up_address" value={ editUser.pick_up_address } onChange={ handleChange }
                id="pick_up_address" className={ inputAnimation } placeholder=" " required />
              <label htmlFor="pick_up_address" className={ labelAnimation }>Pick Up Address</label>
            </div>

            <div className="relative">
              <input type="text" name="drop_up_address"
                value={ editUser.drop_up_address } onChange={ handleChange } id="drop_up_address" className={ inputAnimation } placeholder=" " />
              <label htmlFor="drop_up_address" className={ labelAnimation }>Drop Up Address</label>
            </div>
          </div>

          <div className="grid grid-cols-2 mobile:grid-cols-1 gap-5">
            <div className="relative ">
              <input type="tel" name="std"
                value={ editUser.std } onChange={ handleChange } id="std" className={ inputAnimation } placeholder=" " required />
              <label htmlFor="std" className={ labelAnimation }>STD</label>
            </div>

            <div className="relative">
              <input type="tel" name="div"
                value={ editUser.div } onChange={ handleChange } id="div" className={ inputAnimation } placeholder=" " required />
              <label htmlFor="div" className={ labelAnimation }>DIV</label>
            </div>
          </div>

          <div className="relative mt-3">
            <input type="text" name="area" autoComplete='area'
              value={ editUser.area } onChange={ handleChange } id="area" className={ inputAnimation } placeholder=" " required />
            <label htmlFor="area" className={ labelAnimation }>Area</label>
          </div>
          <div className="relative my-3">
            <input type="tel" name="society"
              value={ editUser.society } onChange={ handleChange } id="society" className={ inputAnimation } placeholder=" " required />
            <label htmlFor="society" className={ labelAnimation }>SOCIETY*</label>
          </div>
          <div className="relative my-3">
            <input type="tel" name="rate"
              value={ editUser.rate } onChange={ handleChange } id="rate" className={ inputAnimation } placeholder=" " required />
            <label htmlFor="rate" className={ labelAnimation }>RATE</label>
          </div>
          <div className="relative my-3">
            <input type="tel" name="route"
              value={ editUser.route } onChange={ handleChange } id="route" className={ inputAnimation } placeholder=" " required />
            <label htmlFor="route" className={ labelAnimation }>ROUTE</label>
          </div>
          <div className="relative my-3">
            <DropDown data={ data } toggleDropdown={ toggleDropdown } handleTab={ handleTab } tab={ quarter } isOpen={ isOpen } />
          </div>
        </div>

        <div className=" grid grid-cols-2 gap-4 justify-center">
          <label htmlFor="start_date" className="flex flex-col font-myFont text-sm w-full text-gray-500 dark:text-gray-400 relative">
            Start Date
            <div className="relative mt-2 w-full">
              <DatePicker
                name="start_date"
                selected={ editUser.start_date }
                onChange={ ( date ) => handleDateChange( 'start_date', date ) }
                customInput={ <CustomDateInput placeholder="Select Payment Date" /> }
                placeholderText="Select Payment Date"
              />
            </div>
          </label>

          <label htmlFor="end_date" className="flex flex-col font-myFont text-sm text-gray-500 dark:text-gray-400 relative">
            End Date
            <div className="relative mt-2">
              <DatePicker
                name="end_date"
                selected={ editUser.end_date }
                onChange={ ( date ) => handleDateChange( 'end_date', date ) }
                customInput={ <CustomDateInput placeholder="Select Payment Date" /> }
                placeholderText="Select Payment Date"
              />
            </div>
          </label>
          <label htmlFor="payment_date" className="flex flex-col font-myFont text-sm text-gray-500 dark:text-gray-400 relative">
            Payment Date
            <div className="relative mt-2">
              <DatePicker
                name="payment_date"
                selected={ editUser.payment_date }
                onChange={ ( date ) => handleDateChange( 'payment_date', date ) }
                customInput={ <CustomDateInput placeholder="Select Payment Date" /> }
                placeholderText="Select Payment Date"
              />
            </div>
          </label>
          <label htmlFor="due_date" className="flex flex-col font-myFont text-sm text-gray-500 dark:text-gray-400 relative">
            Due Date
            <div className="relative mt-2">
              <DatePicker
                name="due_date"
                selected={ editUser.due_date }
                onChange={ ( date ) => handleDateChange( 'due_date', date ) }
                customInput={ <CustomDateInput placeholder="Select Due Date" /> }
                placeholderText="Select Due Date"
              />
            </div>
          </label>
          <label htmlFor="time" className="flex flex-col font-myFont text-sm text-gray-500 dark:text-gray-400 relative">
            Time
            <div className="relative mt-2">
              <TimePicker
                onChange={ ( time ) => handleTimeChange( time ) }
                value={ editUser.time === "empty" ? "00:00" : editUser.time }
                className="react-time-picker__inputGroup text-white border-none bg-[#0f0e0c] p-2 rounded-lg outline-none w-full"
                disableClock
              />
            </div>
          </label>
        </div>
        <div className="flex items-center justify-center gap-6 mt-5">
          <button type="button" onClick={ closeModal } className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-semibold tracking-wider rounded-lg text-sm px-5 py-2.5 font-myFont text-center me-2 mb-2">
            Close
          </button>

          <Button text={ "Submit" } />
        </div>
      </form>

    </ModalContainer>
  );
};

export default EditModal;