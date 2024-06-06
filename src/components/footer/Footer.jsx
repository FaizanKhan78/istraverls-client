
import { NavLink } from 'react-router-dom';
import AnimateLink from '../animate/AnimateLink';
import ContentWrapper from './../contentWrapper/ContentWrapper';
import { Facebook, Instagram, Twitch, Twitter, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';
const Footer = () =>
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

  const navLink = [
    {
      link: '/',
      name: 'Home',
    }
  ];

  const icon = [
    {
      icon: <Instagram />,
    },
    {
      icon: <Facebook />,
    },
    {
      icon: <Twitch />
    },
    {
      icon: <Twitter />
    },
    {
      icon: <Youtube />
    },
  ];


  const string = "© ISTRAVELS. 2024 ISTRAVELS. All rights reserved.";
  const array = string.split( '' );


  return (
    <ContentWrapper>
      <div className="h-[60vh] text-white tablet:h-[40vh] mobile:h-[40vh] font-myFont px-20 mobile:px-0 tracking-wider iphone-se:h-[40vh]" data-scroll-section>
        <footer className='flex justify-between items-center tablet:justify-evenly mobile:flex-col'>
          <div className='mobile:mb-5'>
            <motion.h1 className='text-6xl font-custom tracking-wider text-animation tablet:text-3xl' variants={ fadeInAnimationVariants } initial="initial" whileInView="animate" viewport={ { once: true } }>ISTRAVELS.</motion.h1>
            <motion.h5 variants={ fadeInAnimationVariants } initial="initial" whileInView="animate" viewport={ { once: true } }>TRAVEL COMPANY.</motion.h5>
          </div>
          <ul className='flex justify-around w-[35rem] text-lg items-center font-custom tablet:hidden'>
            {
              navLink.map( ( links, i ) =>
              {
                return (
                  <motion.li variants={ fadeInAnimationVariants } initial="initial" whileInView="animate" custom={ i } key={ i } className='relative' viewport={ { once: true } }>
                    <NavLink to={ links.link }>
                      <AnimateLink title={ links.name } />
                    </NavLink>
                  </motion.li>
                );
              } )
            }
          </ul>
          <motion.div variants={ fadeInAnimationVariants } initial="initial" whileInView="animate" viewport={ { once: true } } className='mb-5'>
            1234 Elmwood Avenue<br />
            Suite 200<br />
            Springfield, State of Bliss<br />
            Countryland<br />
            Postal Code: 67890
          </motion.div>
        </footer>
        <motion.hr variants={ fadeInAnimationVariants } initial="initial" whileInView="animate" viewport={ {
          once: true,
        } } />
        <div className='flex items-center gap-5 py-5 justify-center'>
          {
            icon.map( ( item, i ) =>
            {
              return (
                <motion.div variants={ fadeInAnimationVariants } initial="initial" whileInView="animate" custom={ i } className='bg-white rounded-full p-[2px] overflow-hidden relative z-10' key={ i } viewport={ { once: true } }>
                  <div className='absolute z-20 inset-0 spinner-border'></div>
                  <div className='bg-background rounded-full h-10 w-10 cursor-pointer flex items-center justify-center relative z-30'>
                    { item.icon }
                  </div>
                </motion.div>
              );
            } )
          }
        </div>
        <div className='text-center text-white flex justify-center items-center mobile:hidden' >
          {
            array.map( ( char, i ) =>
            {
              return (
                <motion.h4
                  key={ i }
                  variants={ fadeInAnimationVariants }
                  initial="initial"
                  whileInView="animate"
                  viewport={ { once: true } }
                  custom={ i }
                  dangerouslySetInnerHTML={ { __html: char === ' ' ? '&nbsp;' : char } }
                ></motion.h4>
              );
            } )
          }
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Footer;