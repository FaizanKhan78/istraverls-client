import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import HeroBanner from './components/heroBanner/HeroBanner';
import
{
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Admin from './pages/admin/Admin.jsx';
import Pay from './pages/pay/Pay.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import { store } from './store/index.js';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import PageNotFound from './pages/404/PageNotFound.jsx';
import Transaction from './pages/transactions/Transaction.jsx';

const router = createBrowserRouter( [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HeroBanner />,
      },
      {
        path: 'admin',
        element: <PrivateRoute><Admin /></PrivateRoute>,
      },
      {
        path: 'pay',
        element: <PrivateRoute><Pay /></PrivateRoute>,
      },
      {
        path: 'transactions',
        element: <PrivateRoute><Transaction /></PrivateRoute>,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
] );

ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
  <>
    <Provider store={ store }>
      <RouterProvider router={ router } />
      <ToastContainer />
    </Provider>
  </>
);
