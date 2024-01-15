import styled from 'styled-components';
import PotCreateStore from '../../../../state/store/PotCreateStore';
import DurationFareStore from '../../../../state/store/DurationFareStore';
import CurrentLocation from '../../../../state/store/CurrentLocation';
import { instance } from '../../../../axios';

function CreatePotButton({ totalPeople }: { totalPeople: number }) {
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
                selectedTime,
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
                    destination: '서울과학기술대학교',
                    distance: 20,
                    duration: 6800,
                    fare: estimatedFare,
                    modifiedDate: formattedDate,
                    numberOfRecruitment: numberOfRecruitment,
                    sameGenderStatus: sameGenderStatus,
                    title: title,
                    vehicle: vehicle,
                }),
            });
            console.log(response.status);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            alert(error.response.data.message);
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
