import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PotCreateStore from '../../../stores/PotCreateStore';
import DurationFareStore from '../../../stores/DurationFareStore';
import instance from '@apis/index';
import DestinationStore from '@stores/DestinationResult';

function CreatePotButton({ roomId, postId }: { roomId: string; postId: number }) {
    const navigate = useNavigate();
    const { title, sameGenderStatus, destination, VehicleType } = PotCreateStore();
    const { finalDestination, clearDestinationStore } = DestinationStore();
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    const { departure, distance, selectedTime, content, totalPeople, longitude, latitude, clearPotCreateStore } =
        PotCreateStore();
    const { estimatedDuration, estimatedFare, clearDurationFareStore } = DurationFareStore();
    const numberOfRecruitment = totalPeople;
    const accessToken = localStorage.getItem('accessToken');

    const updatePost = async () => {
        try {
            const response = await instance.put(
                `/posts/${postId}`,
                {
                    category: 'LIFE',
                    content: content || '',
                    departure: departure,
                    createdDate: formattedDate,
                    departureTime: selectedTime, //departureTime으로 바꾸기
                    destination: finalDestination || destination,
                    distance: distance,
                    duration: estimatedDuration,
                    fare: estimatedFare,
                    numberOfRecruitment: numberOfRecruitment,
                    sameGenderStatus: sameGenderStatus,
                    title: title,
                    vehicle: VehicleType,
                    latitude: latitude,
                    longitude: longitude,
                    modifiedDate: formattedDate,
                    roomId: roomId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            console.log('response:', response);
            if (response.status == 200) {
                clearPotCreateStore();
                clearDestinationStore();
                clearDurationFareStore();
                alert('팟이 성공적으로 수정되었습니다.');
                navigate(`/detailPage/${postId}`);
            } else {
                console.error('팟 수정에 실패했습니다.', response.status);
                alert(response);
            }
        } catch (e: any) {
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
