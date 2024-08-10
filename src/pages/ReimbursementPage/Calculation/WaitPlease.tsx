import Header from '../OwnerReimbursement/Header';
import { StyledButton } from '../styles';
import * as S from './styles';
function WaitPlease() {
    const goMain = () => {
        window.location.href = '/mainpage';
    };
    return (
        <div>
            <Header />
            <S.Body>
                <S.Title>
                    조금만
                    <br />
                    기다려주세요
                </S.Title>
                <S.Explanation>
                    각 파티원에게 미터기 금액을
                    <br /> 입력하라고 요청했어요
                </S.Explanation>
            </S.Body>
            <div style={{ width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <StyledButton onClick={goMain}>닫기</StyledButton>
            </div>
        </div>
    );
}

export default WaitPlease;
