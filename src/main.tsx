import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import MainPage from './Pages/MainPage/MainPage';
import DetailPage from './Pages/DetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/mainpage',
    element: <MainPage />,
  },
  {
    path: '/detailPage',
    element: <DetailPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
