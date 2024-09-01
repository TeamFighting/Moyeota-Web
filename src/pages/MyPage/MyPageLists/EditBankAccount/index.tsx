import Header from '../Header';
import { useEffect, useState } from 'react';
import { BankAccountInfo, BankAccountNumber, BankInfoTop, BankListWrapper, BankLogo, BankName, Wrapper } from './style';
import { useNavigate, useParams } from 'react-router';
import BottomNav from '@components/BottomNav';
import { FloatingBottomButton } from '@components/Buttons/FloatingBottomButton';
import instance from '@apis/index';
import { BankLists } from '@assets/BankLists';

type BankAccount = {
    bankName: string;
    accountNumber: string;
};

function EditBankAccount() {
    const [bankAccount, setBankAccount] = useState<BankAccount[]>([{ bankName: '', accountNumber: '' }]);
    const userId = useParams().userId;
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    useEffect(() => {
        getBankAccount();
    }, []);
    const getBankAccount = async () => {
        try {
            const re = await instance.get('/accounts', {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            });
            setBankAccount(re.data.data);
        } catch (e) {
            console.log(e);
        }
    };

    const navToAddAccount = () => {
        navigate(`/mypage/addaccount/${userId}`);
    };
    return (
        <Wrapper>
            <Header title={'계좌 관리'} />
            <BankListWrapper style={{ width: '100%', height: '100%', overflowY: 'scroll' }}>
                {bankAccount &&
                    bankAccount.map((account, index) => {
                        const url = BankLists.find((bank) => bank.name === account.bankName)?.url || '';

                        return (
                            <BankAccountInfo key={index}>
                                <BankInfoTop>
                                    <BankLogo src={url}></BankLogo>
                                    <BankName>{account.bankName}</BankName>
                                </BankInfoTop>
                                <BankAccountNumber>{account.accountNumber}</BankAccountNumber>
                            </BankAccountInfo>
                        );
                    })}
            </BankListWrapper>
            <FloatingBottomButton message="계좌번호 추가하기" onClickFunction={navToAddAccount} />
            <BottomNav />
        </Wrapper>
    );
}

export default EditBankAccount;
