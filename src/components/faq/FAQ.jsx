import { useState } from "react";
import ContentWrapper from './../contentWrapper/ContentWrapper';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
const FAQ = () =>
{

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
          delay: 0.05 * i,
          // duration: .5,
          // ease: [ 0.12, 0, 0.39, 0 ],
        }
      }
    )

  };

  const [ activeQuestion, setActiveQuestion ] = useState( null );
  const faq = [
    {
      id: 1,
      question: "What is Lorem Ipsum?",
      answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      id: 2,
      question: "Why do we use it?",
      answer: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
    },
    {
      id: 3,
      question: "Where does it come from?",
      answer: "Contrary to popular belief, Lorem Ipsum is not simply random text."
    },
    {
      id: 4,
      question: "Where can I get some?",
      answer: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form."
    },
    {
      id: 5,
      question: "Is it free to use?",
      answer: "Yes, Lorem Ipsum is free to use for anyone."
    }
  ];

  const iconVariants = {
    open: { rotate: 180 },
    closed: { rotated: 0 }
  };

  return (
    <ContentWrapper>
      <div className=" flex justify-center flex-col my-20 mobile:mt-0 tablet:mb-0 items-center" data-scroll-section>
        <motion.h1
          variants={ fadeInAnimationVariants } initial="initial" whileInView="animate" viewport={ {
            once: true,
          } } className="text-white px-16 text-8xl font-myFont text-left w-full text-animation tracking-wider tablet:hidden">Frequently Ask<br /> Question's</motion.h1>
        <h1 className="hidden tablet:block mobile:mt-3  mobile:mb-10 text-white px-16 text-8xl  font-myFont text-center w-full mobile:p-0 text-animation tracking-wider mobile:text-8xl">FAQ's</h1>
        <div className="w-[89%] p-8 mobile:p-0">
          {
            faq.map( ( q, i ) =>
            {
              return (
                <motion.div key={ q.id } variants={ fadeInAnimationVariants } initial="initial" whileInView="animate" viewport={ {
                  once: true,
                } } custom={ i }>
                  <div className="w-full cursor-pointer text-left text-xl flex justify-between items-center text-white font-myFont tracking-wider" onClick={ () => setActiveQuestion( activeQuestion === q.id ? null : q.id ) }>
                    <span className={ activeQuestion === q.id && "text-blue-500 transition-colors duration-300" }>
                      { q.question }
                    </span>
                    <motion.div variants={ iconVariants } animate={ activeQuestion === q.id ? "open" : "closed" }>
                      <ChevronDown />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {
                      activeQuestion === q.id &&
                      (
                        <motion.div initial={ { opacity: 0, height: 0 } } animate={ { opacity: 1, height: "auto" } } exit={ { opacity: 0, height: 0 } } className="mt-2 text-gray-500">
                          <p>{ q.answer }</p>
                        </motion.div>
                      )
                    }
                  </AnimatePresence>
                  <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                </motion.div>

              );
            } )
          }
        </div>
      </div>
    </ContentWrapper>
  );
};

export default FAQ;