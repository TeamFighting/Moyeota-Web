import { ChevronRight, LocationFrom, LocationMarker } from '../../assets/svg';
import * as S from '../CreatePotPage/style';
import { useNavigate } from 'react-router-dom';
import type { ChangeEvent } from 'react';
import { useEffect } from 'react';
import usePostDataStore from '../../stores/PostDataStore';
import DurationFareStore from '../../stores/DurationFareStore';
import PotCreateStore from '../../stores/PotCreateStore';
import instance from '@apis';
import CurrentLocationStore from '../../stores/CurrentLocation';
import DetailMap from '../DetailPage/views/DetailMap';
import DestinationStore from '@stores/DestinationResult';

interface PostProps {
    category: string;
    content: string;
    createAt: string;
    departure: string;
    departureTime: string;
    destination: string;
    distance: number;
    duration: number;
    fare: number;
    numberOfParticipants: number;
    numberOfRecruitment: number;
    postId: number;
    profileImage: string;
    sameGenderStatus: string;
    status: string;
    title: string;
    userGender: boolean;
    userName: string;
    vehicle: string;
    view: number;
    longitude: string;
    latitude: string;
}

function UpdateBody(data: PostProps) {
    const navigate = useNavigate();

    const { setDistance, destination: newDestination, setTitle, latitude, longitude } = PotCreateStore();
    const NavigateToDestination = () => {
        navigate(`/DestinationPage/Update?postId=${data.postId}&longitude=${longitude}&latitude=${latitude}`);
    };
    const { currentLocation } = CurrentLocationStore();
    const { finalDestination } = DestinationStore();
    const { setEstimatedDuration, setEstimatedFare } = DurationFareStore();
    const curLat = data.latitude;
    const curLng = data.longitude;
    console.log('nd', newDestination);
    console.log('finalDestination', finalDestination);
    //destination값 키워드에서 도로명주소로 변경
    const convertDestinationToRoadAddress = (destination: string) => {
        return instance
            .get('/distance/keyword', {
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
                        console.log(data);
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
        console.log('new', newDestination);
        // console.log('UPDATE BODY', data.departure, destination, newD);
        if (data.departure && newDestination) {
            convertDestinationToRoadAddress(newDestination).then((roadDestination) => {
                if (roadDestination) {
                    instance
                        .get('/distance/compare', {
                            params: {
                                address1: data.departure,
                                address2: roadDestination,
                            },
                        })
                        .then((response) => {
                            const data = response.data.data;
                            const distance = parseFloat(data);
                            setDistance(distance);
                        })
                        .catch((error) => {
                            alert('거리 계산 오류');
                        });
                }
            });
        }
    }, [currentLocation, newDestination]);

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setTitle(inputValue);
        usePostDataStore.getState().setPostData({
            title: inputValue,
            longitude: '',
            latitude: '',
        });
    };

    useEffect(() => {
        if (data.departure && newDestination) {
            getEstimatedDurationAndFare(data.departure, newDestination);
        }
    }, [currentLocation, newDestination]);

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
                    defaultValue={data.title}
                />
                <S.MapSample>
                    <DetailMap curLat={curLat} curLng={curLng} />
                </S.MapSample>
                <S.Route>
                    <S.From>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <LocationFrom width="24" height="64" />
                            <S.Text>
                                <S.StartPointLocation>{data.departure}</S.StartPointLocation>
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
                                    {finalDestination ? finalDestination : data.destination}
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

export default UpdateBody;
