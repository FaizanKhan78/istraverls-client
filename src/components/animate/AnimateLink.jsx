import { useState } from "react";
import AnimateWord from "./AnimateWord";
import { motion } from 'framer-motion';

const AnimateLink = ( { title } ) =>
{
  const letterAnimation = {
    rest: {
      y: 0,
    },
    hover: {
      y: -25,
      transition: {
        duration: 0.3,
        ease: [ 0.6, 0.01, 0.05, 0.95 ],
        type: "tween",
      }
    }
  };
  const letterAnimationTwo = {
    rest: {
      y: 25,
    },
    hover: {
      y: 0,
    }
  };
  const [ isHover, setIsHover ] = useState( false );
  return (
    <motion.div onMouseEnter={ () => { setIsHover( true ); } } onMouseLeave={ () => { setIsHover( false ); } } className="relative overflow-hidden cursor-pointer">
      <AnimateWord title={ title } animation={ letterAnimation } isHover={ isHover } />
      <div className=" absolute top-0">
        <AnimateWord title={ title } animation={ letterAnimationTwo } isHover={ isHover } />
      </div>
    </motion.div>
  );
};

export default AnimateLink;