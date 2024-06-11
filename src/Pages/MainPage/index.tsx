import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { HEADER_HEIGHT } from '../../Constants/constant';
import useStore from '../../state/store/ContentStore';
import LocationHeader from './LocationHeader';
import BottomSheet from './Components/BottomSheet';
import { Chevronleft } from '../../assets/svg';
import { useNavigate } from 'react-router-dom';
import SvgRefreshButton from '../../assets/svg/RefreshButton';
import SvgBacktoCurrentButton from '../../assets/svg/BacktoCurrentButton';
import { Icon } from '../DetailPage/style';
import NaverMap from './NaverMap/NaverMap';
import MarkerClickContent from './Components/MarkerClickContent/MarkerClickContent';
import { useClickedMarker } from '../../state/store/ClickedMarker';
import { instance } from '../../axios';
import watchPositionHook from '../../Hooks/watchPositionHook';
import { AuthStore } from '../../state/store/AuthStore';
import { useMyInfoStore } from '../../state/store/MyInfo';
import { useMyPotStore } from '../../state/store/MyPotStore';
import BottomBtn from '../../components/BottomBtn';

function MainPage() {
    const { updateTotalData } = useStore((state) => state);
    const navigate = useNavigate();
    const { clickedMarkerId, isClicked } = useClickedMarker();
    // const { accessToken, setAccessToken } = AuthStore();

    watchPositionHook();
    const accessToken = localStorage.getItem('accessToken');
    const setAccessToken = AuthStore((state) => state.setAccessToken);
    const { setMyInfo, id, accountDtoList } = useMyInfoStore();
    console.log(id);
    const { setMyPot } = useMyPotStore();
    const [useToken, setUseToken] = useState<string | undefined>(undefined);
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

            const newArr: number[] = [];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            myPost.data.data.content.forEach((post: any) => newArr.push(post.postId));
            setMyPot(newArr);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        fetchData();
        usersInfo();
        if (id !== undefined || id !== null) {
            getMyPost();
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleMessage = (event: any) => {
            try {
                if (typeof event.data === 'string') {
                    const data = JSON.parse(event.data);
                    if (data.token !== undefined) {
                        setAccessToken(data.token);
                        setUseToken(data.token);
                        alert('로그인 되었습니다');
                        localStorage.setItem('accessToken', data.token.toString());
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        window.addEventListener('message', handleMessage);

        if (useToken !== undefined) {
            return () => {
                window.removeEventListener('message', handleMessage);
            };
        }
    }, []);

    async function usersInfo() {
        try {
            const res = await instance.get('/users', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setMyInfo(res.data.data);
            localStorage.setItem('myInfo', JSON.stringify(res.data.data));
        } catch (e) {
            //console.log(e);
        }
    }

    async function fetchData() {
        try {
            console.log('fetchData');
            const res = await instance.get('/posts');
            console.log('res', res.data.data);
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

    const refresh = () => {
        console.log('refresh');
        console.log('accessToken', accessToken);
        // submit();
    };

    const goCurrent = () => {
        console.log('goCurrent');
    };

    return (
        <Container>
            <Header>
                <Chevronleft width={24} height={24} />
                <LocationHeader />
            </Header>
            <Body>
                <Icons>
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
                </Icons>
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

const Icons = styled.div`
    z-index: 10;
    position: absolute;
    top: 58%;
    right: 1%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 64px);
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
    z-index: 1000000;
`;

const Bottom = styled.div<{ isClicked: boolean }>`
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 258px;
    visibility: ${(props) => (props.isClicked ? 'hidden' : 'visible')};
`;

const Body = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
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
    background-color: black;
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
    z-index: 1000001;
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
