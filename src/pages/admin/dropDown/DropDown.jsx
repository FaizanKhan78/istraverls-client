// import { SquareUser, Phone, ChevronDown, TrendingDown, Users, IndianRupee, CreditCard } from 'lucide-react';
// import { motion } from "framer-motion";
// import { useState } from "react";
// import { useDispatch } from 'react-redux';
// import { allUsersDataAction } from '../../../store/allUsersData';

// const DropDown = ( { setSelectedFilter } ) =>
// {
//   const [ open, setOpen ] = useState( false );

//   const handleSelect = ( text ) =>
//   {
//     setOpen( false );
//     setSelectedFilter( text );
//   };
//   const dispatch = useDispatch();

//   return (
//     <div className=" flex items-center justify-center bg-[#010111]">
//       <motion.div animate={ open ? "open" : "closed" } className="relative">
//         <button
//           onClick={ () => setOpen( ( pv ) => !pv ) }
//           className="flex items-center gap-2 px-3 py-2 rounded-md text-indigo-50  hover:bg-black transition-colors"
//         >
//           <span className="font-myFont text-sm">Filter By</span>
//           <motion.span variants={ iconVariants }>
//             <ChevronDown />
//           </motion.span>
//         </button>

//         <motion.ul
//           initial={ wrapperVariants.closed }
//           variants={ wrapperVariants }
//           style={ { originY: "top", translateX: "-50%" } }
//           className="flex flex-col gap-2 p-2 rounded-lg bg-black shadow-xl absolute top-[120%] left-[50%] w-48 "
//         >
//           <Option handleSelect={ handleSelect } Icon={ SquareUser } text="Name" />
//           <Option handleSelect={ handleSelect } Icon={ Phone } text="Number" />
//           <Option handleSelect={ handleSelect } Icon={ CreditCard } text="ID" />
//           <motion.li
//             variants={ itemVariants }
//             onClick={ () =>
//             {
//               dispatch( allUsersDataAction.showPending() );
//               setOpen( false );
//             } }
//             className="flex items-center gap-2 w-full p-2 text-xs font-myFon whitespace-nowrap rounded-md hover:bg-[#191516] text-white hover:text-blue-500 transition-colors cursor-pointer"
//           >
//             <motion.span variants={ actionIconVariants }>
//               <TrendingDown />
//             </motion.span>
//             <span>Pending</span>
//           </motion.li>

//           <motion.li
//             variants={ itemVariants }
//             onClick={ () =>
//             {
//               dispatch( allUsersDataAction.showStatusApproved() );
//               setOpen( false );
//             } }
//             className="flex items-center gap-2 w-full p-2 text-xs font-myFon whitespace-nowrap rounded-md hover:bg-[#191516] text-white hover:text-blue-500 transition-colors cursor-pointer"
//           >
//             <motion.span variants={ actionIconVariants }>
//               <Users />
//             </motion.span>
//             <span>All</span>
//           </motion.li>

//           <motion.li
//             variants={ itemVariants }
//             onClick={ () =>
//             {
//               setOpen( false );
//               dispatch( allUsersDataAction.showPaid() );
//             } }
//             className="flex items-center gap-2 w-full p-2 text-xs font-myFon whitespace-nowrap rounded-md hover:bg-[#191516] text-white hover:text-blue-500 transition-colors cursor-pointer"
//           >
//             <motion.span variants={ actionIconVariants }>
//               <IndianRupee />
//             </motion.span>
//             <span>Paid</span>
//           </motion.li>
//         </motion.ul>

//       </motion.div>
//     </div>
//   );
// };

// const Option = ( { text, Icon, handleSelect } ) =>
// {
//   return (
//     <motion.li
//       variants={ itemVariants }
//       onClick={ () => handleSelect( text ) }
//       className="flex items-center gap-2 w-full p-2 text-xs font-myFon whitespace-nowrap rounded-md hover:bg-[#191516] text-white hover:text-blue-500 transition-colors cursor-pointer"
//     >
//       <motion.span variants={ actionIconVariants }>
//         <Icon />
//       </motion.span>
//       <span>{ text }</span>
//     </motion.li>
//   );
// };

// export default DropDown;

// const wrapperVariants = {
//   open: {
//     scaleY: 1,
//     transition: {
//       when: "beforeChildren",
//       staggerChildren: 0.1,
//     },
//   },
//   closed: {
//     scaleY: 0,
//     transition: {
//       when: "afterChildren",
//       staggerChildren: 0.1,
//     },
//   },
// };

// const iconVariants = {
//   open: { rotate: 180 },
//   closed: { rotate: 0 },
// };

// const itemVariants = {
//   open: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       when: "beforeChildren",
//     },
//   },
//   closed: {
//     opacity: 0,
//     y: -15,
//     transition: {
//       when: "afterChildren",
//     },
//   },
// };

// const actionIconVariants = {
//   open: { scale: 1, y: 0 },
//   closed: { scale: 0, y: -7 },
// };


import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";


const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};
const DropDown = ( { data, tab, handleTab, toggleDropdown, isOpen } ) =>
{

  return (
    <div className="relative inline-block w-full text-left">
      <div>
        <button
          onClick={ toggleDropdown }
          type="button"
          className="inline-flex justify-between items-center font-myFont tracking-wider w-full rounded-md   shadow-sm px-4 py-2 bg-[#0A0908] text-sm font-medium text-gray-300  focus:outline-none focus:ring-2 "
        >
          <h1 className="text-md">
            { tab.charAt( 0 ).toUpperCase() + tab.slice( 1 ) }
          </h1>
          <motion.div animate={ isOpen ? "open" : "closed" } variants={ iconVariants }>
            <ChevronDown color="white" />
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        { isOpen && (
          <motion.div
            initial={ { opacity: 0, y: -10 } }
            animate={ { opacity: 1, y: 0 } }
            exit={ { opacity: 0, y: -10 } }
            transition={ { duration: 0.2 } }
            className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-[#0A0908] ring-1 ring-black ring-opacity-5 z-50 focus:outline-none w-full"
          >
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {
                data?.map( ( d, i ) =>
                {
                  return (
                    <span
                      key={ i }
                      className="block px-4 tracking-wider cursor-pointer py-2 font-myFont text-sm text-gray-300 hover:bg-[#100e10] hover:text-white transition-all duration-200"
                      role="menuitem"
                      onClick={ () => handleTab( d ) }
                    >
                      { d.charAt( 0 ).toUpperCase() + d.slice( 1 ) }
                    </span>
                  );
                } )
              }
            </div>
          </motion.div>
        ) }
      </AnimatePresence>
    </div>
  );
};


export default DropDown;