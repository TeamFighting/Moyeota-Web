import Header from '../Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BankAccountInfo, BankAccountNumber, BankInfoTop, BankListWrapper, BankLogo, BankName, Wrapper } from './style';
import { useNavigate, useParams } from 'react-router';
import BottomNav from '@components/BottomNav';
import { FloatingBottomButton } from '@components/Buttons/FloatingBottomButton';

type BankAccount = {
    bankName: string;
    accountNumber: string;
};

function EditBankAccount() {
    const [bankAccount, setBankAccount] = useState<BankAccount[]>([{ bankName: '', accountNumber: '' }]);
    const userId = useParams().userId;
    const navigate = useNavigate();

    useEffect(() => {
        getBankAccount();
    }, []);
    const getBankAccount = async () => {
        try {
            const re = await axios.get('/users/account');
            console.log(re.data);
            setBankAccount(re.data);
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
                {bankAccount.map((account, index) => (
                    <BankAccountInfo key={index}>
                        <BankInfoTop>
                            <BankLogo></BankLogo>
                            <BankName>{account.bankName}</BankName>
                        </BankInfoTop>
                        <BankAccountNumber>{account.accountNumber}</BankAccountNumber>
                    </BankAccountInfo>
                ))}
            </BankListWrapper>
            <FloatingBottomButton message="계좌번호 추가하기" onClickFunction={navToAddAccount} />
            <BottomNav />
        </Wrapper>
    );
}

export default EditBankAccount;
