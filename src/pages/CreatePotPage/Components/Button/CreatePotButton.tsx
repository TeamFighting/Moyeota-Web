import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ref, push, update, child } from 'firebase/database';
import { db } from 'firebase';
import PotCreateStore from '@stores/PotCreateStore';
import DurationFareStore from '@stores/DurationFareStore';
import instance from '@apis';

function CreatePotButton() {
    const potCreateStore = PotCreateStore();
    const durationFareStore = DurationFareStore();
    const navigate = useNavigate();

    const chatRoomsRef = ref(db, 'chatRooms');
    const userData = JSON.parse(localStorage.getItem('myInfo') as string);
    const {
        title,
        content: content,
        distance,
        destination,
        VehicleType: vehicle,
        sameGenderStatus,
        selectedTime,
        totalPeople,
    } = potCreateStore;
    const { estimatedDuration, estimatedFare } = durationFareStore;
    const currentLat = sessionStorage.getItem('latitude');
    const currentLng = sessionStorage.getItem('longitude');
    const accessToken = localStorage.getItem('accessToken');

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
            const formattedDate = new Date();
            const numberOfRecruitment = totalPeople;
            const departure = sessionStorage.getItem('address');
            const response = await instance.post(
                '/posts',
                {
                    category: 'LIFE',
                    content: content,
                    createdDate: formattedDate,
                    departure: departure,
                    departureTime: new Date(selectedTime),
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
                    latitude: currentLat,
                    longitude: currentLng,
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                        'Content-Type': 'application/json',
                    },
                },
            );
            // console.log(response);
            if (response.status === 200) {
                navigate('/createComplete');
            } else {
                alert('API 요청 실패');
            }
        } catch (e: any) {
            console.log(e);
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
    z-index: 2;
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
    z-index: 2;
`;

export default CreatePotButton;
