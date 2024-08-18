import styled from 'styled-components';
import { useEffect } from 'react';
import LocationHeader from './Components/LocationHeader';
import BottomSheet from './Components/BottomSheet';
import { useNavigate } from 'react-router-dom';
import NaverMap from './NaverMap';
import instance from '@apis';
import { HEADER_HEIGHT } from '@constants';
import watchPositionHook from '@hooks/useWatchPositionHook';
import { useMyInfoStore } from '@stores/MyInfo';
import { useMyPotIdStore } from '@stores/MyPotIdStore';
import { useClickedMarker } from '@stores/ClickedMarker';
import useStore from '@stores/ContentStore';
import BottomNav from '@components/BottomNav';
import { useMyPotContentStore } from '@stores/MyPotContentStore';
import MarkerClickContent from './MarkerClickContent';

function MainPage() {
    const { updateTotalData } = useStore((state) => state);
    const navigate = useNavigate();
    const { clickedMarkerId, isClicked } = useClickedMarker();
    const accessToken = localStorage.getItem('accessToken');
    const { setMyInfo, userId, accountDtoList } = useMyInfoStore();
    const { setMyPot } = useMyPotIdStore();
    const { setMyPotContent } = useMyPotContentStore();
    const getMyPost = async () => {
        try {
            const myPost = await instance.get(`/posts/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    page: 0,
                },
            });
            if (myPost.status === 200) {
                const newArr: number[] = [];
                setMyPotContent(myPost.data.data.content);
                myPost.data.data.content.forEach((post: any) => newArr.push(post.postId));
                setMyPot(newArr);
            }
        } catch (e: any) {
            console.log('getMyPost', e);
        }
    };
    useEffect(() => {
        watchPositionHook();
        fetchData();
        usersInfo();
        if (userId) {
            getMyPost();
        }
    }, []);

    async function usersInfo() {
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
            // alert(e + '에러');
        }
    }

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
                {isClicked && <MarkerClickContent postId={clickedMarkerId} />}
                <Bottom isClicked={isClicked}>
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

const Bottom = styled.div<{ isClicked: boolean }>`
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 258px;
    background-color: white;
    visibility: ${(props) => (props.isClicked ? 'hidden' : 'visible')};
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
