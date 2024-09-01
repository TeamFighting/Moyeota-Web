import DetailHeader from '../DetailPage/components/DetailHeader';
import { ContentDetail, Title } from '../DetailPage/style';
import { DeleteButton } from '../../assets/svg';
import { Icon } from '../CreatePotPage/style';
import { useNavigate } from 'react-router';
import * as S from './style';
import { useState } from 'react';
import ContentStore from '../../stores/ContentStore';
import { useQuickPotStore } from '../../stores/QuickPotStore';
import { useQuickMathDestinationStore } from '../../stores/QuickMathDestinationStore';

function QuickMatch() {
    const navigate = useNavigate();

    const [time, setTime] = useState<string>('');
    const { destination, setDestination } = useQuickMathDestinationStore();
    const { totalData } = ContentStore();
    const handleDestination = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDestination(e.target.value);
    };

    const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTime(e.target.value);
    };

    const { setQuickPot } = useQuickPotStore();

    const handleClick = () => {
        const pot = totalData
            .filter((data) => {
                if (data.destination.toLowerCase().includes(destination.toLowerCase())) {
                    return data;
                }
            })
            .map((data: object) => {
                return data;
            });
        setQuickPot(pot);
        if (destination !== '' && time !== '') {
            navigate('/quickMatchFinding', {
                state: { time: time, destination: destination },
            });
        } else if (destination === '' && time !== '') {
            alert('도착지를 입력해주세요');
        } else if (time === '' && destination !== '') {
            alert('출발시간을 입력해주세요');
        }
    };

    return (
        <div>
            <DetailHeader from={'BottomSheet'} />
            <S.Container>
                <S.Discription>
                    <Title>
                        어디로 <br />
                        떠날까요?
                    </Title>
                    <ContentDetail>
                        출발시간 및 도착지를 입력해주세요 <br /> 관련된 팟이 없다면 전체 팟을 보여줘요.
                    </ContentDetail>
                </S.Discription>
                <S.Inputs onChange={handleTime}>
                    <S.Text>출발시간</S.Text>
                    <S.Wrapper>
                        <S.StyledInput placeholder="예) 오전 11시" />
                        <Icon
                            style={{
                                zIndex: 100,
                                marginTop: '15px',
                                marginLeft: '-30px',
                            }}
                        >
                            <DeleteButton style={{ width: '18px', zIndex: 100, position: 'absolute' }} />
                        </Icon>
                    </S.Wrapper>

                    <S.Text>도착지</S.Text>
                    <S.Wrapper>
                        <S.StyledInput placeholder="예) 모여타역 모여타선" onChange={handleDestination}></S.StyledInput>
                        <Icon
                            style={{
                                zIndex: 100,
                                marginTop: '15px',
                                marginLeft: '-30px',
                            }}
                        >
                            <DeleteButton
                                style={{
                                    width: '18px',
                                }}
                            />
                        </Icon>
                    </S.Wrapper>
                </S.Inputs>
                <S.Submit onClick={() => handleClick()}>완료</S.Submit>
            </S.Container>
        </div>
    );
}

export default QuickMatch;
