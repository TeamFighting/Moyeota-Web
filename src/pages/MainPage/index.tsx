import styled from 'styled-components';
import { useEffect } from 'react';
import LocationHeader from './Components/LocationHeader';
import BottomSheet from './Components/BottomSheet';
import { useNavigate } from 'react-router-dom';
import NaverMap from './NaverMap';
import instance from '@apis';
import { HEADER_HEIGHT } from '@constants';
import { useMyPotIdStore } from '@stores/MyPotIdStore';
import { useClickedMarker } from '@stores/ClickedMarker';
import useStore from '@stores/ContentStore';
import BottomNav from '@components/BottomNav';
import { useMyPotContentStore } from '@stores/MyPotContentStore';
import MarkerClickContent from './MarkerClickContent';
import watchPositionHook from '@hooks/useWatchPositionHook';
import { useUserInfo } from '@pages/LoginPage/utils/userInfo';
import { getAccessToken } from '@utils/getAccessToken';
import { useMyInfoStore } from '@stores/MyInfo';

function MainPage() {
    const { updateTotalData } = useStore((state) => state);
    const navigate = useNavigate();
    const { clickedMarkerId, isMarkerClicked } = useClickedMarker();
    const accessToken = localStorage.getItem('accessToken');
    const { setMyInfo } = useMyInfoStore();
    const { setMyPot } = useMyPotIdStore();
    const { setMyPotContent } = useMyPotContentStore();
    const getMyPost = async (userId: string) => {
        try {
            const myPost = await instance.get(`/posts/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (myPost.status === 200) {
                const newArr: number[] = [];
                setMyPotContent(myPost.data.data);
                myPost.data.data.forEach((post: any) => newArr.push(post.postId));
                setMyPot(newArr);
            }
        } catch (e: any) {
            // console.log('getMyPost', e);
        }
    };
    async function fetchUserInfo() {
        const accessToken = getAccessToken();
        try {
            const res = await instance.get('/users', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (res.status === 200) {
                setMyInfo(res.data.data);
                localStorage.setItem('myInfo', JSON.stringify(res.data.data));
            }
        } catch (e: any) {
            alert('사용자 정보를 불러오는데 실패했습니다.');
        }
    }
    useEffect(() => {
        watchPositionHook();
        navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
            if (result.state === 'granted') {
                console.log('geolocation is granted');
            } else if (result.state === 'prompt') {
                console.log('geolocation is prompt');
            } else if (result.state === 'denied') {
                console.log('geolocation is denied');
            }
        });
        fetchData();
        fetchUserInfo();
        const userId = JSON.parse(localStorage.getItem('myInfo')!).id;
        if (userId) {
            getMyPost(userId.toString());
        }
    }, []);

    async function fetchData() {
        try {
            const res = await instance.get('/posts');
            if (res.status === 200) {
                updateTotalData(res.data.data);
            } else {
                alert(res.status + '에러');
            }
        } catch (e) {
            // alert(e);
        }
    }

    const navigateToCreatePot = () => {
        const accountDtoList = JSON.parse(localStorage.getItem('myInfo')!).accountDtoList;
        const userId = JSON.parse(localStorage.getItem('myInfo')!).id;
        if (accountDtoList.length === 0) {
            navigate(`/createPot/addAccount/${userId}`);
        } else {
            navigate('/createPotPage');
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
