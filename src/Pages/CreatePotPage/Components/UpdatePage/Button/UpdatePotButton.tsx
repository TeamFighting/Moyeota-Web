import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PotCreateStore from '../../../../../state/store/PotCreateStore';
import DurationFareStore from '../../../../../state/store/DurationFareStore';
import CurrentLocation from '../../../../../state/store/CurrentLocation';
import usePostDataStore from '../../../../../state/store/PostDataStore';
import { AuthStore } from '../../../../../state/store/AuthStore';
function CreatePotButton({ totalPeople }: { totalPeople: number }) {
    const navigate = useNavigate();
    const currentLocationStore = CurrentLocation();
    const { data } = usePostDataStore();

    const updatePost = async () => {
        try {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString();
            const { distance } = PotCreateStore();
            const { estimatedDuration, estimatedFare } = DurationFareStore();
            const { postId, content, destination, sameGenderStatus, vehicle, title } = data;
            const numberOfRecruitment = totalPeople;
            const departure = currentLocationStore.currentLocation?.building_name ?? '미입력';
            const { accessToken } = AuthStore();

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
                    departureTime: formattedDate, //departureTime으로 바꾸기
                    destination: destination,
                    distance: distance,
                    duration: estimatedDuration,
                    fare: estimatedFare,
                    numberOfRecruitment: numberOfRecruitment,
                    sameGenderStatus: sameGenderStatus,
                    title: title,
                    vehicle: vehicle,
                }),
            });

            if (response.status == 200) {
                alert('팟이 성공적으로 수정되었습니다.');
                navigate(`/CreateDetailPage`);
            } else {
                const errorData = await response.json();
                console.error('팟 수정에 실패했습니다.', response.status, errorData);
                alert(response);
            }
        } catch (error) {
            console.error('팟 수정 중 오류 발생', error);
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
