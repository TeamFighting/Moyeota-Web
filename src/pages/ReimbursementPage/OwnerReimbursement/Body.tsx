import { useEffect, useState } from 'react';
import { ChevronRight, WhiteCancelIcon } from '../../../assets/svg';
import ANIM from '../../../assets/ANIM.gif';
import { BankLists } from '../../../assets/BankLists';
import * as S from '../styles';
import instance from '@apis/index';
import { useNavigate, useParams } from 'react-router';
import { useMyInfoStore } from '../../../stores/MyInfo';
import { useReimbursementMessageStore } from '../../../stores/ReimbursementMessage';
import { useRef } from 'react';
import { serverTimestamp, ref as dbRef, set, push, child } from 'firebase/database';
import 'moment/locale/ko';
import { db } from '../../../firebase';
import styled from 'styled-components';
import useBottomSheet from '../../../hooks/useBottonSheet';
import BottomSheetHandle from '../../AddAccount/BankListSheet/BankListSheetHandle';
import { motion } from 'framer-motion';
import { UseGetNewAccessToken } from '../../../hooks/useGetNewAccessToken';

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
    const accessToken = localStorage.getItem('accessToken');
    // 계좌 리스트 오픈 여부
    const [isOpenAccountLists, setIsOpenAccountLists] = useState(false);
    // 선택된 계좌 인덱스, border 스타일링을 위해 사용
    const [selectSingleAccount, setSelectSingleAccount] = useState(-1);
    // 선택된 계좌 정보 (메시지 전송시 사용)
    const [selectedAccount, setSelectedAccount] = useState({ bankName: '', accountNumber: '' });
    const { setReimbursementMessage, setEachAmount } = useReimbursementMessageStore();
    const roomId = potInfo.roomId;
    const name = potInfo.userName;
    // 송금 메시지 데이터 생성 및 각 인원에 대한 정보 입력
    const handleData = async () => {
        handleUp();

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
    const [loading, setLoading] = useState(false);
    const sendFare = async () => {
        setLoading(true);
        // const max = reimbursementMessage.totalAmount;
        let max = 0;
        reimbursementMessage.EachAmount.map(async (each): Promise<void> => {
            if (calcType === 'N') {
                max += each.amount;
            } else {
                max = Math.max(max, each.amount);
            }
            try {
                await instance.post(
                    `participation-details/users/${each.userId}/posts/${postId}?fare=${each.amount}`,
                    null,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    },
                );
            } catch (e: any) {
                console.log(e);
                if (e.response.status === 401) {
                    if (await UseGetNewAccessToken(accessToken!)) {
                        sendFare();
                    }
                }
            }
        });

        try {
            const res = await instance.post(
                `totalDetails/${postId}`,
                {
                    totalDistance: 10,
                    totalPayment: max,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            if (res.status === 200) {
                setTimeout(() => {
                    setShowNextButton(true);
                }, 2000);
            }
        } catch (e: any) {
            if (e.response.status === 401) {
                if (await UseGetNewAccessToken(accessToken!)) {
                    sendFare();
                }
            }
        }
    };

    interface EachMoneyProps {
        userId: number;
        amount: number;
        name: string;
        profileImage: string;
        isPartyOwner: boolean;
    }

    const { sheet, handleUp, content } = useBottomSheet('BottomSheet');
    const [showNextButton, setShowNextButton] = useState(false);
    const [, setCalcResult] = useState<EachMoneyProps[]>([]);
    const calculation = async () => {
        const arr: EachMoneyProps[] = [];
        const res = await instance.post(`/posts/calculation/${postId}`);
        if (res.status === 200) {
            partyOne.map((party) => {
                reimbursementMessage.EachAmount.map(async (each) => {
                    try {
                        const res = await instance.get(
                            `participation-details/payment/users/${each.userId}/posts/${postId}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${accessToken}`,
                                },
                            },
                        );
                        setCalcResult(res.data.data);

                        if (res.status === 200) {
                            if (each.userId === party.userId) {
                                const isPartyOwner = each.userId === Number(userId);
                                arr.push({
                                    userId: each.userId,
                                    amount: res.data.data.price,
                                    name: each.name,
                                    profileImage: party.profileImage,
                                    isPartyOwner: isPartyOwner,
                                });
                            }
                        }
                    } catch (e: any) {
                        console.log(e);
                        if (e.response.status === 401) {
                            if (await UseGetNewAccessToken(accessToken!)) {
                                calculation();
                            }
                        }
                    }
                });
            });
            setEachAmount(arr);
            setLoading(false);
            setReimbursementMessage({ ...reimbursementMessage, EachAmount: arr }); // reimbursementMessage 객체도 업데이트
        }
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
    const navigate = useNavigate();
    const sendMessage = async () => {
        try {
            if (roomId === undefined) return;
            await set(push(child(messagesRef, roomId)), createMessage());
            inputRef.current?.focus();
        } catch (e) {
            console.log(e);
        }
        navigate(`/chat/${postId}/${roomId}`);
    };

    const getPotInfo = async () => {
        const result = await instance.get(`posts/${postId}`);
        if (result.status === 200) {
            setPotInfo(result.data.data);
        }
    };

    // 파티원 정보 받아오고 내 정보를 맨 앞으로 보내주는 함수
    const getPartyOne = async () => {
        try {
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
        } catch (e: any) {
            if (e.response.status === 401) {
                if (await UseGetNewAccessToken(accessToken!)) {
                    getPartyOne();
                }
            }
        }
    };

    useEffect(() => {
        getPartyOne();
        getPotInfo();
    }, []);
    useEffect(() => {
        calcEachMoney();
    }, [money]);

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

    const BottomSheetRender = () => {
        return partyOne.map((party) => {
            let amount = 0;
            reimbursementMessage.EachAmount.map((each) => {
                if (each.userId === party.userId) {
                    amount = Number(each.amount);
                }
            });
            return (
                <S.PartyOneRow style={{ marginBottom: '10px' }}>
                    <S.MoneyLeft>
                        <S.PartyOneImage src={party.profileImage} />
                        {party.userId == Number(userId) && <S.PotOwner>나</S.PotOwner>}
                        <S.PartyOneName>{party.nickname}</S.PartyOneName>
                    </S.MoneyLeft>
                    <S.MoneyRight>
                        <S.EachMoney isMyPayment={false}>{amount}</S.EachMoney>
                    </S.MoneyRight>
                </S.PartyOneRow>
            );
        });
    };
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
            <Bottom>
                <Wrapper ref={sheet}>
                    <div
                        style={{
                            marginTop: '17px',
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'white',
                            borderRadius: '26px 26px 0 0',
                        }}
                    >
                        <BottomSheetHandle />
                        <div
                            ref={content}
                            style={{
                                width: '100%',
                                height: '100%',
                                overflow: 'scroll',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <BottomSheetContentWrapper>
                                {!loading ? (
                                    <div
                                        style={{
                                            width: '90%',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <div>
                                            <S.Title
                                                style={{
                                                    width: '100%',

                                                    fontWeight: '600',
                                                    fontSize: '20px',
                                                }}
                                            >
                                                <div>최종확인</div>
                                                <div>
                                                    총{' '}
                                                    {reimbursementMessage.EachAmount.reduce(
                                                        (acc, cur) => (acc = Math.max(acc, cur.amount)),
                                                        0,
                                                    )}
                                                    원
                                                </div>
                                            </S.Title>
                                            <S.PartyText style={{ margin: '10px 0' }}>
                                                파티원 {reimbursementMessage.totalPeople}명
                                            </S.PartyText>
                                            {BottomSheetRender()}
                                        </div>
                                        <div
                                            style={{
                                                width: '100%',
                                                height: '50px',
                                                justifyContent: 'center',
                                                display: 'flex',
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                            }}
                                        >
                                            {!showNextButton ? (
                                                <BottomSheetBTN onClick={sendFare}>금액 입력</BottomSheetBTN>
                                            ) : (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '50px',
                                                        justifyContent: 'center',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        flexDirection: 'row',
                                                        gap: '10px',
                                                    }}
                                                >
                                                    <BottomSheetBTN onClick={sendMessage}>요청하기</BottomSheetBTN>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        style={{
                                            width: '90%',
                                            height: '90%',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <S.Title style={{ fontWeight: 630, fontSize: '20px' }}>
                                                거리 별 더치페이 계산 중이예요 <br />
                                                잠시만 기다려주세요
                                            </S.Title>
                                            <img
                                                width={300}
                                                height={300}
                                                style={{ marginTop: '20px', borderRadius: '50%' }}
                                                src={ANIM}
                                            />
                                        </div>
                                        <div>
                                            {showNextButton && (
                                                <BottomSheetBTN
                                                    id="nextButton"
                                                    style={{ width: '1000ms', height: '1000ms', transition: '1000ms' }}
                                                    onClick={calculation}
                                                >
                                                    다음
                                                </BottomSheetBTN>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </BottomSheetContentWrapper>
                        </div>
                    </div>
                </Wrapper>
            </Bottom>
            <div onClick={handleData}>확인</div>
        </div>
    );
}
export const BottomSheetBTN = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 48px;
    border-radius: 12px;
    background: #1edd81;
    color: #fff;
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.54px;
`;
const Bottom = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    bottom: 0;
    height: auto; /* 아래에 있는 내용만큼 높이를 가지도록 */
`;

const Wrapper = styled(motion.div)<{ isMaxHeight: boolean }>`
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 10000;
    width: 100%;
    border-radius: 26px 26px 0 0;
    height: 100%;
    transition: transform 400ms ease-out;
    margin-top: auto;
    margin-bottom: 100px;
`;

const BottomSheetContentWrapper = styled.div`
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: column;
    margin: 0 10px;
    align-items: center;
`;
export default Body;
