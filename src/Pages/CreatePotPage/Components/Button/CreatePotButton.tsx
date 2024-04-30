import styled from 'styled-components';
import PotCreateStore from '../../../../state/store/PotCreateStore';
import DurationFareStore from '../../../../state/store/DurationFareStore';
import CurrentLocation from '../../../../state/store/CurrentLocation';
import { instance } from '../../../../axios';
import { useNavigate } from 'react-router-dom';
import { ref, push, update, child } from 'firebase/database';
import { db } from '../../../../firebase';

function CreatePotButton({ totalPeople }: { totalPeople: number }) {
    // console.log(totalPeople);
    const potCreateStore = PotCreateStore();
    const durationFareStore = DurationFareStore();
    const currentLocationStore = CurrentLocation();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');

    const chatRoomsRef = ref(db, 'chatRooms');
    const userData = JSON.parse(localStorage.getItem('myInfo') as string);
    const {
        title,
        description: content,
        distance,
        destination,
        VehicleType: vehicle,
        sameGenderRide: sameGenderStatus,
        selectedTime,
    } = potCreateStore;
    console.log(potCreateStore);
    const { estimatedDuration, estimatedFare } = durationFareStore;
    const createPost = async () => {
        const key = push(chatRoomsRef).key;
        const newChatRoom = {
            id: key,
            title: title,
            createdBy: {
                user: userData.id,
                name: userData.name,
                profileImage: userData.profileImage,
            },
        };
        try {
            await update(child(chatRoomsRef, key as string), newChatRoom);
            // console.log('res:', res);
            const formattedDate = new Date().toISOString;
            const numberOfRecruitment = totalPeople;
            const departure = currentLocationStore.currentLocation?.address_name;
            console.log('departure:', departure);
            const response = await instance.post(
                '/posts',
                // {
                //     category: 'LIFE',
                //     content: '경남쓰팟', //content,
                //     createdDate: new Date(), //formattedDate,
                //     departure: '공릉역 7호선', //departure,
                //     departureTime: new Date(), // selectedTime, //departureTime 으로 바꾸기
                //     destination: '건대입구역 7호선', //destination,
                //     distance: 100, // distance,
                //     duration: '25000', //estimatedDuration,
                //     fare: '3200', //estimatedFare,
                //     modifiedDate: new Date(), //formattedDate,
                //     numberOfRecruitment: 4, // numberOfRecruitment,
                //     sameGenderStatus: 'YES', //sameGenderStatus,
                //     title: '경남쓰팟테스트용', //title,
                //     vehicle: '일반', //vehicle,
                //     roomId: key,
                // },
                {
                    category: 'LIFE',
                    content: content,
                    createdDate: formattedDate,
                    departure: departure,
                    departureTime: selectedTime,
                    destination: destination,
                    distance: distance,
                    duration: estimatedDuration,
                    fare: estimatedFare,
                    modifiedDate: formattedDate,
                    numberOfRecruitment: numberOfRecruitment,
                    sameGenderStatus: sameGenderStatus,
                    title: title,
                    vehicle: vehicle,
                    roomId: key,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                },
            );
            console.log(response);
            if (response.status === 200) {
                navigate('/createComplete');
            } else {
                alert('API 요청 실패');
            }
        } catch (error) {
            console.log(error);
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
