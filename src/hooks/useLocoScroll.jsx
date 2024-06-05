import { useEffect, useState } from "react";
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/src/locomotive-scroll.scss';
const useLocoScroll = () =>
{
  const [ scrollY, setScrollY ] = useState( 0 );
  useEffect( () =>
  {
    const scrollEl = document.querySelector( "#main-container" );
    if ( !scrollEl ) return;
    const locoScroll = new LocomotiveScroll( {
      el: scrollEl,
      smooth: true,
      multiplier: 1,
      class: "is-reveal"
    } );
    locoScroll.on( "scroll", ( scrollData ) =>
    {
      setScrollY( scrollData.scroll.y );
    } );
    return () =>
    {
      locoScroll.destroy();
    };
  }, [] );
  return { scrollY };
};

export default useLocoScroll;