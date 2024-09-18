import instance from '@apis';
import BottomNav from '@components/BottomNav';
import { HEADER_HEIGHT } from '@constants';
import { ROUTE } from '@constants/route';
import watchPositionHook from '@hooks/useWatchPositionHook';
import { useClickedMarker } from '@stores/ClickedMarker';
import useStore from '@stores/ContentStore';
import { useMyInfoStore } from '@stores/MyInfo';
import { useMyPotContentStore } from '@stores/MyPotContentStore';
import { useMyPotIdStore } from '@stores/MyPotIdStore';
import { getAccessToken, getMyInfoFromLocalStorage } from '@utils/getInfoFromLocalStorage';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { fetchUserInfo, fetchMyPost, fetchAllPost } from './apis';
import BottomSheet from './Components/BottomSheet';
import LocationHeader from './Components/LocationHeader';
import MarkerClickContent from './MarkerClickContent';
import NaverMap from './NaverMap';

function MainPage() {
    const navigate = useNavigate();
    const { updateTotalData } = useStore((state) => state);
    const { clickedMarkerId, isMarkerClicked } = useClickedMarker();
    const { setMyInfo } = useMyInfoStore();
    const { setMyPot } = useMyPotIdStore();
    const { setMyPotContent } = useMyPotContentStore();
    const { id } = getMyInfoFromLocalStorage();

    useEffect(() => {
        watchPositionHook();
        fetchAllPost({ updateTotalData });
        fetchUserInfo({ setMyInfo });
        if (id) {
            fetchMyPost({ userId: id, setMyPot, setMyPotContent });
        }
    }, []);

    const navigateToCreatePot = () => {
        const accountDtoList = JSON.parse(localStorage.getItem('myInfo')!).accountDtoList;
        const userId = JSON.parse(localStorage.getItem('myInfo')!).id;
        if (accountDtoList.length === 0) {
            navigate(`/createPot/addAccount/${userId}`);
        } else {
            navigate(ROUTE.CREATE_POT_PAGE);
        }
    };

    return (
        <Container>
            <Header>
                <LocationHeader />
            </Header>
            <Body>
                <NaverMap from={'mainpage'} />
                {isMarkerClicked && <MarkerClickContent postId={clickedMarkerId} />}
                <Bottom isMarkerClicked={isMarkerClicked}>
                    <BottomSheet />
                    <Buttons>
                        <CreatePotButton onClick={() => navigate('/quickMatch')}>빠른매칭</CreatePotButton>
                        <CreatePotButton onClick={navigateToCreatePot}>팟 만들기</CreatePotButton>
                    </Buttons>
                </Bottom>
            </Body>
            <BottomNav />
        </Container>
    );
}

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100dvh - 64px);
    overflow: hidden;
`;

const Header = styled.div`
    height: ${HEADER_HEIGHT}px;
    position: sticky;
    background-color: #ffffff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 4%;
    z-index: 2;
`;

const Bottom = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isMarkerClicked',
})<{ isMarkerClicked: boolean }>`
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 258px;
    background-color: white;
    visibility: ${({ isMarkerClicked }) => (isMarkerClicked ? 'hidden' : 'visible')};
`;

const Body = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: white;
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: 15%;
    right: 7%;
    width: 114px;
    height: 100px;
    gap: 10px;
`;

const CreatePotButton = styled.button`
    background-color: #1edd81;
    color: #fff;
    font-size: 16px;
    padding: 12px;
    text-align: center;
    border: none;
    opacity: 0.8;
    cursor: pointer;
    z-index: 2;
    font-family: pretendard;
    font-style: normal;
    font-weight: 800;
    width: 114px;
    height: 48px;
    border-radius: 24px;
    right: 7%;
    box-shadow: 0px 4px 4px rgba(171, 171, 171, 0.25);
`;

export default MainPage;
