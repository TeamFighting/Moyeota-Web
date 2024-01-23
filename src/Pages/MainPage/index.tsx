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

function MainPage() {
    const { updateTotalData } = useStore((state) => state);
    const navigate = useNavigate();
    const { clickedMarkerId, isClicked } = useClickedMarker();
    const { accessToken, setAccessToken } = AuthStore();
    const [useToken, setUseToken] = useState<string | undefined>(undefined);
    watchPositionHook();

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleMessage = (event: any) => {
            try {
                if (typeof event.data === 'string') {
                    const data = JSON.parse(event.data);
                    if (data.token !== undefined) {
                        setAccessToken(data.token);
                        setUseToken(data.token);
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

    async function fetchData() {
        try {
            const res = await instance.get('posts');
            console.log(res.status === 200);
            if (res.status === 200) {
                updateTotalData(res.data.data);
                console.log(res.data.data);
            } else {
                alert(res.status + '에러');
            }
        } catch (e) {
            alert(e);
        }
    }

    const navigateToCreatePot = () => {
        navigate('/createPotPage');
    };

    const refresh = () => {
        console.log('refresh');
        window.location.reload();
    };

    const goCurrent = () => {
        submit();
        console.log('goCurrent');
    };

    const submit = async () => {
        try {
            const res = await instance.put(
                '/users/info',
                {
                    age: 8,
                    gender: '남자',
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            console.log('res', res);
        } catch (e) {
            console.log(e);
        }
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
    height: 100vh;
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
    background-color: aliceblue;
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
