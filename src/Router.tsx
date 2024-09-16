import ProtectedRoute from '@components/ProtectRoute/ProtectRoute';
import { ROUTE } from '@constants/route';
import LoginPage from '@pages/LoginPage';
import LoginLoading from '@pages/LoginPage/LoadingLogin';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

const MainPage = lazy(() => import('./pages/MainPage'));
const DetailPage = lazy(() => import('./pages/DetailPage'));
const CreatePotPage = lazy(() => import('./pages/CreatePotPage'));
const CreateComplete = lazy(() => import('./pages/CreatePotPage/CreateComplete'));
const DestinationPage = lazy(() => import('./pages/CreatePotPage/Components/Map/DestinationMapPage'));
const QuickMatch = lazy(() => import('./pages/QuickMatch/QuickMatch'));
const QuickMatchFinding = lazy(() => import('./pages/QuickMatch/QuickMatchFinding'));
const FirebaseChat = lazy(() => import('./pages/FirebaseChat/views'));
const ChatLists = lazy(() => import('./pages/FirebaseChat/views/ChatLists'));
const UpdatePotPage = lazy(() => import('./pages/UpdatePage'));
const PotPage = lazy(() => import('./pages/MyPage/MyPot'));
const OwnerReimbursement = lazy(() => import('./pages/ReimbursementPage/OwnerReimbursement'));
const ApplierReimbusement = lazy(() => import('./pages/ReimbursementPage/ApplierReimbursement'));
const AddAccount = lazy(() => import('./pages/AddBankAccount'));
const OwnerCalc = lazy(() => import('./pages/ReimbursementPage/Calculation/OwnerCalc'));
const ApplierCalc = lazy(() => import('./pages/ReimbursementPage/Calculation/ApplierCalc'));
const BankRecommend = lazy(() => import('./pages/AddBankAccount/BankListSheet/BankRecommend'));
const WaitPlease = lazy(() => import('./pages/ReimbursementPage/Calculation/WaitPlease'));
const CurrentReimbursement = lazy(() => import('./pages/ReimbursementPage/CurrentReimbursement'));
const MyPage = lazy(() => import('./pages/MyPage'));
const EditAccount = lazy(() => import('./pages/MyPage/MyPageLists/EditBankAccount'));
const ModifyProfile = lazy(() => import('./pages/MyPage/MyPageLists/ModifyNickName'));
const ManageProfile = lazy(() => import('./pages/MyPage/MyPageLists/ManageAccount'));
const SelectGenderAge = lazy(() => import('@pages/SelectGenderAge'));
const MyPot = lazy(() => import('./pages/MyPage/MyPot'));

export const Router = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path={ROUTE.ROOT} element={<LoginLoading />} />
                <Route path={ROUTE.MAIN_PAGE} element={<MainPage />} />
                <Route path={ROUTE.DETAIL_PAGE} element={<ProtectedRoute element={<DetailPage />} />} />
                <Route path={ROUTE.CREATE_POT_PAGE} element={<ProtectedRoute element={<CreatePotPage />} />} />
                <Route path={ROUTE.CREATE_COMPLETE} element={<ProtectedRoute element={<CreateComplete />} />} />
                <Route path={ROUTE.DESTINATION_PAGE} element={<ProtectedRoute element={<DestinationPage />} />} />
                <Route path={ROUTE.QUICK_MATCH} element={<ProtectedRoute element={<QuickMatch />} />} />
                <Route path={ROUTE.QUICK_MATC_HFINDING} element={<ProtectedRoute element={<QuickMatchFinding />} />} />
                <Route path={ROUTE.UPDATEPOT} element={<ProtectedRoute element={<UpdatePotPage />} />} />
                <Route path={ROUTE.CHAT} element={<ProtectedRoute element={<FirebaseChat />} />} />
                <Route path={ROUTE.CHATLISTS} element={<ProtectedRoute element={<ChatLists />} />} />
                <Route path={ROUTE.POTPAGE} element={<ProtectedRoute element={<PotPage />} />} />
                <Route
                    path={ROUTE.REIMBURSEMENT_POTOWNER}
                    element={<ProtectedRoute element={<OwnerReimbursement />} />}
                />
                <Route path={ROUTE.REIMBURSEMENT} element={<ProtectedRoute element={<ApplierReimbusement />} />} />
                <Route
                    path={ROUTE.REIMBURSEMENT_CURRENT}
                    element={<ProtectedRoute element={<CurrentReimbursement />} />}
                />
                <Route path={ROUTE.ADD_ACCOUNT} element={<ProtectedRoute element={<AddAccount />} />} />
                <Route path={ROUTE.OWNERCALC} element={<ProtectedRoute element={<OwnerCalc />} />} />
                <Route path={ROUTE.APPLIERCALC} element={<ProtectedRoute element={<ApplierCalc />} />} />
                <Route path={ROUTE.BANK_RECOMMEND} element={<ProtectedRoute element={<BankRecommend />} />} />
                <Route path={ROUTE.WAIT_PLEASE} element={<ProtectedRoute element={<WaitPlease />} />} />
                <Route path={ROUTE.LOGIN} element={<LoginPage />} />
                <Route path={ROUTE.MYPAGE} element={<ProtectedRoute element={<MyPage />} />} />
                <Route path={ROUTE.MYPAGE_MODIFY} element={<ProtectedRoute element={<ModifyProfile />} />} />
                <Route path={ROUTE.MYPAGE_EDIT_ACCOUNT} element={<ProtectedRoute element={<EditAccount />} />} />
                <Route path={ROUTE.MYPAGE_MANAGE_PROFILE} element={<ProtectedRoute element={<ManageProfile />} />} />
                <Route path={ROUTE.SELECT_GENDER_AGE} element={<ProtectedRoute element={<SelectGenderAge />} />} />
                <Route path={ROUTE.MY_POT} element={<ProtectedRoute element={<MyPot />} />} />
                <Route path="*" element={<div>404</div>} />
            </Routes>
        </Suspense>
    );
};
