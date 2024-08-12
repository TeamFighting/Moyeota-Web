import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PotCreateStore from '../../../stores/PotCreateStore';
import DurationFareStore from '../../../stores/DurationFareStore';
import usePostDataStore from '../../../stores/PostDataStore';
import { UseGetNewAccessToken } from '../../../hooks/Auth/useGetNewAccessToken';
function CreatePotButton({ totalPeople, roomId, postId }: { totalPeople: number; roomId: string; postId: number }) {
    const navigate = useNavigate();
    const { data } = usePostDataStore();
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    const { distance, selectedTime } = PotCreateStore();
    const { estimatedDuration, estimatedFare } = DurationFareStore();
    const { content, destination, sameGenderStatus, vehicle, title } = data;
    const numberOfRecruitment = totalPeople;
    const departure = sessionStorage.getItem('address');
    const accessToken = sessionStorage.getItem('accessToken');
    const latitude = sessionStorage.getItem('latitude');
    const longitude = sessionStorage.getItem('longitude');
    // console.log('content', content);
    // console.log('departure', departure);
    // console.log('createdDate', formattedDate);
    // console.log(
    //     'departureTime',
    //     selectedTime, //departureTime으로 바꾸기
    // );
    // console.log('destination', destination);
    // console.log('distance', distance);
    // console.log('duration', estimatedDuration);
    // console.log('fare', estimatedFare);
    // console.log('numberOfRecruitment', numberOfRecruitment);
    // console.log('sameGenderStatus', sameGenderStatus);
    // console.log('title', title);
    // console.log('vehicle', vehicle);
    // console.log('latitude', latitude);
    // console.log('longitude', longitude);
    // console.log('modifiedDate', formattedDate);
    // console.log('roomId', roomId);
    const updatePost = async () => {
        try {
            const response = await fetch(`/posts/${postId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    category: 'LIFE',
                    content: content,
                    departure: departure,
                    createdDate: formattedDate,
                    departureTime: selectedTime, //departureTime으로 바꾸기
                    destination: destination,
                    distance: distance,
                    duration: estimatedDuration,
                    fare: estimatedFare,
                    numberOfRecruitment: numberOfRecruitment,
                    sameGenderStatus: sameGenderStatus,
                    title: title,
                    vehicle: vehicle,
                    latitude: latitude,
                    longitude: longitude,
                    modifiedDate: formattedDate,
                    roomId: roomId,
                }),
            });

            /**
             *{
  "category": "LIFE",
  "content": "같이 갈 사람 참가 신청 ㄱㄱ",
  "createdDate": "2024-05-16T12:02:27.071Z",
  "departure": "공릉역 7호선",
  "departureTime": "2024-05-16T12:02:27.071Z",
  "destination": "서울과학기술대학교 어의관",
  "distance": 0.5,
  "duration": 313,
  "fare": 5200,
  "latitude": "string",
  "longitude": "string",
  "modifiedDate": "2024-05-16T12:02:27.071Z",
  "numberOfRecruitment": 4,
  "roomId": "uuid",
  "sameGenderStatus": "YES",
  "title": "공릉역에서 어의관 갈사람?",
  "vehicle": "일반"
}
             */

            if (response.status == 200) {
                alert('팟이 성공적으로 수정되었습니다.');
                navigate(`/CreateDetailPage`);
            } else {
                const errorData = await response.json();
                console.error('팟 수정에 실패했습니다.', response.status, errorData);
                alert(response);
            }
        } catch (e: any) {
            if (e.response.status === 401) {
                if (await UseGetNewAccessToken(accessToken!)) {
                    updatePost();
                }
            }
            console.error('팟 수정 중 오류 발생', e);
        }
    };
    return (
        <Wrapper>
            <Button type="button" onClick={updatePost}>
                팟 수정 완료
            </Button>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: 64px;
    background-color: white;
    bottom: 0;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    z-index: 1;
`;

const Button = styled.button`
    width: 335px;
    height: 48px;
    flex-shrink: 0;
    border-radius: 12px;
    background: var(--Green-Button, #1edd81);
    border: none;
    font-size: 16px;
    color: white;
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.54px;
`;

export default CreatePotButton;
