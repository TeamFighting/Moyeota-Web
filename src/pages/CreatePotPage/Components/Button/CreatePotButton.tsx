import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ref, push, update, child } from 'firebase/database';
import { db } from 'firebase';
import PotCreateStore from '@stores/PotCreateStore';
import instance from '@apis';
import DurationFareStore from '@stores/DurationFareStore';
import DestinationResult from '@stores/DestinationResult';
import { useEffect, useState } from 'react';

function CreatePotButton() {
    const potCreateStore = PotCreateStore();
    const navigate = useNavigate();
    const { clearDestinationStore } = DestinationResult();
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
        clearPotCreateStore,
    } = potCreateStore;
    const { estimatedDuration, estimatedFare, clearDurationFareStore } = DurationFareStore();
    const currentLat = sessionStorage.getItem('latitude');
    const currentLng = sessionStorage.getItem('longitude');
    const accessToken = localStorage.getItem('accessToken');
    const [isFull, setIsFull] = useState(false);

    const isInputFull = () => {
        if (
            title &&
            content.length > 10 &&
            distance &&
            destination &&
            vehicle &&
            sameGenderStatus &&
            selectedTime &&
            totalPeople &&
            estimatedDuration &&
            estimatedFare
        ) {
            return true;
        }
        return false;
    };

    useEffect(() => {
        if (isInputFull()) {
            setIsFull(true);
        } else {
            setIsFull(false);
        }
    }, [
        title,
        content,
        distance,
        destination,
        vehicle,
        sameGenderStatus,
        selectedTime,
        totalPeople,
        estimatedDuration,
        estimatedFare,
    ]);

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
            if (response.status === 200) {
                clearPotCreateStore();
                clearDestinationStore();
                clearDurationFareStore();
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
            <Button
                disabled={!isFull}
                onClick={() => {
                    createPost();
                }}
            >
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

const Button = styled.button<{ disabled: boolean }>`
    width: 335px;
    height: 48px;
    flex-shrink: 0;
    border-radius: 12px;
    background: ${(props) => (props.disabled ? '#DCE0EB' : ' #1edd81')};
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
