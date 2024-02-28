import { ChevronRight } from '../../../../assets/svg';
import * as S from '../../style';
import TimeModal from './Modal/TimeModal';
import { SetStateAction, useState, useEffect } from 'react';
import PotCreateStore from '../../../../state/store/PotCreateStore';
import usePostDataStore from '../../../../state/store/PostDataStore';

declare global {
    interface Window {
        ReactNativeWebView: {
            postMessage: (message: string) => void;
        };
    }
}

interface CreateBottomProps {
    totalPeople: number;
    onTotalPeopleChange: (count: SetStateAction<number>) => void;
}

function CreateBottom({ totalPeople, onTotalPeopleChange }: CreateBottomProps) {
    const [selectedVehicle, setSelectedVehicle] = useState('일반 승용 택시');
    const { data } = usePostDataStore();
    const [isSameGenderRide, setIsSameGenderRide] = useState(false);
    const postDataStore = usePostDataStore();
    const [selectedModal, setSelectedModal] = useState<string | null>(null);

    const { setSelectedTime } = PotCreateStore((state) => ({
        selectedTime: state.selectedTime,
        setSelectedTime: state.setSelectedTime,
    }));
    useEffect(() => {
        onTotalPeopleChange(postDataStore.data.numberOfRecruitment);
    }, []);
    const openTimeModal = () => {
        setSelectedModal('time');
    };

    const closeModal = () => {
        setSelectedModal(null);
    };

    // const setVehicleType = PotCreateStore((state) => state.setVehicleType);
    const handleVehicleSelection = (vehicle: SetStateAction<string>) => {
        setSelectedVehicle(vehicle);
        if (vehicle === '일반 승용 택시') {
            postDataStore.setPostData({ vehicle: '일반' });
        } else if (vehicle === '밴 택시') {
            postDataStore.setPostData({ vehicle: '밴' });
        }
    };

    const handleSameGenderRideToggle = () => {
        setIsSameGenderRide(!isSameGenderRide);
        postDataStore.setPostData({
            sameGenderStatus: isSameGenderRide ? 'NO' : 'YES',
        });
    };

    const isSelectionComplete = data.numberOfParticipants > 0;

    const connectToRN = () => {
        window.ReactNativeWebView.postMessage('h');
    };

    window.addEventListener('message', (event) => {
        try {
            if (typeof event.data === 'string') {
                const data = JSON.parse(event.data);
                setSelectedTime(data.selectedTime);
            }
        } catch (error) {
            console.log(error);
        }
    });

    return (
        <S.Bottom>
            <S.Wrapper
                onClick={connectToRN}
                style={{
                    paddingBottom: '40px',
                }}
            >
                <S.TextWrapper>
                    <S.BottomTitle>출발시간</S.BottomTitle>
                    <S.Description>
                        {postDataStore.data.departureTime ? (
                            <S.SelectedInfo>
                                {new Date(postDataStore.data.departureTime)
                                    .toLocaleString('ko-KR', {
                                        weekday: 'short',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                    })
                                    .replace('.', '')}
                            </S.SelectedInfo>
                        ) : (
                            '탑승일시를 선택해주세요'
                        )}
                    </S.Description>
                </S.TextWrapper>
                <ChevronRight width="24" height="24" />
            </S.Wrapper>
            <S.Wrapper style={{ paddingBottom: '10px' }} onClick={openTimeModal}>
                <S.TextWrapper>
                    <S.BottomTitle>이동수단 및 인원</S.BottomTitle>
                    <S.Description>
                        {isSelectionComplete ? (
                            <S.SelectedInfo>
                                {postDataStore.data.vehicle === '일반' ? '일반 승용 택시' : '밴 택시'} / 총{' '}
                                {totalPeople}명 /{' '}
                                {postDataStore.data.sameGenderStatus === 'YES' ? '동성끼리 탑승' : '혼성탑승'}
                            </S.SelectedInfo>
                        ) : (
                            '이동수단 및 인원을 선택해주세요'
                        )}
                    </S.Description>
                </S.TextWrapper>
                <ChevronRight width="24" height="24" style={{ marginTop: '13px' }} />
            </S.Wrapper>
            {selectedModal === 'time' && (
                <TimeModal
                    closeModal={closeModal}
                    selectedVehicle={selectedVehicle}
                    totalPeople={totalPeople}
                    isSameGenderRide={isSameGenderRide}
                    onVehicleSelection={handleVehicleSelection}
                    onTotalPeopleChange={onTotalPeopleChange}
                    onSameGenderRideToggle={handleSameGenderRideToggle}
                />
            )}
        </S.Bottom>
    );
}
export default CreateBottom;
