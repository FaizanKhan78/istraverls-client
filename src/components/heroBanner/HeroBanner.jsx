import About from "../about/About";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Button from './../button/Button';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import FAQ from '../faq/FAQ';
import useLocoScroll from '../../hooks/useLocoScroll';
import Footer from "../footer/Footer";
import RegisterModal from "../registerModal/RegisterModal";
import { useSelector } from "react-redux";


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
const HeroBanner = () =>
{
  useLocoScroll();
  const token = useSelector( state => state.registration );
  const [ modal, setModal ] = useState( false );
  const handleModal = () =>
  {
    setModal( !modal );
  };
  return (
    <>
      <div id="main-container" data-scroll-container>
        <ContentWrapper>
          <motion.section className="w-full py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto" data-scroll-section>
            <motion.div variants={ containerVars } initial="initial" animate="open" className="overflow-hidden">
              <motion.span variants={ mobileLinksVars } className="block mb-4   text-xs md:text-sm text-indigo-500 font-myFont">
                Better every day
              </motion.span>
              <motion.h1 variants={ mobileLinksVars }

                className="text-8xl text-white font-myFont text-animation ">Let us Make Your <br />Event Shine.</motion.h1>
              <motion.p variants={ mobileLinksVars }
                className="text-base font-myFont md:text-lg text-slate-500 my-4 md:my-6">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nobis in
                error repellat voluptatibus ad.
              </motion.p>
              <motion.div variants={ mobileLinksVars }
              >
                {
                  !token &&
                  (
                    <div onClick={ handleModal }>
                      <Button text={ "Register Now" } />
                    </div>
                  )
                }
              </motion.div>
            </motion.div>
            <ShuffleGrid />
          </motion.section>
        </ContentWrapper>
        <About />
        <FAQ />
        <Footer />
      </div>
      { modal && <RegisterModal closeModal={ handleModal } /> }
    </>
  );
};

const shuffle = ( array ) =>
{
  let currentIndex = array.length,
    randomIndex;

  while ( currentIndex != 0 )
  {
    randomIndex = Math.floor( Math.random() * currentIndex );
    currentIndex--;

    [ array[ currentIndex ], array[ randomIndex ] ] = [
      array[ randomIndex ],
      array[ currentIndex ],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://i.pinimg.com/564x/e1/4e/48/e14e487e4cfc53a724fb707204e205d1.jpg",
  },
  {
    id: 2,
    src: "https://i.pinimg.com/736x/57/19/cc/5719ccf08f97b40f1c51ebc6620bf705.jpg",
  },
  {
    id: 3,
    src: "https://i.pinimg.com/564x/5c/12/cd/5c12cd1e655ad94ea176544b70748188.jpg",
  },
  {
    id: 4,
    src: "https://i.pinimg.com/564x/02/45/93/024593fe0de6e909de5a4abdf880d8b0.jpg",
  },
  {
    id: 5,
    src: "https://i.pinimg.com/564x/12/68/b1/1268b1c9875f0066a4581b178383d11d.jpg",
  },
  {
    id: 6,
    src: "https://i.pinimg.com/564x/1d/82/30/1d8230f064d17759eedf4202bda7f9c0.jpg",
  },
  {
    id: 7,
    src: "https://i.pinimg.com/564x/dc/0f/3b/dc0f3b9d827bcd328b0c1cb038a1f8fc.jpg",
  },
  {
    id: 8,
    src: "https://i.pinimg.com/564x/db/30/7b/db307ba1717771093c3e915f265ce3c0.jpg",
  },
  {
    id: 9,
    src: "https://i.pinimg.com/564x/dc/87/f7/dc87f7252564d755217278159df19009.jpg",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1610768764270-790fbec18178?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=684&q=80",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=882&q=80",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1606244864456-8bee63fce472?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=681&q=80",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1820&q=80",
  },
];

const generateSquares = () =>
{
  return shuffle( squareData ).map( ( sq ) => (
    <motion.div
      key={ sq.id }
      layout
      transition={ { duration: 1.5, type: "spring" } }
      className="w-full h-full"
      style={ {
        backgroundImage: `url(${ sq.src })`,
        backgroundSize: "cover",
      } }
    ></motion.div>
  ) );
};

const ShuffleGrid = () =>
{
  const timeoutRef = useRef( null );
  const [ squares, setSquares ] = useState( generateSquares() );

  useEffect( () =>
  {
    shuffleSquares();

    return () => clearTimeout( timeoutRef.current );
  }, [] );

  const shuffleSquares = () =>
  {
    setSquares( generateSquares() );

    timeoutRef.current = setTimeout( shuffleSquares, 3000 );
  };

  return (
    <motion.div variants={ mobileLinksVars }
      initial="initial" animate="open"
      className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      { squares.map( ( sq ) => sq ) }
    </motion.div>
  );
};

export default HeroBanner;