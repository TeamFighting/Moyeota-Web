import styled from 'styled-components';
import Header from '../OwnerReimbursement/Header';
import { MoneyInput } from '../styles';
import { useState } from 'react';

function OwnerCalc() {
    const [money, setMoney] = useState('');

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

    return (
        <div>
            <Header />
            <Body>
                <Title>
                    아직
                    <br />
                    정산결과가 안 나왔어요 !
                </Title>
                <Explanation>
                    최종금액을 입력해주세요.
                    <br /> 계산해서 파티원에게 전달할게요
                </Explanation>

                <MoneyInput
                    type="text"
                    style={{ marginLeft: '20px', width: '80%', borderBottom: '2px solid #9a9a9a' }}
                    value={formatNumber(money)}
                    onKeyDown={handleChange}
                    onClick={(e) => (e.currentTarget.selectionStart = e.currentTarget.value.length)}
                    inputName={money === '' ? 'default' : 'moneyInput'}
                    placeholder="최종 금액 입력 (원)"
                />
            </Body>
        </div>
    );
}
const Body = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: 224px;
    background-color: #f5f5f5;
    gap: 15px;
`;
const Title = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;
const Explanation = styled.div`
    color: var(--Gray-Text-1, #9a9a9a);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 25.12px */
`;

export default OwnerCalc;
