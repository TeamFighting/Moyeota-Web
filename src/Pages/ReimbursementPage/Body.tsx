import styled from 'styled-components';
import { Title } from '../CreatePotPage/style';
import { useParams } from 'react-router';
import { instance } from '../../axios';
import { useEffect, useState } from 'react';
import { WhiteCancelIcon } from '../../assets/svg';

interface PartyOneProps {
    nickname: string;
    profileImage: string;
    potOwner: boolean;
}

function Body() {
    const width = window.innerWidth - 40;
    const [partyOne, setPartyOne] = useState<PartyOneProps[]>([]);
    const { postId } = useParams();
    const [money, setMoney] = useState('');
    const [moyeotaPay, setMoyeotaPay] = useState(0);
    const [, setQuotient] = useState(0);
    const getPartyOne = async () => {
        const result = await instance.get(`posts/${postId}/members`);
        setPartyOne(result.data.data);
    };

    useEffect(() => {
        getPartyOne();
        calcEachMoney();
    }, [money]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (e: React.KeyboardEvent) => {
        e.preventDefault();

        if (e.key === 'Backspace') {
            setMoney(money.slice(0, -1));
        } else if (/\d/g.test(e.key)) {
            setMoney(money + e.key);
        }
    };
    function formatNumber(num: string) {
        if (num === '') return '';
        const nums = num.replace(/\D/g, '');
        return nums.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
    }

    const calcEachMoney = () => {
        setQuotient(Number(money));
        const remainder = Number(money) % partyOne.length;
        if (remainder > 0) {
            setMoyeotaPay(remainder);
        } else {
            setMoyeotaPay(0);
        }
    };
    const render = partyOne.map((party) => {
        let eachQuotient = Number(money);
        const remainder = Number(money) % partyOne.length;
        if (remainder > 0) {
            eachQuotient -= remainder;
        }
        const eachMoney = formatNumber((eachQuotient / partyOne.length).toString());
        return (
            <PartyOneRow>
                <MoneyLeft>
                    {party.potOwner && <PotOwner>나</PotOwner>}
                    <PartyOneImage src={party.profileImage} />
                    <PartyOneName>{party.nickname}</PartyOneName>
                </MoneyLeft>
                <MoneyRight>
                    <EachMoney>{eachMoney}</EachMoney>
                    <Icon>
                        <WhiteCancelIcon width={14} />
                    </Icon>
                </MoneyRight>
            </PartyOneRow>
        );
    });
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
                        value={formatNumber(money)}
                        onKeyDown={handleChange}
                        onClick={(e) => (e.currentTarget.selectionStart = e.currentTarget.value.length)}
                        inputName={money === '' ? 'default' : 'moneyInput'}
                        placeholder="금액 입력 (원)"
                    />

                    <Icon>
                        <WhiteCancelIcon width={14} />
                    </Icon>
                </div>
                <MoneyText>최대 100만원까지 입력 가능</MoneyText>
                <PartyText>
                    <div style={{ textDecorationLine: 'underline' }}>파티원</div>
                    <div>{partyOne.length - 1}</div>
                </PartyText>
                {moyeotaPay > 0 && (
                    <PartyOne>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <MoneyLeft>
                                <PartyOneImage src="/public/png/RobotProfile.png" />
                                <PartyOneName>모여타가 쏜다</PartyOneName>
                            </MoneyLeft>
                            <MoneyRight>
                                <EachMoney>{moyeotaPay}원</EachMoney>
                                <Icon>
                                    <WhiteCancelIcon width={14} />
                                </Icon>
                            </MoneyRight>
                        </div>
                    </PartyOne>
                )}
                <PartyOne>{render}</PartyOne>
            </Money>
        </div>
    );
}

const PotOwner = styled.div`
    width: 22px;
    height: 22px;
    white-space: nowrap;
    border-radius: 50%;
    background-color: #5d5d5d;
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    font-family: Pretendard;
    font-weight: 700;
`;

const MoneyLeft = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: center;
`;
const MoneyRight = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: center;
`;
const EachMoney = styled.div`
    color: var(--Gray-Text-3, #343434);
    text-align: right;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-decoration-line: underline;
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
    display: flex;
    flex-direction: column;
    border-radius: 12px;
`;
const Icon = styled.div`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #9a9a9a;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export default Body;
