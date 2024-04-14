import { useParams } from 'react-router';
import { instance } from '../../../axios';
import * as S from '../styles';
import { useEffect, useState } from 'react';
import { useMyInfoStore } from '../../../state/store/MyInfo';
import { CheckCircle, PotOwnerCrown } from '../../../assets/svg';
import styled from 'styled-components';
import { Toaster, toast } from 'react-hot-toast';
interface PartyOneProps {
    userId: number;
    nickname: string;
    profileImage: string;
    potOwner: boolean;
    distance: number;
    price: number;
    accountNumber: string;
    bankName: string;
}

function Body() {
    const width = window.innerWidth - 40;
    const [partyOne, setPartyOne] = useState<PartyOneProps[]>([]);
    const [MyPayment, setMyPayment] = useState<number>(0);
    const [accountNumber, setAccountNumber] = useState<string>('');
    const [BankName, setBankName] = useState<string>('');
    const { postId } = useParams();
    const { id } = useMyInfoStore();
    const getAccountNumber = async () => {
        const result = await instance.get(`posts/${postId}/members`);
        result.data.data.forEach((party: PartyOneProps) => {
            if (party.potOwner) {
                setAccountNumber(party.accountNumber);
                setBankName(party.bankName);
            }
        });
    };
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
    const test = async () => {
        const temp = await instance.post(`posts/calculation/${postId}`);
        console.log(temp.data.data);
    };
    const getPartyOne = async () => {
        const result = await instance.get(`posts/${postId}/members`);
        const partyOneData = result.data.data;
        const updatedPartyOne = await Promise.all(
            partyOneData.map(async (party: PartyOneProps) => {
                const result = await instance.get(
                    `participation-details/payment/users/${party.userId}/posts/${postId}`,
                );
                const money = result.data.data;
                if (party.userId === id) setMyPayment(money.price);
                return {
                    ...party,
                    distance: money.distance,
                    price: money.price,
                };
            }),
        );
        setPartyOne(updatedPartyOne);
    };

    const render = partyOne.map((party) => {
        const isMyPayment = party.userId === id;
        return (
            <S.PartyOneRow>
                <Toaster position="bottom-center" />
                <S.MoneyLeft>
                    {party.potOwner && (
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
                    <S.PartyOneImage src={party.profileImage} />
                    {isMyPayment && <S.PotOwner>나</S.PotOwner>}
                    <S.PartyOneName>{party.nickname}</S.PartyOneName>
                </S.MoneyLeft>
                <S.MoneyRight>
                    <S.EachMoney isMyPayment={isMyPayment} style={{ textDecorationLine: 'none' }}>
                        {party.price}원 / {party.distance}km
                    </S.EachMoney>
                </S.MoneyRight>
            </S.PartyOneRow>
        );
    });

    useEffect(() => {
        getPartyOne();
        test();
        getAccountNumber();
    }, []);

    return (
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
                        handleCopyClipBoard(BankName + '은행 ' + accountNumber);
                    }}
                >
                    {BankName}은행 {accountNumber}
                </AccountNumber>
                <MyPayments>{MyPayment}원</MyPayments>
                <S.PartyOne>{render}</S.PartyOne>
            </S.Money>
        </div>
    );
}
const Icon = styled.div``;
const AccountNumber = styled.div`
    color: #f00;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 25.12px */
    text-decoration-line: underline;
    margin-bottom: 4px;
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
