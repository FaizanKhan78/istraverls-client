import { useSelector } from "react-redux";
import PageNotFound from './../../pages/404/PageNotFound';


const PrivateRoute = ( { children } ) =>
{
  const users = useSelector( state => state.users );
  if ( users[ 0 ]?.isAdmin || users[ 0 ]?.isStatus )
  {
    return children;

  } else
  {
    return (
      <PageNotFound />
    );
  }
};

export default PrivateRoute;
