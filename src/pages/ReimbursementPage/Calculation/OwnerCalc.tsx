import Header from '../OwnerReimbursement/Header';
import { MoneyInput, StyledButton } from '../styles';
import { useState } from 'react';
import { instance } from '../../../axios';
import { useNavigate, useParams } from 'react-router';
import * as S from './styles';
import { UseGetNewAccessToken } from '../../../Hooks/useGetNewAccessToken';

function OwnerCalc() {
    const [money, setMoney] = useState('');
    const accessToken = localStorage.getItem('accessToken');
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
        try {
            const res = await instance.post(
                `/totalDetails/${postId}`,
                {
                    totalDistance: 0,
                    totalPayment: Number(money),
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    },
                },
            );
            if (res.status === 200) {
                navigate('/waitPlease');
            }
        } catch (e: any) {
            if (e.response.status === 401) {
                if (await UseGetNewAccessToken(accessToken!)) {
                    submitTotalMoney();
                }
            }
        }
    };

    return (
        <div>
            <Header />
            <S.Body>
                <S.Title>
                    아직
                    <br />
                    정산결과가 안 나왔어요 !
                </S.Title>
                <S.Explanation>
                    최종금액을 입력해주세요.
                    <br /> 계산해서 파티원에게 전달할게요
                </S.Explanation>
                <MoneyInput
                    type="text"
                    style={{ marginLeft: '20px', width: '80%', borderBottom: '2px solid #9a9a9a' }}
                    value={formatNumber(money)}
                    onKeyDown={handleChange}
                    onClick={(e) => (e.currentTarget.selectionStart = e.currentTarget.value.length)}
                    inputName={money === '' ? 'default' : 'moneyInput'}
                    placeholder="최종 금액 입력 (원)"
                />
            </S.Body>
            <div style={{ width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <StyledButton onClick={submitTotalMoney}>다음</StyledButton>
            </div>
        </div>
    );
}

export default OwnerCalc;
