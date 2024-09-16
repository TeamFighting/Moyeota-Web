import { ChevronRight, LocationFrom, LocationMarker } from '@assets/svg';
import createAgo from '@utils/createAgo';

import * as S from '../style';
import DetailMap from './DetailMap';

interface DetailPageProps {
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
    userGender: string;
    userName: string;
    vehicle: string;
    view: number;
    roomId: string;
    latitude: string;
    longitude: string;
}
function DetailBody(data: DetailPageProps) {
    const ago = createAgo(data.createAt);
    let gender;
    if (data.userGender == '여') {
        gender = '여';
    } else {
        gender = '남';
    }
    let latitude = data.latitude;
    let longitude = data.longitude;
    if (latitude == null || longitude == null) {
        longitude = '127.0276';
        latitude = '37.4979';
    }
    return (
        <S.Body>
            <S.Profile>
                <img src={data.profileImage} style={{ borderRadius: '100%' }} width="86px" height="86px" />
            </S.Profile>
            <S.Content>
                <S.Explanation>
                    <S.ContentTitle>
                        <S.Title>{data.userName} 님의 </S.Title>
                        <S.Title>'{data.title}'은 어때요?</S.Title>
                    </S.ContentTitle>
                    <S.ContentDetail>
                        {gender}/{ago}/{data.view}명 조회
                    </S.ContentDetail>
                </S.Explanation>
                <S.MapSample>
                    <DetailMap curLat={latitude} curLng={longitude} />
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
                            <ChevronRight />
                        </S.Icon>
                    </S.From>
                    <S.From>
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
                                <S.StartPointLocation>{data.destination}</S.StartPointLocation>
                                <S.StartPoint>도착지</S.StartPoint>
                            </S.Text>
                        </div>
                        <S.Icon style={{ paddingTop: '3px' }}>
                            <ChevronRight />
                        </S.Icon>
                    </S.From>
                </S.Route>
            </S.Content>
        </S.Body>
    );
}

export default DetailBody;
