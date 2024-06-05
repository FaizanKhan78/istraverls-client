import { motion } from 'framer-motion';
import axios from "axios";
import dayjs from 'dayjs';
import Button from '../../../components/button/Button';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { usersDetailsAction } from '../../../store/usersDetails';
import { allUsersDataAction } from '../../../store/allUsersData';

const InvoiceTable = ( { users } ) =>
{
  const dispatch = useDispatch();
  const checkOut = async ( user ) =>
  {
    const { data: { key } } = await axios.get( import.meta.env.VITE_API + "/api/getkey" );
    const { data: { order } } = await axios.post( import.meta.env.VITE_USER_API + "/checkout",
      users
    );
    const options = {
      key, // Enter the Key ID generated from the Dashboard
      amount: user.rate, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "ISTRAVLES",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function ( response )
      {
        try
        {
          const body = {
            ...response
          };
          const res = await axios.post( import.meta.env.VITE_USER_API + "/paymentverification", body );
          toast.success( "Payment " + res.data.message, {
            theme: "dark",
            autoClose: 2500,
          } );

          const date = new Date( user.due_date );
          const newDueDate = date.setMonth( date.getMonth() + 3 );
          const payload = { ...res.data, _id: user._id, payment_date: user.due_date, due_date: newDueDate, pending_amount: ( user.pending_amount - ( order.amount / 100 ) ), paid_amount: ( user.paid_amount + ( order.amount / 100 ) ) };
          const update = await axios.post( import.meta.env.VITE_USER_API + "/update", payload );
          dispatch( usersDetailsAction.updateUsersDetails( update.data ) );
          dispatch( allUsersDataAction.updateUserData( update.data ) );
        } catch ( error )
        {
          console.log( error );
        }
      },
      prefill: {
        contact: user.mobile_number
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#0e0e0e"
      }
    };
    const rzp1 = new window.Razorpay( options );
    rzp1.on( 'payment.failed', function ( response )
    {
      console.log( response );
    } );
    rzp1.open();
  };

  return (
    <>
      <motion.div className="flex flex-wrap" data-scroll-section>
        {
          users.map( ( user, i ) =>
          {
            return (
              <motion.div className='bg-[#010101] text-white font-myFont mobile:mb-10 p-8 mt-10 rounded-lg w-fit' key={ i }>
                <div className='flex justify-between'>
                  <h1 className='text-lg'>Pay <span className='text-[#9FA6B2]'>ID : { user.id }</span></h1>
                  <h1 className='text-lg'>Route <span className='text-[#9FA6B2]'>: { user.route }</span></h1>
                </div>
                <h1 className='text-2xl pt-10'>{ user.student_name }</h1>

                <div className='flex mt-4 gap-20 mobile:flex-col'>
                  <div className='flex gap-4 mobile:gap-12'>
                    <div>
                      <h1 className='text-xl'>Starting Date</h1>
                      <h1 className='text-xl text-[#9FA6B2]'>{ dayjs( user.start_date ).format( 'DD MMMM YYYY' ) }</h1>
                    </div>
                    <div>
                      <h1 className='text-xl'>End Date</h1>
                      <h1 className='text-xl text-[#9FA6B2]'>{ dayjs( user.end_date ).format( 'DD MMMM YYYY' ) }</h1>
                    </div>
                  </div>

                  <div className='flex gap-4'>
                    <div>
                      <h1 className='text-xl'>Payment Date</h1>
                      <h1 className='text-xl text-[#9FA6B2]'>{ dayjs( user.payment_date ).format( 'DD MMMM YYYY' ) }</h1>
                    </div>
                    <div>
                      <h1 className='text-xl'>Due Date</h1>
                      <h1 className='text-xl text-[#9FA6B2]'>{ dayjs( user.due_date ).format( 'DD MMMM YYYY' ) }</h1>
                    </div>
                  </div>
                </div>

                <div className='flex mt-4 gap-20'>
                  <div className='flex gap-4 mobile:gap-12'>
                    <div>
                      <h1 className='text-xl'>Pending Amt</h1>
                      <h1 className='text-xl text-[#9FA6B2]'>{ user.pending_amount }</h1>
                    </div>
                    <div>
                      <h1 className='text-xl'>Paid Amt</h1>
                      <h1 className='text-xl text-[#9FA6B2]'>{ user.paid_amount }</h1>
                    </div>
                  </div>

                  {/* <div className='flex gap-4'>
                    <div>
                      <h1 className='text-xl'>Payment Date</h1>
                      <h1 className='text-xl text-[#9FA6B2]'>{ dayjs( user.payment_date ).format( 'DD MMMM YYYY' ) }</h1>
                    </div>
                    <div>
                      <h1 className='text-xl'>Due Date</h1>
                      <h1 className='text-xl text-[#9FA6B2]'>{ dayjs( user.due_date ).format( 'DD MMMM YYYY' ) }</h1>
                    </div>
                  </div> */}
                </div>

                <hr className='mt-10 h-[2px] bg-[#9FA6B2]' />

                <div className='mt-10 flex justify-between'>
                  <div onClick={ () => checkOut( user ) }>
                    <Button text={ "Pay" } />
                  </div>
                  <div>
                    <h1 className='text-xl'>Total Amt</h1>
                    <h1 className='text-xl text-[#9FA6B2]'>{ user.total_amount }</h1>
                  </div>
                </div>
              </motion.div>
            );
          } )
        }
      </motion.div>
    </>
  );
};

export default InvoiceTable;