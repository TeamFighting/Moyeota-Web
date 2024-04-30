import { ChevronRight, LocationFrom, LocationMarker } from '../../assets/svg';
import * as S from './style';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect } from 'react';
import DurationFareStore from '../../state/store/DurationFareStore';
import PotCreateStore from '../../state/store/PotCreateStore';
import { instance } from '../../axios';
import DetailMap from '../DetailPage/DetailMap';
import CurrentLocationStore from '../../state/store/CurrentLocation';
import { DestinationMarkerClickStore } from '../../state/store/DestinationMarkerClickStore';
interface CreateBodyProps {
    destination?: string;
}

function CreateBody({ destination }: CreateBodyProps) {
    const navigate = useNavigate();
    const NavigateToDestination = () => {
        navigate('/destinationPage');
    };
    const { clickedDestinationMarker } = DestinationMarkerClickStore((state) => state);

    const { setEstimatedDuration, setEstimatedFare } = DurationFareStore();
    const { setTitle, setDistance, setDestination } = PotCreateStore();
    const { currentLocation } = CurrentLocationStore();

    //destination값 키워드에서 도로명주소로 변경
    const convertDestinationToRoadAddress = (destination: string) => {
        return instance
            .get('distance/keyword', {
                params: {
                    query: destination,
                },
            })
            .then((response) => {
                const data = response.data;
                const roadAddress = data.data.road_address_name;
                return roadAddress;
            });
    };

    //예상금액 및 예상시간 계산
    const getEstimatedDurationAndFare = (origin: string, destination: string) => {
        convertDestinationToRoadAddress(destination).then((roadDestination) => {
            if (roadDestination) {
                instance
                    .get('/distance/duration/fare', {
                        params: {
                            origin: origin,
                            destination: roadDestination,
                        },
                    })
                    .then((response) => {
                        const data = response.data;
                        setEstimatedDuration(data.data.duration);
                        setEstimatedFare(data.data.fare);
                    })
                    .catch((error) => {
                        alert(error);
                    });
            }
        });
    };

    //거리 계산
    useEffect(() => {
        if (currentLocation && destination) {
            convertDestinationToRoadAddress(destination).then((roadDestination) => {
                if (roadDestination) {
                    instance
                        .get('/distance/compare', {
                            params: {
                                address1: currentLocation,
                                address2: roadDestination,
                            },
                        })
                        .then((response) => {
                            const data = response.data.data;
                            const distance = parseFloat(data);
                            setDistance(distance);
                        })
                        .catch((error) => {
                            console.error('API 호출 오류:', error);
                        });
                }
            });
            setDestination(destination);
        }
    }, [currentLocation, destination]);

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setTitle(inputValue);
    };

    useEffect(() => {
        // getCurrentLocation();
        if (currentLocation && destination) {
            getEstimatedDurationAndFare(currentLocation.address_name, destination);
        }
    }, [currentLocation, destination]);

    return (
        <S.Body>
            <S.Content>
                <S.Explanation>
                    <S.ContentTitle>
                        <S.Title>상세 항목을 알려주세요 </S.Title>
                    </S.ContentTitle>
                </S.Explanation>
                <S.InputStyle
                    type="text"
                    placeholder="지역, 목적지가 포함된 제목이면 더 좋아요"
                    onChange={handleTitleChange}
                />
                <S.MapSample>
                    <DetailMap infoDeparture={currentLocation?.address_name} />
                </S.MapSample>
                <S.Route>
                    <S.From>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <LocationFrom width="24" height="64" />
                            <S.Text>
                                <S.StartPointLocation>
                                    {currentLocation?.address_name
                                        ? currentLocation.address_name
                                        : '현재 위치를 가져오는 중...'}
                                </S.StartPointLocation>
                                <S.StartPoint>출발지</S.StartPoint>
                            </S.Text>
                        </div>
                        <S.Icon style={{ paddingTop: '3px' }}>
                            <ChevronRight width="24" height="24" />
                        </S.Icon>
                    </S.From>
                    <S.From onClick={NavigateToDestination}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <S.Icon
                                style={{
                                    height: '100%',
                                    alignItems: 'flex-start',
                                    display: 'flex',
                                }}
                            >
                                <LocationMarker width="24" height="24" />
                            </S.Icon>
                            <S.Text>
                                <S.StartPointLocation>
                                    {clickedDestinationMarker?.title || '도착지를 입력해주세요'}
                                </S.StartPointLocation>
                                <S.StartPoint>도착지</S.StartPoint>
                            </S.Text>
                        </div>
                        <S.Icon style={{ paddingTop: '3px' }}>
                            <ChevronRight width="24" height="24" />
                        </S.Icon>
                    </S.From>
                </S.Route>
            </S.Content>
        </S.Body>
    );
}

export default CreateBody;
