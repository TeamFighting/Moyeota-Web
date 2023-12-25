import DetailHeader from '../DetailPage/DetailHeader'
import { ContentDetail, From, Icon, Route, StartPoint, StartPointLocation, Title, Text } from '../DetailPage/style'
import * as S from './style'
import { ChevronRight, DesPangyo, GreenOpacity, LocationFrom, LocationMarker, ToGanSvg } from '../../assets/svg'
import { useLocation, useNavigate } from 'react-router'
import CurrentLocationStore from '../../zustand/store/CurrentLocation'
import NaverMap from '../MainPage/NaverMap/NaverMap'
import styled from 'styled-components'

function QuickMatchFinding() {
    const location = useLocation()

    const { destination } = location.state

    const { currentLocation } = CurrentLocationStore()

    const currentBuildingName = currentLocation?.building_name
    console.log(currentBuildingName)
    const navigate = useNavigate()

    setTimeout(() => {
        navigate('/mainPage')
    }, 1000)

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
                <WhiteOpacity />
                <Icon
                    style={{
                        position: 'absolute',
                        zIndex: 3,
                        top: '35vh',
                        left: '43vw',
                        marginLeft: '-50px',
                    }}
                >
                    <ToGanSvg width="150" height="50" />
                </Icon>
                <div
                    style={{
                        position: 'absolute',
                        zIndex: 4,
                        top: '31vh',
                        left: '36vw',
                        width: '200px',
                        marginLeft: '-50px',
                    }}
                >
                    <GreenOpacity width="200" height="200" />
                </div>
                <MapWrapper>
                    <NaverMap />
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
                                <StartPointLocation>스테인드커피</StartPointLocation>
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
    )
}

const WhiteOpacity = styled.div`
    position: absolute;
    width: 100vw;
    height: 100%;
    background-color: white;
    z-index: 2;
    opacity: 0.5;
    margin-top: 10px;
`

const MapWrapper = styled.div`
    z-index: 1;
    width: 100vw;
    height: 44vh;
    background-color: aliceblue;
`
export default QuickMatchFinding
