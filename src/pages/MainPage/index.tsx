import styled from 'styled-components';
import { useEffect } from 'react';
import LocationHeader from './LocationHeader';
import BottomSheet from './Components/BottomSheet';
import { useNavigate } from 'react-router-dom';
import NaverMap from './NaverMap/NaverMap';
import MarkerClickContent from './Components/MarkerClickContent/MarkerClickContent';
import instance from '@apis';
import { HEADER_HEIGHT } from '@constants';
import watchPositionHook from '@hooks/useWatchPositionHook';
import { UseGetNewAccessToken } from '@hooks/useGetNewAccessToken';
import { useMyInfoStore } from '@stores/MyInfo';
import { useMyPotStore } from '@stores/MyPotStore';
import { useClickedMarker } from '@stores/ClickedMarker';
import useStore from '@stores/ContentStore';
import BottomNav from '@components/BottomNav';
import { Chevronleft } from '@assets/svg';

function MainPage() {
    const { updateTotalData } = useStore((state) => state);
    const navigate = useNavigate();
    const { clickedMarkerId, isClicked } = useClickedMarker();

    watchPositionHook();
    const accessToken = localStorage.getItem('accessToken');

    const { setMyInfo, userId, accountDtoList } = useMyInfoStore();
    const { setMyPot } = useMyPotStore();
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

                myPost.data.data.content.forEach((post: any) => newArr.push(post.postId));
                setMyPot(newArr);
            }
        } catch (e: any) {
            console.log('getMyPost', e);
            if (e.response.status === 401) {
                if (await UseGetNewAccessToken(accessToken!)) {
                    getMyPost();
                }
            }
        }
    };
    useEffect(() => {
        fetchData();
        usersInfo();
        if (userId !== undefined || userId !== null || userId !== 0) {
            getMyPost();
        }

        // // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // ReactNative 연동시 사용
        // const handleMessage = (event: any) => {
        //   try {
        //     if (typeof event.data === 'string') {
        //       const data = JSON.parse(event.data);
        //       if (data.token !== undefined) {
        //         setAccessToken(data.token);
        //         setUseToken(data.token);
        //         alert('로그인 되었습니다');
        //         localStorage.setItem('accessToken', data.token.toString());
        //       }
        //     }
        //   } catch (error) {
        //     console.error(error);
        //   }
        // };

        // window.addEventListener('message', handleMessage);

        // if (useToken !== undefined) {
        //   return () => {
        //     window.removeEventListener('message', handleMessage);
        //   };
        // }
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
            alert(e + '에러');
            if (e.response.status === 401) {
                const getNew = await UseGetNewAccessToken(accessToken!);
                console.log(getNew);
                // if (await UseGetNewAccessToken(accessToken!)) {
                //     usersInfo();
                // }
                // alert('로그인이 필요합니다.');
                // window.location.href = '/login';
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
            navigate(`/createPot/addAccount/${userId}`);
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
            <BottomNav />
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
