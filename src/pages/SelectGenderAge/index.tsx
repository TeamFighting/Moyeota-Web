import Header from '@components/Header';
import { BirthInputWrapper, Container, RadioButtonWrap, SubTitle, Title, Input, Icon } from './style';
import { useEffect, useRef, useState } from 'react';
import { RadioButtonNotSelected, RadioButtonSelected } from '@assets/svg';
import BottomButton from '@components/Buttons/BottomButton';
import instance from '@apis/index';

function SelectGenderAge() {
    const [gender, setGender] = useState('남');
    const [pickerValue, setPickerValue] = useState<PickerValue>({
        year: '',
        month: '',
        day: '',
    });
    const [isDateFull, setIsDateFull] = useState(false);

    const YearRef = useRef<HTMLInputElement>(null);
    const MonthRef = useRef<HTMLInputElement>(null);
    const DayRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const { year, month, day } = pickerValue;
        if (year.length === 4 && month.length === 2 && day.length === 2) {
            setIsDateFull(true);
        } else {
            setIsDateFull(false);
        }
    }, [pickerValue]);

    const handleYear = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d{0,4}$/.test(value)) {
            setPickerValue((prev) => ({
                ...prev,
                year: value,
            }));
            if (value.length === 4) {
                MonthRef.current?.focus();
            }
        }
    };

    const handleMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d{0,2}$/.test(value)) {
            setPickerValue((prev) => ({
                ...prev,
                month: value,
            }));
            if (value.length === 2) {
                DayRef.current?.focus();
            }
        }
    };

    const handleDay = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d{0,2}$/.test(value)) {
            setPickerValue((prev) => ({
                ...prev,
                day: value,
            }));
        }
    };

    const sendUserInfo = async () => {
        try {
            const res = await instance.put(
                '/users/info',
                {
                    age: `${new Date().getFullYear() - parseInt(pickerValue.year)}`,
                    gender: gender,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                },
            );
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div style={{ width: '100vw', height: '100dvh' }}>
            <Header />
            <Container>
                <Title>
                    성별과 나이를 <br />
                    알려주세요
                </Title>
                <SubTitle>성별</SubTitle>
                <RadioButtonWrap>
                    <Icon onClick={() => setGender('남')}>
                        {gender === '남' ? <RadioButtonSelected width={24} /> : <RadioButtonNotSelected width={24} />}남
                    </Icon>
                    <Icon onClick={() => setGender('여')}>
                        {gender === '여' ? <RadioButtonSelected width={24} /> : <RadioButtonNotSelected width={24} />}여
                    </Icon>
                </RadioButtonWrap>
                <SubTitle>나이(출생연도)</SubTitle>
                <BirthInputWrapper>
                    <Input
                        style={{ width: '48px' }}
                        ref={YearRef}
                        value={pickerValue.year}
                        onChange={handleYear}
                        placeholder="YYYY"
                        maxLength={4}
                    />
                    {pickerValue.year.length == 4 && '.'}

                    <Input
                        style={{ marginLeft: '2px' }}
                        ref={MonthRef}
                        value={pickerValue.month}
                        onChange={handleMonth}
                        placeholder="MM"
                        maxLength={2}
                    />
                    {pickerValue.month.length == 2 && '.'}
                    <Input ref={DayRef} value={pickerValue.day} onChange={handleDay} placeholder="DD" maxLength={2} />
                </BirthInputWrapper>
            </Container>
            <BottomButton onClick={sendUserInfo} isDisabled={isDateFull} text="완료" />
        </div>
    );
}

export default SelectGenderAge;
