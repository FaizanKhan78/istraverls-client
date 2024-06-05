import ContentWrapper from "../contentWrapper/ContentWrapper";
import image from '../../assets/images/aboutus.jpeg';
import { motion } from "framer-motion";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100
  },
  animate: ( i ) => (
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

const About = () =>
{

  const about = [
    {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius in expedita excepturi accusantium cumque, consequatur a provident eos illo quis voluptatem tenetur animi. Debitis, blanditiis. Optio recusandae accusantium nulla natus."
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius in expedita excepturi accusantium cumque, consequatur a provident eos illo quis voluptatem tenetur animi. Debitis, blanditiis. Optio recusandae accusantium nulla natus."
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius in expedita excepturi accusantium cumque, consequatur a provident eos illo quis voluptatem tenetur animi. Debitis, blanditiis. Optio recusandae accusantium nulla natus."
    }
  ];
  return (
    <ContentWrapper>
      <div className="h-screen flex items-center justify-between w-full" data-scroll-section>
        {/* Left */ }
        <motion.div className="tablet:hidden" variants={ fadeInAnimationVariants } initial="initial" whileInView="animate" viewport={ {
          once: true,
        } }>
          <img src={ image } alt="" />
        </motion.div>
        {/* Right */ }
        <div className="w-[50vw] tablet:w-screen flex flex-col justify-start px-8 mobile:p-4">
          <motion.h1 variants={ fadeInAnimationVariants } initial="initial" whileInView="animate" viewport={ {
            once: true,
          } } className="font-myFont text-white text-8xl tracking-wide text-animation mobile:text-6xl">About Us</motion.h1>
          <ul>
            {
              about.map( ( item, i ) =>
              {
                return (
                  <motion.li className="text-white font-myFont mt-6" key={ i } variants={ fadeInAnimationVariants } initial="initial" whileInView="animate" viewport={ {
                    once: true,
                  } }
                    custom={ i }>
                    <h4 className="text-4xl">Our Vision</h4>
                    <p className="text-gray-300 mt-3">
                      { item.text }
                    </p>
                    <hr className="mt-5" />
                  </motion.li>
                );
              } )
            }
          </ul>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default About;