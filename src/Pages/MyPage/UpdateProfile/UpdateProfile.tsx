import UpdateHeader from './UpdateHeader'
import UpdateExitButton from './UpdateExitButton'
import styled from 'styled-components'
import InputDelete from '../../../assets/svg/InputDelete'
function UpdateProfile() {
    return (
        <>
            <Container>
                <UpdateHeader />
                <TextWrapper>
                    <Title>프로필을 설정해주세요</Title>
                    <CompleteNote>
                        사진과 닉네임, 성별, 나이대가 공개돼요
                        <br />
                        합승할 파티원에게 보여줄 프로필을 설정해보세요
                    </CompleteNote>
                </TextWrapper>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div style={{ marginTop: 34, marginBottom: 34 }}>
                        <img width="84" height="84" src="/svg/Yondo.svg" alt="로봇 프로필" />
                    </div>
                    <Tags>
                        <Tag>여자</Tag>
                        <Tag>20대</Tag>
                        <Tag>실명인증완료</Tag>
                    </Tags>
                    <InputStyle type="text" placeholder="모연두" />
                    <InputDelete
                        style={{
                            width: 18,
                            height: 18,
                            zIndex: 1,
                            position: 'absolute',
                            right: '36px',
                            top: '405px',
                        }}
                    />
                </div>
                <UpdateExitButton />
            </Container>
        </>
    )
}

export default UpdateProfile

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const TextWrapper = styled.div`
    text-align: left;
    padding-left: 20px;
    padding-top: 30px;
`
const Title = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`
const CompleteNote = styled.div`
    color: var(--Gray-Text-1, #9a9a9a);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 157%;
    padding-top: 16px;
`
const Tags = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    margin-bottom: 34px;
`

const Tag = styled.div`
    font-size: 10px;
    font-weight: 600;
    color: #7e7e7e;
    display: flex;
    margin-right: 9px;
    border-radius: 4px;
    background-color: #f5f6f8;
    padding: 2px 4px;
`
const InputStyle = styled.input`
    background-color: #f5f6f8;
    border-radius: 12px;
    width: calc(100% - 80px);
    height: 48px;
    flex-shrink: 0;
    margin: 0 auto;
    padding: 0px 20px;
    border: none;
    outline: none;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 25.12px;
    padding-left: 21px;
    &::placeholder {
        color: var(--Gray-Text-1, #9a9a9a);
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 21.98px;
    }
`
