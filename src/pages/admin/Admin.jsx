
import { AnimatePresence, motion } from 'framer-motion';
import ContentWrapper from './../../components/contentWrapper/ContentWrapper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { allUsersDataAction } from '../../store/allUsersData';
import dayjs from 'dayjs';
import SwitchTabs from '../../components/switchTabs/SwitchTabs';
import { CircleX, ClipboardPen, RefreshCw, SquareCheckBig } from 'lucide-react';
import EditModal from './editModal/EditModal';
import DropDown from './dropDown/DropDown';
import { editUserAction } from '../../store/editUserData';
import { toast } from 'react-toastify';
import Button from '../../components/button/Button';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import LoadingAnimation from './loadingAnimation/LoadingAnimation';
import useLocoScroll from '../../hooks/useLocoScroll';
import SetAllDataModal from './setAllDataModal/SetAllDataModal';
const Admin = () =>
{
  const tableDataCss = "py-2 px-4 border-b border-gray-200";

  const InputAnimation = " block py-2.5 px-0 w-[30vw] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";

  const Label = "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";


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
        duration: 1,
        ease: [ 0, 0.55, 0.45, 1 ]
      }
    }
  };

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
  const dispatch = useDispatch();
  const token = useSelector( state => state.registration );
  const users = useSelector( state => state.allUsersData );

  const data = [
    "All",
    "Name",
    "Number",
    "ID",
    "Pending",
    "Paid",

  ];

  const [ allDataModal, setAllDataModal ] = useState( false );
  const [ editModal, setEditModal ] = useState( false );
  const [ selectedFilter, setSelectedFilter ] = useState( "Select Filter" );
  const [ isOpen, setIsOpen ] = useState( false );

  const handleChange = ( e ) =>
  {
    const { value } = e.target;

    switch ( selectedFilter )
    {
      case "Number": {
        dispatch( allUsersDataAction.filterByNumberSearch( value ) );
        break;
      }
      case "Name": {
        dispatch( allUsersDataAction.filterByNameSearch( value ) );
        break;
      }
      case "ID": {
        dispatch( allUsersDataAction.filterByIdSearch( value ) );
        break;
      }
      case "All": {
        dispatch( allUsersDataAction.showStatusApproved() );
        break;
      }
      case "Pending": {
        dispatch( allUsersDataAction.showPending() );
        break;
      }
      case "Paid": {
        dispatch( allUsersDataAction.showPaid() );
        break;
      }
    }
  };


  const handleOpenModal = ( user ) =>
  {
    dispatch( editUserAction.getEditUserData( user ) );
    setEditModal( true );
  };

  const handleCloseModal = () =>
  {
    setEditModal( false );
    dispatch( editUserAction.removeUser() );
  };

  const handleTab = ( filter ) =>
  {
    setSelectedFilter( filter );
    setIsOpen( false );
  };

  const toggleDropdown = () =>
  {
    setIsOpen( !isOpen );
  };

  const fetchData = async () =>
  {
    try
    {
      const res = await axios.get( import.meta.env.VITE_ADMIN_API + "/getallusers", {
        headers: {
          Authorization: `Bearer ${ token }`,
        }
      } );
      dispatch( allUsersDataAction.getAllUsersData( res.data ) );
      toast.success( "Data Fetch Successfully", {
        theme: "dark",
        autoClose: 1000,
      } );
    } catch ( error )
    {
      console.log( error );
    }
  };
  const handleDelete = async ( name, id ) =>
  {
    try
    {
      const res = await axios.delete( import.meta.env.VITE_ADMIN_API + `/delete/${ id }`, {
        headers: {
          Authorization: `Bearer ${ token }`,
        }
      } );
      toast.error( `${ name } ${ res.data.msg }`, {
        theme: "dark",
        autoClose: 2500,
      } );
      dispatch( allUsersDataAction.deleteUser( id ) );
    } catch ( error )
    {
      console.log( error );
    }
  };

  const handleApproved = async ( name, user ) =>
  {
    const payload = {
      ...user,
      status: true,
    };
    try
    {
      const res = await axios.patch( import.meta.env.VITE_ADMIN_API + `/updatesingle/${ user.mobile_number }`, payload, {
        headers: {
          Authorization: `Bearer ${ token }`,
        }
      } );
      toast.success( `${ name } Form Approved ✅`, {
        theme: "dark",
        autoClose: 2500,
      } );
      dispatch( allUsersDataAction.statusPending( res.data ) );
    } catch ( error )
    {
      console.log( error );
    }
  };

  const downloadPDF = async () =>
  {
    const doc = new jsPDF( { orientation: "landscape" } );
    doc.autoTable( {
      // theme: 'grid',
      // styles: { minCellWidth: 1, fontSize: 5 },
      html: '#data-table',
      startY: 30,
      styles: {
        fontSize: 5,
        valign: 'middle',
        halign: 'center',
        lineColor: [ 44, 62, 80 ],
        lineWidth: 0.5,
      },
      headStyles: {
        fillColor: [ 41, 128, 185 ],
        textColor: [ 255, 255, 255 ],
        fontStyle: 'bold',
      },
      bodyStyles: {
        fillColor: [ 245, 245, 245 ],
      },
      alternateRowStyles: {
        fillColor: [ 255, 255, 255 ],
      },
      theme: 'striped',
    } );
    doc.save( 'data.pdf' );
  };
  useEffect( () =>
  {
    if ( users.copyData.length === 0 )
    {
      fetchData();
    }
  }, [] );



  const handleSetAllDataModal = () =>
  {
    setAllDataModal( !allDataModal );
  };
  useLocoScroll();
  return (
    <>
      <div className='font-myFont text-white' data-scroll-container>
        { !users.loading ? <LoadingAnimation /> :
          <AnimatePresence data-scroll-section>
            <ContentWrapper>
              <div className='h-screen'>
                <motion.div className='overflow-hidden' variants={ containerVars } initial="initial" animate="open">
                  <motion.h1 className='text-6xl text-center text-animation' variants={ mobileLinksVars }>
                    Admin
                  </motion.h1>



                  <div className='flex justify-between m-5'>
                    <div className="relative">
                      <input type={ selectedFilter === "Number" ? "number" : "text" } name="search" id="search" onChange={ handleChange } className={ InputAnimation } placeholder=" " required />
                      <label htmlFor="search" className={ Label }>Search</label>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div title='reload' onClick={ () => fetchData() } className='cursor-pointer'>
                        <RefreshCw />
                      </div>
                      <SwitchTabs />
                      <DropDown data={ data } tab={ selectedFilter } handleTab={ handleTab } toggleDropdown={ toggleDropdown } isOpen={ isOpen } />
                      <div onClick={ handleSetAllDataModal }>
                        <Button text={ "Set All" } />
                      </div>
                    </div>
                  </div>


                  {
                    users.copyData.length === 0 && (
                      <div className='flex items-center justify-center'>
                        <h1 className='text-9xl text-animation'>Not Data Found</h1>
                      </div>
                    )
                  }

                  <div className='overflow-x-scroll h-screen'>
                    <motion.table className='min-w-full border-collapse' id='data-table'>
                      {
                        users.copyData.length > 0 &&
                        ( <thead>
                          <tr>
                            { [ 'ID', 'Password', 'Name', 'Pick Up Address', 'Drop Up Address', 'Area', 'Gender', 'STD', 'DIV', 'Society', 'Number', 'Alternate Number', 'Time', 'Route', 'Pending Amount', 'Paid Amount',
                              'Total Amount', 'Quarter', 'Start Date', 'End Date', 'Payment Date', 'Due Date', 'Status', 'Rate', 'Transaction ID' ].map( ( header, i ) => (
                                <th key={ i } className="py-2 px-4  text-left text-sm font-myFont text-white tracking-wide text-nowrap">
                                  { header }
                                </th>
                              ) ) }
                          </tr>
                        </thead> )
                      }

                      <tbody>
                        {
                          users.copyData?.map( ( users, i ) => (
                            <motion.tr key={ i }
                              whileHover={ { backgroundColor: "#1b1b1b", cursor: "Pointer" } }
                              className="transition duration-75 ease-in-out font-myFont tracking-wide text-nowrap"
                            >
                              <td className={ tableDataCss }>{ users.id }</td>
                              <td className={ tableDataCss }>{ users.password }</td>
                              <td className={ tableDataCss }>{ users.student_name }</td>
                              <td className={ tableDataCss }>{ users.pick_up_address }</td>
                              <td className={ tableDataCss }>{ users.drop_up_address }</td>
                              <td className={ tableDataCss }>{ users.area.charAt( 0 ).toUpperCase() + users.area.slice( 1 ) }</td>
                              <td className={ tableDataCss }>{ users.gender === "M" ? "Male" : "Female" }</td>
                              <td className={ tableDataCss }>{ users.std }</td>
                              <td className={ tableDataCss }>{ users.div }</td>
                              <td className={ tableDataCss }>{ users.society }</td>
                              <td className={ tableDataCss }>{ users.mobile_number }</td>
                              <td className={ tableDataCss }>{ users.alternate_number }</td>
                              <td className={ tableDataCss }>{ users.time }</td>
                              <td className={ tableDataCss }>{ users.route }</td>
                              <td className={ tableDataCss }>{ users.pending_amount }</td>
                              <td className={ tableDataCss }>{ users.paid_amount }</td>
                              <td className={ tableDataCss }>{ users.total_amount }</td>
                              <td className={ tableDataCss }>{ users.quarter }</td>
                              <td className={ tableDataCss }>{ dayjs( users.start_date ).format( 'DD-MMMM-YYYY' ) }</td>
                              <td className={ tableDataCss }>{ dayjs( users.end_date ).format( 'DD-MMMM-YYYY' ) }</td>
                              <td className={ tableDataCss }>{ dayjs( users.payment_date ).format( 'DD-MMMM-YYYY' ) }</td>
                              <td className={ tableDataCss }>{ dayjs( users.due_date ).format( "D-MMMM-YYYY" ) }</td>
                              <td className={ tableDataCss }>{ users.status ? <span className='inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500'>Approved</span> : <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500">Pending</span> }</td>
                              <td className={ tableDataCss }>{ users.rate }</td>
                              <td className={ tableDataCss }>{ users.paymentId }</td>
                              {
                                users.status ? "" : <td className={ tableDataCss } onClick={ () => handleApproved( users.student_name, users ) }><SquareCheckBig /></td>
                              }
                              <td className={ tableDataCss } onClick={ () => handleOpenModal( users ) }><ClipboardPen /></td>
                              <td className={ tableDataCss } onClick={ () => handleDelete( users.student_name, users._id ) }><CircleX /></td>
                            </motion.tr>
                          ) )
                        }
                      </tbody>
                    </motion.table>
                    <div className='flex justify-end mt-10'>
                      <CSVLink className="mr-10" data={ users.copyData } filename={ "my-file.csv" }>
                        <Button text={ "Excel" } />
                      </CSVLink>
                      <div onClick={ downloadPDF }>
                        <Button text={ "PDF" } />
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>

            </ContentWrapper>
          </AnimatePresence> }
      </div>
      { editModal && <EditModal closeModal={ handleCloseModal } /> }
      { allDataModal && <SetAllDataModal closeModal={ handleSetAllDataModal } /> }
    </>
  );
};

export default Admin;