import styled from 'styled-components';
import { useEffect } from 'react';
import { HEADERHEIGHT } from '../../Constants/constant';
import useStore from '../../state/store/ContentStore';
import LocationHeader from './LocationHeader';
import BottomSheet from './Components/BottomSheet';
import { Chevronleft } from '../../assets/svg';
import { useNavigate } from 'react-router-dom';
// import SvgRefreshButton from '../../assets/svg/RefreshButton';
// import SvgBacktoCurrentButton from '../../assets/svg/BacktoCurrentButton';
// import { Icon } from '../DetailPage/style';
import NaverMap from './NaverMap/NaverMap';
import MarkerClickContent from './Components/MarkerClickContent/MarkerClickContent';
import { useClickedMarker } from '../../state/store/ClickedMarker';
import { instance } from '../../axios';
import watchPositionHook from '../../Hooks/useWatchPositionHook';
// import { AuthStore } from '../../state/store/AuthStore';
import { useMyInfoStore } from '../../state/store/MyInfo';
import { useMyPotStore } from '../../state/store/MyPotStore';
import BottomBtn from '../../components/BottomBtn';
import { UseGetNewAccessToken } from '../../Hooks/Auth/useGetNewAccessToken';

function MainPage() {
    const { updateTotalData } = useStore((state) => state);
    const { getNewAccessToken } = UseGetNewAccessToken();
    const navigate = useNavigate();
    const { clickedMarkerId, isClicked } = useClickedMarker();
    const accessToken = localStorage.getItem('accessToken');
    const { setMyInfo, id, accountDtoList } = useMyInfoStore();
    const { setMyPot } = useMyPotStore();
    watchPositionHook();
    useEffect(() => {
        fetchData();
        usersInfo();
        if (id) {
            getMyPost();
        }
    }, []);

    const getMyPost = async () => {
        try {
            const myPost = await instance.get(`/posts/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    page: 0,
                },
            });
            if (myPost.status === 200) {
                const newArr: number[] = [];
                myPost.data.data.content.forEach((post: any) => newArr.push(post.postId));
                setMyPot(newArr);
            }
        } catch (e: any) {
            console.log('getMyPost', e);
            if (e.response.status === 401) {
                const newAccessToken = await getNewAccessToken(accessToken!);
                if (newAccessToken) {
                    getMyPost();
                }
            }
        }
    };

    async function usersInfo() {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            window.location.href = '/login';
            return;
        }

        try {
            const res = await instance.get('/users', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (res.status === 200) {
                setMyInfo(res.data.data);
                console.log(res);
                localStorage.setItem('myInfo', JSON.stringify(res.data.data));
            }
        } catch (e: any) {
            if (e.response && e.response.status === 401) {
                alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
                window.location.href = '/login';
            } else {
                console.error(e);
                alert('에러가 발생했습니다: ' + e.message + '관리자에게 문의해주세요');
            }
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
            alert(e);
        }
    }

    const navigateToCreatePot = () => {
        if (accountDtoList.length === 0) {
            navigate(`/createPot/addAccount/${id}`);
        } else {
            navigate('/createPotPage');
        }
    };

    return (
        <Container>
            <Header>
                <Chevronleft width={24} height={24} />
                <LocationHeader />
            </Header>
            <Body>
                {/* <Icons>
          <Icon onClick={refresh}>
            <SvgRefreshButton
              style={{
                width: '48px',
                height: '48px',
              }}
            />
          </Icon>
          <Icon onClick={goCurrent}>
            <SvgBacktoCurrentButton
              style={{
                width: '48px',
                height: '48px',
              }}
            />
          </Icon>
        </Icons> */}
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
            <BottomBtn />
        </Container>
    );
}

// const Icons = styled.div`
//   z-index: 10;
//   position: absolute;
//   top: 58%;
//   right: 1%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;
const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100dvh - 64px);
    overflow: hidden;
`;

const Header = styled.div`
    height: ${HEADERHEIGHT}px;
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
