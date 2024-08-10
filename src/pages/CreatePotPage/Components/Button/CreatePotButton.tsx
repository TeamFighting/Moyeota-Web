import styled from 'styled-components';
import PotCreateStore from '../../../../state/store/PotCreateStore';
import DurationFareStore from '../../../../state/store/DurationFareStore';
import { instance } from '../../../../axios';
import { useNavigate } from 'react-router-dom';
import { ref, push, update, child } from 'firebase/database';
import { db } from '../../../../firebase';
import { UseGetNewAccessToken } from '../../../../Hooks/useGetNewAccessToken';

function CreatePotButton({ totalPeople }: { totalPeople: number }) {
    const potCreateStore = PotCreateStore();
    const durationFareStore = DurationFareStore();
    const navigate = useNavigate();
    //   const accessToken = localStorage.getItem('accessToken');

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
            // console.log('res:', res);
            const formattedDate = new Date();
            const numberOfRecruitment = totalPeople;
            const departure = sessionStorage.getItem('address');
            const response = await instance.post(
                '/posts',
                // {
                //     category: 'LIFE',
                //     content: '메롱메롱 횰인쓰팟', //content,
                //     createdDate: new Date(), //formattedDate,
                //     departure: '공릉역 7호선', //departure,
                //     departureTime: new Date(), // selectedTime, //departureTime 으로 바꾸기
                //     destination: '건대입구역 7호선', //destination,
                //     distance: 15, // distance,
                //     duration: '25000', //estimatedDuration,
                //     fare: '3200', //estimatedFare,
                //     modifiedDate: new Date(), //formattedDate,
                //     numberOfRecruitment: 4, // numberOfRecruitment,
                //     sameGenderStatus: 'YES', //sameGenderStatus,
                //     title: '배고파용', //title,
                //     vehicle: '일반', //vehicle,
                //     roomId: key,
                // },
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
            if (e.response.status === 401) {
                if (await UseGetNewAccessToken(accessToken!)) {
                    createPost();
                }
            }
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
