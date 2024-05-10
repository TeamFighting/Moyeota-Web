import { useState, useEffect } from 'react';

function BankRecommend() {
    const [bank, setBank] = useState('');
    const NH = ['352', '302', '301', '312', '306', '305', '317'];
    const NHCENTAL = ['356', '351', '356', '355'];
    const KB = ['01', '21', '24', '05', '04', '25', '26'];
    const [bankList, setBankList] = useState<string[]>([]);

    useEffect(() => {
        if (bank.length >= 10) {
            const check1 = bank.substring(3, 5);
            const check = bank.substring(0, 3);
            const newBankList = [...bankList];

            if ((NH.includes(check) || NH.includes(check1)) && !newBankList.includes('농협은행')) {
                newBankList.push('농협은행');
            }
            if ((NHCENTAL.includes(check) || NHCENTAL.includes(check1)) && !newBankList.includes('농협중앙회')) {
                newBankList.push('농협중앙회');
            }
            if ((KB.includes(check) || KB.includes(check1)) && !newBankList.includes('국민은행')) {
                newBankList.push('국민은행');
            }

            setBankList(newBankList);
        }
    }, [bank]); // bank가 변경될 때마다 이 useEffect는 실행됩니다.

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBank(e.target.value);
    };

    return (
        <div>
            <input type="number" onChange={handleChange}></input>
            <div>
                {bankList.map((item, index) => (
                    <div key={index}>{item}</div> // key로 index 사용
                ))}
            </div>
        </div>
    );
}

export default BankRecommend;
