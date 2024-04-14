import { Title } from '../../CreatePotPage/style';
import { useParams } from 'react-router';
import { instance } from '../../../axios';
import { useEffect, useState } from 'react';
import { WhiteCancelIcon } from '../../../assets/svg';
import * as S from '../styles';
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
            <S.PartyOneRow>
                <S.MoneyLeft>
                    {party.potOwner && <S.PotOwner>나</S.PotOwner>}
                    <S.PartyOneImage src={party.profileImage} />
                    <S.PartyOneName>{party.nickname}</S.PartyOneName>
                </S.MoneyLeft>
                <S.MoneyRight>
                    <S.EachMoney>{eachMoney}</S.EachMoney>
                    <S.Icon>
                        <WhiteCancelIcon width={14} />
                    </S.Icon>
                </S.MoneyRight>
            </S.PartyOneRow>
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
            <S.Title>
                전체 금액 입력 후, <br /> 송금 받을 계좌를 선택해주세요
            </S.Title>
            <S.Content>
                팟장이 전체금액 선결제 후, <br /> 파티원들에게 거리별 비용금액을 송금 받을 수 있어요
            </S.Content>
            <S.Money>
                <div
                    style={{
                        display: 'flex',
                        borderBottom: '2px solid var(--Gray-Text-1, #9a9a9a)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingRight: '5px',
                    }}
                >
                    <S.MoneyInput
                        type="text"
                        value={formatNumber(money)}
                        onKeyDown={handleChange}
                        onClick={(e) => (e.currentTarget.selectionStart = e.currentTarget.value.length)}
                        inputName={money === '' ? 'default' : 'moneyInput'}
                        placeholder="금액 입력 (원)"
                    />

                    <S.Icon>
                        <WhiteCancelIcon width={14} />
                    </S.Icon>
                </div>
                <S.MoneyText>최대 100만원까지 입력 가능</S.MoneyText>
                <S.PartyText>
                    <div style={{ textDecorationLine: 'underline' }}>파티원</div>
                    <div>{partyOne.length - 1}</div>
                </S.PartyText>
                {moyeotaPay > 0 && (
                    <S.PartyOne>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <S.MoneyLeft>
                                <S.PartyOneImage src="/public/png/RobotProfile.png" />
                                <S.PartyOneName>모여타가 쏜다</S.PartyOneName>
                            </S.MoneyLeft>
                            <S.MoneyRight>
                                <S.EachMoney>{moyeotaPay}원</S.EachMoney>
                                <S.Icon>
                                    <WhiteCancelIcon width={14} />
                                </S.Icon>
                            </S.MoneyRight>
                        </div>
                    </S.PartyOne>
                )}
                <S.PartyOne>{render}</S.PartyOne>
            </S.Money>
        </div>
    );
}

export default Body;
