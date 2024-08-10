import { useLocation } from 'react-router';
import * as S from '../styles';
import { useMyInfoStore } from '../../../stores/MyInfo';
import { CheckCircle, PotOwnerCrown } from '../../../assets/svg';
import styled from 'styled-components';
import { Toaster, toast } from 'react-hot-toast';
import SvgDollar from '../../../assets/svg/Dollar';
import { BottomSheetBTN } from '../OwnerReimbursement/Body';
import SvgCopyIcon from '../../../assets/svg/CopyIcon';
function Body() {
    const width = window.innerWidth - 40;
    const { userId } = useMyInfoStore();
    const location = useLocation();
    const { data } = location.state;

    const handleCopyClipBoard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast(
                () => (
                    <div
                        style={{
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '9px',
                        }}
                    >
                        <CheckCircle width={24} />
                        <div
                            style={{
                                textAlign: 'center',
                                gap: '9px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            계좌번호가 복사되었습니다
                        </div>
                    </div>
                ),
                {
                    style: {
                        background: '#73737E',
                        color: 'white',
                        borderRadius: '99px',
                        textAlign: 'center',
                        fontFamily: 'Pretendard',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        lineHeight: 'normal',
                        letterSpacing: '0.48px',
                    },
                },
            );
        } catch (e) {
            alert('복사에 실패하였습니다');
        }
    };

    const render = data.EachAmount.map(
        (each: { userId: number; amount: number; name: string; profileImage: string; isPartyOwner: boolean }) => {
            const isMyPayment = each.userId === userId;
            return (
                <S.PartyOneRow>
                    <Toaster position="bottom-center" />
                    <S.MoneyLeft>
                        {each.isPartyOwner && (
                            <Icon
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    backgroundColor: 'none',
                                    position: 'absolute',
                                    marginBottom: '30px',
                                    marginRight: '15px',
                                }}
                            >
                                <PotOwnerCrown width={24} height={24} />
                            </Icon>
                        )}
                        <S.PartyOneImage src={each.profileImage} />
                        {isMyPayment && <S.PotOwner>나</S.PotOwner>}
                        <S.PartyOneName>{each.name}</S.PartyOneName>
                    </S.MoneyLeft>
                    <S.MoneyRight>
                        <S.EachMoney isMyPayment={isMyPayment} style={{ textDecorationLine: 'none' }}>
                            {each.amount}원
                        </S.EachMoney>
                    </S.MoneyRight>
                </S.PartyOneRow>
            );
        },
    );

    return (
        <div
            style={{
                width: '100vw',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '90vh',
            }}
        >
            <div
                style={{
                    width: width,
                    marginLeft: '20px',
                    marginRight: '20px',
                    backgroundColor: 'white',
                }}
            >
                <S.Title>팟장에게 송금해주세요 !</S.Title>
                <S.Content>
                    팟장이 전체금액 선결제 후, <br /> 파티원들에게 거리별 비용금액을 송금 받을 수 있어요
                </S.Content>
                <S.Money>
                    <AccountNumber
                        onClick={() => {
                            handleCopyClipBoard(data.account.bankName + data.account.accountNumber);
                        }}
                    >
                        <div style={{ textDecorationLine: 'underline' }}>
                            {data.account.bankName} {data.account.accountNumber}
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '3px',
                                marginLeft: '1px',
                            }}
                        >
                            <SvgCopyIcon width={10} height={10} />
                            <CopyText>복사</CopyText>
                        </div>
                    </AccountNumber>
                    <MyPayments>{data.totalAmount}</MyPayments>
                    <S.PartyOne>{render}</S.PartyOne>
                </S.Money>
                <CalaExplain style={{ width: '100%' }}>
                    <Icon>
                        <SvgDollar />
                    </Icon>
                    최종 금액 총 <CalcExplainMoney> {data.totalAmount} </CalcExplainMoney> / {data.totalPeople}명
                </CalaExplain>
            </div>
            <div
                style={{
                    width: '90%',
                    height: '50px',
                    justifyContent: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: '10px',
                }}
            >
                <BottomSheetBTN>확인</BottomSheetBTN>
            </div>
        </div>
    );
}

const CopyText = styled.div`
    color: #606060;
    font-family: Pretendard;
    font-size: 8px;
    font-style: normal;
    font-weight: 600;
    line-height: 157%; /* 12.56px */
    text-decoration-line: none;
`;

const CalaExplain = styled.div`
    color: var(--Gray-Text-2, #7e7e7e);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 21.98px */
    display: flex;
    flex-direction: row;
    gap: 12px;
    margin-left: 12px;
`;

const CalcExplainMoney = styled.div`
    color: var(--Gray-Text-3, #343434);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 157%;
`;
const Icon = styled.div`
    width: 16px;
    height: 16px;
`;
const AccountNumber = styled.div`
    color: #606060;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 25.12px */
    margin-bottom: 4px;
    display: flex;
    flex-direction: row;
    :hover {
        cursor: pointer;
    }
`;
const MyPayments = styled.div`
    color: var(--Gray-Text-3, #343434);
    font-family: Pretendard;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;
export default Body;
