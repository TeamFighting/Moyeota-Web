import DetailHeader from '../DetailPage/DetailHeader';
import { ContentDetail, From, Icon, Route, StartPoint, StartPointLocation, Title, Text } from '../DetailPage/style';
import * as S from './style';
import { ChevronRight, CurrentLocationIcon, LocationFrom, LocationMarker, ToTriangle } from '../../assets/svg';
import { useLocation, useNavigate } from 'react-router';
import CurrentLocationStore from '../../state/store/CurrentLocation';
import NaverMap from '../MainPage/NaverMap/NaverMap';
import styled, { keyframes } from 'styled-components';
import { useQuickMathDestinationStore } from '../../state/store/QuickMathDestinationStore';

function QuickMatchFinding() {
    const location = useLocation();

    const { destination } = location.state;

    const { destination: quickDestination } = useQuickMathDestinationStore();
    const navigate = useNavigate();
    const cur = sessionStorage.getItem('address');

    setTimeout(() => {
        navigate('/mainPage');
    }, 2000);

    return (
        <div>
            <DetailHeader />
            <S.Container style={{ gap: '9px' }}>
                <S.Discription style={{ marginTop: '10px', zIndex: 3 }}>
                    <Title>
                        지금 가까운 팟을 <br />
                        찾고 있어요
                    </Title>
                    <ContentDetail>조금만 기다려주세요</ContentDetail>
                </S.Discription>
                <MapWrapper>
                    <WhiteOpacity />
                    <NaverMap from={'quickMatch'} />
                    <div
                        style={{
                            zIndex: 998,
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <div
                            style={{
                                zIndex: 999,
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-55%, -130%)',
                            }}
                        >
                            <DestinationBackground>
                                <DestinationTitle>{quickDestination}</DestinationTitle>
                            </DestinationBackground>
                            <ToTriangle width="50" height="20" />
                        </div>
                        <Box>
                            <CurrentMarker>
                                <CurrentLocationIcon />
                            </CurrentMarker>
                            <Wave className="wave -one"></Wave>
                            <Wave2 className="wave -two"></Wave2>
                            {/* <Wave3 className="wave -three"></Wave3> */}
                        </Box>
                    </div>
                </MapWrapper>
                <Route
                    style={{
                        display: 'flex',
                        height: '115px',
                        zIndex: '3',
                        backgroundColor: 'white',
                        paddingTop: '31px',
                        paddingLeft: '25px',
                        width: `${window.innerWidth - 25}px`,
                    }}
                >
                    <From
                        style={{
                            width: `${window.innerWidth - 50}px`,
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <LocationFrom width="24" height="64" />
                            <Text>
                                <StartPointLocation>{cur}</StartPointLocation>
                                <StartPoint>출발지</StartPoint>
                            </Text>
                        </div>
                        <Icon style={{ paddingTop: '3px', width: '24px' }}>
                            <ChevronRight />
                        </Icon>
                    </From>
                    <From
                        style={{
                            width: `${window.innerWidth - 50}px`,
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Icon
                                style={{
                                    height: '100%',
                                    alignItems: 'flex-start',
                                    display: 'flex',
                                }}
                            >
                                <LocationMarker width="24" height="24" />
                            </Icon>
                            <Text>
                                <StartPointLocation>{destination}</StartPointLocation>
                                <StartPoint>도착지</StartPoint>
                            </Text>
                        </div>
                        <Icon style={{ paddingTop: '3px', width: '24px' }}>
                            <ChevronRight />
                        </Icon>
                    </From>
                </Route>
            </S.Container>
        </div>
    );
}
const CurrentMarker = styled.div`
    position: absolute;
    width: 40px;
    height: 40px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const WhiteOpacity = styled.div`
    position: absolute;
    width: 100vw;
    height: 100%;
    background-color: white;
    z-index: 3;
    opacity: 0.4;
`;

const MapWrapper = styled.div`
    z-index: 50;
    width: 100vw;
    height: 44vh;
    background-color: black;
    position: relative;
`;

const DestinationBackground = styled.div`
    position: absolute;
    border-radius: 10px;
    height: 130%;
    top: 40%;
    left: 60%;
    min-width: 50px;
    transform: translate(-55%, -110%);
    display: flex;
    background-color: #1edd81;
    text-align: center;
    white-space: nowrap;
    z-index: 999;
`;
const DestinationTitle = styled.span`
    font-family: Pretendard;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    color: white;
    padding: 0 14px;
    padding-top: 5px;
`;

const drifts = keyframes`
  from {
    -webkit-transform: rotate(0deg) scale(0,0);
            transform: rotate(0deg) scale(0,0);
            opacity: 1;
  }
  to {
    -webkit-transform: rotate(360deg) scale(2,2);
            transform: rotate(360deg) scale(2,2);
            opacity: 0;
  }
`;

const Box = styled.div`
    height: 200px;
    width: 200px;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    z-index: 1000000001;
    position: absolute;
    overflow: hidden;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Wave = styled.div`
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: #1edd813c;
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    border-radius: 50%;
    position: absolute;
    left: 25%;
    top: 25%;
    transform: translate(-50%, -50%);
    -webkit-animation: ${drifts} 1500ms infinite linear;
    animation: ${drifts} 1500ms infinite linear;
`;

const Wave2 = styled(Wave)`
    width: 100px;
    height: 100px;
    -webkit-animation: ${drifts} 4000ms infinite linear;
    animation: ${drifts} 4000ms infinite linear;
`;

/* const Wave3 = styled(Wave)`
    -webkit-animation: ${drifts} 7000ms infinite linear;
    animation: ${drifts} 7000ms infinite linear;
`; */

export default QuickMatchFinding;
