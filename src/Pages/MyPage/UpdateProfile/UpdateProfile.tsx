import CreateHeader from './UpdateHeader'
import CreateExitButton from './CreateExitButton'
import styled from 'styled-components'
function UpdateProfile() {
    return (
        <>
            <Container>
                <CreateHeader />
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
                    <CompleteWrapper>
                        <Title>모연두 님의</Title>
                        <Title>팟 생성이 완료되었어요!</Title>
                    </CompleteWrapper>
                </div>
                <CompleteNote>• 파티원에게 매칭 신청이 올 때까지 기다려주세요.</CompleteNote>
                <CreateExitButton />
            </Container>
        </>
    )
}

export default UpdateProfile

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: scroll;
`
const CompleteWrapper = styled.div`
    text-align: center;
`
const Title = styled.div`
    font-size: 22px;
    font-weight: 700;
    font-family: Pretendard;
`
const CompleteNote = styled.div`
    color: #9a9a9a;
    font-size: 14px;
    font-family: Pretendard;
    font-weight: 500;
    margin-top: 45px;
    text-align: center;
`
