import PotCreateStore from '@stores/PotCreateStore';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function DestinationButton({ from }: { from: string }) {
    const navigate = useNavigate();
    const { setDestination } = PotCreateStore();

    const navigateToCreateComplete = () => {
        if (from === 'create') {
            navigate(`/createPotPage`);
        } else {
            setDestination('');
            navigate(`/updatePot/${new URLSearchParams(location.search).get('postId')}`);
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
