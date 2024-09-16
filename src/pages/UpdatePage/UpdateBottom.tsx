import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useState } from 'react';

import { ChevronRight } from '@assets/svg';
import PotCreateStore from '@stores/PotCreateStore';
import TaxiTypePersonnelModal from '../CreatePotPage/Components/Modal/TaxiTypePersonnelModal';
import * as S from '../CreatePotPage/style';

declare global {
    interface Window {
        ReactNativeWebView: {
            postMessage: (message: string) => void;
        };
    }
}

interface CreateBottomProps {
    data: {
        category: string;
        content: string;
        createAt: string;
        departure: string;
        departureTime: string;
        destination: string;
        distance: number;
        duration: number;
        fare: number;
        numberOfParticipants: number;
        numberOfRecruitment: number;
        postId: number;
        profileImage: string;
        sameGenderStatus: string;
        status: string;
        title: string;
        userGender: boolean;
        vehicle: string;
    };
}

function UpdateBottom({ data }: CreateBottomProps) {
    const [selectedModal, setSelectedModal] = useState<string | null>(null);
    const { setSelectedTime, totalPeople, VehicleType, sameGenderStatus } = PotCreateStore();
    const openTimeModal = () => {
        setSelectedModal('time');
    };

    const closeModal = () => {
        setSelectedModal(null);
    };

    const isSelectionComplete = totalPeople > 1;
    const [DateTimeValue, setDateTimeValue] = useState<Dayjs | null>(null);

    return (
        <S.Bottom>
            <S.Wrapper
                style={{
                    paddingBottom: '40px',
                }}
            >
                <S.TextWrapper>
                    <S.BottomTitle>출발시간</S.BottomTitle>

                    <DateTimePicker
                        defaultValue={dayjs(data.departureTime)}
                        value={DateTimeValue}
                        onChange={(newValue) => {
                            setDateTimeValue(newValue);
                            if (newValue != null) setSelectedTime(newValue?.format('YYYY-MM-DD HH:mm:ss'));
                        }}
                    />
                </S.TextWrapper>
                <ChevronRight width="24" height="24" />
            </S.Wrapper>
            <S.Wrapper style={{ paddingBottom: '10px' }} onClick={openTimeModal}>
                <S.TextWrapper>
                    <S.BottomTitle>이동수단 및 인원</S.BottomTitle>
                    <S.Description>
                        {isSelectionComplete ? (
                            <S.SelectedInfo>
                                {VehicleType} / 총 {totalPeople}명 / {sameGenderStatus ? '동성끼리 탑승' : '혼성탑승'}
                            </S.SelectedInfo>
                        ) : (
                            '이동수단 및 인원을 선택해주세요'
                        )}
                    </S.Description>
                </S.TextWrapper>
                <ChevronRight width="24" height="24" style={{ marginTop: '13px' }} />
            </S.Wrapper>
            {selectedModal === 'time' && <TaxiTypePersonnelModal closeModal={closeModal} />}
        </S.Bottom>
    );
}
export default UpdateBottom;
