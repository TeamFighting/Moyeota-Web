import styled from 'styled-components';
import { CharacterCrown, ChatSeeU } from '../../assets/svg';
import { PotOwner } from '../ReimbursementPage/styles';
function ChatReimbursement() {
    const { id } = JSON.parse(localStorage.getItem('myInfo') as string);
    const data = {
        potName: '판교팟',
        postId: 1,
        totalAmount: 13600,
        totalPeople: 4,
        EachAmount: [
            { name: '모연두', amount: 5700, userId: 1 },
            { name: '모사자', amount: 4100, userId: 2 },
            { name: '모치즈', amount: 3800, userId: 6 },
        ],
    };
    return (
        <Wrapper>
            <Top>
                <Icon>
                    <ChatSeeU />
                </Icon>
                <TopText>정산하기를 요청했어요!</TopText>
                <CharacterIcon>
                    <CharacterCrown />
                </CharacterIcon>
            </Top>
            <Body>
                <PotName>{data.potName}</PotName>
                <Amount>
                    요청인원 : {data.totalPeople}명
                    <br />
                    전체금액 : {data.totalAmount}원
                    {data.EachAmount.map((each) => {
                        return (
                            <Amount key={each.userId}>
                                {each.name} : {each.amount}원
                            </Amount>
                        );
                    })}
                </Amount>
                <div>
                    {data.EachAmount.map((each) => {
                        return (
                            each.userId == id && (
                                <MyAmount>
                                    <div style={{ textDecoration: 'underline' }}>{each.amount}원</div>
                                    <div>을 송금해주세요!</div>
                                </MyAmount>
                            )
                        );
                    })}
                </div>
                <Warning>
                    · 연락두절, 상대방에게 피해를 주는 경우 신고를 통해 <br /> &nbsp; 이용에 제재를 받을 수 있습니다.
                </Warning>
            </Body>
            <Bottom>
                {/* 보내는 사람 입장 */}
                <PotOwner>
                    <Status>정산 현황</Status>
                </PotOwner>
                {/* 받는 사람 입장*/}
                <Participants>
                    <ParticipantsBTN>
                        <div
                            style={{
                                color: '#5D5D5D',
                                textAlign: 'center',
                                fontFamily: 'Pretendard',
                                fontSize: '14px',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                lineHeight: 'normal',
                            }}
                        >
                            송금하기
                        </div>
                    </ParticipantsBTN>
                    <ParticipantsBTN style={{ backgroundColor: '#1EDD81', color: '#fff' }}>
                        <div
                            style={{
                                textAlign: 'center',
                                fontFamily: 'Pretendard',
                                fontSize: '14px',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                lineHeight: 'normal',
                            }}
                        >
                            정산현황
                        </div>
                    </ParticipantsBTN>
                </Participants>
            </Bottom>
        </Wrapper>
    );
}
const Participants = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;
const CharacterIcon = styled.div`
    width: 56px;
    height: 66px;
    z-index: 1;
    position: relative;
    left: 178px;
    top: -19px;
`;
const Icon = styled.div`
    width: 71px;
    height: 19px;
    margin-right: 8px;
    padding-left: 124px;
`;
const Wrapper = styled.div`
    width: 248px;
    /* min-height: 329px; */
    background: #ffffff;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
    border-radius: 16px;
`;
const Top = styled.div`
    width: 248px;
    height: 58px;
    flex-shrink: 0;
    border-radius: 12px 12px 0px 0px;
    background: var(--Green-Button, #1edd81);
`;
const TopText = styled.div`
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 157%; /* 25.12px */
    display: flex;
    justify-content: start;
    align-items: center;
    padding-left: 16px;
`;
const Body = styled.div`
    width: 100%;
    margin-top: 10px;
    margin-left: 17px;
    display: flex;
    gap: 8px;
    flex-direction: column;
`;
const PotName = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 157%; /* 18.84px */
`;
const Amount = styled.div`
    color: var(--Gray-Text-3, #343434);
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 18.84px */
`;

const MyAmount = styled.div`
    color: var(--Gray-Text-3, #343434);
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 18.84px */
    display: flex;
    flex-direction: row;
`;
const Warning = styled.div`
    color: var(--Gray-Text-2, #7e7e7e);
    font-family: Pretendard;
    font-size: 8px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 12.56px */
`;
const Bottom = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
    flex-direction: column;
    padding-bottom: 16px;
    gap: 14px;
`;

const Status = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background: var(--Gray-Button, #f1f1f1);
    width: 217px;
    height: 34px;
    flex-shrink: 0;
    color: #5d5d5d;
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;
const ParticipantsBTN = styled.div`
    width: 103px;
    height: 34px;
    flex-shrink: 0;
    border-radius: 12px;
    background: var(--Gray-Button, #f1f1f1);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default ChatReimbursement;
