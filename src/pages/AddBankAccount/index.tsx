import styled from 'styled-components';
import Body from './Body';
import Header from './Header';
import { useAccountStore } from '@stores/AccountStore';
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle } from '@assets/svg';
import { useNavigate, useParams } from 'react-router';
import instance from '@apis';
import { ADD_ACCOUNT_FROM } from './constants';
import type { TAddAccountFrom } from './constants';
import { match } from 'ts-pattern';

function AddBankAccount() {
    const { accountNumber, accountName, isOpenedAccountList, setIsOpenedAccountList, clearAccount } = useAccountStore();
    console.log(accountNumber, accountName);
    const { from, userId } = useParams();
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    const handleAccountClick = () => {
        if (accountNumber === '') {
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
                        <div
                            style={{
                                textAlign: 'center',
                                gap: '9px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            계좌번호를 입력해주세요
                        </div>
                    </div>
                ),
                {
                    icon: '❕',

                    style: {
                        background: 'red',
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
            return;
        }
        if (accountName === '') {
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
                        <div
                            style={{
                                textAlign: 'center',
                                gap: '9px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            은행을 선택해주세요
                        </div>
                    </div>
                ),
                {
                    icon: '❕',
                    style: {
                        background: 'red',
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
            return;
        }
        postBankName();
    };
    const postBankName = async () => {
        try {
            const res = await instance.post(
                '/users/account',
                {
                    accountNumber: accountNumber,
                    bankName: accountName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            console.log(res);
            if (res.status === 200) {
                console.log('success');
                clearAccount();

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
                                계좌번호가 추가되었습니다
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

                match(from as TAddAccountFrom)
                    .with(ADD_ACCOUNT_FROM.CREATE_POT, () => {
                        setTimeout(() => {
                            window.location.href = '/mainpage';
                        }, 500);
                    })
                    .with(ADD_ACCOUNT_FROM.MY_PAGE, () => {
                        setTimeout(() => {
                            navigate(`/mypage/editAccount/${userId}`);
                        }, 500);
                    })
                    .exhaustive();
            }
        } catch (e: any) {
            console.log(e);
        }
    };
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100vw',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100dvh',
                overflow: 'hidden',
            }}
        >
            {isOpenedAccountList && (
                <div
                    style={{
                        zIndex: 200,
                        position: 'absolute',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        width: '100%',
                        height: '100dvh',
                        flexDirection: 'column',
                    }}
                    onClick={() => {
                        setIsOpenedAccountList(false);
                    }}
                />
            )}
            <Header />
            <Body />
            <Toaster position="bottom-center" />
            <NextBtn onClick={() => handleAccountClick()}>다음</NextBtn>
        </div>
    );
}

const NextBtn = styled.div`
    position: fixed;
    bottom: 0;
    width: 335px;
    height: 48px;
    flex-shrink: 0;
    border-radius: 12px;
    background-color: #1edd81;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.54px;
    margin-bottom: 20px;
`;
export default AddBankAccount;
