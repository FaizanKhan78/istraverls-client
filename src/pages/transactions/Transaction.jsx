import { useSelector } from "react-redux";
import { motion } from 'framer-motion';
import dayjs from "dayjs";

const Transaction = () =>
{
  const users = useSelector( state => state.usersDetails );

  return (
    <>
      {
        users.map( ( user, i ) =>
        {
          return (
            <div className="overflow-x-auto" key={ i }>
              <motion.table
                className="min-w-full border-collapse"
                initial={ { opacity: 0 } }
                animate={ { opacity: 1 } }
                transition={ { duration: 0.5 } }
              >
                <thead>
                  <tr>
                    { [ 'Transaction ID', 'Date', 'Status' ].map( header => (
                      <th key={ header } className="text-center py-2 text-md font-myFont text-gray-700">
                        { header }
                      </th>
                    ) ) }
                  </tr>
                </thead>
                <tbody className="text-center">
                  <>
                    {
                      user.transaction.map( ( t, i ) =>
                      {
                        return (
                          <tr className="font-custom text-white" key={ i }>
                            <td className="py-5">
                              { t.paymentId }
                            </td>
                            <td>
                              { dayjs( t.date ).format( 'D MMMM YYYY' ) }
                            </td>
                            <td className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500">
                              success
                            </td>
                          </tr>
                        );
                      } )
                    }
                  </>
                </tbody>
              </motion.table>
            </div >
          );
        } )
      }
    </>
  );
};


export default Transaction;