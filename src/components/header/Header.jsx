import { NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import AnimateLink from '../animate/AnimateLink';
import Button from '../button/Button';
import RegisterModal from '../registerModal/RegisterModal';
import useLocoScroll from './../../hooks/useLocoScroll';
import LoginModal from '../loginModal/LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { registrationActions } from '../../store/registration';
import { usersActions } from '../../store/users';
import { jwtDecode } from 'jwt-decode';
const Header = () =>
{
  const [ open, setOpen ] = useState( false );
  const [ hidden, setHidden ] = useState( false );
  const [ lastScrollY, setLastScrollY ] = useState( 0 );
  const { scrollY } = useLocoScroll();

  const toggleMenu = () =>
  {
    setOpen( preValue => !preValue );
  };

  function controlNavbar ()
  {
    if ( scrollY > 200 && scrollY > lastScrollY )
    {
      setHidden( true );
    } else
    {
      setHidden( false );
    }
    setLastScrollY( scrollY );
  }

  useEffect( () =>
  {
    controlNavbar();
  }, [ scrollY ] );

  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [ 0.12, 0, 0.39, 0 ],
      }
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [ 0.22, 1, 0.36, 1 ],
      }
    }
  };

  const mobileLinksVars = {
    initial: {
      y: "30vh",
      transition: {
        duration: 0.5,
        ease: [ 0.37, 0, 0.63, 1 ]
      }
    }, open: {
      y: 0,
      transition: {
        duration: 0.7,
        ease: [ 0, 0.55, 0.45, 1 ]
      }
    }
  };

  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      }
    }
  };

  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      y: 100
    },
    animate: ( i = 1 ) => (
      {
        opacity: 1,
        y: 0,

        transition: {
          delay: .08 * i,
          duration: .5,
          ease: [ 0.12, 0, 0.39, 0 ],
        }
      }
    )

  };

  const [ modal, setModal ] = useState( false );
  const [ loginModal, setLoginModal ] = useState( false );
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLoginModal = () =>
  {
    setLoginModal( !loginModal );
  };

  const handleModal = () =>
  {
    setModal( !modal );
  };
  const token = useSelector( state => state.registration );

  const handleLogout = () =>
  {
    navigate( '/' );
    dispatch( registrationActions.logoutUser() );
    dispatch( usersActions.deleteUsers() );
  };

  const users = useSelector( state => state.users );

  useEffect( () =>
  {
    if ( token )
    {
      const decode = jwtDecode( localStorage.getItem( "token" ) );
      dispatch( usersActions.addUsers( decode ) );
    }
  }, [ token ] );


  return (
    <>
      <motion.header
        className='bg-background flex text-white px-10 tablet:py-4 justify-between tablet:flex-row-reverse py-4 items-center sticky top-0 z-50' variants={ {
          visible: { y: 0 },
          hidden: { y: -100 }
        } } animate={ hidden ? "hidden" : "visible" } transition={ { duration: 0.35, ease: "easeInOut" } }>
        <div className="tablet:hidden">
          <motion.h1 variants={ fadeInAnimationVariants } initial="initial" animate="animate" viewport={ {
            once: true,
          } } className='text-2xl font-custom text-animation tracking-widest'>
            ISTRAVELS.</motion.h1>
        </div>
        {/* Admin ke liye width set karne ka hai. width kar ne la 20rem */ }
        <ul className='flex justify-around w-[35rem] text-lg font-custom tablet:hidden'>
          <motion.li variants={ fadeInAnimationVariants } initial="initial" animate="animate" viewport={ {
            once: true,
          } } className='relative'>
            <NavLink to='/'>
              <AnimateLink title={ "Home" } />
            </NavLink>
          </motion.li>
          { users[ 0 ]?.isAdmin &&
            (
              <>
                <motion.li variants={ fadeInAnimationVariants } initial="initial" animate="animate" viewport={ {
                  once: true,
                } } className='relative'>
                  <NavLink to='admin'>
                    <AnimateLink title={ "Admin" } />
                  </NavLink>
                </motion.li>
              </>
            )
          }
          {
            users[ 0 ]?.isStatus &&
            (
              <>
                <motion.li variants={ fadeInAnimationVariants } initial="initial" animate="animate" viewport={ {
                  once: true,
                } } className='relative'>
                  <NavLink to='pay'>
                    <AnimateLink title={ "Pay" } />
                  </NavLink>
                </motion.li>
              </>
            )
          }
          {
            // users[ 0 ]?.isStatus &&
            // (
            //   <>
            //     <motion.li variants={ fadeInAnimationVariants } initial="initial" animate="animate" viewport={ {
            //       once: true,
            //     } } className='relative'>
            //       <NavLink to='transactions'>
            //         <AnimateLink title={ "Transactions" } />
            //       </NavLink>
            //     </motion.li>
            //   </>
            // )
          }
        </ul>
        <div className='tablet:w-full tablet:flex tablet:items-center tablet:mr-4 tablet:justify-end tracking-widest font-myFont font-medium hidden cursor-pointer text-animation' onClick={ toggleMenu }>
          <span>Menu</span>
        </div>
        <div className='flex items-center  justify-between w-[24%] tablet:min-w-[38%]'>
          { !token ? ( <motion.NavLink variants={ fadeInAnimationVariants } initial="initial" animate="animate" viewport={ {
            once: true,
          } } onClick={ handleLoginModal } className='tablet:hidden text-lg font-myFont relative tracking-wider cursor-pointer'>
            <AnimateLink title={ "Login" } />
          </motion.NavLink> ) : (
            <motion.NavLink variants={ fadeInAnimationVariants } initial="initial" animate="animate" viewport={ {
              once: true,
            } } onClick={ handleLogout } className='tablet:hidden text-lg font-myFont relative tracking-wider cursor-pointer'>
              <AnimateLink title={ "Logout" } />
            </motion.NavLink>
          ) }

          { !token && ( <motion.div variants={ fadeInAnimationVariants } initial="initial" animate="animate" viewport={ {
            once: true,
          } } onClick={ handleModal }>
            <Button text={ "Register" } />
          </motion.div> ) }
        </div>
      </motion.header>
      <AnimatePresence>
        { open && (
          <motion.div variants={ menuVars } initial="initial"
            animate="animate" exit="exit" className='tablet:fixed tablet:origin-top tablet:left-0 tablet:top-0 tablet:w-full tablet:h-screen tablet:backdrop-blur-2xl tablet:text-white p-10 tablet:block hidden z-50'>
            <div className='tablet:flex tablet:h-full tablet:flex-col hidden'>
              <div className='tablet:flex tablet:justify-between  hidden'>
                <h1 className='tablet:text-2xl text-animation tablet:before:block tablet:before:rounded-full tablet:before:h-2 tablet:before:w-2 tablet:before:bg-white tablet:before:absolute tablet:font-Logo tablet:before:left-6 tablet:before:top-12 tablet:block hidden tracking-widest'>ISTRAVELS.</h1>
                <p className='tablet:cursor-pointer tablet:text-xl tracking-widest tablet:text-white tablet:block hidden' onClick={ toggleMenu }>Close</p>
              </div>
              <motion.ul variants={ containerVars } exit="initial" initial="initial" animate="open" className='tablet:flex tablet:flex-col tablet:h-full tablet:justify-center font-myFont hidden tablet:items-center tablet:gap-4'>
                <div className='tablet:overflow-hidden'>
                  <motion.li variants={ mobileLinksVars } className='tablet:relative'>
                    <NavLink to="/" className="tablet:uppercase tablet:block tablet:tracking-wider tablet:text-xl">
                      <AnimateLink title={ "Home" } />
                    </NavLink>
                  </motion.li>
                </div>
                {
                  users[ 0 ]?.isStatus
                  &&
                  <div className='tablet:overflow-hidden' onClick={ toggleMenu }>
                    <motion.li variants={ mobileLinksVars } className='tablet:relative'>
                      <NavLink to="pay" className="tablet:uppercase tablet:block tablet:tracking-wider tablet:text-xl">
                        <AnimateLink title={ "Pay" } />
                      </NavLink>
                    </motion.li>
                  </div>
                }
                {
                  // users[ 0 ]?.isStatus
                  // &&
                  // <div className='tablet:overflow-hidden' onClick={ toggleMenu }>
                  //   <motion.li variants={ mobileLinksVars } className='tablet:relative'>
                  //     <NavLink to="transaction" className="tablet:uppercase tablet:block tablet:tracking-wider tablet:text-xl">
                  //       <AnimateLink title={ "Transactions" } />
                  //     </NavLink>
                  //   </motion.li>
                  // </div>
                }
                {
                  users[ 0 ]?.isAdmin
                  &&
                  <div className='tablet:overflow-hidden' onClick={ toggleMenu }>
                    <motion.li variants={ mobileLinksVars } className='tablet:relative'>
                      <NavLink to="admin" className="tablet:uppercase tablet:block tablet:tracking-wider tablet:text-xl">
                        <AnimateLink title={ "Admin" } />
                      </NavLink>
                    </motion.li>
                  </div>
                }
                { !token ? ( <div className='tablet:overflow-hidden'>
                  <motion.li variants={ mobileLinksVars } className='tablet:relative'>
                    <NavLink onClick={ handleLoginModal } className="tablet:uppercase tablet:block tablet:tracking-wider tablet:text-xl">
                      <AnimateLink title={ "Login" } />
                    </NavLink>
                  </motion.li>
                </div> ) : (
                  <div className='tablet:overflow-hidden'>
                    <motion.li variants={ mobileLinksVars } className='tablet:relative'>
                      <NavLink onClick={ handleLogout } className="tablet:uppercase tablet:block tablet:tracking-wider tablet:text-xl">
                        <AnimateLink title={ "Logout" } />
                      </NavLink>
                    </motion.li>
                  </div>
                ) }
              </motion.ul>
            </div>
          </motion.div>
        ) }
      </AnimatePresence >
      { modal && <RegisterModal closeModal={ handleModal } /> }
      { loginModal && <LoginModal closeModal={ handleLoginModal } /> }
    </>
  );
};

export default Header;