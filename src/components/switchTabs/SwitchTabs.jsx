import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { allUsersDataAction } from '../../store/allUsersData';

const SwitchTabs = () =>
{
  const [ left, setLeft ] = useState( 0 );
  const dispatch = useDispatch();
  const activeTab = ( index ) =>
  {
    setLeft( index * 100 );
    if ( index === 1 )
    {
      dispatch( allUsersDataAction.showStatusPending() );
    } else
    {
      dispatch( allUsersDataAction.showStatusApproved() );
    }
  };

  const data = [ "Approved", "Pending" ];

  return (
    <div className='h-9 bg-black rounded p-[2px]'>
      <div className='flex items-center relative h-8'>
        {
          data.map( ( tab, index ) =>
          {
            return (
              <span key={ index } onClick={ () => activeTab( index ) } className='h-full flex items-center justify-center w-[100px]  font-myFont text-md relative text-white z-10 cursor-pointer transition-colors ease-linear duration-75'>{ tab }</span>
            );
          } )
        }
        <span className='movingBg' style={ { left } } />
      </div>
    </div>
  );
};

export default SwitchTabs;