import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PotCreateStore from '../../../../zustand/store/PotCreateStore';
import DurationFareStore from '../../../../zustand/store/DurationFareStore';
import CurrentLocation from '../../../../zustand/store/CurrentLocation';
import { instance } from '../../../../axios';

function CreatePotButton({ totalPeople }: { totalPeople: number }) {
    const navigate = useNavigate();
    const potCreateStore = PotCreateStore();
    const durationFareStore = DurationFareStore();
    const currentLocationStore = CurrentLocation();

    const createPost = async () => {
        try {
            const formattedDate = new Date().toISOString;
            const token = import.meta.env.VITE_AUTH_BEARER_TEST;
            const numberOfRecruitment = totalPeople;
            const departure = currentLocationStore.currentLocation?.building_name ?? '미입력';
            const {
                title,
                description: content,
                distance,
                destination,
                VehicleType: vehicle,
                sameGenderRide: sameGenderStatus,
            } = potCreateStore;
            const { estimatedDuration, estimatedFare } = durationFareStore;

            const response = await instance.post('/posts', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category: 'LIFE',
                    content: content,
                    createdDate: formattedDate,
                    departure: departure,
                    departureTime: formattedDate, //departureTime 으로 바꾸기
                    destination: destination,
                    distance: distance,
                    duration: estimatedDuration,
                    fare: estimatedFare,
                    modifiedDate: formattedDate,
                    numberOfRecruitment: numberOfRecruitment,
                    sameGenderStatus: sameGenderStatus,
                    title: title,
                    vehicle: vehicle,
                }),
            });

            if (response.status === 200) {
                navigate('/createComplete');
                console.log('res', response);
            } else {
                alert('실패');
                console.error('API 요청 실패');
            }
        } catch (error) {
            console.error('error:', error);
        }
    };

    return (
        <Wrapper>
            <Button type="button" onClick={createPost}>
                팟 생성 완료
            </Button>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: 128px;
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
