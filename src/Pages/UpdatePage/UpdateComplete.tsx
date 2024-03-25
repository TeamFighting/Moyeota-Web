import * as S from '../CreatePotPage/style';
import CreateHeader from './UpdateHeader';
import CreateExitButton from '../CreatePotPage/Components/Button/CreateExitButton';
import styled from 'styled-components';
function createComplete() {
    return (
        <>
            <S.Container>
                <CreateHeader />
                <Divider />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: `calc(100vh - 252px)`,
                    }}
                >
                    <div style={{ marginBottom: 37 }}>
                        <img width="84" height="84" src="/svg/Yondo.svg" alt="로봇 프로필" />
                    </div>
                    <S.CompleteWrapper>
                        <S.Title>모연두 님의</S.Title>
                        <S.Title>팟 생성이 완료되었어요!</S.Title>
                    </S.CompleteWrapper>
                </div>
                <S.CompleteNote>• 파티원에게 매칭 신청이 올 때까지 기다려주세요.</S.CompleteNote>
                <CreateExitButton />
            </S.Container>
        </>
    );
}

const Divider = styled.div`
    width: 100vw;
    background-color: #f5f6f8;
    height: 10px;
`;

export default createComplete;
