import instance from '@apis';
import { ChevronRight, LocationFrom, LocationMarker } from '@assets/svg';
import CurrentLocationStore from '@stores/CurrentLocation';
import DestinationStore from '@stores/DestinationResult';
import DurationFareStore from '@stores/DurationFareStore';
import PotCreateStore from '@stores/PotCreateStore';
import type { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './style';
import DetailMap from '../DetailPage/views/DetailMap';


function CreateBody() {
    const navigate = useNavigate();
    const NavigateToDestination = () => {
        navigate(`/destinationPage/create`);
    };
    const { setEstimatedDuration, setEstimatedFare } = DurationFareStore();
    const { title, setTitle, setDistance, setDestination } = PotCreateStore();
    const { currentLocation } = CurrentLocationStore();

    const curLocation = sessionStorage.getItem('address');
    const curLat = sessionStorage.getItem('latitude');
    const curLng = sessionStorage.getItem('longitude');
    const { finalDestination: destination } = DestinationStore((state) => state);
    //destination값 키워드에서 도로명주소로 변경
    const convertDestinationToRoadAddress = (destination: string) => {
        return instance
            .get('distance/keyword', {
                params: {
                    query: destination,
                },
            })
            .then((response: any) => {
                const data = response.data;
                const roadAddress = data.data.road_address_name;
                return roadAddress;
            });
    };

    //예상금액 및 예상시간 계산
    const getEstimatedDurationAndFare = (origin: string, destination: string) => {
        convertDestinationToRoadAddress(destination).then((roadDestination: any) => {
            if (roadDestination) {
                instance
                    .get('/distance/duration/fare', {
                        params: {
                            origin: origin,
                            destination: roadDestination,
                        },
                    })
                    .then((response: any) => {
                        const data = response.data;
                        setEstimatedDuration(data.data.duration);
                        setEstimatedFare(data.data.fare);
                    })
                    .catch((error: any) => {
                        alert(error);
                    });
            }
        });
    };

    //거리 계산
    useEffect(() => {
        if (curLocation && destination) {
            convertDestinationToRoadAddress(destination).then((roadDestination: any) => {
                if (roadDestination) {
                    instance
                        .get('/distance/compare', {
                            params: {
                                address1: curLocation,
                                address2: roadDestination,
                            },
                        })
                        .then((response: any) => {
                            const data = response.data.data;
                            const distance = parseFloat(data);
                            setDistance(distance);
                        })
                        .catch((error: any) => {
                            console.error('API 호출 오류:', error);
                        });
                }
            });
            setDestination(destination);
        }
    }, [curLocation, destination]);

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setTitle(inputValue);
    };

    useEffect(() => {
        // getCurrentLocation();
        if (curLocation && destination) {
            getEstimatedDurationAndFare(curLocation, destination);
        }
    }, [currentLocation, destination]);

    if (curLat == null || curLng == null) return;

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
                    value={title}
                />
                <S.MapSample>
                    <DetailMap curLat={curLat} curLng={curLng} />
                </S.MapSample>
                <S.Route>
                    <S.From>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <LocationFrom width="24" height="64" />
                            <S.Text>
                                <S.StartPointLocation>
                                    {currentLocation?.address_name ? currentLocation.address_name : curLocation}
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
                                <S.StartPointLocation>{destination || '도착지를 입력해주세요'}</S.StartPointLocation>
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
