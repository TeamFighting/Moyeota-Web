import Header from '../Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BankAccountInfo, BankAccountNumber, BankInfoTop, BankLogo, BankName, Wrapper } from './style';
import BottomButton from '@components/BottomButton';
import { useNavigate, useParams } from 'react-router';

type BankAccount = {
    bankName: string;
    accountNumber: string;
};

function EditBankAccount() {
    const [bankAccount, setBankAccount] = useState<BankAccount[]>([{ bankName: '', accountNumber: '' }]);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
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
            {bankAccount.map((account, index) => (
                <BankAccountInfo
                    onClick={() => setSelectedIndex(index)}
                    isSelected={index === selectedIndex}
                    key={index}
                >
                    <BankInfoTop>
                        <BankLogo>log</BankLogo>
                        <BankName>{account.bankName}</BankName>
                    </BankInfoTop>
                    <BankAccountNumber>{account.accountNumber}</BankAccountNumber>
                </BankAccountInfo>
            ))}
            <BottomButton onClick={navToAddAccount} text="계좌 추가하기" />
        </Wrapper>
    );
}

export default EditBankAccount;
