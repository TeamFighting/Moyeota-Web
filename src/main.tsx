import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import MainPage from './Pages/MainPage';
import DetailPage from './Pages/DetailPage';
import CreateDetailPage from './Pages/CreatePotPage/Components/DetailPage/index';
import CreatePotPage from './Pages/CreatePotPage';
import CreateComplete from './Pages/CreatePotPage/CreateComplete';
import DestinationPage from './Pages/CreatePotPage/Components/Map/DestinationPage';
import SearchResults from './Pages/CreatePotPage/Components/Map/SearchResults';
import QuickMatch from './Pages/QuickMatch/QuickMatch';
import QuickMatchFinding from './Pages/QuickMatch/QuickMatchFinding';
import UpdateDestinationPage from './Pages/UpdatePage/Map/DestinationPage';
import UpdateSearchResults from './Pages/UpdatePage/Map/SearchResults';
import FirebaseChat from './Pages/FirebaseChat';
import ChatLists from './Pages/FirebaseChat/ChatLists';
import UpdatePotPage from './Pages/UpdatePage';

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
        path: '/detailPage/:postId',
        element: <DetailPage />,
    },
    {
        path: '/createPotPage',
        element: <CreatePotPage />,
    },
    {
        path: '/createComplete',
        element: <CreateComplete />,
    },
    {
        path: '/destinationPage',
        element: <DestinationPage />,
    },
    {
        path: '/updateDestinationPage',
        element: <UpdateDestinationPage />,
    },
    {
        path: '/SearchResults',
        element: <SearchResults />,
    },
    {
        path: '/UpdateSearchResults',
        element: <UpdateSearchResults />,
    },
    {
        path: '/quickMatch',
        element: <QuickMatch />,
    },
    {
        path: '/quickMatchFinding',
        element: <QuickMatchFinding />,
    },
    {
        path: '/CreateDetailPage',
        element: <CreateDetailPage />,
    },
    {
        path: '/updatePotPage',
        element: <UpdatePotPage />,
    },
    {
        path: '/chat/:postId',
        element: <FirebaseChat />,
    },
    {
        path: '/chatLists',
        element: <ChatLists />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <RouterProvider router={router} />,
    // </React.StrictMode>
);
