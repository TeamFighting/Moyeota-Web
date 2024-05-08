import { useParams } from 'react-router';
import { instance } from '../../../axios';
import { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight, WhiteCancelIcon } from '../../../assets/svg';
import { BankLists } from '../../../assets/BankLists';
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
    const getPartyOne = () => {
        // const result = await instance.get(`posts/${postId}/members`);
        const data = [
            {
                nickname: '모연두',
                profileImage: '/public/png/RobotProfile.png',
                potOwner: true,
            },
            {
                nickname: '모사자',
                profileImage: '/public/png/RobotProfile.png',
                potOwner: false,
            },
            {
                nickname: '모치즈',
                profileImage: '/public/png/RobotProfile.png',
                potOwner: false,
            },
        ];
        setPartyOne(data);
    };
    const AccountData = [
        {
            accountNumber: '123456789',
            bank: '카카오뱅크',
        },
        {
            accountNumber: '123456789',
            bank: 'NH농협',
        },
        {
            accountNumber: '123456789',
            bank: '카카오뱅크',
        },
        {
            accountNumber: '123456789',
            bank: 'NH농협',
        },
        {
            accountNumber: '123456789',
            bank: '카카오뱅크',
        },
        {
            accountNumber: '123456789',
            bank: 'NH농협',
        },
    ];
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
    const [message, setMessage] = useState({});
    const messages: object[] = [];
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
    const handleData = () => {
        setMessage({ potName: '판교팟', postId: 1, totalAmount: 1600, EachAmount: messages });
        console.log(message);
    };
    const render = partyOne.map((party) => {
        let eachQuotient = Number(money);
        const remainder = Number(money) % partyOne.length;
        if (remainder > 0) {
            eachQuotient -= remainder;
        }
        const eachMoney = formatNumber((eachQuotient / partyOne.length).toString());
        messages.push({ [party.nickname]: eachMoney });
        return (
            <S.PartyOneRow>
                <S.MoneyLeft>
                    {party.potOwner && <S.PotOwner>나</S.PotOwner>}
                    <S.PartyOneImage src={party.profileImage} />
                    <S.PartyOneName>{party.nickname}</S.PartyOneName>
                </S.MoneyLeft>
                <S.MoneyRight>
                    <S.EachMoney isMyPayment={false}>{eachMoney}</S.EachMoney>
                    {/* <S.Icon>
                        <WhiteCancelIcon width={14} />
                    </S.Icon> */}
                </S.MoneyRight>
            </S.PartyOneRow>
        );
    });
    const [isOpenAccountLists, setIsOpenAccountLists] = useState(false);
    const [selectSingleAccount, setSelectSingleAccount] = useState(-1);
    const selectAccount = () => {
        console.log('계좌 선택하기');
        setIsOpenAccountLists(!isOpenAccountLists);
    };
    const clickedAccount = (idx: number) => {
        setSelectSingleAccount(idx);
        console.log('clickedAccount', idx);
    };
    const windowHeight = window.innerHeight;
    const accountListsHeight = windowHeight - 111;
    return (
        <div
            style={{
                width: '100%',
                height: accountListsHeight,
                overflow: 'scroll',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
            }}
        >
            <div
                style={{
                    width: width,
                    height: '100%', // 화면 전체 높이에서 100px을 뺀 값으로 설정
                    marginLeft: '20px',
                    marginRight: '20px',
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
                                    <S.EachMoney isMyPayment={false}>{moyeotaPay}원</S.EachMoney>
                                    <S.Icon>
                                        <WhiteCancelIcon width={14} />
                                    </S.Icon>
                                </S.MoneyRight>
                            </div>
                        </S.PartyOne>
                    )}
                    <S.PartyOne>{render}</S.PartyOne>
                </S.Money>
                <S.SelectAccount isClicked={isOpenAccountLists} onClick={selectAccount}>
                    <S.SelectAccountText>계좌 선택하기</S.SelectAccountText>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <S.SelectAccountLength>1개</S.SelectAccountLength>
                        <S.SelectAccountIcon>
                            <ChevronRight width={24} height={24} />
                        </S.SelectAccountIcon>
                    </div>
                </S.SelectAccount>
                {isOpenAccountLists && (
                    <div style={{ paddingBottom: '16px' }}>
                        {AccountData.map((account, idx) => {
                            const url = BankLists.find((bank) => bank.name === account.bank)?.url || '';
                            return (
                                <S.AccountLists
                                    className={idx.toString()}
                                    onClick={() => clickedAccount(idx)}
                                    selectIdx={selectSingleAccount.toString()}
                                >
                                    <div style={{ borderRadius: '100%', width: '24px', height: '24px' }}>
                                        <img style={{ width: '24px', height: '24px' }} src={url}></img>
                                    </div>
                                    <div>
                                        <S.BankName>{account.bank}</S.BankName>
                                        <S.AccountNumber>{account.accountNumber} </S.AccountNumber>
                                    </div>
                                </S.AccountLists>
                            );
                        })}
                    </div>
                )}
            </div>
            <S.StyledButton onClick={handleData}>확인</S.StyledButton>
        </div>
    );
}

export default Body;
