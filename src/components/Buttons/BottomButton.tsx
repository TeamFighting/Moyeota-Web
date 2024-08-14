import styled from 'styled-components';

interface BottomButtonProps {
    text: string;
    onClick?: () => void;
}

const BottomButton: React.FC<BottomButtonProps> = ({ text, onClick }) => {
    return (
        <Wrapper>
            <Button type="button" onClick={onClick}>
                {text}
            </Button>
        </Wrapper>
    );
};

export default BottomButton;

const Wrapper = styled.div`
    width: 100%;
    height: 64px;
    background-color: white;
    bottom: 0;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    z-index: 2;
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
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.54px;
    z-index: 2;
`;
