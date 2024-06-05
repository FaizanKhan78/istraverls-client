import { motion } from 'framer-motion';

const Button = ( { text } ) =>
{
  return (
    <>
      <motion.button type='submit' className='px-6 py-2 rounded-md relative radial-gradient' initial={ { "--x": "100%", scale: 1 } } animate={ { "--x": "-100%" } } whileTap={ { scale: 0.97 } } transition={ {
        repeat: Infinity, repeatType: "loop", repeatDelay: 1, type: "spring", stiffness: 20, damping: 15, mass: 2, scale: {
          type: "spring",
          stiffness: 10,
          damping: 5,
          mass: 0.1,
        }
      } }>
        <span className='text-white font-myFont tracking-wide text-lg h-full w-full block relative linear-mask whitespace-nowrap text-animation'>
          { text }
        </span>
        <span className='block absolute inset-0 rounded-md p-px linear-overlay' />
      </motion.button>
    </>
  );
};

export default Button;