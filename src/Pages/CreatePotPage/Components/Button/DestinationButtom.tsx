import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

function DestinationButton() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const destination = searchParams.get('destination');

    const navigateToCreateComplete = () => {
        if (destination) {
            navigate(`/createPotPage?destination=${destination}`);
        } else {
            alert('도착지를 입력해주세요');
        }
    };
    return (
        <Wrapper>
            <Button type="button" onClick={navigateToCreateComplete}>
                도착지로 설정 완료
            </Button>
        </Wrapper>
    );
}
const Wrapper = styled.div`
    width: 100%;
    height: 64px;
    background-color: white;
    bottom: 0;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    z-index: 1;
`;

const Button = styled.button`
    width: 335px;
    height: 48px;
    flex-shrink: 0;
    border-radius: 12px;
    background: var(--Green-Button, #1edd81);
    border: none;
    font-size: 16px;
    color: white;
    color: #fff;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.54px;
`;
export default DestinationButton;
