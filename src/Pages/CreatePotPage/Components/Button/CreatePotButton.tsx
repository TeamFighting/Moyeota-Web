import styled from 'styled-components';
import PotCreateStore from '../../../../state/store/PotCreateStore';
import DurationFareStore from '../../../../state/store/DurationFareStore';
import CurrentLocation from '../../../../state/store/CurrentLocation';
import { instance } from '../../../../axios';
import { AuthStore } from '../../../../state/store/AuthStore';
import { useNavigate } from 'react-router-dom';

function CreatePotButton({ totalPeople }: { totalPeople: number }) {
    const potCreateStore = PotCreateStore();
    const durationFareStore = DurationFareStore();
    const currentLocationStore = CurrentLocation();
    const navigate = useNavigate();
    const { accessToken } = AuthStore();

    const createPost = async () => {
        console.log('createPost');
        try {
            const formattedDate = new Date().toISOString;
            const numberOfRecruitment = totalPeople;
            // const departure = currentLocationStore.currentLocation?.building_name ?? '미입력';
            // const {
            //     title,
            //     description: content,
            //     distance,
            //     destination,
            //     VehicleType: vehicle,
            //     sameGenderRide: sameGenderStatus,
            //     selectedTime,
            // } = potCreateStore;
            // const { estimatedDuration, estimatedFare } = durationFareStore;
            const response = await instance.post('/posts', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // category: 'LIFE',
                    // content: content,
                    // createdDate: formattedDate,
                    // departure: departure,
                    // departureTime: selectedTime, //departureTime 으로 바꾸기
                    // destination: destination,
                    // distance: distance,
                    // duration: estimatedDuration,
                    // fare: estimatedFare,
                    // modifiedDate: formattedDate,
                    // numberOfRecruitment: numberOfRecruitment,
                    // sameGenderStatus: sameGenderStatus,
                    // title: title,
                    // vehicle: vehicle,
                    category: 'LIFE',
                    content: '같이 갈 사람 참가 신청 ㄱㄱ',
                    createdDate: '2024-01-17T08:35:42.541Z',
                    departure: '공릉역 7호선',
                    departureTime: '2024-01-17T08:35:42.541Z',
                    destination: '서울과학기술대학교 어의관',
                    distance: 0.5,
                    duration: 313,
                    fare: 5200,
                    modifiedDate: '2024-01-17T08:35:42.541Z',
                    numberOfRecruitment: 4,
                    sameGenderStatus: 'YES',
                    title: '갈사람?',
                    vehicle: '일반',
                }),
            });
            alert(response.status);
            if (response.status === 200) {
                navigate('/createComplete');
            } else {
                alert('API 요청 실패');
            }
        } catch (error) {
            alert(error);
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
