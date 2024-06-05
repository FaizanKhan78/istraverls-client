import { AnimatePresence, motion } from 'framer-motion';

const ModalContainer = ( { closeModal, children } ) =>
{
  return (
    <AnimatePresence>
      <motion.div
        initial={ { opacity: 0 } }
        animate={ { opacity: 1 } }
        exit={ { opacity: 0 } }
        onClick={ closeModal }
        className=" backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer "
      >
        <motion.div
          initial={ { scale: 0, rotate: "90.5deg" } }
          animate={ { scale: 1, rotate: "0deg" } }
          exit={ { scale: 0, rotate: "12.5deg" } }
          onClick={ ( e ) => e.stopPropagation() }
          className="bg-gradient-to-br bg-[#010400] p-10 mobile:p-4 text-white rounded-lg w-full max-w-4xl shadow-xl cursor-default relative"
        >
          { children }
        </motion.div>

      </motion.div>
    </AnimatePresence>
  );
};

export default ModalContainer;