import { motion } from 'framer-motion';

const LoadingAnimation = () =>
{
  const circleCommonClasses = 'h-5 w-5 bg-blue-500 rounded-full';

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex space-x-2">
        <motion.div
          className={ circleCommonClasses }
          animate={ { y: [ 0, -20, 0 ] } }
          transition={ { repeat: Infinity, duration: 0.5, delay: 0 } }
        />
        <motion.div
          className={ circleCommonClasses }
          animate={ { y: [ 0, -20, 0 ] } }
          transition={ { repeat: Infinity, duration: 0.5, delay: 0.1 } }
        />
        <motion.div
          className={ circleCommonClasses }
          animate={ { y: [ 0, -20, 0 ] } }
          transition={ { repeat: Infinity, duration: 0.5, delay: 0.2 } }
        />
      </div>
    </div>
  );
};

export default LoadingAnimation;
