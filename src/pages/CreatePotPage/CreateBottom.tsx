import { ChevronRight } from '@assets/svg';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import PotCreateStore from '@stores/PotCreateStore';
import type { Dayjs } from 'dayjs';
import { useState } from 'react';

import TaxiTypePersonnelModal from './Components/Modal/TaxiTypePersonnelModal';
import * as S from './style';

declare global {
    interface Window {
        ReactNativeWebView: {
            postMessage: (message: string) => void;
        };
    }
}

function CreateBottom() {
    const [selectedModal, setSelectedModal] = useState<string | null>(null);
    const { totalPeople, VehicleType, sameGenderStatus } = PotCreateStore();
    const [DateTimeValue, setDateTimeValue] = useState<Dayjs | null>(null);

    const { setSelectedTime } = PotCreateStore((state) => ({
        selectedTime: state.selectedTime,
        setSelectedTime: state.setSelectedTime,
    }));
    const openTimeModal = () => {
        setSelectedModal('time');
    };

    const closeModal = () => {
        setSelectedModal(null);
    };

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
                        {totalPeople > 1 ? (
                            <S.SelectedInfo>
                                {VehicleType} / 총 {totalPeople}명 /{' '}
                                {sameGenderStatus == 'YES' ? '동성끼리 탑승' : '혼성탑승'}
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
export default CreateBottom;
