import { useEffect, useState } from 'react';
import { ChevronRight, WhiteCancelIcon } from '../../../assets/svg';
import { BankLists } from '../../../assets/BankLists';
import * as S from '../styles';
import { instance } from '../../../axios';
import { useParams } from 'react-router';
import { useMyInfoStore } from '../../../state/store/MyInfo';
import { useReimbursementMessageStore } from '../../../state/store/ReimbursementMessage';
import { useRef } from 'react';
import { serverTimestamp, ref as dbRef, set, push, child } from 'firebase/database';
import 'moment/locale/ko';
import { db } from '../../../firebase';
import { calcLength } from 'framer-motion';

interface PartyOneProps {
    nickname: string;
    profileImage: string;
    potOwner: boolean;
    userId: number;
}
interface PostInfoType {
    title: string;
    postId: number;
    roomId: string;
    userName: string;
}
function Body() {
    const width = window.innerWidth - 40;
    const [partyOne, setPartyOne] = useState<PartyOneProps[]>([]);
    const [money, setMoney] = useState('');
    const { postId, userId } = useParams();
    const [moyeotaPay, setMoyeotaPay] = useState(0);
    const [, setQuotient] = useState(0);
    const { accountDtoList, profileImage } = useMyInfoStore();
    const [potInfo, setPotInfo] = useState<PostInfoType>({ title: '', postId: 0, roomId: '', userName: '' });
    const [calcType, setCalcType] = useState('N');
    const windowHeight = window.innerHeight;
    const accountListsHeight = windowHeight - 111;
    // 계좌 리스트 오픈 여부
    const [isOpenAccountLists, setIsOpenAccountLists] = useState(false);
    // 선택된 계좌 인덱스, border 스타일링을 위해 사용
    const [selectSingleAccount, setSelectSingleAccount] = useState(-1);
    // 선택된 계좌 정보 (메시지 전송시 사용)
    const [selectedAccount, setSelectedAccount] = useState({ bankName: '', accountNumber: '' });
    const { setReimbursementMessage } = useReimbursementMessageStore();
    const roomId = potInfo.roomId;
    const name = potInfo.userName;

    // 송금 메시지 데이터 생성
    const handleData = () => {
        if (potInfo?.postId === undefined) return;
        if (potInfo?.title === undefined) return;
        let totalMoney;
        if (money === '') {
            totalMoney = formatNumber(totalEachInputMoney.toString());
        } else {
            totalMoney = formatNumber(money);
        }

        setReimbursementMessage({
            account: selectedAccount,
            potName: potInfo?.title,
            postId: potInfo?.postId,
            totalAmount: totalMoney,
            EachAmount: EachMoney,
            totalPeople: EachMoney.length,
        });
    };

    const messagesRef = dbRef(db, 'messages');
    const inputRef = useRef<HTMLInputElement>(null);
    const { reimbursementMessage } = useReimbursementMessageStore();
    const createMessage = () => {
        const message = {
            key: roomId,
            JSONMessage: JSON.stringify(reimbursementMessage),
            user: {
                id: userId,
                name: name,
                profileImage: profileImage,
            },
            timestamp: serverTimestamp(),
        };

        return message;
    };

    const sendMessage = async () => {
        console.log(reimbursementMessage);
        // try {
        //     if (roomId === undefined) return;
        //     await set(push(child(messagesRef, roomId)), createMessage());
        //     inputRef.current?.focus();
        // } catch (e) {
        //     console.log(e);
        // }
    };

    const getPotInfo = async () => {
        const result = await instance.get(`posts/${postId}`);
        if (result.status === 200) {
            setPotInfo(result.data.data);
        }
    };

    // 파티원 정보 받아오고 내 정보를 맨 앞으로 보내주는 함수
    const getPartyOne = async () => {
        const result = await instance.get(`posts/${postId}/members`);
        if (result.status === 200) {
            const arr = result.data.data;
            const newArr = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].userId == Number(userId)) {
                    newArr.push(arr[i]);
                }
            }
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].userId !== Number(userId)) {
                    newArr.push(arr[i]);
                }
            }
            setPartyOne(newArr);
            setEachMoney(newArr.map((each) => ({ name: each.nickname, amount: 0, userId: each.userId })));
        }
    };
    // 모여타에서 N빵 계산해주는 함수
    const calcFinalMoney = async () => {
        const res = await instance.post(`/posts/calculation/${postId}`);
    };

    useEffect(() => {
        getPartyOne();
        getPotInfo();
        calcFinalMoney();
    }, []);
    useEffect(() => {
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
        let eachQuotient = Number(money);

        if (remainder > 0) {
            eachQuotient -= remainder;
        }
        if (eachQuotient < 0 || partyOne.length <= 0) return;
        const defaultEachMoney = eachQuotient / partyOne.length;
        setNEachMoney(defaultEachMoney);
        setEachMoney((prev) => {
            return prev.map((each) => {
                return { ...each, amount: defaultEachMoney };
            });
        });
    };

    // N빵했을때 각 인당 가격
    const [NEachMoney, setNEachMoney] = useState(0);
    // 직접 입력한 금액
    const [EachMoney, setEachMoney] = useState([{ name: '', amount: 0, userId: 0 }]);
    // newEachMoney에서 필요한 유저 인덱스
    const [clickedUserId, setClickedUserId] = useState(0);
    // 인당 가격 입력 전체 금액 계산
    let totalEachInputMoney = 0;
    if (calcType === 'input') {
        for (let i = 0; i < EachMoney.length; i++) {
            totalEachInputMoney += EachMoney[i].amount;
        }
    }

    // 인당 가격 직접 입력 함수
    const newEachMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMoney = e.target.value;
        setEachMoney((prev) => {
            return prev.map((each) => {
                if (each.userId === clickedUserId) {
                    return { ...each, amount: Number(newMoney) };
                } else {
                    return each;
                }
            });
        });
    };

    // 직접 입력 금액 렌더링
    const Irender = partyOne.map((party) => {
        return (
            <S.PartyOneRow>
                <S.MoneyLeft>
                    <S.PartyOneImage src={party.profileImage} />
                    {party.userId == Number(userId) && <S.PotOwner>나</S.PotOwner>}
                    <S.PartyOneName>{party.nickname}</S.PartyOneName>
                </S.MoneyLeft>
                <S.MoneyRight>
                    <input
                        style={{
                            border: 'none',
                            width: '80px',
                            background: 'none',
                        }}
                        placeholder="금액 입력 (원)"
                        onFocus={() => setClickedUserId(party.userId)}
                        onChange={newEachMoney}
                    />
                </S.MoneyRight>
            </S.PartyOneRow>
        );
    });

    // N빵했을때 각 인당 가격 렌더링
    const Nrender = partyOne.map((party) => {
        return (
            <S.PartyOneRow>
                <S.MoneyLeft>
                    <S.PartyOneImage src={party.profileImage} />
                    {party.userId == Number(userId) && <S.PotOwner>나</S.PotOwner>}
                    <S.PartyOneName>{party.nickname}</S.PartyOneName>
                </S.MoneyLeft>
                <S.MoneyRight>
                    <S.EachMoney isMyPayment={false}>{NEachMoney}</S.EachMoney>
                </S.MoneyRight>
            </S.PartyOneRow>
        );
    });

    // 계좌 리스트 오픈 함수
    const selectAccount = () => {
        setIsOpenAccountLists(!isOpenAccountLists);
    };

    // 계좌 선택 함수
    const clickedAccount = (idx: number) => {
        setSelectSingleAccount(idx);
        setSelectedAccount({
            bankName: accountDtoList[idx].bankName,
            accountNumber: accountDtoList[idx].accountNumber,
        });
    };

    return (
        <div
            style={{
                width: '100%',
                height: accountListsHeight,
                overflow: 'scroll',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
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
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                        <S.CalcTypeBar
                            calcType={calcType}
                            className="N"
                            onClick={() => {
                                setCalcType('N');
                                setMoney('');
                            }}
                        >
                            1/N
                        </S.CalcTypeBar>
                        <S.CalcTypeBar
                            calcType={calcType}
                            className="input"
                            onClick={() => {
                                setCalcType('input');
                                setMoney('');
                            }}
                        >
                            직접 입력
                        </S.CalcTypeBar>
                    </div>
                    {calcType === 'N' ? (
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
                    ) : (
                        <S.MoneyText>{formatNumber(totalEachInputMoney.toString())}</S.MoneyText>
                    )}
                    <S.MoneyExplainText>최대 100만원까지 입력 가능</S.MoneyExplainText>
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
                    {calcType === 'N' ? <S.PartyOne>{Nrender}</S.PartyOne> : <S.PartyOne>{Irender}</S.PartyOne>}
                </S.Money>
                <S.SelectAccount isClicked={isOpenAccountLists} onClick={selectAccount}>
                    <S.SelectAccountText>계좌 선택하기</S.SelectAccountText>
                    <div style={{ display: 'flex', flexDirection: 'row', marginRight: '16px', gap: '10px' }}>
                        <S.SelectAccountLength>
                            {' '}
                            {accountDtoList[0].bankName} 외 {accountDtoList.length - 1}개
                        </S.SelectAccountLength>
                        <S.SelectAccountIcon>
                            <ChevronRight width={24} height={24} />
                        </S.SelectAccountIcon>
                    </div>
                </S.SelectAccount>
                {isOpenAccountLists && (
                    <div style={{ paddingBottom: '16px' }}>
                        {accountDtoList.map((account, idx) => {
                            const url = BankLists.find((bank) => bank.name === account.bankName)?.url || '';
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
                                        <S.BankName>{account.bankName}</S.BankName>
                                        <S.AccountNumber>{account.accountNumber} </S.AccountNumber>
                                    </div>
                                </S.AccountLists>
                            );
                        })}
                    </div>
                )}
            </div>
            <div onClick={handleData}>확인</div>
            <div onClick={sendMessage}>메시지 보내기</div>
        </div>
    );
}

export default Body;
