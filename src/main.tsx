import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import CreateDetailPage from './pages/CreatePotPage/Components/DetailPage/index';
import CreatePotPage from './pages/CreatePotPage';
import CreateComplete from './pages/CreatePotPage/CreateComplete';
import DestinationPage from './pages/CreatePotPage/Components/Map/DestinationPage';
import SearchResults from './pages/CreatePotPage/Components/Map/SearchResults';
import QuickMatch from './pages/QuickMatch/QuickMatch';
import QuickMatchFinding from './pages/QuickMatch/QuickMatchFinding';
import UpdateDestinationPage from './pages/UpdatePage/Map/DestinationPage';
import UpdateSearchResults from './pages/UpdatePage/Map/SearchResults';
import FirebaseChat from './pages/FirebaseChat/views';
import ChatLists from './pages/FirebaseChat/views/ChatLists';
import UpdatePotPage from './pages/UpdatePage';
import PotPage from './pages/PotPage';
import OwnerReimbursement from './pages/ReimbursementPage/OwnerReimbursement';
import ApplierReimbusement from './pages/ReimbursementPage/ApplierReimbursement';
import AddAccount from './pages/AddAccount';
import OwnerCalc from './pages/ReimbursementPage/Calculation/OwnerCalc';
import ApplierCalc from './pages/ReimbursementPage/Calculation/ApplierCalc';
import BankRecommend from './pages/AddAccount/BankListSheet/BankRecommend';
import WaitPlease from './pages/ReimbursementPage/Calculation/WaitPlease';
import CurrentReimbursement from './pages/ReimbursementPage/CurrentReimbursement';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import EditAccount from './pages/MyPage/MyPageLists/EditBankAccount';
import ModifyProfile from './pages/MyPage/MyPageLists/ModifyNickName';
import ManageProfile from './pages/MyPage/MyPageLists/ManageAccount';
import { ROUTE } from '@constants/route';
import { worker } from '../mocks/browser';
const routes = [
    {
        path: ROUTE.ROOT,
        element: <App />,
    },

    {
        path: ROUTE.MAIN_PAGE,
        element: <MainPage />,
    },
    {
        path: ROUTE.DETAIL_PAGE,
        element: <DetailPage />,
    },
    {
        path: ROUTE.CREATE_POT_PAGE,
        element: <CreatePotPage />,
    },
    {
        path: ROUTE.CREATE_COMPLETE,
        element: <CreateComplete />,
    },
    {
        path: ROUTE.DESTINATION_PAGE,
        element: <DestinationPage />,
    },
    {
        path: ROUTE.UPDATE_DESTINATION_PAGE,
        element: <UpdateDestinationPage />,
    },
    {
        path: ROUTE.SEARCH_RESULTS,
        element: <SearchResults />,
    },
    {
        path: ROUTE.UPDATE_SEARCH_RESULTS,
        element: <UpdateSearchResults />,
    },
    {
        path: ROUTE.QUICK_MATCH,
        element: <QuickMatch />,
    },
    {
        path: ROUTE.QUICK_MATC_HFINDING,
        element: <QuickMatchFinding />,
    },
    {
        path: ROUTE.CREATEDETAIL,
        element: <CreateDetailPage />,
    },
    {
        path: ROUTE.UPDATEPOT,
        element: <UpdatePotPage />,
    },
    {
        path: ROUTE.CHAT,
        element: <FirebaseChat />,
    },
    {
        path: ROUTE.CHATLISTS,
        element: <ChatLists />,
    },
    {
        path: ROUTE.POTPAGE,
        element: <PotPage />,
    },
    {
        path: ROUTE.REIMBURSEMENT_POTOWNER,
        element: <OwnerReimbursement />,
    },
    {
        path: ROUTE.REIMBURSEMENT,
        element: <ApplierReimbusement />,
    },
    {
        path: ROUTE.REIMBURSEMENT_CURRENT,
        element: <CurrentReimbursement />,
    },
    {
        path: ROUTE.ADD_ACCOUNT,
        element: <AddAccount />,
    },
    {
        path: ROUTE.OWNERCALC,
        element: <OwnerCalc />,
    },
    {
        path: ROUTE.APPLIERCALC,
        element: <ApplierCalc />,
    },
    {
        path: ROUTE.BANK_RECOMMEND,
        element: <BankRecommend />,
    },
    {
        path: ROUTE.WAIT_PLEASE,
        element: <WaitPlease />,
    },
    {
        path: ROUTE.LOGIN,
        element: <LoginPage />,
    },
    {
        path: ROUTE.MYPAGE,
        element: <MyPage />,
    },
    {
        path: ROUTE.MYPAGE_MODIFY,
        element: <ModifyProfile />,
    },
    {
        path: ROUTE.MYPAGE_EDIT_ACCOUNT,
        element: <EditAccount />,
    },
    {
        path: ROUTE.MYPAGE_MANAGE_PROFILE,
        element: <ManageProfile />,
    },
];
await worker.start().then(() => {
    const router = createBrowserRouter(routes);
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RouterProvider router={router} />
        </LocalizationProvider>,
    );
});
