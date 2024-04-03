import * as S from './style';
import CreateHeader from './CreateHeader';
import CreateExitButton from './Components/Button/CreateExitButton';
import styled from 'styled-components';

function createComplete() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const userData = JSON.parse(localStorage.getItem('myInfo') as string);
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
                        <img
                            style={{ borderRadius: '100%' }}
                            width="84"
                            height="84"
                            src={userData.profileImage}
                            alt="프로필"
                        />
                    </div>
                    <S.CompleteWrapper>
                        <S.Title>
                            {/* {userData.name} 님의 */}
                            {userData.nickName == null ? userData.name : userData.nickName} 님의
                        </S.Title>
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
