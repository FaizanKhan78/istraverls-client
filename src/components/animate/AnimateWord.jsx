import { motion } from 'framer-motion';
const AnimateWord = ( { title, animation, isHover } ) =>
{

  const titleAnimation = {
    rest: {
      transition: {
        staggerChildren: 0.003,
      },
    },
    hover: {
      transition: {
        staggerChildren: 0.003,
      }
    }
  };
  return (
    <motion.span variants={ titleAnimation } initial="rest" animate={ isHover ? "hover" : "rest" } className='whitespace-nowrap relative'>
      {
        title.split( "" ).map( ( character, i ) => character === " " ? ( <span key={ i }>&nbsp;</span> ) : ( <motion.span variants={ animation } className='relative inline-block whitespace-nowrap' key={ i }>{ character }</motion.span> ) )
      }
    </motion.span >
  );
};
export default AnimateWord;