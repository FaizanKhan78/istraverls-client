import { useEffect } from "react";
import useLocoScroll from "../../hooks/useLocoScroll";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { usersDetailsAction } from "../../store/usersDetails";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import { motion } from 'framer-motion';
import PayCard from "./payCard/PayCard";

const Invoice = () =>
{
  useLocoScroll();
  const token = useSelector( state => state.registration );
  const users = useSelector( state => state.usersDetails );
  const dispatch = useDispatch();
  async function userDetails ()
  {
    await axios.get( import.meta.env.VITE_USER_API + "/invoice", {
      headers: {
        Authorization: `Bearer ${ token }`,
      }
    } ).then( ( res ) =>
    {
      dispatch( usersDetailsAction.getUsersDetails( res.data ) );
    } ).catch( error =>
    {
      console.log( error );
    } );
  }

  useEffect( () =>
  {
    if ( users.length === 0 )
    {
      userDetails();
    }
  }, [] );

  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
      },
    },
    open: {
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.09,
        staggerDirection: 1,
      }
    }
  };
  const mobileLinksVars = {
    initial: {
      y: "100vh",
      transition: {
        duration: 0.1,
        ease: [ 0.37, 0, 0.63, 1 ]
      }
    }, open: {
      y: 0,
      transition: {
        duration: .5,
        ease: [ 0, 0.55, 0.45, 1 ]
      }
    }
  };
  return (
    <div id="main-container" data-scroll-container>
      <ContentWrapper>
        <h1 className="flex justify-center items-center text-animation text-6xl font-myFont">Pay</h1>
        <div className="text-white flex flex-col h-screen mt-10" data-scroll-container>
          <motion.div variants={ containerVars } initial="initial" animate="open" className="overflow-hidden flex justify-between text-white mobile:flex-col" data-scroll-section>
            <div className="flex flex-col gap-6 mobile:gap-2 font-myFont">
              <motion.h1 variants={ mobileLinksVars } className="text-5xl mobile:text-2xl">Billed To : { users[ 0 ]?.mobile_number }</motion.h1>
              <motion.div variants={ mobileLinksVars } className="flex  text-3xl mobile:text-xl">
                <motion.h1 variants={ mobileLinksVars }>Pick Up Address : &nbsp;</motion.h1>  { users[ 0 ]?.pick_up_address }
              </motion.div>
              <motion.div variants={ mobileLinksVars } className="flex  text-3xl mobile:text-xl">
                <motion.h1 variants={ mobileLinksVars }>Drop Up Address : &nbsp;</motion.h1>{ users[ 0 ]?.drop_up_address }
              </motion.div>
            </div>

            <div className="flex flex-col gap-6 mobile:gap-2 mobile:mt-3 items-end mobile:items-start font-myFont">
              <motion.h1 variants={ mobileLinksVars } className="text-5xl mobile:text-xl ">Society : { users[ 0 ]?.society }</motion.h1>
              <motion.div variants={ mobileLinksVars } className="flex  text-3xl mobile:text-xl">
                <motion.h1 variants={ mobileLinksVars }>Area : &nbsp;</motion.h1>  { users[ 0 ]?.area }
              </motion.div>
              <motion.div variants={ mobileLinksVars } className="flex  text-3xl mobile:text-xl">
                <motion.h1 variants={ mobileLinksVars }>Time : &nbsp;</motion.h1>  { users[ 0 ]?.time }
              </motion.div>
            </div>
          </motion.div>
          <PayCard users={ users } />
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Invoice;