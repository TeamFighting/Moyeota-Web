import styled from 'styled-components';
import { Title } from '../CreatePotPage/style';
import { useParams } from 'react-router';
import { instance } from '../../axios';
import { useEffect, useState } from 'react';
import { CancelIcon, WhiteCancelIcon } from '../../assets/svg';

interface PartyOneProps {
    userName: string;
    profileImage: string;
}

function Body() {
    const width = window.innerWidth - 40;
    const [partyOne, setPartyOne] = useState<PartyOneProps[]>([]);
    const { postId, userId } = useParams();
    console.log(postId, userId);
    const getPartyOne = async () => {
        const result = await instance.get(`posts/${postId}/members`);
        setPartyOne(result.data.data);
    };
    // const calcMoney = async () => {
    //     // 금액 계산
    //     const result = await instance.get(`posts/calculation/${postId}`);
    //     console.log(result);
    // };
    useEffect(() => {
        getPartyOne();
        // calcMoney();
    }, []);
    const [money, setMoney] = useState('-1');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (e: any) => {
        e.preventDefault();
        setMoney(e.target.value);
        console.log(e.target.value);
    };
    function formatNumber(num: string) {
        const nums = num.replace(/\D/g, '');
        return nums.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
    }
    return (
        <div
            style={{
                width: width,
                marginLeft: '20px',
                marginRight: '20px',
                backgroundColor: 'white',
            }}
        >
            <Title>팟장에게 송금해주세요 !</Title>
            <Content>
                팟장이 전체금액 선결제 후, <br /> 파티원들에게 거리별 비용금액을 송금 받을 수 있어요
            </Content>
            <Money>
                <div style={{ position: 'absolute', width: '100%' }}></div>
                <div
                    style={{
                        display: 'flex',
                        borderBottom: '2px solid var(--Gray-Text-1, #9a9a9a)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingRight: '5px',
                    }}
                >
                    <MoneyInput
                        type="text"
                        value={formatNumber(money.toString())}
                        onChange={handleChange}
                        inputName={money === '-1' ? 'default' : 'moneyInput'}
                        placeholder="금액 입력 (원)"
                    />

                    <div
                        style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            backgroundColor: '#9A9A9A',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <WhiteCancelIcon width={14} />
                    </div>
                </div>
                <MoneyText>최대 100만원까지 입력 가능</MoneyText>
                <PartyText>
                    <div style={{ textDecorationLine: 'underline' }}>파티원</div>
                    <div>{partyOne.length - 1}</div>
                </PartyText>
                <PartyOne>
                    {partyOne.map((party) => {
                        return (
                            <PartyOneRow>
                                <div>
                                    <PartyOneImage src={party.profileImage} />
                                    <PartyOneName>{party.userName}</PartyOneName>
                                </div>
                                <EachMoney>
                                    <MoneyText>{formatNumber((Number(money) / partyOne.length).toString())}</MoneyText>
                                    <div
                                        style={{
                                            width: '18px',
                                            height: '18px',
                                            borderRadius: '50%',
                                            backgroundColor: '#9A9A9A',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <WhiteCancelIcon width={14} />
                                    </div>
                                </EachMoney>
                            </PartyOneRow>
                        );
                    })}
                </PartyOne>
            </Money>
        </div>
    );
}
const EachMoney = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: center;
`;
const PartyOneRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: space-between;
`;
const PartyOneImage = styled.img`
    object-fit: cover;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 3px solid #f5f6f8;
`;
const PartyOneName = styled.div`
    color: var(--Gray-Text-3, #343434);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 157%; /* 25.12px */
`;
const Content = styled.div`
    margin-top: 15px;
    color: var(--Gray-Text-1, #9a9a9a);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 25.12px */
`;
const Money = styled.div`
    margin: 20px 19px;
    padding: 19px 20px;
    width: width;
    height: 339px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #f5f6f8;
    border-radius: 12px;
`;
const MoneyInput = styled.input<{ inputName?: string }>`
    width: 100%;
    height: 50px;
    border: none;
    background-color: transparent;
    color: ${(props) => (props.inputName === 'default' ? '#9A9A9A' : '#343434')};
    font-family: Pretendard;
    font-size: ${(props) => (props.inputName === 'default' ? '24px' : '32px')};
    font-style: normal;
    font-weight: ${(props) => (props.inputName === 'default' ? '500' : '700')};
    line-height: 157%;
    &:focus {
        outline: none;
    }
`;
const MoneyText = styled.div`
    color: #9a9a9a;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 18.84px */
`;

const PartyText = styled.div`
    margin-top: 32px;
    color: var(--Gray-Text-2, #7e7e7e);
    font-family: Pretendard;
    font-size: 14px;
    gap: 8px;
    font-style: normal;
    font-weight: 500;
    display: flex;
    flex-direction: row;
`;

const PartyOne = styled.div`
    margin-top: 16px;
    gap: 16px;
    width: 100%;
    /* height: 1; */
    display: flex;
    flex-direction: column;
    /* background-color: white; */
    border-radius: 12px;
`;
export default Body;
