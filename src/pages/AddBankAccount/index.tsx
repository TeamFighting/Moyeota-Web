import instance from '@apis';
import { ErrorToast, SuccessToast } from '@components/ToastMessages';
import { useAccountStore } from '@stores/AccountStore';
import toast, { useToasterStore } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { match } from 'ts-pattern';

import Body from './Body';
import { ADD_ACCOUNT_FROM, SuccessToastStyle } from './constants';
import type { TAddAccountFrom } from './constants';
import Header from './Header';


const ErrorToastStyle = {
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
} as React.CSSProperties;

function AddBankAccount() {
    const { accountNumber, accountName, isOpenedAccountList, setIsOpenedAccountList, clearAccount } = useAccountStore();
    const { from, userId } = useParams();
    const { toasts } = useToasterStore();
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    const handleAccountClick = () => {
        if (toasts.length > 0) return;

        if (accountNumber == null) {
            toast(() => <ErrorToast message="계좌번호를 입력해주세요" />, {
                icon: '❕',
                style: ErrorToastStyle,
                duration: 500,
            });
            return;
        } else if (accountName === null) {
            toast(<ErrorToast message="은행을 선택해주세요" />, {
                icon: '❕',
                style: ErrorToastStyle,
                duration: 1000,
            });
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

            if (res.status === 200) {
                clearAccount();
                toast(<SuccessToast message="계좌가 등록되었습니다." />, {
                    style: SuccessToastStyle,
                    duration: 1000,
                });

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
