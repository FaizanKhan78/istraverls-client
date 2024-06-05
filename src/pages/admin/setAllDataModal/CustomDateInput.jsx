import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const CustomDateInput = React.forwardRef( ( { value, onClick, onChange, placeholder }, ref ) => (
  <div className="relative">
    <motion.input
      whileFocus={ { scale: 1.05 } }
      whileHover={ { scale: 1.02 } }
      type="text"
      value={ value }
      onClick={ onClick }
      onChange={ onChange }
      ref={ ref }
      placeholder={ placeholder }
      className="text-white bg-gray-800 p-2 pr-10 rounded-lg outline-none w-full"
      readOnly
    />
    <span className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer">
      <Calendar className="text-white" onClick={ onClick } />
    </span>
  </div>
) );

export default CustomDateInput;
