import { useNavigate, useParams } from 'react-router';
import { instance } from '../../../axios';
import Header from '../OwnerReimbursement/Header';
import { MoneyInput, StyledButton } from '../styles';
import * as S from './styles';
import { useState } from 'react';
import { useMyInfoStore } from '../../../state/store/MyInfo';

function ApplierCalc() {
    const [money, setMoney] = useState('');
    const accessToken = localStorage.getItem('accessToken');
    const { name, nickName } = useMyInfoStore();
    const { postId } = useParams();
    const navigate = useNavigate();
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
    const submitTotalMoney = async () => {
        const res = await instance.post(
            `/participation-details/posts/${postId}`,
            new URLSearchParams({
                fare: money,
            }),
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            },
        );
        if (res.status === 200) {
            navigate('/waitPlease');
        }
        console.log(res);
    };

    return (
        <div>
            <Header />
            <S.Body>
                <S.Title>
                    {nickName ?? name}님이 내릴 당시
                    <br />
                    미터기 금액 입력해주세요.
                </S.Title>
                <MoneyInput
                    type="text"
                    style={{ fontSize: '22px', width: '100%', borderBottom: '2px solid #9a9a9a' }}
                    value={formatNumber(money)}
                    onKeyDown={handleChange}
                    onClick={(e) => (e.currentTarget.selectionStart = e.currentTarget.value.length)}
                    inputName={money === '' ? 'default' : 'moneyInput'}
                    placeholder="금액 입력 (원)"
                />
            </S.Body>
            <div style={{ width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <StyledButton onClick={submitTotalMoney}>다음</StyledButton>
            </div>
        </div>
    );
}

export default ApplierCalc;
